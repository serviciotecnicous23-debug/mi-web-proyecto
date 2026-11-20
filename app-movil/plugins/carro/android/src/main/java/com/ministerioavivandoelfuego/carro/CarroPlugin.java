package com.ministerioavivandoelfuego.carro;

import android.content.ComponentName;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import androidx.core.content.ContextCompat;
import androidx.media3.common.C;
import androidx.media3.common.MediaItem;
import androidx.media3.common.Player;
import androidx.media3.session.MediaController;
import androidx.media3.session.SessionCommand;
import androidx.media3.session.SessionToken;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.common.util.concurrent.ListenableFuture;
import java.util.ArrayList;
import java.util.List;
import org.json.JSONException;

/**
 * El puente con la página de la app (JavaScript: {@code registerPlugin("Carro")}). La página manda el
 * catálogo y los botones; el servicio le cuenta cada cambio con el evento {@code estado} (la misma forma
 * que en iPhone). Habla con el servicio con un MediaController, como Android Auto.
 */
@CapacitorPlugin(name = "Carro")
public class CarroPlugin extends Plugin {

    private interface Accion {
        void con(MediaController control);
    }

    private final Handler principal = new Handler(Looper.getMainLooper());
    private final List<Runnable> pendientes = new ArrayList<>();
    private ListenableFuture<MediaController> futuro;
    private MediaController control;
    private CoordinadorWeb coordinador;
    private String ultimoEstado = "idle";

    /** Mientras suena una lección, la posición se cuenta cada segundo (para la barra de la página). */
    private final Runnable cadaSegundo = new Runnable() {
        @Override
        public void run() {
            if (control == null || !control.isPlaying()) return;
            emitir();
            principal.postDelayed(this, 1000);
        }
    };

    @Override
    public void load() {
        FuenteCatalogo fuente = FuenteCatalogo.get(getContext());
        if (fuente.coordinarWeb && getBridge() != null && getBridge().getWebView() != null) {
            coordinador = new CoordinadorWeb(getBridge().getWebView(), fuente.origenesWeb, this::alSonarLaWeb);
        }
        conectar();
        fuente.refrescar(false, null);
    }

    @Override
    protected void handleOnDestroy() {
        principal.removeCallbacksAndMessages(null);
        if (futuro != null) MediaController.releaseFuture(futuro);
        control = null;
        super.handleOnDestroy();
    }

    private void conectar() {
        SessionToken token = new SessionToken(getContext(), new ComponentName(getContext(), ServicioCarro.class));
        futuro = new MediaController.Builder(getContext(), token)
            .setListener(new MediaController.Listener() {
                @Override
                public void onExtrasChanged(MediaController c, Bundle extras) {
                    emitir();
                }

                @Override
                public void onDisconnected(MediaController c) {
                    control = null;
                }
            })
            .buildAsync();
        final ListenableFuture<MediaController> este = futuro;
        este.addListener(() -> {
            try {
                control = este.get();
                control.addListener(new Player.Listener() {
                    @Override
                    public void onEvents(Player jugador, Player.Events eventos) {
                        emitir();
                        if (jugador.isPlaying()) {
                            principal.removeCallbacks(cadaSegundo);
                            principal.postDelayed(cadaSegundo, 1000);
                        }
                    }
                });
                emitir();
            } catch (Exception e) {
                control = null;
            }
            List<Runnable> todos = new ArrayList<>(pendientes);
            pendientes.clear();
            for (Runnable pendiente : todos) pendiente.run();
        }, ContextCompat.getMainExecutor(getContext()));
    }

    /** Hace algo con el reproductor (en el hilo principal), esperando la conexión si hace falta. */
    private void conControl(PluginCall call, Accion accion) {
        principal.post(() -> {
            if (control != null) {
                accion.con(control);
                call.resolve();
                return;
            }
            pendientes.add(() -> {
                if (control == null) {
                    call.reject("El reproductor no está disponible");
                    return;
                }
                accion.con(control);
                call.resolve();
            });
            if (futuro == null || futuro.isDone()) conectar();
        });
    }

    private void alSonarLaWeb() {
        // El oyente le dio play a algo de la página: se calla lo nativo.
        if (control != null && control.getPlayWhenReady()) control.pause();
    }

