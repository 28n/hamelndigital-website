import nodemailer from "nodemailer";
import { site } from "@/lib/site";

type ContactMessage = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

export function isMailConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST);
}

export async function sendContactMail({
  name,
  email,
  company,
  message,
}: ContactMessage): Promise<void> {
  const host = process.env.SMTP_HOST;
  if (!host) {
    throw new Error("SMTP_HOST is not configured");
  }

  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: user && pass ? { user, pass } : undefined,
  });

  // Strip CR/LF so user input can never inject mail headers.
  const safeName = name.replace(/[\r\n]+/g, " ").trim();
  const safeCompany = company?.replace(/[\r\n]+/g, " ").trim();

  const lines = [
    `Name: ${safeName}`,
    `E-Mail: ${email}`,
    safeCompany ? `Firma: ${safeCompany}` : null,
    "",
    message,
  ];

  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? `Website <${site.email}>`,
    to: process.env.CONTACT_TO ?? site.email,
    replyTo: `${safeName} <${email}>`,
    subject: `Kontaktanfrage über hamelndigital.de — ${safeName}`,
    text: lines.filter((line) => line !== null).join("\n"),
  });
}
