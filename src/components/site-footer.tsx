import Link from "next/link";
import { cacheLife } from "next/cache";
import { Container } from "@/components/container";
import { navItems, site } from "@/lib/site";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

const legalItems = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-[1fr_auto] md:gap-24">
          <div>
            <p className="text-[1.05rem] font-semibold tracking-tight text-ink">
              {site.name}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              Digitale Produkte, durchdacht entwickelt.
              <br />
              {site.location}
            </p>
          </div>

          <div className="grid gap-10 min-[420px]:grid-cols-2 min-[420px]:gap-12 sm:gap-20">
            <nav aria-label="Footer-Navigation">
              <p className="text-xs font-medium tracking-eyebrow uppercase text-faint">
                Navigation
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted transition-colors hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-xs font-medium tracking-eyebrow uppercase text-faint">
                Kontakt
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-muted transition-colors hover:text-ink"
                  >
                    {site.email}
                  </a>
                </li>
                {legalItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted transition-colors hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line py-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> {site.legalName}
          </p>
          <p>{site.location}</p>
        </div>
      </Container>
    </footer>
  );
}
