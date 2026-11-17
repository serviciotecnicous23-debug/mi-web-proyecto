# Revisión del sistema de estudio y de evaluación de la academia

16 de noviembre de 2026. Pedido de Luis: «revisar a detalle los métodos de estudio, de evaluación y de prueba… ver que
estamos cumpliendo con estándares universitarios… revisar las fuentes… reajustar el tiempo si está muy corto o muy
injusto… evaluar los métodos de estudio en cada curso: si son los correctos, si no son tan repetitivos, si se ha puesto
algo innovador, si se han puesto recursos o solamente en algunos». Se revisaron las **56 materias publicadas**, sus
**320 lecciones** y sus **5.674 preguntas** (repasos, exámenes finales y mini pruebas).

## En resumen

- **La evaluación ya está a nivel de un buen curso universitario en línea.** Los objetivos son medibles y tienen su nivel
  de Bloom. Cada pregunta mide un objetivo (tabla de especificaciones). Hay pruebas variadas y en secuencia, con la
  respuesta y la cita al instante. Hay honradez con reloj del servidor, revisión con apelación, análisis de preguntas y
  tiempo extra. Los tiempos de los exámenes son justos: no hace falta cambiarlos. *(Actualizado el 17-nov: con las
  preguntas de casos, ahora cada pregunta trae su tiempo según su largo y su dificultad; ver la sección 5.)*
- **Lo que faltaba en el sistema, y se corrigió aquí:**
  - **El tiempo de cada lección:** decía 7 o 10 minutos fijos, y en los Niveles 3 a 5 pide unos 14. Ahora cada lección
    calcula su tiempo real.
  - **El repaso espaciado de lo aprendido:** solo volvían los versículos. Ahora existe el **«Repaso del día»**.
- **Lo que falta en el contenido**, para la sesión que escribe las materias (sección 4):
  - más **fuentes** (36 materias tienen menos de 2+2);
  - **esquemas, mapas y líneas de tiempo** (ninguna lección tiene imagen);
  - **video** en 6 materias;
  - más **casos prácticos** en las preguntas de los niveles altos.

## Cómo se midió

- **El tiempo de lectura**, a ritmo de estudio (comprender un texto con conceptos nuevos):
  - 150 palabras por minuto en el Nivel 1, 140 en el 2, 130 en el 3 y en las especialidades, y 120 en el 4 y el 5;
  - es la franja del estimador de carga de la Universidad Rice: 130 a 180 palabras por minuto para comprender un texto con
    conceptos nuevos.
- **Lo demás de cada lección:**
  - cada versículo citado cuenta unas 28 palabras;
  - cada video, lo que dura (3 minutos si no lo dice);
  - cada pregunta del repaso, 40 segundos;
  - «Para la vida», 2 minutos.
- **Las preguntas, contra el reloj del examen:**
  - leer el enunciado y sus 4 opciones a 200 palabras por minuto, más 12 segundos para decidir;
  - escribir en el teléfono: 36 palabras por minuto en promedio (Palin y otros, 2019, con 37.000 personas).
- **Los estándares de comparación:**
  - la rúbrica Quality Matters, 7.ª edición, la más usada para revisar cursos universitarios en línea:
    - 3.4: pruebas variadas y en secuencia;
    - 4.1 y 4.2: materiales alineados con los objetivos y las actividades;
    - 4.5: variedad de materiales.
  - la revisión de técnicas de estudio de Dunlosky y otros (2013):
    - de mayor utilidad: ponerse a prueba y repasar espaciado;
    - de utilidad media: intercalar materias, explicarse a sí mismo y preguntarse «¿por qué?»;
    - de poca utilidad: releer y resaltar.

## 1. La evaluación: lo que ya cumple el estándar

