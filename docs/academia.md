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
| Mini pruebas, escritos breves, examen integral, práctica y proyecto | Desde las fases siguientes | Sistema, líder o 2 profesores |

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
- `server/academia-examen.ts`: el examen.
- `server/academia-correccion.ts`: el corrector, con su prueba en `server/academia-correccion.test.ts`.
- `server/academia/`: los tipos, el contenido, los bancos y el registro. **Solo servidor.**
- `client/src/pages/academia*.tsx` y `client/src/components/academia/`.

**Tablas** (aditivas; se borran con la cuenta en `server/account-deletion.ts`):

| Tabla | Qué guarda |
|---|---|
| `academia_alumnos` | Matrícula, promoción, estatus, nivel, mentor, reglamento y racha |
| `academia_lecciones` | Vista, completada, repaso (`{pregunta: {primera, ok}}`) y nota privada |
| `academia_pruebas` | Una fila por examen (`<materia>:final`): intentos, fallos, mejor, última, vistas, el intento en curso en jsonb, `curso_at`, `fallo_at`, `aprobada_at` y el resultado con su revisión |
| `academia_respuestas` | Lo escrito, con la nota automática, el detalle, la marca para revisar y la revisión humana (nota final, revisor, motivo) |
| `academia_materias` | Estado, nota, componentes y vía (cursada, suficiencia o convalidada) |
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
| `GET dev/correcta/:materiaId` y `POST dev/adelantar` | **Solo en desarrollo**, para las pruebas; no existen en la web publicada |

**Vista previa:** mientras `site_content.academia_abierta` no sea `1`, solo la ven los roles de `ROLES_VISTA_PREVIA`
(administración y profesores con cuenta aprobada).

**Pruebas:**
- Locales: el corrector y el catálogo (`npx tsx --test …`).
- De la API: `academia_api.py` en el scratchpad de la sesión de la academia. Usa el servidor «mi-web-academia» en el
  puerto 5082 y PGlite en memoria en el 55442.
- En el navegador usar 127.0.0.4; las otras sesiones usan localhost y de 127.0.0.1 a 127.0.0.3.

## 7. Las fases

| Fase | Qué sale | Estado |
|---|---|---|
| A1 · La base | Motor del examen en dos partes y corrector, formato de lecciones con medios, portada, materia con sílabo, lector, repaso, versículo, examen con revisión y la primera materia completa («La salvación») | Hecho (vista previa) |
| A2 · Nivel 1 completo | 8 materias, audio, examen integral, certificados y diploma con QR, matrícula, reglamento, carné, expediente, estatus en el perfil, pestaña en Clases y acceso de las cuentas pendientes | Sigue |
| A3 · Dirección académica | Revisión de escritas y apelaciones, cambio de notas con motivo, análisis de preguntas, revisión del contenido, asignaciones a los cursos de la Escuela y mentores | |
| A4 · Nivel 2 | Mini pruebas, escritos breves, repaso espaciado, prueba diagnóstica, suficiencia y declaración de fe | |
| A5 · Nivel 3 | Práctica ministerial, grupos en vivo, enseñanza grabada y portafolio | |
| A6 · Niveles 4 y 5 y primeras especialidades | Proyecto final y defensa | |
| A7 · Más especialidades y extras | Avisos (con permiso), lectura sin conexión, ceremonia y segunda opinión con IA (con permiso, por su costo) | |
