# Academia Avivando el Fuego — el guion

> «Procura con diligencia presentarte a Dios aprobado» (2 Timoteo 2:15)

La Academia es el instituto de formación de la web, dentro de **Clases**: niveles, materias, lecciones cortas, exámenes
con corrección automática, notas, estatus de cada alumno y certificados y diplomas que salen solos. Va desde el nuevo
creyente (orar, creer en Jesús, lo básico) hasta formar obreros, maestros y pastores.

- **Es académica, no un juego.** La estructura, la evaluación y los registros vienen de los institutos bíblicos y de las
  plataformas académicas. Del juego solo se toma la seguridad técnica de los exámenes: las preguntas viven en el
  servidor, llegan de a una, con reloj y con las opciones en otro orden.
- **Todo se corrige solo.** No siempre habrá un profesor disponible. Solo la Administración de la academia puede
  revisar y cambiar una nota, siempre con un motivo.
- **Dos áreas separadas** (lo pidió Luis):
  - **La academia** (`/academia`), donde se estudia: cada alumno ve solo lo suyo. El administrador también puede
    estudiar como alumno, y su avance de alumno va aparte.
  - **La administración de la academia**, desde el panel de administración de la web (`/admin/academia`): la maneja
    **solo el administrador**. Los maestros, los líderes y los pastores de las iglesias aliadas entran desde su propio
    panel (`/maestro/academia`, `/mi-iglesia/academia`) y **solo ven** la información de sus alumnos: no cambian notas,
    contenido, documentos, mentores ni la apertura.
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

Cada lección trata una sola idea y dura de 7 a 15 minutos según el nivel: cada una calcula sus minutos reales con su contenido (`server/academia-carga.ts`; ver la revisión del 16-nov en [academia-auditoria.md](academia-auditoria.md)). Tiene estas partes:

1. **Objetivos.**
2. **Para empezar.**
3. **La lectura:** texto, versículos, video, audio o imagen. Los versículos se escriben solo con su referencia, y el
   servidor los toma de la RV1960 de la web (`getBibleChapter`) al pedir la lección; al tocarlos se abre el capítulo en
   la Biblioteca. Y los **esquemas visuales**, que resumen la lección: la línea de tiempo (`linea`, de 4 a 10 eventos con
   su fecha y su cita opcional), el cuadro comparativo (`cuadro`, de 2 a 4 columnas y de 3 a 8 filas; en el teléfono,
   una tarjeta por fila) y los pasos (`pasos`, de 3 a 7, para métodos y procesos). Sus límites y la regla de no poner
   texto bíblico entre « » están en `server/academia/validar-bloques.ts`, que usan las pruebas y `verificar.ts`.
4. **La idea clave.**
5. **Para la vida:** una aplicación y una nota privada.
6. **Repaso:** preguntas con la respuesta al instante. Sin el repaso respondido bien no se puede terminar la lección.

**El «Repaso del día»** (`server/academia-repaso-dia.ts`, `shared/repaso-del-dia.ts`, página `/academia/repaso-del-dia`):
las preguntas del repaso de cada lección terminada vuelven a los 1, 3, 7, 21 y 60 días (de a lo más 10 por día,
intercaladas entre materias); acertada pasa a la caja siguiente, fallada vuelve mañana; después de la última queda
dominada. No pone nota y nunca usa preguntas del examen final. Lo atrasado se reparte de a 10 por día. Aparece en «Lo
de hoy» de la portada y en «Para hoy» del salón.

**Los recursos de estudio** (`server/academia-recursos.ts`, `shared/academia-recursos.ts`, página `/academia/recursos`):
los videos y audios de todas las lecciones, los recursos de cada sílabo y las lecturas ampliadas en una sola lista, con
un buscador que no distingue tildes y filtros por tipo y por nivel que quedan en la dirección (`?q=`, `?tipo=` y
`?ver=`). Cada recurso dice de qué materia y de qué lección es. Se ve como el catálogo (con la academia abierta, también
sin cuenta). Tiene enlace en el catálogo, en las herramientas del salón, en la portada y en el apartado «Recursos» de
cada materia.

**La lectura ampliada** (Niveles 4 y 5, `Silabo.ampliada`): un libro de la Biblia o una sección larga, con su enlace a
la Biblioteca (`enlaceBiblia`: el libro como lo guarda la Biblioteca, sin tildes), o un capítulo de un libro de su
bibliografía; con los minutos que pide (de 30 a 90) y 3 preguntas guía para un reporte de 150 a 300 palabras. La página
de la materia la muestra con el botón «Escribir mi reporte en el cuaderno», que abre una nota ligada a la materia con
las preguntas (`client/src/components/academia/lectura-ampliada.tsx`). No pone nota: es la profundidad de nivel
universitario de la materia.

**Las herramientas de lectura** (`client/src/components/academia/lectura.tsx`, debajo del título de cada lección):
- **Escuchar la lección:** si la lección tiene su narración grabada, suena la voz de la academia (ver «La voz de las
  lecciones», abajo). Si no, la lee en voz alta con la voz en español del aparato (la API de voz del navegador: sin costo
  ni servidor), bloque por bloque (los mismos `data-bloque` del cuaderno: «Para empezar», la lectura y la idea clave),
  resaltando el que lee. Pausar sigue desde el mismo párrafo; hay detener y cuatro velocidades (0,85× a 1,3×). Cada
  párrafo se lee en trozos de pocas oraciones (`trozosDeLectura`, `shared/lectura-voz.ts`, con su prueba) porque los
  navegadores cortan las frases muy largas. Si el aparato no tiene voz, el botón no aparece.
- **El tamaño de la letra** (A− y A+: 100 %, 110 %, 120 % y 135 %) agranda la lectura con `zoom`, que no desborda en el
  teléfono. La velocidad y el tamaño se recuerdan en el aparato (`localStorage`).

**La voz de las lecciones** (la narración grabada; pedido de Luis del 16-nov-2026: una voz que inspire confianza, en
español fluido, «tipo documental»):
- **La voz:** «documental», un hombre de voz grave y pausada, elegida por Luis el 17-nov-2026 entre tres muestras
  (documental, maestro cálido y narradora). Es una voz hecha con IA, no la de una persona: Qwen3-TTS VoiceDesign creó la
  referencia (`scripts/academia/voz/voz-academia.wav`, con su texto y su descripción en `voz-academia.json`) y OmniVoice
  la clona en cada lección, así toda la academia suena con la misma voz. Se graba gratis en la PC de Luis (Wan2GP en WSL).
- **Qué dice:** `guionDeLeccion` (`shared/narracion.ts`, con su prueba): la entrada narrada (la materia, «Lección uno» y
  el título, y los objetivos en una frase), «Para empezar», cada bloque (los versículos con «Mateo, capítulo dieciséis,
  versículos quince al diecisiete» y su texto de la RV1960; los esquemas: línea de tiempo, cuadro y pasos; los videos
  como «En la página tienes el video…»), «La idea clave» y «Para la vida», y termina invitando al repaso. `hablado`
  convierte lo escrito en lo que se dice: las citas («Juan 1:41» → «Juan uno, cuarenta y uno»; «1 Juan» → «Primera de
  Juan»), los libros con número sin capítulo («1 y 2 Samuel» → «Primero y Segundo de Samuel»; `librosConNumero`), los
  números, los años («en 1521 se negó» → «veintiuno»), los siglos, las abreviaturas, las siglas (`SIGLAS`: quedan en
  mayúsculas), las horas de un horario («7:00» → «siete en punto»), los miles con coma («120,000») y los teléfonos de
  ayuda.
- **La huella:** `huellaDeLeccion` (con las citas, no con el texto de la Biblia). La grabación guarda la huella con que se
  hizo; si la lección cambia (texto, orden, título, un esquema nuevo), la grabación deja de valer y la página vuelve a la
  voz del aparato hasta grabarla otra vez (`server/academia-narracion.ts`; `LeccionVista.narracion` llega en null).
- **El reproductor** (`client/src/components/academia/escuchar.tsx`): barra fija arriba de la lectura mientras suena
  (abajo están el cuaderno, la mini radio y las pestañas del teléfono), resaltado del lugar que se oye (las marcas de
  `data-bloque` y de `data-narra`: «titulo», «objetivos», «vida»), 10 s atrás y adelante, avance, velocidad, controles en
  la pantalla de bloqueo y los audífonos (Media Session), «Seguir escuchando (2:31)» donde se quedó (en el aparato) e
  «Ir al repaso» al terminar. Si el audio no carga, avisa y vuelve la voz del aparato.
- **Dónde está el audio:** `client/public/voz/academia/<lección>-<huella del audio>.m4a` (AAC 40 kbps, mono, 24 kHz, −16 LUFS;
  unos 300 KB por minuto), servido en `/voz` con caché de un año (el nombre cambia si se graba otra vez) y sin pasar por el
  service worker (se pide por partes, como la música del juego). El registro es `server/academia/narraciones.ts`.
  Grabados:
  - el Nivel 1, el 17-nov-2026: 32 lecciones, unos 175 minutos, ≈52 MB, en el repositorio;
  - el Nivel 2, el 19-nov-2026: 54 lecciones, unos 275 minutos, ≈82 MB, en el repositorio;
  - el Nivel 3, el 20-nov-2026: 60 lecciones, unos 400 minutos, en Cloudflare R2;
  - el Nivel 4, el 20-nov-2026: 60 lecciones, unos 360 minutos, en Cloudflare R2;
  - el Nivel 5, el 20-nov-2026: 48 lecciones, unos 260 minutos, en Cloudflare R2.

  El mismo día se grabaron otra vez 14 lecciones de los Niveles 1 a 3 que leían mal «c.» («hacia el año»), un año
  («setecientos un antes de Cristo») o un libro con número sin capítulo («un Corintios» por «Primera de Corintios»).
  Cuando cambia lo que dice la voz, `narrar.py` graba otra vez solo las lecciones cuyo guion cambió (guarda la huella
  del guion en `<lección>.marcas.json`). Para ver antes qué lecciones cambian, generar los guiones en otra carpeta y
  compararlos con los grabados.

  Toda la academia son unas 62 horas (≈1,1 GB). **Desde el Nivel 3 el audio va en Cloudflare R2.** El depósito es
  `avivando-academia-voz`, en la cuenta de Luis, con su dirección pública
  `https://pub-e35c5f440e364310af9d4d053a59dcc8.r2.dev`. El plan gratis llega a 10 GB y no cobra la descarga.
  - Cada entrada del registro guarda la dirección del audio en `url`. No hace falta ninguna variable en Render.
  - `registrar --r2 avivando-academia-voz --base <esa dirección>` sube los audios con Wrangler. Usa la autorización
    de `npx wrangler login`, sin claves. Si una lección se graba de nuevo, el audio viejo se queda en R2 (la web
    publicada lo sigue pidiendo) y se anota en `<carpeta>/r2-por-borrar.txt`.
  - Cuando el registro nuevo ya está publicado (`/api/version`), `limpiar-r2 <carpeta> --r2 avivando-academia-voz` borra
    esos audios viejos. Solo borra los que el registro ya no usa.
- **Cómo grabar** (en la PC de Luis, unos 2 minutos de trabajo por cada 5 de audio):
  1. `npx tsx scripts/academia/narracion.ts estimar` (cuánto audio tiene cada nivel).
  2. `npx tsx scripts/academia/narracion.ts guion <carpeta> 2` (un nivel, una materia o una lección; los versículos se
     traen de la RV1960 de la web publicada).
  3. En WSL: `bash scripts/academia/voz/narrar.sh <carpeta>` (en segundo plano; se puede cortar y seguir). Cada trozo se
     escucha con whisper y se graba otra vez si no dice lo que debía (`<lección>.qa.json`). OmniVoice calcula cuánto
     dura cada trozo por las letras del texto: en una lista larga de palabras sueltas (los alfabetos griego y hebreo)
     corre y se come letras, así que `segundos_de_lista` le da el tiempo de una recitación (1,6 palabras por segundo).
  4. `npx tsx scripts/academia/narracion.ts registrar <carpeta>` copia los audios y escribe el registro.
  5. Si se graba otro nivel, actualizar el paso «Lecciones cortas» de la portada (`PASOS` en
     `client/src/pages/academia.tsx`), que dice qué lecciones se escuchan.

**Primero se lee (que no se responda sin leer):** el repaso se abre recién cuando pasó el tiempo de lectura de la lección
(`segundosDeLectura`: el 40 % de sus minutos, entre 1 y 3 minutos) y, si la lección tiene un video de YouTube, cuando se
vieron de corrido sus primeros 2 minutos (o el video entero, si dura menos: `videoQuePide`).
- El servidor guarda cuándo se abrió la lección (`academia_lecciones.abierta_at`) y cuánto video se vio (`video_seg`).
  El reproductor (`client/src/components/academia/video-youtube.tsx`, con la API de YouTube) avisa cada 5 segundos lo
  visto de corrido desde el principio; adelantar no suma, y el servidor nunca cuenta más video que el tiempo que pasó.
- Mientras falte, la lección muestra cuánto queda con una cuenta regresiva, y `POST repaso` responde 409 con lo que falta
  (`BloqueoRepaso`, calculado en `bloqueoDe`, con su prueba). La primera lección pública también lo pide; la vista de la
  Administración, no.
- **Nadie queda trabado:** si el video no se puede ver (no carga, lo bloquean o lo quitaron), el repaso se abre igual
  cuando pasó el tiempo de la lectura, el del video y un margen de 2 minutos (`sinVideo`). El reproductor avisa que no
  cargó y deja el enlace para verlo en YouTube.

**Las opciones del repaso** salen equilibradas: en cada bloque de 4 preguntas la respuesta correcta cae una vez en cada
lugar (`lugaresDeLaBuena`, en `server/academia-orden.ts`, con su prueba), así nunca es «casi siempre la tercera». Los
exámenes usan el mismo reparto.

Además, cada materia tiene su **versículo de memoria**: primero se estudia y después se arma con fichas, sin mirarlo.
Las fichas se comparan por su texto (`revisarOrdenFichas`): si un versículo trae dos fichas iguales, como «en espíritu
y» en Juan 4:23-24, cualquiera de las dos vale en cualquiera de sus lugares, porque el alumno no las puede distinguir.

**El cuaderno** (lo pidió Luis el 15 de noviembre: «un cuaderno de apuntes… que esté bien desarrollado… y que tenga
la sincronización de la biblioteca»). Es el mismo cuaderno en la academia (`/academia/cuaderno`) y en la Biblioteca
(pestaña «Cuaderno»), y se guarda en la cuenta: se ve igual en todos los equipos.
- **Las notas** están hechas de bloques, como un cuaderno digital moderno, pensado para el teléfono (`shared/cuaderno.ts`,
  `client/src/components/cuaderno/`). Los tipos de bloque son texto, título, subtítulo, lista, lista numerada, tarea,
  cita, versículo, resaltado, idea importante y separador.
  - El texto lleva marcas ligeras: `**negrita**`, `_cursiva_` y `==resaltado==`.
  - Una cita escrita a mano («Juan 3:16», «1 Corintios 13:4-7», también en minúscula) se vuelve un enlace: al tocarla se
    ve el versículo de la RV1960 sin salir de la nota.
  - El bloque de versículo trae el texto del pasaje.
- **El editor:**
  - Se toca un bloque para escribir. Enter crea el siguiente, y las listas siguen siendo listas. Borrar en un bloque
    vacío lo quita, y «/» abre el menú de bloques. Tab da sangría a las listas.
  - La barra tiene el tipo de bloque, negrita, cursiva, resaltar, insertar un versículo, **dictar con la voz** (el
    reconocimiento de voz del navegador, en español), las plantillas, deshacer, subir, bajar y eliminar.
  - **Plantillas de estudio:** notas de clase (método Cornell), estudio inductivo, devocional, notas de una prédica y
    lista de oración.
