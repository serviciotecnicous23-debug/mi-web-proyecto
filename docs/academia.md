# Academia Avivando el Fuego — el guion

> «Procura con diligencia presentarte a Dios aprobado» (2 Timoteo 2:15)

La Academia es el instituto de formación de la web, dentro de **Clases**: niveles, materias, lecciones cortas, exámenes
con corrección automática, notas, estatus de cada alumno y certificados y diplomas que salen solos. Va desde el nuevo
creyente (orar, creer en Jesús, lo básico) hasta formar obreros, maestros y pastores.

- **Es académica, no un juego.** La estructura, la evaluación y los registros vienen de los institutos bíblicos y de las
  plataformas académicas. Del juego solo se toma la seguridad técnica de los exámenes: las preguntas viven en el
  servidor, llegan de a una, con reloj y con las opciones en otro orden.
- **Todo se corrige solo.** No siempre habrá un profesor disponible. Quien tenga el cargo puede revisar y cambiar una
  nota, siempre con un motivo.
- **Formación ministerial del ministerio, no un título universitario oficial.** En Texas, la THECB no regula los
  estudios solo religiosos, pero protege «college» y «university» en el nombre. Por eso nunca se usan Licenciatura,
  Maestría, Doctorado, Universidad ni Seminario.

## 1. La estructura

```
Academia Avivando el Fuego
├── Etapa 1 · Raíces (Colosenses 2:7) ....... Nivel 1 Fundamentos de la fe · Nivel 2 Discipulado
├── Etapa 2 · Servicio (Efesios 4:12) ....... Nivel 3 Formación de obreros
├── Etapa 3 · Ministerio (2 Timoteo 2:2) .... Nivel 4 Teología ministerial · Nivel 5 Liderazgo y docencia
└── Especialidades (desde el Nivel 2) ....... 12 especialidades de 5 materias; se pueden sacar todas
```

**La base bíblica:**
- **Hebreos 5:12–6:2:** de la leche al alimento sólido. Los rudimentos son el Nivel 1.
- **Efesios 4:11-13:** se prepara a todos los creyentes para servir.
- **2 Timoteo 2:2:** el último nivel forma a otros.
- **Tres dimensiones en cada nivel:** Conocer, Ser y Hacer.

| Nivel | Para quién | Materias | Documento |
|---|---|---|---|
| 1 · Fundamentos de la fe | Nuevo creyente | 8 | Certificado en Fundamentos de la Fe |
| 2 · Discipulado | Creyente que crece | 9 | Certificado en Discipulado Cristiano |
| 3 · Formación de obreros | Servidores, líderes de grupo | 10 | Diploma de Obrero Cristiano |
| 4 · Teología ministerial | Líderes, predicadores, maestros | 10 | Diploma en Teología Ministerial (con mención si terminó una especialidad) |
| 5 · Liderazgo y docencia | Pastores, profesores | 8 + proyecto | Diplomado Superior en Ministerio Cristiano |

**Qué guarda `shared/academia.ts` (la fuente de verdad):**
- El catálogo completo: etapas, niveles con sus requisitos, las 45 materias, las 12 especialidades con sus 60 materias y
  las lecciones del Nivel 1.
- El sílabo de cada materia publicada.

**Los cursos que había** («Evangelismo 1, 2 y 3» y «Discipulado») quedan como referencia. Las materias que los renuevan
lo dicen con `antes`.

## 2. Cómo es una lección

Cada lección trata una sola idea y dura de 5 a 10 minutos. Tiene estas partes:

1. **Objetivos.**
2. **Para empezar.**
3. **La lectura:** texto, versículos, video, audio o imagen. Los versículos se escriben solo con su referencia, y el
   servidor los toma de la RV1960 de la web (`getBibleChapter`) al pedir la lección; al tocarlos se abre el capítulo en
   la Biblioteca.
4. **La idea clave.**
5. **Para la vida:** una aplicación y una nota privada.
6. **Repaso:** preguntas con la respuesta al instante. Sin el repaso respondido bien no se puede terminar la lección.

Además, cada materia tiene su **versículo de memoria**: primero se estudia y después se arma con fichas, sin mirarlo.

## 3. El sistema de evaluación

**Modelos tomados de plataformas reales:**
- **Moodle**, sus cuestionarios: banco de preguntas, preguntas al azar, intentos, tiempo y revisión.
- **Open University**, la pregunta «Pattern-match»: respuestas cortas comparadas con patrones.
- **Moodle**, el «Essay (auto-grade)»: nota preliminar que el profesor puede cambiar.
- **Moodle**, el informe estadístico: facilidad y discriminación de cada pregunta.

