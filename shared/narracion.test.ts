import { test } from "node:test";
import assert from "node:assert/strict";
import { citaDicha, encabezadoDeCita, enPalabras, guionDeLeccion, hablado, huellaDeLeccion, lugarEn, sinNumerosDeVerso, type LeccionNarrable } from "./narracion";

test("los números en palabras", () => {
  assert.equal(enPalabras(0), "cero");
  assert.equal(enPalabras(1), "uno");
  assert.equal(enPalabras(16), "dieciséis");
  assert.equal(enPalabras(21), "veintiuno");
  assert.equal(enPalabras(39), "treinta y nueve");
  assert.equal(enPalabras(100), "cien");
  assert.equal(enPalabras(119), "ciento diecinueve");
  assert.equal(enPalabras(1569), "mil quinientos sesenta y nueve");
  assert.equal(enPalabras(1960), "mil novecientos sesenta");
  assert.equal(enPalabras(21000), "veintiún mil");
  assert.equal(enPalabras(5674), "cinco mil seiscientos setenta y cuatro");
  assert.equal(enPalabras(1_000_000), "un millón");
});

test("las citas dentro de un párrafo", () => {
  assert.equal(citaDicha("Juan 3:16"), "Juan tres, dieciséis");
  assert.equal(citaDicha("Mateo 16:15-17"), "Mateo dieciséis, quince al diecisiete");
  assert.equal(citaDicha("Romanos 10:9-10"), "Romanos diez, nueve y diez");
  assert.equal(citaDicha("1 Juan 1:9"), "Primera de Juan uno, nueve");
  assert.equal(citaDicha("2 Timoteo 3:16-17"), "Segunda de Timoteo tres, dieciséis y diecisiete");
  assert.equal(citaDicha("1 Samuel 16:7"), "Primero de Samuel dieciséis, siete");
  assert.equal(citaDicha("Salmos 119:11"), "Salmo ciento diecinueve, once");
  assert.equal(citaDicha("Galatas 2:20"), "Gálatas dos, veinte");
  assert.equal(citaDicha("Juan 3:16, 18"), "Juan tres, dieciséis y dieciocho");
  assert.equal(citaDicha("Busca Salmos 23, Juan 14 y Efesios 2"), "Busca Salmo veintitrés, Juan catorce y Efesios dos");
  assert.equal(citaDicha("el Salmo 51"), "el Salmo cincuenta y uno");
  // una palabra que contiene el nombre de un libro no es una cita
  assert.equal(citaDicha("Juanito 3 veces"), "Juanito 3 veces");
});

test("los libros con número que no llevan capítulo", () => {
  assert.equal(hablado("Resumen del libro de 1 Corintios"), "Resumen del libro de Primera de Corintios");
  assert.equal(
    hablado("Josué, Jueces, Rut, 1 y 2 Samuel, 1 y 2 Reyes, 1 y 2 Crónicas."),
    "Josué, Jueces, Rut, Primero y Segundo de Samuel, Primero y Segundo de Reyes, Primero y Segundo de Crónicas.",
  );
  assert.equal(hablado("Hebreos, Santiago, 1 y 2 Pedro, 1, 2 y 3 Juan y Judas"), "Hebreos, Santiago, Primera y Segunda de Pedro, Primera, Segunda y Tercera de Juan y Judas");
  assert.equal(hablado("Resumen de los libros de 1-3 Juan"), "Resumen de los libros de Primera a Tercera de Juan");
  assert.equal(hablado("de 1–3 Juan"), "de Primera a Tercera de Juan");
  assert.equal(hablado("1 Timoteo, 2 Timoteo y Tito"), "Primera de Timoteo, Segunda de Timoteo y Tito");
  assert.equal(hablado("lee 1 Juan 1:9 y 2 Pedro"), "lee Primera de Juan uno, nueve y Segunda de Pedro");
  // un año delante de un nombre: el número no cambia
  assert.equal(hablado("en 1791 Juan Wesley escribió"), "en mil setecientos noventa y uno Juan Wesley escribió");
});