| Lo que pide un curso universitario en línea | En la academia |
|---|---|
| Objetivos medibles, cada prueba alineada con ellos | Objetivos con su verbo de Bloom. Cada pregunta lleva el objetivo que mide y su nivel. El examen sale repartido por lecciones |
| Pruebas variadas y en secuencia (QM 3.4) | Repaso en cada lección, mini pruebas cada 3 lecciones (N2 en adelante), versículo con repaso espaciado, respuestas escritas con corrector automático, escrito breve, examen final en dos partes, examen integral del nivel, trabajo final de especialidad, actividades del nivel, suficiencia y prueba diagnóstica |
| Retroalimentación a tiempo (QM 3.5) | La respuesta, la explicación y la cita al instante en los repasos; la revisión completa al terminar cada examen; el corrector explica idea por idea |
| Honradez | Reloj del servidor, opciones revueltas, preguntas nuevas en cada intento, texto pegado marcado, código de honor |
| Revisión y apelación | Pedido de revisión dentro de 7 días; la Administración revisa con un motivo y todo queda en el historial |
| Calidad de las preguntas | Análisis de facilidad y discriminación (como Moodle); las preguntas que fallan se retiran |
| Accesibilidad | Tiempo extra ×1,5; escuchar la lección en voz alta; letra más grande |
| Notas | Se aprueba con 70 (y 70 en el examen final); 75 en el integral; 85 y 75 en la suficiencia. Son las reglas usuales |

**Los tiempos de los exámenes son justos:**
- **Objetivas:** la pregunta más larga de toda la academia pide unos 32 segundos para leerla y decidir, y el examen da
  60 (45 en las mini pruebas).
- **Respuestas cortas** (15 a 60 palabras) en 6 minutos y **escritos breves** (80 a 300 palabras) en 15: al ritmo promedio
  en el teléfono alcanza con holgura, y quien lo necesite tiene tiempo extra.

## 2. Lo que se encontró

### 2.1 El tiempo de cada lección (corregido)

**Lo que se medía:**
- Todas las lecciones decían 7 minutos (Niveles 1 y 2) o 10 (los demás), sin importar su contenido.
- Medidas de verdad, la mediana es:

  | Nivel 1 | Nivel 2 | Nivel 3 | Nivel 4 | Nivel 5 | Especialidades |
  |---|---|---|---|---|---|
  | 7 min | 8 min | 14 min | 14 min | 13 min | 8 min |

- Las lecciones con videos llegan a 19–24 minutos.
- **132 de las 320 lecciones** decían menos del 70 % de lo que piden.
- En total, 2.942 minutos declarados frente a **3.789 reales**: el alumno se encontraba con una lección que tardaba
  bastante más de lo prometido.

**Lo que cambió:**
- Cada lección calcula sus minutos con su propio contenido (`server/academia-carga.ts`, `shared/academia-carga.ts`):
  lectura, versículos, videos, repaso y «Para la vida».
- Esos minutos se ven en la lección, en la materia, en el catálogo y en la revisión del contenido. También se usan para el
  tiempo mínimo de lectura antes del repaso, que sigue entre 1 y 3 minutos.
- La portada dice ahora «de 7 a 15 minutos según el nivel».

### 2.2 Los métodos de estudio

- **La estructura es la misma en todas las lecciones:** objetivos, para empezar, la lectura, la idea clave, para la vida
  y el repaso. Da orden y es lo que pide un buen curso (consistencia), pero el estudio era casi solo leer y responder.
- **La lectura sí es variada:**
  - 249 de 320 lecciones tienen listas y 248 tienen notas destacadas;
  - 153 (48 %) tienen un video;
  - solo 6 son puro texto y versículos.
- **Lo que no hay:** ninguna lección tiene una imagen, un mapa, un esquema o una línea de tiempo, ni audio propio. Desde
  el PR #212, todas se pueden escuchar con la voz del aparato.
- **La técnica de mayor utilidad que faltaba era el repaso espaciado de lo aprendido.** Solo los versículos volvían; las
  preguntas de cada lección se respondían una vez y no volvían hasta el examen.
  - Ahora existe el **«Repaso del día»** (`server/academia-repaso-dia.ts`, página `/academia/repaso-del-dia`).
  - Las preguntas del repaso de cada lección terminada vuelven a los 1, 3, 7, 21 y 60 días, de a lo más 10 por día.
  - Vienen **mezcladas entre materias**, que es la práctica intercalada.
  - Si la acierta, vuelve más adelante; si la falla, vuelve mañana con la explicación y la cita. Después de la última
    vuelta, queda dominada.
  - No pone nota. Usa solo las preguntas del repaso, nunca las del examen final.
  - Lo atrasado (las lecciones terminadas antes) se reparte de a 10 por día.
  - Aparece en «Lo de hoy» de la portada, en «Para hoy» del salón y en sus herramientas.

