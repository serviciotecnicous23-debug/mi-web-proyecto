# La guía visual de «El aprendiz del templo» y Jerusalén en línea

Pedido de Luis (13 de noviembre de 2026): el juego «está bueno, pero se ve como para niños de 5 años… parece muy 2002».
Hay que subir el nivel de cada área: la animación, el diseño, los personajes, las tablas de texto y los íconos. Esta guía
es **la regla para todo lo visual**: lo que ya existe y lo que se haga después, en cualquier sesión. Si algo nuevo no la
cumple, no está terminado.

## 1. La dirección de arte en una frase
**Jerusalén del siglo VIII a. C. contada como una ilustración cálida y seria**: estilizada (formas simples y legibles en
un teléfono), pero con proporciones creíbles, luz de verdad, materiales con peso y una paleta de tierra, piedra, lino,
cedro y oro. Pensada para adolescentes y adultos de la iglesia, no para niños pequeños. Referencias de oficio: la luz por
capas de *Genshin Impact* (cielo, niebla, resplandor y sombras suaves), la calidez de *Sky: Children of the Light*, la
lectura clara de *Animal Crossing* y la sobriedad de las ilustraciones bíblicas clásicas.

## 2. Lo que no se hace
- Nada que parezca una cruz: ni en adornos, ni en correas, bastidores, herrajes, rejas, ventanas o íconos.
- Emojis como íconos dentro del juego (en botones, listas, tiendas, álbum o estaciones). Los emojis solo pueden quedar en
  texto de conversación o en avisos cortos, nunca como la imagen de una cosa.
- Colores primarios puros y saturados (`#ff0000`, `#00ff00`, azul eléctrico). Todo color sale de la paleta (sección 4).
- Personajes cabezones de 2 a 3 cabezas (el estilo «chibi» lee como infantil). Ver la sección 6.
- Luz plana sin sombras, o escenas sin niebla ni profundidad.
- Animaciones que se mueven todas al mismo tiempo y al mismo ritmo (sin superposición ni seguimiento).
- Texto sobre fondos sin contraste suficiente.

## 3. El motor de imagen (lo que comparten todos los mundos 3D)
Todos los mundos (la ciudad, el templo, la casa y los edificios por dentro, el huerto, el aula, el estudio de «¿Quién es
sabio?», el patio de los juegos) dibujan con la misma tubería de imagen, en `client/src/games/templo/motor/`:
- **Calidad por niveles** (alta, media y baja), elegida sola según el aparato y bajada sola si los cuadros por segundo no
  alcanzan (meta: 60 en computadora, 30 estable en teléfono). Quien juega puede fijarla en los ajustes.
- **Luz por capas**: cielo y suelo (hemisférica, con el tono de la hora), el sol (direccional, sombras suaves), una luz de
  contorno que separa a las personas del fondo y, adentro, el rebote cálido de las lámparas.
- **Oclusión ambiental** para asentar las cosas en el piso: horneada en los colores de cada malla (barata, siempre) y, en
  calidad alta, también en pantalla (N8AO, modo rendimiento en teléfonos).
- **Resplandor** solo para lo que brilla de verdad (fuego, lámparas, oro, el cielo del atardecer), a media resolución.
- **Tono y color**: tono fílmico (AgX) al final, y encima la gradación de color del juego (luces cálidas doradas,
  sombras con un poco de azul pizarra). Nada de colores lavados ni quemados.
- **Niebla y profundidad**: niebla del color del cielo, más densa a lo lejos; en las escenas grandes, un poco de color de
  aire en lo distante.
- **Bordes suaves**: SMAA (no MSAA junto con él).
- **Respeto por el movimiento**: si el aparato pide «reducir el movimiento», se quitan los temblores de cámara, los
  destellos fuertes y el balanceo de más.

## 4. La paleta
Todo color nombrado vive en un solo archivo (`client/src/games/templo/three/paleta.ts` para el 3D y las variables de
`templo.css` para la pantalla). Familias:
- **Piedra de Jerusalén**: crema dorado, arena, piedra caliza en sombra.
- **Tierra y adobe**: ocre, siena tostada, barro cocido.
- **Madera**: cedro claro y oscuro, acacia.
- **Telas**: lino crudo, lana natural, y los tintes de la época: azul jacinto, púrpura, carmesí (grana), ocre y verde
  olivo, siempre un poco apagados.
- **Metales**: bronce, oro viejo (no amarillo de caricatura).
- **Naturaleza**: verde olivo y salvia, cielo de Judea (azul pálido), atardecer ámbar.
- **Tinta**: casi negro cálido para texto y contornos.
Regla de proporción: 60 % neutros cálidos, 30 % un color de apoyo por escena, 10 % acentos (oro, un tinte fuerte).

## 5. Materiales y formas
- Las mallas se arman con `GeoBuilder`; cada pieza lleva su color de la paleta y, al construirse, su oclusión horneada
  (más oscuro donde toca el piso o en los rincones).
