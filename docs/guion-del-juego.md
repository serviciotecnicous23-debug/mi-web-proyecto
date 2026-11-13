# El aprendiz del templo · Jerusalén en línea — el guión del juego

Noviembre de 2026. Este documento cuenta el juego completo, de principio a fin: qué vive un jugador el primer
día, la primera semana, la temporada y el año; cómo funciona el calendario que lo hace avanzar solo, y cómo se
agregan eventos nuevos en las actualizaciones.

## 1. La idea en una frase

Un joven de Jerusalén aprende a servir en el templo, construye su casa en un barrio con otros jugadores y vive
el año de Israel al ritmo del calendario real: las fiestas, las estaciones, la lluvia y la cosecha llegan solas,
el mismo día para todos.

## 2. Los dos modos

| Modo | Para quién | Qué es |
|---|---|---|
| **El aprendiz del templo** (historia) | Cualquiera, sin cuenta | El camino del aprendiz por jornadas: deberes del templo, logros, la comunidad y las generaciones. Se guarda en el teléfono. |
| **Jerusalén en línea** | Cuentas aprobadas del ministerio | La ciudad compartida: casa, barrio, mercado, concurso, encargos, temporadas y el año de Jerusalén. Todo lo cuenta el servidor. |

## 3. De principio a fin: lo que vive un jugador

### El primer día
1. **La portada**: el templo animado y la invitación a entrar.
2. **El personaje**: elige su nombre (o el de un sacerdote de la Biblia, con su cita) y su camino: el
   sacerdocio, la profecía o la realeza.
3. **Los primeros pasos**: lo que enseña el instructor; cada camino tiene los suyos (+50 de mérito).
4. **El templo**: los deberes (ofrendas, leña, aceite, panes, incienso…) dan mérito de temporada y gozo.
5. **La ciudad**: entra a Jerusalén y recibe su **tienda** en un barrio. La gente de la calle le habla, los
   siervos le cuentan chismes y le dejan un recado.
6. **Para hoy**: la lista de lo que conviene hacer hoy: la racha, lo que se celebra, la estación, los encargos.
7. **Su mentor**: quien acaba de llegar elige un mentor (un vecino o un amigo con experiencia) para sus primeros
   días (ver «Los primeros días con un mentor»).

### Los primeros días con un mentor
`shared/mentores.ts`, `server/mentores.ts`, `MentoresUI.tsx` (en *Misiones → Mentores* y en su propia ventana):
- **Quién elige mentor**: una cuenta aprobada en sus primeros 14 días en Jerusalén que todavía no cumplió más de 3 de
  los pasos de siempre (si ya conoce la ciudad, mejor que sea mentor). Lo elige entre los vecinos de su barrio y sus
  amigos; el juego pone primero al sugerido (en línea, vecino y amigo, del mismo camino, el que ya guió a más).
- **Quién puede ser mentor**: quien terminó sus primeros pasos, aprobó un estudio, jugó 3 días y no está haciendo sus
  propios pasos. Acompaña a 3 aprendices a la vez y puede apagar «Recibir aprendices nuevos».
- **Los seis pasos** (los decide el servidor con lo que ya guardan otras tablas): 🔥 el primer servicio, 📜 los primeros
  pasos de su camino, 🤝 encontrarse con su mentor en la ciudad, 📚 el primer estudio, 🧱 la primera obra de su casa y
  📅 tres días en Jerusalén.
- **Encontrarse**: los dos en la ciudad, a 6 m o menos (el servidor mira dónde están de verdad), una vez por día. El
  mentor le enseña un dicho de los ancianos que le falte (y el aprendiz, si sabe uno que al mentor le falte, se lo
  enseña a él).
- **El premio**: cada paso da 15 de gozo al aprendiz y 10 al mentor (los que ya había cumplido antes de elegir mentor
  quedan marcados, sin gozo). Con los seis, 50 y 80 más, el **manto de Elías** para los dos (el que Elías echó sobre
  Eliseo cuando lo llamó, 1 Reyes 19:19) y el título «Idóneo para enseñar» para el mentor (2 Timoteo 2:2). Un mentor
  gana gozo hasta por 10 aprendices.
- **Juntos en la ciudad**: el nombre del mentor y de los aprendices lleva su marca (🎓 / 🌱) y se ve desde más lejos;
  se puede ir adonde está el otro, invitar a que venga y encontrarse. Un aprendiz puede cambiar de mentor dos veces; un bloqueo
  deshace el lazo.

### Cada día (el bucle diario)
| Momento | Qué hace | Qué gana |
|---|---|---|
| Al entrar | Mira «Para hoy» y la fecha del marcador (abre el calendario) | Sabe qué trae el día |
| Al volver después de días | Recibe su regalo de regreso y ve qué hizo su barrio mientras no estaba | Gozo, semillas de la estación y, tras una semana, el mejor vestido |
| En el templo | Cumple sus deberes | Mérito, gozo y su **racha de servicio** |
| Encargos del día | 3 encargos distintos según su camino (y **uno más los días de fiesta**, con el doble de gozo) | Mérito, gozo y puntos para la copa del barrio |
| El huerto | Sale por la puerta del fondo de su casa: ara, siembra trigo (40 min), cebada (25 min) u olivos (60 min), saca agua del pozo y riega, arranca las malas hierbas, espanta las aves, abona y siega; lleva las gavillas al granero y cumple las 3 tareas del huerto del día | Harina y aceite para el alfolí (más con cada estrella de cuidado) y gozo |
| El horno | Prepara tortas y aceite puro con lo del alfolí | Ofrendas mejores para el templo |
| El mercado | Vende lo que le sobra al mercader (que busca más lo que escasea en la estación) | Gozo para muebles, ropa y adornos |
| Las obras de su casa | Empieza una obra con su gozo y la harina del huerto (cisterna, horno, granero, pórtico…); los obreros trabajan aunque no esté | Una casa que se ve en la ciudad, sus estrellas y la foto para compartir |
| La calle de los siervos | Cumple el recado del día | Gozo y la historia de la semana |
| La puerta de la ciudad | Se sienta con los ancianos a escuchar el dicho del día (Proverbios) | Gozo y un dicho más en el álbum |
| El barrio | Bendice casas, ayuda a vecinos, va a reuniones, acompaña a los nuevos | Gozo, encargos y la ofrenda del barrio |
| Las clases en el aula | La sección de un estudio, su examen final o la cátedra del maestro de su camino (8 lecciones por día) | Mérito, gozo, estudios aprobados para siempre y el grado de la cátedra |
| «¿Quién es sabio?» | 15 gradas de preguntas en el estudio de TV, con comodines, duelos y la noche de los sabios en grupo | Gozo, trajes de sabio y las tablas por partida |
| El patio de los juegos | Juega en grupo (de 2 a 12) con tus amistades y la gente de tu barrio: esgrima bíblica, las doce tribus, «¿Quién soy?», la carrera de Ahimaas y el muro (capítulo 9) | Gozo (hasta 60 por día), la copa del barrio, prendas y logros |
| De noche | Antorchas, ventanas encendidas y la hora de las trompetas de la luna nueva | ×1,5 de mérito de 7 a 9 |

### «¿Quién es sabio?»: el concurso, la duda y la noche de los sabios
La casa de la sabiduría (frente a la cámara de los sacerdotes) abre el concurso: 15 gradas, de fácil a experto, con su
reloj, cuatro comodines, llamadas a un amigo de verdad, público que mira y aplaude, y duelos de dos.
- **La última palabra**: al confirmar, las luces bajan, cae un foco sobre el atril y suena un redoble; la respuesta
  elegida queda en ámbar. El suspenso crece con la grada (`suspensoMs`: 1,5 s en la primera, 4 s en la última). Al
  revelar: verde con destellos dorados, o rojo con apagón.
- **La duda con Etán** (`tocaDuda`, `fraseDeDuda` en `shared/sabio.ts`): al elegir, a veces la cámara corta a los dos
  frente a frente y luego a Etán de cerca, con un latido de fondo: «¿Es tu respuesta final?». Sale cada 2 o 3 preguntas
  (al azar), siempre en las gradas 5 y 10 y desde la 11, y cuando quien juega ya usó más del 60 % del reloj. El
  servidor lo decide al mostrar la pregunta, así que **nunca depende de la respuesta**. Mientras Etán habla el reloj se
  detiene: el servidor devuelve esos 5 segundos (`POST /sabio/duda`, una vez por pregunta). Las frases están en
  `FRASES_DUDA`; para agregar una, basta una fila nueva (con `cuando: "segura"` o `"alta"` si es de esas gradas).
