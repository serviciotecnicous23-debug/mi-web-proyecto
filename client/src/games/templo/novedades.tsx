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