### 2.3 Las preguntas

**El formato:**
- Todas las preguntas objetivas son de opción múltiple con 4 opciones: es el formato que acepta el motor.
- Los otros formatos aparecen dentro de ella pocas veces: verdadero o falso 34 veces, «¿dónde dice?» 30, completar 51 y
  **casos de la vida real 196 (3,5 %)**.
- El inicio más común es «¿Por qué…?» (433 preguntas): piden explicar, no solo recordar, y eso es bueno.

**Los niveles de Bloom, en el porcentaje de preguntas:**

| | Recordar | Comprender | Aplicar | Analizar | Evaluar |
|---|---|---|---|---|---|
| Nivel 1 | 63 % | 28 % | 6 % | 2 % | 1 % |
| Nivel 2 | 47 % | 36 % | 13 % | 4 % | — |
| Nivel 3 | 35 % | 34 % | 15 % | 10 % | 6 % |
| Nivel 4 | 39 % | 27 % | 12 % | 11 % | 11 % |
| Nivel 5 | 38 % | 25 % | 16 % | 10 % | 11 % |
| Especialidades | 37 % | 25 % | 19 % | 10 % | 9 % |

- La progresión existe y está bien para el Nivel 1, que es para el nuevo creyente.
- En los Niveles 4 y 5 y en las especialidades todavía hay más memoria de la que corresponde. Meta sugerida: **no más
  del 30 % de memoria en los Niveles 3 a 5, y al menos un 25 % de aplicar y analizar, con casos.**
- «Crear» casi no aparece en las objetivas: se evalúa, como debe ser, en los escritos breves y en los trabajos finales.

### 2.4 Las fuentes y los recursos

- **Bibliografía:** 36 de las 56 materias tienen menos de 2 libros básicos y 2 complementarios; varias tienen 1+1 o 2+0.
  - Lo usual en un sílabo universitario es 2 a 3 básicos y 2 a 4 complementarios.
  - Cada título nuevo se comprueba (autor y editorial) antes de citarlo, como pide la norma de contenido.
- **Videos:**
  - 6 materias no tienen ningún video en sus lecciones: Disciplinas espirituales, Familia y relaciones, Dones
    espirituales, Teología sistemática II y III, y Sonido y técnica.
  - Tres de ellas (Familia, Dones y Sonido y técnica) tampoco tienen video en sus recursos.
- **Imágenes:** ninguna. Las materias de historia, panorama y libros bíblicos ganarían mucho con líneas de tiempo y mapas
  propios. Es el principio de presentar la información con palabras e imágenes a la vez.

### 2.5 La carga de una materia frente a un curso universitario

- Una materia de los Niveles 3 a 5 pide de 1 a 2 horas de lecciones, más sus mini pruebas, su escrito breve y su examen:
  unas 3 a 4 horas.
- Un curso universitario de 3 créditos pide unas 135 horas (45 por crédito).
- La academia es formación ministerial por lecciones cortas (lo dicen sus documentos: no es un título universitario), y
  eso está bien para su público.
- Para acercar los Niveles 4 y 5 a la profundidad universitaria sin alargar las lecciones, se sugiere:
  - una **lectura ampliada** por materia (un capítulo de su bibliografía o un libro bíblico entero), con un breve reporte
    de lectura;
  - los proyectos y las prácticas supervisadas que el reglamento ya pide.

## 3. Lo que se cambió en este PR

1. **Los minutos reales de cada lección**, calculados con su contenido y mostrados en toda la academia, con su prueba.
2. **El «Repaso del día»:**
   - preguntas de las lecciones terminadas que vuelven en días espaciados, mezcladas entre materias, de a lo más 10 por
     día;
   - tabla nueva `academia_repaso_preguntas`, aditiva, que se borra con la cuenta;
   - reglas en `shared/repaso-del-dia.ts`, con su prueba.
3. **La portada** dice el tiempo real de las lecciones y explica que el repaso vuelve en días espaciados.

## 4. Lo que le falta a cada materia (para el contenido)