| Prueba | Cómo es | Quién corrige |
|---|---|---|
| Repaso | Al final de cada lección, con la explicación y la cita al instante | El sistema |
| Versículo de memoria | Fichas en orden: 100 a la primera, 80 a la segunda y 60 como mínimo | El sistema |
| Examen final | Parte A objetiva y Parte B escrita; la revisión completa se ve al terminar | El sistema (revisable) |
| Examen integral del nivel | Con todas las materias del nivel aprobadas: 40 preguntas, 5 de cada materia del Nivel 1, y 2 escritas de materias distintas; se aprueba con 75 | El sistema (revisable) |
| Mini pruebas, escritos breves, práctica y proyecto | Desde las fases siguientes | Sistema, líder o 2 profesores |

**El cierre del nivel** (`server/academia-nivel.ts`, página `/academia/nivel/:n`):
- **Requisitos:** las materias del nivel aprobadas, el examen integral, los versículos de memoria que pide el nivel
  (`VERSICULOS_NIVEL`: 4 en el Nivel 1) y el pacto (`PACTOS`).
- **El examen integral** usa el mismo motor que el final de cada materia (reloj, una pregunta por pantalla, intentos con
  espera de 30 minutos y 24 horas, preguntas nuevas en cada intento y revisión completa). Sale repartido por materia.
- **El pacto del creyente** (Nivel 1, Josué 24:15): seis compromisos con su versículo. Se acepta al final, después de
  aprobar el integral.
- **El nivel completo:** con todo eso se guarda la fecha y el promedio de sus materias (desde 90, «con honores») y el
  alumno pasa al nivel siguiente.

**Los documentos** (`server/academia-documentos.ts`, páginas `/academia/certificado/:codigo` y `/academia/verificar`):
- **Cuándo salen:** el certificado de cada materia, al aprobarla en el examen, y el del nivel, al completarlo. Lo
  aprobado antes de que existieran recibe su documento la primera vez que se piden (`asegurarDocumentos`).
- **El código:** `AAF-XXXX-XXXX`, en base 32 de Crockford (sin I, L, O ni U), con 40 bits al azar: no se puede adivinar.
  Al verificar se aceptan minúsculas, espacios y la O por el 0 (`normalizarCodigo`).
- **El documento:** el mismo diseño del certificado de la Escuela, con el nombre del día en que se emitió, la nota o el
  promedio, «con honores» en el del nivel, las líneas de la Dirección académica y del Ministerio, el QR que lleva a la
  verificación y la aclaración «No es un título universitario oficial». Lo ven su dueño y la Dirección académica; se
  descarga en PDF o se imprime.
- **La verificación pública** (sin cuenta, la abre el QR): válido o revocado, el nombre, el documento, el nivel y la
  fecha, **sin notas**. La casilla «Verificar» de Certificados también acepta estos códigos.
- **Firmas:** por ahora, la línea de la Dirección académica y el sello del Ministerio; los nombres y las firmas los da
  Luis.

**La inscripción** (`server/academia-inscripcion.ts`, `shared/academia-inscripcion.ts`, página `/academia/inscripcion`;
`/academia/matricula` lleva a la misma página). Como en los sistemas académicos (Moodle, Canvas, Populi): una ficha de
admisión con campos propios y, después, la matriculación en cada curso desde su página de presentación.
- **Sin aprobación:** la inscripción en la academia y en cada materia queda aprobada al instante (lo pidió Luis). La
  Dirección académica la sigue en su panel y recibe un aviso en la campana con cada inscripción (ver «Los avisos»).
- **En la academia**, un asistente de cuatro pasos con barra de avance:
  1. Bienvenida: qué es la academia, cómo se estudia y cómo es la inscripción.
  2. Tus datos, la **ficha** (`academia_inscripciones`):
     - obligatorios: nombres y apellidos (como saldrán en los certificados), país y tiempo en la fe;
     - opcionales: ciudad, teléfono o WhatsApp, fecha de nacimiento, iglesia aliada (la lista de «Buscar iglesia») u
       otra, pastor o líder, bautismo, ministerio, cómo conoció la academia y qué espera aprender.
     Al lado, el aviso de privacidad: quién ve los datos y para qué.
  3. El reglamento académico y el código de honor, con las dos aceptaciones.
  4. La confirmación: el nombre como saldrá en los documentos y el resumen. Da el número de matrícula y el carné.
