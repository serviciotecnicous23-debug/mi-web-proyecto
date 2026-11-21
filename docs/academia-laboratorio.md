# El laboratorio ministerial de la academia

Luis lo pidió el 20 de noviembre de 2026: «un sistema de laboratorio o de práctica, como un aula o una función más en
cada materia», que recree situaciones de la vida real de cada materia y compruebe que el alumno aprendió, de manera
interactiva y distinta de los exámenes. La propuesta (investigación, parámetros y una demostración) está en el
artefacto «Laboratorio ministerial». Este es el **piloto**: 4 prácticas en 3 materias, sin peso en la nota.

## Cómo es para el alumno

En la página de la materia, antes del examen final, aparece la tarjeta **Laboratorio ministerial** con sus prácticas
(solo en las materias que ya tienen). Cada práctica se abre en `/academia/laboratorio/:practicaId`:

1. **La preparación:** el rol, la situación, el objetivo, lo que conviene tener presente (incluido un aviso si el tema
   es delicado) y lo que se mide. Se abre cuando el alumno terminó las lecciones en que se basa.
2. **Los pasos:** el servidor manda uno a la vez. Hay tres formatos:
   - **Escenario con decisiones:** una escena y 3 o 4 opciones de lo que haces.
   - **Conversación simulada:** la otra persona habla (globo) y escoges qué decirle; ella responde.
   - **Ordenar lo más apropiado:** cuatro opciones que se ordenan tocándolas (la primera que tocas va primero).
3. **Lo que pasa:** después de cada decisión, la consecuencia, cómo cambian los medidores (por ejemplo, la confianza y
   la seguridad de la persona), por qué estuvo bien o qué faltó, con la lección, y lo que más ayudaba. Algunas escenas
   cambian una frase según lo que eligió antes.
4. **El resultado:** la nota de 0 a 100 y el perfil por competencia (Ejemplar, Competente, En desarrollo, Inicial).
5. **La conversación de cierre:** cómo se sintió, lo que hizo bien, lo que haría distinto y lo que se lleva. Se guarda
   con el intento y se puede llevar al cuaderno (una nota de la materia).
6. **El camino ejemplar:** lo que mejor ayudaba en cada paso, junto a lo que eligió.

## Las reglas (shared/laboratorio.ts)

- Cada escena (o ronda) mide **una competencia** y vale hasta 2 puntos (`MAX_PASO`): la ejemplar 2, una parcial 1, las
  demás 0. Al ordenar, los puntos bajan según cuánto se aleja el orden del de quien sabe (1,5 por dos opciones
  cambiadas de lugar).
- Cada competencia tiene su peso (suman 100). La nota es el promedio con esos pesos.
- **Acción crítica:** lo que la lección dice que nunca se hace porque pone en peligro a la persona (prometer el secreto
  ante un riesgo de suicidio, dejarla sola, no reportar, interrogar a un niño...). Vale 0, deja la nota en **60 como
  máximo** y la competencia no pasa de «En desarrollo». Al ordenar, es crítica si se pone primero.
- **Intentos:** cuentan 3 y queda el mejor; después se puede seguir practicando (práctica libre) sin que cambie.
- **Versiones del caso:** cada intento trae la siguiente (`variantes`); por ejemplo, la crisis de la noche con y sin
  peligro inmediato. Las opciones se mezclan en cada intento, y al ordenar nunca se muestran ya ordenadas.
- **La Administración** (rol admin) puede hacerlas sin inscribirse: sus intentos quedan como prueba y no cuentan.
- **En el piloto no cuenta para la nota** (`LABORATORIO.cuentaParaLaNota = false`).

## Las piezas

- `shared/laboratorio.ts`: las reglas de la nota y lo que ve el alumno (sin claves).
- `server/academia/laboratorio/`: las prácticas (`tipos.ts` dice cómo se escriben; un archivo por materia; `index.ts`
  las junta). Solo en el servidor: los puntos y el camino ejemplar no llegan al navegador hasta responder.
- `server/academia-laboratorio-motor.ts`: el motor sin base de datos (los pasos de cada versión, el orden mezclado,
  responder y el resultado).
- `server/academia-laboratorio.ts`: la tabla `academia_laboratorio` (aditiva; se borra con la cuenta) y las rutas:
  `GET /api/academia/laboratorio/materia/:materiaId`, `GET .../practica/:practicaId`, `POST .../practica/:id/empezar`,
  `GET .../intento/:id`, `POST .../intento/:id/responder` (`{ paso, k }` o `{ paso, orden }`) y
  `POST .../intento/:id/cierre`.
- `client/src/components/academia/laboratorio-materia.tsx` (la tarjeta de la materia), `laboratorio-api.ts` y
  `client/src/pages/academia-laboratorio.tsx` (la práctica).
- `server/academia-laboratorio.test.ts`: revisa cada práctica y el motor (`npx tsx --test server/academia-laboratorio.test.ts`).

## Las prácticas del piloto

| Materia | Práctica | Formato | Lecciones |
| --- | --- | --- | --- |
| Cuidado y consejería básica | Un mensaje a las 11 de la noche (con y sin peligro inmediato) | Escenario | 2, 5 y 6 |
| Cuidado y consejería básica | Una visita después del funeral | Conversación | 2, 4 y 5 |
| Homilética I | Un devocional sobre Zaqueo (Lucas 19:1-10) | Ordenar | 2, 3 y 5 |
| Protección de menores | Lo que Ana contó en la clase | Escenario | 4, 5 y 6 |

Cada una pasó por tres revisores independientes (contenido, Biblia y, en la de menores, la ley de Texas: toda persona
reporta de inmediato; los profesionales, a más tardar en 24 horas).

## Cómo agregar una práctica

1. Lee las lecciones de la materia y escoge una situación real que pida **aplicar** lo aprendido (mejor si es un caso
   nuevo, no el ejemplo de la lección).
2. Escríbela en `server/academia/laboratorio/<materia>.ts` y súmala en `index.ts`. Reglas que revisan las pruebas:
   una sola opción ejemplar por escena (2 puntos), las demás de 0 a 1, una crítica vale 0, de 3 a 4 opciones, cada
   competencia medida en cada versión, pesos que suman 100, lecciones que existen, en una conversación quién habla y
   la respuesta de cada opción, al ordenar 4 opciones en el orden de quien sabe y la primera nunca crítica, y ningún
   texto con comillas angulares (son de la RV1960).
3. Cada explicación cita la lección de donde sale. Nada se inventa: lo que no esté en las lecciones no se enseña aquí.
4. Corre las pruebas y pide una revisión independiente (contenido, Biblia y, si toca, la ley) antes de publicar.

## Lo que falta decidir antes de que cuente para la nota

- El peso (la propuesta: 15 % de la nota; 10 % en el Nivel 1) y si una acción crítica obliga a repetirla.
- Como el camino ejemplar se ve al terminar, el segundo intento es más fácil: conviene que cuente el primero, o el
  promedio, o tener más versiones de cada caso.
- Un informe en la Dirección: intentos, promedio y las acciones críticas más comunes de cada práctica.
