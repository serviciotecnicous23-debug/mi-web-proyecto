# El motor de prácticas de la academia

Cada lección tiene su práctica, hecha con lo que esa lección enseña. Un solo motor arma, corrige y adapta las prácticas
de todas las materias: para sumar las de una materia nueva solo se escribe su archivo. El diseño completo, con la
evidencia de cada decisión, está en el documento «Motor de prácticas de la Academia» (23-nov-2026).

## 1. Qué ve el alumno

- **La práctica guiada** de cada lección: se abre al completar la lección (la página de la lección lleva directo a ella,
  con `?tras=1`). Empieza con un **Relámpago** (las preguntas de las tarjetas, cada una con tres respuestas) y sigue con
  las actividades, con **pistas** (la frase de la lección) y la explicación de cada respuesta. Al terminarla, la lección
  gana su primera estrella y sus actividades entran al calendario de repasos.
- **La práctica que cuenta**: se abre después de la guiada. Sin pistas, con **otras versiones** de las actividades y
  **3 intentos por día** (vale la mejor). Con 80 o más, los objetivos quedan **dominados** (2 estrellas); con 100, las 3.
  Se corrige en el servidor: las respuestas no llegan al teléfono antes de contestar.
- **Es obligatoria** para quien cursa la materia (en las materias cuyas prácticas entran en la nota): el examen final
  pide la práctica que cuenta de cada lección (`leccionesSinPractica` en `estadoExamen`). Quien ya aprobó la materia
  practica cuando quiera y su nota ya no cambia (no se recalcula y sus pesos quedaron guardados al aprobar).
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

Todo se diseñó primero para el teléfono: una actividad por pantalla, todo con un dedo (tocar y luego el lugar; ordenar
también se arrastra), sonidos cortos que se apagan con un toque y respeto por «reducir movimiento».

### Ninguna práctica es igual a la otra (23-nov, pedido de Luis)

- **Las formas de jugar** (`FORMATOS`): el mismo contenido se juega de varias formas, elegidas al azar en cada intento
  (una forma no se repite mientras haya otras). El orden de las actividades también cambia (sin dos piezas iguales
  seguidas; «explícalo» al final). Todas se califican de 0 a 1 y cuentan igual para el dominio, las estrellas y la nota.
- **La primera vez** que el alumno se encuentra con una forma, «Así se juega» se la explica paso a paso (se guarda en el
  teléfono); después la vuelve a ver tocando la etiqueta de la actividad.
- **Las modalidades** (`MODALIDADES`, una por intento, al azar): el camino de la llama; la escalera de fuego (cada
  acierto sube un escalón y cada error baja uno; arriba, 25 puntos); la racha encendida (×2 desde 3 seguidas y ×3
  desde 6); y contra el reloj (5 puntos de más si responde bien en menos de 20 segundos; nunca en la que cuenta).
  Cambian los puntos y cómo se ve el avance, **nunca la nota**.
- Antes de empezar, la portada dice cuántas actividades y formas trae el intento y su modalidad, y la página de la
  práctica muestra las formas que le pueden tocar.

## 2. Las 15 piezas y sus formas

| Pieza | Formas (la primera es la de siempre) | Desde |
| --- | --- | --- |
| `tarjetas` | Relámpago: la pregunta de cada tarjeta con su respuesta y dos de otras tarjetas (no entra en la que cuenta) | Nivel 1 |
| `completa` | Completa la idea (banco de palabras), Elige la palabra (dos por hueco), Escríbela (con la primera letra y cuántas letras; solo para aprender) | Nivel 1 |
| `relaciona` | Relaciona (las dos columnas), Elige la pareja (una idea y tres opciones, de a una) | Nivel 1 |
| `clasifica` | Clasifica (recuadros de colores), Desliza (dos grupos, de a una frase), ¿Cuál no va? (tres del mismo grupo y una que no) | Nivel 1 |
| `ordena` | Ordena (arrastrar), Escalones (qué va en cada escalón), ¿Dónde va? (un paso salió de la lista: se toca su lugar) | Nivel 1 |
| `verdad` | ¿Verdad o error?, ¿Cuál es falsa? (tres frases de las dos versiones; a veces se busca la verdadera) | Nivel 1 |
| `error` | Encuentra el error, Detective (las frases seguidas, como un texto) | Nivel 1 |
| `situacion` | Situación, Conversación (el caso llega como un mensaje) | Nivel 1 |
| `explica` | Explícalo con tus palabras; se corrige con una clave | Nivel 1 |
| `linea` | Ordena hechos en el tiempo; al corregir ve las fechas | Nivel 2 |
| `mapa-ideas` | Elige la relación de cada enlace entre ideas | Nivel 2 |
| `mapa` | Toca un lugar en una imagen (un mapa) | Nivel 2 |
| `pasaje` | Toca las palabras de un pasaje que responden | Nivel 2 |
| `escenario` | Decide en escenas que se ramifican (valen 0, 1 o 2) | Nivel 3 |
| `caso` | Lee un caso y responde por pasos | Nivel 4 |