- **La validación** es la misma en el navegador y en el servidor (`validarFicha`):
  - los nombres llevan solo letras y, si llegan todo en minúscula o en mayúscula, se escriben bien («maría josé» →
    «María José»);
  - el teléfono pide sus dígitos y la fecha tiene que ser real;
  - quien pone su fecha de nacimiento debe tener 13 años o más (`EDAD_MINIMA`).
  La ficha sugiere lo que ya se sabe de la cuenta: el nombre repartido, el país, el teléfono y la iglesia.
- **El nombre de los documentos** es el de la ficha (`nombreAcademico`). La primera ficha de quien ya tenía certificados
  les pone ese nombre. Con un certificado emitido, el nombre queda fijo y lo corrige la Dirección académica; lo demás de
  la ficha se corrige cuando se quiera.
- **Quien se matriculó antes de la ficha** debe completarla para seguir guardando su avance (la página lo lleva directo
  a «Tus datos»).
- **En cada materia:** su página muestra primero la **presentación** (lo que se aprende, con los objetivos del sílabo;
  cómo es; cómo se evalúa; para quién es y lo que se recibe) y el botón «Inscribirme en esta materia». La fila de
  `academia_materias` es la inscripción (`inicio_at` es la fecha); lo que ya estaba en curso cuenta como inscrito.
  - Requisitos (`requisitosMateria`): el Nivel 1 no pide nada; cada nivel pide el anterior completo; las
    especialidades, el Nivel 2, y las avanzadas, el 3.
  - Se recomienda llevar una o dos materias a la vez, sin tope.

**Los candados de la inscripción:**
- **Sin inscripción en la academia** se lee la primera lección de cada materia del Nivel 1 (pública) y su repaso se
  guarda, para no perderlo al inscribirse. Las demás lecciones responden 409 `{inscripcion: false}`.
- **Sin inscripción en la materia**, lo mismo: la primera lección y su repaso sí; las demás lecciones, completar, el
  versículo y el examen responden 409 `{materia: false}` (`inscritoEnMateriaDe`). Los exámenes ponen «inscribirte en la
  academia» o «inscribirte en esta materia» en lo que falta.
- **Vista docente:** la Dirección académica y los profesores (`puedeRevisar`) leen todas las lecciones y el versículo
  sin inscribirse. Pueden responder el repaso, pero no se guarda nada y no cuentan como alumnos.

**La matrícula y el estatus** (`server/academia-matricula.ts`, páginas `/academia/carne` y `/academia/reglamento`):
- **La matrícula** se da al inscribirse: un número correlativo `AAF-año-número` (secuencia `academia_matricula_seq`) y
  la promoción (el año, hora de Texas). Se guarda la versión del reglamento aceptada.
- **El estatus** sale del avance (`estatusDe`): aspirante (sin lecciones terminadas), estudiante activo, en pausa
  (más de `DIAS_PAUSA` días sin estudiar; vuelve a activo al estudiar), egresado del nivel (lo completó y el siguiente no
  está disponible), graduado de la academia (Nivel 5) y la marca de cuadro de honor. Nunca muestra notas.
- **La foto del carné:** el alumno la pone desde su carné. La elige, la encuadra en el marco del carné (4:5: se arrastra y
  se acerca) y se guarda recortada a 600 × 750 en la carpeta «academia» (`POST /api/upload/file` y después
  `POST /api/academia/foto`, que solo acepta archivos subidos a la web). Se puede quitar. Sin foto propia, el carné usa la
  del perfil o las iniciales. Se borra con la cuenta.
- **El carné digital** lleva la foto (o las iniciales), el nombre, el número, la promoción, el estatus y un QR. El QR usa
  un código al azar (`carne_codigo`), no el número de matrícula, que es correlativo y dejaría recorrer los nombres. Se
  verifica en la misma página de los certificados, con el estatus de hoy, y se descarga en PDF de tamaño tarjeta.
- **El reglamento** es una página pública. Sus números salen de las constantes del sistema (una prueba lo comprueba).

**El panel de seguimiento** (`server/academia-direccion.ts`, página `/academia/direccion`). Lo pidió Luis: quién está
inscrito en cada materia, por dónde va y los reportes, en el área de reportes y de administración. Tiene 5 pestañas:
- **Resumen:**
  - los indicadores: inscritos, nuevos de la semana y del mes, activos, materias aprobadas y promedio;
  - la tabla de las materias, con inscritos, en curso, aprobadas, promedio y avance medio;
  - los alumnos por estatus, por país y por iglesia;
  - quiénes se detuvieron (con materias en curso y 14 días o más sin estudiar);
  - la actividad reciente.
