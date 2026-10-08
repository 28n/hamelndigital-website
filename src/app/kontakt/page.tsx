import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/container";
import { PageIntro } from "@/components/page-intro";
import { issueToken } from "@/lib/contact-token";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Sprechen Sie mit hamelndigital über Ihr Vorhaben — per E-Mail oder über das Kontaktformular.",
  alternates: { canonical: "/kontakt" },
};

// Issued per request so the form's time-trap works on a statically
// prerendered page.
async function ContactFormShell() {
  await connection();
  return <ContactForm token={issueToken()} />;
}

export default function KontaktPage() {
  return (
    <>
      <PageIntro eyebrow="Kontakt" title="Sprechen wir über Ihr Projekt.">
        <p>
          Beschreiben Sie kurz, was Sie vorhaben — zwei Sätze reichen für den
          Anfang. Wir melden uns mit einer ehrlichen Ersteinschätzung.
        </p>
      </PageIntro>

      <Container className="pb-24 md:pb-32">
        <div className="grid gap-12 border-t border-line pt-12 md:grid-cols-12 md:gap-10 md:pt-16">
          <div className="md:col-span-4">
            <h2 className="font-mono text-xs tracking-eyebrow uppercase text-faint">
              Direkter Kontakt
            </h2>
            <div className="mt-6 space-y-6">
              <div>
                <p className="text-sm text-muted">E-Mail</p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-1 inline-block font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
                >
                  {site.email}
                </a>
              </div>
              <div>
                <p className="text-sm text-muted">Standort</p>
                <p className="mt-1 font-medium text-ink">{site.location}</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 lg:col-span-7 lg:col-start-6">
            <Suspense
              fallback={<div aria-hidden className="min-h-[38rem]" />}
            >
              <ContactFormShell />
            </Suspense>
          </div>
        </div>
      </Container>
    </>
  );
}
