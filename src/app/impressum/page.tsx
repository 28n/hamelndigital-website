import type { Metadata } from "next";
import { Container } from "@/components/container";
import { LegalSection, Placeholder } from "@/components/legal";
import { PageIntro } from "@/components/page-intro";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum der ${site.legalName} gemäß § 5 DDG.`,
  alternates: { canonical: "/impressum" },
};

export default function ImpressumPage() {
  return (
    <>
      <PageIntro title="Impressum" />

      <Container size="narrow" className="pb-24 md:pb-32">
        <p className="mb-10 rounded-lg border border-line bg-surface px-5 py-4 text-sm leading-relaxed text-muted">
          Hinweis: Die in{" "}
          <span className="rounded bg-background px-1 font-medium text-accent ring-1 ring-line">
            [eckigen Klammern]
          </span>{" "}
          markierten Angaben sind Platzhalter und müssen vor Veröffentlichung
          durch die tatsächlichen Unternehmensdaten ersetzt werden.
        </p>

        <div className="border-t border-line">
          <LegalSection title="Angaben gemäß § 5 DDG">
            <p className="font-medium text-ink">{site.legalName}</p>
            <p>
              <Placeholder>Straße und Hausnummer</Placeholder>
              <br />
              <Placeholder>PLZ und Ort</Placeholder>
              <br />
              Deutschland
            </p>
            <p>
              Vertreten durch die Geschäftsführung:{" "}
              <Placeholder>Name(n) der Geschäftsführer</Placeholder>
            </p>
          </LegalSection>

          <LegalSection title="Kontakt">
            <p>
              Telefon: <Placeholder>Telefonnummer</Placeholder>
              <br />
              E-Mail:{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
              >
                {site.email}
              </a>
            </p>
          </LegalSection>

          <LegalSection title="Registereintrag">
            <p>
              Eintragung im Handelsregister.
              <br />
              Registergericht: <Placeholder>Amtsgericht</Placeholder>
              <br />
              Registernummer: <Placeholder>HRB-Nummer</Placeholder>
            </p>
          </LegalSection>

          <LegalSection title="Umsatzsteuer-ID">
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27a
              Umsatzsteuergesetz: <Placeholder>USt-IdNr.</Placeholder>
            </p>
          </LegalSection>

          <LegalSection title="Verantwortlich für den Inhalt">
            <p>
              Verantwortlich im Sinne von § 18 Abs. 2 MStV:{" "}
              <Placeholder>Name und Anschrift der verantwortlichen Person</Placeholder>
            </p>
          </LegalSection>

          <LegalSection title="Verbraucherstreitbeilegung">
            <p>
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
              >
                ec.europa.eu/consumers/odr
              </a>
              . Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </LegalSection>
        </div>
      </Container>
    </>
  );
}