- **Alumnos:** la tabla con búsqueda y filtros (estatus, materia en curso, iglesia y país). Cada alumno abre su página
  (`/academia/direccion/alumno/:id`) con su ficha y su foto, su avance en cada materia, sus niveles, sus certificados y su
  actividad.
- **Materias:** cada una abre su seguimiento (`/academia/direccion/materia/:id`): quiénes están inscritos y por dónde va
  cada uno (lecciones, versículo, examen y nota).
- **Registro:** las inscripciones en la academia y en cada materia, las materias aprobadas y los niveles completos, con
  filtros.
- **Roles y permisos:** la matriz, tal como la comprueba el servidor.

Los reportes en CSV (`GET direccion/exportar/alumnos.csv`, `avance.csv` y `materias.csv`) se abren en Excel con las
tildes bien (UTF-8 con BOM). Ninguna celda se toma como fórmula (`server/academia-csv.ts`, con su prueba). También
están en Reportes → «Academia» (se carga aparte), y Administración tiene el acceso al panel.

**Roles y permisos** (`shared/academia-permisos.ts`, con su prueba). Es una matriz de capacidades, como los roles de
Moodle; el servidor la comprueba en cada ruta y el panel la muestra.

| Capacidad | Dirección académica (admin, director, staff_global) | Profesor (maestro_ministerio, obrero) | Iglesia aliada (admin_iglesia, maestro_iglesia) | Alumno |
|---|---|---|---|---|
| Entrar al panel | Todos | Todos | Los de su iglesia | — |
| Ver quién está inscrito y por dónde va | Todos | Todos | Los de su iglesia | Lo suyo |
| Ver las notas y los exámenes | Todos | Todos | Los de su iglesia | Lo suyo |
| Ver la ficha con el contacto | Todos | — | Los de su iglesia | Lo suyo |
| Descargar los reportes | Todos | — | Los de su iglesia | — |
| Recibir los avisos de inscripción | Todos | — | Los de su iglesia | — |
| Revisar escritas y cambiar notas (A3) | Todos | Todos | — | — |
| Corregir o revocar documentos (A3) | Todos | — | — | — |
| Abrir o cerrar la academia (A3) | Administración y Director | — | — | — |

- «Los de su iglesia»: los alumnos cuya ficha eligió la iglesia aliada de la cuenta (`users.church_id`). Sin iglesia
  asignada no ve a nadie.
- **El expediente** (`/academia/expediente`, `GET /api/academia/expediente`): el alumno ve sus materias con su avance, su
  nota y su certificado, sus niveles y sus certificados, y lo imprime. El perfil muestra su estatus, sin notas, con los
  enlaces al carné y al expediente.

**Los avisos** (`avisarInscripcion`, en `server/academia-inscripcion.ts`):
- Cada inscripción nueva (en la academia o en una materia) deja un aviso en la campana:
  - a la Dirección académica (admin, director y staff_global);
  - a quienes dirigen la iglesia aliada del alumno (admin_iglesia y maestro_iglesia de esa iglesia).
- El aviso abre al alumno en el panel. Nadie recibe el aviso de su propia inscripción, e inscribirse dos veces no avisa
  dos veces.
- No manda correos ni avisos al teléfono.

**La Academia primero** (lo pidió Luis: en las clases de la Escuela no se está dando clase):
- Para quien ve la academia (la vista previa o, cuando se abra, todos), el botón «Clases» de la barra de la app pasa a
  «Academia», y también el acceso de Inicio y el primer enlace de «Formación» en el menú.
- La Academia y la Escuela comparten las pestañas «Academia | Clases en vivo»: Capacitaciones pasa a llamarse «Clases
  en vivo» y el botón de la barra queda marcado en las dos.

**El examen final** (`EXAMEN_FINAL` en `shared/academia.ts`):

| Nivel | Parte A | Parte B | Peso A/B | Tiempo |
|---|---|---|---|---|
| 1 | 10 de un banco de 30 | 1 respuesta corta de 15 a 60 palabras | 80/20 | 60 s por pregunta; 6 min la escrita |
| 2 | 15 de 45 | 2 cortas | 70/30 | 60 s; 6 min |
| 3–5 | 20 de 60 | 1 corta y 1 escrito breve | 60/40 | 60 s; 15 min |

- **Repartido por lecciones:** el examen sale repartido según la tabla de especificaciones. Cada pregunta del banco
  dice su lección, su objetivo y su nivel de Bloom, y las que sobran se turnan entre intentos (`elegirFinal`).
- **Reloj en el servidor:** lo lleva el servidor (`curso_at`; se cuenta en SQL con `EXTRACT(EPOCH FROM now() - x)`).
  La pregunta respondida tarde, o la que se dejó vencer, cuenta como mala.
