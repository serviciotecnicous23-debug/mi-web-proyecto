/**
 * La revisión automática de las prácticas (la usan las pruebas: server/academia-practicas.test.ts). Una práctica no se
 * publica si algo falla:
 * - cada frase `apoyo` está copiada de la lección (de su texto, su idea clave, «Para la vida» o sus objetivos);
 * - cada objetivo de la lección tiene al menos una actividad que se califica;
 * - cada actividad trae dos versiones o más, bien armadas para su pieza;
 * - las respuestas para escribir se corrigen bien con su propia respuesta modelo (90 o más).
 */
import type { LeccionContenido } from "../tipos";
import { problemasDeClave } from "../../academia-correccion";
import { esCalificable } from "@shared/practicas";
import type { Actividad, PracticasMateria, VersionExplica } from "./tipos";

/** Todo el texto de una lección, para buscar las frases de apoyo. */
export function textoDeLeccion(l: LeccionContenido): string {
  const partes: string[] = [...l.objetivos, l.paraEmpezar, l.ideaClave, l.paraLaVida.texto, l.paraLaVida.pregunta];
  for (const b of l.bloques) {
    switch (b.t) {
      case "parrafo":
      case "subtitulo":
        partes.push(b.texto);
        break;
      case "lista":
        partes.push(...b.items);
        break;
      case "nota":
        partes.push(b.titulo ?? "", b.texto);
        break;
      case "linea":
        partes.push(b.titulo, ...b.eventos.flatMap((e) => [e.fecha, e.texto]));
        break;
      case "cuadro":
        partes.push(b.titulo, ...b.columnas, ...b.filas.flat());
        break;
      case "pasos":
        partes.push(b.titulo, ...b.pasos.flatMap((p) => [p.titulo, p.texto]));
        break;
      case "imagen":
        partes.push(b.alt, b.pie ?? "");
        break;
      default:
        break;
    }
  }
  return partes.join("\n");
}

/** Para comparar frases: sin mayúsculas, con los espacios juntos y sin el punto final. */
export function normalizarFrase(s: string): string {
  return s
    .normalize("NFC")
    .toLowerCase()
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[.,;:]+$/, "")
    .trim();
}

/** Si la frase está en la lección (copiada tal cual, salvo mayúsculas, espacios y el punto final). */
export function estaEnLeccion(frase: string, texto: string): boolean {
  const f = normalizarFrase(frase);
  return f.length >= 12 && normalizarFrase(texto).includes(f);
}

const HUECO = /\[\[([^\]]+)\]\]/g;
/** Las palabras de los huecos de un texto con [[ ]]. */
export const huecosDe = (texto: string) => [...texto.matchAll(HUECO)].map((m) => m[1].trim());

const vacio = (s: unknown) => typeof s !== "string" || !s.trim();

/**
 * Los largos máximos de lo que se muestra (en letras): en el teléfono, un texto más largo no cabe bien en una tarjeta,
 * un botón o un recuadro, y las formas de jugar (deslizar, elegir entre tres…) lo muestran en espacios chicos.
 */
export const LARGOS = { grupo: 40, frase: 90, frente: 90, reverso: 120, afirmacion: 140, opcion: 150, parIzq: 70, parDer: 90, paso: 90, nodo: 40, relacion: 28, fecha: 30 } as const;