- **Se guarda solo,** un momento después del último cambio (`useNotaEditable`).
  - Sin conexión, lo escrito queda en el teléfono y se manda al volver la conexión.
  - Cada guardado lleva la versión de la nota. Si otro equipo guardó antes, el servidor responde 409 con lo guardado y la
    página no pisa nada: guarda lo de este equipo como una copia.
- **La organización:** búsqueda sin tildes («oracion» encuentra «oración»), fijadas arriba, etiquetas, un filtro por
  materia (las notas de una lección quedan unidas a su materia) y una papelera que se vacía sola a los 30 días.
- **En la lección:**
  - Al seleccionar un texto con el dedo o el mouse aparece una barra para **resaltarlo** en cinco colores, **pasarlo al
    cuaderno** (como cita, con el enlace a la lección) o copiarlo.
  - Lo resaltado queda pintado en la lección y, como lo pasado al cuaderno, **se guarda también al final de la nota de
    la lección**, con su color y el enlace a la lección: todo lo que se toma de una lección está en un solo lugar. El
    aviso trae «Ver mi nota», que abre la nota justo en lo nuevo.
  - El botón «Cuaderno» abre la nota de esa lección (se escribe mientras se lee, en blanco o con las notas de clase) y
    sus resaltados, con «Volver a la lección» arriba y «Listo» al final.
  - En Mi cuaderno, cada nota abierta tiene «Listo» (la cierra; se guarda sola) y, si es de una lección, «Volver a la
    lección».
  - **No se abre dentro de los exámenes,** por el código de honor: se usa para estudiar y repasar antes.
- **En la Biblioteca:**
  - El cuaderno muestra también lo que se resaltó y anotó en la Biblia, versículo por versículo.
  - Cada capítulo muestra «Tus apuntes del cuaderno sobre este capítulo» y una marca en los versículos citados en las
    notas (las citas de cada nota se guardan como `Juan|3|16|16`).
  - En un versículo, «Al cuaderno» empieza una nota de estudio con ese versículo.
- **Es privado:** solo su dueño lo ve; ni los profesores ni la Administración leen el cuaderno de nadie.
  - Lo puede usar también una cuenta por aprobar, porque estudia en la academia.
  - Las tablas son `cuaderno_notas` y `cuaderno_resaltados`, y se borran con la cuenta.
  - Rutas: `GET /api/cuaderno` (la lista), `POST/GET/PUT/PATCH/DELETE /api/cuaderno/notas/:id`,
    `POST /api/cuaderno/notas/:id/restaurar`, `GET /api/cuaderno/leccion/:leccionId` y
    `POST /api/cuaderno/leccion/:leccionId/agregar`, `GET/POST/PATCH/DELETE /api/cuaderno/resaltados` y
    `GET /api/cuaderno/biblia/:libro/:capitulo`.
- Las citas bíblicas viven en `shared/citas.ts`, que es liviano: el cuaderno y la Biblioteca no cargan el catálogo de la
  academia.

**El salón** (`/academia/salon`, lo pidió Luis el 15 de noviembre: «su salón… su espacio con diferentes recursos»). Es
el espacio del alumno inscrito y perfecciona «Mi escritorio» de la portada, que ahora lleva a él.
- **Arriba:** su foto del carné, el saludo, la matrícula, el estatus, la racha, las lecciones hechas y los minutos de
  estudio de la semana.
- **Lo que sigue** (como en la portada) y **para hoy:** los versículos para repasar y lo que cada materia en curso tiene
  listo (una mini prueba, el escrito breve, el examen final o el versículo), más la prueba diagnóstica si no la hizo.
- **La sesión de estudio** (`components/academia/salon/temporizador.tsx`): un temporizador de enfoque de 15, 25 o 45
  minutos con su descanso de 5.
  - Sigue contando aunque se cambie de página o se cierre el teléfono, porque guarda cuándo termina.
  - Al terminar suena una campanita suave, vibra el teléfono y se suman los minutos. «Terminé» suma lo estudiado.
  - Debajo va la semana (`semana.tsx`): barras de un solo tono por día, con su valor al pasar o tocar, el avance hacia
    la **meta de la semana** (la elige el alumno, de 1 a 10 horas) y los días seguidos estudiando.
- **Mi cuaderno:** las últimas notas, «Notas de clase» (una nota nueva con la plantilla Cornell) y los resaltados.
- **Las asignaciones** de los cursos de la Escuela, si tiene.
- **Mis materias en curso:** el avance, la lección que sigue y los recursos del sílabo (videos y lecturas).
- **Mis herramientas** (el cuaderno, la Biblia, los versículos, la diagnóstica, el carné, el expediente, las clases en
  vivo y el reglamento) y **mis certificados**.
- Casi todo sale de lo que la academia ya sabe. Lo nuevo es el **tiempo de estudio** (`server/academia-salon.ts`,
  `shared/academia-salon.ts`):
  - Tablas `academia_estudio` (los minutos de cada día de Texas) y `academia_estudio_meta`, que se borran con la cuenta.
  - `GET /api/academia/estudio` da hoy, los 7 días, el total, la meta y la racha.
  - `POST /api/academia/estudio {minutos}` suma de 1 a 60 por vez, un aviso cada 20 segundos como mucho y hasta 12 horas
    por día.
  - `POST /api/academia/estudio/meta {meta}` cambia la meta.
  - Los días se cuentan sobre la fecha de Texas, así que los cambios de horario no los descuadran
    (`server/academia-salon.test.ts`).

### Las actividades del nivel

Desde el Nivel 2, cada nivel pide, además de sus materias, actividades en la vida de la iglesia
(`shared/academia-actividades.ts`, `server/academia-actividades.ts`; lo que pide cada nivel está en
`ACTIVIDADES_NIVEL`, y el reglamento lo explica en su sección 11, con los mismos números):

- **Nivel 2:** 3 conversaciones de evangelismo y servir 1 mes (28 días) en un ministerio.
- **Nivel 3:** 20 horas de práctica ministerial, una enseñanza grabada aprobada y consolidar a 1 nuevo creyente.
- **Nivel 4:** 30 horas de práctica ministerial y un sermón evaluado con la rúbrica de Homilética II.
- **Nivel 5:** el proyecto final con su defensa en vivo y acompañar a 2 personas hasta que terminen el Nivel 1.

- **El alumno las registra** en la página del nivel (`/academia/nivel/2` a `/academia/nivel/5`, la tarjeta «Mi nivel»
  de la portada), después de completar el nivel anterior:
  - la conversación: con quién (la relación o sus iniciales, nunca el nombre completo), cuándo, cómo terminó y de qué
    hablaron;
  - el servicio: el ministerio, su líder, desde cuándo y, si terminó, hasta cuándo, y qué hace;
  - la práctica: el ministerio o el lugar, quién la supervisó (el líder o el pastor), la fecha o el período, las horas
    (de media en media hora: hasta 12 en un día y 40 en un período) y qué hizo. Caben 60 registros por nivel;
  - la enseñanza grabada (de 10 a 15 minutos, preparada con Homilética I): el pasaje y el tema, el enlace `https` de la
    grabación (un video no listado o un archivo compartido, sin hacerla pública), cuándo la grabó, dónde la dio si fue
    ante un grupo, y su idea central y su propósito. Una a la vez: si la devuelven, la envía otra vez;
  - la consolidación: a quién acompañó (la relación o sus iniciales), quién la coordinó en su iglesia, desde cuándo y,
    si terminó, hasta cuándo, los pasos del plan de Evangelismo y consolidación que acompañó (al menos 4 de los 7:
    `PASOS_CONSOLIDACION`) y cómo fue;
  - el sermón (de 20 a 30 minutos, preparado con Homilética II): el pasaje y el tema, la fecha, su idea central y su
    propósito, y cómo lo presenta: **grabado**, con el enlace `https` del sermón completo, o **en vivo**, con dónde lo
    predicó y qué maestro de la academia lo escuchó (el enlace, si lo grabó, es opcional). Uno a la vez, como la
    enseñanza;
  - el proyecto final: un plan de ministerio con las 8 partes de Seminario de liderazgo ministerial (`PARTES_PLAN`), con
    su nombre, el enlace `https` del plan escrito, con quién lo revisó (su pastor o su mentor), cuándo lo terminó, el
    ministerio y su meta principal, y la casilla de que tiene sus 8 partes. Uno a la vez.
  - Puede borrar lo que todavía no se confirmó. Lo confirmado ya no cambia.
- **La Administración las confirma** en «Para revisar» (`components/academia/actividades-panel.tsx`), con el líder que
  el alumno nombra, o las devuelve con un motivo. Le llega un aviso en la campana por cada una, y al alumno otro con la
  decisión. Nadie confirma lo suyo. La práctica se puede confirmar con menos horas de las registradas (las que confirma
  el líder: quedan en el historial y en el aviso); la enseñanza se **aprueba** con las pautas de `PAUTAS_ENSENANZA`, que
  el panel muestra junto al enlace. **El sermón no se confirma: se evalúa** con la rúbrica de Homilética II
  (`RUBRICA_SERMON`: fidelidad al texto 25; idea central y propósito, estructura, Cristo y la gracia, aplicación e
  ilustraciones, y entrega, 15 cada uno), anotando qué maestro lo evaluó: con 70 o más (`APRUEBA_SERMON`) queda
  aprobado; si no, vuelve al alumno con su nota y lo que debe mejorar (el comentario es obligatorio), y lo prepara otra
  vez. También se puede devolver sin evaluar (por ejemplo, si el enlace no abre). La nota y los puntos de cada criterio
  se guardan con el sermón y los ve el alumno.
- **El proyecto final se defiende y se evalúa:** la Administración programa la defensa (`accion: "programar"`: la
  fecha, desde un mes atrás hasta seis meses adelante, la hora de Texas, el lugar o el enlace de la reunión y los 2
  profesores) y la puede cambiar mientras espera; el alumno recibe el aviso y la ve en la página del nivel. Después de
  la defensa (no antes), pone las evaluaciones de los 2 profesores con `RUBRICA_PROYECTO` (llamado, visión y base
  bíblica 15; diagnóstico 10; metas 15; equipo, recursos y calendario 15; evaluación y cuidado personal 15; la defensa
  en vivo 30). La nota es el promedio y se aprueba con 70 (`APRUEBA_PROYECTO`); si no, vuelve con su nota y lo que debe
  mejorar, y el alumno lo entrega otra vez para una nueva defensa. La defensa y las evaluaciones se guardan con el
  proyecto (`defensa`).
- **Acompañar a 2 personas no se registra: lo cuenta la academia.** La Administración elige al alumno como mentor de
  personas que empiezan el Nivel 1 (en la ficha de cada una); cuenta cada una que termina el Nivel 1 mientras la
  acompaña (`academia_alumnos.mentor_desde`, que se guarda al elegir el mentor; si se eligió antes de que existiera esa
  fecha, cuenta igual). Desde la página del nivel, el alumno puede pedirle a la Administración a quién acompañar (un
  aviso en la campana, como mucho cada 12 horas). Cuando alguien termina el Nivel 1, su mentor recibe un aviso y, si con
  eso cumple todo su Nivel 5, se le cierra.
- **Qué cuenta:** las conversaciones confirmadas; el servicio confirmado con sus 28 días cumplidos (hasta la fecha en
  que terminó o, si sigue, hasta hoy); las horas de práctica confirmadas; la enseñanza aprobada, la consolidación
  confirmada, el sermón y el proyecto aprobados con su rúbrica, y las personas acompañadas que terminaron el Nivel 1. Al confirmar, y al mirar la página del nivel (el servicio cumple sus días con el tiempo), si el alumno ya
  cumple todo, el nivel se cierra y sale su certificado. Los requisitos del nivel salen de `requisitosDeActividades`, con
  los textos de `NIVELES` (una prueba lo cuida).
- Tabla `academia_actividades` (fechas como texto AAAA-MM-DD, día de Texas; `horas`, `titulo`, `enlace` y `pasos` se
  agregaron para el Nivel 3, `nota` y `evaluacion` para el sermón del Nivel 4, y `defensa` para el proyecto del Nivel 5),
  que se borra con la cuenta. Las rutas: `GET` y `POST /api/academia/actividades/:nivel`,
  `POST /api/academia/actividades/item/:id/borrar`, `POST /api/academia/actividades/:nivel/acompanar` (pedir a quién
  acompañar), `GET /api/academia/direccion/actividades` y `POST /api/academia/direccion/actividad/:id {accion, motivo, horas?}`,
  con `accion: "evaluar"`, `rubrica` y `evaluador` para el sermón; `accion: "programar"` (con `fecha`, `hora`, `lugar`,
  `enlace` y `profesores`) y después `accion: "evaluar"` con `evaluaciones` para el proyecto.
- `REQUISITOS_POR_HACER` ya no tiene nada: todos los requisitos de los cinco niveles se registran. Si algún día se
  agrega uno que todavía no se pueda registrar, va ahí y el nivel lo muestra pendiente hasta entonces.

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
| Examen de suficiencia | Para aprobar una materia sin cursarla: 25 preguntas de todas sus lecciones y 2 escritas, una sola vez, antes del examen final; pide 85 y 75 a la vez | El sistema (revisable) |
| Prueba diagnóstica | 2 preguntas de cada materia con contenido de los Niveles 1 y 2, de 45 a 90 segundos cada una según su largo, cada 30 días: solo sugiere por dónde empezar | El sistema |
| Repaso del versículo | Vuelve a los 1, 3, 7 y 21 días de aprenderlo; al pasar el último queda dominado | El sistema |
| Mini prueba (Nivel 2 en adelante) | Cada 3 lecciones: 6 preguntas de un banco de 18, de 60 a 120 s cada una según su largo, sin escritas; 3 intentos con preguntas nuevas y cuenta el mejor; revisión completa al terminar | El sistema |
| Escrito breve (Nivel 2 en adelante) | De 80 a 300 palabras, con ideas y citas, después de las lecciones; 2 entregas y cuenta la mejor | El sistema (revisable) |
| Trabajo final de una especialidad | De 300 a 1.200 palabras que unen sus cinco materias, con las cinco aprobadas; 3 entregas y cuenta la mejor; se aprueba con 70 | El sistema (revisable) |
| Práctica ministerial, enseñanza grabada y consolidación (Nivel 3) | Las registra el alumno en la página del nivel: 20 horas con quien lo supervisó, el enlace de una enseñanza de 10 a 15 minutos y los pasos que acompañó (al menos 4 de 7) | La Administración, con el líder que el alumno nombra |
| Práctica y sermón (Nivel 4) | 30 horas, como en el Nivel 3, y un sermón de 20 a 30 minutos, grabado (con su enlace) o en vivo ante un maestro; la rúbrica de Homilética II suma 100 y se aprueba con 70; si no alcanza, vuelve con su nota y lo que debe mejorar | Un maestro de la academia con la rúbrica; lo anota la Administración |
| Proyecto final con defensa (Nivel 5) | Un plan de ministerio con las 8 partes de Seminario, entregado con su enlace; la Administración programa la defensa en vivo (en persona o en línea) y, después de ella, cada profesor lo evalúa con su rúbrica de 100 (la defensa vale 30); la nota es el promedio y se aprueba con 70 | 2 profesores; lo anota la Administración |
| Acompañar a 2 personas (Nivel 5) | No se registra: cuentan las personas de las que es mentor y que terminan el Nivel 1 mientras las acompaña | La academia, con los mentores que elige la Administración |

