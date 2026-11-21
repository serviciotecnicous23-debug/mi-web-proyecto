/**
 * El perfil completo de un alumno en el panel de la academia (docs/academia-panel.md, parte 2) y la bitácora de
 * seguimiento. Junta lo que la academia ya guarda de cada alumno:
 * - sus días de estudio (academia_estudio) y su meta;
 * - las lecciones con su repaso, su video y su reflexión (academia_lecciones);
 * - cada intento de examen con cada respuesta (academia_intentos) y el repaso del día (academia_repaso_preguntas);
 * - los versículos, el cuaderno, las actividades de su nivel y sus notas por partes.
 * De ahí salen su avance, su ritmo, sus fortalezas, lo que le cuesta, las alertas y su próximo paso.
 *
 * Lo ven quienes ven el avance (shared/academia-permisos.ts): la Administración, el equipo (director, maestros y
 * obreros, solo para ver) y la iglesia del alumno. El texto de las preguntas que más falla, las reflexiones de sus
 * lecciones y la bitácora los ve solo la Administración, que es la única que escribe en la bitácora.
 */
import type { Express, Request } from "express";
import { pool } from "./db";
import { APRUEBA, ESPECIALIDADES, NIVELES, NOMBRE_COMPONENTE, leccionPorId, materiaPorId, pesosDe, type Bloom, type MateriaDef } from "@shared/academia";
import { alcanceDe, type Capacidad } from "@shared/academia-permisos";
import { ACTIVIDADES_NIVEL, requisitosDeActividades } from "@shared/academia-actividades";
import {
  LIMITES_SEGUIMIENTO, NOMBRE_BLOOM, TIPOS_SEGUIMIENTO, agruparAciertos, alertasDe, diasEntre, diasRecientes, lunesDe, porciento, rachaVigente, semanasDe,
  tipoDeClave, type Acierto, type EspecialidadAvance, type InformeMateria, type IntentoExamen, type MateriaNotas, type NivelAvance, type NotaSeguimiento,
  type PerfilAlumno, type PreguntaDificil, type TipoSeguimiento,
} from "@shared/academia-perfil";
import { BANCOS } from "./academia/index";
import { CASOS } from "./academia/casos";
import { claveFinal, componentesDe, diaTexas, frenar } from "./academia-comun";
import { avancesPorAlumno, filasDe, permisoDe } from "./academia-direccion";
import { resumenDe } from "./academia-actividades-datos";
import { registrar } from "./academia-revision";

const SQL_SEGUIMIENTO = `
CREATE TABLE IF NOT EXISTS "academia_seguimiento" (
  "id" serial PRIMARY KEY,
  "alumno_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "autor_id" integer REFERENCES "users"("id") ON DELETE SET NULL,
  "tipo" text NOT NULL DEFAULT 'nota',
  "texto" text NOT NULL,
  "created_at" timestamp NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "academia_seguimiento_alumno" ON "academia_seguimiento" ("alumno_id", "created_at" DESC);
`;
let tablaLista: Promise<unknown> | null = null;
const asegurarTabla = () => (tablaLista ??= pool.query(SQL_SEGUIMIENTO).catch((e) => { tablaLista = null; throw e; }));

const iso = (v: unknown) => new Date(v as string).toISOString();
const limpio = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim().slice(0, max) : "");
const corto = (t: string, n = 140) => (t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t);
const grupoDe = (m: MateriaDef) => (m.nivel ? `Nivel ${m.nivel}` : ESPECIALIDADES.find((e) => e.id === m.especialidad)?.nombre ?? "Especialidad");

type InfoPregunta = { bloom: Bloom; materia: MateriaDef; leccion: number; texto: string };
let indice: Map<string, InfoPregunta> | null = null;
/** Cada pregunta objetiva de los bancos (repaso, final, mini y casos) con su materia, su lección, su tipo y su texto. */
function indicePreguntas(): Map<string, InfoPregunta> {
  if (indice) return indice;
  const m = new Map<string, InfoPregunta>();
  for (const [materiaId, banco] of BANCOS) {
    const materia = materiaPorId(materiaId);
    if (!materia) continue;
    const todas = [...Object.values(banco.repaso).flat(), ...banco.final, ...Object.values(banco.mini ?? {}).flat(), ...(CASOS[materiaId] ?? [])];
    for (const p of todas) m.set(p.id, { bloom: p.bloom, materia, leccion: p.leccion, texto: p.texto });
  }
  indice = m;
  return m;
}

