import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Unternehmen",
  description:
    "hamelndigital GmbH — ein Unternehmen für Web- und Softwareentwicklung aus Hameln.",
  alternates: { canonical: "/unternehmen" },
};

const sections = [
  {
    label: "Wer wir sind",
    content: [
      "hamelndigital ist ein Unternehmen für Web- und Softwareentwicklung aus Hameln. Wir entwickeln digitale Produkte für Kunden, bei denen Technik keine Nebensache ist.",
      "Wir verstehen uns eher als Engineering-Unternehmen denn als klassische Agentur: Weniger Kampagnen, mehr Systeme. Weniger Versprechen, mehr Ergebnis.",
    ],
  },
  {
    label: "Wie wir arbeiten",
    content: [
      "Wir arbeiten an wenigen Projekten gleichzeitig und bleiben ihnen gegenüber langfristig verantwortlich. Wer bei uns anfragt, spricht mit den Menschen, die das Projekt auch umsetzen.",
      "Wir empfehlen nur, was wir selbst betreuen können — und sagen offen, wenn eine bestehende Lösung ausreicht oder ein anderes Team besser passt.",
    ],
  },
] as const;

const facts = [
  { term: "Rechtsform", value: "GmbH" },
  { term: "Sitz", value: "Hameln" },
] as const;

export default function UnternehmenPage() {
  return (
    <>
      <PageIntro eyebrow="Unternehmen" title="hamelndigital.">
        <p>
          Digitale Entwicklung aus Hameln — mit dem Anspruch, dass gute Software
          nicht auffällt, sondern funktioniert.
        </p>
      </PageIntro>

      <Container>
        <div className="border-t border-line">
          {sections.map((section) => (
            <section
              key={section.label}
              className="grid gap-4 border-b border-line py-12 md:grid-cols-12 md:gap-10 md:py-16"
            >
              <h2 className="font-mono text-xs tracking-eyebrow uppercase text-faint md:col-span-4">
                {section.label}
              </h2>
              <div className="max-w-xl space-y-5 text-lg leading-relaxed text-ink md:col-span-8">
                {section.content.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          <section className="grid gap-4 border-b border-line py-12 md:grid-cols-12 md:gap-10 md:py-16">
            <h2 className="font-mono text-xs tracking-eyebrow uppercase text-faint md:col-span-4">
              Fakten
            </h2>
            <dl className="max-w-xl md:col-span-8">
              {facts.map((fact) => (
                <div
                  key={fact.term}
                  className="flex items-baseline justify-between gap-6 border-b border-line py-4 first:pt-0 last:border-0"
                >
                  <dt className="text-muted">{fact.term}</dt>
                  <dd className="font-medium text-ink">{fact.value}</dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-6 py-4">
                <dt className="text-muted">Rechtliche Angaben</dt>
                <dd>
                  <Link
                    href="/impressum"
                    className="font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
                  >
                    Impressum
                  </Link>
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </Container>

      <section className="py-24 md:py-32">
        <Container size="narrow" className="text-center">
          <h2 className="text-2xl font-medium tracking-tight text-ink md:text-3xl">
            Interesse an einer Zusammenarbeit?
          </h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
            Schreiben Sie uns an{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
            >
              {site.email}
            </a>{" "}
            oder nutzen Sie unser Kontaktformular.
          </p>
          <div className="mt-8">
            <ButtonLink href="/kontakt">Kontakt aufnehmen</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
