# Revisión completa de la academia

20 de noviembre de 2026. El pedido de Luis: «Analiza y haz un informe de la página específicamente del área de la
academia. Cómo va trabajando, qué falta que llevamos, si hay algunos errores que se puedan corregir, fallas, errores
cero, botones vacíos, sistemas caídos, desactualización, código desactualizado; en fin, haz una revisión completa y
desarrolla sus actualizaciones hasta la fecha de hoy, con los parámetros que se requieren hoy».

## En resumen

- **La academia está completa y funciona.**
  - Tiene 105 materias abiertas (45 en los 5 niveles y 60 en las 12 especialidades), 614 lecciones y 718 recursos de
    estudio.
  - No hay ningún sistema caído:
    - en vivo, 219 respuestas de la API pública sin ningún error del servidor, de 0,15 a 0,5 segundos (de 350
      pedidos: los otros los frenó el límite de pedidos por minuto, por ir rápido);
    - las 466 pruebas automáticas pasan;
    - los tipos están limpios y hay 0 fallas de seguridad en las dependencias.
- **Se encontraron 7 problemas que se podían corregir, y se corrigieron.**
  - Van en 3 PRs: #242, #243 y #244.
  - Cada uno se probó en local a lo ancho de un teléfono (375 px) y de una computadora (1366 px), se fusionó y se
    comprobó en vivo.
  - El más visible: quien entra sin cuenta leía que el examen integral «estará disponible cuando todas las materias
    estén listas», aunque los 5 niveles ya lo tienen.
- **Lo que queda pendiente depende casi todo de Luis** (ver «Decisiones de Luis»):
  - las firmas de los certificados;
  - los 5 puntos de la declaración de fe por confirmar;
  - la constancia de estudios;
  - probar la subida de su foto a R2.
  - La narración de los Niveles 3 a 5 la está grabando otra sesión.

## Cómo se revisó

| Qué | Cómo |
|---|---|
| El código | Las 144 rutas de la academia y del cuaderno que el servidor registra de verdad (sacadas del servidor encendido), contra las 109 llamadas que hacen las páginas: ninguna llamada sin su ruta. Los enlaces internos contra las rutas de la web: ninguno lleva a una página que no existe |
| En vivo, sin cuenta | 30 páginas a 1366 y a 375 px, buscando botones sin nombre, enlaces vacíos, campos sin etiqueta, desbordes a lo ancho, textos en inglés, valores rotos («undefined», «NaN») y errores en la consola |
| En local, con cuenta | Una base nueva en memoria, como administrador y como alumno. Se probaron: la inscripción de 4 pasos; inscribirse en una materia; una lección con su repaso; completarla; el carné (PDF e imágenes); el salón; el cuaderno; el expediente; el Repaso del día; los versículos; la diagnóstica; el examen final; el nivel; y el panel con sus 8 pestañas. Todo en teléfono y en computadora |
| La API en vivo | Las 105 materias, sus primeras lecciones, los 5 niveles, las 12 especialidades, el estado, los recursos y la declaración |
| Las dependencias | Una copia con su propio `node_modules` (`npm ci`): `npm outdated`, `npm audit`, `tsc`, las pruebas y la compilación |
| Los tiempos | Las páginas y la API medidas desde aquí, y el peso de cada archivo de la compilación |
| El registro de Render | **No se pudo leer:** el navegador integrado no tiene la sesión de Render y no se usó el Chrome de Luis sin su permiso. En su lugar se sondeó la API en vivo (arriba). Ver «Decisiones de Luis», punto 8 |

## Lo que funciona

| Parte | Estado |
|---|---|
| Portada, catálogo (con su buscador), recursos de estudio, reglamento, declaración de fe y verificar un documento | Bien en teléfono y en computadora, sin desbordes ni textos en inglés |
| Inscripción | El asistente de 4 pasos da la matrícula al instante (AAF-año-número) |
| Materia y lección | Inscribirse; la lectura mínima con su cuenta regresiva y los 2 minutos del video antes del repaso; el repaso con la respuesta y la cita al instante, que el lector de pantalla anuncia; completar la lección y pasar a la siguiente |
| Carné | El frente, el reverso y el PDF se hacen en el servidor y se bajan con su nombre de archivo. En vivo, `/api/academia/carne/salud` responde bien (letra, logo, imágenes y PDF) en 1,7 s |
| Salón, cuaderno, expediente, Repaso del día, versículos, diagnóstica, examen final y página del nivel | Cargan y responden sin errores; sin inscripción, piden inscribirse con su botón |
| Panel de administración | Las 8 pestañas (resumen, para revisar, alumnos, materias, contenido, registro, historial y permisos) se ven bien también en el teléfono |
| Los requisitos de los niveles | `REQUISITOS_POR_HACER` está vacío. Los requisitos de los Niveles 3 a 5 se registran desde #236, #237 y #239, así que los 5 niveles se pueden cerrar completos |
| Seguridad | El límite de 120 pedidos por minuto por persona funciona: frena con 429 y libera al minuto. Sin cuenta solo se abre la primera lección de cada materia del Nivel 1, como dice su prueba. 0 fallas en `npm audit`, con y sin las dependencias de desarrollo |
| Rendimiento | La API responde en 0,15 a 0,5 s y las páginas, en 0,27 a 0,6 s. El servidor comprime con brotli, y los archivos llevan caché de un año con su huella en el nombre |