- **Orden de las opciones:** cada pregunta tiene su propio orden (`opcionesDeExamen` de `server/orden-examen.ts`).
- **Respuestas:** no se dice si una respuesta estuvo bien hasta el final.
- **Intentos:** cada intento trae preguntas que todavía no salieron (`vistas`).
- **Si no aprueba la materia:** hay que esperar 30 minutos después del primer intento y 24 horas desde el segundo. Desde
  el tercer fallo, hay que volver a abrir todas las lecciones.
- **Compromiso de honradez:** se acepta antes de empezar (Colosenses 3:23).

**El corrector de lo escrito** está en `server/academia-correccion.ts`. Cada pregunta escrita tiene una **clave**, que
vive solo en el servidor: las ideas con su peso y sus formas aceptadas, las citas que la sostienen, los conceptos
errados y una respuesta modelo. El corrector:
- normaliza el texto (sin tildes ni signos) y tolera faltas pequeñas;
- busca cada forma con hasta 2 palabras de más en medio;
- entiende la negación: «no es por obras» cuenta, pero «es por obras» es un concepto errado y anula la idea;
- reconoce citas bíblicas escritas por el alumno, también abreviadas, y comprueba que existan;
- pide un mínimo de palabras;
- detecta las listas de palabras sueltas y las copias de la pregunta;
- deja anotado el texto pegado;
- da la nota idea por idea y marca **para revisar** lo dudoso (de 40 a 74, conceptos errados, texto pegado, listas o
  copias).

La nota automática vale mientras quien tenga el cargo no la cambie.

**Las formas de una clave:**
- `palabra`: tolera una letra de diferencia desde 5 letras y dos desde 9.
- `raiz*`: cualquier palabra que empiece así.
- `(a|b|c*)`: cualquiera de esas.
- No existe un «opcional». Para eso se escriben dos formas.
- Las raíces que cambian al conjugarse necesitan las dos formas: `confes*` y `confies*` (confiesa), `arrepent*` y
  `arrepient*` (me arrepiento), `convert*` y `conviert*` (se convierte), `record*` y `recuerd*` (recuerda).
- La negación cuenta en las 3 palabras de antes. En los conceptos errados, además, no vale una negación metida entre las
  palabras de la forma: «el bautismo no salva» no afirma «el bautismo salva».
- `basta`: cuando la pregunta pide solo algunas de las ideas (por ejemplo «describe tres cosas» y la clave tiene cinco
  de 20 puntos), `basta: 60` hace que 60 puntos de ideas ya den la nota completa.
- La respuesta modelo de cada clave debe sacar 90 o más (`problemasDeClave`, y la prueba lo vigila).

**Nota y medallas:**
- La nota va de 0 a 100: se aprueba con 70 y desde 90 es «con honores».
- Medallas: oro desde 95, plata desde 85 y bronce desde 70.
- **Nivel 1:** examen final 70 %, repasos 15 % y versículo 15 %.
  - Los repasos valen 60 por hacerlos todos y hasta 40 más por los aciertos a la primera.
  - La materia se aprueba con 70 de nota y el examen aprobado.

**Equivalencias (fase A4):**
- La prueba diagnóstica solo sugiere por dónde empezar.
- El **examen de suficiencia** es la única manera de saltar una materia:
  - 25 preguntas de todas las lecciones, 2 escritas y el versículo;
  - se aprueba con 85 en la parte objetiva y 75 en la escrita;
  - hay **una sola oportunidad** por materia.
- Topes:
  - Niveles 1 y 2: el examen integral sigue siendo obligatorio.
  - Niveles 3 a 5: como máximo la mitad de las materias por suficiencia o convalidación.
  - La práctica, el sermón y el proyecto nunca se convalidan.

## 4. El contenido: normas para que nada sea inventado ni errado

1. **La Escritura primero:** cada afirmación doctrinal lleva su base bíblica, leída en su contexto.
2. **Texto original**, al nivel del alumno. No se copian libros.
3. **Nada inventado:**
   - Fechas, nombres y datos de historia se comprueban en dos fuentes serias.
   - Si la Biblia no dice algo, se dice así.
4. **Doctrina:**
   - Se sigue la declaración de fe del ministerio, que hay que aprobar antes del Nivel 2.
   - Donde los evangélicos difieren, se presenta con respeto y se marca la posición del ministerio.
