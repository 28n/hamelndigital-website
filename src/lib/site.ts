/**
 * Central site configuration.
 *
 * Values marked with TODO are placeholders that must be replaced with
 * verified business information before production launch. See README.
 */
export const site = {
  name: "hamelndigital",
  legalName: "hamelndigital GmbH",
  description:
    "hamelndigital entwickelt Websites, Webanwendungen und individuelle Software — von der Konzeption bis zum laufenden Betrieb.",
  url: process.env.SITE_URL ?? "https://hamelndigital.de",
  // TODO: verify the real contact address before launch
  email: process.env.CONTACT_EMAIL ?? "info@hamelndigital.de",
  location: "Hameln, Deutschland",
} as const;

export const navItems = [
  { href: "/leistungen", label: "Leistungen" },
  { href: "/unternehmen", label: "Unternehmen" },
  { href: "/kontakt", label: "Kontakt" },
] as const;
