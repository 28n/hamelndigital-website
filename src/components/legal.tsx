import type { ReactNode } from "react";

/**
 * Marks a legally required detail that is not yet known and must be filled in
 * before launch. Rendered visibly so it cannot be missed in review.
 */
export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md bg-surface px-1.5 py-0.5 font-medium text-accent ring-1 ring-line">
      [{children}]
    </span>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-line py-10 last:border-0 md:py-12">
      <h2 className="text-xl font-medium tracking-tight text-ink">{title}</h2>
      <div className="mt-5 max-w-2xl space-y-4 leading-relaxed text-muted">
        {children}
      </div>
    </section>
  );
}