«Menos memoria» marca las materias con más preguntas de memoria de lo sugerido (más del 45 % en los Niveles 3 a 5 y en
las especialidades, más del 70 % en los Niveles 1 y 2). «Casos prácticos» marca las que no tienen ninguna pregunta de un
caso de la vida real. «Tiempo» ya quedó corregido con los minutos reales. Además, a todas les faltan esquemas o imágenes
(ninguna lección tiene).

| Materia | Dónde | Minutos (antes → reales) | Lecciones con video | Fuentes (básica+compl.) | Preguntas de memoria | Casos | Qué le falta |
|---|---|---|---|---|---|---|---|
| La salvación: nueva vida en Cristo | Nivel 1 | 28 → 42 | 1 de 4 | 2+3 | 45 % | 2 | tiempo (ya corregido) |
| La oración: hablar con Dios | Nivel 1 | 28 → 37 | 1 de 4 | 2+1 | 50 % | 0 | fuentes (2+1), casos prácticos, tiempo (ya corregido) |
| La Biblia, Palabra de Dios | Nivel 1 | 28 → 31 | 1 de 4 | 2+2 | 60 % | 0 | casos prácticos |
| El Espíritu Santo en mi vida | Nivel 1 | 28 → 30 | 1 de 4 | 2+2 | 67 % | 1 | — |
| El bautismo y la Santa Cena | Nivel 1 | 28 → 32 | 1 de 4 | 2+2 | 55 % | 4 | — |
| La iglesia, mi nueva familia | Nivel 1 | 28 → 38 | 1 de 4 | 2+2 | 76 % | 1 | menos memoria (76 %), tiempo (ya corregido) |
| Una vida nueva: santidad y victoria | Nivel 1 | 28 → 31 | 1 de 4 | 2+2 | 74 % | 3 | menos memoria (74 %) |
| Compartir mi fe | Nivel 1 | 28 → 31 | 1 de 4 | 2+2 | 76 % | 2 | menos memoria (76 %) |
| Panorama del Antiguo Testamento | Nivel 2 | 42 → 65 | 2 de 6 | 2+3 | 47 % | 0 | casos prácticos, tiempo (ya corregido) |
| Panorama del Nuevo Testamento | Nivel 2 | 42 → 82 | 4 de 6 | 2+2 | 68 % | 0 | casos prácticos, tiempo (ya corregido) |
| Doctrinas fundamentales | Nivel 2 | 42 → 80 | 3 de 6 | 2+1 | 39 % | 6 | fuentes (2+1), tiempo (ya corregido) |
| Disciplinas espirituales | Nivel 2 | 42 → 42 | 0 de 6 | 2+2 | 45 % | 4 | video en las lecciones |
| El Sermón del monte | Nivel 2 | 42 → 90 | 6 de 6 | 2+2 | 45 % | 3 | tiempo (ya corregido) |
| Mayordomía cristiana | Nivel 2 | 42 → 49 | 1 de 6 | 2+1 | 45 % | 3 | fuentes (2+1) |
| Familia y relaciones | Nivel 2 | 42 → 39 | 0 de 6 | 2+1 | 43 % | 4 | fuentes (2+1), video en las lecciones |
| Evangelismo personal | Nivel 2 | 42 → 47 | 1 de 6 | 2+1 | 45 % | 6 | fuentes (2+1) |
| Dones espirituales y servicio | Nivel 2 | 42 → 39 | 0 de 6 | 2+2 | 40 % | 8 | video en las lecciones |
| Hermenéutica | Nivel 3 | 60 → 88 | 4 de 6 | 2+2 | 28 % | 3 | tiempo (ya corregido) |
| Métodos de estudio bíblico | Nivel 3 | 60 → 64 | 2 de 6 | 2+3 | 32 % | 2 | — |
| Pentateuco y libros históricos | Nivel 3 | 60 → 116 | 6 de 6 | 2+2 | 39 % | 0 | casos prácticos, tiempo (ya corregido) |
| Los Evangelios y Hechos | Nivel 3 | 60 → 89 | 6 de 6 | 2+2 | 42 % | 0 | casos prácticos, tiempo (ya corregido) |
| La persona y obra del Espíritu Santo | Nivel 3 | 60 → 79 | 3 de 6 | 2+1 | 41 % | 4 | fuentes (2+1), tiempo (ya corregido) |
| Evangelismo y consolidación | Nivel 3 | 60 → 67 | 3 de 6 | 2+2 | 25 % | 1 | — |
| Liderazgo cristiano I | Nivel 3 | 60 → 61 | 1 de 6 | 2+1 | 31 % | 13 | fuentes (2+1) |
| Homilética I | Nivel 3 | 60 → 77 | 4 de 6 | 2+1 | 28 % | 3 | fuentes (2+1) |
| Historia de la iglesia I | Nivel 3 | 60 → 97 | 5 de 6 | 2+0 | 52 % | 1 | fuentes (2+0), menos memoria (52 %), tiempo (ya corregido) |
| Cuidado y consejería básica | Nivel 3 | 60 → 86 | 4 de 6 | 2+0 | 30 % | 15 | fuentes (2+0), tiempo (ya corregido) |
| Teología sistemática I: la Biblia y Dios | Nivel 4 | 60 → 84 | 5 de 6 | 2+1 | 38 % | 2 | fuentes (2+1), tiempo (ya corregido) |
| Teología sistemática II: Cristo y el Espíritu Santo | Nivel 4 | 60 → 52 | 0 de 6 | 2+2 | 39 % | 6 | video en las lecciones |
| Teología sistemática III: el hombre, el pecado y la salvación | Nivel 4 | 60 → 51 | 0 de 6 | 2+3 | 38 % | 6 | video en las lecciones |
| Libros poéticos y proféticos | Nivel 4 | 60 → 104 | 6 de 6 | 2+0 | 37 % | 3 | fuentes (2+0), tiempo (ya corregido) |
| Homilética II: predicación expositiva | Nivel 4 | 60 → 98 | 6 de 6 | 2+1 | 29 % | 1 | fuentes (2+1), tiempo (ya corregido) |
| Historia de la iglesia II | Nivel 4 | 60 → 74 | 3 de 6 | 2+1 | 60 % | 2 | fuentes (2+1), menos memoria (60 %) |
| Apologética | Nivel 4 | 60 → 102 | 6 de 6 | 2+1 | 33 % | 9 | fuentes (2+1), tiempo (ya corregido) |
| Ética cristiana y ministerial | Nivel 4 | 60 → 91 | 5 de 6 | 1+1 | 37 % | 9 | fuentes (1+1), tiempo (ya corregido) |
| Teología pastoral | Nivel 5 | 60 → 66 | 2 de 6 | 2+1 | 38 % | 3 | fuentes (2+1) |
| Administración y gobierno de la iglesia | Nivel 5 | 60 → 68 | 2 de 6 | 1+1 | 36 % | 2 | fuentes (1+1) |
| Didáctica: cómo enseñar | Nivel 5 | 60 → 94 | 5 de 6 | 2+0 | 37 % | 4 | fuentes (2+0), tiempo (ya corregido) |
| Liderazgo II: formar líderes y equipos | Nivel 5 | 60 → 86 | 4 de 6 | 2+1 | 40 % | 7 | fuentes (2+1), tiempo (ya corregido) |
| Griego y hebreo bíblicos para el estudio | Nivel 5 | 60 → 66 | 3 de 6 | 2+3 | 41 % | 0 | casos prácticos |
| Seminario de liderazgo ministerial | Nivel 5 | 60 → 71 | 3 de 6 | 2+1 | 35 % | 2 | fuentes (2+1) |
| Evangelismo personal avanzado | Evangelismo y misiones | 60 → 64 | 2 de 6 | 1+2 | 34 % | 6 | fuentes (1+2) |
| Campañas y cruzadas | Evangelismo y misiones | 60 → 53 | 1 de 6 | 2+1 | 36 % | 2 | fuentes (2+1) |
| Teología bíblica de las misiones | Evangelismo y misiones | 60 → 62 | 2 de 6 | 2+1 | 37 % | 2 | fuentes (2+1) |
| Misión transcultural | Evangelismo y misiones | 60 → 61 | 2 de 6 | 2+1 | 32 % | 1 | fuentes (2+1) |
| Plantación de iglesias | Evangelismo y misiones | 60 → 71 | 3 de 6 | 2+1 | 35 % | 1 | fuentes (2+1) |
| Teología de la adoración | Alabanza y adoración | 60 → 101 | 5 de 6 | 2+1 | 37 % | 5 | fuentes (2+1), tiempo (ya corregido) |
| El adorador: carácter y vida | Alabanza y adoración | 60 → 81 | 4 de 6 | 2+1 | 39 % | 4 | fuentes (2+1), tiempo (ya corregido) |
| Dirigir el ministerio de alabanza | Alabanza y adoración | 60 → 89 | 5 de 6 | 2+1 | 32 % | 2 | fuentes (2+1), tiempo (ya corregido) |
| La música en la historia de la iglesia | Alabanza y adoración | 60 → 68 | 3 de 6 | 2+1 | 45 % | 1 | fuentes (2+1) |
| Sonido y técnica al servicio del culto | Alabanza y adoración | 60 → 46 | 0 de 6 | 2+1 | 22 % | 0 | fuentes (2+1), video en las lecciones, casos prácticos |
| Teología de la oración | Intercesión y oración | 60 → 85 | 5 de 6 | 2+1 | 35 % | 8 | fuentes (2+1), tiempo (ya corregido) |
| Intercesión bíblica | Intercesión y oración | 60 → 67 | 2 de 6 | 2+1 | 40 % | 8 | fuentes (2+1) |
| El ayuno bíblico | Intercesión y oración | 60 → 73 | 3 de 6 | 2+1 | 40 % | 5 | fuentes (2+1) |
| Guerra espiritual bíblica y equilibrada | Intercesión y oración | 60 → 67 | 2 de 6 | 2+1 | 40 % | 6 | fuentes (2+1) |
| La oración en los avivamientos | Intercesión y oración | 60 → 65 | 1 de 6 | 2+1 | 42 % | 0 | fuentes (2+1), casos prácticos |