- **Las tablas por partida** (`GET /sabio/tablas?de=hoy|semana|siempre|mias`): cada partida terminada, no solo la mejor
  de cada persona: el puesto, el nombre, la grada en que quedó, los puntos, el tiempo, los comodines y cómo terminó. Más
  puntos primero y, si empatan, menos tiempo. Tu fila resaltada y tu puesto aunque estés más abajo de los diez primeros.
  El premio de la semana sigue siendo por persona (su mejor partida).
- **La noche de los sabios** (`shared/sabio-noche.ts`, `server/sabio-noche.ts`, `SabioNoche.tsx`): una sala de 3 a 12
  personas con un código de seis letras y la invitación por la red de la ciudad (solo cuentas aprobadas y sin
  bloqueos). Quien abre la sala la empieza. Son 12 preguntas, de la grada 1 a la 12, de 20 s, y todos responden a la
  vez: 100 puntos más la rapidez. Después de cada pregunta, la tabla en vivo con los puestos que suben y bajan; al final,
  el podio de los tres primeros en el estudio. Gozo 20/15/12 y 6 para los demás (dentro del tope de 150 del concurso,
  si respondiste al menos la mitad), puntos para la copa del barrio y 6 noches por día. Quien no juega puede mirarla
  desde «En vivo».

### La semana
- **Los capítulos de la temporada**: cada semana avanza la historia de la temporada, con una meta de toda la
  ciudad. Cada capítulo trae sus recados, sus chismes, lo que se ve en la ciudad y su premio; al final, la fiesta
  en la plaza con la gran alabanza en vivo.
  - Temporada 1, **la amenaza de Senaquerib** (2 Reyes 18–19): reparar el muro y alzar las torres, cavar el
    conducto al estanque de Siloé, las palabras del Rabsaces y la oración del rey, y la liberación.
  - Temporada 2, **la gran Pascua de Ezequías** (2 Crónicas 29–31), del 7 de diciembre al 3 de enero: las puertas
    abiertas (la ciudad limpia el templo y los levitas llevan lo inmundo al Cedrón), el cántico de Jehová (los
    cantores y las trompetas en la escalinata), las cartas del rey (el correo pregona en la puerta y llegan
    peregrinos al monte; también se invita a un amigo) y la gran Pascua (se quitan los altares de Acaz). La fiesta:
    «el gran regocijo», del 1 al 3 de enero.
- **La ofrenda del barrio**: una meta de deberes entre todos los vecinos; la copa de los barrios premia a los
  tres primeros.
- **El día de reposo** (cada sábado): no rompe la racha, el servicio vale ×1,1 y su encargo es ir a una
  reunión.

### La temporada (28 días)
- El mérito de la temporada ordena a los sacerdotes: **sacerdote → sacerdote de turno (150 de mérito) → jefe
  de un turno (12) → principal sacerdote (3) → sumo sacerdote (1)**; cada escalón pide su examen de rango (ver «Los
  exámenes de rango») y los más altos, además, sus estudios y el repaso de cada temporada.
- La casa crece con la honra: **tienda → casa de adobe → casa de piedra con patio → casa con aposento alto**, y se
  edifica con el gozo: las obras de la casa (capítulo 7) y sus estrellas.
- Al cerrar, empieza otra temporada. Las historias van en `PROGRAMA` (`shared/capitulos.ts`): una nueva se
  agrega con la temporada en que empieza (siempre una que todavía no empezó); después de la última, se turnan
  todas en orden (la temporada 3 vuelve a contar la de Senaquerib, la 4 la Pascua…).
- Lo que la ciudad levantó en una historia se queda cuando se cuenta otra: las torres y el conducto de Siloé
  siguen en pie en la temporada 2 (solo si se terminaron). Cuando la historia vuelve a contarse, se levanta de
  nuevo.
- En el álbum, cada historia es una colección con su título: sus cinco prendas (una por capítulo cumplido y la de
  la fiesta) dan «Atalaya de Sion» (Senaquerib) o «De un solo corazón» (la Pascua).

### Las clases en el aula
Cada edificio tiene su aula, una sala en 3D con su maestro al frente, su atril, un gran rollo colgado en el muro y
bancos con compañeros que tienen nombre (las familias del pueblo y los aprendices). Por las ventanas entra la luz y
alumbran las lámparas de aceite. Está en `client/src/games/templo/aula/` (la escena en `escena.ts`, el guion de cada
clase en `clases.ts` y su director en `director.ts`), la pantalla en `AulaUI.tsx` y los datos en `shared/aula.ts`.

| Aula | Edificio | Maestro | Compañeros |
|---|---|---|---|
| El aula de Isaías | La escuela de los profetas (adobe) | Isaías; Miqueas de Moreset da los oficios del profeta | Miriam, Jabes, Ana, Simeón, Josías, Débora, Asaf y Obed |
| La cátedra de Eleazar | La cámara de los sacerdotes (piedra) | Eleazar | Itamar, Elcana, Hanán, Finees, Ezer, Ahimaas, Abner y Matán |
| La sala de los escribas | El palacio del rey (cedro, con pupitres) | Eliaquim | Joa, Rebeca, Gedeón, Raquel, Booz, Tamar, Jonatán e Isaí |

- **Se entra** por la estación de los estudios («Estudios y exámenes») o la de la cátedra de cada edificio, o desde la
  ventana de los estudios con «A clase». Un estudio se da en el aula de su camino (los «para todos», en la del camino
  de quien estudia).
- **La clase de una sección**: el maestro la enseña en 3 a 5 burbujas (la lectura, sus versículos y la idea clave) y
  la escribe en el gran rollo; después pregunta la práctica una por una, revuelta, con el reloj (45 s). Si se acierta,
  felicita y la clase aplaude; si no, tacha la opción y explica con el versículo, y se vuelve a elegir. Al final, la
  nota con su medalla (oro: todas a la primera).
- **El examen final**: el servidor da las 6 preguntas sin la respuesta; se contestan una por una (60 s cada una), se
  entregan juntas y después el maestro las revisa una por una. La última, con el suspenso de «¿Quién es sabio?»: la
  luz baja, la cámara se acerca, el redoble y el latido. La nota con su medalla (oro 6 de 6, plata aprobado, bronce si
  faltó una).
- **La cátedra**: la enseñanza corta, la pregunta (45 s) y la corrección del servidor con su cita, lección tras
  lección hasta las 8 del día; la última del día, con suspenso. Al final, lo aprendido y el grado.
- Los compañeros levantan la mano, asienten, cuchichean, aplauden, contienen el aliento y se ponen de pie al aprobar;
  dicen frases cortas y fijas. Los sonidos (la campanilla, la pluma, el murmullo, las palmas, el redoble) están en
  `aula/aula-sonido.ts` y se pueden apagar.
- Las reglas del servidor no cambian: nada llega antes de tiempo. En el examen de los estudios, cada pregunta tiene su
  propio orden de opciones (`server/orden-examen.ts`): antes la buena caía en la misma letra en todo el examen.

### Los exámenes de rango
Cada camino tiene cinco escalones y, para cada escalón del 2 al 5, un examen propio sobre lo que debe saber ese rango
(`shared/examenes-rango.ts`; las 423 preguntas, con su cita RVR1960 literal, están SOLO en el servidor:
`server/examenes-rango-banco.ts`, generado y comprobado desde los bancos de la sesión del aula). Se da en el aula del
camino, con el maestro (`aula/clases.ts`, `claseRango`, y la sección del menú en `RangoUI.tsx`).

| Escalón | Partes | Preguntas por parte | Se aprueba con | Premio (una vez) |
|---|---|---|---|---|
| 2 (de turno, vidente, escriba del rey) | 3 | 6 | 5 | 40 de mérito y 30 de gozo |
| 3 (jefe de un turno, anciano de la escuela, oficial del rey) | 3 | 7 | 6 | 60 y 50 |
| 4 (principal, profeta del rey, consejero del rey) | 4 | 7 | 6 | 80 y 80 |
| 5 (sumo sacerdote, varón de Dios, canciller del rey) | 4 | 8 | 7 | 100 y 120 |

- **Por partes**: cada parte se da cuando uno quiere y queda guardada. El servidor manda las preguntas de a una, sin la
  respuesta, con las opciones en su orden (`server/orden-examen.ts`), y lleva el reloj (40 s): la que se responde tarde,
  o la que se dejó y venció, cuenta como mala. Si se falla, hay que esperar 15, 30 y después 60 minutos, y vuelve con
  preguntas que todavía no salieron. El examen N pide el N−1.
