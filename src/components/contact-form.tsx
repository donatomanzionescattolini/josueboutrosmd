"use client";

import { useId, useState } from "react";
import { dictionary, t } from "@/content/dictionary";
import { contact } from "@/content/profile";
import type { Locale } from "@/lib/i18n";
import { isValidEmail } from "@/lib/utils";
import { ArrowRightIcon } from "./icons";

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm({ locale }: { locale: Locale }) {
  const d = dictionary.contact;
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    // Bots fill every field; humans never see this one.
    const honeypot = String(data.get("company") ?? "");

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = t(d.validation.name, locale);
    if (!isValidEmail(email)) nextErrors.email = t(d.validation.email, locale);
    if (!message) nextErrors.message = t(d.validation.message, locale);

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message, company: honeypot, locale }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="card rounded-card p-8 text-center"
      >
        <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-accent-soft text-accent">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="m4 12.5 5 5L20 6.5" />
          </svg>
        </div>
        <p className="type-body mt-5">{t(d.success, locale)}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${uid}-name`}
          name="name"
          label={t(d.nameLabel, locale)}
          autoComplete="name"
          error={errors.name}
        />
        <Field
          id={`${uid}-email`}
          name="email"
          type="email"
          label={t(d.emailLabel, locale)}
          autoComplete="email"
          error={errors.email}
        />
      </div>

      <Field
        id={`${uid}-subject`}
        name="subject"
        label={t(d.subjectLabel, locale)}
        required={false}
      />

      <Field
        id={`${uid}-message`}
        name="message"
        label={t(d.messageLabel, locale)}
        multiline
        error={errors.message}
      />

      {/* Honeypot — visually and programmatically hidden from real users. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-company`}>Company</label>
        <input id={`${uid}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-clay">
          {t(d.error, locale)}{" "}
          <a href={`mailto:${contact.email}`} className="link-draw font-medium">
            {contact.email}
          </a>
        </p>
      )}

      <div className="mt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? t(d.sending, locale) : t(d.submit, locale)}
          {status !== "sending" && (
            <ArrowRightIcon
              width={16}
              height={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  multiline = false,
  required = true,
  autoComplete,
  error,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  multiline?: boolean;
  required?: boolean;
  autoComplete?: string;
  error?: string;
}) {
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    required,
    autoComplete,
    className: "field",
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": error ? errorId : undefined,
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-ink-soft"
      >
        {label}
      </label>
      {multiline ? (
        <textarea {...shared} rows={6} className="field resize-y" />
      ) : (
        <input {...shared} type={type} />
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-2 text-sm text-clay">
          {error}
        </p>
      )}
    </div>
  );
}