**Estándar sugerido para las materias que faltan y para completar las publicadas:**
- 2 a 3 fuentes básicas y 2 a 4 complementarias, comprobadas.
- Al menos un video revisado en la mitad de las lecciones (por ejemplo, Proyecto Biblia en español en las materias
  bíblicas).
- Un esquema, mapa, cuadro o línea de tiempo en las materias de historia, panorama y libros bíblicos.
- En los Niveles 3 a 5, no más del 30 % de preguntas de memoria y al menos un 20 % de casos de la vida real.
- Ejemplos resueltos paso a paso en las materias de método (hermenéutica, homilética, métodos de estudio).

## 5. La segunda parte: el contenido de las materias y el tiempo de las pruebas (17-nov)

Pedido de Luis (16-nov): agregar lo que falta «a lo que corresponde… en todas las materias», que «se puedan buscar los
recursos de estudio necesarios» y revisar el tiempo de las pruebas, que se veía corto.

**Lo nuevo en el sistema:**
- **Los esquemas visuales** en la lectura de las lecciones: la línea de tiempo, el cuadro comparativo (una tarjeta por
  fila en el teléfono) y los pasos. Muestran los resaltados del cuaderno y se leen bien con el lector de pantalla.
- **La página de recursos de estudio** (`/academia/recursos`): todos los videos, audios, lecturas y lecturas ampliadas
  de la academia, con un buscador y filtros por tipo, por nivel y por materia.