/** El título de un examen por su clave. */
function tituloExamen(clave: string): string {
  const [ref] = clave.split(":");
  const tipo = tipoDeClave(clave);
  if (tipo === "integral") return `Examen integral del Nivel ${ref.replace("nivel-", "")}`;
  if (tipo === "trabajo") return `Trabajo final · ${ESPECIALIDADES.find((e) => `especialidad-${e.id}` === ref)?.nombre ?? ref}`;
  const m = materiaPorId(ref);
  const nombre = m?.titulo ?? ref;
  if (tipo === "final") return `Examen final · ${nombre}`;
  if (tipo === "mini") return `Mini prueba ${clave.split("mini-")[1] ?? ""} · ${nombre}`;
  if (tipo === "breve") return `Escrito breve · ${nombre}`;
  if (tipo === "suficiencia") return `Examen de suficiencia · ${nombre}`;
  return nombre;
}

type Permiso = NonNullable<Awaited<ReturnType<typeof permisoDe>>>;
const puede = (p: Permiso, c: Capacidad) => alcanceDe(p.role, c) !== "no";

/** El perfil completo de un alumno que el permiso deja ver (o null si no existe o no es de su iglesia). */
export async function perfilDe(p: Permiso, id: number): Promise<PerfilAlumno | null> {
  const [fila] = await filasDe(p, false, id);
  if (!fila) return null;
  const admin = puede(p, "revisar");
  const hoy = diaTexas();
  const ahora = Date.now();
  if (admin) await asegurarTabla();
  // de una en una: así el perfil no ocupa muchas conexiones a la vez (la ficha del alumno se pide al mismo tiempo)
  const uno = async (sql: string) => (await pool.query(sql, [id])).rows as any[];
  const al = await uno(`SELECT nivel, racha, racha_fecha, mentor_user_id, inscrito_at FROM academia_alumnos WHERE user_id = $1`);
  const est = await uno(`SELECT dia, minutos, sesiones FROM academia_estudio WHERE user_id = $1 ORDER BY dia`);
  const meta = await uno(`SELECT minutos_semana FROM academia_estudio_meta WHERE user_id = $1`);
  const lec = await uno(`SELECT leccion_id, vista_at, abierta_at, completada_at, repaso, reflexion, video_seg FROM academia_lecciones WHERE user_id = $1`);
  const ints = await uno(`SELECT clave, intento, nota, aciertos, de, respuestas, cerrado_at FROM academia_intentos WHERE user_id = $1 ORDER BY cerrado_at DESC`);
  const rep = await uno(`SELECT pregunta_id, aciertos, fallos, proximo_at, dominada_at FROM academia_repaso_preguntas WHERE user_id = $1`);
  const ver = await uno(`SELECT materia_id, aprendido_at, dominado_at FROM academia_versiculos WHERE user_id = $1`);
  const cua = await uno(
    `SELECT (SELECT count(*)::int FROM cuaderno_notas WHERE user_id = $1) AS notas, (SELECT count(*)::int FROM cuaderno_resaltados WHERE user_id = $1) AS resaltados`,
  ).catch(() => [{ notas: 0, resaltados: 0 }]);
  const pend = await uno(
    `SELECT (SELECT count(*)::int FROM academia_respuestas WHERE user_id = $1 AND revisar AND revisada_at IS NULL) AS escritas,
            (SELECT count(*)::int FROM academia_actividades WHERE user_id = $1 AND estado = 'pendiente') AS actividades`,
  );
  const niv = await uno(`SELECT nivel, completado_at, promedio FROM academia_niveles WHERE user_id = $1`);
  const certs = await uno(`SELECT ref, emitido_at FROM academia_certificados WHERE user_id = $1 AND tipo = 'especialidad' AND revocado_at IS NULL`);
  const avances = await avancesPorAlumno([id]);
  const a = al[0] as any;
  const materiasAv = avances.get(id) ?? [];

  // ---- el estudio
  const estudio = (est as any[]).map((r) => ({ dia: String(r.dia), minutos: Number(r.minutos), sesiones: Number(r.sesiones) }));
  const desde30 = diasRecientes([], hoy, 30)[0].dia;
  const ult30 = estudio.filter((e) => e.dia >= desde30);
  const completadas = (lec as any[]).filter((r) => r.completada_at).map((r) => diaTexas(new Date(r.completada_at)));
  const semanas = semanasDe(estudio, completadas, hoy, 12);
  const metaSemanal = Number((meta[0] as any)?.minutos_semana ?? 120);

  // ---- las notas por materia, con sus partes (de a una para no abrir muchas conexiones juntas)
  const hechasPorMateria = new Map<string, Set<string>>();
  for (const r of lec as any[]) {
    if (!r.completada_at) continue;
    const l = leccionPorId(r.leccion_id);
    if (!l) continue;
    if (!hechasPorMateria.has(l.materia.id)) hechasPorMateria.set(l.materia.id, new Set());
    hechasPorMateria.get(l.materia.id)!.add(l.leccion.id);
  }
  const materias: MateriaNotas[] = [];
  for (const av of materiasAv) {
    const m = materiaPorId(av.id);
    if (!m) continue;
    const comps = await componentesDe(id, m);
    const pesos = pesosDe(m);
    const hechas = hechasPorMateria.get(m.id) ?? new Set<string>();
    const siguiente = m.lecciones.find((l) => !hechas.has(l.id));
    materias.push({
      id: m.id,
      titulo: m.titulo,
      grupo: grupoDe(m),
      estado: av.estado === "aprobada" ? "aprobada" : "en-curso",
      nota: av.nota,
      componentes: (Object.keys(pesos) as (keyof typeof pesos)[])
        .filter((k) => pesos[k] > 0)
        // el final sin dar todavía no es un cero: va sin valor
        .map((k) => ({ id: k, texto: NOMBRE_COMPONENTE[k], peso: pesos[k], valor: comps[k] == null || (k === "final" && !av.intentos && av.estado !== "aprobada") ? null : Math.round(comps[k]!) })),
      lecciones: av.lecciones,
      de: av.de,
      siguiente: av.estado === "aprobada" || !siguiente ? null : siguiente.titulo,
      intentosFinal: av.intentos,
      mejorFinal: av.mejor,
    });
  }
  const aprobadas = materias.filter((m) => m.estado === "aprobada");
  const notas = aprobadas.map((m) => m.nota).filter((n): n is number => n != null);

  // ---- los niveles y las especialidades
  const nivelActual = NIVELES.find((n) => n.n === Number(a?.nivel ?? 1)) ?? null;
  const porNivel = new Map((niv as any[]).map((r) => [Number(r.nivel), r]));
  const niveles: NivelAvance[] = NIVELES.map((n) => {
    const r = porNivel.get(n.n);
    return {
      n: n.n,
      nombre: n.nombre,
      aprobadas: n.materias.filter((m) => aprobadas.some((x) => x.id === m.id)).length,
      enCurso: n.materias.filter((m) => materias.some((x) => x.id === m.id && x.estado === "en-curso")).length,
      de: n.materias.length,
      completado: r?.completado_at ? iso(r.completado_at) : null,
      promedio: r?.promedio == null ? null : Number(r.promedio),
      actual: nivelActual?.n === n.n,
    };
  });
  const certEsp = new Map((certs as any[]).map((r) => [String(r.ref), iso(r.emitido_at)]));
  const especialidades: EspecialidadAvance[] = ESPECIALIDADES.flatMap((e) => {
    const suyas = materias.filter((m) => e.materias.some((x) => x.id === m.id));
    if (!suyas.length && !certEsp.has(e.id)) return [];
    return [{ id: e.id, nombre: e.nombre, aprobadas: suyas.filter((m) => m.estado === "aprobada").length, enCurso: suyas.filter((m) => m.estado !== "aprobada").length, de: e.materias.length, completada: certEsp.get(e.id) ?? null }];
  });
  const delPrograma = NIVELES.flatMap((n) => n.materias);
  const aprobadasPrograma = delPrograma.filter((m) => aprobadas.some((x) => x.id === m.id)).length;

  // ---- los exámenes
  const examenes: IntentoExamen[] = (ints as any[]).slice(0, 60).map((r) => {
    const nota = Number(r.nota);
    return {
      clave: String(r.clave),
      titulo: tituloExamen(String(r.clave)),
      tipo: tipoDeClave(String(r.clave)),
      intento: Number(r.intento),
      nota,
      aciertos: Number(r.aciertos),
      de: Number(r.de),
      fecha: iso(r.cerrado_at),
      aprobado: nota >= APRUEBA,
    };
  });

  // ---- lo que acierta: cada respuesta de sus exámenes, del repaso de las lecciones (la primera vez) y del repaso del día
  const idx = indicePreguntas();
  const respuestas: { id: string; bien: boolean }[] = [];
  for (const r of ints as any[]) for (const x of Array.isArray(r.respuestas) ? r.respuestas : []) if (x?.id) respuestas.push({ id: String(x.id), bien: !!x.bien });
  for (const r of lec as any[]) {
    for (const [pid, v] of Object.entries((r.repaso ?? {}) as Record<string, { primera?: boolean; ok?: boolean }>)) {
      if (v && typeof v === "object" && ("primera" in v || "ok" in v)) respuestas.push({ id: pid, bien: v.primera ?? !!v.ok });
    }
  }
  const conInfo = respuestas.flatMap((r) => {
    const info = idx.get(r.id);
    return info ? [{ ...r, info }] : [];
  });
  const porBloomMapa = agruparAciertos(conInfo.map((r) => ({ clave: r.info.bloom, bien: r.bien })));
  const porBloom: Acierto[] = (Object.keys(NOMBRE_BLOOM) as Bloom[])
    .filter((b) => porBloomMapa.has(b))
    .map((b) => {
      const x = porBloomMapa.get(b)!;
      return { clave: b, nombre: NOMBRE_BLOOM[b], bien: x.bien, total: x.total, pct: porciento(x.bien, x.total) };
    });
  const claveLeccion = (r: (typeof conInfo)[number]) => `${r.info.materia.id}#${r.info.leccion}`;
  const porLeccionMapa = agruparAciertos(conInfo.map((r) => ({ clave: claveLeccion(r), bien: r.bien })));
  const porLeccion: Acierto[] = [...porLeccionMapa]
    .filter(([, x]) => x.total >= 3)
    .map(([clave, x]) => {
      const [materiaId, n] = clave.split("#");
      const m = materiaPorId(materiaId)!;
      const l = m.lecciones[Number(n) - 1];
      return { clave, nombre: l ? `Lección ${n}: ${l.titulo}` : `Lección ${n}`, detalle: m.titulo, bien: x.bien, total: x.total, pct: porciento(x.bien, x.total) };
    })
    .sort((x, y) => x.pct - y.pct || y.total - x.total);
  // las preguntas que más falla (del repaso del día y de los exámenes), con su texto: solo para la Administración
  let dificiles: PreguntaDificil[] | null = null;
  if (admin) {
    const fallos = new Map<string, { fallos: number; aciertos: number }>();
    for (const r of conInfo) {
      const x = fallos.get(r.id) ?? { fallos: 0, aciertos: 0 };
      if (r.bien) x.aciertos++;
      else x.fallos++;
      fallos.set(r.id, x);
    }
    for (const r of rep as any[]) {
      const x = fallos.get(String(r.pregunta_id)) ?? { fallos: 0, aciertos: 0 };
      x.fallos += Number(r.fallos ?? 0);
      x.aciertos += Number(r.aciertos ?? 0);
      fallos.set(String(r.pregunta_id), x);
    }
    dificiles = [...fallos]
      .filter(([pid, x]) => x.fallos >= 2 && idx.has(pid))
      .sort((x, y) => y[1].fallos - x[1].fallos || x[1].aciertos - y[1].aciertos)
      .slice(0, 8)
      .map(([pid, x]) => {
        const info = idx.get(pid)!;
        const l = info.materia.lecciones[info.leccion - 1];
        return { id: pid, texto: corto(info.texto, 180), donde: `${info.materia.titulo} · Lección ${info.leccion}${l ? `: ${l.titulo}` : ""}`, fallos: x.fallos, aciertos: x.aciertos };
      });
  }

  // ---- el repaso, los versículos y el cuaderno
  const repaso = {
    total: rep.length,
    dominadas: (rep as any[]).filter((r) => r.dominada_at).length,
    vencidas: (rep as any[]).filter((r) => !r.dominada_at && Date.parse(r.proximo_at) <= ahora).length,
    fallos: (rep as any[]).reduce((s, r) => s + Number(r.fallos ?? 0), 0),
  };
  const conVersiculo = materias.filter((m) => materiaPorId(m.id)?.memoria).length;
  const versiculos = { aprendidos: (ver as any[]).filter((r) => r.aprendido_at).length, dominados: (ver as any[]).filter((r) => r.dominado_at).length, de: conVersiculo };

  // ---- las actividades de los niveles (del 2 al 5) que ya empezó
  const actividades: PerfilAlumno["actividades"] = [];
  for (const n of NIVELES) {
    const pide = ACTIVIDADES_NIVEL[n.n as 1 | 2 | 3 | 4 | 5];
    if (!pide || n.n > (nivelActual?.n ?? 1)) continue;
    const r = await resumenDe(id, n.n);
    actividades.push({ nivel: n.n, nombre: n.nombre, requisitos: requisitosDeActividades(pide, r).map((q) => ({ texto: q.texto, detalle: q.detalle, hecho: q.hecho })) });
  }

  // ---- las reflexiones de sus lecciones (lo que escribe al terminar): solo la Administración
  const reflexiones = admin
    ? (lec as any[])
        .filter((r) => typeof r.reflexion === "string" && r.reflexion.trim())
        .sort((x, y) => Date.parse(y.completada_at ?? y.vista_at) - Date.parse(x.completada_at ?? x.vista_at))
        .slice(0, 8)
        .flatMap((r) => {
          const l = leccionPorId(r.leccion_id);
          return l ? [{ leccion: l.leccion.titulo, materia: l.materia.titulo, texto: corto(String(r.reflexion).trim(), 600), fecha: iso(r.completada_at ?? r.vista_at) }] : [];
        })
    : null;

  // ---- la bitácora de seguimiento: solo la Administración
  let seguimiento: NotaSeguimiento[] | null = null;
  if (admin) {
    const { rows } = await pool.query(
      `SELECT s.id, s.tipo, s.texto, s.created_at, u.display_name, u.username
         FROM academia_seguimiento s LEFT JOIN users u ON u.id = s.autor_id
        WHERE s.alumno_id = $1 ORDER BY s.created_at DESC LIMIT 100`,
      [id],
    );
    seguimiento = (rows as any[]).map((r) => ({ id: Number(r.id), tipo: r.tipo as TipoSeguimiento, texto: String(r.texto), autor: String(r.display_name || r.username || "La Administración"), fecha: iso(r.created_at) }));
  }

  // ---- las alertas, los logros y el próximo paso
  const diasSinEstudiar = Math.max(0, Math.floor((ahora - Date.parse(fila.ultima)) / 86_400_000));
  const diasInscrito = Math.max(0, Math.floor((ahora - Date.parse(fila.desde)) / 86_400_000));
  const enCurso = materias.filter((m) => m.estado === "en-curso");
  const reprobadas = enCurso
    .map((m) => ({ titulo: m.titulo, veces: (ints as any[]).filter((r) => r.clave === claveFinal(m.id) && Number(r.nota) < APRUEBA).length }))
    .filter((x) => x.veces > 0);
  const enCursoIds = new Set(enCurso.map((m) => m.id));
  const abiertas = (lec as any[]).flatMap((r) => {
    if (r.completada_at) return [];
    const l = leccionPorId(r.leccion_id);
    if (!l || !enCursoIds.has(l.materia.id)) return [];
    return [{ titulo: l.leccion.titulo, materia: l.materia.titulo, dias: Math.floor((ahora - Date.parse(r.abierta_at ?? r.vista_at)) / 86_400_000) }];
  });
  const racha = rachaVigente(Number(a?.racha ?? 0), a?.racha_fecha ?? null, hoy);
  const alertas = alertasDe({
    diasSinEstudiar,
    enCurso: enCurso.map((m) => m.titulo),
    lecciones: fila.lecciones,
    diasInscrito,
    reprobadas,
    notasRecientes: examenes.filter((e) => e.tipo === "final" || e.tipo === "mini" || e.tipo === "integral").map((e) => e.nota),
    abiertas,
    // solo las semanas completas que terminaron después de inscribirse
    minutosSemanas: semanas.slice(0, -1).filter((s) => diasEntre(diaTexas(new Date(fila.desde)), s.inicio) >= -6).reverse().map((s) => s.minutos),
    metaSemanal,
    repasoVencido: repaso.vencidas,
    sinMentorEnNivel1: (nivelActual?.n ?? 1) === 1 && !a?.mentor_user_id,
    porRevisar: admin ? { escritas: Number((pend[0] as any)?.escritas ?? 0), actividades: Number((pend[0] as any)?.actividades ?? 0) } : { escritas: 0, actividades: 0 },
  });
  const logros: string[] = [];
  if (racha >= 7) logros.push(`Lleva ${racha} días seguidos estudiando`);
  for (const n of niveles.filter((x) => x.completado)) logros.push(`Completó el Nivel ${n.n} · ${n.nombre}${n.promedio != null ? ` (promedio ${n.promedio})` : ""}`);
  for (const e of especialidades.filter((x) => x.completada)) logros.push(`Completó la especialidad en ${e.nombre}`);
  if (fila.estatus.honores) logros.push("Está en el cuadro de honor");
  if (semanas.length && semanas[semanas.length - 1].minutos >= metaSemanal && metaSemanal > 0) logros.push(`Ya cumplió su meta de esta semana (${metaSemanal} minutos)`);
  if (versiculos.dominados >= 5) logros.push(`Domina ${versiculos.dominados} versículos de memoria`);

  let proximo: string | null = null;
  const reciente = [...enCurso].sort((x, y) => (materiasAv.find((v) => v.id === y.id)?.inscrita ?? "").localeCompare(materiasAv.find((v) => v.id === x.id)?.inscrita ?? ""))[0];
  if (reciente) {
    const verso = (ver as any[]).some((r) => r.materia_id === reciente.id && r.aprendido_at);
    proximo = reciente.siguiente
      ? `Seguir con «${reciente.siguiente}» (${reciente.titulo}, lección ${reciente.lecciones + 1} de ${reciente.de})`
      : !verso && materiaPorId(reciente.id)?.memoria
        ? `Aprender el versículo de memoria de ${reciente.titulo}`
        : `Dar el examen final de ${reciente.titulo}`;
  } else if (nivelActual) {
    const libre = nivelActual.materias.find((m) => m.disponible && !materias.some((x) => x.id === m.id));
    const faltan = actividades.find((x) => x.nivel === nivelActual.n)?.requisitos.filter((q) => !q.hecho) ?? [];
    if (libre) proximo = `Inscribirse en ${libre.titulo} (Nivel ${nivelActual.n})`;
    else if (faltan.length) proximo = `Completar lo que pide el Nivel ${nivelActual.n}: ${faltan.map((q) => q.texto.toLowerCase()).join("; ")}`;
  }

  return {
    generado: new Date().toISOString(),
    resumen: {
      nivelActual: nivelActual ? { n: nivelActual.n, nombre: nivelActual.nombre } : null,
      programa: { aprobadas: aprobadasPrograma, de: delPrograma.length, pct: porciento(aprobadasPrograma, delPrograma.length) },
      promedio: notas.length ? Math.round(notas.reduce((s, x) => s + x, 0) / notas.length) : null,
      aprobadas: aprobadas.length,
      enCurso: enCurso.length,
      lecciones: fila.lecciones,
      diasInscrito,
      diasSinEstudiar,
      racha,
    },
    estudio: {
      minutosTotal: estudio.reduce((s, e) => s + e.minutos, 0),
      minutos30: ult30.reduce((s, e) => s + e.minutos, 0),
      sesiones30: ult30.reduce((s, e) => s + e.sesiones, 0),
      diasActivos30: ult30.filter((e) => e.minutos > 0).length,
      metaSemanal,
      semanas,
      dias: diasRecientes(estudio, hoy, 84),
      videoMinutos: Math.round((lec as any[]).reduce((s, r) => s + Number(r.video_seg ?? 0), 0) / 60),
    },
    niveles,
    especialidades,
    materias,
    examenes,
    aprendizaje: { respuestas: conInfo.length, porBloom, porLeccion, dificiles },
    repaso,
    versiculos,
    cuaderno: { notas: Number((cua[0] as any)?.notas ?? 0), resaltados: Number((cua[0] as any)?.resaltados ?? 0) },
    actividades,
    alertas,
    logros,
    proximo,
    reflexiones,
    seguimiento,
    puede: { seguimiento: admin, preguntas: admin, reflexiones: admin },
  };
}