- **De corrido**: todas las partes a la primera en menos de 3 horas: el sello ⭐ y 20 de gozo más. Sin obligar.
- **Lo que abre**: el examen 2, ser «de turno» con 150 de mérito; el 3, el 4 y el 5, poder recibir su cargo al cerrar
  la temporada (`cerrarTemporada`, `can_jefe`, `can_mid` y `can_high` en `server/jerusalen.ts`). Cada uno da su prenda
  (`exclusivo: "rango"`, colección «Las prendas de los rangos», título «Diligente en la Palabra»), y con el 3 se enseña
  en las reuniones: quien va gana 2 de gozo más.
- **El repaso de la temporada**: los cargos altos (principal y sumo) piden el saber al día: el examen 4 o 5 aprobado en
  esa temporada, o un repaso de 6 preguntas (se aprueba con 5) de los bancos 4 y 5.
- **Los avisos**: lo que falta sale en «Para hoy» y en la ventana de la temporada, con un botón al aula.

### El año (el calendario real)
El año no se acaba: cada día real es un día en Jerusalén. Las fiestas de Levítico 23 caen en su fecha hebrea
real; la Navidad, el año nuevo y la Semana Santa en su fecha civil; las seis estaciones de la tierra de Israel
cambian el huerto, el mercado, el cielo y lo que dice la gente.

### El registro de cada jugador
Cada persona tiene su **registro** («📜 Su registro», `shared/registro.ts`, `server/registro.ts`, `RegistroUI.tsx`):
todo lo que ha hecho, sin datos personales. Se abre al visitar su casa, en su ficha de vecino, en «Tu casa» (el
mío) y tocando su nombre en las tablas (la temporada, el concurso y los vecinos del barrio). Tiene cinco partes:
- **Servicio**: cada personaje con su escalón, el mérito y el puesto en su camino, y sus cargos.
- **Estudios**: los aprobados (con su nota), los empezados, la instrucción y el grado de cada cátedra.
- **Juegos**: «¿Quién es sabio?» con sus últimas partidas (la grada en que quedó, los puntos, el tiempo y cómo
  terminó), los duelos, el concurso y los consejos.
- **Casa y barrio**: la casa con sus estrellas y obras, y lo que hizo por su barrio y la ciudad.
- **Logros**: las medallas y el álbum con sus colecciones.

Lo recuerda el servidor un minuto, y con un bloqueo de por medio no se ve.

## 4. El calendario de Jerusalén (lógica fija)

Todo sale de `shared/anio.ts`, que usa el calendario hebreo del navegador y del servidor (`Intl`, sin tablas
que haya que actualizar) y la hora de Texas (`America/Chicago`). El servidor y los teléfonos calculan lo mismo,
así que nadie puede adelantar el reloj.

### Las seis estaciones
| Estación | Meses hebreos | Lluvia | Crece más rápido | Mercado |
|---|---|---|---|---|
| 🍇 La fiesta de la cosecha | Etanim | poca | los olivos | sobra aceite |
| 🌱 La lluvia temprana y la siembra | Bul | a veces | — | sobra aceite |
| 🌧️ El invierno de las lluvias | Quisleu, Tebet, Sebat | seguido (todo crece ×1,15 más lento) | — | escasean la harina y los corderos |
| 🌾 La lluvia tardía y la siega de la cebada | Adar (y Adar segundo), Abib | a veces | la cebada | sobran corderos |
| 🌾 La siega del trigo | Zif, Siván | casi nunca | el trigo | sobra harina |
| ☀️ El verano: higos y uvas | mes cuarto, mes quinto, Elul | nunca | — | escasea el aceite |

- **La lluvia** se sortea por día con una semilla fija (la misma para todos): si llueve el día en que se
  siembra, la parcela queda regada (crece más rápido y da uno de más). Como ya está decidida, el calendario da
  **el pronóstico de mañana** y la gente de la calle lo comenta.
- En la ciudad se ve la lluvia, el cielo gris y, en invierno, los braseros encendidos; en la siega de la cebada
  caen **pétalos de almendro** (Jeremías 1:11) y en Navidad y año nuevo hay **lámparas en las calles**.

### La ropa de cada tiempo
Cada estación y cada fiesta grande trae su prenda, que solo se vende en esos días (`ROPA_DEL_ANIO`,
`shared/mercado.ts`). Quien la compra, la guarda para siempre; el mercado dice cuántos días quedan y cuándo vuelve
cada una.

| Prenda | Cuándo se vende | Gozo |
|---|---|---|
| 🍇 Manto del lagar | La fiesta de la cosecha | 70 |
| 🌦️ Faja de la lluvia temprana | La lluvia temprana y la siembra | 40 |
| 🧣 Manto de lana gruesa | El invierno de las lluvias | 70 |
| 🌸 Faja de flor de almendro | La siega de la cebada | 40 |
| 🌾 Manto de trigo dorado | La siega del trigo | 70 |
| ☀️ Faja color higo | El verano | 40 |
| 🌙 Faja de la luna nueva | El primer día de cada mes hebreo | 30 |
| 🐑 Faja de la Pascua | La Pascua y los panes sin levadura | 50 |
| 🌅 Manto del alba | La Semana Santa | 90 |
| 🌿 Faja de ramas de palma | Los tabernáculos y la santa convocación | 50 |
| ⭐ Manto de la profecía | 24 y 25 de diciembre | 90 |
| 🎉 Faja del año nuevo | 1 de enero | 40 |

### Mientras no estabas y el regalo de regreso
Quien vuelve después de dos días o más encuentra en la entrada de Jerusalén en línea la tarjeta «¡De vuelta en
Jerusalén!» («Yo me alegré con los que me decían: A la casa de Jehová iremos», Salmos 122:1). Lo cuenta el servidor
(`server/regreso.ts`, reglas en `shared/regreso.ts`): la visita se anota al entrar a Jerusalén en línea, al servir
en el templo y al entrar a la ciudad, sin importar el teléfono o la computadora.

- **En Jerusalén**: qué fiestas pasaron, si cambió la estación, la fecha de hoy y la próxima fiesta grande.
- **En tu barrio**: los vecinos nuevos, los mensajes de la charla (y quién escribió), las reuniones en las casas,
  los pedidos de ayuda atendidos, lo que se dio a las familias del pueblo, el puesto en la copa de la semana (con
  los puntos que ganó el barrio mientras no estabas) y si el barrio subió de nivel.
- **En tu casa**: quién la visitó y la bendijo, quién te dio algo en tus pedidos, las parcelas del huerto listas
  para cosechar y lo que se vendió en tu puesto.
- **En la ciudad**: las piedras que se pusieron en el muro, los capítulos de la historia que se cumplieron y cómo
  va el de esta semana.

Los nombres de quien bloqueaste no salen. El **regalo de regreso** se recibe con un botón en la misma tarjeta, una
sola vez por vuelta, hasta 3 días después de volver y como mucho uno cada 7 días. Es pequeño a propósito: servir
cada día (la racha, los encargos) siempre rinde más que irse y volver.

| Días fuera | Gozo | Semillas de la estación |
|---|---|---|
| 2 o 3 | 10 | 2 |
| 4 a 6 | 20 | 3 |
| 7 a 13 | 35 | 4 |
| 14 o más | 50 | 5 |

Las semillas son las del cultivo de la estación (olivo en la cosecha, cebada en su siega, trigo en la suya) y, si la
estación no tiene uno propio, cebada, la más rápida: quien vuelve ve su primera cosecha en la misma visita. La
primera vez que alguien vuelve después de una semana o más recibe además **el mejor vestido**, un manto verde que no
se vende y que queda puesto al recibirlo: «Pero el padre dijo a sus siervos: Sacad el mejor vestido, y vestidle; y
poned un anillo en su mano, y calzado en sus pies» (Lucas 15:22).

