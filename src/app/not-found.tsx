import type { Metadata } from "next";
import { ButtonLink } from "@/components/button";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
};

export default function NotFound() {
  return (
    <Container size="narrow" className="py-28 text-center md:py-40">
      <p className="font-mono text-xs tracking-eyebrow uppercase text-faint">
        404
      </p>
      <h1 className="mt-4 text-3xl font-medium tracking-tight text-ink md:text-4xl">
        Diese Seite existiert nicht.
      </h1>
      <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
        Die aufgerufene Adresse ist nicht vorhanden — möglicherweise wurde sie
        verschoben oder entfernt.
      </p>
      <div className="mt-8">
        <ButtonLink href="/">Zur Startseite</ButtonLink>
      </div>
    </Container>
  );
}