5. **Citas:** las de la Biblia salen de la RV1960 de la web. Las frases entre comillas deben ser literales.
6. **Bibliografía:** cada materia cita obras que usan los institutos bíblicos hispanos, y cada título (autor y
   editorial) se comprueba antes de citarlo. Algunas ya comprobadas:
   - Myer Pearlman, *Teología bíblica y sistemática* (Vida).
   - Duffield y Van Cleave, *Fundamentos de teología pentecostal* (Foursquare Media).
   - Pablo Hoff, *Teología evangélica*, *El Pentateuco* y *Otros evangelios* (Vida).
   - Justo L. González, *Historia del cristianismo*.
   - Fee y Stuart, *La lectura eficaz de la Biblia*.
   - Robert Coleman, *Plan supremo de evangelización* (Casa Bautista).
   - Richard Foster, *Celebración de la disciplina* (Peniel).
   - Stanley M. Horton, *El Espíritu Santo revelado en la Biblia* (Vida, edición revisada de 1993).
   - Ralph M. Riggs, *El Espíritu mismo* (traducción de *The Spirit Himself*; sin editorial comprobada).
   - Henrietta C. Mears, *Lo que nos dice la Biblia* (Vida).
   - Josh McDowell, *Nueva evidencia que demanda un veredicto* (Mundo Hispano).
   - Stanley M. Horton (ed.), *Teología sistemática: una perspectiva pentecostal* (Vida, 1996; revisada en 1999).
   - Rick Warren, *Una vida con propósito* (Vida).
   - Neil T. Anderson, *Victoria sobre la oscuridad* (Unilit).
   - Sin editorial comprobada (se citan sin ella): Jerry Bridges, *En pos de la santidad*; Rebecca Manley Pippert,
     *Fuera del salero*.
7. **Medios:**
   - Videos del ministerio y videos educativos gratuitos de Proyecto Biblia (BibleProject en español), con su fuente.
   - Audio narrado (Estudio de Voz IA).
   - Mapas y esquemas propios.
   - Cada video se revisa antes de usarlo.
8. **Control de calidad:**
   - Automático: ids únicos, opciones distintas, explicación y cita, banco de 3 veces el examen, cada objetivo medido.
   - Revisión doctrinal (Luis o un pastor que él nombre).
   - Piloto: Luis cursa la materia completa.
   - Análisis de las preguntas cuando ya hay alumnos.

## 5. Cómo agregar una materia

1. En `shared/academia.ts`:
   - Escribe sus lecciones (`lecciones(...)`) y su **sílabo**: propósito, objetivos con su nivel de Bloom, Conocer, Ser
     y Hacer, bibliografía y recursos.
   - Déjala en `disponible: false` mientras se escribe.
2. Escribe el contenido en `server/academia/contenido/<id>.ts` (tipo `LeccionContenido`: objetivos, para empezar,
   bloques, idea clave, para la vida). Cada versículo va como `{ t: "versiculo", ref: "Libro c:v-v" }`, con un solo
   capítulo por bloque.
3. Escribe el banco en `server/academia/bancos/<id>.ts`:
   - El repaso de cada lección: 3 preguntas.
   - El final: 3 veces el examen, con `leccion`, `objetivo` y `bloom` en cada pregunta.
   - Las escritas, con su clave.
   - **Los ids nunca se reusan.**
4. Regístralos en `server/academia/index.ts`.
5. Corre las pruebas: `npx tsx --test server/academia-correccion.test.ts shared/academia.test.ts`, y después
   `npx tsx scripts/academia/verificar.ts`, que comprueba citas, bancos y claves contra la Biblia de la web.
6. Revisión doctrinal y piloto. Después, `disponible: true`.

## 6. La parte técnica

**Archivos:**
- `shared/academia.ts`: catálogo, reglas, notas y tipos de la API. Sin drizzle ni zod.
- `shared/academia-acceso.ts`: quién la ve en la vista previa. Lo usa el menú.
- `server/academia-comun.ts`:
  - las tablas (`ACADEMIA_SQL`);
  - el acceso y la fila por persona;
  - los versículos (`textoDeCita`);
  - la nota de la materia (`recalcularMateria`).
- `server/academia.ts`: el catálogo, la materia, la lección, el repaso, completar, la nota privada y el versículo.
- `server/academia-examen.ts`: el motor de los exámenes. Una `Evaluacion` (clave, medida, nota para aprobar, banco,
  reparto, requisitos y qué pasa al cerrar) sirve para el final de una materia y para el integral de un nivel, con las
  mismas rutas (`rutasDeEvaluacion`).