**El tiempo de cada pregunta** (`segundosDePregunta`, en `shared/academia.ts`, con su prueba en
`shared/academia-tiempos.test.ts`; revisión del 16-nov): cada pregunta objetiva trae su tiempo según lo que pide leer y
pensar. Sus palabras (la pregunta y las cuatro opciones) a 130 por minuto, más 25 segundos para decidir, más 5 si pide
comprender, 20 si pide aplicar y 30 si pide analizar o evaluar. Nunca menos que el tiempo base de la prueba (60 segundos
en el final, la suficiencia, el integral y las mini pruebas; 45 en la diagnóstica) ni más del doble, en pasos de 5
segundos; con tiempo extra, por 1,5 (`MedidaExamen.factor`). Así una pregunta corta de memoria sigue con el tiempo base
y un caso largo para analizar tiene hasta el doble. El servidor usa el mismo cálculo para el reloj y para saber si una
respuesta llegó tarde, y las páginas lo dicen con `textoSegundos`.

**Las preguntas de casos:** el banco del final de cada materia publicada lleva preguntas con un caso de la vida real (en
la iglesia, la familia, el trabajo o la comunidad) para aplicar, analizar o evaluar lo aprendido: 2 por materia en el
Nivel 1, 4 en el 2 y 6 en los demás (`server/academia/casos.ts`, ids `<materia>-caso-N`, que nunca se reusan). Se
agregan por partes, a medida que cada materia pasa sus dos revisiones: ver la sección 5 de
[academia-auditoria.md](academia-auditoria.md).

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
- **Cuándo salen:** el certificado de cada materia, al aprobarla en el examen; el del nivel, al completarlo; y el de
  la especialidad, al aprobar su trabajo final con las cinco materias aprobadas (ver «El certificado de especialidad»).
  Lo aprobado antes de que existieran recibe su documento la primera vez que se piden (`asegurarDocumentos`).
- **El código:** `AAF-XXXX-XXXX`, en base 32 de Crockford (sin I, L, O ni U), con 40 bits al azar: no se puede adivinar.
  Al verificar se aceptan minúsculas, espacios y la O por el 0 (`normalizarCodigo`).
- **El documento:** el mismo diseño del certificado de la Escuela, con el nombre del día en que se emitió, la nota o el
  promedio, «con honores» en el del nivel, las líneas de la Dirección académica y del Ministerio, el QR que lleva a la
  verificación y la aclaración «No es un título universitario oficial». Lo ven su dueño y la Administración; se
  descarga en PDF. Si la materia se aprobó por suficiencia, lo dice. El PDF se dibuja directo, con texto
  de verdad (`server/academia-pdf.ts`, A4 apaisado, hecho en el servidor y bajado con su nombre de archivo, como el carné): no es una captura de la pantalla, así
  que sale nítido y nunca en blanco.
- **La verificación pública** (sin cuenta, la abre el QR): válido o revocado, el nombre, el documento, el nivel (o la
  especialidad de la materia) y la fecha, **sin notas**. La casilla «Verificar» de Certificados también acepta estos
  códigos.
- **Firmas:** por ahora, la línea de la Dirección académica y el sello del Ministerio; los nombres y las firmas los da
  Luis.

**La inscripción** (`server/academia-inscripcion.ts`, `shared/academia-inscripcion.ts`, página `/academia/inscripcion`;
`/academia/matricula` lleva a la misma página). Como en los sistemas académicos (Moodle, Canvas, Populi): una ficha de
admisión con campos propios y, después, la matriculación en cada curso desde su página de presentación.
- **Sin aprobación:** la inscripción en la academia y en cada materia queda aprobada al instante (lo pidió Luis). La
  Administración la sigue en su panel y recibe un aviso en la campana con cada inscripción (ver «Los avisos»).
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
  les pone ese nombre. Con un certificado emitido, el nombre queda fijo y lo corrige la Administración; lo demás de
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
- **Vista de la Administración:** el administrador (`puedeRevisar`, solo `admin`) lee todas las lecciones y el
  versículo sin inscribirse, para revisarlas. Puede responder el repaso, pero no se guarda nada. Si se inscribe en una
  materia, la cursa como cualquier alumno y su avance se guarda.

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
  verifica en la misma página de los certificados, con el estatus de hoy.
- **El carné se hace en el servidor** (`server/academia-carne.ts`): la imagen del frente y del reverso en PNG
  (1012 × 638, la proporción de una tarjeta de 85,6 × 54 mm, a 300 puntos por pulgada) y el PDF para imprimir. Antes se
  dibujaba en el teléfono y se descargaba con un enlace hecho en la página (blob), que en el iPhone, en la web instalada
  como app y en los navegadores de Facebook, Instagram o WhatsApp abría una vista sin descarga y sin salida.
  - **El diseño:** fondo oscuro con el degradado del fuego, chispas, borde dorado, el logo del Ministerio, la foto o las
    iniciales, el nombre (la letra se achica para que quepa entero, hasta 3 líneas), la matrícula, el estatus y el QR
    sobre blanco, dibujado módulo por módulo; el reverso, con quién acredita, el lema y cómo verificarlo.
  - **Con qué:** @napi-rs/canvas (Skia, sin librerías del sistema; queda fuera del paquete de esbuild en
    `script/build.mjs`) y la letra Liberation Sans que trae pdfjs-dist (no depende de las fuentes de la máquina). La foto
    se lee solo de los archivos de la web (`/files/…`, el S3/R2 de la web o un data URL antiguo), girada según la cámara.
  - **Las direcciones** (`GET /api/academia/carne/frente.png`, `reverso.png` y `carne.pdf`) llevan `?v=<huella>`: la
    huella cambia si cambia algo de lo que se dibuja (nombre, matrícula, estatus, foto, código o el diseño, `DISENO`). Con
    la huella de hoy el navegador guarda el archivo sin volver a pedirlo; el servidor recuerda los últimos 16 carnés.
  - **La página** (`client/src/pages/academia-carne.tsx`) solo muestra las dos imágenes y enlaza los archivos, sin
    dibujar nada: «Descargar PDF para imprimir» (una hoja carta con las dos caras a tamaño real y marcas de corte) e
    «Imagen del frente» e «Imagen del reverso» (`&descargar=1`). No hay botón «Imprimir»: abría el PDF en otra pestaña y,
    en el teléfono o en la web instalada, quedaba una pantalla sin salida y sin opción de imprimir (lo vio Luis); para
    imprimir se descarga el PDF.
    En el teléfono, «Guardar en el teléfono» comparte las dos imágenes (en el iPhone, «Guardar imagen» las pone en
    Fotos) y también se puede mantener el dedo sobre la imagen. En el iPhone con la web instalada las descargas se abren
    aparte (con su botón para volver), y en el navegador de una app se avisa cómo abrir la página en Chrome o Safari.
- **Los demás documentos** tampoco dependen de capturar la pantalla:
  - El expediente se descarga en PDF con sus tablas en texto, y cada certificado, dibujado con su diseño. Los dos se
    hacen en el servidor (`server/academia-pdf.ts`) y se bajan con un enlace de verdad, con su nombre: antes se armaban en
    el navegador y se bajaban con un enlace «blob», que en el iPhone y en la web instalada fallaba como el carné. La
    página usa `client/src/components/academia/descargas.ts` (en el iPhone con la web instalada se abre aparte).
  - Ningún documento tiene botón «Imprimir» (abrir otra ventana deja al teléfono sin salida): se imprime el PDF.
- **El reglamento** es una página pública. Sus números salen de las constantes del sistema (una prueba lo comprueba).

**El panel de seguimiento** (`server/academia-direccion.ts`). Lo pidió Luis: quién está inscrito en cada materia, por
dónde va y los reportes, en el área de reportes y de administración. Está en el área de quien mira (`area.ts`):
`/admin/academia` para la Administración (con una tarjeta grande «Academia» en el panel de administración),
`/maestro/academia` para el equipo y `/mi-iglesia/academia` para las iglesias aliadas; las rutas viejas
`/academia/direccion/…` llevan al área que corresponde (`RedirigirPanelAcademia`). Arriba dice en qué área se está y si
se puede cambiar algo o solo ver. Tiene estas pestañas:
- **Resumen:**
  - los indicadores: inscritos, nuevos de la semana y del mes, activos, materias aprobadas y promedio;
  - la tabla de las materias, con inscritos, en curso, aprobadas, promedio y avance medio;
  - los alumnos por estatus, por país y por iglesia;
  - quiénes se detuvieron (con materias en curso y 14 días o más sin estudiar);
  - la actividad reciente.
- **Alumnos:** la tabla con búsqueda y filtros (estatus, materia en curso, iglesia y país). Cada alumno abre su página
  (`<área>/alumno/:id`) con su ficha y su foto, su avance en cada materia, sus niveles, sus certificados y su
  actividad.
- **Materias:** cada una abre su seguimiento (`<área>/materia/:id`): quiénes están inscritos y por dónde va
  cada uno (lecciones, versículo, examen y nota).
- **Para revisar, Contenido e Historial:** solo para la Administración.
- **Registro:** las inscripciones en la academia y en cada materia, las materias aprobadas y los niveles completos, con
  filtros.
- **Roles y permisos:** la matriz, tal como la comprueba el servidor.

Los reportes en CSV (`GET direccion/exportar/alumnos.csv`, `avance.csv` y `materias.csv`) se abren en Excel con las
tildes bien (UTF-8 con BOM). Ninguna celda se toma como fórmula (`server/academia-csv.ts`, con su prueba). También
están en Reportes → «Academia» (se carga aparte), y Administración tiene el acceso al panel.

**Roles y permisos** (`shared/academia-permisos.ts`, con su prueba). Es una matriz de capacidades, como los roles de
Moodle; el servidor la comprueba en cada ruta y el panel la muestra.

| Capacidad | Administración (admin) | Maestros y líderes, solo ver (director, staff_global, maestro_ministerio, obrero) | Pastores e iglesias aliadas, solo ver (admin_iglesia, maestro_iglesia) | Alumno |
|---|---|---|---|---|
| Entrar al seguimiento | Todos | Todos | Los de su iglesia | — |
| Ver quién está inscrito y por dónde va | Todos | Todos | Los de su iglesia | Lo suyo |
| Ver las notas y los exámenes | Todos | Todos | Los de su iglesia | Lo suyo |
| Ver la ficha con el contacto | Todos | — | Los de su iglesia | Lo suyo |
| Descargar los reportes | Todos | — | Los de su iglesia | — |
| Recibir los avisos de inscripción | Todos | — | Los de su iglesia | — |
| Revisar escritas, cambiar notas y responder pedidos de revisión | Todos | — | — | — |
| Revocar o restaurar documentos y corregir el nombre | Todos | — | — | — |
| Revisar el contenido, aprobar materias y la declaración de fe, retirar preguntas | Todos | — | — | — |
| Elegir mentores | Todos | — | — | — |
| Abrir o cerrar la academia | Todos | — | — | — |

Solo el administrador maneja la academia: ni el Director del Ministerio, ni los maestros, ni los pastores cambian nada
(lo pidió Luis). Una prueba lo vigila (`shared/academia-permisos.test.ts`). En la Escuela, cada maestro sigue manejando su
propio curso (y puede asignarle materias de la academia, ver «Las asignaciones»).

- «Los de su iglesia»: los alumnos cuya ficha eligió la iglesia aliada de la cuenta (`users.church_id`). Sin iglesia
  asignada no ve a nadie.
- **El expediente** (`/academia/expediente`, `GET /api/academia/expediente`): el alumno ve sus materias con su avance, su
  nota y su certificado, sus niveles y sus certificados, y lo descarga en PDF. El perfil muestra su estatus, sin notas, con los
  enlaces al carné y al expediente.

**Los avisos** (`avisarInscripcion`, en `server/academia-inscripcion.ts`):
- Cada inscripción nueva (en la academia o en una materia) deja un aviso en la campana:
  - a la Administración (admin);
  - a quienes dirigen la iglesia aliada del alumno (admin_iglesia y maestro_iglesia de esa iglesia).
- El aviso abre al alumno en el panel. Nadie recibe el aviso de su propia inscripción, e inscribirse dos veces no avisa
  dos veces.
- No manda correos ni avisos al teléfono.

**La revisión** (`server/academia-revision.ts`, fase A3). En el panel, la pestaña «Para revisar» (con su número) tiene:
- **Los pedidos de revisión:** el alumno pide desde el resultado de su examen que se revise su último intento. Se pide una
  vez por examen, dentro de `DIAS_APELACION` (7) días, con un mensaje. Llega un aviso a la Administración. Quien revisa ve el mensaje y las escritas de ese intento, cambia la nota si corresponde y responde; el
  alumno recibe un aviso y ve la respuesta en su examen.
- **Las escritas marcadas** por el corrector (nota dudosa, texto pegado, copia de la pregunta, lista de palabras o fuera
  de tiempo). Cada tarjeta muestra la pregunta, la respuesta, las ideas de la clave con su peso y si el corrector las
  encontró, los conceptos errados, las citas y la respuesta modelo. Se confirma la nota o se cambia, con un motivo que
  queda registrado y que el alumno recibe en un aviso. Cualquier escrita de un alumno se puede revisar desde su página.
- **Revisadas hace poco** y los pedidos respondidos en los últimos 30 días.

**El cambio de nota recalcula en cadena** (`recalcularTrasRevision`):
1. La nota del intento (`academia_intentos`: la parte objetiva queda fija y la escrita es el promedio de sus escritas).
2. La mejor nota del examen.
3. La materia, que ya no queda pegada en «aprobada»:
   - si pasa a aprobada, recibe su certificado;
   - si deja de estarlo, vuelve a «en curso» y su certificado se revoca solo, con el motivo (`PREFIJO_AUTO`).
   - Un certificado que revocó una corrección de nota vuelve a valer si la nota vuelve a alcanzar; uno que revocó la
     Administración a mano, no.
4. El nivel: se completa si ya cumple todo, o se reabre (con su certificado revocado) si dejó de cumplir.

El resultado que ve el alumno se actualiza con la nota nueva y el motivo. Los intentos de antes del registro de intentos
se recalculan con su último resultado guardado, si es ese intento; si no, la nota de la escrita cambia y la del examen no.

**Las reglas de la revisión:**
- Nadie revisa lo suyo: sus respuestas, su pedido de revisión, sus documentos o su nombre (lo hace otra persona). Si el
  único administrador también estudia, lo suyo queda con la nota automática.
- Los documentos se revocan o se vuelven a dar por válidos con un motivo, y el nombre se corrige en la ficha y en los
  documentos vigentes; el alumno recibe un aviso de cada cosa.
- Solo la Administración abre la academia, desde el resumen del panel, con una confirmación que explica qué
  pasa, y la pueden volver a poner en vista previa.
- **El historial** (pestaña «Historial»: `audit_log` con `entity_type` «academia») guarda cada cambio de nota, cada
  pedido respondido, cada documento revocado o restaurado, cada nombre corregido, cada observación y aprobación del
  contenido, cada pregunta retirada o vuelta a usar y cada apertura, con quién, a quién, cuándo y por qué.

**La gestión del expediente** (`server/academia-gestion.ts`, capacidad «gestionar», solo la Administración; pedido de
Luis del 16-nov: «si tengo un problema de notas, ¿cómo lo modifico?»). En la página de cada alumno, la tarjeta
«Herramientas de la Administración» y el botón «Gestionar» de cada materia abren el panel de esa materia. Cada acción
pide un motivo (8 letras o más), queda en el historial (también en el del alumno, en su página) y le llega al alumno en
la campana. Nadie gestiona lo suyo.
- **La nota por partes:** cada parte que pesa (examen final, repasos, versículo, mini pruebas, escritos) muestra lo que
  calcula el sistema y lo que vale. Un **ajuste** (`academia_ajustes`) reemplaza lo calculado: `componentesDe` lo aplica
  siempre (`componentesCalculados` es lo del sistema) y la materia se recalcula en cadena como en una revisión
  (`reconsiderarMateria`, nivel y especialidad, con el certificado emitido o revocado). El ajuste se puede quitar. El
  alumno ve en su materia qué parte se ajustó y el motivo (`MateriaDetalle.ajustes`). La materia aprobada por suficiencia
  o convalidación tiene la nota fija (`viaFija`).