/**
 * El informe de una materia del alumno: cada lección (cuándo la abrió y la terminó, cuánto leyó, el video, su repaso y su
 * reflexión), cada intento de examen con cada pregunta (si la acertó y cuánto tardó; la Administración ve además el
 * texto, lo que respondió y la correcta), sus respuestas escritas, el versículo y su repaso del día.
 */
export async function informeDe(p: Permiso, id: number, materiaId: string): Promise<InformeMateria | null> {
  const [fila] = await filasDe(p, false, id);
  const m = materiaPorId(materiaId);
  if (!fila || !m) return null;
  const admin = puede(p, "revisar");
  const banco = BANCOS.get(m.id);
  const uno = async (sql: string, params: unknown[]) => (await pool.query(sql, params)).rows as any[];
  const [mat] = await uno(`SELECT estado, nota, inicio_at, aprobada_at FROM academia_materias WHERE user_id = $1 AND materia_id = $2`, [id, m.id]);
  const lec = await uno(
    `SELECT leccion_id, abierta_at, vista_at, completada_at, segundos, video_seg, repaso, reflexion FROM academia_lecciones WHERE user_id = $1 AND leccion_id = ANY($2::text[])`,
    [id, m.lecciones.map((l) => l.id)],
  );
  const ints = await uno(
    `SELECT clave, intento, nota, aciertos, de, respuestas, cerrado_at, segundos FROM academia_intentos WHERE user_id = $1 AND clave LIKE $2 ORDER BY cerrado_at DESC`,
    [id, `${m.id}:%`],
  );
  const [ver] = await uno(`SELECT ref, intentos, fallos, puntaje, aprendido_at, dominado_at FROM academia_versiculos WHERE user_id = $1 AND materia_id = $2`, [id, m.id]);
  const [rep] = await uno(
    `SELECT count(*)::int AS total, count(dominada_at)::int AS dominadas, COALESCE(sum(aciertos), 0)::int AS aciertos, COALESCE(sum(fallos), 0)::int AS fallos
       FROM academia_repaso_preguntas WHERE user_id = $1 AND materia_id = $2`,
    [id, m.id],
  );
  const esc = admin
    ? await uno(
        `SELECT id, clave, pregunta_id, texto, nota_auto, nota_final, motivo, revisar, revisada_at, created_at FROM academia_respuestas WHERE user_id = $1 AND clave LIKE $2 ORDER BY created_at DESC`,
        [id, `${m.id}:%`],
      )
    : null;
  const comps: Record<string, number | undefined> = mat ? await componentesDe(id, m) : {};
  const pesos = pesosDe(m);
  const idx = indicePreguntas();
  const objetivas = new Map([...(banco?.final ?? []), ...Object.values(banco?.mini ?? {}).flat(), ...(CASOS[m.id] ?? [])].map((q) => [q.id, q]));
  const porLeccion = new Map(lec.map((r) => [String(r.leccion_id), r]));
  const lecciones = m.lecciones.map((l, i) => {
    const r = porLeccion.get(l.id);
    const resultados = (r?.repaso ?? {}) as Record<string, { primera?: boolean; ok?: boolean }>;
    const preguntas = (banco?.repaso[l.id] ?? [])
      .filter((q) => resultados[q.id])
      .map((q) => ({ id: q.id, texto: admin ? q.texto : null, bien: resultados[q.id].primera ?? !!resultados[q.id].ok }));
    return {
      n: i + 1,
      id: l.id,
      titulo: l.titulo,
      abierta: r && (r.abierta_at || r.vista_at) ? iso(r.abierta_at ?? r.vista_at) : null,
      completada: r?.completada_at ? iso(r.completada_at) : null,
      segundos: Number(r?.segundos ?? 0),
      videoSeg: Number(r?.video_seg ?? 0),
      repaso: { bien: preguntas.filter((q) => q.bien).length, total: preguntas.length, preguntas },
      reflexion: admin && typeof r?.reflexion === "string" && r.reflexion.trim() ? String(r.reflexion).trim() : null,
    };
  });
  const intentos = ints.map((r) => {
    const nota = Number(r.nota);
    const preguntas = (Array.isArray(r.respuestas) ? r.respuestas : []).map((x: any) => {
      const info = idx.get(String(x.id));
      const q = objetivas.get(String(x.id));
      return {
        id: String(x.id),
        leccion: info?.leccion ?? null,
        bien: !!x.bien,
        tarde: !!x.tarde,
        seg: x.seg == null ? null : Number(x.seg),
        texto: admin ? info?.texto ?? null : null,
        elegida: admin ? (x.elegida == null ? null : String(x.elegida)) : null,
        correcta: admin ? q?.correcta ?? null : null,
        explica: admin ? q?.explica ?? null : null,
      };
    });
    return {
      clave: String(r.clave),
      titulo: tituloExamen(String(r.clave)),
      tipo: tipoDeClave(String(r.clave)),
      intento: Number(r.intento),
      nota,
      aciertos: Number(r.aciertos),
      de: Number(r.de),
      fecha: iso(r.cerrado_at),
      segundos: r.segundos == null ? null : Number(r.segundos),
      aprobado: nota >= APRUEBA,
      preguntas,
    };
  });
  const escritas = esc
    ? esc.map((r) => ({
        id: Number(r.id),
        examen: tituloExamen(String(r.clave)),
        pregunta: banco?.escritas.find((e) => e.id === r.pregunta_id)?.pregunta ?? "Pregunta escrita",
        respuesta: String(r.texto ?? ""),
        notaAuto: Number(r.nota_auto),
        notaFinal: r.nota_final == null ? null : Number(r.nota_final),
        motivo: r.motivo ?? null,
        marcada: !!r.revisar,
        revisada: r.revisada_at ? iso(r.revisada_at) : null,
        fecha: iso(r.created_at),
      }))
    : null;
  return {
    materia: { id: m.id, titulo: m.titulo, grupo: grupoDe(m), lecciones: m.lecciones.length },
    estado: !mat ? "sin-inscribir" : mat.estado === "aprobada" ? "aprobada" : "en-curso",
    nota: mat?.nota == null ? null : Number(mat.nota),
    inicio: mat?.inicio_at ? iso(mat.inicio_at) : null,
    aprobada: mat?.aprobada_at ? iso(mat.aprobada_at) : null,
    componentes: (Object.keys(pesos) as (keyof typeof pesos)[])
      .filter((k) => pesos[k] > 0)
      .map((k) => ({ id: k, texto: NOMBRE_COMPONENTE[k], peso: pesos[k], valor: comps[k] == null ? null : Math.round(comps[k]!) })),
    lecciones,
    intentos,
    escritas,
    versiculo: ver
      ? {
          ref: String(ver.ref),
          intentos: Number(ver.intentos ?? 0),
          fallos: Number(ver.fallos ?? 0),
          puntaje: ver.puntaje == null ? null : Number(ver.puntaje),
          aprendido: ver.aprendido_at ? iso(ver.aprendido_at) : null,
          dominado: ver.dominado_at ? iso(ver.dominado_at) : null,
        }
      : null,
    repasoDia: { total: Number(rep?.total ?? 0), dominadas: Number(rep?.dominadas ?? 0), aciertos: Number(rep?.aciertos ?? 0), fallos: Number(rep?.fallos ?? 0) },
    tiempo: { lectura: lecciones.reduce((s, l) => s + l.segundos, 0), examenes: intentos.reduce((s, x) => s + (x.segundos ?? 0), 0) },
    completo: admin,
  };
}

