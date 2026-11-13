/**
 * Avisos de cada actualización del juego:
 * - «Hay una actualización»: mientras se juega, si se publicó una versión nueva de la web, un aviso
 *   explica cómo tenerla (el botón guarda el avance y recarga).
 * - Novedades: después de actualizar, la portada muestra una sola vez qué cambió.
 * Cada publicación que cambie el juego agrega su novedad al principio de NOVEDADES.
 */
import { useEffect, useState } from "react";
import { RefreshCw, Sparkles } from "lucide-react";

export type Novedad = { id: string; fecha: string; titulo: string; puntos: string[] };

/** La más nueva primero. */
export const NOVEDADES: Novedad[] = [
  {
    id: "2026-11-13-personajes-proporciones",
    fecha: "13 de noviembre de 2026",
    titulo: "Personajes con proporciones de verdad",
    puntos: [
      "🧍 Todas las personas del juego (tu personaje, los maestros, el pueblo y los vecinos) tienen ahora la cabeza en su medida: unas 5 cabezas de alto en lugar de 3, con el torso y los brazos más largos. Los niños, un poco más cabezones, como debe ser.",
      "👤 Caras más sobrias, sin las mejillas pintadas, y mangas más finas.",
      "👘 La ropa del mercado (la túnica, el turbante o el velo, el zurrón) y lo que llevas en la mano (el cayado, el rollo, las herramientas del huerto) quedan en su lugar, y te sigues sentando bien en sillas, bancos y cojines.",
    ],
  },
  {
    id: "2026-11-13-motor-de-imagen",
    fecha: "13 de noviembre de 2026",
    titulo: "La imagen del juego, más profesional",
    puntos: [
      "🎨 Todos los lugares (la ciudad, el templo, tu casa, los edificios, el huerto, el aula y el estudio de «¿Quién es sabio?») se dibujan con la misma luz y el mismo color: más contraste, luces doradas y sombras con un toque de azul.",
      "🕯️ De noche, las lámparas, el fogón y el horno brillan de verdad y dejan su luz cálida alrededor.",
      "🧱 Las paredes, los muebles y las columnas quedan asentados en el piso, con su sombra en los rincones.",
      "⚙️ En la pausa, «Calidad de imagen»: Auto, Alta, Media o Ahorro. En Auto, el juego elige la mejor para tu teléfono o computadora, y baja sola si el aparato no alcanza.",
    ],
  },
  {
    id: "2026-11-13-pasos-libres",
    fecha: "13 de noviembre de 2026",
    titulo: "Se puede pasar a todas partes",
    puntos: [
      "🪜 En la casa de piedra, la escalera del patio ya no tapa el paso: del patio se pasa al cuarto del este y al de los huéspedes (y la escalera solo te sube cuando caminas hacia ella).",
      "📚 En la escuela de los profetas, el aposento de oración ya no queda detrás de las bibliotecas; en el palacio se llega al archivo del reino y a los depósitos del rey.",
      "🚪 La alcoba de la casa de adobe se abre por dos celdas, y tocando el piso el personaje entra por cualquier puerta.",
      "👣 Al caminar tocando el piso, los círculos que cruzas en el camino (el horno, una estación) ya no se abren solos: solo el lugar al que vas.",
      "🪑 Al remodelar, un mueble no puede tapar el paso a un cuarto, al horno, a la escalera ni a la puerta del huerto. Si en tu casa algún mueble ya tapaba un paso, volvió a tu arcón.",
    ],
  },
  {
    id: "2026-11-13-noche-con-companeros",
    fecha: "13 de noviembre de 2026",
    titulo: "«La noche de los sabios» también se juega solo",
    puntos: [
      "🌙 Quien abre la noche puede agregar compañeros de la computadora (🌱 fácil, 🌿 normal o 🌳 difícil): con dos ya se puede empezar, aunque no haya nadie más en línea.",
      "🤖 Contestan con su propio tiempo y no siempre aciertan: el difícil es rápido y sabe mucho. Se ven como tales, con 🤖 junto al nombre.",
      "🏅 Con compañeros la noche es de práctica: hasta 4 de gozo y sin puntos para la copa del barrio.",
    ],
  },
  {
    id: "2026-11-13-companeros-en-el-patio",
    fecha: "13 de noviembre de 2026",
    titulo: "Juega solo cualquier juego del patio",
    puntos: [
      "🤖 En la esgrima, las doce tribus, «¿Quién soy?», la carrera y el muro ya puedes agregar compañeros de la computadora (🌱 fácil, 🌿 normal o 🌳 difícil) y jugar aunque no haya nadie más.",
      "⚔️ Contestan con su propio tiempo y no siempre aciertan. En las tribus dejan contestar primero a las personas de su tribu, y en «¿Quién soy?» esperan algunas pistas antes de adivinar.",
      "🏃 En la carrera corren su recorrido (en la tabla ves por qué lugar va cada uno) y en el muro cargan piedras con ustedes.",
      "⚡ Con «🤖 Llenar con la computadora» completas la sala de un toque. Con compañeros la partida es de práctica: hasta 10 de gozo por día, sin copa ni prendas.",
    ],
  },
  {
    id: "2026-11-13-juegos-de-grupo",
    fecha: "13 de noviembre de 2026",
    titulo: "Siete juegos de grupo en el patio: lotería bíblica, generala, escaleras de Jacob y más",
    puntos: [
      "🎴 Lotería bíblica: 54 figuras dibujadas para el juego. El cantor saca cada carta con su copla y su versículo (y hasta la dice en voz alta); marca tu tabla con frijolitos y canta «¡Lotería!».",
      "🎲 Generala con dados de verdad que ruedan, 🪜 escaleras de Jacob que suben (y serpientes que enseñan algo al bajar) y ⭐ damas chinas con saltos encadenados en la estrella.",
      "🃏 Memoria bíblica (junta a cada personaje con su versículo), ✍️ «Basta» bíblico con una letra y cuatro categorías, y 🖍️ «Dibuja y adivina».",
      "🤖 Todos se juegan con tu gente o solo, con compañeros de la computadora (menos dibujar, donde solo miran). Y en el patio hay seis mesas nuevas con gente jugando.",
    ],
  },
  {
    id: "2026-11-13-domino",
    fecha: "13 de noviembre de 2026",
    titulo: "El dominó llegó al patio",
    puntos: [
      "🁫 Dominó doble seis, como se juega en Latinoamérica: de 2 a 4 jugadores, y con 4 por parejas (el de enfrente es tu compañero). Se juega a 100 puntos.",
      "🟩 Una mesa de paño verde con la fila de fichas que serpentea; los dobles van de pie y la ficha recién puesta brilla. Tus fichas que casan se levantan, y si una casa en las dos puntas, eliges dónde ponerla.",
      "🔁 Con menos de 4 jugadores se roba del pozo. Al terminar cada mano (por dominó o por tranque) se destapan todas las fichas y se anotan los puntos.",
      "🤖 Juega solo con tres compañeros de la computadora: el difícil cuenta las fichas, recuerda quién pasó y trata de tranquear al rival.",
    ],
  },
  {
    id: "2026-11-13-ajedrez-damas-cuatro",
    fecha: "13 de noviembre de 2026",
    titulo: "Ajedrez, damas y cuatro en raya en el patio",
    puntos: [
      "♟️ Ajedrez con todas sus reglas: enroque, comer al paso, coronar el peón (eliges en qué se convierte), jaque mate, ahogado y tablas. Las piezas son de marfil y de ébano, se deslizan por el tablero y el rey en jaque late en rojo.",
      "⚫ Damas a la española: el peón come hacia adelante, la dama vuela por la diagonal, comer es obligatorio y hay que comer la mayor cantidad. Las comidas largas se ven salto por salto.",
      "🔴 Cuatro en raya: las fichas de granate y de oro caen con rebote y la línea de cuatro brilla.",
      "🤖 En los tres puedes jugar solo contra la computadora, en fácil, normal o difícil. En difícil, hay que pensar de verdad para ganarle.",
    ],
  },
  {
    id: "2026-11-13-juegos-de-mesa",
    fecha: "13 de noviembre de 2026",
    titulo: "Juegos de mesa en el patio, y compañeros de la computadora para jugar solo",
    puntos: [
      "🎲 En el patio de los juegos hay «Juegos de mesa»: quien crea la sala elige el juego, cada uno tiene su asiento y juega en su turno, con su reloj. El primero es el tres en raya, con su tablero de madera; pronto vienen el ajedrez, las damas, el dominó, el parchís y más.",
      "🤖 ¿No hay nadie? Agrega compañeros de la computadora (🌱 fácil, 🌿 normal o 🌳 difícil) y juega solo, o completa la mesa con ellos. Siempre se ven como tales: llevan 🤖 junto a su nombre.",
      "🪑 Si alguien llega a una mesa llena, toma el asiento de un compañero de la computadora. Y si alguien se va a mitad de partida, la computadora sigue en su asiento para que los demás terminen.",
      "✨ Con compañeros de la computadora la partida es de práctica: hasta 10 de gozo por día, sin copa ni prendas. Entre personas siguen los premios de siempre.",
    ],
  },
  {
    id: "2026-11-13-banda-sonora",
    fecha: "13 de noviembre de 2026",
    titulo: "La banda sonora: música propia en cada lugar y en cada juego",
    puntos: [
      "🎶 Jerusalén tiene su banda sonora: pistas propias con laúd, qanún, flauta ney, lira, panderos, cuerdas y coro sin palabras, una para cada lugar.",
      "🏛️ El templo de día y de noche, la plaza, el mercado, tu barrio, tu casa, el huerto, la calle de los siervos, la escuela de los profetas, el palacio y la cámara de los sacerdotes: cada uno suena distinto, y la música cambia con la hora y en las fiestas.",
      "🎲 «¿Quién es sabio?», el aula, los exámenes, el patio y cada juego tienen su música: tranquila para pensar, alegre para jugar en grupo y con energía para correr.",
      "🔊 En el menú de pausa está el «Volumen de la música». Con la radio del ministerio sonando, la música del juego se aparta.",
    ],
  },
  {
    id: "2026-11-13-la-casa-viva",
    fecha: "13 de noviembre de 2026",
    titulo: "La casa viva: más bonita por dentro, muebles que se usan y ropa de pies a cabeza",
    puntos: [
      "🏠 Tu casa por dentro tiene ventanas con celosía por donde entra la luz del día, tapices en las paredes, repisas con cántaros, vigas en el techo y lámparas. Y todos los muebles del mercado se ven más finos.",
      "📐 Más espacio sin mover lo que ya pusiste: la tienda gana el rincón del toldo, la casa de adobe una alcoba y la casa de piedra un cuarto para los huéspedes. Ahora caben 14, 24, 36 y 50 muebles.",
      "🪑 Los muebles se usan: siéntate en las sillas, los bancos y los cojines; descansa en tu lecho (+3 de gozo), cocina un guiso en el fogón con 2 de harina y 1 de aceite (+3 de gozo, y si ese día abres tu banquete cada invitado gana 1 de gozo más) y lee el rollo del estante (+2 de gozo y un versículo distinto cada día). Descansar, cocinar y leer dan gozo una vez por día.",
      "🍲 Muebles nuevos en el mercado: el fogón de piedras, los cántaros de barro, el baúl de acacia, el lecho con cobertor y el tapiz bordado. Júntalos en tu álbum para ganar el título «Casa viva».",
      "👘 Ropa de pies a cabeza en el tejedor: túnicas con franjas y la bordada, turbantes, velos, sandalias, el cayado de pastor, el rollo en la mano y el zurrón. Toca 👁️ para probártela: ves a tu personaje girando con ella antes de comprarla. Júntalas para ganar «De pies a cabeza».",
      "🪞 En Tu casa → 🪔 Adornos y ropa eliges qué llevar en cada parte (túnica, manto, faja, cabeza, pies, mano y bolsa) y lo ves en tu muñeco antes de ponértela. Tus vecinos te ven así en la ciudad.",
    ],
  },
  {
    id: "2026-11-13-patio-de-los-juegos",
    fecha: "13 de noviembre de 2026",
    titulo: "El patio de los juegos: juega en grupo con tu gente de la iglesia",
    puntos: [
      "🎲 Un lugar nuevo al norte de la ciudad, junto al barrio de la puerta de las Ovejas (en el mapa: «Ir a… → El patio de los juegos»), y el botón 🎲 a la derecha. Crea una sala, comparte su código de 6 letras o invita a tus amistades y a la gente de tu barrio: caben de 2 a 12 personas, y se habla con frases fijas y versículos.",
      "⚔️ Esgrima bíblica: sale una cita y hay que hallar su versículo (o al revés). Gana la ronda quien acierta primero (Efesios 6:17).",
      "🛡️ Las doce tribus: de 2 a 4 tribus. Si tu tribu falla, las demás le roban la pregunta.",
      "🕵️ ¿Quién soy?: un personaje de la Biblia y sus pistas, una por una. Con menos pistas, más puntos.",
      "🏃 La carrera de Ahimaas: corran por las calles de Jerusalén hasta la luz dorada de cada lugar y vuelvan al patio (2 Samuel 18:23).",
      "🧱 Levantemos el muro: en grupo, lleven piedras de la cantera al muro del patio en 5 minutos (Nehemías 4:6).",
      "🏆 Jugar da gozo (hasta 60 por día) y puntos para la copa de tu barrio. Ganar cada juego da su prenda, que no se vende, y hay dos logros nuevos: «Alegría del patio» y «Corona del patio».",
    ],
  },
  {
    id: "2026-11-13-examenes-de-rango",
    fecha: "13 de noviembre de 2026",
    titulo: "Los exámenes de rango: cada escalón de tu camino tiene su examen",
    puntos: [
      "🎖️ En el aula de tu camino hay cuatro exámenes de rango: uno para cada escalón, del segundo al quinto (por ejemplo: sacerdote de turno, vidente o escriba del rey; y hasta sumo sacerdote, varón de Dios o canciller del rey).",
      "🧩 Cada examen tiene 3 o 4 partes. Das cada parte cuando quieras y queda guardada; si no la apruebas, repasa y vuelve en 15 minutos con preguntas nuevas. También puedes darlo todo de corrido: tiene su sello y un poco más de gozo.",
      "🏛️ Para ser «de turno» (vidente, escriba del rey) hace falta el examen de ese escalón, y para recibir un cargo al cerrar la temporada, el examen del cargo. Los cargos altos piden además un repaso corto cada temporada.",
      "🥻 Cada examen aprobado da mérito, gozo y su prenda propia (no se vende: se gana), que entra en tu álbum. Con el examen del tercer escalón enseñas en las reuniones: quien va a tu reunión gana un poco más de gozo.",
      "📜 Lo que te falta lo ves en «Para hoy» y en la ventana de la temporada.",
    ],
  },
  {
    id: "2026-11-13-sabio-vivo",
    fecha: "13 de noviembre de 2026",
    titulo: "«¿Quién es sabio?» más vivo, y la noche de los sabios para jugar en grupo",
    puntos: [
      "🌙 La noche de los sabios: abre una sala con su código de seis letras e invita a tus vecinos y amigos (de 3 a 12). Todos responden a la vez las mismas 12 preguntas; después de cada una, la tabla en vivo con los puestos que suben y bajan, y al final el podio en el estudio.",
      "🏆 Las tablas ahora muestran cada partida: Hoy, La semana, Siempre y Mis partidas, con la grada en que quedó cada quien, sus puntos, su tiempo, sus comodines y cómo terminó.",
      "🥁 Al confirmar tu respuesta, las luces bajan, cae un foco sobre tu atril y suena el redoble; al revelar, verde con destellos dorados o rojo con apagón.",
      "👀 Etán ezraíta a veces te mira a los ojos y te hace dudar: «¿Es tu respuesta final?». Pasa igual si tu respuesta es buena o mala, y mientras habla el reloj se detiene.",
    ],
  },
  {
    id: "2026-11-13-el-huerto",
    fecha: "13 de noviembre de 2026",
    titulo: "El huerto de verdad, detrás de tu casa",
    puntos: [
      "🚪 Tu casa tiene una puerta al fondo: sal por ella a tu huerto, con sus surcos, el pozo (o tu cisterna), los olivos, la higuera y el granero. También llegas con «🌾 Mi huerto».",
      "⛏️ Cada tarea se hace con tu dedo, nada se hace solo: desliza a lo largo del surco para arar con la azada, sembrar, abonar y segar con la hoz; mantén apretado para sacar agua del pozo, regar y guardar las gavillas en el granero; toca las malas hierbas para arrancarlas y las aves para espantarlas (Mateo 13:4).",
      "⭐ La cosecha rinde más si cuidas el surco: una estrella por el riego, otra si está limpio de hierbas al segar y otra por el abono de las ovejas de tu redil. Las aves que nadie espanta se comen parte.",
      "🏺 El agua se cuenta: tu cántaro lleva para 3 surcos y el pozo da sus cántaros por día. Con gozo, el herrero te da la azada de hierro, el cántaro grande y la hoz de hierro.",
      "🌿 Cada día, 3 tareas del huerto con gozo. Y al segar puedes dejar el rincón del surco para el pobre y el extranjero (Levítico 23:22).",
      "🏘️ Tus vecinos ven tu huertito delante de tu casa: lo que sembraste y cómo va creciendo.",
    ],
  },
  {
    id: "2026-11-13-el-aula",
    fecha: "13 de noviembre de 2026",
    titulo: "Las clases ahora se dan en el aula, con el maestro y tus compañeros",
    puntos: [
      "🏫 En la escuela de los profetas (con Isaías y Miqueas), en la cámara de los sacerdotes (con Eleazar) y en la sala de los escribas del palacio (con Eliaquim) hay un aula de verdad: bancos con compañeros que tienen su nombre, el atril del maestro, la luz de las ventanas y las lámparas.",
      "📜 El maestro enseña cada sección en su burbuja, escribe la pregunta en el gran rollo y tú tocas la respuesta en el rollo de abajo, con el reloj corriendo. Si aciertas, te felicita y la clase aplaude; si no, te explica con el versículo.",
      "🎓 El examen final y las cátedras también se dan en el aula: al terminar, se revisan las respuestas juntos y la última tiene el suspenso de «¿Quién es sabio?». Al final, tu nota con su medalla.",
      "🔀 En el examen final de los estudios, la respuesta buena ya no cae en la misma letra en todas las preguntas.",
    ],
  },
  {
    id: "2026-11-13-mentores",
    fecha: "13 de noviembre de 2026",
    titulo: "Los mentores y los dichos de los ancianos",
    puntos: [
      "🎓 Si acabas de llegar a Jerusalén, elige un mentor en Misiones → Mentores: un vecino o un amigo con experiencia que te acompaña en seis pasos (tu primer servicio, los primeros pasos, encontrarse en la ciudad, el primer estudio, la primera obra y tres días en Jerusalén). Cada paso les da gozo a los dos.",
      "🧥 Cuando el aprendiz cumple los seis pasos, los dos reciben el manto de Elías (el que Elías echó sobre Eliseo, 1 Reyes 19:19) y el mentor gana el título «Idóneo para enseñar».",
      "🌱 En la ciudad, tu mentor y tus aprendices llevan su marca sobre el nombre: puedes ir adonde están, invitar a que vengan y encontrarte en la ciudad.",
      "🧓 Los ancianos de la puerta dicen cada día un dicho de Proverbios. Siéntate a escucharlo (+3 de gozo) y junta los 30 en tu álbum para ganar «Oído de sabio». Si te falta uno, tu mentor te lo puede enseñar.",
    ],
  },
  {
    id: "2026-11-13-registro",
    fecha: "13 de noviembre de 2026",
    titulo: "El registro de cada jugador",
    puntos: [
      "📜 Al visitar una casa, en la ficha de un vecino o tocando su nombre en las tablas, abre «Ver su registro»: todo lo que ha hecho esa persona.",
      "🔥 Su servicio en cada camino, sus estudios aprobados (con su nota) y el grado en cada cátedra.",
      "🏆 Sus últimas partidas de «¿Quién es sabio?»: en qué grada quedó, con cuántos puntos y en cuánto tiempo; sus duelos y su mejor concurso.",
      "🏠 Su casa con sus estrellas, lo que hizo por su barrio, sus logros y su álbum. El tuyo está en «Tu casa» → «Ver mi registro».",
    ],
  },
  {
    id: "2026-11-12-opciones-revueltas",
    fecha: "12 de noviembre de 2026",
    titulo: "Las preguntas ya no tienen la respuesta siempre en el mismo lugar",
    puntos: [
      "🔀 En la práctica de los estudios y en la pregunta de las reuniones en las casas, la respuesta buena casi siempre era la primera: ahora las opciones van revueltas.",
      "🏆 En el concurso de la semana, las opciones también quedan parejas: la buena puede estar en cualquier lugar.",
    ],
  },
  {
    id: "2026-11-12-temporada-2",
    fecha: "12 de noviembre de 2026",
    titulo: "Ya está lista la historia de la temporada 2: la gran Pascua de Ezequías",
    puntos: [
      "🚪 Desde el lunes 7 de diciembre, una historia nueva (2 Crónicas 29–31): el rey Ezequías abre las puertas del templo y la ciudad lo limpia, los levitas vuelven a cantar el cántico de Jehová, los correos llevan las cartas del rey por todo Israel y Jerusalén celebra la Pascua con un solo corazón.",
      "🎉 Al final, del 1 al 3 de enero: el gran regocijo en la plaza, con la gran alabanza el domingo 3 de 6 a 7 de la tarde (hora de Texas).",
      "👀 En la ciudad verás los levitas con sus cestos hasta el torrente de Cedrón, los cantores con címbalos, arpas y trompetas en la escalinata, el correo que pregona junto a la puerta, las tiendas de los peregrinos en el monte y los altares de Acaz que se quitan uno a uno.",
      "🧱 Lo que la ciudad levantó en la temporada 1 se queda: las torres nuevas y el conducto de Siloé siguen en pie.",
      "📚 En tu álbum, cada historia es una colección: junta sus cinco prendas y gana «Atalaya de Sion» o «De un solo corazón».",
    ],
  },
  {
    id: "2026-11-12-la-ciudad",
    fecha: "12 de noviembre de 2026",
    titulo: "El arca de Joás, invita a un amigo y tu álbum",
    puntos: [
      "🪙 El arca de Joás: arriba de la escalinata del templo hay un arca para toda la ciudad. Echa tu gozo (hasta 500 por día) y, cuando entre todos la llenen, la escalinata se llena de lámparas de oro y quedan sus nombres en el libro del arca (2 Crónicas 24:10).",
      "🤝 Invita a un amigo (en Misiones): comparte tu enlace; cuando tu amigo juegue 3 días, tú ganas 150 de gozo, él 100, y los dos reciben la faja del buen amigo.",
      "📚 Tu álbum (Tu casa → Álbum): todo lo que tuviste queda anotado. Completa colecciones y gana títulos como «Bordador de oro», «Guarda los tiempos» o «Dador alegre»: el que elijas lo ven tus vecinos.",
    ],
  },
  {
    id: "2026-11-12-el-taller",
    fecha: "12 de noviembre de 2026",
    titulo: "El taller: piezas finas, ovejas, telar e intercambio",
    puntos: [
      "🛠️ El artesano (Mercado → Artesano): llévale 4 iguales y te hace la pieza fina, dorada, sin nada al azar. Hay muebles dorados para tu casa (suman +6 a las estrellas) y ropa bordada de oro que se ve en la ciudad. Las piezas finas piden estudios aprobados en la escuela.",
      "🐑 Tu redil (Tu casa → Oficios): los corderos que traen tus siervos se quedan como ovejas, se ven junto a tu casa y dan lana. Trasquílalas y teje en el telar de tu casa cojines, mantos y alfombras.",
      "🎒 Tu fardo: en «Ropa» compra copias de una prenda para venderlas o para llevar 4 al artesano.",
      "🤝 El intercambio (Mercado → Intercambio): véndeles a tus vecinos lana, ropa, muebles y piezas finas. La ropa de temporada, fuera de su tiempo, solo se consigue aquí: «Todo tiene su tiempo» (Eclesiastés 3:1).",
    ],
  },
  {
    id: "2026-11-12-mi-barrio",
    fecha: "12 de noviembre de 2026",
    titulo: "Mi barrio: obras de todos, regalos y banquetes",
    puntos: [
      "🏗️ Las obras del barrio (Tu barrio → Obras): los vecinos dan su gozo para una obra común a la vez: el pozo, los bancos de los ancianos, el horno, los árboles de la calle, el granero y la placa de los constructores. Cada obra se ve en las calles y ayuda a todas las casas: el huerto crece más rápido, las reuniones premian a más vecinos, el horno tarda la mitad, más estrellas y un alfolí más grande.",
      "🪨 Los que más dan van en la placa de los constructores, como en Nehemías 3.",
      "🎁 Regalos: al visitar la casa de un vecino o amigo, toca «Regalarle algo» y mándale algo del mercado con una frase bonita.",
      "🍞 El banquete en tu casa (Tu casa → Vecinos): abre tu casa 20 minutos; los vecinos que lleguen a tu puerta (círculo dorado) se sientan a tu mesa y ganan gozo, y tu casa gana honra.",
    ],
  },
  {
    id: "2026-11-11-obras-de-la-casa",
    fecha: "11 de noviembre de 2026",
    titulo: "Edifica tu casa con el gozo",
    puntos: [
      "🧱 Las obras de tu casa: en Tu casa → Obras edificas con tu gozo y con harina de tu huerto (el pan de los obreros): cerco, cisterna, horno de barro, granero, emparrado, puerta de cedro, pórtico, fuente y hasta una torre. Tus vecinos ven cada obra.",
      "💧 Las obras sirven: la cisterna riega lo que siembras, el huerto ensanchado tiene una parcela más, el horno de barro hornea 5 y el granero guarda 30 más.",
      "📚 Las obras finas piden estudios aprobados en la escuela: estudiar también edifica tu casa.",
      "⭐ Las estrellas de tu casa (de 1 a 5): suman tus obras, tus muebles, los juegos de muebles completos, tus adornos y tu letrero. Las ven tus vecinos cuando te visitan.",
      "📸 La foto de tu casa: tómala en Tu casa y compártela por WhatsApp, TikTok o Facebook para invitar a tus amigos.",
    ],
  },
  {
    id: "2026-11-11-regalo-de-regreso",
    fecha: "11 de noviembre de 2026",
    titulo: "El regalo de regreso y lo que hizo tu barrio",
    puntos: [
      "🎁 Si vuelves a Jerusalén en línea después de dos días o más, la entrada te da un regalo: gozo y semillas de la estación para sembrar al llegar. Si estuviste fuera una semana o más, la primera vez también recibes el mejor vestido (Lucas 15:22), que no se vende.",
      "🏘️ Mientras no estabas: ahora también ves lo que hizo tu barrio (vecinos nuevos, la charla, las reuniones, la ayuda y la copa de la semana), quién visitó y bendijo tu casa, tu huerto listo y cómo va la ciudad.",
    ],
  },
  {
    id: "2026-11-11-ropa-de-temporada",
    fecha: "11 de noviembre de 2026",
    titulo: "La ropa de cada tiempo y la ciudad según el año",
    puntos: [
      "🧣 Ropa de temporada: cada estación y cada fiesta grande trae su prenda, que solo se vende en esos días (hoy, el manto de lana gruesa del invierno y la faja plateada de la luna nueva). Quien la compra, la guarda para siempre.",
      "🌦️ El pronóstico: el calendario dice si mañana llueve. Si llueve, lo que siembres ese día queda regado.",
      "👋 Mientras no estabas: al volver después de unos días, la entrada te cuenta qué fiestas pasaron, si cambió la estación y qué viene.",
      "🌸 La ciudad cambia con el año: pétalos de almendro en la siega de la cebada y lámparas en las calles en Navidad y Año Nuevo.",
    ],
  },
  {
    id: "2026-11-11-anio-de-jerusalen",
    fecha: "11 de noviembre de 2026",
    titulo: "El año de Jerusalén: el juego sigue el calendario real",
    puntos: [
      "📅 La fecha de Jerusalén en línea es la hebrea de verdad (hoy, 1 de Quisleu: luna nueva) y las fiestas de Levítico 23 llegan en sus días reales: la Pascua el 21 de abril de 2027, Pentecostés el 11 de junio y los Tabernáculos el 16 de octubre.",
      "🌧️ Seis estaciones de la tierra de Israel: en invierno llueve seguido (lo que siembras un día de lluvia queda regado), cada estación hace crecer más rápido un cultivo (la cebada, el trigo o los olivos) y los mercaderes buscan más lo que escasea: guarda en tu alfolí y vende a tiempo.",
      "🎺 Cada luna nueva, la hora de las trompetas: de 7 a 9 de la noche (hora de Texas) el servicio en el templo vale ×1,5. Cada sábado, el día de reposo.",
      "⭐ Fiestas del ministerio contadas con las profecías de Isaías: la Navidad, el Año Nuevo y la Semana Santa.",
      "👆 Toca la fecha del marcador de la ciudad para ver el calendario: hoy, la estación, lo que cambia y lo que viene.",
    ],
  },
  {
    id: "2026-11-12-mapa-conectado",
    fecha: "11 de noviembre de 2026",
    titulo: "El mapa al día y todo conectado",
    puntos: [
      "🗺️ El mapa de Jerusalén muestra la calle de los siervos con sus siete puertas, un 📜 que late en la puerta de quien tiene tu recado de hoy y las obras del capítulo de la semana (las torres del muro, el conducto hasta el estanque de Siloé…). Desde el mapa vas directo a tu recado o al lugar del capítulo.",
      "🏆 Cada recado cumplido suma 5 puntos a la copa de tu barrio.",
      "🏅 Dos logros nuevos: «Siervo fiel» (7 días seguidos de racha) y «Mensajero de los siervos» (10 recados).",
      "⚡ La web entera carga más rápido: el código que baja cada página pesa la mitad.",
    ],
  },
  {
    id: "2026-11-12-avisos-telefono",
    fecha: "12 de noviembre de 2026",
    titulo: "Avisos al teléfono 🔔",
    puntos: [
      "🔔 Jerusalén en línea puede avisarte aunque el juego esté cerrado: actívalos en el menú de pausa → «Avisos al teléfono» (o desde «Misiones»).",
      "🔥 Tu racha: por la tarde, si hoy todavía no serviste. 🌾 Tu huerto: cuando una parcela queda lista. ⚔️ Duelos: al momento, cuando alguien te reta. 🎉 Fiestas: 10 minutos antes de una fiesta grande, una por día como mucho.",
      "🌙 Nunca de noche: de 10 de la noche a 8 de la mañana (hora de Texas) no llega ningún aviso. Eliges cuáles quieres y los apagas cuando quieras.",
    ],
  },
  {
    id: "2026-11-12-gran-restauracion",
    fecha: "12 de noviembre de 2026",
    titulo: "La gran restauración y el camino de hoy",
    puntos: [
      "🏛️ La escuela de los profetas, el palacio del rey y la cámara de los sacerdotes crecieron: cada uno tiene tres salas nuevas que están en ruinas, como la biblioteca de los profetas, el archivo del reino o la cámara de los cantores.",
      "🧱 Entra, párate en un círculo azul y quédate unos segundos: cada trabajo quita escombros y pone lo nuevo. Al terminar la sala, vuelve la gente a trabajar ahí, ganas gozo y mérito, y cada día hay algo que hacer en ella (leer el rollo del día, orar, cantar con los levitas…).",
      "🌅 Tu primer día: la primera sala del edificio de tu camino te enseña a servir adentro, y da un premio especial.",
      "➡️ Arriba de la ciudad verás siempre tu siguiente paso, con un botón para ir. El camino de hoy tiene cuatro pasos (servir, aprender, ayudar y restaurar); al cumplirlos, abres el cofre del día y cuenta para tu racha.",
      "📔 El libro de la restauración, en «Para hoy», muestra las nueve salas y cómo vas.",
    ],
  },
  {
    id: "2026-11-11-historia-temporada",
    fecha: "11 de noviembre de 2026",
    titulo: "La historia de la temporada: la amenaza de Senaquerib",
    puntos: [
      "📖 Cada temporada cuenta una historia, un capítulo por semana. La primera: los días del rey Ezequías, cuando Senaquerib rey de Asiria vino contra Jerusalén (2 Reyes 18–20; 2 Crónicas 32; Isaías 36–37). Ábrela desde «Para hoy» o desde la ventana de la temporada.",
      "🧱 Esta semana, capítulo 1: el muro y las torres. Toda la ciudad tiene una meta juntos: cada deber suma 1, cada encargo del día 5 y cada recado de la calle de los siervos 10. Mira las tres torres nuevas del muro del oriente: suben con lo que sirve toda Jerusalén.",
      "🎁 Si la ciudad cumple la meta, quienes aportaron al menos 25 reciben gozo y una prenda que no se vende (la faja de los que edifican, el manto de las aguas de Siloé…).",
      "💧 Lo que viene: el conducto de Siloé (la zanja avanza por la calle del sur y el estanque se llena), el Rabsaces gritando frente a la puerta y la oración del rey, y la liberación. ¿Qué pasará la próxima semana?",
      "🎺 Al final, del viernes 4 al domingo 6 de diciembre: la fiesta de la liberación en la plaza, con toda la ciudad. La gran alabanza: el domingo a las 6 de la tarde (hora de Texas).",
      "🗣️ Los siervos de la calle de los siervos y la gente de la ciudad hablan del capítulo de cada semana, y hay recados nuevos de la historia.",
    ],
  },
  {
    id: "2026-11-11-la-gente-habla",
    fecha: "11 de noviembre de 2026",
    titulo: "La gente de la ciudad habla",
    puntos: [
      "💬 Acércate a cualquiera en la calle: los niños del pozo, los guardias, los levitas, los alumnos de los profetas, los peregrinos, los mercaderes y los vecinos te dicen algo, cada uno según quién es.",
      "🗣️ Muchos hablan de los siervos de la calle de los siervos (Azarías, Conanías, Isaías, Miqueas, Eliaquim, Etán), de quién busca a alguien para el recado de hoy y de lo que de verdad pasa en Jerusalén (el barrio que va primero, quién subió más alto en «¿Quién es sabio?»…).",
      "🕊️ Las palomas que rondan cerca ahora tienen un tamaño más natural.",
    ],
  },
  {
    id: "2026-11-11-racha",
    fecha: "11 de noviembre de 2026",
    titulo: "La racha de servicio 🔥",
    puntos: [
      "🔥 Cada día que cumples un encargo del día o el recado de la calle de los siervos, tu racha sube: +2 de gozo el primer día, 2 más cada día seguido (hasta +14), y premios grandes a los 7, 30 y 100 días.",
      "🕊️ El día de reposo (el sábado) no la rompe: «Acuérdate del día de reposo para santificarlo» (Éxodo 20:8). Si sirves en sábado, también cuenta.",
      "🌅 En «Para hoy» ves tu racha, si está por perderse y quién tendrá un recado para ti mañana. La llama está en el marcador de la ciudad.",
      "📱 En teléfonos angostos, el marcador muestra solo la corona y el número de tu casa para que nada quede tapado.",
    ],
  },
  {
    id: "2026-11-11-diseno-nuevo",
    fecha: "11 de noviembre de 2026",
    titulo: "Diseño nuevo: portada, emblemas, retratos y medallas",
    puntos: [
      "🎨 Portada nueva que se mueve: el atardecer sobre Jerusalén, el sol tras el monte, las puertas de oro encendidas, el fuego del altar con brasas y humo, sacerdotes sirviendo y palomas cruzando el cielo.",
      "🏛️ Emblema propio del juego (el arco de oro con el fuego del altar y dos ramas de olivo) y medallón de «Jerusalén en línea» con la ciudad amurallada; los nombres van en letras de oro con un brillo que pasa.",
      "🙂 Los retratos de los personajes tienen luz y volumen, y un aro de oro brillante.",
      "🪟 Las ventanas tienen cabecera de noche y oro, papel con textura y una entrada suave; los botones principales son de oro con relieve, y el marcador es de vidrio.",
      "🏅 Los logros son medallas de bronce, plata u oro con su cinta, y un anillo muestra cuánto te falta para la siguiente.",
    ],
  },
  {
    id: "2026-11-11-calle-siervos",
    fecha: "11 de noviembre de 2026",
    titulo: "La calle de los siervos de Dios: recados y chismes",
    puntos: [
      "🏛️ Al sur de la ciudad, pasando el barrio del sudeste, está la calle de los siervos: las casas de Azarías, Eleazar, Conanías, Isaías, Miqueas, Eliaquim y Etán. Cada uno te espera en su puerta («Ir a…» → «La calle de los siervos»).",
      "🗣️ Cada uno cuenta lo que se dice en Jerusalén: lo de la Escritura (con su cita) y lo que pasa en el juego, como el barrio que va primero en la copa o quién subió más alto en «¿Quién es sabio?».",
      "📜 Cada día uno de ellos tiene un recado para ti: lleva un rollo, el aceite de las lámparas o la cuenta de los diezmos de una casa a otra. Al cumplirlo: mérito y gozo. Lo ves también en «Para hoy».",
    ],
  },
  {
    id: "2026-11-11-casas-vistas",
    fecha: "11 de noviembre de 2026",
    titulo: "Mira cada cosa antes de comprarla, y casas con más vida",
    puntos: [
      "🖼️ En el mercado cada mueble, adorno y prenda tiene su foto en 3D (la ropa, puesta en un personaje). Tócala para verla en grande: así sabes cómo queda la alfombra, el lecho, el estante de rollos o el toldo antes de comprar.",
      "🏠 Las casas tienen más detalles, distintos en cada una: alfombras puestas a airear sobre el pretil, ropa tendida en el terrado, lino secándose, leña apilada, contraventanas, macetas, el odre colgado en las tiendas y una lamparita encendida junto a la puerta cuando cae la noche.",
    ],
  },
  {
    id: "2026-11-11-gestos",
    fecha: "11 de noviembre de 2026",
    titulo: "Gestos para tus vecinos y una ciudad con más vida",
    puntos: [
      "👋 Botón nuevo de la mano, a la derecha: saluda, aplaude, alégrate, ora, inclínate, señala o piensa. Tu personaje lo hace y tus vecinos lo ven en el suyo.",
      "🗣️ La gente de la ciudad se mueve más: los ancianos de la puerta conversan (y te hablan cuando llegas), los mercaderes te ofrecen con las manos, las familias del pueblo te saludan desde su puerta y los que pasean se paran a conversar.",
      "🕊️ Palomas que vuelan sobre el monte del templo y alrededor de donde estás, el viento que mueve las hojas y el agua del pozo que brilla.",
    ],
  },
  {
    id: "2026-11-11-texturas",
    fecha: "11 de noviembre de 2026",
    titulo: "Piedra, madera y oro que se sienten de verdad",
    puntos: [
      "🧱 Todo el juego tiene textura: la piedra caliza de la plaza y del templo con sus vetas, manchas y relieve, la arena con su grano, la madera con su veta, las hojas de los árboles y huertos, y el oro y el bronce martillados.",
      "📱 Está hecha en la tarjeta de video, sin imágenes que bajar, así que el juego carga igual de rápido; en teléfonos modestos va más simple.",
    ],
  },
  {
    id: "2026-11-11-antorchas",
    fecha: "11 de noviembre de 2026",
    titulo: "Antorchas en toda la ciudad",
    puntos: [
      "🔥 Al caer la noche se encienden más de 150 antorchas: en el borde y en el centro de la plaza, alrededor del pozo, al pie de la escalinata, en las puertas de los edificios, en los caminos y en las calles de cada barrio. Sus llamas titilan y dejan un círculo de luz cálida en el piso.",
      "🌙 La luna también alumbra un poco más: de noche ya se ve por dónde se camina. Al amanecer las antorchas se apagan solas.",
    ],
  },
  {
    id: "2026-11-11-gradas-dificiles",
    fecha: "11 de noviembre de 2026",
    titulo: "Cuanto más subes, más difícil",
    puntos: [
      "📈 Cada grada de «¿Quién es sabio?» dice su nivel: fácil (1 a 3), media (4 a 6), difícil (7 a 9), muy difícil (10 a 12) y, en la cima, solo para expertos (13 a 15). Lo ves junto a la grada, en la escalera y en la pantalla grande del estudio.",
      "🧠 Las preguntas muy conocidas que estaban en la cima bajaron a las gradas del medio, y entraron 30 preguntas nuevas de experto, casi todas de los días del rey Ezequías: el Rabsaces, Tirhaca, Merodac-baladán, la gran pascua del mes segundo, Sebna y Eliaquim…",
    ],
  },
  {
    id: "2026-11-11-estudio-sabio",
    fecha: "11 de noviembre de 2026",
    titulo: "«¿Quién es sabio?» ahora es un programa de verdad",
    puntos: [
      "🎬 La casa de la sabiduría tiene su estudio en 3D: escenario redondo con aro de luz, tu asiento frente a Etán ezraíta, las siete columnas, una pantalla gigante con la pregunta y las quince gradas que se encienden a medida que subes.",
      "👏 El público está sentado en sus gradas y reacciona: contiene el aliento en el suspenso, aplaude cuando aciertas, dice «¡oh!» cuando fallas y se pone de pie si llegas a la cima. Quienes te miran en vivo aparecen con su nombre en la primera fila.",
      "🎥 Las cámaras cambian de toma como en la televisión, los focos se mueven y la pantalla muestra la llamada a tu amigo y el consejo de los ancianos de la puerta.",
    ],
  },
  {
    id: "2026-11-11-casas-del-pueblo",
    fecha: "11 de noviembre de 2026",
    titulo: "Las casas del pueblo y sus pedidos",
    puntos: [
      "🏘️ En las parcelas que todavía no tienen dueño ahora viven familias del pueblo de Jerusalén: el alfarero, la tejedora, el pastor, la viuda… Así ningún barrio se ve vacío. Cuando llega un vecino nuevo, la familia le deja su lugar.",
      "🏺 Cada día alguna familia del pueblo pide harina, aceite o un cordero: la verás esperando en su puerta con un letrero. Dale de tu alfolí desde «Tu barrio», pestaña «Pueblo» (o tocando su letrero).",
      "🙏 Ayudar da gozo, cumple tu encargo de ayudar y suma para la copa de tu barrio; al completar el pedido, la familia te da las gracias. «Sobrellevad los unos las cargas de los otros» (Gálatas 6:2).",
    ],
  },
  {
    id: "2026-11-11-acompanar",
    fecha: "11 de noviembre de 2026",
    titulo: "Acompaña a tus vecinos por la ciudad",
    puntos: [
      "👣 En «Tu barrio», pestaña «Vecinos», los que están en línea tienen «Ir con…»: te lleva adonde está tu vecino y lo sigues caminando detrás de él. Para dejar de seguirlo, toca «Dejar de seguir» o camina tú.",
      "📣 «Invitar a venir»: a tu amigo o vecino le llega tu invitación arriba de la pantalla, con un botón para ir contigo.",
      "🧭 Al tocar a un vecino en la calle, ahora también puedes seguirlo. Solo entre amigos y vecinos del barrio, nunca con quien bloqueaste; quien apaga «Recibir llamadas e invitaciones» en la casa de la sabiduría no las recibe.",
    ],
  },
  {
    id: "2026-11-11-barrio-juntos",
    fecha: "11 de noviembre de 2026",
    titulo: "La misión del barrio y la copa de los barrios",
    puntos: [
      "🤝 Cada día tu barrio tiene una misión para hacer juntos: orar en el monte, reunirse junto al pozo, ir a la casa de la sabiduría… Cuando los vecinos pedidos están juntos en el lugar 20 segundos, la cumplen: mérito, gozo y puntos para el barrio. Mírala en «Tu barrio», en la pestaña «Copa», con «Ir allí» y «Avisar al barrio».",
      "🏆 La copa de los barrios: los deberes, los encargos, el concurso, los duelos, los consejos y las misiones juntos suman puntos para tu barrio. Los tres primeros de la semana reciben gozo para cada vecino que aportó.",
      "🏮 Tu barrio sube de nivel con sus puntos de siempre y se ve en sus calles: lámparas, olivos, una fuente, estandartes y un arco de piedra a la entrada.",
    ],
  },
  {
    id: "2026-11-11-duelo-de-sabios",
    fecha: "11 de noviembre de 2026",
    titulo: "El duelo de sabios",
    puntos: [
      "⚔️ En la casa de la sabiduría, toca «Duelo de sabios»: reta a un amigo o vecino que esté en línea, o busca a alguien que también quiera un duelo.",
      "⏱️ Los dos responden a la vez las mismas 10 preguntas (de la grada 1 a la 10), con 20 segundos cada una. Acertar vale 100 puntos y hasta 100 más si respondes rápido; al cerrar cada ronda ves lo que respondió el otro.",
      "🏆 Gana quien sume más: gozo, la tabla de duelos de la semana, el manto azul de los vencedores (5 victorias) y el logro «Vencedor de duelos». «Hierro con hierro se aguza» (Proverbios 27:17).",
    ],
  },
  {
    id: "2026-11-11-sabio-con-amigos",
    fecha: "11 de noviembre de 2026",
    titulo: "¿Quién es sabio? con tus amigos y vecinos",
    puntos: [
      "🤝 El comodín «Un amigo» ahora llama de verdad: elige a un amigo o vecino de tu barrio que esté en la ciudad (o en el templo). Le llega tu pregunta y tiene 30 segundos para darte su consejo; si no puede, contesta Husai.",
      "📞 Si te llaman a ti, verás la pregunta arriba de la pantalla: elige la respuesta, di qué tan seguro estás y mándala. Si aciertas, ganas gozo; con 5 consejos acertados, la faja azul del buen consejero y el logro «Buen consejero».",
      "📺 «En vivo»: mira las partidas que se juegan ahora en la casa de la sabiduría y anima con 👏 🙏 🔥. Quien juega ve cuántos lo miran y sus aplausos.",
    ],
  },
  {
    id: "2026-11-11-casa-sabiduria",
    fecha: "11 de noviembre de 2026",
    titulo: "La casa de la sabiduría ya está en la ciudad",
    puntos: [
      "🏛️ Al pie de la escalinata, del lado sur (frente a la cámara de los sacerdotes), se levanta la casa de la sabiduría con sus siete columnas (Proverbios 9:1).",
      "🚪 Sube su grada y párate en el círculo de la puerta para entrar a «¿Quién es sabio?». También la encuentras en el mapa y en «Ir a…».",
    ],
  },
  {
    id: "2026-11-11-quien-es-sabio",
    fecha: "11 de noviembre de 2026",
    titulo: "¿Quién es sabio?, el gran concurso",
    puntos: [
      "🏛️ La casa de la sabiduría abre sus puertas (Proverbios 9:1): ábrela desde el botón del concurso (la medalla). Te recibe Etán ezraíta, el sabio de 1 Reyes 4:31.",
      "🪜 Quince gradas, una pregunta por grada y cada vez más difícil. Las gradas 5 y 10 son seguras, puedes retirarte con lo ganado y el reloj corre: «¿Es tu última palabra?».",
      "🌾 Cuatro comodines: el aventador quita dos respuestas, los ancianos de la puerta dicen qué respondió el pueblo, Husai el amigo del rey te aconseja y, desde la grada 10, otro rollo cambia la pregunta.",
      "📜 750 preguntas comprobadas con la Reina-Valera 1960, 50 por grada: no se te repiten hasta que veas todas las de esa grada.",
      "🏆 Siete entradas por día, tablas de la semana y de siempre (los tres primeros de la semana ganan gozo), títulos de Oyente a Corazón sabio y entendido, y los trajes de los sabios: mantos y fajas que solo se ganan aquí.",
    ],
  },
  {
    id: "2026-11-11-barrio-clan",
    fecha: "11 de noviembre de 2026",
    titulo: "Tu barrio, como un clan",
    puntos: [
      "🏘️ En la ciudad, el botón con el emblema de tu barrio abre «Tu barrio» (también con la tecla B): la charla, los vecinos y el emblema.",
      "💬 La charla del barrio: frases, versículos y mensajes cortos para todo tu barrio. Los mensajes salen en una burbuja sobre quien habla, y el número del botón dice cuántos no has visto.",
      "🛡️ Por cuidado de todos: sin teléfonos, correos, redes, enlaces ni direcciones, y sin malas palabras. Puedes denunciar un mensaje o bloquear a quien molesta, y en el teléfono de un niño puedes dejar «solo frases y versículos».",
      "🦁 Los vecinos votan el emblema y el lema del barrio: el León de Judá, la paloma, la vid, el olivo… y un versículo que los una.",
      "🟢 En «Vecinos» ves quién está en línea y dónde (en el templo, en la plaza, en el mercado), y puedes ir a su casa.",
    ],
  },
  {
    id: "2026-11-10-catedra-oficios",
    fecha: "10 de noviembre de 2026",
    titulo: "Los oficios del profeta, con Miqueas",
    puntos: [
      "📯 En la sala de los rollos de la escuela te espera Miqueas de Moreset, profeta en los días de Ezequías (Jeremías 26:18): la cátedra de los oficios del profeta.",
      "📜 30 lecciones: escuchar a Dios, decir solo lo que él dice, consolar y edificar, ser atalaya, guardar la Palabra, discernir a los falsos profetas, y la historia de Samuel, Natán, Elías, Eliseo, Micaías, Amós, Jonás y Joel, hasta Jesús, por quien Dios nos habló.",
      "🔥 Miqueas enseña primero sobre lo que acabas de servir (los mensajes, memorizar o discernir). Varias lecciones seguidas, +3 de mérito y +3 de gozo por cada respuesta buena, y grados de «Oyente de la escuela» a «Maestro de los profetas».",
      "⚖️ Para que los tres caminos ganen lo mismo, las 8 lecciones del día del profeta se reparten entre la oración del monte y los oficios con Miqueas.",
    ],
  },
  {
    id: "2026-11-10-catedra-reyes",
    fecha: "10 de noviembre de 2026",
    titulo: "La cátedra de los reyes",
    puntos: [
      "👑 En el palacio, junto al trono, Eliaquim enseña a los siervos del rey: las funciones del rey, cómo debe gobernar (juzgar sin soborno, cuidar al pobre, leer la ley cada día) y cómo se corrompieron los reyes.",
      "📜 30 lecciones con la historia de los reyes: Saúl, David, Salomón, Roboam, Acab y la viña de Nabot, Joás, Uzías, Ezequías, Manasés y Josías, hasta Jesús, el Rey de reyes que enseñó que gobernar es servir.",
      "🔥 Como Eleazar, Eliaquim enseña primero sobre lo que acabas de servir (las audiencias, el pan para los pobres o la copia de la ley). Varias lecciones seguidas, hasta 8 por día: +3 de mérito y +3 de gozo por cada respuesta buena, y grados de «Oyente del palacio» a «Maestro de los reyes».",
      "🧭 Entra por la estación junto a Eliaquim o por el botón «La cátedra de los reyes» de la ventana del palacio.",
    ],
  },
  {
    id: "2026-11-10-camara-sacerdotes",
    fecha: "10 de noviembre de 2026",
    titulo: "La cámara de los sacerdotes y la cátedra de Eleazar",
    puntos: [
      "🕯️ Al pie de la escalinata del templo, del lado norte, se abrió la cámara de los sacerdotes (2 Crónicas 31:11). Adentro te recibe Eleazar, anciano de los sacerdotes.",
      "📜 La cátedra sacerdotal: 30 lecciones sobre el porqué de cada servicio del templo (la leña y el fuego del altar, el aceite de las lámparas, los panes, el incienso, las ofrendas, los diezmos y los que vienen a orar), la santidad, la bendición, la enseñanza y Jesús, nuestro sumo sacerdote.",
      "🔥 Eleazar te enseña primero sobre lo que acabas de servir en el templo. Puedes tomar varias lecciones seguidas (hasta 8 por día en tu camino): cada respuesta buena da +3 de mérito y +3 de gozo, y vas subiendo de grado, de «Oyente de la cámara» a «Maestro de la cámara».",
      "🧺 En la cámara también están los diezmos que guarda Conanías (el tesoro del templo), los turnos del sacerdocio (la escalera de la temporada) y los rollos de los estudios, abiertos para todos.",
      "🎓 Nuevo logro: «Discípulo de los maestros», al aprender 30 lecciones en las cátedras (con Isaías o con Eleazar).",
    ],
  },
  {
    id: "2026-11-10-catedra-oracion",
    fecha: "10 de noviembre de 2026",
    titulo: "La cátedra de la oración",
    puntos: [
      "🙏 Cuando el profeta se arrodilla en el círculo violeta del monte, Isaías le da una lección de oración mientras ora: una enseñanza corta y una pregunta con su cita de la Biblia.",
      "📖 30 lecciones: qué es la oración, por qué y cómo orar, el Padre nuestro, la intercesión, la oración de guerra, la perseverancia, el ayuno, orar en el nombre de Jesús y conforme a su voluntad, y los grandes intercesores (Abraham, Moisés, Elías, Daniel, Ana, Epafras).",
      "✨ Al responder, tu oración se cumple. Si aciertas: +3 de mérito y +3 de gozo. Hasta 8 lecciones por día, sin repetir las que ya aprendiste.",
    ],
  },
  {
    id: "2026-11-10-mapa",
    fecha: "10 de noviembre de 2026",
    titulo: "El mapa de Jerusalén",
    puntos: [
      "🗺️ Arriba a la derecha tienes un minimapa: tú eres la flecha blanca, 🏠 tu casa, 🔵 tus vecinos y 🟡 tu objetivo (si queda lejos, una flecha dorada en el borde te dice hacia dónde ir).",
      "🎯 Debajo dice tu objetivo de ahora: la casa del mensaje, un pobre que espera pan, el lugar de oración, la escuela, el palacio o el templo.",
      "👣 Toca el minimapa para ver toda la ciudad: con «Caminar hasta allá» tu personaje va solo hasta el objetivo, y hay botones para ir a tu casa, el templo, la plaza, el mercado, la escuela o el palacio.",
    ],
  },
  {
    id: "2026-11-10-cargos-caminos",
    fecha: "10 de noviembre de 2026",
    titulo: "Profetas y siervos del rey también compiten",
    puntos: [
      "🏅 En la ciudad ves tu mérito de la temporada y tu puesto entre los de tu camino («12.º de los profetas»). Tócalo para ver la temporada.",
      "📯 Los profetas tienen su escalera: Hijo de los profetas, Vidente, Anciano de la escuela, Profeta del rey y Varón de Dios.",
      "👑 Los siervos del rey también: Siervo del rey, Escriba del rey, Oficial del rey, Consejero del rey y Canciller del rey.",
      "🎁 Al cerrar cada temporada se reparten los cargos de cada camino (1, 3 y 12), con los estudios de su camino, y cada cargo recibe gozo: 300, 150 o 60. Tu mérito de todas las temporadas también hace crecer tu casa.",
    ],
  },
  {
    id: "2026-11-10-ganancias-vista",
    fecha: "10 de noviembre de 2026",
    titulo: "Ves lo que ganas, y nada te tapa",
    puntos: [
      "✨ Cada servicio muestra lo que ganas: «+4 mérito · +1 gozo» sube sobre tu personaje, y cuando el servidor lo confirma aparece un aviso verde junto a tu gozo (también en el templo, que ahora muestra tu gozo).",
      "🪟 La escuela, el palacio, el monte de la oración y las casas se vuelven transparentes cuando tu personaje queda detrás: ya no te tapan.",
      "🏫 La escuela tiene ventanas, un portal en la entrada y un techo más corto que ya no tapa el lugar de oración.",
    ],
  },
  {
    id: "2026-11-10-una-persona",
    fecha: "10 de noviembre de 2026",
    titulo: "Una persona, una casa",
    puntos: [
      "🏠 Tu casa es una sola para todos tus personajes: entres con tu sacerdote, tu profeta o tu siervo del rey, llegas a la misma casa, con el mismo alfolí, el mismo huerto y los mismos muebles.",
      "✨ El gozo, las semillas, el armario y el arcón también son tuyos como persona: lo que ganas con uno lo gastas con otro.",
      "🔗 Si ya tenías cosas en varios personajes, se juntaron solas en tu casa: nada se perdió (la casa más crecida quedó, con todo lo de las otras).",
      "🏅 Los logros en línea cuentan lo que hiciste con todos tus personajes. Cada personaje sigue con su camino, su mérito y su ropa puesta.",
    ],
  },
  {
    id: "2026-11-10-escuela-palacio",
    fecha: "10 de noviembre de 2026",
    titulo: "La escuela y el palacio por dentro",
    puntos: [
      "📜 Ahora se entra a la escuela de los profetas: Isaías te recibe en su aula, los alumnos estudian en sus bancos, en la sala de los rollos están los estudios y el discernimiento, en la entrada se toman los mensajes y en el patio está la olla grande (2 Reyes 4:38).",
      "👑 Y al palacio del rey: Ezequías en su trono, Eliaquim el mayordomo, el pueblo que espera audiencia, la despensa del pan y la sala de Sebna, el escriba.",
      "✨ Cada servicio tiene su círculo con nombre. Abajo hay un botón por estación que te lleva caminando, y el paso que te toca brilla en dorado.",
      "🤝 Si no es tu camino, igual puedes entrar: el maestro te recibe y te orienta, y en la escuela puedes estudiar.",
    ],
  },
  {
    id: "2026-11-10-examenes-por-persona",
    fecha: "10 de noviembre de 2026",
    titulo: "Tus estudios son tuyos, con cualquier personaje",
    puntos: [
      "🎓 Lo que estudias y apruebas vale para todos tus personajes: si diste el examen con tu profeta, tu sacerdote también lo tiene aprobado. Es una sola persona.",
      "🔁 Si no apruebas, tienes 5 intentos seguidos y cada uno trae preguntas que todavía no te salieron (cada estudio tiene 30). Con 5 de 6 apruebas; con 6 de 6 es ⭐ perfecto.",
      "📜 Tu registro (mejor nota, intentos y ⭐) lo ven tus vecinos en tu perfil.",
      "❓ El concurso de la semana sigue siendo una vez por persona (las mismas preguntas para todos, así es justo), y ahora tiene «Practicar con otras preguntas»: no cuenta para la tabla y te explica cada respuesta.",
      "🙏 El profeta ora al pie del monte, en el círculo violeta, y una flecha te guía a cada paso de tu camino.",
    ],
  },
  {
    id: "2026-11-10-economia",
    fecha: "10 de noviembre de 2026",
    titulo: "El gozo circula: puestos, diezmo y tesoro",
    puntos: [
      "🏪 En el mercado, pestaña «Vecinos»: vende lo de tu alfolí (harina, aceite, corderos) a otros jugadores al precio que elijas, o cómprales lo que necesitas para el horno o las ofrendas.",
      "🏛️ El 10 % de cada venta y de cada compra en la plaza es el diezmo: va al tesoro del templo (Malaquías 3:10). Del tesoro sale la provisión para los que empiezan y el premio semanal a las tres casas más bendecidas.",
      "⚖️ El mercader paga menos lo que ya compró mucho ese día en toda la ciudad: piensa cuándo y a quién vender.",
      "⚙️ Muebles que ayudan puestos en tu casa: el molino y las vasijas dan uno más en la cosecha, y la tinaja hace rendir el riego.",
    ],
  },
  {
    id: "2026-11-10-casa-por-dentro",
    fecha: "10 de noviembre de 2026",
    titulo: "Tu casa por dentro",
    puntos: [
      "🏠 Ahora entras a tu casa: párate en el círculo de tu puerta y caminas por sus cuartos. La tienda tiene un espacio, la casa de adobe suma la despensa y la casa de piedra trae patio con higuera, cuatro cuartos y escalera al terrado. Con aposento alto, el aposento está arriba (2 Reyes 4:10).",
      "🛠️ Toca «Remodelar»: saca los muebles de tu arcón, tócalos para moverlos, gíralos o guárdalos, y toca «Listo». Las alfombras van debajo de los muebles.",
      "🪑 El alfarero vende 20 muebles nuevos (pestaña «Muebles»): mesa, silla, lecho, telar, molino, estante de rollos, candelero, brasero y más. Las lámparas y el brasero alumbran de noche.",
      "🙏 Puedes entrar a ver la casa de un vecino desde su puerta, y dejarle una bendición adentro.",
    ],
  },
  {
    id: "2026-11-10-compras",
    fecha: "10 de noviembre de 2026",
    titulo: "Lo que compras ya se usa, y tu nombre como quieras",
    puntos: [
      "🛒 Después de comprar, el mercado te dice qué hacer y te lleva: «Ir a sembrar», «Ver mis adornos» o «Cambiar mi ropa».",
      "🏺 Los adornos se ponen solos en la puerta de tu casa si queda lugar, y la ropa te la pones al comprarla: tus vecinos la ven enseguida.",
      "🗺️ En «Ir a…» está el mercado, y tu huerto tiene un botón para ir a comprar semillas cuando no tienes.",
      "✏️ El nombre de tu personaje en línea puede ser uno de la Biblia, el de tu cuenta u «Otro nombre», el que tú prefieras.",
    ],
  },
  {
    id: "2026-11-10-mercado",
    fecha: "10 de noviembre de 2026",
    titulo: "El gozo, el mercado y tu casa",
    puntos: [
      "✨ Ahora ganas gozo en Jerusalén en línea: por cada deber, cada acierto, cada encargo, cada estudio y la ofrenda de tu barrio. Lo ves arriba, junto a tu casa.",
      "En la plaza abrieron los cuatro puestos: el sembrador, el alfarero, el tejedor y el mercader. Cada día hay dos ofertas, y el mercader paga el doble por lo que más buscan ese día.",
      "Tu casa tiene huerto: siembra trigo, cebada u olivo, riégalo y cosecha al alfolí para ofrecerlo en el templo o venderlo.",
      "Pon adornos en tu casa (macetas, lámparas, toldos, un telar, una parra, una higuera o una palmera), dale nombre con un letrero y vístete con un manto y una faja: tus vecinos lo ven todo.",
      "🫓 Tu casa tiene horno: prepara tortas amasadas con aceite o aceite puro para las lámparas con lo del alfolí. Valen más honra que los bienes sueltos (y en las fiestas del cereal, las tortas valen el doble).",
    ],
  },
  {
    id: "2026-11-10-comunidad",
    fecha: "10 de noviembre de 2026",
    titulo: "Vecinos, reuniones y el concurso de la semana",
    puntos: [
      "En la ciudad ves qué hace cada vecino junto a su nombre: 🛒 en el mercado, 🏠 en su casa, 📜 estudiando, 🙏 orando, 🍞 llevando pan…",
      "📖 Reuniones en las casas: abre tu casa 20 minutos para enseñar una sección que ya estudiaste. Tus vecinos ven el círculo violeta en tu puerta; al llegar leen el versículo y la idea clave y responden una pregunta: si aciertan, ganan los dos.",
      "🤲 Pedidos del barrio: una vez por día pide a tus vecinos harina, aceite o corderos para tu ofrenda (desde «Tu casa»). En el púlpito de la plaza ves lo que piden ellos y les das de tu alfolí: ayudar da gozo.",
      "🏅 Concurso bíblico de la semana (botón de la medalla o en el púlpito de la plaza): las mismas 10 preguntas para todos, 20 segundos cada una. Los tres primeros ganan gozo y quedan como campeones.",
      "🧱 El muro caído: al norte de la puerta de la ciudad hay un tramo de la muralla en el suelo. Cada deber de cualquiera (sacerdote, profeta o siervo del rey) pone una piedra, y el muro se levanta tramo por tramo para todos (2 Crónicas 32:5).",
      "🗓️ «Para hoy» (arriba de las Misiones): lo que puedes hacer ahora, junto y con su botón: el concurso, tu huerto y tu horno, las reuniones abiertas, los pedidos de tus vecinos y el muro.",
      "🏆 Logros en Jerusalén: constructor del muro, buen vecino, maestro en casa, campeón del concurso, estudioso de la Palabra y fiel a su barrio. Los tuyos están en «Tu casa»; los de tus vecinos se ven al visitar su casa o tocarlos en la calle.",
    ],
  },
  {
    id: "2026-11-10-escuela",
    fecha: "10 de noviembre de 2026",
    titulo: "Más para el profeta y el siervo del rey",
    puntos: [
      "🔎 En la escuela de los profetas, «Discernir con las Escrituras»: oyes lo que se dice en la plaza y eliges lo que concuerda con la Palabra (1 Juan 4:1). Hay falsos profetas, adivinos… y también llamados verdaderos.",
      "👑 El palacio tiene seis audiencias nuevas: el salario del jornalero, las pesas falsas, el extranjero, el único testigo, el lindero corrido y el manto del pobre.",
    ],
  },
  {
    id: "2026-11-10-caminos",
    fecha: "10 de noviembre de 2026",
    titulo: "Tres caminos: sacerdote, profeta y siervo del rey",
    puntos: [
      "Ahora puedes tener un personaje en cada camino y elegir con cuál jugar en la sala de Jerusalén en línea.",
      "📯 Escuela de los profetas, con Isaías: memoriza la Palabra (arma el versículo palabra por palabra), ora en el monte y lleva mensajes de ánimo a las casas.",
      "👑 Palacio del rey, con Eliaquim: atiende audiencias con justicia, reparte pan a los pobres de la ciudad y copia la ley.",
      "Cada camino tiene sus primeros pasos (+50 de mérito), sus encargos del día y su vestidura.",
    ],
  },
  {
    id: "2026-11-10-misiones",
    fecha: "10 de noviembre de 2026",
    titulo: "Sirve con otros y cumple misiones",
    puntos: [
      "En el templo en línea ahora ves a los demás sacerdotes que sirven contigo, con su nombre y lo que llevan en las manos.",
      "Con dos o más sirviendo a la vez, cada deber vale ×1,2: invita a tus vecinos a servir juntos.",
      "Misiones (botón de la diana): tres encargos distintos cada día, la ofrenda semanal de tu barrio y la tabla de los barrios de la semana.",
    ],
  },
  {
    id: "2026-11-10-estudios",
    fecha: "10 de noviembre de 2026",
    titulo: "Los estudios de Jerusalén",
    puntos: [
      "En la escuela de los profetas (o con el botón del pergamino) hay seis estudios bíblicos: tres del sacerdocio, uno de los profetas, uno del rey y uno de las fiestas.",
      "Cada estudio tiene secciones para leer y practicar (+10 de mérito cada una) y un examen final de 6 preguntas que se aprueba con 5 (+100 de mérito).",
      "Lo aprobado queda para siempre y lo ven los vecinos. Para ser principal sacerdote hay que aprobar «El sacerdocio de Aarón»; para ser sumo, «El Día de la Expiación».",
    ],
  },
  {
    id: "2026-11-10-instruccion",
    fecha: "10 de noviembre de 2026",
    titulo: "La instrucción del sacerdote",
    puntos: [
      "En Jerusalén en línea, Azarías te lleva por el templo lugar por lugar: qué es cada cosa, para qué sirve, el versículo y lo que nos enseña hoy.",
      "En cada lugar haces el servicio y respondes una pregunta. Son tres partes: el atrio, el Lugar Santo y el servicio al pueblo.",
      "Quien no conoce el templo la hace al entrar; al terminarla gana +50 de mérito y Azarías le hace las preguntas difíciles. Los demás pueden repasarla con el botón del birrete.",
    ],
  },
  {
    id: "2026-11-10-controles",
    fecha: "10 de noviembre de 2026",
    titulo: "Elige tus controles",
    puntos: [
      "En la pausa, «Controles»: joystick donde toques (el de siempre), joystick fijo en la esquina, botones de flechas con «Correr», o solo tocar para ir.",
      "Opciones para zurdos, botones más grandes y tocar el piso para ir.",
      "Funciona con mando (Bluetooth o cable): palanca para caminar, B para correr, LB y RB para acercar y Start para la pausa.",
      "En pantalla completa puedes girar a horizontal o vertical (en Android desde el juego; en el iPhone, girando el teléfono).",
    ],
  },
  {
    id: "2026-11-10-partida",
    fecha: "10 de noviembre de 2026",
    titulo: "Tu partida vive en tu cuenta",
    puntos: [
      "Si reinstalas la app o cambias de teléfono, al iniciar sesión sigues con tu partida: una partida nueva ya no reemplaza a la más avanzada.",
      "Si jugaste en dos teléfonos por separado, el juego te pregunta con cuál seguir.",
      "Si empezaste otra sin querer, la portada te ofrece recuperar tu partida más avanzada.",
    ],
  },
  {
    id: "2026-11-10-abierta",
    fecha: "10 de noviembre de 2026",
    titulo: "Jerusalén en línea abierta a todos",
    puntos: [
      "Ya no hace falta haber jugado la historia del templo: toda cuenta aprobada puede consagrar su sacerdote y empezar desde el primer escalón.",
      "Se entra directo a la ciudad, a la puerta de tu casa. El templo está subiendo la escalinata (o en «Ir a…», El templo).",
      "Toca el piso para ir caminando, arrastra más lejos para correr y pellizca (o usa la rueda del ratón) para acercar la cámara.",
      "Para ser sumo sacerdote ahora hay que haber sido principal sacerdote en una temporada anterior.",
    ],
  },
];