test("las horas de un horario, los miles con coma y los números para mensajes", () => {
  assert.equal(hablado("7:00, bienvenida: el equipo recibe"), "siete en punto, bienvenida: el equipo recibe");
  assert.equal(hablado("un solo texto. 7:40, la Palabra"), "un solo texto. siete y cuarenta, la Palabra");
  // una cita sin el libro sigue siendo una cita
  assert.equal(hablado("Pablo escribe preso (1:13), agradece"), "Pablo escribe preso, uno, trece, agradece");
  assert.equal(hablado("Lo que entró (5:12, 15)"), "Lo que entró, cinco, doce, quince");
  assert.equal(hablado("entraron 120,000 dólares y 2,000 horas"), "entraron ciento veinte mil dólares y dos mil horas");
  assert.equal(hablado("a unos 5,6 kilómetros"), "a unos cinco coma seis kilómetros");
  assert.equal(hablado("o escribir START al 88788."), "o escribir Start al ocho ocho siete ocho ocho.");
});

test("los años y los números delante de lo que no se cuenta", () => {
  assert.equal(hablado("en 1521 se negó en Worms"), "en mil quinientos veintiuno se negó en Worms");
  assert.equal(hablado("hallada en 1961 lleva el nombre"), "hallada en mil novecientos sesenta y uno lleva el nombre");
  assert.equal(hablado("y desde 2021 prohíbe"), "y desde dos mil veintiuno prohíbe");
  assert.equal(hablado("hacia el 701 a. C."), "hacia el setecientos uno antes de Cristo");
  assert.equal(hablado("en el Nivel 1 antes de diciembre"), "en el Nivel uno antes de diciembre");
  assert.equal(hablado("en Texas, el 2-1-1 la conecta"), "en Texas, el dos uno uno la conecta");
  // lo que sí se cuenta
  assert.equal(hablado("vuelven a los 21 días"), "vuelven a los veintiún días");
  // un formulario o un código con guion
  assert.equal(hablado("el Formulario AP-209 ante la Contraloría"), "el Formulario AP doscientos nueve ante la Contraloría");
  assert.equal(hablado("el Formulario I-9 y el DWC-005"), "el Formulario I nueve y el DWC cero cero cinco");
  assert.equal(hablado("21 semanas y 1 libro"), "veintiuna semanas y un libro");
});

test("los artículos de ley se dicen con «punto», no como miles", () => {
  assert.equal(
    hablado("Se reporta (Código de Familia, sección 261.101)."),
    "Se reporta, Código de Familia, sección doscientos sesenta y uno punto ciento uno.",
  );
  assert.match(hablado("Es un delito (Código Penal, sección 22.011)."), /sección veintidós punto cero once/);
  assert.match(hablado("Lo pide el Código de Recursos Humanos 48.051."), /Humanos cuarenta y ocho punto cero cincuenta y uno/);
  assert.match(hablado("Puede quedar exento (Código Tributario, sección 11.20)."), /sección once punto veinte/);
  assert.match(
    hablado("Lo dicen las secciones 261.106 y 261.109."),
    /secciones doscientos sesenta y uno punto ciento seis y doscientos sesenta y uno punto ciento nueve/,
  );
  assert.match(hablado("La identificación de 47 CFR 73.1201."), /CFR setenta y tres punto mil doscientos uno/);
  // fuera de una ley, el punto sigue siendo de miles
  assert.match(hablado("Hay 5.674 manuscritos."), /cinco mil seiscientos setenta y cuatro manuscritos/);
});

