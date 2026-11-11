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

### Cada día (el bucle diario)
| Momento | Qué hace | Qué gana |
|---|---|---|
| Al entrar | Mira «Para hoy» y la fecha del marcador (abre el calendario) | Sabe qué trae el día |
| En el templo | Cumple sus deberes | Mérito, gozo y su **racha de servicio** |
| Encargos del día | 3 encargos distintos según su camino (y **uno más los días de fiesta**, con el doble de gozo) | Mérito, gozo y puntos para la copa del barrio |
| El huerto | Siembra trigo (40 min), cebada (25 min) u olivos (60 min); riega o deja que la lluvia riegue | Harina y aceite para el alfolí |
| El horno | Prepara tortas y aceite puro con lo del alfolí | Ofrendas mejores para el templo |
| El mercado | Vende lo que le sobra al mercader (que busca más lo que escasea en la estación) | Gozo para muebles, ropa y adornos |
| La calle de los siervos | Cumple el recado del día | Gozo y la historia de la semana |
| El barrio | Bendice casas, ayuda a vecinos, va a reuniones, acompaña a los nuevos | Gozo, encargos y la ofrenda del barrio |
| «¿Quién es sabio?» | 15 gradas de preguntas en el estudio de TV, con comodines y duelos | Gozo, trajes de sabio y la tabla |
| De noche | Antorchas, ventanas encendidas y la hora de las trompetas de la luna nueva | ×1,5 de mérito de 7 a 9 |

### La semana
- **Los capítulos de la temporada**: cada semana avanza la historia de Ezequías frente a Senaquerib
  (2 Reyes 18–19): reparar el muro, cavar el canal al estanque de Siloé, las palabras del Rabsaces y la
  liberación. Cada capítulo trae sus recados, sus chismes y su evento en vivo.
- **La ofrenda del barrio**: una meta de deberes entre todos los vecinos; la copa de los barrios premia a los
  tres primeros.
- **El día de reposo** (cada sábado): no rompe la racha, el servicio vale ×1,1 y su encargo es ir a una
  reunión.

### La temporada (28 días)
- El mérito de la temporada ordena a los sacerdotes: **sacerdote → sacerdote de turno (150 de mérito) → jefe
  de un turno (12) → principal sacerdote (3) → sumo sacerdote (1)**; los más altos piden además aprobar sus
  estudios.
- La casa crece con la honra: **tienda → casa de adobe → casa de piedra con patio → casa con aposento alto**.
- Al cerrar, empieza otra temporada; mientras no haya una historia nueva, cada temporada vuelve a contar la
  última (las historias van en orden en `ARCOS`, `shared/capitulos.ts`).

### El año (el calendario real)
El año no se acaba: cada día real es un día en Jerusalén. Las fiestas de Levítico 23 caen en su fecha hebrea
real; la Navidad, el año nuevo y la Semana Santa en su fecha civil; las seis estaciones de la tierra de Israel
cambian el huerto, el mercado, el cielo y lo que dice la gente.

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

### Mientras no estabas
Quien vuelve después de dos días o más encuentra en la entrada de Jerusalén en línea qué fiestas pasaron, si
cambió la estación, la fecha de hoy y la próxima fiesta grande (`client/src/games/templo/RegresoUI.tsx`).

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

## 6. Lo que aprendimos de cinco juegos parecidos

| Juego | Lo que hace bien | Lo que tomamos |
|---|---|---|
| **Animal Crossing: New Horizons** | El reloj y el calendario reales; eventos de temporada; los vecinos hablan de lo que viene | El año real, la gente que comenta la estación y la fiesta, los anuncios |
| **Stardew Valley** | Estaciones con cultivos propios, festivales en días fijos, la lluvia que riega | Cultivo de la estación, la lluvia que riega el huerto, el calendario con lo que viene |
| **Pokémon GO** | Horas especiales con bonos, rachas, el clima real que cambia el juego | La hora de las trompetas (×1,5), la racha de servicio, la lluvia |
| **Adopt Me! (Roblox)** | Actualizaciones semanales y cosas de tiempo limitado | Las novedades del juego y la ropa de cada tiempo, que solo se vende en su estación o su fiesta |
| **Club Penguin** | Fiestas mensuales, el periódico que anuncia lo que viene, colectas solidarias | Los anuncios de la ciudad, los avisos al teléfono, la ofrenda del barrio |

## 7. Lo que sigue (la fase final de Jerusalén en línea)

Ya hecho (noviembre de 2026): el calendario real, el encargo de la fiesta, la ropa de cada tiempo, el
pronóstico, «Mientras no estabas», los pétalos de almendro y las lámparas de fiesta.

Lo que queda:
1. **Un regalo de regreso** (gozo) para quien vuelve después de varios días, contado en el servidor.
2. **«Mientras no estabas» con el barrio**: qué hizo tu barrio, en qué puesto va la copa y quién bendijo tu casa.
3. **Más vida por estación**: campos dorados en la siega del trigo y uvas en las parras en la cosecha.
4. **Colecciones visibles** (álbum de muebles, ropa y dichos) y **mentores** para los nuevos.
5. **Contenido que se renueva**: preguntas, estudios y cátedras por entregas.
6. **Una historia nueva para la temporada 2** (`ARCOS` en `shared/capitulos.ts`); mientras tanto se repite la de
   Ezequías y Senaquerib.

Con eso Jerusalén en línea queda completa y lista para que los próximos juegos del ministerio usen la misma base
(cuentas, gozo, calendario y avisos).
