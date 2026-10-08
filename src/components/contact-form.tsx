"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import {
  submitContact,
  type ContactState,
} from "@/app/kontakt/actions";

type Fields = {
  name: string;
  email: string;
  company: string;
  message: string;
};

const emptyFields: Fields = { name: "", email: "", company: "", message: "" };

type Token = { ts: string; sig: string };

const inputClasses =
  "w-full rounded-lg border border-line bg-background px-4 py-3 text-ink placeholder:text-faint transition-colors focus:border-ink focus:outline-none";

const labelClasses = "mb-2 block text-sm font-medium text-ink";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-accent">
      {message}
    </p>
  );
}

export function ContactForm({ token }: { token: Token }) {
  const [formKey, setFormKey] = useState(0);

  return (
    <ContactFormInner
      key={formKey}
      token={token}
      onReset={() => setFormKey((key) => key + 1)}
    />
  );
}

function ContactFormInner({
  token,
  onReset,
}: {
  token: Token;
  onReset: () => void;
}) {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    submitContact,
    { status: "idle" },
  );
  // Controlled fields so a server-side validation error never clears what
  // the visitor already typed (uncontrolled inputs are reset by React after
  // a form action runs).
  const [fields, setFields] = useState<Fields>(emptyFields);
  const update =
    (key: keyof Fields) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setFields((current) => ({ ...current, [key]: event.target.value }));
    };

  if (state.status === "success") {
    return (
      <div className="rounded-lg border border-line bg-surface p-8">
        <p className="text-lg font-medium tracking-tight text-ink">
          Nachricht gesendet.
        </p>
        <p className="mt-2 leading-relaxed text-muted">
          Vielen Dank für Ihre Anfrage. Wir melden uns zeitnah bei Ihnen.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-6 text-sm font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
        >
          Weitere Nachricht schreiben
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="ts" value={token.ts} />
      <input type="hidden" name="sig" value={token.sig} />

      {/* Honeypot — invisible to humans, attractive to bots. */}
      <div
        aria-hidden="true"
        className="absolute top-0 -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={fields.name}
            onChange={update("name")}
            aria-invalid={Boolean(state.errors?.name)}
            aria-describedby={state.errors?.name ? "name-error" : undefined}
            className={inputClasses}
          />
          <FieldError id="name-error" message={state.errors?.name} />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            E-Mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={fields.email}
            onChange={update("email")}
            aria-invalid={Boolean(state.errors?.email)}
            aria-describedby={state.errors?.email ? "email-error" : undefined}
            className={inputClasses}
          />
          <FieldError id="email-error" message={state.errors?.email} />
        </div>
      </div>

      <div>
        <label htmlFor="company" className={labelClasses}>
          Firma <span className="font-normal text-faint">(optional)</span>
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          value={fields.company}
          onChange={update("company")}
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          Nachricht
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          value={fields.message}
          onChange={update("message")}
          aria-invalid={Boolean(state.errors?.message)}
          aria-describedby={state.errors?.message ? "message-error" : undefined}
          className={`${inputClasses} resize-y`}
        />
        <FieldError id="message-error" message={state.errors?.message} />
      </div>

      {state.status === "error" && state.message ? (
        <p role="alert" className="text-sm font-medium text-accent">
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-ink/85 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Wird gesendet …" : "Nachricht senden"}
        </button>
        <p className="text-xs leading-relaxed text-faint sm:max-w-xs">
          Mit dem Absenden willigen Sie ein, dass wir Ihre Angaben zur
          Beantwortung der Anfrage verarbeiten. Details in der{" "}
          <Link
            href="/datenschutz"
            className="underline underline-offset-2 hover:text-ink"
          >
            Datenschutzerklärung
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
