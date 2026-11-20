package com.ministerioavivandoelfuego.carro;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Handler;
import android.os.Looper;
import android.os.SystemClock;
import android.webkit.CookieManager;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 * El catálogo vigente. Lo que cada app pone en capacitor.config.ts → plugins.Carro:
 * titulo, catalogo (el de fábrica), catalogoUrl (de dónde traerlo al día, con la sesión del usuario),
 * coordinarWeb y origenesWeb (la página de la app también reproduce audio).
 * Orden de preferencia: el último bueno guardado en el teléfono y, si no hay, el de fábrica.
 * Todo se usa desde el hilo principal.
 */
public final class FuenteCatalogo {

    public interface Oyente {
        void alCambiar(Catalogo catalogo);
    }

    private static FuenteCatalogo instancia;

    public static synchronized FuenteCatalogo get(Context contexto) {
        if (instancia == null) instancia = new FuenteCatalogo(contexto.getApplicationContext());
        return instancia;
    }

    public final String titulo;
    public final String catalogoUrl;
    public final boolean coordinarWeb;
    public final Set<String> origenesWeb;

    private final SharedPreferences preferencias;
    private final List<Oyente> oyentes = new CopyOnWriteArrayList<>();
    private final ExecutorService red = Executors.newSingleThreadExecutor();
    private final Handler principal = new Handler(Looper.getMainLooper());
    private final List<Runnable> esperando = new ArrayList<>();
    private Catalogo actual;
    private long ultimaConsulta;
    private boolean consultando;

    private FuenteCatalogo(Context contexto) {
        preferencias = contexto.getSharedPreferences("carro", Context.MODE_PRIVATE);
        JSONObject ajustes = ajustes(contexto);
        String nombre = Catalogo.texto(ajustes, "titulo");
        titulo = nombre != null ? nombre : "Avivando el Fuego";
        List<String> url = new ArrayList<>();
        String texto = Catalogo.texto(ajustes, "catalogoUrl");
        if (texto != null) url = Catalogo.enlaces(new JSONArray().put(texto));
        catalogoUrl = url.isEmpty() ? null : url.get(0);
        coordinarWeb = ajustes.optBoolean("coordinarWeb", false);
        Set<String> origenes = new LinkedHashSet<>();
        JSONArray lista = ajustes.optJSONArray("origenesWeb");
        if (lista != null) {
            for (int i = 0; i < lista.length(); i++) {
                String origen = lista.optString(i, "").trim();
                if (!origen.isEmpty()) origenes.add(origen);
            }
        }
        origenesWeb = origenes;

        Catalogo guardado = Catalogo.desde(preferencias.getString("catalogo", null));
        Catalogo deFabrica = Catalogo.desde(ajustes.optJSONObject("catalogo"));
        actual = guardado != null ? guardado : deFabrica != null ? deFabrica : Catalogo.vacio(titulo);
    }

    /** plugins.Carro del capacitor.config.json que Capacitor pone dentro de la app. */
    private static JSONObject ajustes(Context contexto) {
        try (InputStream entrada = contexto.getAssets().open("capacitor.config.json")) {
            ByteArrayOutputStream salida = new ByteArrayOutputStream();
            byte[] buffer = new byte[8192];
            int leidos;
            while ((leidos = entrada.read(buffer)) != -1) salida.write(buffer, 0, leidos);
            JSONObject config = new JSONObject(new String(salida.toByteArray(), StandardCharsets.UTF_8));
            JSONObject plugins = config.optJSONObject("plugins");
            JSONObject carro = plugins != null ? plugins.optJSONObject("Carro") : null;
            if (carro == null) carro = new JSONObject();
            if (!carro.has("titulo") && config.has("appName")) carro.put("titulo", config.optString("appName"));
            return carro;
        } catch (Exception e) {
            return new JSONObject();
        }
    }

    public Catalogo actual() {
        return actual;
    }

    public void agregarOyente(Oyente oyente) {
        oyentes.add(oyente);
    }

    public void quitarOyente(Oyente oyente) {
        oyentes.remove(oyente);
    }

    /** Pone un catálogo nuevo si es válido (lo manda la página de la app). Devuelve si sirvió. */
    public boolean poner(String json) {
        Catalogo nuevo = Catalogo.desde(json);
        if (nuevo == null) return false;
        principal.post(() -> aplicar(nuevo));
        return true;
    }

    private void aplicar(Catalogo nuevo) {
        preferencias.edit().putString("catalogo", nuevo.json).apply();
        if (actual.json.equals(nuevo.json)) return;
        actual = nuevo;
        for (Oyente oyente : oyentes) oyente.alCambiar(nuevo);
    }

    /**
     * Trae el catálogo del servidor (solo si la app tiene catalogoUrl), como mucho una vez por minuto
     * salvo que se fuerce. {@code listo} se llama en el hilo principal al terminar.
     */
    public void refrescar(boolean forzar, Runnable listo) {
        if (catalogoUrl == null) {
            if (listo != null) principal.post(listo);
            return;
        }
        if (listo != null) esperando.add(listo);
        if (consultando) return;
        long ahora = SystemClock.elapsedRealtime();
        if (!forzar && ultimaConsulta != 0 && ahora - ultimaConsulta < 60000) {
            terminar();
            return;
        }
        consultando = true;
        ultimaConsulta = ahora;
        String galletas = null;
        try {
            // La sesión del usuario en la web del ministerio (la página de la app la guardó aquí).
            galletas = CookieManager.getInstance().getCookie(catalogoUrl);
        } catch (Exception e) {
            // Sin WebView disponible (se está actualizando): el catálogo público basta.
        }
        final String cabecera = galletas;
        red.execute(() -> {
            String json = Http.traer(catalogoUrl, cabecera, 10000);
            Catalogo nuevo = Catalogo.desde(json);
            principal.post(() -> {
                consultando = false;
                if (nuevo != null) aplicar(nuevo);
                terminar();
            });
        });
    }

    private void terminar() {
        List<Runnable> todos = new ArrayList<>(esperando);
        esperando.clear();
        for (Runnable aviso : todos) aviso.run();
    }
}