test("la cita de un bloque de versículo se dice con capítulo y versículos", () => {
  assert.equal(encabezadoDeCita("Mateo 16:15-17"), "Mateo, capítulo dieciséis, versículos quince al diecisiete");
  assert.equal(encabezadoDeCita("Juan 1:14"), "Juan, capítulo uno, versículo catorce");
  assert.equal(encabezadoDeCita("1 Corintios 11:23-26"), "Primera de Corintios, capítulo once, versículos veintitrés al veintiséis");
  assert.equal(encabezadoDeCita("Juan 3:16 (RV1909)"), "Juan, capítulo tres, versículo dieciséis");
});

test("el texto dicho: paréntesis, números, años, siglos y abreviaturas", () => {
  assert.equal(
    hablado("el Salvador prometido en el Antiguo Testamento (Juan 1:41). Jesús añadió algo"),
    "el Salvador prometido en el Antiguo Testamento, Juan uno, cuarenta y uno. Jesús añadió algo",
  );
  assert.equal(hablado("por gracia y no por obras (Efesios 2:8-9; Tito 3:5)."), "por gracia y no por obras, Efesios dos, ocho y nueve; Tito tres, cinco.");
  assert.equal(hablado("de Egipto (Éxodo 12:14, 17; 13:3)"), "de Egipto, Éxodo doce, catorce y diecisiete; trece, tres");
  assert.equal(hablado("El Antiguo Testamento, con 39 libros"), "El Antiguo Testamento, con treinta y nueve libros");
  assert.equal(hablado("la traducción completa en 1569"), "la traducción completa en mil quinientos sesenta y nueve");
  assert.equal(hablado("en el siglo XVI"), "en el siglo dieciséis");
  assert.equal(hablado("la RV1960 dice"), "la Reina-Valera mil novecientos sesenta dice");
  assert.equal(hablado("1 libro y 21 semanas"), "un libro y veintiuna semanas");
  assert.equal(hablado("el 35 % de las iglesias"), "el treinta y cinco por ciento de las iglesias");
  assert.equal(hablado("llama al 911 o al 988"), "llama al nueve uno uno o al nueve ocho ocho");
  assert.equal(hablado("Id y haced discípulos"), "Id, y haced discípulos");
  assert.equal(hablado("Siglos I al XV: la Biblia se copia a mano"), "Siglos uno al quince: la Biblia se copia a mano");
  assert.equal(hablado("c. 48: Gálatas"), "hacia el año cuarenta y ocho: Gálatas");
  assert.equal(hablado("c. siglo II a. C.: se copia"), "hacia el siglo dos antes de Cristo: se copia");
  assert.equal(hablado("c. siglos VII al X: los masoretas"), "hacia los siglos siete al diez: los masoretas");
  assert.equal(hablado("c. 6-4 a. C.: nace Jesús"), "hacia el año seis a cuatro antes de Cristo: nace Jesús");
  assert.equal(hablado("en Teología sistemática IV y en Homilética I"), "en Teología sistemática cuatro y en Homilética uno");
  assert.equal(hablado("Bajo Jeroboam II, Israel prosperó"), "Bajo Jeroboam segundo, Israel prosperó");
  assert.equal(hablado("Historia de la iglesia II"), "Historia de la iglesia dos");
  assert.equal(hablado("El papiro P52 y la palabra (Strong G4697)"), "El papiro pe cincuenta y dos y la palabra, Strong ge cuatro mil seiscientos noventa y siete");
  assert.equal(hablado("La ley RLUIPA, 42 U.S.C. 2000cc, protege"), "La ley RLUIPA, cuarenta y dos del Código de los Estados Unidos, sección dos mil ce ce, protege");
  assert.equal(hablado("en reportfraud.ftc.gov y al FBI, en ic3.gov."), "en reportfraud punto efe te ce punto gov y al FBI, en i ce tres punto gov.");
  assert.equal(hablado("el letrero decía AL DIOS NO CONOCIDO y la ONU"), "el letrero decía Al Dios No Conocido y la ONU");
  assert.equal(hablado("el IRS, la FEMA y la radio AM y FM; YO SOY"), "el IRS, la FEMA y la radio AM y FM; Yo Soy");
  assert.equal(hablado("se escribe con cuatro letras, YHWH, que"), "se escribe con cuatro letras, i griega, hache, doble ve, hache, que");
  assert.equal(hablado("cierra el Antiguo Testamento. (Malaquías 1:1)"), "cierra el Antiguo Testamento. Malaquías uno, uno");
  assert.equal(hablado("«Dios es amor» —dice Juan— y basta"), "Dios es amor, dice Juan, y basta");
  assert.equal(hablado("en el año 30 d. C. y el 586 a. C."), "en el año treinta después de Cristo y el quinientos ochenta y seis antes de Cristo");
});