- **La convalidación:** aprueba la materia con su nota (70 a 100), `via = 'convalidada'`, con su certificado; se puede
  cambiar la nota o quitarla (el certificado se revoca y vuelve a contar lo cursado). Avisa si pasa el tope de los
  Niveles 3 a 5, sin impedirlo.
- **Los exámenes:** quitar la espera del final (y el repaso obligatorio), reiniciar sus fallos, dar un intento más en
  las pruebas con tope (mini pruebas, escrito breve, suficiencia y trabajo final: `academia_pruebas.extra`, hasta 5) y
  anular el intento en curso (no cuenta: se borran sus escritas de ese intento).
- **Las lecciones:** marcar una como completada o volver a abrirla. **La inscripción:** inscribirlo en una materia (sin
  pedirle requisitos) o darlo de baja (su avance queda guardado).
- **El alumno:** registrarlo como retirado o reactivarlo; darle **tiempo extra** (`academia_alumnos.tiempo_extra`: en
  todos sus exámenes cada reloj dura 1,5 veces más, `conTiempoExtra`, aplicado en `rutasDeEvaluacion`); escribirle un
  mensaje (campana); ver el historial de su expediente.

**La revisión del contenido** (`server/academia-calidad.ts`, pestaña «Contenido» del panel y página
`/admin/academia/contenido/:materiaId`). Es el filtro doctrinal: el administrador lee cada materia antes de abrirla y
la aprueba **como administrador**, no como alumno (la pantalla lo dice).
- **La lista:** cada materia con contenido, su estado en la revisión doctrinal (aprobada, por revisar o «cambió
  después de aprobarla»), sus observaciones abiertas, las preguntas que el análisis marca y las retiradas del banco.
- **La materia:** sus lecciones (se leen en el lector, como las ve el alumno), el banco del examen con la respuesta, la
  explicación y la cita de cada pregunta, las escritas con su clave y su respuesta modelo, y el repaso de cada lección.
- **Las observaciones:** sobre toda la materia o sobre una lección. La resuelve el administrador, contando qué se hizo
  (qué se corrigió o por qué no hace falta cambiarlo).
- **La aprobación:** la da el administrador, sin observaciones abiertas, con notas opcionales. Guarda la
  **huella** del contenido (`huellaDe`, en `server/academia-banco.ts`: la ficha de la materia, sus lecciones y su
  banco, sin contar «disponible»). Si después cambia el contenido, la aprobación deja de estar vigente y hay que
  revisarla otra vez. Se puede quitar con un motivo.
- **La apertura** dice cuántas materias están aprobadas y, al confirmar, avisa si falta alguna. No la impide: lo
  recomendado es abrir con todas aprobadas.

**El análisis de preguntas** (`server/academia-analisis.ts`, con su prueba), como el informe estadístico de los
cuestionarios de Moodle (teoría clásica de los tests). Sale de los intentos cerrados del examen final de la materia y
del examen integral de su nivel (`academia_intentos`, que guarda en cada respuesta la opción elegida):
- **Facilidad:** qué parte de los intentos acertó la pregunta. Menos de 25 % es «muy difícil»; más de 95 %, «muy fácil».
- **Discriminación:** la correlación punto biserial entre acertarla y el resto del examen (de −1 a 1). Si es negativa
  («discrimina al revés»), la aciertan más los que peor van y hay que revisarla; menos de 0,15 «discrimina poco».
- **Sin tiempo:** cuántos dejaron vencer el reloj (desde 20 % se marca). Cuentan como error, no como una opción elegida.
- **La falsa más elegida:** cuántos la eligieron y qué parte de los errores fue; si confunde a muchos, puede ser la
  redacción.
- **Las escritas:** la nota media, cuántas deja el corrector para revisar y cuántas cambia la revisión (y en cuánto). Si
  la revisión las cambia seguido, a la clave le faltan formas.
- Con menos de 8 intentos de una pregunta (5 respuestas de una escrita) no se saca ninguna conclusión: «pocos datos».
- Las que hay que mirar salen primero, de lo más grave a lo menos (`gravedad`).

**Retirar una pregunta del banco** (`academia_preguntas_retiradas`): el administrador la retira con un motivo y
deja de salir en los intentos nuevos (del final y del integral); las notas ya dadas no cambian. Se vuelve a usar con un
motivo. **El banco nunca queda corto** (`porQueNoSeRetira`, con su prueba): el final queda con el doble de las preguntas
del examen y cada lección con más de las que el examen saca de ella; las escritas, con el doble de las que pide el
examen y nunca menos de 2. Si no se puede, la pantalla dice por qué: entonces la pregunta se corrige en el contenido.
Las del repaso no se retiran: se corrigen en el contenido.

**Las asignaciones a los cursos de la Escuela** (`server/academia-asignaciones.ts`, pestaña «Academia» del aula):
- Quien dirige un curso de la Escuela (la administración, o el maestro a cargo de ESE curso, como en
  `canManageCourse`) le asigna materias publicadas de la academia: obligatorias u opcionales, con fecha límite (el
  final del día que elige, en su hora) e indicaciones. Cada materia, una vez por curso; se cambia o se quita (quitarla
  no borra lo que cada alumno hizo en la materia).
- En el aula ve cómo va cada alumno inscrito y aprobado en el curso: sin empezar, en curso (con sus lecciones),
  aprobada (con su nota, y si fue a tiempo) o vencida (pasó la fecha sin aprobarla). Todo se calcula al leerlo
  (`estadoAsignacion`, en `shared/academia-escuela.ts`, con su prueba).
- **La planilla del curso** trae en la hoja de notas una columna por cada materia asignada, con la nota que sale sola
  (y en el Excel): no se escribe a mano.
- Los alumnos del curso ven sus asignaciones en el aula, en la portada de la academia («Materias asignadas», primero
  las pendientes) y en la página de la materia. Mientras la academia esté en vista previa no las ven y no se les avisa;
  ya abierta, cada asignación nueva les deja un aviso en la campana. No hay recordatorios de fondo: la fecha y lo que
  falta se ven al entrar.

**Los mentores** (`server/academia-mentores.ts`, capacidad «mentores»):
- La Administración elige el mentor de cualquier alumno, desde la página del alumno en el panel, buscando por nombre o
  usuario. Se cambia o se
  quita. El mentor y el alumno reciben un aviso en la campana.
- El mentor ve en «Mis acompañados» (`/academia/acompanados`, y una tarjeta en la portada) el estatus, las lecciones,
  las materias aprobadas y las que tiene en curso de cada persona que acompaña. **Sin notas ni datos de contacto**: el
  aviso de privacidad de la inscripción dice que esos los ven solo la Administración y su iglesia.
- **Se detuvo** quien tiene materias en curso y no estudia hace `DIAS_DETENIDO_MENTOR` (7) días o más: sale primero y
  marcado. Se calcula al leerlo.
- El alumno ve a su mentor en su expediente. Si se borra la cuenta del mentor, sus acompañados quedan sin mentor.
- Desde cuándo lo acompaña queda en `mentor_desde`: en el Nivel 5, el mentor cumple «acompañar a 2 personas hasta
  terminar el Nivel 1» con las que terminan el Nivel 1 mientras las acompaña, y recibe un aviso cuando cada una termina.

**La Academia primero** (lo pidió Luis: en las clases de la Escuela no se está dando clase):
- Para quien ve la academia (la vista previa o, cuando se abra, todos), el botón «Clases» de la barra de la app pasa a
  «Academia», y también el acceso de Inicio y el primer enlace de «Formación» en el menú.
- La Academia y la Escuela comparten las pestañas «Academia | Clases en vivo»: Capacitaciones pasa a llamarse «Clases
  en vivo» y el botón de la barra queda marcado en las dos.

**El examen final** (`EXAMEN_FINAL` en `shared/academia.ts`):

| Nivel | Parte A | Parte B | Peso A/B | Tiempo |
|---|---|---|---|---|
| 1 | 10 de un banco de 30 | 1 respuesta corta de 15 a 60 palabras | 80/20 | de 60 a 120 s por pregunta según su largo (`segundosDePregunta`); 6 min la escrita |
| 2 | 15 de 45 | 2 cortas | 70/30 | de 60 a 120 s; 6 min |
| 3–5 | 20 de 60 | 1 corta y después 1 escrito breve | 60/40 | de 60 a 120 s; 6 min la corta y 15 el escrito breve |

- **La parte escrita de los Niveles 3 a 5** (`breves` y `minutosBreve` de `EXAMEN_FINAL`): cada intento trae primero una
  respuesta corta y después un escrito breve de 80 a 300 palabras, cada tipo con lo que todavía no salió
  (`elegirEscritasConBreves`); el reloj de cada una sale de `minutosDe`. El banco de cada materia tiene 3 cortas y 2
  escritos breves para el final, además del escrito breve de la materia. El examen integral y la suficiencia usan solo
  las cortas.

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
- **Nivel 2:** examen final 50 %, mini pruebas 25 %, escrito breve 15 % y versículo 10 % (`PESOS_NIVEL`).
  - Mini pruebas: el promedio de la mejor nota de cada una; la que no se da cuenta 0.
  - Escrito breve: la mejor de sus entregas (con la revisión de la Administración, si la hubo).
  - Sin mini pruebas ni escrito, la nota no llega a 70: hay que hacerlos. Y el examen final sigue siendo necesario.

**Las mini pruebas** (`server/academia-mini.ts`, página `/academia/mini/:materiaId/:n`):
- Una cada 3 lecciones (`miniPruebasDe`: en una materia de 6 lecciones, la 1 mide las lecciones 1 a 3 y la 2, las 4 a
  6). Se abren al completar las lecciones de su grupo.
- 6 preguntas de su banco de 18 (`MEDIDA_MINI`), repartidas por lección, de 60 a 120 segundos cada una según su largo
  (60 de base, como el final, desde la revisión del 16-nov), sin escritas.
- 3 intentos, cada uno con preguntas nuevas, sin espera; cuenta el mejor y después se cierra (`ExamenEstado.cerrado`).
- Usan el motor de los exámenes (`evaluacionMini`, clave `<materia>:mini-<n>`), con la revisión completa al terminar
  y sin pedidos de revisión (no tienen escritas).

**El escrito breve** (`server/academia-escrito.ts`, página `/academia/escrito/:materiaId`):
- Una consigna por materia, con su clave de corrección (`breve` en el banco, de tipo «breve»: 80 a 300 palabras).
- Se entrega después de completar las lecciones, sin reloj. Lo que no llega a 80 palabras o pasa de 300 no gasta la
  entrega. Hay 2 entregas y cuenta la mejor (`ESCRITO_BREVE`).
- Después de la primera se ve qué ideas encontró el corrector y cuáles faltan; la respuesta modelo, solo después de
  la última (si no, la segunda se copiaría).
- Cada entrega queda como un intento (`academia_intentos`, con la escrita como toda la nota) y su respuesta en
  `academia_respuestas` (clave `<materia>:breve`): la Administración la revisa y cambia su nota como cualquier escrita,
  con el recálculo en cadena (contexto «breve»).

**El certificado de especialidad** (`server/academia-especialidad.ts`, página `/academia/especialidad/:especialidadId`):
- **La página de la especialidad:** sus cinco materias con el avance del alumno (estado, lecciones, nota y lo que pide
  cada una para inscribirse), el trabajo final y el certificado. La portada y la página de cada materia de la
  especialidad llevan a ella.
- **El trabajo final** (`server/academia/trabajos.ts`, solo servidor): una consigna por especialidad que une sus cinco
  materias, con su clave de tipo «trabajo» (300 a 1.200 palabras, `ESCRITA.trabajo`). Se publica cuando la especialidad
  tiene sus cinco materias listas. Se entrega con las cinco aprobadas, sin reloj; lo que no llega a 300 palabras o pasa
  de 1.200 no gasta la entrega. Hay 3 entregas y cuenta la mejor (`TRABAJO_ESPECIALIDAD`): una más que el escrito
  breve, porque sin él no hay certificado. Después de cada entrega se ve qué ideas encontró el corrector; la respuesta
  modelo, solo después de la última.
- **Cómo queda:** como el escrito breve, cada entrega es un intento (`academia_intentos`) con su respuesta en
  `academia_respuestas`, con la clave `especialidad-<id>:trabajo` (contexto «trabajo»): la Administración lo revisa y
  cambia su nota como cualquier escrita.
- **El certificado** («Certificado de Especialidad en …», `tituloEspecialidad`) sale solo con las cinco materias y el
  trabajo final aprobados (70). Su nota es el promedio de las cinco materias y del trabajo, todos con el mismo peso
  (`notaEspecialidad`); desde 90, con honores. Una entrega mejor del trabajo le sube la nota.
- **Si una revisión cambia una nota** (del trabajo o de una materia de la especialidad), la especialidad se vuelve a
  mirar (`reconsiderarEspecialidad`): si ya cumple, su certificado se emite o vuelve a valer con la nota nueva; si dejó
  de cumplir, se revoca con el motivo. El que revocó la Administración por otro motivo sigue revocado.
- La especialidad completa aparece en la actividad del panel de seguimiento («Especialidades completas»).

**Equivalencias (fase A4):**
- **El examen de suficiencia** (`server/academia-suficiencia.ts`, página `/academia/suficiencia/:materiaId`) es la única
  manera de aprobar una materia sin cursarla. Usa el mismo motor que el final (`evaluacionSuficiencia`):
  - Pide estar inscrito en la academia y en la materia, el nivel anterior completo y el versículo de memoria aprendido.
  - 25 preguntas del banco del final, repartidas por todas las lecciones, y 2 escritas (`medidaSuficiencia`).
  - Se aprueba con las dos partes a la vez: 85 la objetiva y 75 la escrita (`apruebaSuficiencia`).
  - **Una sola oportunidad** por materia, y solo si todavía no se dio su examen final (`ExamenEstado.cerrado` dice por
    qué no se puede). Si no aprueba, la cursa; no hay espera.
  - Aprobada, la materia queda con `via = 'suficiencia'` y la nota del examen, y su certificado lo dice. El resultado no
    muestra las preguntas con su respuesta: salen del banco del final, que se da si no aprueba.
  - La página de la materia la ofrece mientras corresponde (`MateriaDetalle.suficiencia`).
  - Topes: en los Niveles 1 y 2 se pueden aprobar todas así (el examen integral del nivel se da igual); en los
    Niveles 3 a 5, como máximo la mitad (`topeSuficiencia`). La práctica, el sermón y el proyecto nunca se convalidan.
  - La revisión de sus escritas recalcula como en el final (`reconsiderarSuficiencia`).
- **La prueba diagnóstica** (`server/academia-diagnostico.ts`, páginas `/academia/diagnostico` y
  `/academia/diagnostico/prueba`): 2 preguntas de cada materia con contenido de los Niveles 1 y 2 (la etapa Raíces, la
  de quien llega; así no crece con cada materia de los niveles altos: `entraEnDiagnostico`), de 45 a 90 segundos cada
  una según su largo, sin escritas; la página dice los minutos que pide con el tiempo promedio de las preguntas de su
  banco (`minutosDiagnostico`). **No
  aprueba nada ni cambia el avance:** guarda el resultado por materia (`academia_diagnosticos`) y sugiere el nivel que
  le toca, por qué materia empezar y cuáles podría aprobar por suficiencia (las que respondió todas bien:
  `sugerenciaDiagnostico`, con su prueba). Se repite cada 30 días; la sugerencia se recalcula al leerla.