    private void emitir() {
        JSObject foto = foto();
        String estado = foto.getString("estado", "idle");
        if (coordinador != null && suena(estado) && !suena(ultimoEstado)) coordinador.pausarWeb();
        ultimoEstado = estado;
        notifyListeners("estado", foto);
    }

    private static boolean suena(String estado) {
        return "connecting".equals(estado) || "playing".equals(estado) || "buffering".equals(estado) || "reconnecting".equals(estado);
    }

    private JSObject foto() {
        JSObject foto = null;
        if (control != null) {
            String texto = control.getSessionExtras().getString(ServicioCarro.CLAVE_ESTADO);
            if (texto != null) {
                try {
                    foto = new JSObject(texto);
                } catch (JSONException ignorado) {
                    foto = null;
                }
            }
        }
        if (foto == null) {
            foto = new JSObject();
            foto.put("estado", "idle");
            foto.put("id", (Object) null);
            foto.put("titulo", "");
            foto.put("artista", "");
            foto.put("enVivo", false);
            foto.put("posicion", 0);
            foto.put("intento", 0);
            foto.put("velocidad", 1);
            foto.put("volumen", 1);
        }
        if (control != null && !foto.optBoolean("enVivo", false) && control.getMediaItemCount() > 0) {
            // La posición de una lección, al día (los extras de la sesión no se mandan cada segundo).
            foto.put("posicion", control.getCurrentPosition() / 1000.0);
            long duracion = control.getDuration();
            if (duracion != C.TIME_UNSET && duracion > 0) foto.put("duracion", duracion / 1000.0);
        }
        return foto;
    }

    @PluginMethod
    public void ponerCatalogo(PluginCall call) {
        String json = call.getString("json");
        if (json == null || !FuenteCatalogo.get(getContext()).poner(json)) {
            call.reject("El catálogo no es válido");
            return;
        }
        call.resolve();
    }

    @PluginMethod
    public void reproducir(PluginCall call) {
        String id = call.getString("id");
        if (id == null) {
            call.reject("Falta el id");
            return;
        }
        conControl(call, c -> {
            MediaItem actual = c.getCurrentMediaItem();
            if (actual != null && id.equals(actual.mediaId) && c.getPlayWhenReady()) {
                // Ya suena: tocarlo otra vez no lo corta.
                if (c.getPlaybackState() == Player.STATE_IDLE) c.prepare();
                return;
            }
            c.setMediaItem(new MediaItem.Builder().setMediaId(id).build());
            c.prepare();
            c.play();
        });
    }

    @PluginMethod
    public void pausar(PluginCall call) {
        conControl(call, MediaController::pause);
    }

    @PluginMethod
    public void reanudar(PluginCall call) {
        conControl(call, c -> {
            if (c.getMediaItemCount() == 0) {
                // Nada elegido todavía: el servicio pone la radio en vivo.
                c.setMediaItem(new MediaItem.Builder().build());
            }
            if (c.getPlaybackState() == Player.STATE_IDLE) c.prepare();
            c.play();
        });
    }

    @PluginMethod
    public void detener(PluginCall call) {
        conControl(call, c -> c.sendCustomCommand(new SessionCommand(ServicioCarro.ORDEN_DETENER, Bundle.EMPTY), Bundle.EMPTY));
    }

    @PluginMethod
    public void volumen(PluginCall call) {
        Double valor = call.getDouble("valor");
        float volumen = valor == null ? 1f : (float) Math.max(0, Math.min(1, valor));
        conControl(call, c -> c.setVolume(volumen));
    }

    @PluginMethod
    public void dormir(PluginCall call) {
        Double minutos = call.getDouble("minutos");
        Bundle datos = new Bundle();
        datos.putDouble("minutos", minutos == null ? 0 : minutos);
        conControl(call, c -> c.sendCustomCommand(new SessionCommand(ServicioCarro.ORDEN_DORMIR, Bundle.EMPTY), datos));
    }

    @PluginMethod
    public void estado(PluginCall call) {
        principal.post(() -> call.resolve(foto()));
    }

    @PluginMethod
    public void refrescar(PluginCall call) {
        principal.post(() -> FuenteCatalogo.get(getContext()).refrescar(true, () -> {
            JSObject respuesta = new JSObject();
            respuesta.put("cambio", true);
            call.resolve(respuesta);
        }));
    }
}
