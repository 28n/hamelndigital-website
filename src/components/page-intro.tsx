import type { ReactNode } from "react";
import { Container } from "@/components/container";

export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <Container size="narrow" className="pt-20 pb-14 md:pt-32 md:pb-20">
      {eyebrow ? (
        <p className="font-mono text-xs tracking-eyebrow uppercase text-faint">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-4 text-4xl font-medium tracking-[-0.02em] text-balance break-words hyphens-auto text-ink md:text-5xl md:leading-[1.08]">
        {title}
      </h1>
      {children ? (
        <div className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          {children}
        </div>
      ) : null}
    </Container>
  );
}
