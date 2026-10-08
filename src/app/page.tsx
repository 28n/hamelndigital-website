import { ArrowLink, ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { site } from "@/lib/site";

const services = [
  {
    index: "01",
    title: "Webentwicklung",
    description:
      "Websites und Webanwendungen — performant, barrierefrei und für den langfristigen Betrieb gebaut.",
  },
  {
    index: "02",
    title: "Softwareentwicklung",
    description:
      "Individuelle Anwendungen, interne Werkzeuge und Schnittstellen — passgenau für Ihre Prozesse.",
  },
  {
    index: "03",
    title: "Beratung & Konzeption",
    description:
      "Technische Bewertung und Konzeption digitaler Vorhaben — bevor die erste Zeile Code entsteht.",
  },
  {
    index: "04",
    title: "Betrieb & Weiterentwicklung",
    description:
      "Laufender Betrieb, Pflege und schrittweise Weiterentwicklung bestehender Systeme.",
  },
] as const;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  email: site.email,
  description: site.description,
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />

      {/* Hero */}
      <section className="pt-28 pb-24 md:pt-44 md:pb-36">
        <Container className="text-center">
          <h1 className="mx-auto max-w-4xl text-[2.6rem] leading-[1.06] font-medium tracking-[-0.03em] text-ink text-balance sm:text-6xl lg:text-[4.35rem]">
            Digitale Produkte.
            <br />
            Durchdacht entwickelt.
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted">
            hamelndigital entwickelt Websites, Webanwendungen und individuelle
            Software — von der Konzeption bis zum laufenden Betrieb.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <ButtonLink href="/kontakt">Projekt besprechen</ButtonLink>
            <ArrowLink href="/leistungen">Leistungen ansehen</ArrowLink>
          </div>
        </Container>
      </section>

      {/* Leistungen */}
      <section className="pb-24 md:pb-32">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-2xl font-medium tracking-tight text-ink md:text-3xl">
              Leistungen
            </h2>
            <ArrowLink href="/leistungen" className="shrink-0">
              Im Detail
            </ArrowLink>
          </div>

          <ul className="mt-10 border-t border-line">
            {services.map((service) => (
              <li
                key={service.index}
                className="grid gap-2 border-b border-line py-7 md:grid-cols-12 md:items-baseline md:gap-8 md:py-9"
              >
                <span className="font-mono text-xs text-faint md:col-span-1">
                  {service.index}
                </span>
                <h3 className="text-lg font-medium tracking-tight text-ink md:col-span-4 md:text-xl">
                  {service.title}
                </h3>
                <p className="max-w-xl leading-relaxed text-muted md:col-span-7">
                  {service.description}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Arbeitsweise */}
      <section className="border-t border-line py-24 md:py-32">
        <Container size="narrow">
          <p className="font-mono text-xs tracking-eyebrow uppercase text-faint">
            Arbeitsweise
          </p>
          <p className="mt-6 text-2xl leading-snug font-medium tracking-tight text-ink md:text-[2rem] md:leading-[1.35]">
            Sie sprechen direkt mit den Menschen, die Ihr Projekt entwickeln.
            Wenige Abstimmungen, klare Entscheidungen —{" "}
            <span className="text-muted">und Software, die auch nach Jahren
            noch verständlich ist.</span>
          </p>
        </Container>
      </section>

      {/* Kontakt */}
      <section className="border-t border-line py-24 md:py-32">
        <Container size="narrow" className="text-center">
          <h2 className="text-3xl font-medium tracking-tight text-ink md:text-4xl">
            Sprechen wir über Ihr Projekt.
          </h2>
          <p className="mx-auto mt-5 max-w-md leading-relaxed text-muted">
            Beschreiben Sie uns kurz, was Sie vorhaben. Wir melden uns mit einer
            ehrlichen Ersteinschätzung.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
            <ButtonLink href="/kontakt">Projekt besprechen</ButtonLink>
            <a
              href={`mailto:${site.email}`}
              className="text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              {site.email}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