- Biselados y bordes redondeados en lo que se toca (muebles, jarras, columnas): nada de cubos crudos.
- Variación sutil: ninguna pared de un solo color plano; manchas de desgaste, juntas de piedra, vetas de madera.
- Metal y oro con brillo (material con reflejo), telas y piedra mates.
- Lo que alumbra (lámparas, fogón, brasero, horno) lleva su llama, su resplandor y una luz cálida en lo que la rodea.

## 6. Los personajes
- **Proporciones de 5,5 a 6 cabezas** (personaje estilizado juvenil-adulto), no de 2 a 3. Hombros, cuello, codos,
  manos y pies creíbles; las niñas y los niños, de 4 a 4,5 cabezas.
- Caras sobrias: ojos almendrados con brillo, cejas que expresan, nariz y boca discretas; sin mejillas pintadas de rosa.
- Ropa de la época: túnica con caída y pliegues, manto que cuelga y se mueve, faja, tocado. La ropa nueva entra por las
  siete partes (`RANURAS`).
- **Animación con oficio** (los principios de la animación clásica):
  - superposición y seguimiento: el manto, las mangas, el pelo y las correas siguen al cuerpo con resortes un poco
    blandos (amortiguación de 0,5 a 0,8), no rígidos;
  - el caminar: cadera y hombros en contrapunto, el peso que baja en cada paso, los brazos con codo, la cabeza que
    acompaña el paso;
  - en quietud, respiración y cambio de peso cada tanto; nadie queda congelado;
  - anticipación antes de un gesto (agacharse, levantar, entregar) y asentamiento al terminar;
  - giros con aceleración y frenado (nunca de golpe).
- La ropa ya se mueve sola (`telaMueve`, en `three/characters.ts`): el ruedo sigue al cuerpo con un resorte (se queda
  atrás, pasa de largo al frenar, se abre en las curvas) y las rodillas empujan la tela. El cuerpo de un personaje usa
  los materiales de su tela (`matTela`, `oroTela`): lo nuevo que vaya en el cuerpo se arma igual y se mueve con ella.
- El cuerpo de choque (`PLAYER_R`) y las alturas de los asientos no cambian al cambiar el dibujo.

## 7. Los escenarios
- Arquitectura con detalle a tres distancias: la silueta (lejos), los volúmenes y aberturas (media distancia) y los
  detalles de cerca (dinteles, umbrales, juntas, vigas, herrajes).
- Vegetación que se mueve con el viento (olivos, palmeras, parras, hierba), con el mismo viento para todo.
- Agua con brillo y movimiento (fuentes, pozos, el mar de bronce).
- Partículas con sentido: polvo en los rayos de luz, humo del horno, chispas del altar, pétalos en su estación.
- Lo que ya está hecho, para copiarlo en un lugar nuevo: la hierba con viento por bloques (`ciudad/suelo-vivo.ts`), el
  polvo en la luz (`Polvo`, en `ciudad/clima.ts`), las hortalizas con hojas (`hortaliza`, en `ciudad/escenario.ts`) y la
  animación con resortes (`inercia`, en `three/characters.ts`). Ninguna planta ni mata es un cubo.
- El agua se pinta con `C.agua` (o un celeste parecido) y acostada: así tiene sola sus ondas, el reflejo del cielo y
  el destello del sol (`DETALLE_AGUA`, en `three/builder.ts`). Un agua con su propio material lleva `conOndas`.
- La ropa de torno pasa por `conPliegues` (en `three/characters.ts`), y lo que va encima, con los mismos números.
- Un piso de piedra se arma con `tiles` (losas trabadas con bisel), nunca con una cuadrícula pareja, y con `tono` lleva
  la sombra junto a los muros y el desgaste de los caminos.
- Un fuego nuevo que alumbra de noche se agrega a la lista de fuegos de su mundo (`ponerFuegos`, en `three/luces.ts`)
  con el rectángulo donde alumbra (y, si hay pisos, las alturas `alto` y su `alcance`); los materiales de siempre ya lo
  reciben (`conFuegos`). Lo que se dibuja aparte con su propia luz (una foto, un muñeco) va dentro de `sinFuegos`.
  Cada mundo pone sus fuegos justo antes de dibujarse y los quita después (`apagarFuegos`): a veces se dibujan dos.
- Un lugar techado que se ve por dentro lleva su sombra de techo (`ponerTecho`, en `three/luces.ts`): bajo techo la luz
  del cielo casi no llega. Si el techo se aclara para ver adentro, igual da sombra.
- Una talla o un adorno sobre un fondo del mismo material (oro sobre oro, piedra sobre piedra) va en un tablero con el
  fondo más oscuro y la talla más clara, para que se lea a la distancia de la cámara.
- Todo mueble o pieza que se apoya en el piso lleva su sombra de contacto (como `sombraDeMueble`, en
  `casa/mundo-casa.ts`), y los pisos, la sombra junto a los muros (`tono`).