test("las mayúsculas sostenidas del versículo se dicen como palabras", () => {
  const g = guionDeLeccion({ ...LECCION, bloques: [{ t: "versiculo", ref: "Éxodo 3:14", texto: "Y respondió Dios a Moisés: YO SOY EL QUE SOY." }] });
  assert.equal(g.find((p) => p.lugar === "0")?.texto, "Éxodo, capítulo tres, versículo catorce. Y respondió Dios a Moisés: Yo Soy El Que Soy.");
});

test("los números de verso se quitan del texto bíblico", () => {
  assert.equal(sinNumerosDeVerso("15 Él les dijo: Y vosotros, ¿quién decís que soy yo? 16 Respondiendo Simón Pedro, dijo"), "Él les dijo: Y vosotros, ¿quién decís que soy yo? Respondiendo Simón Pedro, dijo");
});

const LECCION: LeccionNarrable = {
  materia: "La salvación: nueva vida en Cristo",
  titulo: "¿Quién es Jesús?",
  n: 1,
  objetivos: ["Explicar qué confesó Pedro acerca de Jesús.", "Distinguir entre saber acerca de Jesús y recibirlo."],
  paraEmpezar: "Si alguien te preguntara hoy quién es Jesús para ti, ¿qué responderías?",
  bloques: [
    { t: "subtitulo", texto: "La pregunta más importante" },
    { t: "parrafo", texto: "Pedro respondió (Juan 1:41)." },
    { t: "versiculo", ref: "Mateo 16:15-16", texto: "15 Él les dijo: Y vosotros, ¿quién decís que soy yo? 16 Respondiendo Simón Pedro, dijo: Tú eres el Cristo, el Hijo del Dios viviente." },
    { t: "video", url: "https://www.youtube.com/watch?v=abc", titulo: "Resumen del libro de Juan (parte 1)", fuente: "Proyecto Biblia" },
    { t: "imagen", src: "/x.png", alt: "un mapa" },
  ],
  ideaClave: "Jesús es el Cristo, el Hijo del Dios viviente",
  paraLaVida: { texto: "Piensa en tu respuesta.", pregunta: "¿Quién es Jesús para ti?" },
};

test("el guion sigue el orden de la página y marca cada lugar", () => {
  const g = guionDeLeccion(LECCION);
  assert.deepEqual(g.map((p) => p.lugar), ["titulo", "objetivos", "-1", "0", "1", "2", "3", "-2", "vida"]);
  assert.equal(g[0].texto, "La salvación: nueva vida en Cristo. Lección uno: ¿Quién es Jesús?");
  assert.equal(g[1].texto, "Al terminar esta lección podrás explicar qué confesó Pedro acerca de Jesús; y distinguir entre saber acerca de Jesús y recibirlo.");
  assert.equal(g[2].texto, "Para empezar. Si alguien te preguntara hoy quién es Jesús para ti, ¿qué responderías?");
  assert.equal(g[3].texto, "La pregunta más importante.");
  assert.equal(g[4].texto, "Pedro respondió, Juan uno, cuarenta y uno.");
  assert.equal(
    g[5].texto,
    "Mateo, capítulo dieciséis, versículos quince y dieciséis. Él les dijo: Y vosotros, ¿quién decís que soy yo? Respondiendo Simón Pedro, dijo: Tú eres el Cristo, el Hijo del Dios viviente.",
  );
  assert.equal(g[6].texto, "En la página tienes el video Resumen del libro de Juan, parte uno.");
  // la imagen sin pie no se dice (no hay lugar 4)
  assert.equal(g[7].texto, "La idea clave. Jesús es el Cristo, el Hijo del Dios viviente.");
  assert.match(g[8].texto, /^Para la vida\. Piensa en tu respuesta\. ¿Quién es Jesús para ti\? Cuando estés listo/);
  for (const p of g) assert.doesNotMatch(p.texto, /\d/, `sin cifras: «${p.texto}»`);
});

