package com.ministerioavivandoelfuego.carro;

import android.app.PendingIntent;
import android.content.ContentResolver;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Resources;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.SystemClock;
import androidx.annotation.Nullable;
import androidx.annotation.OptIn;
import androidx.media3.common.AudioAttributes;
import androidx.media3.common.C;
import androidx.media3.common.ForwardingPlayer;
import androidx.media3.common.MediaItem;
import androidx.media3.common.MediaMetadata;
import androidx.media3.common.PlaybackException;
import androidx.media3.common.Player;
import androidx.media3.common.util.UnstableApi;
import androidx.media3.datasource.HttpDataSource;
import androidx.media3.exoplayer.ExoPlayer;
import androidx.media3.exoplayer.source.DefaultMediaSourceFactory;
import androidx.media3.exoplayer.upstream.DefaultLoadErrorHandlingPolicy;
import androidx.media3.exoplayer.upstream.LoadErrorHandlingPolicy;
import androidx.media3.session.LibraryResult;
import androidx.media3.session.MediaConstants;
import androidx.media3.session.MediaLibraryService;
import androidx.media3.session.MediaSession;
import androidx.media3.session.SessionCommand;
import androidx.media3.session.SessionCommands;
import androidx.media3.session.SessionError;
import androidx.media3.session.SessionResult;
import com.google.common.collect.ImmutableList;
import com.google.common.util.concurrent.Futures;
import com.google.common.util.concurrent.ListenableFuture;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * El reproductor de Android: suena con la pantalla apagada, en la notificación, en la pantalla
 * bloqueada, en los audífonos y en Android Auto (que lo recorre como una biblioteca: carpetas y
 * elementos del catálogo), aunque la app esté cerrada.
 *
 * Regla central (igual que la app web y el iPhone): mientras el oyente QUIERE escuchar, no se rinde.
 * Si la señal se cae, vuelve a conectar solo, con esperas crecientes y alternando los servidores de
 * respaldo; un directo pausado vuelve al directo, nunca a audio viejo.
 *
 * La app habla con este servicio con un MediaController (CarroPlugin). El estado completo (con
 * «reconectando» y «sin internet», que el reproductor estándar no tiene) va en los extras de la sesión
 * con la clave {@link #CLAVE_ESTADO}.
 */
@OptIn(markerClass = UnstableApi.class)
public class ServicioCarro extends MediaLibraryService {

    public static final String RAIZ = "carro:raiz";
    public static final String CLAVE_ESTADO = "carro.estado";
    public static final String ORDEN_DORMIR = "carro.dormir";
    public static final String ORDEN_DETENER = "carro.detener";
    private static final String ULTIMO = "ultimo";
    /** Un directo en pausa más de esto vuelve al momento actual al seguir. */
    private static final long PAUSA_CORTA_MS = 5000;
    /** Un directo en pausa más de esto suelta la conexión (no gasta datos). */
    private static final long SOLTAR_DIRECTO_MS = 5 * 60000;

    private ExoPlayer exo;
    private Player jugador;
    private MediaLibrarySession sesion;
    private FuenteCatalogo fuente;
    private SharedPreferences preferencias;
    private final Handler h = new Handler(Looper.getMainLooper());
    private final ExecutorService red = Executors.newSingleThreadExecutor();
    private ConnectivityManager conectividad;
    private ConnectivityManager.NetworkCallback avisoDeRed;
    private boolean hayRed = true;
    private Uri portada;

    private Catalogo.Nodo actual;
    private Azuracast.Cancion cancion;
    private int intento = 0;
    private int indiceUrl = 0;
    private boolean reconectando = false;
    private boolean yaSono = false;
    private long dormirA = 0;
    private long pausadoDesde = 0;
    private long silenciadoDesde = 0;

    private final FuenteCatalogo.Oyente alCambiarCatalogo = this::catalogoNuevo;

    // ------------------------------------------------------------------ ciclo de vida

    @Override
    public void onCreate() {
        super.onCreate();
        fuente = FuenteCatalogo.get(this);
        preferencias = getSharedPreferences("carro", MODE_PRIVATE);
        DefaultMediaSourceFactory fuentes = new DefaultMediaSourceFactory(this).setLoadErrorHandlingPolicy(new PoliticaDeReintentos());
        exo = new ExoPlayer.Builder(this)
            .setMediaSourceFactory(fuentes)
            .setAudioAttributes(atributos(false), true)
            .setHandleAudioBecomingNoisy(true)
            .setWakeMode(C.WAKE_MODE_NETWORK)
            .build();
        exo.addListener(new Oyente());
        jugador = new SinMetadatosDelStream(exo);
        MediaLibrarySession.Builder constructor = new MediaLibrarySession.Builder(this, jugador, new Llamadas());
        PendingIntent abrir = abrirLaApp();
        if (abrir != null) constructor.setSessionActivity(abrir);
        sesion = constructor.build();
        fuente.agregarOyente(alCambiarCatalogo);
        vigilarLaRed();
        publicar();
        fuente.refrescar(false, null);
    }

    @Nullable
    @Override
    public MediaLibrarySession onGetSession(MediaSession.ControllerInfo quien) {
        return sesion;
    }

    @Override
    public void onTaskRemoved(@Nullable Intent tarea) {
        // Si no suena, se cierra con la app; si suena, sigue sonando (como cualquier radio).
        if (exo == null || !exo.getPlayWhenReady() || exo.getMediaItemCount() == 0) stopSelf();
    }

    @Override
    public void onDestroy() {
        guardarLugar();
        h.removeCallbacksAndMessages(null);
        if (fuente != null) fuente.quitarOyente(alCambiarCatalogo);
        if (conectividad != null && avisoDeRed != null) {
            try {
                conectividad.unregisterNetworkCallback(avisoDeRed);
            } catch (Exception ignorado) {
                // Ya no estaba registrado.
            }
        }
        red.shutdownNow();
        if (sesion != null) {
            sesion.release();
            sesion = null;
        }
        if (exo != null) {
            exo.release();
            exo = null;
        }
        super.onDestroy();
    }

    private PendingIntent abrirLaApp() {
        Intent abrir = getPackageManager().getLaunchIntentForPackage(getPackageName());
        if (abrir == null) return null;
        return PendingIntent.getActivity(this, 0, abrir, PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT);
    }

    private static AudioAttributes atributos(boolean hablado) {
        return new AudioAttributes.Builder()
            .setUsage(C.USAGE_MEDIA)
            // Lecciones y prédicas son voz: el GPS las pausa en vez de bajarles el volumen.
            .setContentType(hablado ? C.AUDIO_CONTENT_TYPE_SPEECH : C.AUDIO_CONTENT_TYPE_MUSIC)
            .build();
    }

    // ------------------------------------------------------------------ red

    private void vigilarLaRed() {
        conectividad = (ConnectivityManager) getSystemService(CONNECTIVITY_SERVICE);
        if (conectividad == null) return;
        hayRed = conectividad.getActiveNetwork() != null;
        avisoDeRed = new ConnectivityManager.NetworkCallback() {
            @Override
            public void onAvailable(Network network) {
                h.post(() -> alCambiarRed(true));
            }

            @Override
            public void onLost(Network network) {
                h.post(() -> alCambiarRed(conectividad.getActiveNetwork() != null));
            }
        };
        try {
            conectividad.registerDefaultNetworkCallback(avisoDeRed);
        } catch (Exception ignorado) {
            avisoDeRed = null;
        }
    }

    private void alCambiarRed(boolean conectado) {
        boolean antes = hayRed;
        hayRed = conectado;
        if (exo != null && conectado && !antes && quiereSonar() && (reconectando || exo.getPlaybackState() != Player.STATE_READY)) {
            // Volvió la señal: se conecta ya, sin esperar el resto de la espera.
            h.removeCallbacks(reintento);
            conectarDeNuevo();
        }
        publicar();
    }

    // ------------------------------------------------------------------ reconexión

    private boolean quiereSonar() {
        return exo != null && exo.getPlayWhenReady() && actual != null && exo.getMediaItemCount() > 0;
    }

    private boolean esVivo() {
        return actual != null && actual.audio != null && actual.audio.enVivo;
    }

    private final Runnable reintento = this::conectarDeNuevo;

    private final Runnable estable = () -> {
        intento = 0;
        publicar();
    };

    /** Si no avanza en un rato, la señal se da por perdida. */
    private final Runnable vigilante = () -> {
        if (quiereSonar() && exo.getPlaybackState() == Player.STATE_BUFFERING) programarReintento();
    };

    private final Runnable soltarDirecto = () -> {
        if (exo != null && esVivo() && !exo.getPlayWhenReady()) exo.stop();
    };

    private void programarReintento() {
        if (actual == null || exo == null || !exo.getPlayWhenReady()) return;
        h.removeCallbacks(reintento);
        h.removeCallbacks(estable);
        intento++;
        indiceUrl++;
        if (actual.esArchivo() && intento > Reintentos.MAXIMO_ARCHIVO) {
            // Una lección que no carga tantas veces: quizá ya no existe. Se deja en pausa.
            reconectando = false;
            exo.pause();
            publicar();
            return;
        }
        reconectando = true;
        if (hayRed) h.postDelayed(reintento, Reintentos.espera(intento));
        publicar();
    }

    private void conectarDeNuevo() {
        if (exo == null || actual == null || actual.audio == null || !exo.getPlayWhenReady()) return;
        MediaItem item = exo.getCurrentMediaItem();
        if (item == null) return;
        if (actual.audio.enVivo) {
            String url = actual.audio.urls.get(indiceUrl % actual.audio.urls.size());
            exo.setMediaItem(item.buildUpon().setUri(url).build());
        } else {
            long posicion = exo.getCurrentPosition();
            int indice = exo.getCurrentMediaItemIndex();
            exo.stop();
            exo.seekTo(indice, posicion);
        }
        exo.prepare();
        exo.play();
    }

    /** Reintentos dentro del propio ExoPlayer: un directo nunca se da por muerto por un corte. */
    static final class PoliticaDeReintentos extends DefaultLoadErrorHandlingPolicy {
        PoliticaDeReintentos() {
            super(Integer.MAX_VALUE);
        }

        @Override
        public long getRetryDelayMsFor(LoadErrorHandlingPolicy.LoadErrorInfo info) {
            if (info.exception instanceof HttpDataSource.CleartextNotPermittedException) return C.TIME_UNSET;
            if (info.exception instanceof HttpDataSource.InvalidResponseCodeException) {
                int codigo = ((HttpDataSource.InvalidResponseCodeException) info.exception).responseCode;
                // Ya no existe: que falle y el servicio pruebe el servidor de respaldo.
                if (codigo == 404 || codigo == 410) return C.TIME_UNSET;
            }
            return Reintentos.espera(info.errorCount);
        }

        @Override
        public int getMinimumLoadableRetryCount(int tipo) {
            return Integer.MAX_VALUE;
        }
    }

    /** La sesión (notificación, Android Auto) muestra lo del catálogo y la canción de AzuraCast, no el
     *  texto que el servidor mete dentro del audio (que repetiría el artista). */
    static final class SinMetadatosDelStream extends ForwardingPlayer {
        SinMetadatosDelStream(Player jugador) {
            super(jugador);
        }

        @Override
        public MediaMetadata getMediaMetadata() {
            MediaItem item = getCurrentMediaItem();
            return item != null ? item.mediaMetadata : super.getMediaMetadata();
        }
    }

    private final class Oyente implements Player.Listener {
        @Override
        public void onMediaItemTransition(@Nullable MediaItem item, int razon) {
            if (razon == Player.MEDIA_ITEM_TRANSITION_REASON_AUTO && actual != null && actual.esArchivo()) {
                // Terminó la lección y pasó sola a la siguiente: la anterior ya se escuchó entera.
                borrarLugar(actual.id);
            }
            Catalogo.Nodo nodo = item == null ? null : fuente.actual().buscar(item.mediaId);
            boolean otro = nodo == null || actual == null || !nodo.id.equals(actual.id);
            if (otro) {
                actual = nodo;
                cancion = null;
                intento = 0;
                indiceUrl = 0;
                reconectando = false;
                yaSono = false;
                pausadoDesde = 0;
                h.removeCallbacks(reintento);
                detenerMetadatos();
                if (nodo != null) {
                    preferencias.edit().putString(ULTIMO, nodo.id).apply();
                    exo.setAudioAttributes(atributos(nodo.esArchivo()), true);
                    if (exo.getPlayWhenReady()) empezarMetadatos();
                }
            }
            publicar();
        }

        @Override
        public void onIsPlayingChanged(boolean suena) {
            if (suena) {
                yaSono = true;
                reconectando = false;
                h.removeCallbacks(vigilante);
                h.removeCallbacks(estable);
                if (intento > 0) h.postDelayed(estable, Reintentos.ESTABLE_TRAS_MS);
                h.removeCallbacks(guardarCadaRato);
                h.postDelayed(guardarCadaRato, 5000);
            } else {
                h.removeCallbacks(guardarCadaRato);
                guardarLugar();
            }
            publicar();
        }

        @Override
        public void onPlaybackStateChanged(int estado) {
            h.removeCallbacks(vigilante);
            if (estado == Player.STATE_BUFFERING && exo.getPlayWhenReady()) {
                h.postDelayed(vigilante, esVivo() ? Reintentos.SIN_AVANCE_EN_VIVO_MS : Reintentos.SIN_AVANCE_ARCHIVO_MS);
            } else if (estado == Player.STATE_ENDED) {
                if (esVivo()) {
                    // Un directo no termina: si "terminó", se cortó la conexión.
                    programarReintento();
                } else if (actual != null) {
                    borrarLugar(actual.id);
                }
            }
            publicar();
        }

        @Override
        public void onPlayWhenReadyChanged(boolean quiere, int razon) {
            if (!quiere) {
                h.removeCallbacks(reintento);
                h.removeCallbacks(vigilante);
                reconectando = false;
                detenerMetadatos();
                guardarLugar();
                cancelarDormir();
                if (esVivo()) {
                    pausadoDesde = SystemClock.elapsedRealtime();
                    h.removeCallbacks(soltarDirecto);
                    h.postDelayed(soltarDirecto, SOLTAR_DIRECTO_MS);
                }
            } else {
                h.removeCallbacks(soltarDirecto);
                boolean pausaLarga = pausadoDesde != 0 && SystemClock.elapsedRealtime() - pausadoDesde > PAUSA_CORTA_MS;
                pausadoDesde = 0;
                if (esVivo() && pausaLarga && exo.getPlaybackState() != Player.STATE_IDLE) {
                    // Vuelve al directo: lo que quedó guardado ya pasó.
                    exo.stop();
                }
                if (exo.getPlaybackState() == Player.STATE_IDLE && exo.getMediaItemCount() > 0) exo.prepare();
                empezarMetadatos();
            }
            publicar();
        }

        @Override
        public void onPlaybackSuppressionReasonChanged(int razon) {
            if (razon != Player.PLAYBACK_SUPPRESSION_REASON_NONE) {
                silenciadoDesde = SystemClock.elapsedRealtime();
            } else if (silenciadoDesde != 0) {
                long duro = SystemClock.elapsedRealtime() - silenciadoDesde;
                silenciadoDesde = 0;
                // Tras una llamada larga, el directo vuelve al momento actual.
                if (esVivo() && duro > 20000 && exo.getPlayWhenReady()) {
                    exo.stop();
                    exo.prepare();
                }
            }
            publicar();
        }

        @Override
        public void onPlayerError(PlaybackException error) {
            if (actual == null) return;
            programarReintento();
        }

        @Override
        public void onVolumeChanged(float volumen) {
            publicar();
        }
    }

    // ------------------------------------------------------------------ la canción del directo

    private final Runnable consultarMetadatos = new Runnable() {
        @Override
        public void run() {
            Catalogo.Nodo nodo = actual;
            if (exo == null || nodo == null || nodo.audio == null || !nodo.audio.enVivo || nodo.audio.metadatos.isEmpty()
                || !exo.getPlayWhenReady() || red.isShutdown()) {
                return;
            }
            final List<String> urls = nodo.audio.metadatos;
            final String id = nodo.id;
            red.execute(() -> {
                Azuracast.Cancion leida = null;
                for (String url : urls) {
                    leida = Azuracast.leer(Http.traer(url, null, 8000));
                    if (leida != null) break;
                }
                final Azuracast.Cancion nueva = leida;
                h.post(() -> {
                    if (nueva != null && actual != null && id.equals(actual.id)) alLlegarCancion(nueva);
                });
            });
            // El servidor lo renueva cada 15 s.
            h.postDelayed(this, 15000);
        }
    };

    private void empezarMetadatos() {
        h.removeCallbacks(consultarMetadatos);
        if (esVivo()) h.post(consultarMetadatos);
    }

    private void detenerMetadatos() {
        h.removeCallbacks(consultarMetadatos);
    }

    private void alLlegarCancion(Azuracast.Cancion nueva) {
        if (exo == null || nueva.equals(cancion)) return;
        cancion = nueva;
        MediaItem item = exo.getCurrentMediaItem();
        if (item == null || actual == null || !item.mediaId.equals(actual.id)) return;
        // Mismo audio, datos nuevos: ExoPlayer lo cambia sin cortar el sonido.
        exo.replaceMediaItem(exo.getCurrentMediaItemIndex(), item.buildUpon().setMediaMetadata(metadatos(actual, nueva)).build());
        publicar();
    }

    // ------------------------------------------------------------------ dónde quedó cada lección

    private final Runnable guardarCadaRato = new Runnable() {
        @Override
        public void run() {
            guardarLugar();
            if (exo != null && exo.isPlaying()) h.postDelayed(this, 5000);
        }
    };

    private void guardarLugar() {
        if (exo == null || actual == null || !actual.esArchivo()) return;
        MediaItem item = exo.getCurrentMediaItem();
        if (item == null || !item.mediaId.equals(actual.id)) return;
        long t = exo.getCurrentPosition();
        long total = exo.getDuration();
        String clave = "lugar." + actual.id;
        SharedPreferences.Editor editor = preferencias.edit();
        if (t < 5000 || (total != C.TIME_UNSET && total > 0 && t > total - 10000)) editor.remove(clave);
        else editor.putLong(clave, t);
        editor.apply();
    }

    private void borrarLugar(String id) {
        preferencias.edit().remove("lugar." + id).apply();
    }

    long lugarGuardado(String id) {
        return preferencias.getLong("lugar." + id, 0);
    }

    // ------------------------------------------------------------------ temporizador y detener

    private final Runnable apagar = () -> {
        dormirA = 0;
        if (exo != null) exo.pause();
        publicar();
    };

    private void dormir(double minutos) {
        cancelarDormir();
        if (minutos > 0) {
            long espera = (long) (minutos * 60000);
            dormirA = System.currentTimeMillis() + espera;
            h.postDelayed(apagar, espera);
        }
        publicar();
    }

    private void cancelarDormir() {
        h.removeCallbacks(apagar);
        dormirA = 0;
    }

    private void detener() {
        guardarLugar();
        cancelarDormir();
        h.removeCallbacks(reintento);
        detenerMetadatos();
        exo.stop();
        exo.clearMediaItems();
        actual = null;
        cancion = null;
        publicar();
    }

    // ------------------------------------------------------------------ catálogo → Android Auto

    private void catalogoNuevo(Catalogo catalogo) {
        if (sesion == null) return;
        sesion.notifyChildrenChanged(RAIZ, catalogo.raiz.size(), null);
        avisarCarpetas(catalogo.raiz);
    }

    private void avisarCarpetas(List<Catalogo.Nodo> nodos) {
        for (Catalogo.Nodo nodo : nodos) {
            if (nodo.hijos == null) continue;
            sesion.notifyChildrenChanged(nodo.id, nodo.hijos.size(), null);
            avisarCarpetas(nodo.hijos);
        }
    }

    MediaItem itemDe(Catalogo.Nodo nodo, boolean paraSonar) {
        MediaItem.Builder item = new MediaItem.Builder().setMediaId(nodo.id).setMediaMetadata(metadatos(nodo, null));
        if (paraSonar && nodo.audio != null) item.setUri(nodo.audio.urls.get(0));
        return item.build();
    }

    MediaMetadata metadatos(Catalogo.Nodo nodo, @Nullable Azuracast.Cancion cancion) {
        Catalogo catalogo = fuente.actual();
        MediaMetadata.Builder m = new MediaMetadata.Builder()
            .setIsBrowsable(nodo.esCarpeta())
            .setIsPlayable(nodo.suena())
            .setMediaType(tipo(nodo))
            .setArtworkUri(portada());
        if (nodo.audio == null) {
            m.setTitle(nodo.titulo).setDisplayTitle(nodo.titulo);
            if (nodo.subtitulo != null) m.setSubtitle(nodo.subtitulo);
            return m.build();
        }
        String album = nodo.audio.album != null ? nodo.audio.album : catalogo.titulo;
        if (nodo.audio.enVivo && cancion != null && !cancion.titulo.isEmpty()) {
            m.setTitle(cancion.titulo).setDisplayTitle(cancion.titulo).setArtist(cancion.artista).setSubtitle(cancion.artista).setAlbumTitle(album);
            if (cancion.imagen != null) m.setArtworkUri(Uri.parse(cancion.imagen));
        } else {
            String artista = nodo.audio.artista != null ? nodo.audio.artista : nodo.subtitulo != null ? nodo.subtitulo : album;
            m.setTitle(nodo.titulo).setDisplayTitle(nodo.titulo).setArtist(artista).setAlbumTitle(album)
                .setSubtitle(nodo.subtitulo != null ? nodo.subtitulo : artista);
        }
        if (nodo.esArchivo() && nodo.audio.duracion > 0) m.setDurationMs((long) (nodo.audio.duracion * 1000));
        return m.build();
    }

    private static int tipo(Catalogo.Nodo nodo) {
        if (nodo.audio != null) {
            return nodo.audio.enVivo ? MediaMetadata.MEDIA_TYPE_RADIO_STATION : MediaMetadata.MEDIA_TYPE_PODCAST_EPISODE;
        }
        if ("radio".equals(nodo.icono)) return MediaMetadata.MEDIA_TYPE_FOLDER_RADIO_STATIONS;
        if ("predicas".equals(nodo.icono)) return MediaMetadata.MEDIA_TYPE_FOLDER_PODCASTS;
        return MediaMetadata.MEDIA_TYPE_FOLDER_MIXED;
    }

    /** Android Auto solo dibuja carátulas del propio teléfono en las listas: el logo de la app. */
    private Uri portada() {
        if (portada != null) return portada;
        Resources recursos = getResources();
        int id = recursos.getIdentifier("carro_portada", "drawable", getPackageName());
        if (id == 0) id = getApplicationInfo().icon;
        if (id == 0) return null;
        portada = new Uri.Builder()
            .scheme(ContentResolver.SCHEME_ANDROID_RESOURCE)
            .authority(recursos.getResourcePackageName(id))
            .appendPath(recursos.getResourceTypeName(id))
            .appendPath(recursos.getResourceEntryName(id))
            .build();
        return portada;
    }

    @Nullable
    private Catalogo.Nodo resolver(Catalogo catalogo, MediaItem pedido) {
        Catalogo.Nodo nodo = pedido.mediaId.isEmpty() ? null : catalogo.buscar(pedido.mediaId);
        if (nodo != null && nodo.suena()) return nodo;
        if (nodo != null && nodo.hijos != null) {
            for (Catalogo.Nodo hijo : nodo.hijos) {
                if (hijo.suena()) return hijo;
            }
            return null;
        }
        String consulta = pedido.requestMetadata.searchQuery;
        // «Ok Google, pon …»: por voz llega una búsqueda; sin nada, la radio en vivo.
        if (consulta != null || pedido.mediaId.isEmpty()) return catalogo.elegir(consulta);
        return null;
    }

    private MediaSession.MediaItemsWithStartPosition conSuCola(Catalogo catalogo, Catalogo.Nodo nodo) {
        List<Catalogo.Nodo> cola = catalogo.cola(nodo.id);
        List<MediaItem> lista = new ArrayList<>();
        int indice = 0;
        for (int i = 0; i < cola.size(); i++) {
            lista.add(itemDe(cola.get(i), true));
            if (cola.get(i).id.equals(nodo.id)) indice = i;
        }
        long desde = nodo.esArchivo() ? lugarGuardado(nodo.id) : C.TIME_UNSET;
        return new MediaSession.MediaItemsWithStartPosition(lista, indice, desde);
    }

    private final class Llamadas implements MediaLibrarySession.Callback {
        @Override
        public ListenableFuture<LibraryResult<MediaItem>> onGetLibraryRoot(
            MediaLibrarySession s, MediaSession.ControllerInfo quien, @Nullable LibraryParams params) {
            Bundle estilo = new Bundle();
            estilo.putInt(MediaConstants.EXTRAS_KEY_CONTENT_STYLE_BROWSABLE, MediaConstants.EXTRAS_VALUE_CONTENT_STYLE_LIST_ITEM);
            estilo.putInt(MediaConstants.EXTRAS_KEY_CONTENT_STYLE_PLAYABLE, MediaConstants.EXTRAS_VALUE_CONTENT_STYLE_LIST_ITEM);
            MediaItem raiz = new MediaItem.Builder()
                .setMediaId(RAIZ)
                .setMediaMetadata(new MediaMetadata.Builder()
                    .setTitle(fuente.actual().titulo)
                    .setIsBrowsable(true)
                    .setIsPlayable(false)
                    .setMediaType(MediaMetadata.MEDIA_TYPE_FOLDER_MIXED)
                    .build())
                .build();
            return Futures.immediateFuture(LibraryResult.ofItem(raiz, new LibraryParams.Builder().setExtras(estilo).build()));
        }

        @Override
        public ListenableFuture<LibraryResult<ImmutableList<MediaItem>>> onGetChildren(
            MediaLibrarySession s, MediaSession.ControllerInfo quien, String padre, int pagina, int tamano,
            @Nullable LibraryParams params) {
            Catalogo catalogo = fuente.actual();
            List<Catalogo.Nodo> hijos;
            if (RAIZ.equals(padre)) {
                hijos = catalogo.raiz;
                // Por si hay lecciones o prédicas nuevas (como mucho una consulta por minuto).
                fuente.refrescar(false, null);
            } else {
                Catalogo.Nodo carpeta = catalogo.buscar(padre);
                hijos = carpeta != null ? carpeta.hijos : null;
            }
            if (hijos == null) return Futures.immediateFuture(LibraryResult.ofError(SessionError.ERROR_BAD_VALUE));
            int desde = (int) Math.min((long) pagina * tamano, hijos.size());
            int hasta = (int) Math.min((long) desde + tamano, hijos.size());
            ImmutableList.Builder<MediaItem> items = ImmutableList.builder();
            for (Catalogo.Nodo nodo : hijos.subList(desde, hasta)) items.add(itemDe(nodo, false));
            return Futures.immediateFuture(LibraryResult.ofItemList(items.build(), params));
        }

        @Override
        public ListenableFuture<LibraryResult<MediaItem>> onGetItem(MediaLibrarySession s, MediaSession.ControllerInfo quien, String id) {
            Catalogo.Nodo nodo = fuente.actual().buscar(id);
            if (nodo == null) return Futures.immediateFuture(LibraryResult.ofError(SessionError.ERROR_BAD_VALUE));
            return Futures.immediateFuture(LibraryResult.ofItem(itemDe(nodo, false), null));
        }

        @Override
        public ListenableFuture<List<MediaItem>> onAddMediaItems(MediaSession s, MediaSession.ControllerInfo quien, List<MediaItem> pedidos) {
            Catalogo catalogo = fuente.actual();
            List<MediaItem> lista = new ArrayList<>();
            for (MediaItem pedido : pedidos) {
                Catalogo.Nodo nodo = resolver(catalogo, pedido);
                if (nodo != null) lista.add(itemDe(nodo, true));
            }
            return Futures.immediateFuture(lista);
        }

        @Override
        public ListenableFuture<MediaSession.MediaItemsWithStartPosition> onSetMediaItems(
            MediaSession s, MediaSession.ControllerInfo quien, List<MediaItem> pedidos, int inicio, long posicion) {
            Catalogo catalogo = fuente.actual();
            if (pedidos.size() == 1) {
                // Lo normal: el oyente eligió una cosa (en el carro, en la app o por voz). Va con su cola.
                Catalogo.Nodo nodo = resolver(catalogo, pedidos.get(0));
                if (nodo == null) return Futures.immediateFailedFuture(new IllegalArgumentException("No está en el catálogo"));
                return Futures.immediateFuture(conSuCola(catalogo, nodo));
            }
            List<MediaItem> lista = new ArrayList<>();
            for (MediaItem pedido : pedidos) {
                Catalogo.Nodo nodo = resolver(catalogo, pedido);
                if (nodo != null) lista.add(itemDe(nodo, true));
            }
            if (lista.isEmpty()) return Futures.immediateFailedFuture(new IllegalArgumentException("Nada que sonar"));
            int indice = Math.max(0, Math.min(inicio, lista.size() - 1));
            return Futures.immediateFuture(new MediaSession.MediaItemsWithStartPosition(lista, indice, posicion));
        }

        @Override
        public ListenableFuture<MediaSession.MediaItemsWithStartPosition> onPlaybackResumption(
            MediaSession s, MediaSession.ControllerInfo quien, boolean paraSonar) {
            // El botón de play del carro o de los audífonos con la app cerrada: lo último que sonó.
            Catalogo catalogo = fuente.actual();
            Catalogo.Nodo nodo = catalogo.buscar(preferencias.getString(ULTIMO, ""));
            if (nodo == null || !nodo.suena()) nodo = catalogo.primeroEnVivo();
            if (nodo == null) return Futures.immediateFailedFuture(new IllegalStateException("Catálogo vacío"));
            return Futures.immediateFuture(conSuCola(catalogo, nodo));
        }

        @Override
        public MediaSession.ConnectionResult onConnect(MediaSession s, MediaSession.ControllerInfo quien) {
            MediaSession.ConnectionResult base = MediaLibrarySession.Callback.super.onConnect(s, quien);
            if (!getPackageName().equals(quien.getPackageName())) return base;
            // Solo la propia app puede usar el temporizador y «detener».
            SessionCommands ordenes = base.availableSessionCommands.buildUpon()
                .add(new SessionCommand(ORDEN_DORMIR, Bundle.EMPTY))
                .add(new SessionCommand(ORDEN_DETENER, Bundle.EMPTY))
                .build();
            return new MediaSession.ConnectionResult.AcceptedResultBuilder(s)
                .setAvailableSessionCommands(ordenes)
                .setAvailablePlayerCommands(base.availablePlayerCommands)
                .build();
        }

        @Override
        public ListenableFuture<SessionResult> onCustomCommand(
            MediaSession s, MediaSession.ControllerInfo quien, SessionCommand orden, Bundle datos) {
            if (ORDEN_DORMIR.equals(orden.customAction)) {
                dormir(datos.getDouble("minutos", 0));
            } else if (ORDEN_DETENER.equals(orden.customAction)) {
                detener();
            } else {
                return Futures.immediateFuture(new SessionResult(SessionError.ERROR_NOT_SUPPORTED));
            }
            return Futures.immediateFuture(new SessionResult(SessionResult.RESULT_SUCCESS));
        }
    }

    // ------------------------------------------------------------------ lo que se cuenta a la app

    private void publicar() {
        if (sesion == null) return;
        Bundle extras = new Bundle();
        extras.putString(CLAVE_ESTADO, foto().toString());
        sesion.setSessionExtras(extras);
    }

    /** La misma forma que en iPhone (FotoCarro.diccionario). */
    JSONObject foto() {
        JSONObject foto = new JSONObject();
        try {
            foto.put("estado", estado());
            foto.put("id", actual != null ? actual.id : JSONObject.NULL);
            MediaMetadata m = jugador != null ? jugador.getMediaMetadata() : MediaMetadata.EMPTY;
            String titulo = m.title != null ? m.title.toString() : actual != null ? actual.titulo : "";
            foto.put("titulo", titulo);
            foto.put("artista", m.artist != null ? m.artist.toString() : "");
            String imagen = cancion != null && cancion.imagen != null ? cancion.imagen : actual != null ? actual.imagen : null;
            foto.put("imagen", imagen != null ? imagen : JSONObject.NULL);
            boolean vivo = esVivo();
            foto.put("enVivo", vivo);
            long posicion = exo != null ? exo.getCurrentPosition() : 0;
            foto.put("posicion", vivo ? 0 : posicion / 1000.0);
            long duracion = exo != null ? exo.getDuration() : C.TIME_UNSET;
            foto.put("duracion", !vivo && duracion != C.TIME_UNSET && duracion > 0 ? duracion / 1000.0 : JSONObject.NULL);
            foto.put("intento", intento);
            foto.put("dormirA", dormirA > 0 ? dormirA : JSONObject.NULL);
            foto.put("velocidad", exo != null ? exo.getPlaybackParameters().speed : 1);
            foto.put("volumen", exo != null ? exo.getVolume() : 1);
        } catch (JSONException ignorado) {
            // No pasa con estos valores.
        }
        return foto;
    }

    private String estado() {
        if (exo == null || actual == null || exo.getMediaItemCount() == 0) return "idle";
        int estado = exo.getPlaybackState();
        if (!exo.getPlayWhenReady() || estado == Player.STATE_ENDED) return "paused";
        if (exo.getPlaybackSuppressionReason() != Player.PLAYBACK_SUPPRESSION_REASON_NONE) return "paused";
        if (exo.isPlaying()) return "playing";
        if (!hayRed) return "offline";
        if (reconectando) return "reconnecting";
        if (estado == Player.STATE_BUFFERING && yaSono) return "buffering";
        return "connecting";
    }
}
