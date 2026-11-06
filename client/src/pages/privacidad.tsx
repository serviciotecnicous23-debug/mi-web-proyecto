import { Link } from "wouter";
import { LegalPage, type LegalSection } from "@/components/LegalPage";

const ul = "list-disc pl-5 space-y-1.5";

const SECCIONES: LegalSection[] = [
  {
    id: "quienes",
    title: "Quiénes somos",
    body: (
      <p>
        El Ministerio Internacional Avivando el Fuego (sede en Austin, Texas, EE. UU.) es responsable de los datos que
        se tratan en esta web (ministerioavivandoelfuego.com), en su app instalable y en la app Avivando el Fuego Radio.
        Para cualquier asunto de privacidad, escríbenos desde Contacto.
      </p>
    ),
  },
  {
    id: "datos",
    title: "Qué datos tratamos",
    body: (
      <>
        <p>
          <b className="text-foreground">Si solo visitas o escuchas la radio</b> no necesitas cuenta. Como cualquier
          servidor, los nuestros registran datos técnicos (dirección IP, navegador, hora) por seguridad, y el servidor de
          la radio cuenta cuántas personas escuchan.
        </p>
        <p>
          <b className="text-foreground">Si creas una cuenta:</b> nombre visible, nombre de usuario, correo, país y tu
          contraseña (guardada cifrada: nadie puede leerla). Si quieres, también teléfono, foto, biografía, cargo,
          iglesia y redes sociales.
        </p>
        <p>
          <b className="text-foreground">Lo que haces dentro:</b> publicaciones y comentarios, peticiones de oración,
          mensajes privados, inscripciones, asistencia y progreso en clases, certificados, y tu estudio personal
          (resaltados, notas y lectura de la Biblia).
        </p>
        <p>
          <b className="text-foreground">Ofrendas y diezmos:</b> los pagos con tarjeta los procesa Stripe; nosotros no
          vemos ni guardamos los datos de tu tarjeta. Guardamos el monto y la fecha para la contabilidad.
        </p>
        <p>
          <b className="text-foreground">Formulario de contacto:</b> tu nombre, tu correo y tu mensaje.
        </p>
      </>
    ),
  },
  {
    id: "para-que",
    title: "Para qué los usamos",
    body: (
      <ul className={ul}>
        <li>Darte el servicio: tu cuenta, las clases, la comunidad, la oración y los avisos.</li>
        <li>Cuidar la seguridad de la web y de las personas que la usan.</li>
        <li>Escribirte: verificación del correo y avisos que puedes apagar en tu Perfil.</li>
        <li>Llevar la contabilidad del ministerio.</li>
      </ul>
    ),
  },
  {
    id: "no-hacemos",
    title: "Lo que nunca hacemos",
    body: (
      <p>
        No vendemos tus datos, no los usamos para publicidad y no hay anuncios ni rastreadores de publicidad en la web
        ni en las apps.
      </p>
    ),
  },
  {
    id: "quien-ve",
    title: "Quién ve qué",
    body: (
      <ul className={ul}>
        <li>
          Los demás miembros ven tu nombre visible, tu foto y lo que publicas en espacios comunes (Comunidad, el Club de
          lectura y el muro de oración).
        </li>
        <li>
          Tu correo y tu teléfono solo los ve la administración del ministerio; tus maestros ven tu correo para las
          clases. Si tu nombre de usuario es tu correo, los demás ven un alias en su lugar.
        </li>
        <li>Los mensajes privados solo los ven las personas de la conversación.</li>
      </ul>
    ),
  },
  {
    id: "proveedores",
    title: "Servicios que nos ayudan",
    body: (
      <>
        <p>Usamos proveedores que tratan datos solo para darnos su servicio:</p>
        <ul className={ul}>
          <li>Render: aloja la web y la base de datos.</li>
          <li>Resend: envía los correos (verificación y avisos).</li>
          <li>Stripe: procesa las ofrendas con tarjeta.</li>
          <li>Sentry: nos avisa de errores técnicos para corregirlos.</li>
          <li>El servicio de notificaciones de tu navegador, si las activas.</li>
          <li>
            YouTube, Facebook o TikTok, solo si ves una transmisión incrustada: esas plataformas reciben datos según sus
            propias políticas.
          </li>
          <li>El servidor propio de la radio (AzuraCast).</li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies y almacenamiento",
    body: (
      <p>
        Solo usamos la cookie necesaria para mantener tu sesión iniciada. En tu navegador guardamos preferencias como el
        tema claro u oscuro y el volumen de la radio. No usamos cookies de publicidad ni de seguimiento.
      </p>
    ),
  },
  {
    id: "tiempo",
    title: "Cuánto tiempo los guardamos",
    body: (
      <p>
        Mientras tengas tu cuenta. Los registros de ofrendas se conservan el tiempo que exige la contabilidad, y los
        registros técnicos por un tiempo limitado.
      </p>
    ),
  },
  {
    id: "derechos",
    title: "Tus derechos y cómo eliminar tu cuenta",
    body: (
      <>
        <p>
          Puedes ver y corregir tus datos y apagar los avisos por correo en tu{" "}
          <Link href="/perfil" className="text-primary font-semibold hover:underline">
            Perfil
          </Link>
          . También puedes pedirnos una copia o cualquier aclaración desde Contacto.
        </p>
        <p>
          <b className="text-foreground">Eliminar tu cuenta:</b> en Perfil, "Eliminar mi cuenta". Se borra lo que
          publicaste (Comunidad, Club y muro de oración), tus mensajes privados, amistades, avisos y tu estudio personal,
          y tu cuenta queda anónima ("Cuenta eliminada", sin correo, teléfono, foto ni forma de entrar). Lo que debe
          quedar por contabilidad o historial (ofrendas, certificados, asistencias) se conserva sin tus datos
          personales. Si no puedes entrar, escríbenos desde Contacto y lo hacemos por ti.
        </p>
      </>
    ),
  },
  {
    id: "menores",
    title: "Menores de edad",
    body: (
      <p>
        La web no está dirigida a menores de 13 años. Si eres menor de edad, úsala con el permiso de tus padres o
        tutores.
      </p>
    ),
  },
  {
    id: "app-radio",
    title: "App Avivando el Fuego Radio",
    body: (
      <p>
        La app de la radio no crea cuentas, no tiene anuncios ni rastreadores y no pide datos personales. Guarda en tu
        teléfono solo el volumen y la calidad que elijas. Para sonar se conecta al servidor de la radio (que registra la
        dirección IP para contar oyentes) y lee de esta web la dirección de ese servidor.
      </p>
    ),
  },
  {
    id: "cambios",
    title: "Cambios en esta política",
    body: <p>Si cambiamos esta política, publicaremos aquí la versión nueva con su fecha.</p>,
  },
];

export default function Privacidad() {
  return (
    <LegalPage
      kicker="Privacidad"
      title={
        <>
          Política de <span className="fire-text">privacidad</span>
        </>
      }
      updated="6 de noviembre de 2026"
      intro="Cuidamos tus datos como cuidamos a las personas: pedimos solo lo necesario, no los vendemos y puedes borrarlos cuando quieras."
      sections={SECCIONES}
    />
  );
}
