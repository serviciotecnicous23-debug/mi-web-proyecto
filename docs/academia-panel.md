# El panel de administración: análisis y plan (20-nov-2026)

Revisión del panel general (`/admin`) y del panel de la academia (`/admin/academia`), pulsando cada pestaña y cada botón
en una copia local como administrador, y comparándolos con otros sistemas académicos.

## Lo que no funcionaba

| Dónde | Qué pasaba | Cómo quedó | Parte |
|---|---|---|---|
| Panel general, arriba | Las cinco cifras (Usuarios, Activos, Cursos, Eventos y Mensajes) parecían botones y no hacían nada. | Cada una lleva a su pestaña. | 1 |
| Panel general, Solicitudes | Las cuentas que su dueño eliminó salían como solicitudes por aprobar, con «Aprobar» y «Rechazar», y sumaban en el número rojo de la pestaña. | Ya no salen, y el servidor no deja activarlas. | 1 |
| Panel general, lista de usuarios | El servidor le mandaba al navegador la clave cifrada y el código de verificación del correo de cada cuenta. | Se quitan antes de mandar la lista. | 1 |
| Academia, Contenido | Las 60 materias de las 12 especialidades no estaban en la revisión doctrinal: no había dónde aprobarlas. | Están las 105, con filtros («Por aprobar», «Solo las especialidades») y un botón «Revisar y aprobar» en cada fila. | 1 |
| Academia, Resumen, Materias y el archivo para descargar | El informe de materias tenía solo las de los niveles, y la página de seguimiento de una materia de especialidad se rompía. | Las 105, agrupadas por nivel o especialidad, con búsqueda. | 1 |
| Academia, Resumen | El aviso «Para revisar» no contaba las actividades de los niveles (horas de práctica, enseñanza, consolidación, sermón y proyecto). La revisión doctrinal solo se veía con la academia cerrada. | Una bandeja de pendientes con todo lo que espera, por tipo, y un botón que lleva a donde se resuelve. | 1 |
| Academia, Resumen | Las cifras y las barras (por estatus, país e iglesia) no llevaban a ninguna parte. | Llevan a la lista de alumnos ya filtrada. La lista también se puede ordenar. | 1 |
| Academia, ficha del alumno | Mostraba la ficha, las materias, los documentos y la actividad. No usaba lo que la academia ya guarda de cada alumno: los minutos de estudio de cada día, cada intento de examen con cada respuesta, las respuestas escritas, las reflexiones de las lecciones, el repaso espaciado, el video y los versículos. | El perfil completo de la sección siguiente. | 2 |

## Cómo lo hacen otros sistemas

| Sistema | Qué tiene | Qué tomamos |
|---|---|---|
| **Canvas**: la tarjeta de cada alumno y la analítica del curso | La última vez que entró, su nota actual, sus últimas calificaciones y lo que le falta entregar; la actividad del curso y de cada alumno. | Un perfil que se entiende de un vistazo: por dónde va, sus notas y su actividad semana a semana. |
| **Blackboard**: el centro de retención | Alertas por reglas: plazos vencidos, notas por debajo del promedio, poca actividad y días sin entrar. El maestro ve a quién y anota el contacto. Los alumnos no ven las alertas. | Alertas en el perfil y en el panel, que solo ve la Administración, y una bitácora de seguimiento. |
| **Moodle**: la analítica | Un modelo que marca a los alumnos en riesgo de abandonar cuando no tienen actividad. | La alerta de quien se detuvo, con el detalle de qué dejó a medias. |