- **La lectura ampliada** de los Niveles 4 y 5, con su reporte en el cuaderno (una sola nota por materia).
- **El tiempo de cada pregunta**, según su largo y su dificultad.

**Cómo se hizo el contenido.** Para cada materia publicada, un agente redactó lo que le faltaba leyendo sus lecciones y
su banco:
- de 1 a 3 esquemas;
- los libros que faltaban para llegar a 2 básicos y 2 complementarios;
- videos donde no había;
- las preguntas de casos (2, 4 o 6 según el nivel);
- en los Niveles 4 y 5, la lectura ampliada.

Otros dos agentes lo revisaron por separado:
- uno, el contenido y la Biblia: cada fecha, dato y cita en la RV1960, la doctrina del ministerio y que cada caso tenga
  una sola respuesta defendible;
- otro, las fuentes, los videos y la forma: cada libro en un catálogo serio, cada video con YouTube, que la respuesta
  correcta no se delate por su largo, los largos y la ortografía.

Lo que un revisor quitaba no entraba, y sus correcciones se juntaban campo por campo sin perder ninguna. Después, el
programa que arma los registros vuelve a validar todo con las reglas de las pruebas: los límites de los esquemas, las
citas, los objetivos del sílabo, las cuatro opciones distintas y que no haya texto bíblico entre comillas.

