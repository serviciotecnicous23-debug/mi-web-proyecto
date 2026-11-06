import { useEffect } from "react";
import { Layout } from "@/components/layout";

// La radio que se ve en esta página es la ORIGINAL (la página pública de AzuraCast con
// el tema de fuego). La pinta <RadioDock /> desde App.tsx, por encima de las páginas,
// para que siga sonando al navegar. Esta página solo reserva el espacio y da el texto
// para Google y para los lectores de pantalla.
export default function RadioPage() {
  useEffect(() => {
    const previous = document.title;
    document.title = "Radio Avivando el Fuego — Escucha en vivo 24/7";
    // La radio se desplaza por dentro: la página no, para que no salgan dos barras.
    document.documentElement.classList.add("radio-immersive");
    return () => {
      document.title = previous;
      document.documentElement.classList.remove("radio-immersive");
    };
  }, []);

  return (
    <Layout>
      <section className="radio-page-space" aria-labelledby="radio-title" data-testid="page-radio">
        <h1 id="radio-title" className="sr-only">
          Radio Avivando el Fuego en vivo
        </h1>
        <p className="sr-only">
          Escucha en vivo la radio cristiana del Ministerio Avivando el Fuego: adoración, alabanza y
          prédicas las 24 horas, gratis y sin crear cuenta.
        </p>
      </section>
    </Layout>
  );
}
