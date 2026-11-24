# El motor de prácticas de la academia

Cada lección tiene su práctica, hecha con lo que esa lección enseña. Un solo motor arma, corrige y adapta las prácticas
de todas las materias: para sumar las de una materia nueva solo se escribe su archivo. El diseño completo, con la
evidencia de cada decisión, está en el documento «Motor de prácticas de la Academia» (23-nov-2026).

## 1. Qué ve el alumno

- **La práctica guiada** de cada lección: se abre al completar la lección (la página de la lección lleva directo a ella,
  con `?tras=1`). Trae unas tarjetas para repasar y luego las actividades, con **pistas** (la frase de la lección) y la
  explicación de cada respuesta. Al terminarla, la lección gana su primera estrella y sus actividades entran al
  calendario de repasos.
- **La práctica que cuenta**: se abre después de la guiada. Sin pistas, con **otras versiones** de las actividades y
  **3 intentos por día** (vale la mejor). Con 80 o más, los objetivos quedan **dominados** (2 estrellas); con 100, las 3.
  Se corrige en el servidor: las respuestas no llegan al teléfono antes de contestar.
- **La práctica del día** (`/academia/practicar/dia`): lo que toca repasar hoy, hasta 6 actividades, mezcladas (nunca más
  de 2 seguidas de la misma lección). Vuelven a los 1, 3, 7, 15, 30 y 60 días: bien sube un escalón, a medias repite, mal
  baja dos y vuelve mañana. Lo respondido bien después de 30 días queda **firme**.
- **La misión de la materia** (al final del camino): se abre con todas las lecciones completadas; un reto con historia
  (`mision` del archivo de la materia) que junta actividades de todas las lecciones, lo más flojo primero.
- **Los juegos libres** (`/academia/practicar`): «Carrera de la luz» (90 segundos; 5 aciertos seguidos duplican) y
  «Racha» (hasta que se apagan 3 llamas), con las preguntas de las lecciones que ya terminó. Al final, lo fallado con su
  explicación. Compite contra su propia marca; no cambian la nota.
- **Medallas** solo por aprender: 7 y 30 días de racha, 50 respuestas escritas con 80 o más, 10 lecciones perfectas,
  materia dominada, materia firme y misión cumplida.
- La racha es la misma de la academia (`marcarEstudio`): practicar cuenta como día de estudio.

Todo se diseñó primero para el teléfono: una pieza por pantalla, todo con un dedo (tocar y luego el lugar; ordenar
también se arrastra), sonidos cortos que se apagan con un toque y respeto por «reducir movimiento».

## 2. Las 15 piezas

| Pieza | Qué hace el alumno | Desde |
| --- | --- | --- |
| `tarjetas` | Responde de memoria, voltea y se califica (no cuenta) | Nivel 1 |
| `completa` | Lleva palabras a los huecos de una idea | Nivel 1 |
| `relaciona` | Une cada idea con su pareja | Nivel 1 |
| `clasifica` | Lleva frases a 2 o 3 grupos | Nivel 1 |
| `ordena` | Pone pasos en orden (puntos por pares en orden) | Nivel 1 |
| `verdad` | Decide verdad o error, de a una afirmación | Nivel 1 |
| `error` | Toca la frase equivocada | Nivel 1 |
| `situacion` | Elige qué hacer o decir en un caso de la vida diaria | Nivel 1 |
| `explica` | Escribe con sus palabras; se corrige con una clave | Nivel 1 |
| `linea` | Ordena hechos en el tiempo; al corregir ve las fechas | Nivel 2 |
| `mapa-ideas` | Elige la relación de cada enlace entre ideas | Nivel 2 |
| `mapa` | Toca un lugar en una imagen (un mapa) | Nivel 2 |
| `pasaje` | Toca las palabras de un pasaje que responden | Nivel 2 |
| `escenario` | Decide en escenas que se ramifican (valen 0, 1 o 2) | Nivel 3 |
| `caso` | Lee un caso y responde por pasos | Nivel 4 |

Las 15 ya funcionan en el motor y en el reproductor: los niveles siguientes solo traen contenido.

## 3. Cómo se escribe la práctica de una materia

El modelo es `server/academia/practicas/n1-salvacion.ts` y el formato exacto, `server/academia/practicas/tipos.ts`.

1. Lee la lección entera (su archivo en `server/academia/contenido/`): **es la única fuente**.
2. Cada lección: de 5 a 7 actividades. Primero unas `tarjetas`, después **al menos una actividad que se califica por
   cada objetivo** de la lección (`objetivo` = su número en `objetivos`, desde 0) y al final un `explica`. Usa las piezas
   que mejor sirven a lo que enseña la lección; no repitas una pieza sin motivo.
3. Cada actividad trae **2 versiones o más**: el mismo objetivo con otras palabras y otros ejemplos (la guiada usa una;
   la que cuenta y los repasos, otras).
4. Cada versión lleva `apoyo`: una frase **copiada tal cual** de la lección (texto, idea clave, «Para la vida» u
   objetivos). La prueba busca que esté; el alumno la ve al corregir («Lo dice la lección»).