const CLAVE = "templo-novedades-visto";

function vista(): string | null {
  try {
    return localStorage.getItem(CLAVE);
  } catch {
    return null;
  }
}

function marcarVista(id: string) {
  try {
    localStorage.setItem(CLAVE, id);
  } catch {
    /* modo privado */
  }
}

/** Las que todavía no vio (hasta 4; si nunca vio ninguna, las 2 últimas). */
function sinVer(): Novedad[] {
  const v = vista();
  const i = v ? NOVEDADES.findIndex((n) => n.id === v) : -1;
  return i === -1 ? NOVEDADES.slice(0, 2) : NOVEDADES.slice(0, Math.min(i, 4));
}

/** Las novedades que todavía no vio, en la portada. Quien juega por primera vez no las ve: ya empieza con todo. */
export function NovedadesAviso({ primeraVez }: { primeraVez: boolean }) {
  const ultima = NOVEDADES[0];
  const [nuevas, setNuevas] = useState<Novedad[]>(() => (ultima && vista() !== ultima.id ? sinVer() : []));
  useEffect(() => {
    if (primeraVez && ultima && vista() !== ultima.id) {
      marcarVista(ultima.id);
      setNuevas([]);
    }
  }, [primeraVez, ultima]);
  if (!nuevas.length || !ultima) return null;
  return (
    <section className="w-full max-w-sm rounded-2xl border border-amber-300/40 bg-black/40 p-3 text-left text-xs text-white shadow-lg" data-testid="templo-novedades">
      {nuevas.map((n, i) => (
        <div key={n.id} className={i ? "mt-3 border-t border-white/10 pt-2" : ""}>
          <p className="flex items-center gap-1.5 font-bold text-amber-200">
            <Sparkles className="h-4 w-4 shrink-0" /> Novedades: {n.titulo}
          </p>
          <p className="mt-0.5 text-[11px] text-white/60">{n.fecha}</p>
          <ul className="mt-2 space-y-1">
            {n.puntos.map((p) => (
              <li key={p} className="flex gap-1.5">
                <span className="text-amber-300">✦</span> <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button
        type="button"
        className="mt-2.5 w-full rounded-full bg-amber-400 px-3 py-1.5 font-bold text-amber-950 hover:bg-amber-300"
        onClick={() => {
          marcarVista(ultima.id);
          setNuevas([]);
        }}
        data-testid="button-novedades-entendido"
      >
        Entendido
      </button>
    </section>
  );
}

/** Revisa cada pocos minutos (y al volver a la pestaña) si se publicó una versión nueva de la web. */
export function useVersionNueva(): boolean {
  const [nueva, setNueva] = useState(false);
  useEffect(() => {
    let inicial: string | null = null;
    let vivo = true;
    const revisar = async () => {
      try {
        const r = await fetch("/api/version", { cache: "no-store" });
        if (!r.ok) return;
        const { version } = (await r.json()) as { version?: string };
        if (!vivo || !version) return;
        if (inicial === null) inicial = version;
        else if (version !== inicial) setNueva(true);
      } catch {
        /* sin conexión: se revisa después */
      }
    };
    void revisar();
    const id = window.setInterval(() => void revisar(), 3 * 60_000);
    const alVolver = () => {
      if (document.visibilityState === "visible") void revisar();
    };
    document.addEventListener("visibilitychange", alVolver);
    return () => {
      vivo = false;
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", alVolver);
    };
  }, []);
  return nueva;
}

/** El aviso de que hay una versión nueva, con el botón para tenerla (guarda el avance y recarga). */
export function AvisoVersionNueva({ alActualizar }: { alActualizar: () => void }) {
  const nueva = useVersionNueva();
  const [oculto, setOculto] = useState(false);
  if (!nueva || oculto) return null;
  return (
    <div
      className="absolute inset-x-2 top-2 z-[75] mx-auto flex max-w-md items-start gap-2 rounded-xl border border-amber-300/50 bg-[#1f1608]/95 p-3 text-xs text-amber-50 shadow-2xl"
      style={{ marginTop: "var(--tpl-st, 0px)" }}
      role="status"
      data-testid="templo-version-nueva"
    >
      <RefreshCw className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
      <div className="min-w-0 flex-1">
        <p className="font-bold">Hay una actualización del juego</p>
        <p className="mt-0.5 text-amber-100/85">
          Toca «Actualizar» para tenerla: tu avance queda guardado. Si juegas desde la app instalada, también puedes cerrarla y volver a abrirla.
        </p>
        <div className="mt-2 flex gap-2">
          <button type="button" className="rounded-full bg-amber-400 px-3 py-1 font-bold text-amber-950 hover:bg-amber-300" onClick={alActualizar} data-testid="button-version-actualizar">
            Actualizar
          </button>
          <button type="button" className="rounded-full bg-white/10 px-3 py-1 hover:bg-white/20" onClick={() => setOculto(true)}>
            Después
          </button>
        </div>
      </div>
    </div>
  );
}