- `server/academia-eleccion.ts`: qué preguntas trae cada intento, con su prueba en `server/academia-eleccion.test.ts`.
- `server/academia-nivel.ts`: el cierre del nivel (integral, versículos, pacto y nivel completo).
- `server/academia-documentos.ts`: los certificados (emisión, vista con QR y verificación pública). Usa la librería
  `qrcode` en el servidor.
- `server/academia-matricula.ts`: la matrícula, el estatus y el carné (y su verificación).
- `server/academia-inscripcion.ts`: la inscripción en la academia (la ficha) y en cada materia, y si la academia ya
  está abierta para todos. La ficha, sus opciones y su validación están en `shared/academia-inscripcion.ts`, con su
  prueba.
- `server/academia-direccion.ts`: el panel de seguimiento, los reportes en CSV (`server/academia-csv.ts`) y el expediente.
- `shared/academia-permisos.ts`: los roles y los permisos de la academia; `shared/academia-direccion.ts`, los tipos del panel.
- `client/src/components/academia/seguimiento.tsx`: las piezas del panel y del expediente (indicadores, barras y
  medidores en un solo tono de naranja, validado en claro y en oscuro). `foto-carne.tsx`: la foto del carné.
- `client/src/lib/academia-visible.ts` y `client/src/components/academia/pestanas-clases.tsx`: si la academia se ve y
  las pestañas «Academia | Clases en vivo». Los usan el menú, la barra de la app, Inicio y Capacitaciones, así que no
  importan el catálogo.
- `server/academia-correccion.ts`: el corrector, con su prueba en `server/academia-correccion.test.ts`.
- `server/academia/`: los tipos, el contenido, los bancos y el registro. **Solo servidor.**
- `client/src/pages/academia*.tsx` y `client/src/components/academia/` (`examen.tsx` es la pantalla común de los
  exámenes).

**Tablas** (aditivas; se borran con la cuenta en `server/account-deletion.ts`):

| Tabla | Qué guarda |
|---|---|
| `academia_alumnos` | Matrícula, promoción, estatus, nivel, mentor, reglamento aceptado (fecha y versión), código de honor, código del carné y racha |
| `academia_lecciones` | Vista, completada, repaso (`{pregunta: {primera, ok}}`) y nota privada |
| `academia_pruebas` | Una fila por examen (`<materia>:final` y `nivel-<n>:integral`): intentos, fallos, mejor, última, vistas, el intento en curso en jsonb, `curso_at`, `fallo_at`, `aprobada_at` y el resultado con su revisión |
| `academia_niveles` | El cierre de cada nivel: el pacto aceptado, el nivel completo y su promedio |
| `academia_certificados` | Los documentos: código, alumno, tipo (materia o nivel), título, nombre del día de emisión, nota, honores, vía, fecha y revocación con su motivo |
| `academia_respuestas` | Lo escrito, con la nota automática, el detalle, la marca para revisar y la revisión humana (nota final, revisor, motivo) |
| `academia_materias` | La inscripción en la materia (`inicio_at`), estado, nota, componentes y vía (cursada, suficiencia o convalidada) |
| `academia_inscripciones` | La ficha de inscripción: nombres, apellidos, país, ciudad, teléfono, nacimiento, iglesia aliada u otra, pastor, tiempo en la fe, bautismo, ministerio, cómo conoció la academia, qué espera aprender, la foto del carné (`foto_url`) y sus fechas |
| `academia_versiculos` | Intentos, fallos, puntaje y la caja del repaso espaciado |

**Rutas** (`/api/academia/…`). Los parámetros no se llaman `:id`, porque `app.param("id")` exige números.

