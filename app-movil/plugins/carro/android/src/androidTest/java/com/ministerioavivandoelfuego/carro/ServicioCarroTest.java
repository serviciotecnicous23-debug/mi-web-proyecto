package com.ministerioavivandoelfuego.carro;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import android.content.ComponentName;
import android.content.Context;
import android.os.Handler;
import android.os.HandlerThread;
import android.os.SystemClock;
import androidx.media3.common.MediaItem;
import androidx.media3.common.MediaMetadata;
import androidx.media3.session.LibraryResult;
import androidx.media3.session.MediaBrowser;
import androidx.media3.session.MediaConstants;
import androidx.media3.session.SessionToken;
import androidx.test.core.app.ApplicationProvider;
import androidx.test.ext.junit.runners.AndroidJUnit4;
import com.google.common.collect.ImmutableList;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;
import java.util.concurrent.TimeUnit;
import org.json.JSONObject;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

/**
 * Se conecta al servicio igual que Android Auto (un MediaBrowser): recorre las carpetas, pide la radio
 * por voz y la hace sonar de verdad (necesita internet: usa la radio y la web reales).
 */
@RunWith(AndroidJUnit4.class)
public class ServicioCarroTest {
    private HandlerThread hilo;
    private Handler enHiloDelNavegador;
    private MediaBrowser navegador;

    @Before
    public void conectar() throws Exception {
        hilo = new HandlerThread("prueba-carro");
        hilo.start();
        enHiloDelNavegador = new Handler(hilo.getLooper());
        Context contexto = ApplicationProvider.getApplicationContext();
        SessionToken token = new SessionToken(contexto, new ComponentName(contexto, ServicioCarro.class));
        navegador = en(() -> new MediaBrowser.Builder(contexto, token).setApplicationLooper(hilo.getLooper()).buildAsync())
            .get(30, TimeUnit.SECONDS);
    }

    @After
    public void soltar() throws Exception {
        if (navegador != null) {
            en(() -> {
                navegador.stop();
                navegador.clearMediaItems();
                navegador.release();
                return null;
            });
        }
        hilo.quitSafely();
    }

    /** Media3 exige usar el navegador desde su propio hilo. */
    private <T> T en(Callable<T> tarea) throws Exception {
        FutureTask<T> futura = new FutureTask<>(tarea);
        enHiloDelNavegador.post(futura);
        return futura.get(30, TimeUnit.SECONDS);
    }

    private void esperar(int segundos, String que, Callable<Boolean> condicion) throws Exception {
        long hasta = SystemClock.elapsedRealtime() + segundos * 1000L;
        while (SystemClock.elapsedRealtime() < hasta) {
            if (Boolean.TRUE.equals(en(condicion))) return;
            Thread.sleep(250);
        }
        fail("No pasó en " + segundos + " s: " + que + " · " + diagnostico());
    }

    /** Cómo estaba el reproductor cuando algo no pasó (para entender el fallo desde el informe). */
    private String diagnostico() {
        try {
            return en(() -> "estado=" + navegador.getPlaybackState() + " quiere=" + navegador.getPlayWhenReady()
                + " error=" + navegador.getPlayerError() + " foto=" + navegador.getSessionExtras().getString(ServicioCarro.CLAVE_ESTADO));
        } catch (Exception e) {
            return "sin diagnóstico: " + e;
        }
    }

    private static List<String> ids(List<MediaItem> items) {
        List<String> ids = new ArrayList<>();
        for (MediaItem item : items) ids.add(item.mediaId);
        return ids;
    }