### Los eventos del año
| Evento | Cuándo | Efecto | Encargo de la fiesta |
|---|---|---|---|
| 🌙 La luna nueva | El 1 de cada mes hebreo | ×1,1; **de 7 a 9 de la noche, ×1,5** (Números 10:10) | Llevar al templo lo del alfolí |
| 🕊️ El día de reposo | Cada sábado | ×1,1 (Números 28:9) | Ir a una reunión |
| 🐑 La Pascua | 14 de Abib | ×1,5 | Bendecir la casa de un vecino |
| 🫓 Los panes sin levadura | 15–21 de Abib | ×1,25 | Llevar lo del alfolí |
| 🌾 Las primicias | 16 de Abib | ×1,25 | Llevar la primera cosecha del alfolí |
| 🌾 Pentecostés (las semanas) | 6 de Siván | ×1,5 | Llevar las primicias del alfolí |
| 🎺 Las trompetas | 1 de Etanim | ×1,25 | Terminar una sección de un estudio |
| 🕯️ La expiación | 10 de Etanim (día solemne, sin fiesta) | ×1 | Terminar una sección de un estudio |
| 🌿 Los tabernáculos | 15–21 de Etanim | ×1,5 | Bendecir la casa de un vecino |
| 📖 La santa convocación | 22 de Etanim | ×1,25 | Ir a una reunión |
| 🎉 El año nuevo | 1 de enero | ×1,1 y gozo ×1,25 (Lamentaciones 3:23) | Ayudar a un vecino |
| 🌅 La Semana Santa | Del viernes al domingo de Resurrección | ×1,25 y gozo ×1,25 (Isaías 53:5) | Terminar una sección de un estudio |
| ⭐ La profecía del niño (Navidad) | 24 y 25 de diciembre | ×1,25 y gozo ×1,5 (Isaías 9:6) | Bendecir la casa de un vecino |

Los efectos del templo se toman del evento de más mérito del día. El primer día de cada fiesta grande llega un
aviso al teléfono a quien activó los avisos (y en la luna nueva, a las 7 de la noche, el de la hora de las trompetas).

### Las fechas que vienen (calculadas por el juego)
| Fecha | Evento |
|---|---|
| 11 nov 2026 | 🌙 Luna nueva (1 de Quisleu) — el día en que empezó el año de Jerusalén |
| 11 dic 2026 | 🌙 Luna nueva |
| 24–25 dic 2026 | ⭐ La profecía del niño |
| 1 ene 2027 | 🎉 Año nuevo |
| 26–28 mar 2027 | 🌅 Semana Santa (Resurrección el 28) |
| 21 abr 2027 | 🐑 La Pascua (14 de Abib) |

## 5. Cómo agregar un evento en una actualización

Las reglas no se tocan: solo se agrega una entrada a `EVENTOS_DEL_ANIO` en `shared/anio.ts`. Ejemplo (una
fecha civil fija de dos días):

```ts
{
  id: "aniversario",
  nombre: "El aniversario del ministerio",
  corto: "el servicio vale ×1,25",
  icono: "🔥",
  tipo: "ministerio",
  regla: { civil: { mes: 3, dia: 15, duracion: 2 } },
  merito: 1.25,
  gozo: 1.25,
  efecto: "Dos días de fiesta en toda Jerusalén: el servicio y los encargos valen más.",
  verso: { text: "…cita literal de la RVR1960…", ref: "Libro 0:0" },
  hoy: "Lo que se dice ese día en la ciudad.",
  avisar: true,
  encargo: { tipo: "bendicion", meta: 1, titulo: "El aniversario: bendice la casa de un vecino", icono: "🔥" },
},
```

Las reglas posibles: `{ fiesta: "pascua" }` (fecha hebrea de Levítico 23), `{ semana: 6 }` (cada sábado),
`{ civil: { mes, dia, duracion } }` y `{ resurreccion: { desde, duracion } }` (días contados desde el domingo de
Resurrección). Con eso el evento aparece solo en el calendario, en «Para hoy», en los anuncios, en lo que dice la
gente, en los avisos y en los encargos. Para que la gente de la calle lo nombre con una frase propia, se agrega
también a `FRASES_EVENTO` en `client/src/games/templo/ciudad/frases.ts`. Y se prueba en `shared/anio.test.ts`.

### Cómo agregar una historia de temporada

1. Se escribe en `shared/capitulos.ts` como las otras (`ArcoTemporada`): cuatro capítulos (cada uno con su unidad,
   su tarea, la historia en palabras propias, su verso, su guía de la calle de los siervos, el diálogo del comienzo,
   lo que se dice al cumplir, el premio, los chismes y dos recados), la fiesta final y el título de su colección en
   el álbum. Las citas, literales de la RVR1960 y comprobadas con la Biblia del sitio.
2. Sus cinco prendas van en `PRENDAS_CAPITULOS`: con eso ya no se venden, se ven en el mercado y forman su colección
   del álbum.
3. Se agrega a `PROGRAMA` con la temporada en que empieza (siempre una que todavía no empezó, para no cambiarle la
   historia a nadie).
4. Los nombres de sus capítulos van en `CapituloId`, con su lugar en el mapa (`LUGAR_CAPITULO`, `MapaUI.tsx`) y lo
   que dice la gente (`FRASES_CAPITULO` y `FRASES_FIESTA_DE`, `ciudad/frases.ts`).
5. Lo que se ve en la ciudad es una escena que cumple `EscenaDeHistoria` (`ciudad/capitulos3d.ts`; la de la Pascua
   está en `ciudad/pascua3d.ts`) y se suma a `historias` en `ciudad/mundo.ts`.
6. Se prueba en `shared/temporada2.test.ts` (las fechas, el orden, los recados, las prendas y el álbum).

## 6. Lo que aprendimos de cinco juegos parecidos

| Juego | Lo que hace bien | Lo que tomamos |
|---|---|---|
| **Animal Crossing: New Horizons** | El reloj y el calendario reales; eventos de temporada; los vecinos hablan de lo que viene | El año real, la gente que comenta la estación y la fiesta, los anuncios |
| **Stardew Valley** | Estaciones con cultivos propios, festivales en días fijos, la lluvia que riega | Cultivo de la estación, la lluvia que riega el huerto, el calendario con lo que viene |
| **Pokémon GO** | Horas especiales con bonos, rachas, el clima real que cambia el juego | La hora de las trompetas (×1,5), la racha de servicio, la lluvia |
| **Adopt Me! (Roblox)** | Actualizaciones semanales y cosas de tiempo limitado | Las novedades del juego y la ropa de cada tiempo, que solo se vende en su estación o su fiesta |
| **Club Penguin** | Fiestas mensuales, el periódico que anuncia lo que viene, colectas solidarias | Los anuncios de la ciudad, los avisos al teléfono, la ofrenda del barrio |

## 7. La economía del gozo: la casa en el centro

### Lo que había (11 de noviembre de 2026)
- Unas **30 fuentes de gozo** en el servidor y solo **2 gastos**: comprar en el mercado y comprarle a un vecino.
- Un jugador activo gana **de 150 a 350 de gozo por día** (encargos 45, «¿Quién es sabio?» hasta 150, cátedras 24
  por camino, preguntas 30, cofre 20, recado 12, racha 2–14…).
- Todo lo que se vendía costaba **2.282 de gozo una sola vez** (muebles 787, ropa del año 680, adornos 515, ropa 260,
  letrero 40): en una o dos semanas ya no quedaba nada que comprar, y el gozo se amontonaba sin motivar.
- La casa crecía con la honra (500 / 2.500 / 8.000), no con el gozo.

### Lo que hacen con su dinero los juegos parecidos
| Juego | En qué se gasta | Lo que lo hizo viral | Lo que tomamos |
|---|---|---|---|
| Animal Crossing: New Horizons | Ampliar la casa (7 ampliaciones, de 98.000 a 2.498.000 bayas), muebles, almacenaje; la Academia de Casas Felices califica la casa cada semana | Mostrar la casa y la isla: visitas, fotos, la bolsa de nabos con amigos | Las obras de la casa (grandes y que nunca se acaban) y las estrellas de la casa |
| Welcome to Bloxburg (Roblox) | Trabajar para construir y amueblar la casa; una casa grande cuesta más mantenerla | Las casas que la gente comparte en TikTok y YouTube | La casa como centro del gasto y la foto de la casa para compartir |
| Adopt Me! (Roblox) | Huevos, comida y casas; 4 mascotas iguales crecidas se juntan en una «neón» | El intercambio seguro y lo raro de cada evento | (Fase 3) la pieza fina con 4 iguales, sin nada al azar; lo de temporada se vuelve escaso |
| Club Penguin | Ropa, muebles del iglú y mascotas; fiestas con cosas que no vuelven | Las fiestas en el iglú y *Coins for Change*: en 2011 llenaron el faro con más de 10 000 millones de monedas y el juego donó 2 millones de dólares | (Fase 2) la casa abierta; (fase 4) la obra de toda la ciudad |
| Stardew Valley | La casa, graneros, animales, herramientas; el pueblo se restaura donando cosas | Jugar con amigos; y su lección: al final sobran millones sin nada en qué gastarlos | Edificios útiles (cisterna, granero, horno) con tiempo de obra, y gastos que nunca se acaban |