Una forma solo se elige si la actividad la permite (`formatosPosibles`): Relámpago con 3 tarjetas o más; Elige la pareja
con 3 parejas; Desliza con 2 grupos; ¿Cuál no va? con un grupo de 3 frases o más; Escalones con 3 pasos; ¿Dónde va? con
4; ¿Cuál es falsa? con frases verdaderas y falsas suficientes entre las dos versiones. Las 15 piezas ya funcionan: los
niveles siguientes solo traen contenido.

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
6. **Que se entienda en todas sus formas** (lo que aprendimos al revisar el Nivel 1):
   - `consigna` en cada versión, con el criterio primero y como pregunta: «¿Es ayuno bíblico o no lo es? Lleva cada
     frase a su grupo.» (Desliza y ¿Cuál no va? toman solo la pregunta). Di «grupo», no «recuadro».
   - Los nombres de los grupos se entienden solos («Así se ayuna» / «Así no se ayuna»), y cada frase va en uno solo.
     Para ¿Cuál no va?, un grupo con 3 frases o más.
   - Las frases se muestran mezcladas: cada una se entiende sola (nada de «también…», «lo hizo…», «esa persona»).
   - Tarjetas: ninguna respuesta sirve para otra pregunta de la misma versión (Relámpago las usa como opciones).
   - Completa: Elige la palabra junta el hueco N con la palabra que no va N; ordénalas para que cada hueco tenga su
     equivocación. Evita huecos donde cabe un sinónimo o en frases negativas.
   - Relaciona: cada idea de la derecha corresponde a una sola de la izquierda.
   - Ordena: un solo orden posible.
   - Verdad: afirmaciones del todo verdaderas o del todo falsas, sin doble negación (¿Cuál es falsa? mezcla las dos
     versiones).
   - Situación: el caso como «Quién te dice: el mensaje» (Conversación lo usa) y opciones de largo parecido (la buena
     no puede delatarse por ser la más larga). Una sola buena; las otras, errores creíbles; cada una con su explicación.
   - Los largos máximos (`LARGOS` en `validar.ts`): grupo 40, frase 90, pregunta de tarjeta 90, respuesta 120…
7. `completa`: las palabras que no van deben ser claramente incorrectas en ese lugar; `errores` explica las típicas.
8. `explica`: clave de tipo `"corta"` (15 a 60 palabras) con 2 o 3 ideas que suman 100 y una respuesta `modelo` que
   saque 90 o más con su propia clave. Ids: `pr-<leccionId>-<actividadId>-<n>`.
9. Agrega `mision` (título, introducción y cierre) para la materia.
10. Regístrala en `server/academia/practicas/index.ts` y corre
    `npx tsx --test server/academia-practicas.test.ts server/academia-practicas-calificar.test.ts server/academia-practicas-formas.test.ts`.
    La de las formas juega cada actividad en todas sus formas, todo bien y todo mal, y revisa que nada delate la
    respuesta.
11. Revísala en el panel (abajo) y pruébala como alumno. Las prácticas entran en la **huella de la aprobación
    doctrinal**: al publicarlas, la materia pide aprobarse otra vez.

Cuando todas las lecciones de una materia tienen práctica, la materia queda **completa**.

## 4. La nota