test("un versículo sin texto (la Biblia no cargó) no se dice", () => {
  const g = guionDeLeccion({ ...LECCION, bloques: [{ t: "versiculo", ref: "Juan 3:16", texto: null }] });
  assert.ok(!g.some((p) => p.lugar === "0"));
});

test("la huella cambia si cambia el contenido, pero no con el texto de la Biblia", () => {
  const h = huellaDeLeccion(LECCION);
  assert.match(h, /^[0-9a-f]{8}$/);
  assert.equal(huellaDeLeccion({ ...LECCION }), h);
  const otraBiblia = { ...LECCION, bloques: LECCION.bloques.map((b) => (b.t === "versiculo" ? { ...b, texto: "otro" } : b)) };
  assert.equal(huellaDeLeccion(otraBiblia), h);
  assert.notEqual(huellaDeLeccion({ ...LECCION, ideaClave: "Otra idea" }), h);
  assert.notEqual(huellaDeLeccion({ ...LECCION, n: 2 }), h);
});

test("el lugar que suena en cada segundo", () => {
  const marcas: [string, number][] = [["titulo", 0], ["objetivos", 4.2], ["-1", 12.5], ["0", 20]];
  assert.equal(lugarEn(marcas, 0), 0);
  assert.equal(lugarEn(marcas, 4.19), 1); // con un margen de 50 ms
  assert.equal(lugarEn(marcas, 12), 1);
  assert.equal(lugarEn(marcas, 99), 3);
  assert.equal(lugarEn([], 3), -1);
});

test("los esquemas se dicen: línea de tiempo, cuadro comparativo y pasos", () => {
  const g = guionDeLeccion({
    ...LECCION,
    bloques: [
      { t: "linea", titulo: "La Biblia en español", eventos: [{ fecha: "1569", texto: "La Biblia del Oso", ref: "Salmos 119:105" }, { fecha: "27 a. C.-14 d. C.", texto: "Augusto" }] },
      { t: "cuadro", titulo: "Fe y obras", columnas: ["Palabra", "Lo que es (Efesios 2)", "Base bíblica"], filas: [["Fe", "Confiar en Cristo", "Efesios 2:8-9"]] },
      { t: "pasos", titulo: "Cómo orar", pasos: [{ titulo: "Adorar", texto: "Reconoce quién es Dios." }, { titulo: "Pedir", texto: "Pide con fe." }] },
    ],
  });
  const texto = (lugar: string) => g.find((p) => p.lugar === lugar)?.texto;
  assert.equal(
    texto("0"),
    "Línea de tiempo: La Biblia en español. mil quinientos sesenta y nueve: La Biblia del Oso, Salmo ciento diecinueve, ciento cinco. veintisiete antes de Cristo a catorce después de Cristo: Augusto.",
  );
  assert.equal(texto("1"), "Cuadro comparativo: Fe y obras. Fe. Lo que es: Confiar en Cristo. Base bíblica: Efesios dos, ocho y nueve.");
  assert.equal(texto("2"), "Cómo orar. Paso uno: Adorar. Reconoce quién es Dios. Paso dos: Pedir. Pide con fe.");
  for (const p of g) assert.doesNotMatch(p.texto, /\d/, `sin cifras: «${p.texto}»`);
});
