"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Linkedin,
  Download,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { profile as defaultProfile } from "@/lib/profile";
import type { ProfileData } from "@/lib/types";
import SectionHeading from "./SectionHeading";

type Status = "idle" | "loading" | "success" | "error";

// EmailJS (optional): if these are set, submissions also send you an email.
const EMAILJS_SERVICE = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export default function Contact({
  profile = defaultProfile,
}: {
  profile?: ProfileData;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      // 1) Save to the database (shows up in the Admin dashboard).
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }

      // 2) Also email a notification via EmailJS (best-effort — the message
      //    is already safely saved above, so an email hiccup won't block it).
      if (EMAILJS_SERVICE && EMAILJS_TEMPLATE && EMAILJS_PUBLIC) {
        try {
          await emailjs.send(
            EMAILJS_SERVICE,
            EMAILJS_TEMPLATE,
            {
              name: payload.name,
              email: payload.email,
              message: payload.message,
              title: `Portfolio enquiry from ${payload.name}`,
              time: new Date().toLocaleString(),
            },
            { publicKey: EMAILJS_PUBLIC },
          );
        } catch (mailErr) {
          console.error("[emailjs] send failed:", mailErr);
        }
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          number="06"
          eyebrow="Say hello"
          title={
            <>
              Let&apos;s <span className="text-gradient">work together</span>
            </>
          }
          subtitle="Got a project, an integration, or something to automate? Drop a message and I'll get back to you."
        />

        {/* Direct contact methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-8 grid gap-3 sm:grid-cols-3"
        >
          <a
            href={`mailto:${profile.email}`}
            className="glass flex items-center gap-3 p-4 transition-colors hover:border-accent/40"
          >
            <Mail className="h-5 w-5 shrink-0 text-accent-cyan" />
            <span className="truncate text-sm text-slate-300">
              {profile.email}
            </span>
          </a>
          <a
            href={`tel:${profile.phoneHref}`}
            className="glass flex items-center gap-3 p-4 transition-colors hover:border-accent/40"
          >
            <Phone className="h-5 w-5 shrink-0 text-accent-cyan" />
            <span className="text-sm text-slate-300">{profile.phone}</span>
          </a>
          {profile.linkedinUrl ? (
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="glass flex items-center gap-3 p-4 transition-colors hover:border-accent/40"
            >
              <Linkedin className="h-5 w-5 shrink-0 text-accent-cyan" />
              <span className="truncate text-sm text-slate-300">
                {profile.linkedinLabel}
              </span>
            </a>
          ) : (
            <div className="glass flex items-center gap-3 p-4">
              <Linkedin className="h-5 w-5 shrink-0 text-accent-cyan" />
              <span className="truncate text-sm text-slate-300">
                {profile.linkedinLabel}
              </span>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass p-6 sm:p-8"
        >
          {status === "success" ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <CheckCircle2 className="h-12 w-12 text-emerald-400" />
              <h3 className="text-xl font-semibold text-white">
                Message sent!
              </h3>
              <p className="text-slate-400">
                Thanks for reaching out — I&apos;ll reply soon.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-2 text-sm text-accent-cyan hover:text-white"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm text-slate-300">
                    Name
                  </label>
                  <input
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-slate-300">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-slate-300">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-accent to-accent-glow px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_-10px_rgba(124,58,237,0.9)] transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Send Message
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-6 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center">
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent-cyan" />
              Prefer email? Reach me directly and I&apos;ll respond.
            </span>
            <a
              href={profile.cvUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-medium text-slate-200 transition-colors hover:border-accent-cyan hover:text-white"
            >
              <Download className="h-4 w-4" /> Download CV
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