| Ruta | Para qué |
|---|---|
| `GET estado` | Catálogo con el avance del alumno y «Continuar» |
| `GET materia/:materiaId` | La materia con su sílabo |
| `GET leccion/:leccionId` | La lección, con los versículos ya resueltos |
| `POST repaso` | Una respuesta del repaso: `{leccionId, preguntaId, opcion}` |
| `POST leccion/:leccionId/completar` y `POST leccion/:leccionId/reflexion` | Terminar la lección y guardar la nota privada |
| `GET versiculo/:materiaId` | El texto; con `?practica=1`, las fichas sin el texto |
| `POST versiculo/:materiaId` | El orden de las fichas: `{orden}` |
| `GET examen/:materiaId` | El estado del examen y el último resultado |
| `POST examen/:materiaId/empezar` | `{compromiso: true}` |
| `POST examen/:materiaId/paso`, `POST examen/:materiaId/respuesta` y `POST examen/:materiaId/escrita` | El examen en curso: `{opcion}` en la objetiva; `{texto, pegado}` en la escrita |
| `GET nivel/:n` | El nivel y lo que falta para cerrarlo |
| `POST nivel/:n/pacto` | Aceptar el pacto: `{acepto: true}`, con el integral aprobado |
| `GET integral/:nivel` y `POST integral/:nivel/empezar`, `/paso`, `/respuesta` y `/escrita` | El examen integral: las mismas rutas que el final |
| `GET certificados` | Mis documentos (emite los que falten) |
| `GET certificado/:codigo` | Un documento completo, con su QR: para su dueño y la Dirección académica |
| `GET verificar/:codigo` | La verificación pública (certificado o carné), sin cuenta y sin notas |
| `GET abierta` | Si la academia ya está abierta para todos (el menú y la barra de la app) |
| `GET inscripcion` | Mi ficha, mi matrícula, las iglesias aliadas, lo que se sabe de mi cuenta y si mi nombre ya es fijo |
| `POST inscripcion` | Inscribirme o corregir mi ficha: `{ficha, reglamento: true, honor: true}` (las aceptaciones, la primera vez) |
| `POST materia/:materiaId/inscripcion` | Inscribirme en una materia (pide la academia y el nivel anterior) |
| `POST foto` | La foto del carné: `{url}` de un archivo subido a la web, o `{url: null}` para quitarla |
| `GET expediente` | Mi expediente: mis materias con su avance y su nota, mis niveles y mis certificados |
| `GET direccion/resumen`, `GET direccion/alumnos`, `GET direccion/alumno/:alumnoId`, `GET direccion/materia/:materiaId` y `GET direccion/actividad` | El panel de seguimiento (cada rol, con su alcance) |
| `GET direccion/exportar/:archivo` | Los reportes: `alumnos.csv`, `avance.csv` y `materias.csv` |
| `GET matricula` | Mi matrícula |
| `GET carne` | Mi carné, con su QR (pide la inscripción) |
| `GET dev/correcta/:materiaId`, `GET examen/:materiaId/dev-correcta`, `GET integral/:nivel/dev-correcta` y `POST dev/adelantar` | **Solo en desarrollo**, para las pruebas; no existen en la web publicada |

**Vista previa:** mientras `site_content.academia_abierta` no sea `1`, solo la ven los roles de `ROLES_VISTA_PREVIA`
(administración y profesores con cuenta aprobada).

**Pruebas:**
- Locales: el corrector, la elección de preguntas y el catálogo
  (`npx tsx --test server/academia-correccion.test.ts server/academia-eleccion.test.ts shared/academia.test.ts shared/academia-inscripcion.test.ts shared/academia-permisos.test.ts server/academia-csv.test.ts`).
- De la API: `academia_api.py` en el scratchpad de la sesión de la academia. Usa el servidor «mi-web-academia» en el
  puerto 5082 y PGlite en memoria en el 55442.
- En el navegador usar 127.0.0.4; las otras sesiones usan localhost y de 127.0.0.1 a 127.0.0.3.

## 7. Las fases

| Fase | Qué sale | Estado |
|---|---|---|
| A1 · La base | Motor del examen en dos partes y corrector, formato de lecciones con medios, portada, materia con sílabo, lector, repaso, versículo, examen con revisión y la primera materia completa («La salvación») | Hecho (vista previa) |
| A2 · Nivel 1 completo | 8 materias, audio, examen integral, certificados y diploma con QR, matrícula, reglamento, carné, expediente, estatus en el perfil, pestaña en Clases y acceso de las cuentas pendientes | Sigue: las 8 materias del Nivel 1 hechas (32 lecciones, 96 de repaso, 240 del final y 24 escritas), el examen integral, el pacto del creyente, los certificados con QR verificable, la inscripción con su ficha y la de cada materia, el reglamento, el estatus, el carné con su foto, la Academia primero en Clases, el panel de seguimiento con sus avisos, reportes y permisos, el expediente y la insignia en el perfil; faltan la constancia, las cuentas pendientes y el audio |
| A3 · Dirección académica | Revisión de escritas y apelaciones, cambio de notas con motivo, análisis de preguntas, revisión del contenido, asignaciones a los cursos de la Escuela y mentores | |
| A4 · Nivel 2 | Mini pruebas, escritos breves, repaso espaciado, prueba diagnóstica, suficiencia y declaración de fe | |
| A5 · Nivel 3 | Práctica ministerial, grupos en vivo, enseñanza grabada y portafolio | |
| A6 · Niveles 4 y 5 y primeras especialidades | Proyecto final y defensa | |
| A7 · Más especialidades y extras | Avisos (con permiso), lectura sin conexión, ceremonia y segunda opinión con IA (con permiso, por su costo) | |