    @Test
    public void androidAutoVeLasCarpetasYLoQueSuena() throws Exception {
        LibraryResult<MediaItem> raiz = en(() -> navegador.getLibraryRoot(null)).get(30, TimeUnit.SECONDS);
        assertEquals(LibraryResult.RESULT_SUCCESS, raiz.resultCode);
        assertNotNull(raiz.value);
        assertEquals(ServicioCarro.RAIZ, raiz.value.mediaId);
        assertNotNull(raiz.params);
        assertEquals(MediaConstants.EXTRAS_VALUE_CONTENT_STYLE_LIST_ITEM,
            raiz.params.extras.getInt(MediaConstants.EXTRAS_KEY_CONTENT_STYLE_PLAYABLE));

        LibraryResult<ImmutableList<MediaItem>> pestanas = en(() -> navegador.getChildren(ServicioCarro.RAIZ, 0, 100, null))
            .get(30, TimeUnit.SECONDS);
        assertNotNull(pestanas.value);
        assertEquals(List.of("radio", "academia"), ids(pestanas.value));
        MediaMetadata radio = pestanas.value.get(0).mediaMetadata;
        assertEquals(Boolean.TRUE, radio.isBrowsable);
        assertEquals(Boolean.FALSE, radio.isPlayable);
        assertEquals(Integer.valueOf(MediaMetadata.MEDIA_TYPE_FOLDER_RADIO_STATIONS), radio.mediaType);
        // Android Auto solo dibuja carátulas del propio teléfono en las listas.
        assertNotNull(radio.artworkUri);
        assertEquals("android.resource", radio.artworkUri.getScheme());

        LibraryResult<ImmutableList<MediaItem>> directos = en(() -> navegador.getChildren("radio", 0, 100, null))
            .get(30, TimeUnit.SECONDS);
        assertNotNull(directos.value);
        assertEquals(List.of("radio:normal"), ids(directos.value));
        assertEquals(Boolean.TRUE, directos.value.get(0).mediaMetadata.isPlayable);
        assertEquals(Integer.valueOf(MediaMetadata.MEDIA_TYPE_RADIO_STATION), directos.value.get(0).mediaMetadata.mediaType);

        LibraryResult<ImmutableList<MediaItem>> lecciones = en(() -> navegador.getChildren("academia", 0, 1, null))
            .get(30, TimeUnit.SECONDS);
        assertNotNull(lecciones.value);
        // Va por páginas: de una en una.
        assertEquals(List.of("leccion:biblia-1"), ids(lecciones.value));

        LibraryResult<ImmutableList<MediaItem>> nada = en(() -> navegador.getChildren("no-existe", 0, 10, null))
            .get(30, TimeUnit.SECONDS);
        assertTrue(nada.resultCode != LibraryResult.RESULT_SUCCESS);
    }

    @Test
    public void porVozSuenaLaRadioYLlegaLaCancionSinCortar() throws Exception {
        en(() -> {
            navegador.setMediaItem(new MediaItem.Builder()
                .setRequestMetadata(new MediaItem.RequestMetadata.Builder().setSearchQuery("pon la radio de Avivando el Fuego").build())
                .build());
            navegador.prepare();
            navegador.play();
            return null;
        });
        esperar(45, "la radio suena", () -> navegador.isPlaying());
        assertEquals("radio:normal", en(() -> navegador.getCurrentMediaItem().mediaId));

        // AzuraCast cuenta qué suena: el título cambia al de la canción y el audio sigue.
        esperar(45, "llega la canción", () -> {
            CharSequence titulo = navegador.getMediaMetadata().title;
            return titulo != null && !"Radio en vivo".contentEquals(titulo);
        });
        Thread.sleep(2000);
        assertTrue("sigue sonando después de cambiar los datos", en(() -> navegador.isPlaying()));

        String foto = en(() -> navegador.getSessionExtras().getString(ServicioCarro.CLAVE_ESTADO));
        assertNotNull(foto);
        JSONObject estado = new JSONObject(foto);
        assertEquals("playing", estado.getString("estado"));
        assertEquals("radio:normal", estado.getString("id"));
        assertTrue(estado.getBoolean("enVivo"));
    }

    @Test
    public void unaLeccionSuenaConSuColaYSePuedeAdelantar() throws Exception {
        en(() -> {
            navegador.setMediaItem(new MediaItem.Builder().setMediaId("leccion:biblia-1").build());
            navegador.prepare();
            navegador.play();
            return null;
        });
        esperar(45, "la lección suena", () -> navegador.isPlaying());
        // La cola son las lecciones de la carpeta: se puede pasar a la siguiente.
        assertEquals(Integer.valueOf(2), en(() -> navegador.getMediaItemCount()));
        assertTrue(en(() -> navegador.getDuration() > 60000));
        en(() -> {
            navegador.seekTo(60000);
            return null;
        });
        esperar(20, "adelanta un minuto", () -> navegador.getCurrentPosition() >= 59000);
        assertTrue(en(() -> navegador.hasNextMediaItem()));
    }
}