- **Todo lugar donde se camina entra en `shared/pasos-libres.test.ts`**: ninguna pieza delante de una abertura,
  aberturas de dos celdas o más y círculos que no tapan un paso.

## 8. La cámara
- Sigue al personaje con un resorte críticamente amortiguado (sin tirones), un poco adelantada hacia donde camina.
- Transiciones al entrar o salir de un lugar: fundido corto (unos 300 ms), nunca un corte seco.
- El encuadre no corta cabezas ni deja al personaje tapado por un muro.

## 9. La pantalla: paneles, tablas de texto y botones
- **Sistema de diseño** en `templo.css` y en los componentes de `ui.tsx`: los mismos tokens de color, radio, sombra y
  espaciado en toda pantalla del juego.
- **Tipografía**: títulos con una serifa con carácter (Fraunces, ya cargada en la web); texto en una sin serifa legible
  (DM Sans). Mínimo 14 px en el teléfono para leer; los números en tablas, con cifras tabulares.
- **Paneles** de pergamino o piedra con borde fino de oro viejo, sombra suave y esquinas con adorno sobrio (sin cruces).
  Los encabezados de las tablas, con su ícono y su título; filas alternadas suaves y la fila propia resaltada.
- **Botones**: uno principal por pantalla (oro), los secundarios en piedra; estado al tocar (se hunden), al pasar el
  dedo y deshabilitado. Al tocar, respuesta inmediata aunque el servidor tarde.
- **Movimiento**: pocas transiciones y con sentido (aparecer, premio, cambio de estado). Duraciones: 120 ms para
  respuestas, 200 a 300 ms para paneles; curva de salida suave. Se respeta «reducir el movimiento».
- **Contraste**: texto principal con contraste de 4,5 a 1 o más contra su fondo real.

## 10. Los íconos
- **Las cosas** (muebles, ropa, adornos, semillas, comida): su foto 3D (`vistaDe`, `casa/vistas3d.ts`) con la misma luz,
  el mismo ángulo de tres cuartos y el mismo fondo redondo suave. Así se ven en el mercado, el álbum, los regalos, el
  taller, el arcón y el armario.
- **Las acciones y los lugares** (casa, obras, huerto, oficios, álbum, misiones, el templo…): un solo juego de íconos de
  línea con el mismo grosor y la misma rejilla (lucide, ya instalado), con su color de la paleta.
- Prueba de silueta: cada ícono se reconoce aunque se vea solo su sombra, y se lee a 32 px. Dos cosas distintas no
  comparten silueta.

## 11. Rendimiento (lo que cuesta cada cosa)
- Presupuesto en teléfono: 30 cuadros estables, menos de 150 llamadas de dibujo por cuadro en la ciudad, texturas
  chicas (las mallas usan color por vértice).
- Lo caro (oclusión en pantalla, sombras grandes, resplandor a resolución completa) solo en calidad alta.
- Se juntan las mallas que no se mueven (`meshPair`) y se reutilizan geometrías y materiales.
- La luz de los fuegos de noche no usa luces de three (cada una le cuesta a todo): va dentro de los materiales
  (`conFuegos`), con hasta 12 fuegos, los más cercanos a la cámara. De día no cuesta nada.

## 12. Cómo se revisa algo nuevo
1. ¿Usa la paleta, la tubería de imagen y los componentes de la pantalla?
2. ¿Sus íconos son fotos 3D o íconos de línea (no emojis)?
3. ¿Sus personajes tienen las proporciones y la animación de la sección 6?
4. ¿Se puede caminar a todo (entra en la prueba de los pasos)?
5. ¿Se ve bien de día, al atardecer y de noche, en teléfono y en computadora, y con «reducir el movimiento»?
6. Captura de pantalla antes y después en el PR.

Fuentes de oficio consultadas: [Stylized Rendering (Real-Time Rendering)](https://www.stylized.realtimerendering.com/intro.pdf),
[sombreado de Genshin Impact](https://bjayers.artstation.com/blog/category/5),
[sombreado toon de Neople](https://www.invenglobal.com/articles/22927/natural-toon-shading-techniques-from-a-dungeon-fighter-technical-artist-at-neople),
[gráficos de Survival Kids (Unity)](https://unity.com/blog/graphics-and-rendering-tips-from-survival-kids),
[N8AO](https://github.com/N8python/n8ao), [postprocessing de pmndrs](https://cdn.jsdelivr.net/npm/postprocessing@6.39.4/README.md),
[íconos de inventario](https://www.chasing-carrots.com/how-to-create-inventory-icons/),
[animación procedural](https://masterallarts.pages.dev/learn/threejs-from-zero/s3-05-procedural-animation/),
[proporciones de personajes](https://inlingogames.com/blog/anatomy-in-art-why-its-important-and-how-game-designers-can-learn-it/),
[biblia de arte de interfaz](https://designcaitlin.substack.com/p/how-to-write-a-ui-art-bible).
