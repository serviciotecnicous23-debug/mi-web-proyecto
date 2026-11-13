/**
 * Qué pantalla tiene cada juego de grupo tradicional del patio (shared/mesa/juegos.ts).
 */
import type { ComponentType } from "react";
import type { JuegoMesaId } from "@shared/mesa/juegos";
import type { PropsMesa } from "./vida";
import { LoteriaUI } from "./LoteriaUI";
import { GeneralaUI } from "./GeneralaUI";
import { EscalerasUI } from "./EscalerasUI";
import { DamasChinasUI } from "./DamasChinasUI";
import { MemoriaUI } from "./MemoriaUI";
import { BastaUI } from "./BastaUI";
import { DibujaUI } from "./DibujaUI";

export type { JuegoMesaId };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UI_MESAS: Record<JuegoMesaId, ComponentType<PropsMesa<any, any>>> = {
  loteria: LoteriaUI,
  generala: GeneralaUI,
  escaleras: EscalerasUI,
  "damas-chinas": DamasChinasUI,
  memoria: MemoriaUI,
  basta: BastaUI,
  dibuja: DibujaUI,
};