Fuentes: [Canvas, la tarjeta del alumno](https://community.canvaslms.com/docs/DOC-12709);
[Canvas, la analítica (UW-Madison)](https://kb.wisc.edu/learning-analytics/page.php?id=113139);
[Blackboard, el centro de retención](https://help.blackboard.com/Learn/Instructor/Original/Performance/Retention_Center);
[Moodle, alumnos en riesgo de abandonar](https://docs.moodle.org/en/Students_at_risk_of_dropping_out).

## Quién ve qué

Sigue la matriz de `shared/academia-permisos.ts`: **solo el administrador administra**.
- **El administrador** ve todo, revisa, aprueba y gestiona.
- **El director, los maestros del ministerio y los obreros** solo consultan el avance y las notas, sin datos de contacto.
- **Las iglesias aliadas** ven solo a los alumnos de su iglesia.

## El perfil completo del alumno (parte 2)

En el panel, el nombre de cada alumno abre su perfil. Lo arma `server/academia-perfil.ts` con lo que la academia ya
guarda; las reglas están en `shared/academia-perfil.ts`, con sus pruebas. Tiene seis pestañas:

- **Resumen:**
  - las alertas, de la más grave a la de solo saber;
  - su próximo paso y sus logros;
  - cinco cifras: el avance del programa (materias aprobadas de las 45 de los niveles), el nivel actual, el promedio, el estudio de los últimos 30 días y la racha;
  - el avance por nivel y por especialidad;
  - el calendario de estudio de las últimas 12 semanas;
  - los minutos y las lecciones de cada semana, con su meta.
- **Materias y notas:**
  - por dónde va en cada materia, con «Gestionar» para la Administración;
  - las partes de cada nota con su peso;
  - cada intento de examen, con sus aciertos y su fecha.
- **Aprendizaje:**
  - el acierto por tipo de pregunta, de recordar a analizar;
  - las lecciones que más le cuestan y las que mejor domina;
  - las preguntas que más falla;
  - el repaso del día, los versículos, el video, el cuaderno y sus reflexiones.

  Todo sale de sus respuestas en los exámenes, en el repaso de cada lección (la primera vez) y en el repaso del día.
- **Actividades del nivel:** lo que piden los Niveles 2 a 5 y por dónde va en cada cosa.
- **Seguimiento:** la bitácora (tabla `academia_seguimiento`), las herramientas de la Administración, el mentor y su actividad.
  - En la bitácora se anota cada contacto: una nota, una llamada, un mensaje, una visita, una reunión o la oración.
  - Cada anotación y cada borrado quedan en el historial.
  - La bitácora se borra si el alumno elimina su cuenta.
- **Ficha y documentos:** la ficha de inscripción, los niveles, los certificados y las respuestas escritas.

**Las alertas** (`UMBRALES` en `shared/academia-perfil.ts`). Solo las ve el panel, nunca el alumno.

| Alerta | Cuándo salta | Prioridad |
|---|---|---|
| Días sin estudiar | Con materias en curso, desde 7 días. | Media; alta desde 14 |
| Final reprobado | Dos veces el final de una materia que todavía no aprobó. | Alta |
| Promedio bajo | Promedio menor de 70 en sus últimos cinco exámenes (con al menos tres). | Media |
| Lección detenida | Una lección abierta hace 14 días o más sin terminar. | Media |
| Meta sin cumplir | Tres semanas completas seguidas sin su meta de minutos. Solo cuentan las semanas desde que se inscribió. | Media |
| No empezó | Siete días desde que se inscribió sin terminar ninguna lección. | Media |
| Repaso vencido | 20 o más preguntas del repaso del día vencidas. | Solo saber |
| Sin mentor | En el Nivel 1, si todavía no tiene mentor. | Solo saber |
| Espera revisión | Tiene respuestas escritas o actividades por revisar. | Solo saber |

**Quién ve qué en el perfil:**
- El administrador ve todo.
- El director, los maestros, los obreros y las iglesias aliadas (cada iglesia, solo sus alumnos) ven el avance, las notas, el aprendizaje y las alertas. No ven tres cosas: el texto de las preguntas que el alumno falla, sus reflexiones (que son personales) y la bitácora. Tampoco pueden anotar.

## El plan por partes

1. **Lo que no funcionaba:** la tabla de arriba.
2. **El perfil completo de cada alumno:**
   - por dónde va, qué está aprendiendo y su próximo paso;
   - sus notas por materia y cada intento de examen;
   - sus fortalezas y lo que le cuesta, por lección y por tipo de pregunta;
   - su tiempo de estudio semana a semana;
   - el repaso, los versículos y las actividades de su nivel;
   - alertas, una bitácora de seguimiento y un aviso a la campana.
3. **Alertas y tendencias en el panel:**
   - quiénes necesitan ayuda y por qué;
   - las inscripciones, las lecciones y los minutos de cada semana;
   - en qué lección se detienen los alumnos de cada materia.
4. **El resto del panel general:** probar cada pestaña con datos.
