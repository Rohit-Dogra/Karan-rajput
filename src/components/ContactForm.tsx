"use client";

import { useState, type FormEvent } from "react";
import { enquiryTypes, validateEnquiry, type FieldErrors } from "@/lib/contact";
import { ArrowIcon, InstagramIcon } from "./icons";

type Status = "idle" | "sending" | "sent" | "error" | "unavailable";

export function ContactForm({ configured, instagramUrl }: { configured: boolean; instagramUrl: string }) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const { data, errors } = validateEnquiry(values);
    setErrors(errors);
    if (!data) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(errors)[0]}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, company: values.company }),
      });
      if (res.status === 503) return setStatus("unavailable");
      const json = await res.json().catch(() => ({}));
      if (res.status === 422 && json.errors) {
        setErrors(json.errors);
        return setStatus("idle");
      }
      if (!res.ok) throw new Error(json.error ?? res.statusText);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="fade-in border border-line p-10" role="status">
        <p className="display text-6xl">Received.</p>
        <p className="mt-4 text-lg text-muted">Thanks — your enquiry is with the team. Expect a reply at the email you gave.</p>
        <button type="button" onClick={() => setStatus("idle")} className="eyebrow mt-8 underline decoration-ember underline-offset-4">
          Send another
        </button>
      </div>
    );
  }

  const field = "mt-2 w-full border-b border-line bg-transparent py-3 text-lg text-paper placeholder:text-muted/60 focus:border-paper focus:outline-none aria-[invalid=true]:border-ember";
  const label = "eyebrow text-muted";
  const err = (k: keyof FieldErrors) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-2 text-sm text-ember">
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof FieldErrors) => ({ "aria-invalid": Boolean(errors[k]), "aria-describedby": errors[k] ? `${k}-error` : undefined });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-8 sm:grid-cols-2">
      {!configured || status === "unavailable" ? (
        <div className="border border-sand/40 bg-sand/5 p-5 text-sm leading-relaxed text-sand sm:col-span-2" role="note">
          Online booking isn&apos;t switched on yet — the team hasn&apos;t confirmed an inbox for enquiries. Until then, message Karan directly on{" "}
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-paper underline underline-offset-4">
            <InstagramIcon size={14} /> Instagram
          </a>
          .
        </div>
      ) : null}

      <div>
        <label htmlFor="name" className={label}>Name *</label>
        <input id="name" name="name" autoComplete="name" required className={field} placeholder="Your name" {...a11y("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="email" className={label}>Email *</label>
        <input id="email" name="email" type="email" autoComplete="email" required className={field} placeholder="you@example.com" {...a11y("email")} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="type" className={label}>Enquiry *</label>
        <select id="type" name="type" required defaultValue="" className={`${field} cursor-pointer [&>option]:bg-ink`} {...a11y("type")}>
          <option value="" disabled>
            Select…
          </option>
          {enquiryTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        {err("type")}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="date" className={label}>Date</label>
          <input id="date" name="date" type="date" className={`${field} [color-scheme:dark]`} {...a11y("date")} />
          {err("date")}
        </div>
        <div>
          <label htmlFor="location" className={label}>City</label>
          <input id="location" name="location" autoComplete="address-level2" className={field} placeholder="Where" />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className={label}>Details *</label>
        <textarea id="message" name="message" rows={5} required className={`${field} resize-y`} placeholder="Event, audience size, budget range, anything useful…" {...a11y("message")} />
        {err("message")}
      </div>

      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending" || !configured}
          className="eyebrow inline-flex items-center gap-3 rounded-full bg-ember px-8 py-4 text-ink transition-colors hover:bg-paper disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status === "sending" ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" aria-hidden /> Sending…
            </>
          ) : (
            <>
              Send enquiry <ArrowIcon size={14} />
            </>
          )}
        </button>
        <p className="text-sm text-muted" aria-live="polite">
          {status === "error" ? <span className="text-ember">Something went wrong sending that. Please try again in a moment.</span> : "* required"}
        </p>
      </div>
    </form>
  );
}
