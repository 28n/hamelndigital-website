"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems, site } from "@/lib/site";

export function NavLink({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`transition-colors duration-200 ${
        active ? "text-ink" : "text-muted hover:text-ink"
      } ${className}`}
    >
      {label}
    </Link>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  // Close the menu after a client-side navigation completes.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Menü schließen" : "Menü öffnen"}
        onClick={() => setOpen((value) => !value)}
        className="-mr-2 inline-flex size-10 items-center justify-center text-ink"
      >
        {open ? (
          <X className="size-5" aria-hidden />
        ) : (
          <Menu className="size-5" aria-hidden />
        )}
      </button>

      {open && (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="fixed inset-0 top-16 z-40 flex flex-col bg-background"
        >
          <nav
            aria-label="Hauptnavigation"
            className="flex flex-col px-6 pt-8"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`border-b border-line py-5 text-2xl font-medium tracking-tight transition-colors ${
                  pathname === item.href ? "text-ink" : "text-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto px-6 pb-10">
            <p className="text-sm text-muted">{site.legalName}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-1 inline-block text-sm font-medium text-ink"
            >
              {site.email}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
