import Link from "next/link";
import { Container } from "@/components/container";
import { MobileNav, NavLink } from "@/components/nav";
import { navItems, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            aria-label={`${site.name} – Startseite`}
            className="text-[1.05rem] font-semibold tracking-tight text-ink"
          >
            {site.name}
          </Link>

          <nav
            aria-label="Hauptnavigation"
            className="hidden items-center gap-8 text-sm font-medium md:flex"
          >
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>

          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