- Las prácticas entran en la nota **solo** en las materias completas, y **solo** para quien empieza la materia desde el
  día en que quedó completa (`academia_practicas_config.desde`, que se anota sola al arrancar el servidor). Quien ya la
  cursaba termina con la fórmula de antes.
- El componente «Prácticas» es el promedio de la mejor práctica que cuenta de cada lección (la que falta cuenta 0).
  Como se puede repetir (vale la mejor), ayuda a subir la nota a quien va abajo, según su peso.
- Pesos por defecto (`PESOS_CON_PRACTICAS`, en %, equilibrados el 23-nov): Nivel 1: final 40, prácticas 30, repasos
  15, versículo 15. Nivel 2: final 35, prácticas 25, mini 15, escritos 15, versículo 10. Niveles 3 a 5 y
  especialidades: final 30, prácticas 25, mini 15, escritos 20, versículo 10. Fuera de eso, `PESOS_NIVEL` pone las
  prácticas en 0.
- **Al aprobar** quedan guardados los pesos con que aprobó (`academia_materias.pesos_aprobada`): un cambio de pesos
  después no le cambia la nota. Lo aprobado antes de esto sigue con la fórmula de antes.
- `pesosDeAlumno` (`server/academia-practicas-nota.ts`) decide los pesos de cada alumno; lo usan el cálculo de la
  nota, la página de la materia, la gestión y el perfil. `practicasObligatorias` dice si el examen final las pide.
- La Administración cambia los pesos de cada nivel y saca o pone las prácticas en la nota de cada materia (siguen
  funcionando aunque no cuenten). El componente se puede ajustar a mano en la gestión, como los demás.
- **Las insignias**: cada materia aprobada da su insignia enmarcada (con su nota y su medalla) en la vitrina del
  expediente, y ya no un certificado. Los certificados quedan para los logros mayores: cada nivel, cada especialidad y
  la graduación. Los certificados de materia emitidos antes del 23-nov siguen valiendo y se verifican igual.

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
| Tipos, formas, modalidades, calendario, estrellas, estados, pesos | `shared/practicas.ts` |
| Formato del contenido y la revisión automática | `server/academia/practicas/tipos.ts`, `validar.ts` |
| Registro de las prácticas | `server/academia/practicas/index.ts` |
| Armar, mostrar y calificar cada pieza en cada forma | `server/academia-practicas-calificar.ts` |
| Rutas, intentos, formas y modalidad de cada intento, calendario, medallas, panel | `server/academia-practicas.ts` |
| La nota y si la práctica es obligatoria | `server/academia-practicas-nota.ts` |
| Reproductor (modalidades), piezas, formas, «Así se juega», resultado, camino, panel | `client/src/components/practicas/` |
| Insignias y vitrina | `client/src/components/academia/insignias.tsx` |
| Páginas | `academia-practica.tsx`, `academia-practicar.tsx`, `academia-practicar-sesion.tsx`, `academia-juego.tsx` |

Tablas (aditivas; se borran con la cuenta): `academia_practicas_intentos` (cada intento con el estado de sus
actividades, su forma y su modalidad), `academia_practicas_respuestas` (cada respuesta, para el panel),
`academia_practicas_lecciones` (lo de cada lección: guiada, mejor, estrellas y lo de cada objetivo),
`academia_practicas_items` (el calendario de cada actividad), `academia_practicas_marcas`, `academia_practicas_medallas`,
`academia_practicas_config` y `academia_practicas_pesos`.

Rutas del alumno (`/api/academia/practicas/…`): `leccion/:id`, `leccion/:id/empezar`, `intento/:id/responder`,
`intento/:id/pista`, `intento/:id/terminar`, `dia`, `dia/resumen`, `materia/:id`, `materia/:id/mision`, `juego`,
`juego/marca`, `medallas`. Del panel (`/api/academia/direccion/practicas…`): la lista, `materia/:id`, `pesos`,
`materia/:id/cuenta`, `materia/:id/resultados.csv` y `alumno/:userId/:materiaId`.

Un intento a medias se retoma durante un día (en el teléfono se corta a veces); los intentos empezados de la que cuenta
también cuentan para el límite del día. Un intento de antes de las formas se sigue jugando: sus actividades toman la
forma de siempre.