function problemasDeVersion(a: Actividad, v: any, donde: string, texto: string): string[] {
  const out: string[] = [];
  const largo = (s: unknown, max: number, que: string) => {
    if (typeof s === "string" && s.length > max) out.push(`${donde}: ${que} es muy largo (${s.length} letras; máximo ${max}): «${s.slice(0, 50)}…»`);
  };
  const apoyo = (frase: string, d = donde) => {
    if (vacio(frase)) out.push(`${d}: falta la frase de la lección (apoyo)`);
    else if (!estaEnLeccion(frase, texto)) out.push(`${d}: la frase de apoyo no está en la lección: «${frase}»`);
  };
  const explica = () => {
    if (vacio(v.explica)) out.push(`${donde}: falta la explicación`);
  };
  const entre = (n: number, min: number, max: number, que: string) => {
    if (n < min || n > max) out.push(`${donde}: ${que} debe tener de ${min} a ${max} (tiene ${n})`);
  };
  switch (a.pieza) {
    case "tarjetas": {
      entre(v.tarjetas?.length ?? 0, 3, 5, "las tarjetas");
      (v.tarjetas ?? []).forEach((t: any, i: number) => {
        if (vacio(t.frente) || vacio(t.reverso)) out.push(`${donde}: la tarjeta ${i + 1} está incompleta`);
        apoyo(t.apoyo, `${donde} tarjeta ${i + 1}`);
        largo(t.frente, LARGOS.frente, `la pregunta de la tarjeta ${i + 1}`);
        largo(t.reverso, LARGOS.reverso, `la respuesta de la tarjeta ${i + 1}`);
      });
      // (en «Relámpago», las respuestas de las otras tarjetas son las opciones que no van: deben ser distintas)
      if (new Set((v.tarjetas ?? []).map((t: any) => normalizarFrase(t.reverso))).size !== (v.tarjetas ?? []).length) out.push(`${donde}: dos tarjetas tienen la misma respuesta`);
      break;
    }
    case "completa": {
      apoyo(v.apoyo);
      explica();
      const huecos = huecosDe(v.texto ?? "");
      entre(huecos.length, 1, 4, "los huecos");
      entre(v.distractores?.length ?? 0, 2, 4, "las palabras que no van");
      const buenas = new Set(huecos.map((h) => h.toLowerCase()));
      for (const d of v.distractores ?? []) if (buenas.has(String(d).toLowerCase())) out.push(`${donde}: «${d}» es a la vez respuesta y distractor`);
      for (const k of Object.keys(v.errores ?? {})) if (!(v.distractores ?? []).includes(k)) out.push(`${donde}: el error explicado «${k}» no está entre las palabras que no van`);
      break;
    }
    case "relaciona": {
      apoyo(v.apoyo);
      explica();
      const pares = (v.pares ?? []) as [string, string][];
      entre(pares.length, 3, 5, "los pares");
      for (const p of pares) {
        largo(p[0], LARGOS.parIzq, "una idea de la izquierda");
        largo(p[1], LARGOS.parDer, "una idea de la derecha");
      }
      if (new Set(pares.map((p) => p[0])).size !== pares.length || new Set(pares.map((p) => p[1])).size !== pares.length) out.push(`${donde}: hay pares repetidos`);
      if (pares.some((p) => vacio(p[0]) || vacio(p[1]))) out.push(`${donde}: hay un par incompleto`);
      break;
    }
    case "clasifica": {
      apoyo(v.apoyo);
      explica();
      const grupos = v.grupos ?? [];
      entre(grupos.length, 2, 3, "los grupos");
      const frases = v.frases ?? [];
      entre(frases.length, 4, 8, "las frases");
      for (const g of grupos) largo(g, LARGOS.grupo, "el nombre de un grupo");
      for (const f of frases) largo(f.texto, LARGOS.frase, "una frase");
      for (const f of frases) if (!Number.isInteger(f.grupo) || f.grupo < 0 || f.grupo >= grupos.length) out.push(`${donde}: «${f.texto}» va a un grupo que no existe`);
      for (let g = 0; g < grupos.length; g++) if (!frases.some((f: any) => f.grupo === g)) out.push(`${donde}: el grupo «${grupos[g]}» no tiene frases`);
      break;
    }
    case "ordena": {
      apoyo(v.apoyo);
      explica();
      if (vacio(v.consigna)) out.push(`${donde}: falta la consigna`);
      entre(v.pasos?.length ?? 0, 3, 6, "los pasos");
      if (new Set(v.pasos ?? []).size !== (v.pasos ?? []).length) out.push(`${donde}: hay pasos repetidos`);
      for (const p of v.pasos ?? []) largo(p, LARGOS.paso, "un paso");
      break;
    }
    case "verdad": {
      const af = v.afirmaciones ?? [];
      entre(af.length, 2, 4, "las afirmaciones");
      af.forEach((x: any, i: number) => {
        if (vacio(x.texto) || vacio(x.explica) || typeof x.verdad !== "boolean") out.push(`${donde}: la afirmación ${i + 1} está incompleta`);
        apoyo(x.apoyo, `${donde} afirmación ${i + 1}`);
        largo(x.texto, LARGOS.afirmacion, `la afirmación ${i + 1}`);
      });
      if (af.length >= 2 && (af.every((x: any) => x.verdad) || af.every((x: any) => !x.verdad))) out.push(`${donde}: mezcla verdades y errores (no todas iguales)`);
      break;
    }
    case "error": {
      apoyo(v.apoyo);
      explica();
      entre(v.frases?.length ?? 0, 3, 5, "las frases");
      if (!Number.isInteger(v.malo) || v.malo < 0 || v.malo >= (v.frases?.length ?? 0)) out.push(`${donde}: la frase con el error no existe`);
      if (vacio(v.correccion)) out.push(`${donde}: falta cómo debería decir`);
      break;
    }
    case "situacion": {
      apoyo(v.apoyo);
      explica();
      if (vacio(v.caso) || vacio(v.pregunta)) out.push(`${donde}: falta el caso o la pregunta`);
      const op = v.opciones ?? [];
      entre(op.length, 3, 4, "las opciones");
      if (op.filter((o: any) => o.bien).length !== 1) out.push(`${donde}: debe haber una sola opción buena`);
      if (op.some((o: any) => vacio(o.texto) || vacio(o.explica))) out.push(`${donde}: cada opción lleva su texto y su explicación`);
      for (const o of op) largo(o.texto, LARGOS.opcion, "una opción");
      break;
    }
    case "explica": {
      const e = v as VersionExplica;
      apoyo(e.apoyo);
      if (e.clave?.tipo !== "corta") out.push(`${donde}: la clave debe ser de tipo «corta»`);
      for (const p of e.clave ? problemasDeClave(e.clave) : ["falta la clave"]) out.push(`${donde}: ${p}`);
      break;
    }
    case "linea": {
      apoyo(v.apoyo);
      explica();
      if (vacio(v.consigna)) out.push(`${donde}: falta la consigna`);
      entre(v.eventos?.length ?? 0, 4, 7, "los hechos");
      if ((v.eventos ?? []).some((e: any) => vacio(e.texto) || vacio(e.fecha))) out.push(`${donde}: cada hecho lleva su texto y su fecha`);
      for (const e of v.eventos ?? []) {
        largo(e.texto, LARGOS.paso, "un hecho");
        largo(e.fecha, LARGOS.fecha, "una fecha");
      }
      break;
    }
    case "mapa-ideas": {
      apoyo(v.apoyo);
      explica();
      const nodos = v.nodos ?? [];
      entre(nodos.length, 3, 6, "las ideas");
      const ids = new Set(nodos.map((n: any) => n.id));
      if (ids.size !== nodos.length) out.push(`${donde}: hay ideas con el mismo id`);
      for (const n of nodos) if (!(n.x >= 0 && n.x <= 100 && n.y >= 0 && n.y <= 100)) out.push(`${donde}: la idea ${n.id} está fuera del lienzo`);
      for (const n of nodos) largo(n.texto, LARGOS.nodo, `la idea ${n.id}`);
      const enlaces = v.enlaces ?? [];
      entre(enlaces.length, 2, 6, "los enlaces");
      for (const e of enlaces) if (!ids.has(e.de) || !ids.has(e.a) || vacio(e.relacion)) out.push(`${donde}: el enlace ${e.de}→${e.a} no está bien`);
      for (const r of [...enlaces.map((e: any) => e.relacion), ...(v.distractores ?? [])]) largo(r, LARGOS.relacion, "una relación");
      const opciones = new Set([...enlaces.map((e: any) => e.relacion), ...(v.distractores ?? [])]);
      if (opciones.size < 3) out.push(`${donde}: hacen falta al menos 3 relaciones para elegir`);
      break;
    }
    case "mapa": {
      apoyo(v.apoyo);
      explica();
      if (vacio(v.imagen) || vacio(v.alt)) out.push(`${donde}: falta la imagen o su descripción`);
      entre(v.lugares?.length ?? 0, 2, 5, "los lugares");
      for (const l of v.lugares ?? []) if (vacio(l.nombre) || !(l.x >= 0 && l.x <= 100 && l.y >= 0 && l.y <= 100)) out.push(`${donde}: el lugar «${l.nombre}» no está bien`);
      break;
    }
    case "pasaje": {
      apoyo(v.apoyo);
      explica();
      if (vacio(v.ref) || vacio(v.consigna)) out.push(`${donde}: falta la cita o la consigna`);
      if (!huecosDe(v.texto ?? "").length) out.push(`${donde}: marca con [[ ]] las palabras que hay que tocar`);
      // (el pasaje es la RV1960 al pie de la letra: se copia de una cita escrita en la lección, entre « »)
      if (!estaEnLeccion(String(v.texto ?? "").replace(HUECO, "$1"), texto)) out.push(`${donde}: el pasaje debe estar copiado tal cual de una cita de la lección`);
      break;
    }
    case "escenario": {
      apoyo(v.apoyo);
      if (vacio(v.situacion)) out.push(`${donde}: falta la situación`);
      const escenas = v.escenas ?? [];
      if (escenas.length < 2) out.push(`${donde}: hacen falta al menos 2 escenas`);
      const ids = new Set(escenas.map((e: any) => e.id));
      for (const e of escenas) {
        if ((e.opciones ?? []).length < 2) out.push(`${donde}: la escena ${e.id} necesita 2 opciones o más`);
        if (!(e.opciones ?? []).some((o: any) => o.valor === 2)) out.push(`${donde}: la escena ${e.id} no tiene una opción ejemplar`);
        for (const o of e.opciones ?? []) {
          if (o.siguiente && o.siguiente !== "fin" && !ids.has(o.siguiente)) out.push(`${donde}: una opción de ${e.id} lleva a una escena que no existe (${o.siguiente})`);
          if (vacio(o.explica)) out.push(`${donde}: cada opción de ${e.id} lleva su explicación`);
        }
      }
      // sin vueltas: cada camino termina (sin `siguiente`, sigue la escena de abajo; «fin» termina)
      const visitar = (id: string, camino: string[]): boolean => {
        if (camino.includes(id)) return false;
        const i = escenas.findIndex((x: any) => x.id === id);
        if (i < 0) return true;
        const e = escenas[i];
        return (e.opciones ?? []).every((o: any) => {
          const sig = o.siguiente === "fin" ? null : o.siguiente || escenas[i + 1]?.id || null;
          return !sig || visitar(sig, [...camino, id]);
        });
      };
      if (escenas[0] && !visitar(escenas[0].id, [])) out.push(`${donde}: las escenas forman una vuelta sin fin`);
      break;
    }
    case "caso": {
      apoyo(v.apoyo);
      if (vacio(v.titulo) || !(v.relato ?? []).length) out.push(`${donde}: falta el título o el relato`);
      entre(v.pasos?.length ?? 0, 2, 5, "los pasos");
      for (const [i, p] of (v.pasos ?? []).entries()) {
        if (p.tipo === "situacion") {
          if ((p.opciones ?? []).filter((o: any) => o.bien).length !== 1) out.push(`${donde} paso ${i + 1}: debe haber una sola opción buena`);
        } else if (p.tipo === "explica") {
          for (const x of problemasDeClave(p.clave)) out.push(`${donde} paso ${i + 1}: ${x}`);
        } else out.push(`${donde} paso ${i + 1}: tipo de paso desconocido`);
      }
      break;
    }
  }
  return out;
}