**La respuesta a «¿la casa es el motor viral?»**: la casa es el mejor **motor de gasto** (en Animal Crossing y en
Bloxburg es lo que más dinero se lleva), pero lo viral no es construirla: es **mostrarla**. Lo que trae amigos en
todos esos juegos es mostrar lo que construiste, invitar a tu casa, intercambiar lo raro y hacer algo grande todos
juntos. Por eso: la casa en el centro y, alrededor, cuatro anillos que la vuelven viral.

### Las reglas de la economía
- **Pesa cabal** (Proverbios 11:1): precios fijos y nada al azar. Sin cajas sorpresa ni apuestas: juegan jóvenes de
  la iglesia.
- **El gozo nunca compra mérito ni cargos**: solo la casa, su belleza, su comodidad y lo de la comunidad.
- **Servir y estudiar abre; el gozo paga**: lo grande pide una casa mayor (la honra) y lo más fino pide estudios
  aprobados, así que ganar gozo lleva también a las clases.
- **Cada fuente tiene su gasto**, y siempre hay algo más grande que edificar. El termómetro lo mide.

### Fase 1 — Mi casa (hecho)
**Las obras de tu casa** (`shared/obras.ts`, `server/obras.ts`, `ObrasUI.tsx`, en *Tu casa → Obras*). Una obra a la
vez; se paga con gozo y con flor de harina del alfolí (el pan de los obreros), tarda unas horas y los obreros
trabajan aunque no estés. Con más obreros (Mateo 20:1) cuesta la mitad más y termina en la mitad del tiempo. El
10 % de cada obra va al tesoro del templo. Cada obra se ve en la ciudad (los vecinos la ven) y al terminar llega un
aviso al teléfono.

| Obra | Pide | Gozo | Harina | Horas | Lo que da |
|---|---|---|---|---|---|
| 🧱 Cerco de piedra | — | 60 | 3 | 2 | +6 a las estrellas |
| 🪔 Lámparas en la puerta | — (y 3 de aceite) | 90 | 0 | 3 | De noche alumbran tu puerta |
| 🌱 Ensanchar el huerto (Isaías 54:2) | — | 180 | 5 | 6 | Una parcela más |
| 💧 Cisterna (Proverbios 5:15) | — | 240 | 6 | 8 | Lo que siembras queda regado |
| 🫓 Horno de barro | — | 280 | 8 | 8 | Caben 5 en el horno |
| 🚪 Puerta de cedro labrada (Apocalipsis 3:20) | Casa de adobe | 150 | 4 | 4 | +8 a las estrellas |
| 📜 Las palabras en los postes (Deuteronomio 6:9) | Casa de adobe y 1 estudio | 120 | 2 | 3 | +10 a las estrellas |
| 🍇 Emparrado del patio (Salmos 128:3) | Casa de adobe | 220 | 6 | 6 | +10 a las estrellas |
| 🌾 Granero en el terrado (Proverbios 3:10) | Casa de adobe | 360 | 10 | 10 | El alfolí guarda 30 más |
| 🏛️ Pórtico con columnas (1 Reyes 7:6) | Casa de piedra y 2 estudios | 600 | 15 (y 3 de aceite) | 12 | +20 a las estrellas |
| ⛲ Fuente del patio (Cantares 4:15) | Casa de piedra y 3 estudios | 800 | 20 | 16 | +24 a las estrellas |
| 🗼 Torre del terrado (Lucas 14:28) | Aposento alto y 4 estudios | 1.200 | 25 (y 5 de aceite) | 24 | +30 a las estrellas |

Todas juntas: 4.300 de gozo y 104 de flor de harina, unas tres semanas de un jugador activo, y casi el doble de lo que
costaba todo el mercado.

**Las estrellas de tu casa** (de 1 a 5, las ven los vecinos al visitarla): la casa (adobe 10, piedra 20, aposento
alto 30), cada obra, cada mueble distinto puesto dentro (2), cada **juego de muebles completo** (10: la mesa de la
familia, el aposento del profeta, la cocina de la casa, el rincón de las Escrituras y el trabajo de las manos), cada
adorno (3) y el letrero (5). Las estrellas piden 40, 90, 160 y 240 puntos.

**La foto de tu casa**: en *Tu casa*, la ciudad toma una foto delante de tu puerta y le pone el marco del juego, el
nombre de tu casa, sus estrellas y el enlace del juego, para compartirla por WhatsApp, TikTok o Facebook. No lleva
el nombre de la persona.

**El termómetro del gozo** (solo la administración, en el tesoro del templo): cuánto gozo entró y salió cada día y de
dónde (`game_gozo_dia`), cuánto tiene guardado la gente y el tesoro. Si entra mucho más de lo que sale, el gozo pierde
su valor: hay que sumar en qué gastarlo. Meta: que se gaste entre el 70 y el 90 % de lo que entra.

### Fase 2 — Mi barrio (hecho)
**Las obras del barrio** (`shared/barrio-obras.ts`, `server/barrio-obras.ts`, `BarrioObrasUI.tsx`, en *Tu barrio → Obras*).
Los vecinos dan su gozo para una obra común a la vez, en orden. Cada uno puede dar hasta 1.000 por día, para que la obra
sea de todos, y cada 10 de gozo suma un punto a la copa del barrio. Al terminar una obra se avisa a todo el barrio en
vivo y se ve en sus calles. Los que más dan van en la placa de los constructores (Nehemías 3).

| Obra | Entre todos | Lo que da a cada casa del barrio |
|---|---|---|
| 🪣 El pozo del barrio (Génesis 26:22) | 1.500 | El huerto crece 10 % más rápido (lo que se siembra desde entonces) |
| 🪑 Los bancos de los ancianos (Rut 4:2) | 2.500 | Las reuniones premian hasta 15 vecinos (en vez de 10) |
| 🔥 El horno del barrio (Mateo 6:11) | 4.000 | El horno de la casa tarda la mitad |
| 🌳 Los árboles de la calle (Salmos 1:3) | 6.000 | +5 puntos a las estrellas |
| 🌾 El granero del barrio (Hechos 2:44) | 9.000 | El alfolí guarda 20 más |
| 🪨 La placa de los constructores (Nehemías 3:28) | 12.000 | +10 puntos a las estrellas y los nombres de los que más dieron |

En total, 35.000 de gozo por barrio: una o dos temporadas de un barrio con vida.

**Los regalos** (`shared/regalos.ts`, `server/regalos.ts`, `RegalosUI.tsx`):
- Al visitar la casa de un vecino o de un amigo, «Regalarle algo»: un adorno, ropa, un mueble o 5 semillas del
  mercado, con una frase de una lista fija (sin texto libre).
- Se paga el precio del día y el 10 % va al tesoro.
- Como mucho 5 regalos por día, y 2 a la misma persona.
- Sin bloqueos, y nada de lo que no se vende ni de otra temporada.
- Le llega un aviso en vivo, y lo ve en *Tu casa → Vecinos*.

**El banquete en tu casa** (`shared/banquete.ts`, `server/banquete.ts`, `BanqueteUI.tsx`, en *Tu casa → Vecinos*):
- Una vez por día abres tu casa 20 minutos; cuesta 40 de gozo, 5 de flor de harina y 2 de aceite.
- En tu puerta aparece un círculo dorado, y el barrio recibe el aviso.
- Quien se para en tu puerta y se sienta a tu mesa gana 2 de gozo y 2 puntos para la copa de su barrio, y tu casa
  gana 2 de honra (hasta 12 invitados; cada uno se sienta a 3 mesas por día como mucho).
- El servidor mira la presencia real en la puerta (`shared/parcelas.ts`, que ahora comparten la pantalla y el
  servidor).
- El banquete cuesta más gozo del que reparte: es hospitalidad (Romanos 12:13).

### Fase 3 — El taller (hecho)
**El artesano** (`shared/taller.ts`, `server/taller.ts`, `TallerUI.tsx`, en *Mercado → Artesano*). Con 4 iguales hace la
pieza fina, dorada, sin nada al azar (como la mascota «neón» de Adopt Me!, pero con lo que se ve antes de pedirlo):
- Hay una pieza fina por cada mueble del mercado (la silla dorada, la lámpara de oro, la alfombra bordada de oro…) y
  por cada prenda que se vende, también la de temporada (el manto azul cielo bordado de oro, el manto del lagar
  bordado de oro…). No se venden: se hacen.