## Los errores que se encontraron y su arreglo

| # | Qué pasaba | Gravedad | Arreglo | Estado |
|---|---|---|---|---|
| 1 | Sin cuenta, la página de cada nivel decía «Estará disponible cuando todas las materias del nivel estén listas», aunque los 5 niveles ya tienen su examen integral. El requisito decía «Cuando todas las materias estén disponibles» | Media: información falsa a quien se informa antes de inscribirse | El servidor manda al visitante el integral con su medida (40 preguntas, 2 escritas, se aprueba con 75) y lo que falta: «entrar con tu cuenta y aprobar las 10 materias del nivel» (`integralDelVisitante`, con su prueba en `server/academia-nivel.test.ts`) | #242, en vivo |
| 2 | Ocho pantallas decían «Entra con tu cuenta» sin botón para entrar: el examen final, el integral, la mini prueba, la suficiencia, la prueba diagnóstica, el escrito breve, el certificado y el Repaso del día. El Repaso del día no tenía ninguna salida | Media: pantallas sin salida | El botón «Entrar», que vuelve a la misma página, en las 8. El Repaso del día suma «Volver a la academia». El certificado, sin cuenta, suma «Verificar este código» | #242, en vivo |
| 3 | La portada decía «45 materias · Ver el catálogo», y el catálogo muestra 105 | Baja: cifras que no cuadran | La cifra suma también las 60 materias de las especialidades | #242, en vivo |
| 4 | El campo del código en «Verificar un documento» no tenía etiqueta: el lector de pantalla no decía qué escribir | Baja (accesibilidad) | La etiqueta «Código del documento» | #242, en vivo |
| 5 | El enlace «abrir» de cada video no decía qué abría | Baja (accesibilidad) | Ahora dice «Abrir el video «…» en otra pestaña», con un poco más de alto para el dedo | #242, en vivo |
| 6 | Todas las páginas de la academia tenían el mismo título de pestaña, el general de la web | Baja a media: accesibilidad (WCAG 2.4.2), historial, pestañas y buscadores | Cada página dice lo que es («¿Quién es Jesús? · Academia Avivando el Fuego», «Examen final · Hermenéutica · …»). La ficha de un alumno en el panel no pone su nombre | #243, en vivo |
| 7 | 13 dependencias tenían versión nueva dentro de su rango | Baja: sin fallas de seguridad | Suben 10, entre ellas Sentry 11.16, React Query 5.108 y lucide 1.77 (son 24 versiones en el lockfile). Se quedan, a propósito, tres: Stripe (la 23.2 exige otra versión de su API: es una decisión de pagos), el SDK de S3 (hasta que Luis pruebe R2) y read-excel-file (versión fija) | #244, en vivo |

## Lo que queda por mejorar (no se tocó aquí)

| Qué | Gravedad | Propuesta |
|---|---|---|
| **El peso del catálogo en el navegador:** cada página de la academia baja un archivo de 467 kB (113 kB comprimidos) con los sílabos, objetivos, bibliografía y recursos de las 105 materias. La causa: unas pocas páginas importan `NIVELES`, `ESPECIALIDADES` o `materiaPorId` de `shared/academia.ts`, y el archivo entero viaja con ellas. Se vuelve a bajar con cada publicación de contenido | Media en teléfonos con pocos datos | Separar un módulo liviano con las constantes, y que el catálogo y la inscripción usen la API. Toca `shared/academia.ts`, que también edita la sesión de contenido: hacerlo cuando no tenga ramas abiertas |
| `docs/academia.md`, fila A6: conserva dos frases viejas, «el nivel no se cierra hasta que se programen…» y «(`REQUISITOS_POR_HACER`)». La misma fila dice al final que los requisitos ya se registran | Baja: documentación | No se tocó, para no chocar con la sesión de contenido, que alarga esa fila (es una sola línea). Se corrige la próxima vez que se toque. La fila A2 sí se corrigió aquí |
| El aviso de 401 dice «Entra con tu cuenta para guardar tu avance» también en el carné, el expediente y los exámenes | Baja: texto genérico | Un texto por página, si se quiere |
| Los enlaces de texto sueltos («← Academia», «Ver el nivel», «Leer el capítulo») miden 20 px de alto en el teléfono | Baja: WCAG 2.5.8 sugiere 24 px | Un poco de relleno arriba y abajo |
| Las respuestas 409 («primero inscríbete») salen como error en la consola del navegador | Muy baja: son esperadas y el alumno no las ve | Se puede dejar así |
| Aviso del navegador «Unrecognized feature: 'web-share'», del video de YouTube | Ninguna | Se puede dejar así |