/** El id del alumno de la ruta, o null. */
function idDe(req: Request): number | null {
  const id = Number(req.params.alumnoId);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export function registerAcademiaPerfilRoutes(app: Express) {
  // El perfil completo de un alumno (con permiso de ver el avance; lo de la Administración, solo para ella).
  app.get("/api/academia/direccion/alumno/:alumnoId/perfil", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "avance");
      if (!p) return;
      const id = idDe(req);
      if (!id) return res.status(404).json({ message: "No existe ese alumno." });
      const perfil = await perfilDe(p, id);
      if (!perfil) return res.status(404).json({ message: "No existe ese alumno, o no es de tu iglesia." });
      res.setHeader("Cache-Control", "no-store");
      res.json(perfil);
    } catch (err) {
      console.error("[academia] perfil del alumno:", err);
      res.sendStatus(500);
    }
  });

  // El informe de una materia del alumno: lo que hizo en cada lección y en cada examen (con permiso de ver el avance).
  app.get("/api/academia/direccion/alumno/:alumnoId/informe/:materiaId", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "avance");
      if (!p) return;
      const id = idDe(req);
      if (!id) return res.status(404).json({ message: "No existe ese alumno." });
      const informe = await informeDe(p, id, String(req.params.materiaId || ""));
      if (!informe) return res.status(404).json({ message: "No existe ese alumno o esa materia, o no es de tu iglesia." });
      res.setHeader("Cache-Control", "no-store");
      res.json(informe);
    } catch (err) {
      console.error("[academia] informe de la materia:", err);
      res.sendStatus(500);
    }
  });

  // Anotar en la bitácora de seguimiento (solo la Administración): una nota, una llamada, una visita, una oración…
  app.post("/api/academia/direccion/alumno/:alumnoId/seguimiento", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "gestionar");
      if (!p) return;
      const id = idDe(req);
      if (!id) return res.status(404).json({ message: "No existe ese alumno." });
      if (id === p.userId) return res.status(403).json({ message: "No puedes anotar en tu propia bitácora." });
      const [fila] = await filasDe(p, false, id);
      if (!fila) return res.status(404).json({ message: "No existe ese alumno." });
      const tipo = String(req.body?.tipo ?? "nota") as TipoSeguimiento;
      if (!TIPOS_SEGUIMIENTO.some((t) => t.id === tipo)) return res.status(400).json({ message: "Elige qué fue: nota, llamada, mensaje, visita, reunión u oración." });
      const texto = limpio(req.body?.texto, LIMITES_SEGUIMIENTO.max);
      if (texto.length < LIMITES_SEGUIMIENTO.min) return res.status(400).json({ message: `Escribe qué pasó (al menos ${LIMITES_SEGUIMIENTO.min} letras).` });
      if (frenar(`aseg:${p.userId}`, 1500)) return res.status(429).json({ message: "Espera un momento antes de anotar otra vez." });
      await asegurarTabla();
      const { rows } = await pool.query(`INSERT INTO academia_seguimiento (alumno_id, autor_id, tipo, texto) VALUES ($1, $2, $3, $4) RETURNING id`, [id, p.userId, tipo, texto]);
      const nombre = TIPOS_SEGUIMIENTO.find((t) => t.id === tipo)!.texto;
      await registrar(req, "academia.seguimiento", id, `Anotó en la bitácora (${nombre.toLowerCase()})`, null);
      res.json({ id: Number(rows[0].id) });
    } catch (err) {
      console.error("[academia] bitácora, anotar:", err);
      res.sendStatus(500);
    }
  });

  // Borrar una anotación de la bitácora (solo la Administración; queda en el historial).
  app.post("/api/academia/direccion/seguimiento/:notaId/borrar", async (req, res) => {
    try {
      const p = await permisoDe(req, res, "gestionar");
      if (!p) return;
      const notaId = Number(req.params.notaId);
      if (!Number.isInteger(notaId) || notaId <= 0) return res.status(404).json({ message: "No existe esa anotación." });
      await asegurarTabla();
      const { rows } = await pool.query(`DELETE FROM academia_seguimiento WHERE id = $1 RETURNING alumno_id, tipo`, [notaId]);
      if (!rows[0]) return res.status(404).json({ message: "No existe esa anotación." });
      await registrar(req, "academia.seguimiento.borrada", Number(rows[0].alumno_id), "Borró una anotación de la bitácora", null);
      res.json({ ok: true });
    } catch (err) {
      console.error("[academia] bitácora, borrar:", err);
      res.sendStatus(500);
    }
  });
}

// para las pruebas
export const _interno = { tituloExamen, indicePreguntas, diasEntre, lunesDe };