- Los muebles se juntan de los que tienes: primero los guardados; si faltan, el artesano saca de la casa los últimos
  que se pusieron y, al terminar, pone la pieza fina en ese lugar. La ropa se junta en el fardo.
- El jornal es el doble del precio de una pieza (el 10 % va al tesoro); tarda de 1 a 6 horas, una pieza a la vez.
- Pide estudios aprobados: 1 (lo que cuesta menos de 30), 2 (de 30 a 59) o 3 (60 o más).
- El mueble fino cuenta como su mueble en los juegos y en lo que ayuda (el molino dorado sigue moliendo), y suma
  +6 a las estrellas. La ropa fina lleva su orla de oro en el ruedo y en la abertura del manto, o en la faja: la ven
  todos en la ciudad.
- Al terminar: aviso al teléfono (con los del huerto), un aviso en «Para hoy» y en lo que pasa en la comunidad.

**Los oficios de la casa** (en *Tu casa → Oficios*):
- **El redil** (Proverbios 27:23): los corderos que traen los siervos se pueden quedar en el redil como ovejas (2 en
  la tienda, 3 en la casa de adobe, 4 en la de piedra y 6 con aposento alto). Cada oveja da 1 de lana cada 8 horas y
  junta hasta 3; al trasquilar, la lana va al alfolí (cabe lo mismo que de lo demás) y lo que no cabe se queda en las
  ovejas. Los vecinos ven hasta 3 ovejas delante de cada casa.
- **El telar** (Proverbios 31:13): con el telar de la casa puesto dentro, se teje una cosa a la vez: cojines (2 de
  lana, 30 min), el manto de lana (3, 1 h) y la alfombra (5, 2 h). Lo tejido va al arcón o al armario (o al fardo).

**El fardo**: en *Mercado → Ropa*, el botón 🎒 compra una copia de una prenda para el fardo (hasta 4 de cada una), en
su tiempo y al precio del día. Sirve para venderla a un vecino o para llevar 4 al artesano.

**El intercambio** (`server/intercambio.ts`, en *Mercado → Intercambio*, Proverbios 31:24): los puestos de cosas
entre vecinos.
- Se vende la lana, la ropa del fardo (o la del armario que no lleva puesta ningún personaje), los muebles guardados
  (no los que están puestos) y las piezas finas. Lo que se gana (los trajes de los sabios, las prendas de la historia,
  el mejor vestido) y los adornos no se cambian.
- Pesa cabal: lo que el mercado vende siempre va de la mitad a su precio; la ropa de temporada, **fuera de su tiempo**,
  de 1 a 3 veces su precio (y solo se consigue aquí, de otro jugador: «Todo tiene su tiempo», Eclesiastés 3:1); la
  pieza fina, de 4 a 8 veces la pieza de donde sale; la lana, de 1 a 6.
- Hasta 3 puestos por persona, 48 horas, 4 cosas (o 30 de lana) por puesto; lo que no se vende vuelve.
- Se compra lo que cabe (los muebles hasta 12; la ropa, una en el armario y hasta 4 en el fardo). El 10 % va al
  tesoro; el que vende ve lo vendido al volver. Con bloqueos no se ven los puestos ni se compra.
- El termómetro cuenta el jornal (`taller`), la ropa del fardo (`fardo`) y los puestos de cosas (`cosas`).

Hacer las 39 piezas finas (las 4 iguales y el jornal) cuesta 10.362 de gozo: 4.722 los muebles y 5.640 la ropa. Es
más del doble de todas las obras de la casa: el gasto que nunca se acaba, ahora también en la ropa que se ve.

### Fase 4 — La ciudad y el mundo (hecho)
**El arca de Joás** (`shared/arca.ts`, `server/arca.ts`, `ArcaUI.tsx`, `ciudad/arca3d.ts`), inspirada en *Coins for Change*
de Club Penguin:
- Una por temporada, para toda la ciudad, arriba de la escalinata: «la cual pusieron fuera, a la puerta de la casa de
  Jehová» (2 Crónicas 24:8).
- Cada uno echa su gozo, de 10 a 500 por día, para que sea de todos. Cada 10 suma un punto a la copa del barrio.
- La meta se fija al empezar la temporada: 1.500 por persona que sirvió en los últimos 7 días, de 3.000 a 300.000.
- Se da en una transacción con el arca trabada, así que nadie pasa de lo que falta.
- Al llenarse:
  - se avisa en vivo a toda la ciudad;
  - se encienden lámparas de oro a los dos lados de la escalinata hasta el fin de la temporada;
  - los nombres quedan en el libro del arca;
  - los que dieron 50 o más ganan el título «Dador alegre».
- La gente de la ciudad habla del arca en sus chismes.
- Si el ministerio quiere, la administración escribe una causa real para esa temporada, y se muestra en el arca.

**Invita a un amigo** (`shared/invitar.ts`, `server/invitar.ts`, `InvitarUI.tsx`, en *Misiones*):
- Cada persona tiene un código de 6 letras y un enlace (`?invita=`) para compartir por WhatsApp.
- El amigo entra con el enlace: el código queda guardado en el teléfono y se usa solo al llegar a la ciudad. También
  lo puede escribir, siempre que su cuenta tenga menos de 14 días.
- Cuando el amigo juega 3 días distintos (`game_dias_jugados`), él gana 100 de gozo y quien lo invitó 150. Este último
  gana gozo hasta por 10 amigos; después siguen contando, pero sin gozo.
- Los dos reciben la «Faja del buen amigo» (Proverbios 17:17), que no se vende.
- Las cuentas las aprueba el ministerio: esa es la guarda contra las trampas.

**El álbum** (`shared/album.ts`, `server/album.ts`, `AlbumUI.tsx`, en *Tu casa → Álbum*), inspirado en la colección de
Pokémon GO:
- Todo lo que se tuvo alguna vez queda anotado (`game_album`), aunque después se venda o se regale.
- Hay 9 colecciones, cada una con su título, más una por cada historia de la temporada:
  - los muebles: «Buen mayordomo»;
  - los adornos: «Casa alegre»;
  - la ropa de siempre: «Bien vestido»;
  - la ropa del año: «Guarda los tiempos»;
  - los muebles finos: «Artífice»;
  - la ropa fina: «Bordador de oro»;
  - los muebles de la casa viva (el fogón, los cántaros, el baúl, el lecho con cobertor y el tapiz): «Casa viva»;
  - la ropa de pies a cabeza (las túnicas, los turbantes y los velos, las sandalias, el cayado, el rollo y el
    zurrón): «De pies a cabeza»;
  - lo que se gana (los trajes de los sabios, el mejor vestido, la faja del buen amigo y el manto de Elías):
    «Tesoro de Jerusalén»;
  - las cinco prendas de la amenaza de Senaquerib: «Atalaya de Sion»;
  - las cinco prendas de la gran Pascua de Ezequías: «De un solo corazón»;
  - las cinco prendas del patio de los juegos (una por juego ganado): «Gozo del patio».
- Más títulos: «Dador alegre», «Buen amigo», «Idóneo para enseñar» (un aprendiz que termina sus pasos), «Oído de
  sabio» (los 30 dichos), «Coleccionista» (40 cosas) y «Gran coleccionista» (100).
- **Los dichos de los ancianos** (`shared/dichos.ts`, `server/dichos.ts`, `DichosUI.tsx`): cada día los ancianos de
  la puerta dicen un dicho de Proverbios, el mismo para todos, en el orden de la lista. Quien se sienta a escucharlo
  (a 6 m o menos de ellos) gana 3 de gozo una vez por día y lo guarda (`game_dichos`); en la ventana se descubre con lo
  que quiere decir. Los que falten los enseña el mentor. Para agregar dichos, van al final de la lista.
- El título elegido lo ven los vecinos en la ficha (`VecinoInfo.titulo`).

## 7b. El huerto de verdad (13 de noviembre de 2026)

Luis veía el huerto como «una pantalla seca que no se sabe lo que se está haciendo» y pidió un lugar de verdad, con
cosas que hacer. Ahora el huerto es un lugar propio (`casa/huerto3d.ts`): se sale a él por la puerta del fondo de la
casa por dentro (`Plano.huerto` en `shared/casa-interior.ts`) y se vuelve por la misma puerta.

