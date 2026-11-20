package com.ministerioavivandoelfuego.carro;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

/** Pedidos pequeños (catálogo y «qué suena»): fuera del hilo principal. */
final class Http {
    private static final int MAXIMO_BYTES = 2 * 1024 * 1024;

    private Http() {}

    /** El texto de la respuesta si fue 200, o null. */
    static String traer(String direccion, String galletas, int esperaMs) {
        HttpURLConnection conexion = null;
        try {
            conexion = (HttpURLConnection) new URL(direccion).openConnection();
            conexion.setConnectTimeout(esperaMs);
            conexion.setReadTimeout(esperaMs);
            conexion.setUseCaches(false);
            conexion.setRequestProperty("Accept", "application/json");
            conexion.setRequestProperty("X-Carro", "android");
            if (galletas != null && !galletas.isEmpty()) conexion.setRequestProperty("Cookie", galletas);
            if (conexion.getResponseCode() != 200) return null;
            try (InputStream entrada = conexion.getInputStream()) {
                ByteArrayOutputStream salida = new ByteArrayOutputStream();
                byte[] buffer = new byte[16384];
                int leidos;
                while ((leidos = entrada.read(buffer)) != -1) {
                    salida.write(buffer, 0, leidos);
                    if (salida.size() > MAXIMO_BYTES) return null;
                }
                return new String(salida.toByteArray(), StandardCharsets.UTF_8);
            }
        } catch (Exception e) {
            return null;
        } finally {
            if (conexion != null) conexion.disconnect();
        }
    }
}