**En el primer PR, 23 materias:** todo el Nivel 1, todo el Nivel 2 y seis del Nivel 3 (Hermenéutica, Métodos de estudio
bíblico, Pentateuco y libros históricos, La persona y obra del Espíritu Santo, Evangelismo y consolidación y Liderazgo
cristiano I).

| Lo que se agregó | Cuántos |
|---|---|
| Esquemas | 69: 10 líneas de tiempo, 36 cuadros comparativos y 23 pasos |
| Videos (las materias que no tenían) | 9, en Disciplinas espirituales, Familia y relaciones y Dones espirituales |
| Preguntas de casos en el examen final | 88 |
| Libros comprobados en la bibliografía | 7 |

Los revisores corrigieron 53 esquemas, 74 preguntas (casi siempre porque la respuesta correcta se delataba por ser la más
larga), 2 libros y 1 video. No hubo nada que quitar.

**Las otras 37 materias:** cuatro del Nivel 3, los Niveles 4 y 5 (con Exégesis y Teología del avivamiento, publicadas
el 16-nov) y las tres especialidades. Tienen su borrador y siguen en revisión. Van en el PR siguiente, con sus lecturas
ampliadas.

**El tiempo de las pruebas.** Se midió lo que pide cada pregunta:
- leerla, a 130 palabras por minuto (el ritmo de un lector promedio en el teléfono);
- decidir, 25 segundos;
- pensar según su nivel de Bloom: 5 segundos más si pide comprender, 20 si pide aplicar y 30 si pide analizar o
  evaluar.

Esta medida reemplaza la de la sección 1 (200 palabras por minuto más 12 s). Con las 3.313 preguntas de los finales:

| | Preguntas | Tiempo |
|---|---|---|
| Recordar y comprender | 2.192 (66 %) | 60 s, el tiempo base: son cortas y alcanza |
| Aplicar | 483 | mediana de 65 s, hasta 110 |
| Analizar y evaluar | 634 | mediana de 75 s, hasta 120 |
| Todas | 3.313 | el 71 % en 60 s; 84 pasan de 90 s |

Ahora cada pregunta trae su tiempo (`segundosDePregunta`): nunca menos que el tiempo base ni más del doble. Las mini
pruebas daban 45 segundos por pregunta; ahora dan 60 de base, como el final (de 60 a 85 según la pregunta). La prueba
diagnóstica dice los minutos que de verdad pide (unos 31). Con tiempo extra, todo por 1,5.

**Lo que hay que saber después de publicar:** la aprobación doctrinal de cada materia guarda la huella de su contenido.
Con los esquemas, los casos y los libros nuevos, la huella cambia, y la pestaña «Contenido» del panel mostrará estas
materias como cambiadas desde su aprobación. Así debe ser: la Dirección académica revisa lo agregado y vuelve a
aprobarlas. Eso no cierra nada a los alumnos.

## Fuentes

- Quality Matters, rúbrica de Educación Superior, 7.ª edición: [estándares](https://www.qualitymatters.org/sites/default/files/PDFs/StandardsfromtheQMHigherEducationRubric.pdf) y [resumen](https://ooe.iu.edu/program-support/quality-matters/qm-rubric.html).
- Universidad Rice, Centro de Excelencia en la Enseñanza: [estimador de carga de trabajo](https://cte.rice.edu/workload).
- Dunlosky, J., y otros (2013). *Improving Students’ Learning With Effective Learning Techniques*. Psychological Science in the Public Interest ([resumen de la APS](https://www.psychologicalscience.org/news/releases/which-study-strategies-make-the-grade.html)).
- Palin, K., y otros (2019). *How do People Type on Mobile Devices? Observations from a Study with 37,000 Volunteers*. MobileHCI ([artículo](https://www.pokristensson.com/pubs/PalinEtAlMobileHCI2019.pdf)).