**El lugar**: los surcos (los de siempre: 2 a 5 según la casa, y uno más con «ensanchar el huerto»), el pozo del
camino (con el pozo del barrio, más cántaros por día; con la cisterna de la casa, sin tope y lo sembrado queda regado),
el granero (más grande con el granero de las obras), los olivos y la higuera. Llueve cuando llueve en el calendario.

**Las tareas, cada una con su gesto** (nada se hace solo al acercarse; el servidor decide en `server/huerto.ts`):

| Tarea | Gesto | Regla |
|---|---|---|
| ⛏️ Arar | Deslizar el dedo a lo largo del surco | Sin arar no se siembra; después de segar hay que volver a arar |
| 🌱 Sembrar | Deslizar | Trigo, cebada u olivo; el de la estación crece más rápido |
| 🏺 Llenar el cántaro | Mantener apretado en el pozo | 3 riegos (6 con el cántaro grande); el pozo da 6 cántaros por día (10 con el pozo del barrio) |
| 💧 Regar | Mantener apretado sobre el surco | Una vez por siembra: crece 25 % más rápido (35 % con la tinaja) y da una estrella |
| 🌿 Arrancar hierbas | Tocar cada una | Sale una cada 12 min (antes en las lluvias; el doble con la azada de hierro), hasta 3 |
| 🐦 Espantar las aves | Tocar cada una | Llegan a los 25 s de sembrar (si nadie las espanta, a los 10 min comieron) y 90 s después de que está lista |
| 🐑 Abonar | Deslizar | Con el abono del redil: cada oveja da 1 cada 3 h (hasta 6; 2 al empezar) |
| 🌾 Segar | Deslizar con la hoz | La cosecha queda en gavillas a cuestas; con 3 estrellas y la hoz de hierro, una más |
| 🧺 Al granero | Mantener apretado en el granero | Recién ahí van al alfolí (lo que no cabe queda junto al camino) |

**La cosecha**: lo de la semilla + una por cada estrella (regado, limpio de hierbas al segar, abonado) + el molino o
las vasijas − lo que se comieron las aves (nunca menos de 1). Al segar se puede dejar **el rincón para el pobre**
(Levítico 23:22): una gavilla menos y 3 de gozo, hasta 3 por día.

**Las 3 tareas del huerto del día** (`misionesDelDia`): de 12 posibles, solo las que se pueden hacer (sin regar con
cisterna o lluvia, sin abonar sin ovejas, sin «el cultivo de la estación» si no hay); 8 de gozo cada una y 10 de más
por las tres (34 por día como mucho).

**Las herramientas** (gozo, el 10 % al tesoro): la azada de hierro (120), el cántaro grande (80) y la hoz de hierro
(160), 1 Samuel 13:20.

**Lo que se guarda**: cada surco en `game_houses.huerto` (con `arado`, `abono`, `limpio` y `aves`) y lo demás en
`game_houses.labranza` (el agua, el pozo del día, las herramientas, las gavillas, el abono, las tareas y los rincones).
El crecimiento, las hierbas, las aves y el abono se calculan con las horas al leer: nada corre de fondo.

**En la ciudad**: cada casa muestra su huertito (`CasaVista.huerto`, `huertitoDe`): un cantero con hasta 4 surcos y lo
sembrado en su etapa, en la malla del suelo (no se aclara con la casa).

**Para probar** (scratchpad de la parte 4): `reg5079/huerto_api.py` (78) y `shared/huerto.test.ts`. Las pruebas viejas
que sembraban sin arar ahora deben arar antes, llevar las gavillas al granero y espantar las aves.

## 7c. La casa viva (13 de noviembre de 2026)

Luis veía las casas por dentro «todo muy básico» y pidió muebles, ropa y accesorios más detallados, más bonitos y con
más espacio.

**Más espacio sin mover nada** (`PLANOS` en `shared/casa-interior.ts`): cada casa crece solo con celdas nuevas (al este
o en un cuarto nuevo), así que lo que cada uno ya puso sigue en su lugar. `shared/casa-viva.test.ts` lo comprueba con
los cuartos de antes.

| Casa | Cuarto nuevo | Caben (antes → ahora) |
|---|---|---|
| Tienda | El rincón del toldo | 10 → 14 |
| Casa de adobe | La alcoba | 18 → 24 |
| Casa de piedra | El cuarto de los huéspedes | 28 → 36 |
| Aposento alto | El cuarto de los huéspedes | 40 → 50 |

**Por dentro** (`decorar` en `casa/mundo-casa.ts`): en la pared del fondo, cada 4 celdas, una ventana con celosía (con
su rayo de luz, que se ve de día), un tapiz de granadas o una repisa con cántaros (la tienda no tiene ventanas); hay
lámparas en las paredes de los lados y vigas en el techo. Todos los muebles del mercado se dibujaron de nuevo, más
finos (`casa/muebles3d.ts`).

**Los muebles nuevos** (serie `casa-viva`): cada uno tiene su pieza fina en el artesano, y juntos forman la colección
«Casa viva» del álbum.

| Mueble | Precio | Lo que hace |
|---|---|---|
| 🍲 Fogón de piedras | 45 | Alumbra; en él se cocina el guiso |
| 🏺 Cántaros de barro | 28 | Adorna la cocina |
| 🧰 Baúl de acacia | 55 | Ocupa 2 × 1 |
| 🛌 Lecho con cobertor | 95 | Ocupa 2 × 2 y pide casa de adobe; en él se descansa |
| 🧶 Tapiz bordado | 65 | Ocupa 2 × 1 |

**Los muebles que se usan** (`usoDe`; `POST /api/jerusalen/casa/usar` en `server/casa-usar.ts`): al acercarse a uno,
un botón dice lo que se puede hacer, y «Levantarse» lo termina.
- 🪑 **Sentarse** en la silla, el banco de cedro, los cojines o la estera: lo hace la casa sola, sin el servidor.
- 🛏️ **Descansar** en el lecho o en el lecho con cobertor: +3 de gozo y Salmos 4:8.
- 🍲 **Cocinar un guiso** en el fogón: 2 de flor de harina y 1 de aceite del alfolí, +3 de gozo y Proverbios 15:17. Si
  ese día abres tu banquete, cada invitado gana 1 de gozo más (`guisoDeHoy`, en `server/banquete.ts`).
- 📜 **Leer el rollo** del estante (o en la mesa, si en la casa hay un estante): +2 de gozo y el rollo del día, uno de
  14 versículos (`ROLLO_DEL_DIA`), el mismo para todos ese día.
- Descansar, cocinar y leer dan gozo una vez por día. Se guarda en `game_houses.labranza.usos` (`{ dia, hechos }`), y
  el termómetro lo cuenta como `casa-descansar`, `casa-cocinar` y `casa-leer`. La pieza fina sirve igual que su mueble.

**La ropa de pies a cabeza** (`ROPA_DE_PIES_A_CABEZA` en `shared/mercado.ts`): ahora el personaje se viste en 7 partes
(`RANURAS`): túnica, manto, faja, cabeza, pies, mano y bolsa (`MercadoEstado.ropa`). En el tejedor:

| Parte | Prendas (precio) |
|---|---|
| Túnica | con franjas azules, con franjas granate, verde olivo (55 cada una) y la bordada (110) |
| Cabeza | turbante de lino (35), turbante azul (45), velo de lino (35) y velo rosa pálido (45) |
| Pies | sandalias de cuero (25) y sandalias con correas rojas (45) |
| Mano | el cayado de pastor (50, Salmos 23:4) y el rollo de las Escrituras (60, Ezequiel 2:9) |
| Bolsa | el zurrón de cuero (30, 1 Samuel 17:40) |

- Las dibuja `Figure.setRopa` (`three/characters.ts`): la túnica con sus franjas y su ruedo (la bordada, con bandas de
  oro); el turbante o el velo en lugar del tocado del camino (también en los sacerdotes: su vestidura se arma sin la
  tiara); las sandalias que asoman bajo la túnica; el cayado o el rollo en la mano (se esconde mientras se lleva una
  herramienta), y el zurrón colgado a un lado.
- Los vecinos la ven en la ciudad (`coloresDeRopa`, en la presencia).
- **El probador** (`ProbadorUI.tsx`): en el tejedor, 👁️ muestra al personaje girando con la prenda puesta; se gira con
  el dedo y se compra desde ahí.
- **El armario**: en *Tu casa → 🪔 Adornos y ropa*, «Tu ropa, de pies a cabeza». Se elige cada parte, se ve en el
  muñeco y se guarda con «Ponérmela».
