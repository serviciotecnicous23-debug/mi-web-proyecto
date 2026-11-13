# Cómo se trabaja en esta web (Ministerio Avivando el Fuego)

- Todo en español: textos de la pantalla, comentarios, mensajes de commit y PR.
- **Lo visual del juego** («El aprendiz del templo» y Jerusalén en línea) sigue `docs/guia-visual.md`. Es la regla para
  todo lo que se dibuja:
  - la tubería de imagen `client/src/games/templo/motor/vista.ts` (cada mundo 3D dibuja con ella);
  - la paleta;
  - personajes de 5,5 a 6 cabezas, con animación de oficio;
  - íconos: fotos 3D de las cosas o íconos de línea, nunca emojis como imagen de una cosa;
  - paneles, botones y movimiento con los tokens de la pantalla.
  Nada que parezca una cruz, en ningún adorno, correa, herraje, reja, ventana ni ícono.
- **Todo lugar donde se camina** entra en `shared/pasos-libres.test.ts`:
  - ninguna pieza delante de una abertura;
  - aberturas de dos celdas o más;
  - ningún círculo que lleve a otro lado en medio del paso.
  Los choques de la casa y de los edificios salen de `client/src/games/templo/casa/choques.ts` (lo mismo usa el motor).
- Las citas bíblicas, literales de la Reina-Valera 1960, comprobadas con la Biblia del sitio.
- El servidor decide todo lo que da o quita, y nada corre de fondo en Render: el estado se calcula con las horas al leerlo.
- El guion del juego está en `docs/guion-del-juego.md`. Cada cambio del juego agrega su novedad al principio de
  `client/src/games/templo/novedades.tsx`.
