/**
 * El laboratorio de Homilética I (Nivel 3): preparar un devocional sobre un pasaje nuevo, Zaqueo (Lucas 19:1-10),
 * ordenando lo más apropiado en cada paso de las lecciones 2 (el estudio), 3 (la idea central) y 5 (ilustrar y aplicar).
 * Las lecciones usan Lucas 15:1-7 de ejemplo; aquí el alumno aplica lo mismo a otro pasaje.
 */
import type { PracticaDef } from "./tipos";

export const PRACTICAS_HOMILETICA: PracticaDef[] = [
  {
    id: "homiletica-devocional-zaqueo",
    materia: "n3-homiletica-1",
    titulo: "Un devocional sobre Zaqueo",
    formato: "ordenar",
    rol: "Te toca preparar el devocional del jueves con los jóvenes de tu iglesia.",
    situacion: "Tienes diez minutos para enseñar Lucas 19:1-10, la historia de Zaqueo.",
    objetivo: "Preparar el mensaje como enseñan las lecciones 2, 3 y 5: estudiar el pasaje, escribir la idea central, e ilustrarla con verdad y aplicarla con gracia.",
    minutos: 8,
    lecciones: [2, 3, 5],
    lectura: "Lucas 19:1-10",
    antes: [
      "Antes de empezar, lee Lucas 19:1-10 en tu Biblia.",
      "Son 4 rondas. En cada una ordenas cuatro opciones, de la más apropiada a la menos apropiada: tocas primero la mejor, después la que sigue, y así hasta la última.",
      "Lo que cuenta es qué tan cerca quedas del orden de quien sabe: no hace falta acertarlo todo para aprender.",
    ],
    cierre: "Escribe con tus palabras la idea central de Lucas 19:1-10, con su tema y su complemento.",
    competencias: [
      { id: "estudio", nombre: "Estudiar el pasaje", leccion: "lección 2", peso: 20 },
      { id: "idea", nombre: "La idea central", leccion: "lección 3", peso: 35 },
      { id: "ilustrar", nombre: "Ilustrar con verdad", leccion: "lección 5", peso: 25 },
      { id: "aplicar", nombre: "Aplicar con gracia", leccion: "lección 5", peso: 20 },
    ],
    rondas: [
      {
        id: "pasos",
        titulo: "Por dónde empezar",
        competencia: "estudio",
        situacion: "Es lunes, y el devocional es el jueves. Ya escogiste el pasaje completo: Lucas 19:1-10.",
        pregunta: "Ordena los pasos: ¿qué haces primero y qué dejas para el final?",
        opciones: [
          {
            texto: "Orar y leer el pasaje varias veces, si se puede en dos versiones.",
            porque: "Primero el pasaje y la oración: el que enseña lo estudia para sí mismo antes de pensar en los demás, como Esdras (Esdras 7:10).",
          },
          {
            texto: "Anotar lo que observas: quién es Zaqueo, qué palabras se repiten (hoy, casa, ver) y el contraste entre hombre pecador e hijo de Abraham (19:7, 19:9).",
            porque: "Después se observa: quién, qué, cuándo, dónde, por qué y cómo, con las palabras repetidas y los contrastes.",
          },
          {
            texto: "Leer lo que pasa poco antes, cuando Jesús dice lo difícil que es para un rico entrar en el reino (18:24-27), y escribir en una frase lo que Lucas quiso decir.",
            porque: "El contexto es decisivo: poco antes, Jesús dijo que lo imposible para los hombres es posible para Dios (18:27), y aquí un rico recibe la salvación. Tu estudio se cierra con una frase de lo que Lucas quiso decir a sus primeros lectores; las ayudas vienen después.",
          },
          {
            texto: "Buscar qué dicen de Zaqueo uno o dos comentarios.",
            porque: "Las ayudas van al final: si empiezas por un comentario, repetirás lo que otro vio. Después confirman, corrigen o enriquecen lo que encontraste.",
          },
        ],
        camino: { titulo: "Del pasaje a las ayudas", porque: "Orar y leer, observar, estudiar el contexto y escribir lo que el autor quiso decir; los comentarios, al final (lección 2)." },
      },
      {
        id: "idea",
        titulo: "La idea central",
        competencia: "idea",
        situacion:
          "Ya estudiaste el pasaje. Zaqueo era jefe de los publicanos, y rico. Jesús lo llamó por su nombre y fue a su casa, aunque todos murmuraban. Zaqueo cambió, y Jesús dijo que el Hijo del Hombre vino a buscar y a salvar lo que se había perdido (19:10).",
        pregunta: "Ordena estas ideas centrales, de la mejor a la peor.",
        opciones: [
          {
            texto: "Jesús busca y salva al perdido, y su gracia cambia la vida del que lo recibe.",
            porque: "Fiel al texto, clara, completa y fácil de recordar: un tema (cómo trata Jesús al perdido) y un complemento (lo busca y lo salva, y su gracia lo cambia).",
          },
          {
            texto: "Jesús busca a los pecadores.",
            porque: "Es fiel y clara, pero se queda en la mitad del pasaje: dice que Jesús busca, no que salva (19:9-10) ni que su gracia cambia a Zaqueo (19:8). En el ejemplo de Lucas 15, el complemento dice las dos cosas: que Dios busca al perdido y que se goza cuando se arrepiente (lección 3).",
          },
          {
            texto: "La historia de Zaqueo.",
            porque: "Dice de qué se habla, pero no qué se dice de eso: le falta el complemento, y los oyentes no se llevan una idea a casa.",
          },
          {
            texto: "Si das la mitad de lo que tienes a los pobres, Dios te salva.",
            porque: "No es fiel al texto: Zaqueo no compró su salvación. Jesús lo llamó y entró en su casa cuando todos lo tenían por pecador, y el cambio vino después (19:5-8).",
            critica: "Pusiste primero una idea que el pasaje no dice: le harías decir al texto lo contrario del evangelio. La idea central dice lo que el pasaje dice, no algo que se le añade (lección 3).",
          },
        ],
        camino: { titulo: "Una idea fiel, clara y completa", porque: "Una sola idea central, con su tema y su complemento: fiel al texto, clara y fácil de recordar (lección 3)." },
      },
      {
        id: "ilustrar",
        titulo: "La ilustración",
        competencia: "ilustrar",
        situacion: "Para mostrar cómo la gracia cambia la vida, buscas una ilustración.",
        pregunta: "Ordena las ilustraciones, de la más apropiada a la menos apropiada.",
        opciones: [
          {
            texto: "Contar en un minuto, con su permiso, cómo Cristo cambió a un conocido que engañaba en su trabajo, y volver a Zaqueo (19:8).",
            porque: "Verdadera, respetuosa y breve, y lleva de vuelta al pasaje: la buena ilustración sirve al texto (lección 5).",
          },
          {
            texto: "Una escena de la vida diaria, presentada como ejemplo: un papá que busca a su hijo perdido en el mercado hasta encontrarlo.",
            porque: "Es breve y clara, y no se cuenta como si hubiera pasado; muestra que Jesús busca, aunque no el cambio que trae la gracia.",
          },
          {
            texto: "Una película que te gustó, contada con detalle durante cinco minutos.",
            porque: "Se roba la atención: la buena ilustración aclara el texto, no lo reemplaza (lección 5).",
          },
          {
            texto: "Un testimonio impactante que leíste en internet, contado como si te hubiera pasado a ti.",
            porque: "Contar como tuyo lo que le pasó a otro es mentir: nunca se inventan testimonios ni experiencias para impresionar. Si usas el material de otro, dilo (lección 5).",
            critica: "Pusiste primero un testimonio ajeno contado como propio. La verdad del mensaje se sostiene también con la honestidad del mensajero (lección 5).",
          },
        ],
        camino: { titulo: "Una ilustración verdadera y breve", porque: "Que sea verdadera, que respete a las personas, que sea breve y lleve de vuelta al texto, y que se diga de dónde viene (lección 5)." },
      },
      {
        id: "aplicar",
        titulo: "La aplicación",
        competencia: "aplicar",
        situacion: "Llegas a la conclusión. Tu propósito es el del pasaje: que el que está lejos reciba a Jesús, y que el grupo reciba a los que otros rechazan. Quieres que los jóvenes sean hacedores de la palabra, y no solo oidores (Santiago 1:22).",
        pregunta: "Ordena las aplicaciones, de la más apropiada a la menos apropiada.",
        opciones: [
          {
            texto: "Jesús te busca y te llama por tu nombre, como a Zaqueo: si estás lejos, hoy puedes recibirlo. Y si ya te encontró, haz lo mismo: esta semana, invita a comer a alguien que los demás rechazan.",
            porque: "Sale del propósito del pasaje, es concreta (qué, con quién y cuándo) y lleva a confiar en la gracia de Cristo (lección 5).",
          },
          {
            texto: "Esta semana, acércate a un compañero que los demás rechazan e invítalo a comer.",
            porque: "Es concreta y sale del pasaje, pero se queda en el esfuerzo: no lleva a confiar en Cristo, que es quien cambia la vida.",
          },
          {
            texto: "Seamos mejores personas.",
            porque: "Es tan general que nadie sabe qué hacer: la aplicación dice qué hacer, con quién y cuándo (lección 5).",
          },
          {
            texto: "Para ser salvo como Zaqueo, da la mitad de lo que tienes a los pobres y devuelve cuatro veces lo que le hayas quitado a alguien con engaño.",
            porque: "Convierte el pasaje en una lista de reglas para ganarse la salvación. El cambio verdadero viene de la gracia de Dios (lección 5).",
            critica: "Pusiste primero una aplicación que enseña a ganarse la salvación con obras: en el pasaje, Jesús llamó a Zaqueo antes de que él diera nada (19:5-8, lección 5).",
          },
        ],
        camino: { titulo: "Una aplicación concreta que lleva a Cristo", porque: "La aplicación sale del propósito del pasaje, dice qué hacer, con quién y cuándo, y lleva a confiar en la gracia de Cristo, no solo a esforzarse más (lección 5)." },
      },
    ],
  },
];