**Fuera de la academia** (para otra sesión, no se tocó):
- La pantalla de error de la web («Algo salió mal») no se quita al navegar a otra página: queda puesta hasta recargar.
- La «X» del aviso «Tu correo no está verificado» no tiene nombre para el lector de pantalla.
- El logo repite los identificadores de su degradado 3 veces en la misma página.
- La descripción de la web para Google y las redes, en `client/index.html`, dice «Mas de 7 anos avivando el fuego del
  Espiritu Santo», sin tildes y sin la ñ.

## Lo que falta según el guion

- **La voz de las lecciones:**
  - los Niveles 1 y 2 están grabados (86 lecciones);
  - los Niveles 3 a 5 y las especialidades los graba ahora otra sesión, que los sube a Cloudflare R2.
- **La constancia de estudios** (fase A2): no existe todavía. Las otras dos cosas que la fila A2 daba por pendientes ya
  están: las cuentas por aprobar estudian en la academia, y el Nivel 1 tiene su voz.
- **La fase A7** está sin empezar: avisos con permiso, lectura sin conexión, ceremonia y segunda opinión con IA.
- **Los 5 puntos de la declaración de fe por confirmar:** las materias que los tocan presentan las posiciones con respeto
  y dejan la del ministerio «por confirmar». Son 25 materias y 95 menciones.

## Decisiones de Luis

1. **Las firmas de los certificados.**
   - Hoy llevan la línea de la Dirección académica y el sello del Ministerio, sin nombres.
   - Hacen falta los nombres (y, si se quiere, la firma escaneada) de quien firma por la Dirección académica y por el
     Ministerio.
2. **Los 5 puntos de la declaración de fe por confirmar:**
   - la perseverancia: si el creyente que se aparta de manera definitiva puede perder la salvación;
   - si hablar en lenguas es la señal inicial y necesaria del bautismo en el Espíritu;
   - si la sanidad está «provista en la expiación»;
   - el ministerio de la mujer: si puede ejercer el pastorado y la predicación, o con qué límites;
   - el orden de los últimos tiempos: el arrebatamiento antes de la tribulación y el reino de mil años.
   Al decidirlos, se actualizan las 25 materias que los mencionan.
3. **Quién aparece como aprobador de la declaración:** la página pública dice «Aprobada por Servicio Técnico el 15 de
   noviembre de 2026», que es el nombre de la cuenta de administración. ¿Debe decir «la Dirección académica», «el
   Ministerio Avivando el Fuego» o el nombre del pastor?
4. **La constancia de estudios:** ¿se hace? Sería un documento con su código de verificación que dice en qué nivel va el
   alumno y qué aprobó, para su iglesia o su trabajo.
5. **Probar la subida de su foto:**
   - es para comprobar los archivos en R2 (las variables `S3_*` ya están en Render);
   - después se puede subir el SDK de S3 que quedó en espera.
6. **Stripe:** está apagado en Render. Si se activa, conviene subirlo a la 23.2 con su versión de API nueva, y
   probarlo antes.
7. **Node en Render:**
   - sigue en Node 24, que tiene soporte de mantenimiento hasta abril de 2028;
   - pasar a Node 26 (el de soporte largo activo) no es urgente: cuando se quiera, con prueba.
8. **El registro de Render:**
   - no se pudo leer desde aquí;
   - para mirarlo: Render → el servicio de la web → Logs, buscando «error» o «[academia]»;
   - o abrir sesión de Render en el navegador integrado para la próxima revisión.

**Gastos:** ninguno nuevo. R2 es gratis hasta 10 GB, y las voces de toda la academia ocupan unos 500 MB.

## Los PR de esta revisión

- #242: lo que ve quien entra sin cuenta (el examen integral, «Entrar» en 8 pantallas y las 105 materias) y dos
  etiquetas de accesibilidad.
- #243: cada página con su título de pestaña.
- #244: las dependencias al día dentro de su versión.
- Este informe y la corrección de la fila A2 de `docs/academia.md`.
