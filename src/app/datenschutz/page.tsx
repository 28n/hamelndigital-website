import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { LegalSection, Placeholder } from "@/components/legal";
import { PageIntro } from "@/components/page-intro";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: `Datenschutzerklärung der ${site.legalName} — Informationen zur Verarbeitung personenbezogener Daten auf dieser Website.`,
  alternates: { canonical: "/datenschutz" },
};

export default function DatenschutzPage() {
  return (
    <>
      <PageIntro title="Datenschutzerklärung">
        <p>
          Diese Website ist bewusst datensparsam gebaut: ohne Tracking, ohne
          Analyse-Werkzeuge, ohne Cookies und ohne Schriftarten oder Inhalte von
          Drittanbietern. Nachfolgend erklären wir, welche Daten dennoch
          anfallen und warum.
        </p>
      </PageIntro>

      <Container size="narrow" className="pb-24 md:pb-32">
        <p className="mb-10 rounded-lg border border-line bg-surface px-5 py-4 text-sm leading-relaxed text-muted">
          Hinweis: Diese Erklärung beschreibt die tatsächliche technische
          Umsetzung dieser Website. Die in{" "}
          <span className="rounded bg-background px-1 font-medium text-accent ring-1 ring-line">
            [eckigen Klammern]
          </span>{" "}
          markierten Angaben sind Platzhalter, die vor Veröffentlichung
          geprüft und ergänzt werden müssen. Diese Erklärung ersetzt keine
          Rechtsberatung.
        </p>

        <div className="border-t border-line">
          <LegalSection title="1. Verantwortlicher">
            <p className="font-medium text-ink">{site.legalName}</p>
            <p>
              <Placeholder>Straße und Hausnummer</Placeholder>
              <br />
              <Placeholder>PLZ und Ort</Placeholder>
              <br />
              Deutschland
            </p>
            <p>
              Vertreten durch:{" "}
              <Placeholder>Name(n) der Geschäftsführer</Placeholder>
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

          <LegalSection title="2. Hosting und Server-Logdaten">
            <p>
              Diese Website wird betrieben auf{" "}
              <Placeholder>
                Hosting-Anbieter und Serverstandort eintragen, z. B.
                „eigener Server / Anbieter, Standort Deutschland“
              </Placeholder>
              . Beim Aufruf der Website verarbeitet der Server automatisch
              technisch notwendige Verbindungsdaten (IP-Adresse, Datum und
              Uhrzeit, aufgerufene Seite, User-Agent), um die Auslieferung zu
              ermöglichen und die Systemsicherheit zu gewährleisten.
            </p>
            <p>
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
              Interesse am sicheren und stabilen Betrieb der Website).
              Logdaten werden nicht ausgewertet und nach{" "}
              <Placeholder>Speicherdauer, z. B. „14 Tage“</Placeholder>{" "}
              gelöscht.
            </p>
          </LegalSection>

          <LegalSection title="3. Kontaktaufnahme">
            <p>
              Bei Kontaktaufnahme per E-Mail oder über das Kontaktformular
              verarbeiten wir die angegebenen Daten (Name, E-Mail-Adresse,
              Firma, Inhalt der Nachricht), um Ihre Anfrage zu beantworten.
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
              (vorvertragliche Maßnahmen) beziehungsweise Art. 6 Abs. 1 lit. f
              DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).
            </p>
            <p>
              Formulareingaben werden per E-Mail an unser Postfach übermittelt
              und nicht in einer Datenbank auf dieser Website gespeichert. Die
              Daten werden gelöscht, sobald sie für die Bearbeitung nicht mehr
              erforderlich sind, sofern keine gesetzlichen
              Aufbewahrungspflichten bestehen.
            </p>
            <p>
              Zum Schutz vor Missbrauch prüft das Formular technische
              Merkmale der Anfrage (Zeitpunkt des Aufrufs, begrenzte Anzahl von
              Einsendungen je Anschluss). Es findet kein Tracking durch
              Dritte statt.
            </p>
          </LegalSection>

          <LegalSection title="4. Cookies, Tracking und Analyse">
            <p>
              Diese Website verwendet keine Cookies, kein Local Storage für
              Tracking-Zwecke und keine Analyse- oder Marketing-Werkzeuge.
              Es werden keine Nutzungsprofile erstellt.
            </p>
          </LegalSection>

          <LegalSection title="5. Schriftarten und externe Inhalte">
            <p>
              Alle Schriftarten und sonstigen Inhalte werden von unserem
              eigenen Server ausgeliefert. Beim Aufruf der Website werden
              keine Verbindungen zu Servern von Drittanbietern (etwa zu
              Schriftarten- oder Skript-CDNs) aufgebaut.
            </p>
          </LegalSection>

          <LegalSection title="6. Ihre Rechte">
            <p>
              Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie
              betreffenden personenbezogenen Daten:
            </p>
            <ul className="list-none space-y-2">
              {[
                "Auskunft (Art. 15 DSGVO)",
                "Berichtigung (Art. 16 DSGVO)",
                "Löschung (Art. 17 DSGVO)",
                "Einschränkung der Verarbeitung (Art. 18 DSGVO)",
                "Datenübertragbarkeit (Art. 20 DSGVO)",
                "Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)",
              ].map((right) => (
                <li key={right} className="flex items-baseline gap-3">
                  <span
                    aria-hidden
                    className="mt-[0.55em] block size-1 shrink-0 rounded-full bg-faint"
                  />
                  {right}
                </li>
              ))}
            </ul>
            <p>
              Soweit die Verarbeitung auf einer Einwilligung beruht, können Sie
              diese jederzeit mit Wirkung für die Zukunft widerrufen.
            </p>
          </LegalSection>

          <LegalSection title="7. Beschwerderecht">
            <p>
              Sie haben das Recht, sich bei einer
              Datenschutz-Aufsichtsbehörde zu beschweren. Zuständig ist
              insbesondere die Aufsichtsbehörde des Bundeslandes, in dem wir
              unseren Sitz haben:{" "}
              <Placeholder>
                z. B. „Die Landesbeauftragte für den Datenschutz
                Niedersachsen“ — Zuständigkeit prüfen
              </Placeholder>
              .
            </p>
          </LegalSection>

          <LegalSection title="8. Stand dieser Erklärung">
            <p>
              <Placeholder>Datum der letzten Aktualisierung</Placeholder>. Wir
              passen diese Erklärung an, wenn sich die technische Umsetzung
              der Website ändert.
            </p>
          </LegalSection>
        </div>

        <p className="mt-10 text-sm text-muted">
          Fragen zum Datenschutz?{" "}
          <Link
            href="/kontakt"
            className="font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
          >
            Kontakt aufnehmen
          </Link>
        </p>
      </Container>
    </>
  );
}
