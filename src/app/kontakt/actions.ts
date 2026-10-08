"use server";

import { headers } from "next/headers";
import { verifyToken } from "@/lib/contact-token";
import { isMailConfigured, sendContactMail } from "@/lib/mail";
import { site } from "@/lib/site";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Simple per-process rate limit: at most 5 submissions per IP per hour.
const submissions = new Map<string, number[]>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1_000;

async function isRateLimited(): Promise<boolean> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const recent = (submissions.get(ip) ?? []).filter(
    (time) => now - time < RATE_WINDOW_MS,
  );
  if (recent.length >= RATE_LIMIT) return true;
  recent.push(now);
  submissions.set(ip, recent);
  return false;
}

function field(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: real users never fill this field. Silently accept to avoid
  // tipping off bots.
  if (field(formData, "website")) {
    return { status: "success" };
  }

  // Signed timestamp — rejects instant submissions and replayed tokens.
  if (
    !verifyToken(field(formData, "ts") || null, field(formData, "sig") || null)
  ) {
    return {
      status: "error",
      message:
        "Die Anfrage konnte nicht geprüft werden. Bitte laden Sie die Seite neu und versuchen Sie es erneut.",
    };
  }

  if (await isRateLimited()) {
    return {
      status: "error",
      message:
        "Es wurden zu viele Anfragen gesendet. Bitte versuchen Sie es später erneut.",
    };
  }

  const name = field(formData, "name");
  const email = field(formData, "email");
  const company = field(formData, "company");
  const message = field(formData, "message");

  const errors: ContactState["errors"] = {};
  if (name.length < 2 || name.length > 100) {
    errors.name = "Bitte geben Sie Ihren Namen an.";
  }
  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
  }
  if (message.length < 10 || message.length > 5000) {
    errors.message = "Bitte beschreiben Sie Ihr Anliegen (mind. 10 Zeichen).";
  }
  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  if (!isMailConfigured()) {
    console.error("Contact form submitted but SMTP is not configured.");
    return {
      status: "error",
      message: `Das Formular ist derzeit nicht verfügbar. Bitte schreiben Sie uns direkt an ${site.email}.`,
    };
  }

  try {
    await sendContactMail({ name, email, company: company || undefined, message });
    return { status: "success" };
  } catch (error) {
    console.error("Failed to send contact mail:", error);
    return {
      status: "error",
      message: `Ihre Nachricht konnte nicht gesendet werden. Bitte schreiben Sie uns direkt an ${site.email}.`,
    };
  }
}
