package com.ministerioavivandoelfuego.carro;

/**
 * Las esperas entre reintentos, iguales a las de la app web (src/audio/radioEngine.ts) y a las del
 * iPhone (Reproductor.swift): 1, 2, 4, 8, 15 s y luego cada 30 s, sin límite.
 */
final class Reintentos {
    static final long[] ESPERAS_MS = {1000, 2000, 4000, 8000, 15000, 30000};
    /** Un directo congelado más de esto se da por perdido. */
    static final long SIN_AVANCE_EN_VIVO_MS = 12000;
    static final long SIN_AVANCE_ARCHIVO_MS = 30000;
    /** Tras este tiempo sonando sin cortes, la conexión se considera estable. */
    static final long ESTABLE_TRAS_MS = 20000;
    /** Un archivo (lección) que falla tantas veces seguidas se deja: quizá ya no existe. */
    static final int MAXIMO_ARCHIVO = 6;

    private Reintentos() {}

    /** La espera antes del intento número {@code intento} (1, 2, 3…). */
    static long espera(int intento) {
        int i = Math.max(1, intento) - 1;
        return ESPERAS_MS[Math.min(i, ESPERAS_MS.length - 1)];
    }
}
