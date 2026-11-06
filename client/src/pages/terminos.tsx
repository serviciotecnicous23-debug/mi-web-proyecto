import { Link } from "wouter";
import { LegalPage, type LegalSection } from "@/components/LegalPage";

const ul = "list-disc pl-5 space-y-1.5";

const SECCIONES: LegalSection[] = [
  {
    id: "aceptacion",
    title: "Aceptación",
    body: (
      <p>
        Al usar esta web, su app instalable o la app Avivando el Fuego Radio, o al crear una cuenta, aceptas estos
        términos y nuestra{" "}
        <Link href="/privacidad" className="text-primary font-semibold hover:underline">
          Política de privacidad
        </Link>
        .
      </p>
    ),
  },
  {
    id: "cuenta",
    title: "Tu cuenta",
    body: (
      <ul className={ul}>
        <li>Usa datos reales y una sola cuenta por persona.</li>
        <li>Cuida tu contraseña; lo que se haga con tu cuenta es tu responsabilidad.</li>
        <li>Un líder del ministerio aprueba las cuentas nuevas antes de que participen en la comunidad.</li>
        <li>Puedes eliminar tu cuenta cuando quieras desde tu Perfil.</li>
      </ul>
    ),
  },
  {
    id: "normas",
    title: "Normas de la comunidad",
    body: (
      <>
        <p>
          Esta es una comunidad cristiana: trátense con respeto y con amor ("el amor es sufrido, es benigno",
          1 Corintios 13:4). No se permite:
        </p>
        <ul className={ul}>
          <li>Insultos, acoso, amenazas, odio o discriminación.</li>
          <li>Contenido sexual, violento o que ponga en riesgo a otras personas.</li>
          <li>Engaños, estafas, cadenas o publicidad (ventas, negocios, pedidos de dinero).</li>
          <li>Publicar datos personales de otras personas sin su permiso.</li>
          <li>Hacerse pasar por otra persona o por el ministerio.</li>
          <li>
            Subir material que no te pertenece sin permiso (música, videos, libros). Para compartir una prédica o un
            video, usa el enlace de su fuente oficial.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "moderacion",
    title: "Moderación y denuncias",
    body: (
      <>
        <p>
          Los líderes y la administración pueden ocultar o eliminar publicaciones, comentarios o mensajes que no cumplan
          estas normas, y suspender o cerrar cuentas.
        </p>
        <p>
          Si ves algo que no debería estar, toca «Denunciar» en la publicación, el comentario o la petición de oración,
          o escríbenos desde{" "}
          <Link href="/contacto" className="text-primary font-semibold hover:underline">
            Contacto
          </Link>
          . Solo la administración ve quién denunció, y lo revisamos lo antes posible.
        </p>
      </>
    ),
  },
  {
    id: "lo-que-publicas",
    title: "Lo que publicas",
    body: (
      <p>
        Lo que publicas sigue siendo tuyo. Nos das permiso para mostrarlo dentro de la plataforma mientras esté
        publicado. Puedes borrarlo cuando quieras.
      </p>
    ),
  },
  {
    id: "contenido",
    title: "Contenido del ministerio y de la radio",
    body: (
      <p>
        Las prédicas, clases, materiales y la programación son del ministerio o de sus autores. Puedes usarlos para tu
        edificación personal y compartir sus enlaces; para cualquier otro uso, pide permiso.
      </p>
    ),
  },
  {
    id: "ofrendas",
    title: "Ofrendas",
    body: (
      <p>
        Las ofrendas y diezmos son voluntarios y se procesan de forma segura con Stripe. Si tienes un problema con un
        pago, escríbenos desde Contacto.
      </p>
    ),
  },
  {
    id: "garantias",
    title: "Funcionamiento",
    body: (
      <p>
        Hacemos todo lo posible para que la web y la radio funcionen bien, pero pueden tener interrupciones o errores.
        Las podemos mejorar, cambiar o pausar cuando haga falta.
      </p>
    ),
  },
  {
    id: "cambios",
    title: "Cambios en estos términos",
    body: <p>Si cambiamos estos términos, publicaremos aquí la versión nueva con su fecha.</p>,
  },
];

export default function Terminos() {
  return (
    <LegalPage
      kicker="Términos"
      title={
        <>
          Términos y normas de la <span className="fire-text">comunidad</span>
        </>
      }
      updated="6 de noviembre de 2026"
      intro="Reglas sencillas para que la web y la radio sean un lugar seguro y de edificación para todos."
      sections={SECCIONES}
    />
  );
}
