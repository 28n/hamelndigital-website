import type { Metadata } from "next";
import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Leistungen",
  description:
    "Webentwicklung, individuelle Softwareentwicklung, technische Beratung sowie Betrieb und Weiterentwicklung digitaler Systeme.",
  alternates: { canonical: "/leistungen" },
};

const services = [
  {
    id: "webentwicklung",
    title: "Webentwicklung",
    lead: "Websites und Webanwendungen, die schnell laden, barrierefrei nutzbar sind und sich langfristig pflegen lassen.",
    items: [
      "Unternehmenswebsites, Portale und Webanwendungen",
      "Frontend-Entwicklung mit modernen Frameworks",
      "Performance, Barrierefreiheit und technische SEO",
      "Anbindung bestehender Systeme und Datenquellen",
    ],
  },
  {
    id: "softwareentwicklung",
    title: "Softwareentwicklung",
    lead: "Individuelle Software für Prozesse, für die es keine fertige Lösung gibt.",
    items: [
      "Interne Werkzeuge und Fachanwendungen",
      "Schnittstellen und Integrationen (APIs)",
      "Automatisierung wiederkehrender Abläufe",
      "Saubere, dokumentierte und wartbare Codebasis",
    ],
  },
  {
    id: "beratung",
    title: "Beratung & Konzeption",
    lead: "Bevor entwickelt wird, klären wir, was gebaut werden soll — und ob es gebaut werden sollte.",
    items: [
      "Technische Bewertung bestehender Systeme",
      "Konzeption, Architektur und Technologieauswahl",
      "Realistische Aufwands- und Risikoeinschätzungen",
      "Unabhängige zweite Meinung zu laufenden Vorhaben",
    ],
  },
  {
    id: "betrieb",
    title: "Betrieb & Weiterentwicklung",
    lead: "Software ist nie fertig. Wir betreuen Systeme auch nach dem Launch.",
    items: [
      "Hosting, Monitoring und regelmäßige Wartung",
      "Weiterentwicklung in kleinen, planbaren Schritten",
      "Übernahme und Pflege bestehender Anwendungen",
      "Sicherheitsupdates und technischer Support",
    ],
  },
] as const;

export default function LeistungenPage() {
  return (
    <>
      <PageIntro eyebrow="Leistungen" title="Was wir entwickeln.">
        <p>
          Wir konzentrieren uns auf das, was wir gut können: digitale Produkte
          planen, bauen und betreuen. Vier Bereiche, ein Anspruch — Software,
          die zuverlässig funktioniert.
        </p>
      </PageIntro>

      <Container>
        <ul className="border-t border-line">
          {services.map((service, index) => (
            <li
              key={service.id}
              className="grid gap-6 border-b border-line py-12 md:grid-cols-12 md:gap-10 md:py-16"
            >
              <div className="md:col-span-4">
                <span className="font-mono text-xs text-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-2 text-2xl font-medium tracking-tight text-ink">
                  {service.title}
                </h2>
              </div>
              <div className="md:col-span-8">
                <p className="max-w-xl text-lg leading-relaxed text-ink">
                  {service.lead}
                </p>
                <ul className="mt-6 max-w-xl space-y-3">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 text-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.55em] block size-1 shrink-0 rounded-full bg-faint"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </Container>

      <section className="py-24 md:py-32">
        <Container size="narrow" className="text-center">
          <h2 className="text-2xl font-medium tracking-tight text-ink md:text-3xl">
            Nicht sicher, was Sie brauchen?
          </h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
            Beschreiben Sie uns Ihr Vorhaben in zwei Sätzen. Wir sagen Ihnen
            offen, ob wir die richtigen Ansprechpartner dafür sind.
          </p>
          <div className="mt-8">
            <ButtonLink href="/kontakt">Kontakt aufnehmen</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