- Estas prendas no tienen pieza fina (el artesano sigue con los mantos y las fajas). Van en una colección nueva del
  álbum, «De pies a cabeza»; las colecciones de antes no cambian, así que nadie pierde un título.

**Las ofertas del día no cambian**: lo de la casa viva (con `serie`) no entra en `ofertasDelDia`, porque las ofertas
salen de una cuenta sobre el largo de la lista y, si la lista crece, cambian las de todos los días. Lo que se agregue al
mercado después también debe llevar su `serie`.

**Para probar** (scratchpad de la parte 4): `reg5079/casa_viva_api.py` (38) y `shared/casa-viva.test.ts` (5). Con los
5 muebles nuevos, hacer las 44 piezas finas cuesta 12.090 de gozo (`shared/taller.test.ts`). `POST /casa/ropa` guarda
solo las partes que llegan (null deja la parte sin nada): las pruebas que comparan la ropa completa con solo el manto y
la faja deben mirar solo esas dos.

## 8. Lo que sigue (la fase final de Jerusalén en línea)

Ya hecho (noviembre de 2026): el calendario real, el encargo de la fiesta, la ropa de cada tiempo, el
pronóstico, «Mientras no estabas» con lo que hizo tu barrio, tu casa y la ciudad, el regalo de regreso (con el
mejor vestido), los pétalos de almendro, las lámparas de fiesta, los mentores para los que llegan y los dichos de los
ancianos (las colecciones visibles quedan completas con el álbum).

Lo que queda:
1. **Más vida por estación**: campos dorados en la siega del trigo y uvas en las parras en la cosecha.
2. **Contenido que se renueva**: preguntas, estudios y cátedras por entregas (también dichos nuevos al final de
   `DICHOS`).
3. **Una historia para la temporada 3 y las que siguen** (`PROGRAMA` en `shared/capitulos.ts`; la temporada 2,
   la gran Pascua de Ezequías, ya está). Mientras no haya otra, se turnan las dos.

Con eso Jerusalén en línea queda completa y lista para que los próximos juegos del ministerio usen la misma base
(cuentas, gozo, calendario y avisos).

## 9. El patio de los juegos (jugar en grupo)

Pedido de Luis (12 de noviembre de 2026): jugó «¿Quién es sabio?» con un amigo y quiere muchas más cosas para hacer en
línea, de verdad y en grupo, para conectarse con los amigos de la iglesia. Archivos: `shared/juegos-grupo.ts` (reglas),
`server/juegos-grupo.ts` (salas y juegos), `server/juegos-grupo-banco.ts` (solo servidor), `JuegosGrupoUI.tsx`,
`juegos-red.ts` y `ciudad/patio3d.ts`.

**El lugar.** En la franja del norte de la ciudad, entre el barrio de la puerta de las Ovejas y el muro norte (`PATIO`):
un patio empedrado con muros bajos, una portada con banderines, las banderas de cuatro tribus (cada una en un solo
palo, nada con forma de cruz), bancos, una grada, la mesa de los juegos con su toldo (su círculo abre el patio), la
cantera y el tramo del muro. Niños que juegan (Zacarías 8:5). Se llega con «Ir a…», el mapa o el botón 🎲 (tecla G).

**La sala.**
- Se crea con un juego y tiene un código de 6 letras (sin I ni O). Caben de 2 a 12 personas.
- Se entra con el código, desde «Salas de tus amigos y vecinos» o con una invitación (como «Invitar a venir»: solo
  amigos y vecinos del barrio, una cada 20 s a la misma persona y 6 por minuto, respeta «Recibir llamadas, retos e
  invitaciones»).
- Cada uno dice que está «a punto»; el anfitrión elige el juego, empieza y puede sacar a alguien (no vuelve a esa sala).
- Se habla con frases fijas y los versículos rápidos de la ciudad: no hay texto libre.
- Solo cuentas aprobadas, con su personaje y en la ciudad. Nunca se juntan quienes se bloquearon: no se ven sus salas,
  no se invitan, no se puede entrar (404, como si no existiera), y si alguien bloquea a otro de su sala, el bloqueado
  sale de ella.
- Las salas viven en memoria; se cierran solas a los 20 minutos sin movimiento. Quien no está en la ciudad ni pregunta
  por la sala en 90 s, sale.

**Los juegos** (lo decide el servidor, con los tiempos en milisegundos; nunca manda la respuesta antes de tiempo):

| Juego | Cómo se juega | Quién gana |
|---|---|---|
| ⚔️ Esgrima bíblica (Efesios 6:17) | 10 rondas de 20 s: una cita y 4 versículos, o un versículo y 4 citas (una del mismo libro) | Quien acierta primero gana 3 puntos; acertar después, 1. La ronda se cierra 3 s después del primer acierto |
| 🛡️ Las doce tribus (Salmos 122:4) | 2 a 4 tribus (Judá, Benjamín, Neftalí, Zabulón). 12 preguntas por turno, 25 s; la primera respuesta de la tribu vale | Acertar en el turno: 100. Si falla o se acaba el tiempo, las demás roban (12 s, sin la opción que falló): 50 |
| 🕵️ ¿Quién soy? (Hebreos 12:1) | 6 personajes; 5 pistas, una cada 7 s, de la más difícil a la más fácil; 6 nombres | 100, 80, 60, 40 o 20 según las pistas que se veían; quien falla espera la siguiente ronda |
| 🏃 La carrera de Ahimaas (2 Samuel 18:23) | Salen juntos del patio a 5 lugares de la ciudad en orden y vuelven. Como mucho 4 min; al llegar el primero, un minuto más | Quien vuelve primero |
| 🧱 Levantemos el muro (Nehemías 4:6) | Cooperativo: llevar piedras de la cantera al tramo, de a una, 15 por persona (de 30 a 180) en 5 minutos | Todos los que pusieron al menos 3, si se levanta |

- La carrera y el muro se juegan caminando: el servidor mira cada posición real de la red (`observarPosiciones` en
  `server/ciudad-red.ts`). Nadie va más rápido que una persona: cada uno tiene un margen de 12 m que se llena a 8,6 m/s
  (`margenDespues`); quien lo pasa (con «Ir a…» o una trampa) salta: en la carrera tiene que volver al último lugar, en
  el muro se le cae la piedra. «Ir a…» no funciona mientras se juega, y para empezar todos tienen que estar en el patio.
- Los avisos van por la red (`avisarA`) en cada cambio, y un temporizador de la sala avisa en cada momento esperado (sale
  la pregunta, otra pista, se cierra la ronda). El teléfono solo pregunta si un aviso no llegó (al próximo cambio, o cada
  15–20 s): así una iglesia entera en la misma wifi no gasta el cupo de 120 peticiones por minuto.

**Los premios.**
- Gozo con tope de **60 por día** entre todos los juegos: 12, 8 y 6 a los tres primeros y 4 a los demás que jugaron;
  en las tribus, 12 la que gana, 5 las demás y 8 si empatan; en el muro, 12 si se levanta y 4 si no.
- Sin premio si juegan menos de dos personas, ni para quien no jugó (no respondió, no corrió, no puso piedras).
- La copa del barrio: 2 por partida jugada y 3 por ganarla (`COPA_PUNTOS.juego` y `juegoGanado`).
- Una prenda por juego, la primera vez que se gana, que no se vende (`exclusivo: "juegos"`): Faja de la espada del
  Espíritu, Manto de las doce tribus, Faja de la nube de testigos, Faja del corredor Ahimaas y Manto de los que
  edificaron el muro. Las cinco son la colección «El patio de los juegos» del álbum (título «Gozo del patio»).
- Logros: «Alegría del patio» (10 partidas) y «Corona del patio» (5 ganadas).
- Tablas: `game_juegos_grupo` (tope del día y prendas), `game_juegos_partidas` y `game_juegos_jugadores` (cada partida
  y cómo quedó cada uno).

**Cómo agregar contenido.** Los versículos de la esgrima y los personajes de «¿Quién soy?» se escriben en
`generar_banco_juegos.py` (las pistas, con otras palabras; los versículos se traen literales de la Biblia del sitio) y
se genera `server/juegos-grupo-banco.ts`. Los personajes nuevos van al final y su id no se reusa. Un lugar nuevo de la
carrera va en `LUGARES_CARRERA`, en una calle o plaza (la prueba `shared/juegos-grupo.test.ts` mira que se pueda pisar).
Las preguntas de las tribus salen de los bancos que ya hay (`server/jerusalen-banco.ts` y `server/sabio-banco.ts`).