5. Nada que la lección no diga. Las comillas « » solo para la RV1960 al pie de la letra.
6. Situaciones de la vida diaria del alumno de ese nivel (en los niveles de ministerio, escenarios ministeriales). Una
   sola opción buena; las otras, errores creíbles; cada opción con su explicación.
7. `completa`: las palabras que no van deben ser claramente incorrectas en ese lugar; `errores` explica las típicas.
8. `explica`: clave de tipo `"corta"` (15 a 60 palabras) con 2 o 3 ideas que suman 100 y una respuesta `modelo` que
   saque 90 o más con su propia clave. Ids: `pr-<leccionId>-<actividadId>-<n>`.
9. Agrega `mision` (título, introducción y cierre) para la materia.
10. Regístrala en `server/academia/practicas/index.ts` y corre
    `npx tsx --test server/academia-practicas.test.ts server/academia-practicas-calificar.test.ts`.
11. Revísala en el panel (abajo) y pruébala como alumno. Las prácticas entran en la **huella de la aprobación
    doctrinal**: al publicarlas, la materia pide aprobarse otra vez.

Cuando todas las lecciones de una materia tienen práctica, la materia queda **completa**.

## 4. La nota

- Las prácticas entran en la nota **solo** en las materias completas, y **solo** para quien empieza la materia desde el
  día en que quedó completa (`academia_practicas_config.desde`, que se anota sola al arrancar el servidor). Quien ya la
  cursaba termina con la fórmula de antes.
- El componente «Prácticas» es el promedio de la mejor práctica que cuenta de cada lección (la que falta cuenta 0).
- Pesos por defecto (`PESOS_CON_PRACTICAS`, en %): Nivel 1: final 50, prácticas 20, repasos 15, versículo 15.
  Nivel 2: final 40, prácticas 15, mini 20, escritos 15, versículo 10. Niveles 3 a 5 y especialidades: final 35,
  prácticas 15, mini 15, escritos 25, versículo 10. Fuera de eso, `PESOS_NIVEL` pone las prácticas en 0.
- `pesosDeAlumno` (`server/academia-practicas-nota.ts`) decide los pesos de cada alumno; lo usan el cálculo de la
  nota, la página de la materia, la gestión y el perfil.
- La Administración cambia los pesos de cada nivel y saca o pone las prácticas en la nota de cada materia (siguen
  funcionando aunque no cuenten). El componente se puede ajustar a mano en la gestión, como los demás.

## 5. El panel

`/admin/academia?tab=practicas` (con `&pmateria=<id>` abre una materia):

- el estado de cada materia (lecciones con práctica, alumnos, intentos, promedio) y el interruptor «en la nota»;
- los pesos de la nota con prácticas, por nivel;
- «Necesitan ayuda»: quien falló 3 veces seguidas el mismo objetivo;
- por materia: cada actividad con su acierto y el error más elegido, todas sus versiones con las respuestas, «Probar
  como alumno» (la Administración prueba sin inscribirse y nada cuenta) y la planilla de resultados (CSV).

La revisión doctrinal de cada materia (`/admin/academia/contenido/<id>`) tiene la pestaña «Prácticas» con lo mismo.

## 6. La parte técnica

| Qué | Dónde |
| --- | --- |
| Tipos, calendario, estrellas, estados, pesos | `shared/practicas.ts` |
| Formato del contenido y la revisión automática | `server/academia/practicas/tipos.ts`, `validar.ts` |
| Registro de las prácticas | `server/academia/practicas/index.ts` |
| Armar, mostrar y calificar cada pieza | `server/academia-practicas-calificar.ts` |
| Rutas, intentos, calendario, medallas, panel | `server/academia-practicas.ts` |
| La nota | `server/academia-practicas-nota.ts` |
| Reproductor, piezas, resultado, camino, panel | `client/src/components/practicas/` |
| Páginas | `academia-practica.tsx`, `academia-practicar.tsx`, `academia-practicar-sesion.tsx`, `academia-juego.tsx` |

Tablas (aditivas; se borran con la cuenta): `academia_practicas_intentos` (cada intento con el estado de sus
actividades), `academia_practicas_respuestas` (cada respuesta, para el panel), `academia_practicas_lecciones` (lo de
cada lección: guiada, mejor, estrellas y lo de cada objetivo), `academia_practicas_items` (el calendario de cada
actividad), `academia_practicas_marcas`, `academia_practicas_medallas`, `academia_practicas_config` y
`academia_practicas_pesos`.

Rutas del alumno (`/api/academia/practicas/…`): `leccion/:id`, `leccion/:id/empezar`, `intento/:id/responder`,
`intento/:id/pista`, `intento/:id/terminar`, `dia`, `dia/resumen`, `materia/:id`, `materia/:id/mision`, `juego`,
`juego/marca`, `medallas`. Del panel (`/api/academia/direccion/practicas…`): la lista, `materia/:id`, `pesos`,
`materia/:id/cuenta`, `materia/:id/resultados.csv` y `alumno/:userId/:materiaId`.

Un intento a medias se retoma durante un día (en el teléfono se corta a veces); los intentos empezados de la que cuenta
también cuentan para el límite del día.