- **El repaso espaciado del versículo** (`server/academia-versiculos.ts`, página `/academia/repaso`): cada versículo
  aprendido vuelve a los 1, 3, 7 y 21 días (`siguienteRepaso`, con su prueba). Se repasa armando sus fichas en orden;
  bien, pasa a la caja siguiente; mal, vuelve a la primera y a mañana (y se muestra el texto). Al pasar el de los 21
  días queda dominado (`dominado_at`). No cambia la nota de la materia: el puntaje del versículo es el de cuando se
  aprendió. La portada avisa cuántos tocan hoy.
- **La declaración de fe** (`shared/academia-declaracion.ts`, página `/academia/declaracion-de-fe`): 17 artículos con
  sus citas (RV1960), escritos con la bibliografía pentecostal (Pearlman, Duffield y Van Cleave, Horton). Cinco artículos
  llevan `aConfirmar`, los puntos en que las iglesias pentecostales difieren: la perseverancia (6), las lenguas como
  señal inicial (9), la sanidad en la expiación (11), el ministerio de la mujer (13) y el rapto y el milenio (16).
  - La aprueba el administrador en la pestaña «Contenido» (`POST direccion/declaracion/aprobar`), con la huella del
    texto (`huellaDeclaracion`): si el texto cambia, hay que aprobarla otra vez.
  - Mientras no esté aprobada, la página la muestra como **borrador** con los puntos a confirmar. Se enlaza desde la
    portada y el reglamento.

## 4. El contenido: normas para que nada sea inventado ni errado

1. **La Escritura primero:** cada afirmación doctrinal lleva su base bíblica, leída en su contexto.
2. **Texto original**, al nivel del alumno. No se copian libros.
3. **Nada inventado:**
   - Fechas, nombres y datos de historia se comprueban en dos fuentes serias.
   - Si la Biblia no dice algo, se dice así.
4. **Doctrina:**
   - Se sigue la declaración de fe del ministerio (`shared/academia-declaracion.ts`), que hay que aprobar antes del
     Nivel 2.
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
   - Revisión doctrinal (el administrador), en la pestaña «Contenido» del panel.
   - Piloto: Luis cursa la materia completa.
   - Análisis de las preguntas cuando ya hay alumnos, en la misma pestaña.

## 5. Cómo agregar una materia

1. En `shared/academia.ts`:
   - Escribe sus lecciones (`lecciones(...)`) y su **sílabo**: propósito, objetivos con su nivel de Bloom, Conocer, Ser
     y Hacer, bibliografía y recursos.
   - Déjala en `disponible: false` mientras se escribe.
2. Escribe el contenido en `server/academia/contenido/<id>.ts` (tipo `LeccionContenido`: objetivos, para empezar,
   bloques, idea clave, para la vida). Cada versículo va como `{ t: "versiculo", ref: "Libro c:v-v" }`, con un solo
   capítulo por bloque. Pon al menos un esquema visual (`linea`, `cuadro` o `pasos`) donde ayude a resumir, y un video
   en las materias que lo permitan. En los Niveles 4 y 5, el sílabo lleva su `ampliada`.
3. Escribe el banco en `server/academia/bancos/<id>.ts`:
   - El repaso de cada lección: 3 preguntas.
   - El final: 3 veces el examen, con `leccion`, `objetivo` y `bloom` en cada pregunta, y sus preguntas de casos
     (aplicar, analizar o evaluar en una situación real).
   - Las escritas, con su clave.
   - Desde el Nivel 2, además: `mini`, las preguntas de cada mini prueba (18 por mini prueba, de las lecciones de su
     grupo, al menos 6 por lección) y `breve`, el escrito breve con su clave (la respuesta modelo, de 80 a 300 palabras,
     debe sacar 90 o más).
   - **Los ids nunca se reusan.**
4. Regístralos en `server/academia/index.ts`.
   - Una materia de especialidad lleva `nivel: null`, su `especialidad`, su `orden` y, si pide el Nivel 3,
     `avanzada: true`. Su id es `<especialidad>-<orden>` y se pone en la lista de `especialidad(...)` en lugar del
     título. Usa la medida, las mini pruebas y los pesos del Nivel 3.
5. Corre las pruebas: `npx tsx --test server/academia-correccion.test.ts shared/academia.test.ts`, y después
   `npx tsx scripts/academia/verificar.ts`, que comprueba citas, bancos y claves contra la Biblia de la web.
6. Revisión doctrinal (la materia aparece sola en la pestaña «Contenido» del panel) y piloto. Después,
   `disponible: true` (eso no cambia la huella de la aprobación).

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
- Lo que agregó la revisión del sistema de estudio a las materias ya publicadas, en registros aparte para no tocar sus
  archivos: `server/academia/esquemas.ts` (`BLOQUES_EXTRA`, los esquemas y los videos, por lección: van al final de su
  lectura, antes de «La idea clave», así no cambian los números de bloque que guarda el cuaderno),
  `server/academia/casos.ts` (`CASOS`, las preguntas de casos, por materia) y `shared/academia-complementos.ts`
  (`COMPLEMENTOS`, la bibliografía de más y la lectura ampliada; `aplicarComplementos` los suma al sílabo al cargar).
  `server/academia/index.ts` suma los dos primeros al contenido y al banco. Su prueba, `server/academia-esquemas.test.ts`.
- `server/academia-carga.ts` y `shared/academia-carga.ts`: los minutos reales de cada lección.
- `server/academia-repaso-dia.ts` y `shared/repaso-del-dia.ts`: el «Repaso del día».
- `server/academia-recursos.ts` y `shared/academia-recursos.ts`: los recursos de estudio de toda la academia (la página
  `client/src/pages/academia-recursos.tsx`).
- `server/academia-nivel.ts`: el cierre del nivel (integral, versículos, pacto y nivel completo).
- `server/academia-documentos.ts`: los certificados (emisión, vista con QR y verificación pública). Usa la librería
  `qrcode` en el servidor.
- `server/academia-matricula.ts`: la matrícula, el estatus y el carné (y su verificación).
- `server/academia-inscripcion.ts`: la inscripción en la academia (la ficha) y en cada materia, y si la academia ya
  está abierta para todos. La ficha, sus opciones y su validación están en `shared/academia-inscripcion.ts`, con su
  prueba.
- `server/academia-direccion.ts`: el panel de seguimiento, los reportes en CSV (`server/academia-csv.ts`) y el expediente.
- `server/academia-revision.ts`: la revisión (la cola, el cambio de nota en cadena, los pedidos de revisión, los
  documentos, la apertura y el historial). `client/src/components/academia/revision.tsx`: las tarjetas de la revisión.
- `server/academia-calidad.ts`: la revisión del contenido (observaciones y aprobación), el análisis de preguntas y el
  banco (retirar y volver a usar). `server/academia-analisis.ts`: las cifras del análisis, sin base de datos.
  `server/academia-banco.ts`: la guarda del banco y la huella del contenido, sin base de datos. Los tipos, en
  `shared/academia-calidad.ts`; la página, `client/src/pages/academia-direccion-contenido.tsx`.
- `server/academia-asignaciones.ts`: las asignaciones a los cursos de la Escuela (y sus columnas en la planilla,
  `academiaEnPlanilla`). `server/academia-mentores.ts`: los mentores. Los tipos y el estado de cada asignación, en
  `shared/academia-escuela.ts` (liviano: lo usan el aula y la planilla sin cargar el catálogo).
  `client/src/components/academia/asignaciones.tsx` (la pestaña del aula y las tarjetas) y `mentores.tsx`; la página
  `client/src/pages/academia-acompanados.tsx`.
- `shared/academia-permisos.ts`: los roles y los permisos de la academia; `shared/academia-direccion.ts`, los tipos del panel.
- `server/academia-mini.ts` y `server/academia-escrito.ts`: las mini pruebas y el escrito breve del Nivel 2 en adelante;
  las páginas `client/src/pages/academia-mini.tsx` y `academia-escrito.tsx` (la revisión de una escrita es
  `EscritaCorregida`, en `examen.tsx`).
- `server/academia-especialidad.ts` y `server/academia/trabajos.ts`: la página de cada especialidad, el trabajo final
  (con su clave, solo servidor) y el certificado de especialidad; la página `client/src/pages/academia-especialidad.tsx`.
- `server/academia-suficiencia.ts`, `server/academia-diagnostico.ts` y `server/academia-versiculos.ts`: la suficiencia,
  la prueba diagnóstica y el repaso espaciado (fase A4). `server/academia-orden.ts`: el reparto de la respuesta
  correcta en el repaso y los exámenes, con su prueba. `shared/academia-declaracion.ts`: la declaración de fe.
- `client/src/components/academia/area.ts` y `entrada-panel.tsx`: el área de quien mira el panel y la tarjeta
  «Academia» de los paneles. `video-youtube.tsx`: el reproductor que cuenta lo visto. `descargas.ts`: los enlaces
  de descarga (los PDF del carné, del certificado y del expediente se hacen en el servidor: `server/academia-carne.ts` y
  `server/academia-pdf.ts`).
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
| `academia_intentos` | Cada intento cerrado de un examen: la parte objetiva, la escrita, la nota (y la del corrector), los aciertos y cada respuesta objetiva (para el análisis de preguntas) |
| `academia_apelaciones` | Los pedidos de revisión: el examen y el intento, el mensaje del alumno, la respuesta, quién respondió y cuándo (uno por examen) |
| `academia_inscripciones` | La ficha de inscripción: nombres, apellidos, país, ciudad, teléfono, nacimiento, iglesia aliada u otra, pastor, tiempo en la fe, bautismo, ministerio, cómo conoció la academia, qué espera aprender, la foto del carné (`foto_url`) y sus fechas |
| `academia_versiculos` | Intentos, fallos, puntaje, la caja del repaso espaciado, cuándo vuelve, cuántos repasos y cuándo quedó dominado |
| `academia_diagnosticos` | Cada prueba diagnóstica: la fecha, los aciertos por materia y el total |

`academia_lecciones` también guarda cuándo se abrió la lección (`abierta_at`) y cuánto video se vio de corrido
(`video_inicio`, `video_seg`), para abrir el repaso.

Del contenido (no son de un alumno: no se borran con una cuenta; si se borra la cuenta de quien la dejó, queda sin nombre):

| Tabla | Qué guarda |
|---|---|
| `academia_preguntas_retiradas` | Las preguntas retiradas del banco: el id, el motivo, quién y cuándo |
| `academia_contenido_notas` | Las observaciones de la revisión: la materia, la lección (o ninguna), el texto, quién, cuándo y cómo se resolvió |
| `academia_contenido_aprobaciones` | La aprobación doctrinal de cada materia (y de la declaración de fe, con el id `declaracion-de-fe`): quién, cuándo, las notas y la huella del contenido aprobado |
| `academia_asignaciones` | Las materias asignadas a un curso de la Escuela: el curso (se borran con él), la materia, si es obligatoria, la fecha límite, las indicaciones y quién la asignó |

El mentor de cada alumno va en `academia_alumnos.mentor_user_id`.

**Rutas** (`/api/academia/…`). Los parámetros no se llaman `:id`, porque `app.param("id")` exige números.

| Ruta | Para qué |
|---|---|
| `GET estado` | Catálogo con el avance del alumno y «Continuar» |
| `GET materia/:materiaId` | La materia con su sílabo |
| `GET leccion/:leccionId` | La lección, con los versículos ya resueltos |
| `GET recursos` | Los recursos de estudio de toda la academia (videos, audios, lecturas y lecturas ampliadas), con su materia y su lección |
| `POST repaso` | Una respuesta del repaso: `{leccionId, preguntaId, opcion}` (409 con lo que falta si todavía no se leyó la lección) |
| `POST leccion/:leccionId/video` | Lo visto de corrido del video: `{segundos}` |
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
| `GET certificado/:codigo` | Un documento completo, con su QR: para su dueño y la Administración |
| `GET certificado/:codigo/pdf` | El mismo documento en PDF, hecho en el servidor y con su nombre de archivo (los mismos permisos) |
| `GET verificar/:codigo` | La verificación pública (certificado o carné), sin cuenta y sin notas |
| `GET abierta` | Si la academia ya está abierta para todos (el menú y la barra de la app) |
| `GET inscripcion` | Mi ficha, mi matrícula, las iglesias aliadas, lo que se sabe de mi cuenta y si mi nombre ya es fijo |
| `POST inscripcion` | Inscribirme o corregir mi ficha: `{ficha, reglamento: true, honor: true}` (las aceptaciones, la primera vez) |
| `POST materia/:materiaId/inscripcion` | Inscribirme en una materia (pide la academia y el nivel anterior) |
| `POST foto` | La foto del carné: `{url}` de un archivo subido a la web, o `{url: null}` para quitarla |
| `GET expediente` | Mi expediente: mis materias con su avance y su nota, mis niveles y mis certificados |
| `GET expediente/pdf` | Mi expediente en PDF, hecho en el servidor y con su nombre de archivo |
| `GET direccion/resumen`, `GET direccion/alumnos`, `GET direccion/alumno/:alumnoId`, `GET direccion/materia/:materiaId` y `GET direccion/actividad` | El panel de seguimiento (cada rol, con su alcance) |
| `GET direccion/exportar/:archivo` | Los reportes: `alumnos.csv`, `avance.csv` y `materias.csv` |
| `GET direccion/revision` y `GET direccion/alumno/:alumnoId/escritas` | Lo que hay que revisar (las escritas marcadas, los pedidos de revisión y lo revisado hace poco) y todas las escritas de un alumno |
| `POST direccion/revision/:respuestaId` | Revisar una escrita: `{accion: "confirmar"}` o `{accion: "cambiar", nota, motivo}` (recalcula en cadena) |
| `POST direccion/apelacion/:apelacionId` | Responder un pedido de revisión y cerrarlo: `{respuesta}` |
| `POST direccion/documento/:codigo/revocar` y `/restaurar` | Revocar un documento o volver a darlo por válido: `{motivo}` |
| `POST direccion/alumno/:alumnoId/nombre` | Corregir el nombre en la ficha y en los documentos vigentes: `{nombres, apellidos, motivo}` |
| `POST direccion/apertura` | Abrir la academia para todos o volver a la vista previa: `{abierta}` |
| `GET direccion/historial` | El historial de los cambios de la academia |
| `GET direccion/contenido` y `GET direccion/contenido/:materiaId` | La revisión del contenido: la lista y una materia con su banco y el análisis de sus preguntas |
| `POST direccion/contenido/:materiaId/observacion` y `POST direccion/contenido/observacion/:notaId/resolver` | Dejar una observación `{texto, leccionId}` y resolverla `{respuesta}` |
| `POST direccion/contenido/:materiaId/aprobar` y `/desaprobar` | Aprobar la materia `{notas}` (sin observaciones abiertas) o quitar la aprobación `{motivo}` |
| `POST direccion/pregunta/:preguntaId/retirar` y `/restaurar` | Retirar una pregunta del banco o volver a usarla: `{motivo}` |
| `GET curso/:cursoId/asignaciones` | Las asignaciones de un curso de la Escuela: con cada alumno para quien lo dirige, con lo suyo para un alumno inscrito |
| `POST curso/:cursoId/asignaciones`, `POST curso/:cursoId/asignaciones/:asignacionId` y `/quitar` | Asignar `{materiaId, obligatoria, venceAt, indicaciones}`, cambiar `{obligatoria, venceAt, indicaciones}` o quitar |
| `GET mis-asignaciones` | Las asignaciones de todos mis cursos, con mi avance |
| `GET direccion/personas?q=` y `POST direccion/alumno/:alumnoId/mentor` | Buscar a quién elegir como mentor y elegirlo `{mentorId}` (o quitarlo con `null`) |
| `GET acompanados` | Mis acompañados como mentor: su avance, sin notas ni contacto |
| `POST examen/:materiaId/apelacion` y `POST integral/:nivel/apelacion` | El alumno pide la revisión de su último intento: `{mensaje}` |
| `GET suficiencia/:materiaId` y `POST suficiencia/:materiaId/empezar`, `/paso`, `/respuesta`, `/escrita` y `/apelacion` | El examen de suficiencia: las mismas rutas que el final |
| `GET diagnostico` | Mi última prueba diagnóstica, con la sugerencia de hoy, y cuántas preguntas tiene |
| `GET diagnostico/prueba` y `POST diagnostico/prueba/empezar`, `/paso` y `/respuesta` | La prueba diagnóstica |
| `GET versiculos/repaso` | Mis versículos con su repaso: cuáles tocan hoy y cuándo vuelven los demás |
| `GET versiculos/repaso/:materiaId` y `POST versiculos/repaso/:materiaId` | Las fichas de un versículo para repasarlo y el orden: `{orden}` |
| `GET declaracion` | Si la declaración de fe está aprobada |
| `POST direccion/declaracion/aprobar` y `/desaprobar` | Aprobar la declaración de fe `{notas}` o quitar la aprobación `{motivo}` |
| `GET mini/:materiaId/:n` y `POST mini/:materiaId/:n/empezar`, `/paso` y `/respuesta` | Una mini prueba: las mismas rutas que el final |
| `GET escrito/:materiaId` y `POST escrito/:materiaId` | El escrito breve: la consigna, las entregas y la última corrección; entregarlo `{texto, pegado}` |
| `GET especialidad/:especialidadId` | La especialidad: sus materias con el avance del alumno, el trabajo final y el certificado (sin sesión, solo el catálogo y la consigna) |
| `POST especialidad/:especialidadId/trabajo` | Entregar el trabajo final `{texto, pegado}`; con las cinco materias y el trabajo aprobados, emite el certificado |
| `GET matricula` | Mi matrícula |
| `GET carne` | Mi carné: los datos y las direcciones de sus archivos (pide la inscripción) |
| `GET carne/frente.png`, `carne/reverso.png` y `carne/carne.pdf` | Los archivos del carné, hechos en el servidor; `?v=<huella>`, `&descargar=1` (imágenes) y `&ver=1` (el PDF abierto) |
| `GET carne/salud` | Pública y sin datos de nadie: dibuja un carné de muestra y dice si el lienzo, la letra, el logo y el PDF funcionan en este servidor (para comprobar cada despliegue) |
| `GET dev/correcta/:materiaId`, `GET examen/:materiaId/dev-correcta`, `GET integral/:nivel/dev-correcta` y `POST dev/adelantar` | **Solo en desarrollo**, para las pruebas; no existen en la web publicada |