/** Los problemas de las prácticas de una materia (vacío si está todo bien). */
export function problemasDePracticas(p: PracticasMateria, contenido: Map<string, LeccionContenido>, leccionesDeMateria: string[]): string[] {
  const out: string[] = [];
  for (const [leccionId, actividades] of Object.entries(p.lecciones)) {
    const l = contenido.get(leccionId);
    if (!l || !leccionesDeMateria.includes(leccionId)) {
      out.push(`${leccionId}: no es una lección de ${p.materia}`);
      continue;
    }
    const texto = textoDeLeccion(l);
    const ids = new Set<string>();
    for (const a of actividades) {
      const donde = `${leccionId}/${a.id}`;
      if (ids.has(a.id)) out.push(`${donde}: id repetido`);
      ids.add(a.id);
      if (!Number.isInteger(a.objetivo) || a.objetivo < 0 || a.objetivo >= l.objetivos.length) out.push(`${donde}: el objetivo ${a.objetivo} no existe`);
      if ((a.versiones?.length ?? 0) < 2) out.push(`${donde}: necesita dos versiones o más`);
      (a.versiones as any[]).forEach((v, i) => out.push(...problemasDeVersion(a, v, `${donde} v${i + 1}`, texto)));
    }
    const calificables = actividades.filter((a) => esCalificable(a.pieza));
    for (let o = 0; o < l.objetivos.length; o++) {
      if (!calificables.some((a) => a.objetivo === o)) out.push(`${leccionId}: el objetivo ${o + 1} no tiene una actividad que se califique`);
    }
    if (calificables.length < 3 || calificables.length > 8) out.push(`${leccionId}: debe tener de 3 a 8 actividades que se califiquen (tiene ${calificables.length})`);
  }
  return out;
}