**Vista previa:** mientras `site_content.academia_abierta` no sea `1`, solo la ven los roles de `ROLES_VISTA_PREVIA`
(administración y profesores con cuenta aprobada).

**Pruebas:**
- Locales: el corrector, la elección de preguntas y el catálogo
  (`npx tsx --test server/academia*.test.ts shared/academia*.test.ts`).
- De la API: `academia_api.py` en el scratchpad de la sesión de la academia. Usa el servidor «mi-web-academia» en el
  puerto 5082 y PGlite en memoria en el 55442.
- En el navegador usar 127.0.0.4; las otras sesiones usan localhost y de 127.0.0.1 a 127.0.0.3.

## 7. Las fases

| Fase | Qué sale | Estado |
|---|---|---|
| A1 · La base | Motor del examen en dos partes y corrector, formato de lecciones con medios, portada, materia con sílabo, lector, repaso, versículo, examen con revisión y la primera materia completa («La salvación») | Hecho (vista previa) |
| A2 · Nivel 1 completo | 8 materias, audio, examen integral, certificados y diploma con QR, matrícula, reglamento, carné, expediente, estatus en el perfil, pestaña en Clases y acceso de las cuentas pendientes | Sigue: las 8 materias del Nivel 1 hechas (32 lecciones, 96 de repaso, 240 del final y 24 escritas), el examen integral, el pacto del creyente, los certificados con QR verificable, la inscripción con su ficha y la de cada materia, el reglamento, el estatus, el carné con su foto, la Academia primero en Clases, el panel de seguimiento con sus avisos, reportes y permisos, el expediente y la insignia en el perfil; las cuentas por aprobar ya estudian en la academia y el audio del Nivel 1 está grabado (#221); falta la constancia de estudios (ver la revisión del 20-nov en [academia-revision-2026-11-20.md](academia-revision-2026-11-20.md)) |
| A3 · Dirección académica | Revisión de escritas y apelaciones, cambio de notas con motivo, análisis de preguntas, revisión del contenido, asignaciones a los cursos de la Escuela y mentores | Hecho: la revisión de escritas, los pedidos de revisión, el cambio de notas en cadena, los documentos, la apertura, el historial, el análisis de preguntas, retirar preguntas del banco, la revisión doctrinal del contenido, las asignaciones a los cursos de la Escuela (con sus columnas en la planilla) y los mentores |
| A4 · Nivel 2 | Mini pruebas, escritos breves, repaso espaciado, prueba diagnóstica, suficiencia y declaración de fe | Sigue: la suficiencia, la prueba diagnóstica, el repaso espaciado del versículo y la declaración de fe (por aprobar) hechos, con las dos áreas separadas (solo el administrador maneja la academia), la lectura antes del repaso, las opciones equilibradas, el carné nuevo y los PDF; con las mini pruebas, el escrito breve, la nota del Nivel 2 y ocho materias: «Panorama del Antiguo Testamento» (6 lecciones, 18 de repaso, 45 del final, 2 mini pruebas de 18, 4 escritas y el escrito breve), «Panorama del Nuevo Testamento» (6 lecciones con 4 videos de Proyecto Biblia, 19 de repaso, 45 del final, 2 mini pruebas de 18, 4 escritas y el escrito breve) y «Disciplinas espirituales» (6 lecciones, 18 de repaso, 45 del final, 2 mini pruebas de 18, 4 escritas y el escrito breve; Whitney como lectura básica y Foster con nota de discernimiento) y «El Sermón del monte» (6 lecciones con los videos de la serie de Proyecto Biblia, 18 de repaso, 45 del final, 2 mini pruebas de 18, 4 escritas y el escrito breve; con la nota de que poner la otra mejilla no es quedarse en el abuso) y «Mayordomía cristiana» (6 lecciones, 18 de repaso, 45 del final, 2 mini pruebas de 18, 4 escritas y el escrito breve; el diezmo como en el Nivel 1, sin prometer bendiciones a cambio de dinero, y una advertencia contra el evangelio de la prosperidad) y «Evangelismo personal» (antes «Evangelismo 1 y 2»: 6 lecciones, 18 de repaso, 45 del final, 2 mini pruebas de 18, 4 escritas y el escrito breve; sigue a Compartir mi fe con el modelo de Jesús, las objeciones comunes y el acompañamiento); «Familia y relaciones» (el diseño de Dios, el amor que sirve y nunca la violencia, la crianza, la soltería, la pureza y el perdón; el divorcio con el pastor) y «Dones espirituales y servicio» (vigentes hasta la venida de Cristo, con amor, orden y discernimiento; el bautismo en el Espíritu queda para el Nivel 3); los requisitos de evangelismo y servicio están hechos; y «Doctrinas fundamentales» (la declaración de fe artículo por artículo, en 6 lecciones, con 2 Timoteo 1:13: la Biblia y el Dios trino, Jesucristo, el pecado y la salvación, el Espíritu Santo con su bautismo, sus dones y la sanidad, la santidad, las ordenanzas, la iglesia y el ministerio, y la familia, el avivamiento y la esperanza; en los cinco puntos por confirmar presenta las posiciones con respeto y deja la del ministerio por confirmar; Pearlman y Hoff): con ella el Nivel 2 queda completo, y se abren solos su examen integral (40 preguntas de las nueve materias) y su cierre con el Certificado en Discipulado Cristiano |
| A5 · Nivel 3 | Práctica ministerial, grupos en vivo, enseñanza grabada y portafolio | Empieza: el final con una corta y un escrito breve, las lecciones de 10 minutos y dos materias: «Hermenéutica» (6 lecciones con 4 videos de Proyecto Biblia, 18 de repaso, 60 del final, 2 mini pruebas de 18, 3 cortas y 2 escritos breves en el final, y el escrito breve de la materia; Fee y Stuart y Virkler como lectura básica) y «Métodos de estudio bíblico» (el estudio inductivo, las herramientas y cuatro maneras de estudiar, con la misma medida; Warren y la concordancia de Strong); «Pentateuco y libros históricos» (de Génesis a Ester, más a fondo que el Panorama; Hoff y Schultz); «Los Evangelios y Hechos» (los cuatro retratos de Jesús, su persona, el reino, la cruz y la resurrección, y Hechos de Jerusalén a Roma; Tenney y Horton; los relatos del Espíritu se cuentan como están escritos); «Evangelismo y consolidación» (antes «Evangelismo 2»: el evangelismo en equipo, en las casas, en campañas, en la calle, la radio y las redes, y el plan para consolidar al nuevo creyente, que prepara ese requisito del nivel; Coleman y Warren); «Liderazgo cristiano I» (el liderazgo de servicio, el carácter del líder, la vida con Dios, el equipo, los conflictos y los nuevos líderes, con las señales del abuso de poder; Sanders y Blackaby); «Homilética I» (del texto al mensaje, la idea central con su tema y su complemento, el propósito, la estructura, la ilustración verdadera, la aplicación con Cristo en el centro y hablar en público, que prepara la enseñanza grabada; Robinson y Crane); «Historia de la iglesia I» (de Pentecostés a la víspera de la Reforma: los mártires, los apologistas, el canon y los credos, los concilios, Agustín, la Edad Media, Valdo, Wiclef y Hus; González y Hurlbut) y «Cuidado y consejería básica» (escuchar, orar con otros, acompañar en el duelo y en la crisis, cuándo derivar, el riesgo de suicidio con el 911 y el 988, el deber de reportar el abuso de un menor y la ética del que ayuda; Collins y Hoff). Los alumnos se inscriben al completar el Nivel 2. «La persona y obra del Espíritu Santo» (una persona divina, su obra en el Antiguo Testamento y en Jesús, en la salvación, el bautismo en el Espíritu según los Hechos, los dones con el fruto y andar en el Espíritu; las lenguas como señal inicial quedan por confirmar, con las dos posiciones pentecostales; Zacarías 4:6; Horton y Duffield y Van Cleave): el Nivel 3 tiene sus diez materias y su integral. Los requisitos del nivel (20 horas de práctica, la enseñanza grabada y consolidar a un nuevo creyente) se registran en la página del nivel y los confirma la Administración, como las actividades del Nivel 2: el Nivel 3 se puede cerrar completo |
| A6 · Niveles 4 y 5 y primeras especialidades | Proyecto final y defensa | Empieza el Nivel 4, con la misma medida del Nivel 3 (6 lecciones de 10 minutos, 18 de repaso, 60 del final, 2 mini pruebas de 18, 3 cortas y 2 escritos breves, y el escrito breve de la materia) y el Nivel 3 completo como requisito: «Teología sistemática I: la Biblia y Dios» (la revelación, la inspiración, la autoridad y la confiabilidad de la Biblia, los nombres y los atributos de Dios, la Trinidad con sus errores, la creación y la providencia; sigue los artículos 1 y 2 de la declaración de fe, que no tienen puntos pendientes; Pearlman y Duffield y Van Cleave), «Libros poéticos y proféticos» (la poesía y la sabiduría, Job y Eclesiastés, los Salmos, Proverbios y Cantares, los profetas y el Mesías anunciado; el milenio y el rapto quedan para Teología sistemática IV; Schultz y Fee y Stuart), «Apologética» (la existencia de Dios, la confiabilidad de la Biblia con la arqueología, la resurrección, el problema del mal y las sectas; Strobel y Hoff), «Homilética II: predicación expositiva» (del texto a la idea exegética y la homilética, predicar según el género, la estructura, la aplicación con Cristo en el centro, el llamado y la entrega, con la rúbrica del sermón del nivel: 25 la fidelidad al texto y 15 cada uno de los otros cinco criterios, se aprueba con 70; Robinson y Fee y Stuart), «Historia de la iglesia II» (Lutero y la Reforma, su extensión y la Biblia del Oso, los puritanos, los pietistas, los moravos y Wesley, las misiones modernas, el movimiento pentecostal de Topeka y la calle Azusa y la iglesia evangélica en América Latina y entre los hispanos de los Estados Unidos; la doctrina del bautismo en el Espíritu queda para su materia; González y Deiros) y «Ética cristiana y ministerial» (los fundamentos, las decisiones morales, la vida y la dignidad humana, la sexualidad y el matrimonio con el artículo 14, el dinero, el trabajo y la verdad, y la ética del ministro con la protección de menores y la ley de Texas; quién ejerce cada cargo queda para la declaración; Trull y Carter). En las cortas de «dos de tres» argumentos, `basta` evita exigir todos. Desde el 16 de noviembre salen también, con los puntos de la declaración de fe por confirmar presentados con sus posiciones: «Teología sistemática II: Cristo y el Espíritu Santo» (la deidad de Cristo y Nicea, su humanidad y Calcedonia, la obra de la cruz con sus palabras, sus oficios, la resurrección, la ascensión y la intercesión, la deidad y la personalidad del Espíritu con Constantinopla, y los dones y el bautismo en el Espíritu con el continuismo y el cesacionismo; las lenguas como señal inicial y la sanidad en la expiación, por confirmar; Colosenses 2:9; Pearlman y Horton) y «Teología sistemática III: el hombre, el pecado y la salvación» (la imagen de Dios con la tricotomía y la dicotomía, el pecado original y la respuesta de Agustín a Pelagio, la gracia y la elección con el calvinismo y el arminianismo presentados con respeto, la conversión, la regeneración y la justificación, la adopción y la santificación, y la seguridad y la glorificación; la perseverancia, por confirmar; Romanos 5:1; Pearlman, Horton y Grudem). Y salen «Teología sistemática IV: la iglesia, los ángeles y los últimos tiempos» (la naturaleza de la iglesia y sus imágenes, las tres formas de gobierno, los ministerios y los requisitos de los líderes, la misión y las dos ordenanzas, los ángeles, Satanás y los demonios sin especular, la muerte, el estado intermedio y la resurrección, y la venida de Cristo, el juicio y la eternidad; el ministerio de la mujer y el orden de los últimos tiempos, con el pretribulacionismo, el postribulacionismo y las tres lecturas del milenio, por confirmar; Tito 2:13; Pearlman, Horton y Grudem) y «Epístolas y Apocalipsis» (Romanos y Gálatas, 1 y 2 Corintios, las cartas de la prisión, Tesalonicenses y las pastorales, Hebreos y las cartas generales con Pablo y Santiago en armonía, y el Apocalipsis con sus cuatro lecturas, preterista, historicista, futurista e idealista; las fechas que se discuten, con cautela; Hebreos 1:1-2; Tenney y Fee y Stuart). **El Nivel 4 queda con sus 10 materias** y se abre su examen integral; el nivel no se cierra hasta que se programen las 30 horas de práctica y el sermón con rúbrica (`REQUISITOS_POR_HACER`). Empieza el Nivel 5, con la misma medida y el Nivel 4 completo como requisito: «Didáctica: cómo enseñar» (el maestro y su carácter, cómo aprende la gente con las siete leyes de Gregory, Hendricks y los estudios sobre recordar y repasar, objetivos con Bloom, los métodos de Jesús, evaluar con justicia y acompañar, con el trabajo del profesor y del mentor; Hendricks y Gregory), «Liderazgo II: formar líderes y equipos» (multiplicar con 2 Timoteo 2:2, reconocer y formar, delegar con Jetro y Hechos 6, equipos, conflictos con Mateo 18 y Sande, visión, servicio y sucesión; quién ejerce cada cargo queda para la declaración; Ogden y Maxwell), «Griego y hebreo bíblicos para el estudio» (los idiomas y cómo llegó el texto, los alfabetos, palabras clave, Strong, interlineales y diccionarios, el estudio de palabras con jésed y los errores comunes; Henriques, Morales y Steffen y Vine), «Teología pastoral» (el buen pastor y el llamado, la vida del pastor con Dios y con su familia, apacentar con la Palabra, cuidar y visitar al rebaño, acompañar en las crisis y terminar bien; quién ejerce el pastorado queda para la declaración, y las ceremonias, para la especialidad Ministerio pastoral; MacArthur y Hoff), «Administración y gobierno de la iglesia» (el orden como don y mayordomía, las formas episcopal, presbiteriana y congregacional, ancianos, diáconos y equipos, el dinero con controles, planificar y comunicar con Nehemías, y lo legal básico con ejemplos de Texas y la nota de consultar a un abogado o a un contador; quién ejerce cada cargo queda para la declaración; Calderón) y el «Seminario de liderazgo ministerial» (un método de seis pasos para estudiar casos, cuatro casos compuestos, no de personas reales: un desacuerdo con el modelo de Hechos 15, el dinero faltante, un líder que cae y una iglesia que crece, y el plan de ministerio de ocho partes, que puede servir de base para el proyecto final; Sanders y Trull y Carter). Desde el 16 de noviembre salen también «Exégesis de un libro: Romanos» (el método exegético en cinco pasos con un ejemplo resuelto, y la carta sección por sección: el pecado de todos, la justicia de Dios por la fe, la vida en el Espíritu con las dos lecturas de Romanos 7, Romanos 9 a 11 con las lecturas de la elección y del futuro de Israel, y la vida transformada y la misión, con Junias y el ministerio de la mujer por confirmar; Romanos 8:1; Fee, Stott y Moo) y «Teología del avivamiento» (qué es según el artículo 15, los avivamientos de Ezequías, Josías y Esdras y Nehemías, Pentecostés y Hechos, una línea de tiempo de Herrnhut a Valparaíso, el discernimiento con las señales de Edwards de 1741 y el fuego extraño, y cómo buscarlo y sostener sus frutos; las lenguas como señal inicial, por confirmar; Habacuc 3:2; Wallis y Edwards). Las dos siguen el estándar de `docs/academia-auditoria.md`: video en la mitad de las lecciones o más, 2 fuentes básicas y 3 complementarias, no más del 30 % de preguntas de memoria y al menos un 20 % de casos. **El Nivel 5 queda con sus 8 materias** y se abre su integral; el nivel no se cierra hasta que se programen el proyecto final con defensa y el acompañamiento de 2 personas (`REQUISITOS_POR_HACER`). Empiezan las especialidades, con la medida del Nivel 3 y el Nivel 2 completo como requisito (las materias avanzadas piden el Nivel 3): Evangelismo y misiones abre con «Evangelismo personal avanzado» (el corazón del evangelista, el evangelio y sus distorsiones, hablar según la persona, la familia y los amigos, la valentía con oración y formar a otros; renueva el curso Evangelismo 3; Coleman), «Campañas y cruzadas» (la proclamación pública en la Biblia, Whitefield y Wesley en 1739 y las campañas de Billy Graham, preparar una campaña, el mensaje y el llamado sin manipulación, consejeros y seguimiento, y los compromisos de Modesto de 1948; Coleman y González) y «Teología bíblica de las misiones» (avanzada: el Dios que envía, la promesa a Abraham, la gran comisión a todos los pueblos, Antioquía, la estrategia de Pablo y la multitud de Apocalipsis 7:9, con COMIBAM, São Paulo 1987; el orden de los acontecimientos del fin queda para la declaración; Lewis y Escobar), «Misión transcultural» (avanzada: cruzar fronteras culturales con Pedro y Cornelio, el modelo de la encarnación, el evangelio y la cultura con el concilio de Jerusalén, la Biblia en la lengua del corazón con la Biblia del Oso de 1569 y la revisión de Valera de 1602, el misionero y su familia con el choque cultural, y las naciones en la propia ciudad; Lewis y Van Engen) y «Plantación de iglesias» (avanzada: por qué plantar, el plantador y su equipo, conocer el lugar con Nehemías, empezar en las casas con Lidia, formar líderes del lugar y una iglesia que se multiplica; quién ejerce cada cargo queda para la declaración; Clifton y Lewis): la especialidad Evangelismo y misiones queda completa. En la portada, las materias listas de cada especialidad llevan su enlace y su estado. Sale el certificado de especialidad: la página de cada especialidad con sus materias y el avance, el trabajo final (de 300 a 1.200 palabras, 3 entregas, cuenta la mejor; el de Evangelismo y misiones pide un plan de un año que une las cinco materias) y el «Certificado de Especialidad en …» con la nota del promedio de las cinco materias y del trabajo, que también vuelve a mirar la revisión. Empieza Alabanza y adoración, con el Nivel 2 como requisito: «Teología de la adoración» (qué es adorar, Dios en el centro, el tabernáculo, el templo y los salmos, lo que cambió con Cristo, en espíritu y en verdad, y la adoración de toda la vida y la del cielo; Juan 4:23-24; Kauflin y Witt), «El adorador: carácter y vida» (David y el corazón conforme al de Dios, manos limpias y corazón puro, la humildad, la vida devocional, el servicio en equipo bajo los pastores y la adoración en la prueba; Salmos 24:3-4; Tozer y Foster) y «Dirigir el ministerio de alabanza» (el director como siervo, con Quenanías y los directores de cantores, escoger los cantos con cinco preguntas, preparar el culto y el ensayo, dirigir con orden sin manipular, formar el equipo con normas para los menores y los problemas comunes; quién dirige queda para la declaración; Salmos 33:3; Kauflin, Witt y Sanders), «La música en la historia de la iglesia» (Israel, Jesús y la primera iglesia con la carta de Plinio del año 112, Ambrosio, la Regla de san Benito y el canto llano, la Reforma con Lutero y el Salterio de Ginebra de 1562, los himnos de Watts, Charles Wesley, Fanny Crosby, Sankey y Juan Bautista Cabrera, y la calle Azusa en 1906 y la alabanza de hoy; las cifras de himnos, que varían, sin números exactos; Salmos 145:4; González y Burkholder, Grout y Palisca) y «Sonido y técnica al servicio del culto» (Bezaleel y el servicio técnico, el sonido y la sala, los micrófonos y la consola, el acople, los monitores y el volumen pensado en todos, la proyección, la transmisión con privacidad y los derechos de autor con licencias, y la seguridad y el cuidado del equipo; 1 Corintios 14:8; la guía de Yamaha y Kauflin): la especialidad Alabanza y adoración queda completa, con su trabajo final (un plan de un año del ministerio de alabanza que une las cinco materias). Empieza Intercesión y oración, con el Nivel 2 como requisito: «Teología de la oración» (el Dios que oye, al Padre por el Hijo en el Espíritu, la oración y la voluntad de Dios, por qué orar si Dios ya sabe, cuando Dios dice no o espera, y lo que estorba la oración; la oración en lenguas y la sanidad en la expiación quedan para la declaración; Jeremías 33:3; Foster y Bounds), «Intercesión bíblica» (ponerse en la brecha con Ezequiel 22:30, Abraham por Sodoma, Moisés y el becerro de oro, Samuel, Daniel y Nehemías, Cristo nuestro intercesor, y por quiénes y cómo interceder hoy con la discreción de Proverbios 11:13; el intercesor no es mediador; 1 Timoteo 2:1; Sheets y Keller) y «El ayuno bíblico» (qué es, los ayunos del Antiguo Testamento, Jesús y la iglesia de Antioquía, el ayuno que Dios escogió en Isaías 58, cómo ayunar con sabiduría con una nota de salud, y los peligros y los frutos; Isaías 58:6; Piper y Whitney), «Guerra espiritual bíblica y equilibrada» (avanzada: una batalla real contra principados y no contra personas, sin negar al enemigo ni obsesionarse, la victoria de Cristo en la cruz, la armadura de Dios como una vida y no como fórmula, someterse a Dios y resistir al diablo, Jesús y los apóstoles ante los espíritus, con los hijos de Esceva, y los errores: el miedo, la arrogancia, creer toda manifestación y los métodos sin base, como atar espíritus sobre ciudades; no enseña técnicas de liberación, no todo problema es un demonio y quien sirva en esa área lo hace bajo sus pastores; Santiago 4:7; Stott y Anderson) y «La oración en los avivamientos» (qué es un avivamiento, 2 Crónicas 7:14 leído en su contexto, Ezequías, Esdras, Nehemías y Pentecostés, los moravos de Herrnhut en 1727, Edwards, Carey, el pajar de 1806 y la calle Fulton en 1857, Gales en 1904, Azusa en 1906, Pyongyang en 1907 y Valparaíso en 1909, y orar hoy reconociendo los frutos; las cifras que varían se dicen con cautela, y las lenguas y la doctrina del avivamiento quedan para la declaración; Wallis y González): la especialidad Intercesión y oración queda completa, con su trabajo final (un plan de un año del ministerio de intercesión que une las cinco materias y el cuidado de lo que se confía). Empieza Ministerio pastoral, con el Nivel 2 como requisito (las materias avanzadas piden el Nivel 3): «El ministerio pastoral» (avanzada: anciano, obispo y pastor, supervisar sin señorear con Diótrefes como alerta, formar el equipo pastoral con el consejo de Jetro, la disciplina que restaura con Mateo 18, proteger al rebaño con reglas para los que sirven con menores, el dinero contado entre dos y la ley de Texas, y la salud del pastor con Elías; quién ejerce el pastorado queda para la declaración; Hechos 20:28; MacArthur y Trull y Carter), «Consejería pastoral» (avanzada: qué es y los enfoques de Adams, Collins y Crabb presentados con respeto, el método de Jesús con la samaritana como ejemplo resuelto, la culpa verdadera y la falsa, la ansiedad y la tristeza profunda con las señales para buscar ayuda médica y el 988, la reconciliación con los pasos de Sande, y la confidencialidad con sus límites, la obligación de denunciar el abuso de un menor en Texas y cuándo derivar; Isaías 50:4; Hoff y Collins), «Ordenanzas y ceremonias» (las ordenanzas y las ceremonias, con los siete sacramentos católicos, los dos de luteranos y reformados y las dos ordenanzas evangélicas, y el lavatorio de pies de algunas iglesias pentecostales; el bautismo por inmersión paso a paso, con la seguridad en el agua; la Santa Cena con las cuatro maneras de entender la presencia de Cristo; la presentación de niños; la boda con lo que pide la ley de Texas: la licencia del condado, las 72 horas, los 90 días, la devolución en 30 días y las secciones 2.202 y 2.601 del Código de Familia; y el funeral con los casos difíciles; sigue los artículos 8 y 14 de la declaración; 1 Corintios 11:26; Kittim Silva y el Manual del ministro de Vida), «Visitación y cuidado del rebaño» (el buen pastor y el mapa del rebaño, la visita en el hogar paso a paso, la visita al hospital y a los que se mueren, con la sanidad del artículo 11 y la expiación por confirmar, los ancianos, los presos con las reglas de las cárceles y los que están solos, la búsqueda de la oveja perdida y un plan de cuidado con toda la iglesia; Proverbios 27:23; Witmer y Hoff) y «Predicación pastoral» (avanzada: el pastor que predica a su rebaño, un plan de predicación de un año resuelto mes por mes, la predicación en las crisis con el lamento y la esperanza, las ocasiones especiales con un mensaje de funeral de diez minutos, corregir y consolar con la verdad en amor, y el crecimiento del predicador con retroalimentación y honestidad; no repite Homilética I ni II; Hechos 20:27; Stott y Lloyd-Jones): la especialidad Ministerio pastoral queda completa, con su trabajo final (un plan de un año de cuidado pastoral que une las cinco materias). Y la especialidad Niñez, con el Nivel 2 como requisito y ninguna materia avanzada: «Educación cristiana de la niñez» (por qué enseñar a los niños, la familia y la iglesia juntas, Jesús y los niños, los niños que sirvieron a Dios, la enseñanza a los niños en la historia, con el Catecismo Menor de Lutero, el Orbis Pictus de Comenio y las escuelas dominicales de Raikes, y la meta de formar discípulos; Salmos 78:4; Adams y Dembowczyk), «El niño y su fe» (cómo crece la fe por edades, hablar de Dios a cada edad, guiar a un niño a Cristo paso a paso y sin presión, las preguntas difíciles con el bautismo del artículo 8 y las lenguas por confirmar, el niño que ora, adora y sirve, y los niños en situaciones difíciles; Juan 1:12; Machowski y Dembowczyk), «Métodos para enseñar a niños» (las siete leyes de la enseñanza de Gregory, contar historias, preguntas, actividades y juegos, una clase de una hora paso a paso, la disciplina sin humillar y la semana del maestro, con un ejemplo resuelto en cada lección; Nehemías 8:8; Gregory y Hendricks), «Protección de menores» (por qué proteger, los mitos y la realidad, las formas y las señales del abuso y el proceso de manipulación, la política en las cuatro áreas de Keeping Children Safe y la selección de voluntarios en ocho pasos, las reglas de cada domingo con los dos adultos y el registro con etiquetas, qué hacer cuando un niño cuenta algo, con lo que pide la ley en Texas: el reporte inmediato de toda persona, las 24 horas de los profesionales (la ley SB 571 de 2025 bajó el plazo de 48), sin excepción para el clero, la línea 1-800-252-5400 y las secciones 261.101, 261.106 y 261.109 del Código de Familia, y el cuidado de las víctimas con la historia de Tamar; es una guía general, no un consejo legal; Salmos 82:3; el protocolo de la Alianza Evangélica Española y el manual bautista Cómo convertirse en una iglesia que cuida bien de los abusados) y «Organizar el ministerio infantil» (la misión, la visión y los valores, el equipo con el consejo de Jetro, los grupos por edad, las salas y el horario, el currículo en ciclos y el calendario del año, la Escuela Bíblica de Vacaciones y el seguimiento de las familias, y el presupuesto y la evaluación con metas; Habacuc 2:2; Pabón y Adams): la especialidad Niñez queda completa, con su trabajo final (un plan para el ministerio de niños de la iglesia que une las cinco materias). Y la especialidad Juventud, con el Nivel 2 como requisito y la consejería como materia avanzada: «Discipulado de jóvenes» (por qué discipular y no solo entretener, los ocho principios de Coleman, Pablo y Timoteo, los grupos pequeños y la mentoría, las disciplinas del joven discípulo y el camino de discipulado; 1 Timoteo 4:12; Coleman y Fields), «Cosmovisión cristiana y cultura» (la historia de la Biblia en cuatro actos, las cosmovisiones de hoy con lo que tienen de verdad y lo que les falta, la identidad en Cristo con la sexualidad según el artículo 14, las redes y un acuerdo familiar de tecnología, el discernimiento del entretenimiento y cómo responder con verdad y amor; Colosenses 2:8; Wolters y McLaughlin), «Consejería juvenil» (avanzada: el consejero y la adolescencia, una conversación paso a paso, la ansiedad, la tristeza y el riesgo de suicidio con la línea 988, las familias sin tomar partido, la sexualidad, el noviazgo y las adicciones con la línea de SAMHSA, 1-800-662-4357, y los límites de la confidencialidad, el deber de reportar en Texas y la derivación; no reemplaza la atención profesional; Proverbios 20:5; McDowell y Hostetler, Clinton y Clark), «Liderazgo juvenil» (David, Daniel y Ester, liderar sirviendo, el carácter antes que el talento, el equipo con la segunda oportunidad de Marcos, la reunión de jóvenes y la charla, y los campamentos seguros y la sucesión; los cargos quedan para la declaración; Josué 1:9; Leys y Fields) y «Evangelismo entre jóvenes» (el mapa de amigos, el evangelio en cuatro partes y el testimonio de dos minutos, la amistad sin manipular, la luz en la escuela con la Ley de Igualdad de Acceso de 1984, confirmada por la Corte Suprema en 1990, la noche de amigos con su seguimiento y la perseverancia ante el rechazo; 1 Corintios 9:22; Coleman y Pippert): la especialidad Juventud queda completa, con su trabajo final (un plan de un año del ministerio juvenil que une las cinco materias). Y la especialidad Familia y consejería, con el Nivel 2 como requisito y tres materias avanzadas, que piden el Nivel 3: «Consejería matrimonial» (avanzada: el matrimonio según Dios y el lugar del consejero, la consejería prematrimonial, la comunicación y los conflictos, la infidelidad y la restauración, la violencia en el hogar con la Línea Nacional sobre la Violencia Doméstica, y los matrimonios en cada etapa; Mateo 19:6; Keller y Keller, Clinton y Trent), «Consejería familiar» (avanzada: la familia según Dios y el consejero familiar, la crianza con amor y con límites, los adolescentes y los hijos adultos, las familias ensambladas y los que crían solos, las crisis con lo que dice USCIS de los notarios, y el perdón y la reconciliación; Malaquías 4:6; Clinton y Trent, Tripp), «Duelo y crisis» (el duelo y sus reacciones, el ministerio de la presencia, los duelos difíciles y el duelo prolongado, los niños y el duelo, la primera ayuda psicológica de la OMS y la esperanza con el cuidado del que consuela; Salmos 34:18; Wright, Lewis), «Adicciones y restauración» (avanzada: qué es una adicción según NIDA y según la Biblia, la familia y los límites con amor, el camino de la restauración, las recaídas y la gracia, la pornografía, el juego y las pantallas, y la iglesia que restaura con la línea de SAMHSA y la naloxona; Juan 8:36; Baker, Clinton y Hawkins) y «Ética y límites del consejero» (los límites del consejero y el Código de Ocupaciones de Texas, la confidencialidad y lo que se reporta en Texas, los límites con el otro sexo y el Código Penal, el poder del consejero y la política de consejería, la derivación y el cuidado del consejero; 2 Corintios 8:21; Collins, Hoff): la especialidad Familia y consejería queda completa, con su trabajo final (un plan de un año para un ministerio de familia y consejería que une las cinco materias). Y la especialidad Capellanía, con el Nivel 2 como requisito y dos materias avanzadas, que piden el Nivel 3: «Fundamentos de la capellanía» (qué es la capellanía y dónde sirve, el ministerio de la presencia, servir a personas de todas las creencias, el llamado, el aval y la formación con la certificación de la Asociación de Capellanes Profesionales, la visita paso a paso y el capellán dentro de la institución; Mateo 25:36; Rivera Miranda, Heise), «Capellanía hospitalaria» (avanzada: el enfermo y el equipo del hospital, orar por los enfermos según el artículo 11, con la expiación por confirmar, la privacidad con la ley HIPAA, el que muere y su familia con los cuidados paliativos, el hospicio y el capítulo 166 del Código de Salud y Seguridad de Texas, las pérdidas de los niños y de las madres, y las decisiones difíciles con el cuidado del personal; Salmos 41:3; Rivera Miranda, Heise), «Capellanía penitenciaria» (avanzada: la cárcel y el preso, el evangelio tras las rejas con la ley RLUIPA, Cutter v. Wilkinson de 2005 y los voluntarios del TDCJ, la culpa, el perdón y la justicia sin olvidar a las víctimas, las familias de los presos con Angel Tree, la prudencia y los límites, y el regreso a la comunidad; Hebreos 13:3; Rivera Miranda, Heise), «Emergencias y desastres» (el capellán en las emergencias sin ir por su cuenta, como pide FEMA, la primera ayuda psicológica de la OMS, la fe en medio del desastre con la torre de Siloé, el aviso de una muerte con los cinco principios del manual de Iowa, los niños y los más vulnerables con los CDC, y el cuidado del que cuida con la guía Listo y la línea de SAMHSA para los afectados por catástrofes; Salmos 46:1; Wright y la guía de la OMS) y «Marco legal y ético del capellán» (la Primera Enmienda con Katcoff v. Marsh de 1985 y la regla de realizar o facilitar, lo que se le cuenta al capellán con la regla 505 de las Reglas de Evidencia de Texas y los deberes de reportar, la integridad, los registros y las redes, el aval, la supervisión y el código de ética de la Asociación de Capellanes Profesionales, y cuando la ley y la conciencia chocan; Hechos 24:16; Trull y Carter, Rivera Miranda): la especialidad Capellanía queda completa, con su trabajo final (un plan de un año para un ministerio de capellanía que une las cinco materias). Y la especialidad Comunicaciones y medios, con el Nivel 2 como requisito: «Evangelismo en redes» (el evangelio en la plaza digital con los datos de Pew, conocer a la gente que está en las redes, el contenido que edifica, de la pantalla a la mesa, la política de redes de la iglesia con la ley COPPA, y medir con sabiduría; Mateo 10:27; Coleman, Pippert), «Radio cristiana» (la radio al servicio del evangelio desde KDKA y HCJB, la voz y el micrófono, la programación, la música y los derechos de autor con ASCAP, BMI, SESAC, GMR, SoundExchange y CCLI, la radio al aire con las reglas de la FCC para las emisoras no comerciales y las LPFM, y los oyentes; Romanos 10:17; Kaplún, López Vigil), «Video y transmisiones» (el video al servicio del evangelio, contar historias con imágenes, la cámara y la luz, la transmisión del culto, los derechos y los permisos con la licencia de CCLI y las reglas de YouTube, y editar y publicar con propósito; 1 Juan 1:3; Martin, McKee), «Redacción y comunicación» (la palabra escrita al servicio del evangelio, escribir claro en la línea de la Ley de Redacción Clara de 2010, los anuncios, los boletines y los mensajes, escribir una historia o un artículo, hablar en público y comunicar en una crisis; Colosenses 4:6; Cassany, el Libro de estilo de la RAE) y «Ética y seguridad digital» (la ética del comunicador cristiano con lo que pide la FTC, la privacidad y la dignidad con la ley COPPA, las cuentas seguras con los cuatro pasos de la CISA, las estafas con la alerta del Fiscal General de Texas sobre los pastores falsos, la inteligencia artificial y la verdad con la decisión FCC 24-17 de 2024, y moderar y proteger con la línea de Texas y la CyberTipline; Mateo 10:16; Restrepo, Véliz): la especialidad Comunicaciones y medios queda completa, con su trabajo final (un plan de un año para el ministerio de comunicaciones que une las cinco materias). Y la especialidad Liderazgo y administración, con el Nivel 2 como requisito y el marco legal como materia avanzada, que pide el Nivel 3: «Administración eclesiástica» (la administración al servicio del reino con el diagnóstico de las áreas, los registros y el archivo con los 4 años que el IRS pide para la nómina, las reuniones con agenda, quórum y acta, el templo y los bienes, los riesgos y los seguros con la compensación laboral de Texas, y los procesos y el manual; Proverbios 24:3; Calderón y Drucker), «Finanzas y transparencia» (los principios y la política financiera, el presupuesto, los controles internos con la regla de los dos, las ofrendas y sus recibos con el reconocimiento escrito de las donaciones de 250 dólares o más de la Publicación 1771, los informes y la revisión, y el sostén del pastor y de los empleados; 2 Corintios 8:20; Figueroa y Calderón), «Equipos y voluntarios» (el cuerpo que sirve y el ciclo del voluntario, invitar y ubicar, seleccionar con cuidado, capacitar y acompañar, cuidar, reconocer y renovar, y las leyes que tocan a los voluntarios: la Ley de Protección del Voluntario de 1997, el capítulo 84 de Texas y el reporte del abuso, de inmediato, y a más tardar en 24 horas los profesionales; 1 Pedro 4:10; Lencioni y Drucker), «Planificación y proyectos ministeriales» (planificar con fe, la misión, la visión y los valores, las metas SMART de Doran de 1981 y el plan del año, un proyecto de principio a fin según la guía PMBOK, el cronograma, los riesgos y el presupuesto del proyecto, y evaluar y aprender; Proverbios 16:9; Warren y Blackaby) y «Marco legal de las organizaciones religiosas» (avanzada: la iglesia y el Estado con la Primera Enmienda, el capítulo 110 de Texas y la enmienda Johnson, que sigue vigente, la forma legal con el Formulario 202 y el capítulo 22 del Código de Organizaciones Comerciales, los impuestos con la Publicación 1828, el AP-209 y la sección 11.20 del Código Tributario, la iglesia como empleador con Hosanna-Tabor de 2012, Our Lady of Guadalupe de 2020 y la sección 702 del Título VII, la responsabilidad y la protección con la sección 261.101 del Código de Familia, sin excepción para el clero, y la propiedad con la ley RLUIPA y la exención del título III de la ADA; es una guía general, no un consejo legal; Mateo 22:21; Calderón y Trull y Carter): la especialidad Liderazgo y administración queda completa, con su trabajo final (un plan de un año para poner en orden la administración de la iglesia que une las cinco materias). Y la especialidad Obra social y misericordia, con el Nivel 2 como requisito: «Teología de la compasión» (el Dios que ve al necesitado y los cuatro vulnerables de la ley, la espiga y el año de remisión, los profetas y la justicia, la compasión de Jesús, el buen samaritano, la primera iglesia y los pobres, y la misión integral con el Pacto de Lausana de 1974 y el alivio, la rehabilitación y el desarrollo de Corbett y Fikkert; Lucas 6:36; Keller y Padilla), «Diaconía y servicio» (la diaconía como servicio, el equipo de buen testimonio de Hechos 6, el fondo de ayuda con reglas escritas, pago directo y registro, y la Publicación 526 del IRS, el cuidado práctico, escuchar y orientar con el 2-1-1 de Texas y el reporte del abuso, de inmediato, y a más tardar en 24 horas los profesionales, y el corazón del que sirve; Santiago 1:27; Keller y Smethurst), «Proyectos comunitarios» (buscar el bien de la ciudad, conocer la comunidad por sus recursos como Kretzmann y McKnight, diseñar el proyecto con los vecinos distinguiendo lo que hacemos de lo que cambia, la despensa con la ley Bill Emerson y la Ley del Donante de Buena Fe de Texas, la tutoría con voluntarios revisados, los recursos y la sostenibilidad, y medir y celebrar el cambio; Jeremías 29:7; Corbett y Fikkert y Padilla y Yamamori), «Ayuda humanitaria y desastres» (las etapas de un desastre, los cuatro principios humanitarios de la ONU de 1991 y 2004, el Manual Esfera de 2018 con los 15 litros de agua por persona y por día, las donaciones que ayudan según FEMA y la Publicación 3833 del IRS, la coordinación con las cuatro C de National VOAD y la recuperación, y prepararse y recibir al que huye; Lamentaciones 3:22-23; la Asociación Esfera y Carter) y «Voluntariado y alianzas» (servir junto a otros, las alianzas con otras iglesias, con escuelas, negocios y organizaciones y con el gobierno según la regla federal de 2024, que separa las actividades explícitamente religiosas, los voluntarios de la comunidad y el cuidado de la alianza; es una guía general, no un consejo legal; Eclesiastés 4:12; Blackman y Padilla y Yamamori): la especialidad Obra social y misericordia queda completa, con su trabajo final (un plan de un año para el ministerio de obra social y misericordia de la iglesia que une las cinco materias). Y la especialidad Estudios bíblicos avanzados, con el Nivel 2 como requisito y tres materias avanzadas, que piden el Nivel 3: «Romanos: su teología y su historia» (avanzada, sin repetir la Exégesis de un libro: Romanos del Nivel 5: la ocasión de la carta, escrita desde Corinto hacia el año 57, con la expulsión de los judíos bajo Claudio, la justicia de Dios y Habacuc 2:4, las palabras de la salvación, la carta en la historia de la iglesia con Agustín en el 386, Lutero en Wittenberg en 1515 y 1516 y Wesley el 24 de mayo de 1738, los debates con la nueva perspectiva de Sanders, Romanos 7 y Romanos 9 a 11, y Romanos en la iglesia de hoy; Romanos 3:23-24; Ridderbos y Bruce + Wright y González), «Hechos: la misión de la iglesia primitiva» (avanzada: Lucas historiador y teólogo, con los pasajes en nosotros y Galión, procónsul de Acaya hacia el 51 y el 52, el plan de Hechos 1:8 y los seis resúmenes, Pentecostés y los relatos del Espíritu, con la lectura pentecostal y la de otras iglesias, el concilio hacia el 49, los tres viajes de Pablo hacia el 46 al 48, el 49 al 52 y el 53 al 57, y los juicios hasta Roma hacia el 60 al 62; Hechos 5:42; Bruce y González + Keener y Menzies), «Daniel y Apocalipsis» (avanzada: la literatura apocalíptica, Daniel en Babilonia desde el 605 a. C. con las dos posturas sobre su fecha, sus visiones, los cuatro reinos y las setenta semanas, Cristo y las siete iglesias, el Apocalipsis hacia el 95 o antes del 70, las cuatro escuelas de lectura y las posturas sobre el milenio y el rapto, presentadas sin escoger, y la nueva creación; Daniel 7:14; González y González y Carballosa + Pate y Bock), «Geografía e historia bíblica» (las cinco franjas de la tierra, con el mar Muerto a unos 440 metros bajo el nivel del mar, las dos fechas del éxodo, el reino dividido en el 931 o 930, Samaria en el 722 y Jerusalén en el 587 o 586, el regreso con Ciro desde el 539, el tiempo entre los testamentos y el mundo romano; Hechos 17:26; Beitzel y Bruce + LaSor, Hubbard y Bush, y Russell) y «Trasfondo y arqueología bíblica» (la arqueología y sus límites, los hallazgos del Antiguo Testamento, de Merneptah a Ketef Hinom, los manuscritos del mar Muerto desde 1947 y el texto de la Biblia, la vida diaria, el mundo religioso judío y los hallazgos del Nuevo Testamento, de la piedra de Pilato a Betesda y Siloé; Isaías 40:8; Gower y Price + Bruce y García Martínez, y Keener): la especialidad Estudios bíblicos avanzados queda completa, con su trabajo final (un plan de un año de estudio bíblico profundo que une las cinco materias), y con ella las doce especialidades. Los requisitos de los Niveles 3 a 5 ya se registran (la práctica, la enseñanza grabada, la consolidación, el sermón con su rúbrica, el proyecto final con su defensa ante 2 profesores y el acompañamiento con los mentores): los cinco niveles se pueden cerrar completos |
| A7 · Más especialidades y extras | Avisos (con permiso), lectura sin conexión, ceremonia y segunda opinión con IA (con permiso, por su costo) | |
