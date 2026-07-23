"use client";

import { useState } from "react";
import { Loader2, Check } from "lucide-react";
import type { ProfileData } from "@/lib/types";

type FieldDef = {
  name: keyof ProfileData;
  label: string;
  type?: "text" | "textarea";
  hint?: string;
};

const fields: FieldDef[] = [
  { name: "name", label: "Full Name" },
  { name: "title", label: "Title / Headline" },
  { name: "role", label: "Short Role" },
  { name: "tagline", label: "Hero Tagline", type: "textarea" },
  { name: "location", label: "Location" },
  { name: "email", label: "Email" },
  { name: "phone", label: "Phone (display)" },
  { name: "phoneHref", label: "Phone (tel: link)", hint: "+91..." },
  { name: "whatsapp", label: "WhatsApp number", hint: "digits only, e.g. 9163..." },
  { name: "linkedinLabel", label: "LinkedIn label" },
  { name: "linkedinUrl", label: "LinkedIn URL" },
  { name: "github", label: "GitHub URL" },
  { name: "cvUrl", label: "CV / Resume URL" },
  { name: "heroImage", label: "Hero Image URL" },
  { name: "existingPortfolio", label: "Other portfolio URL" },
  { name: "summary", label: "About Summary", type: "textarea" },
  { name: "motto", label: "Brand Motto" },
  { name: "mission", label: "Services Mission", type: "textarea" },
];

export default function ProfileEditor({ initial }: { initial: ProfileData }) {
  const [form, setForm] = useState<ProfileData>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function update(name: keyof ProfileData, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
    setError("");
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/content/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed.");
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  const input =
    "w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

  return (
    <section className="mb-10">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-white">Profile & Contact</h2>
        <p className="mt-0.5 text-sm text-slate-400">
          Your name, headline, contact details and links shown across the site.
        </p>
      </div>

      <div className="glass grid gap-4 p-5 sm:grid-cols-2">
        {fields.map((f) => (
          <div
            key={f.name}
            className={f.type === "textarea" ? "sm:col-span-2" : ""}
          >
            <label className="mb-1 block text-xs text-slate-400">
              {f.label}
              {f.hint && <span className="ml-1 text-slate-600">({f.hint})</span>}
            </label>
            {f.type === "textarea" ? (
              <textarea
                className={`${input} resize-none`}
                rows={3}
                value={form[f.name] ?? ""}
                onChange={(e) => update(f.name, e.target.value)}
              />
            ) : (
              <input
                className={input}
                value={form[f.name] ?? ""}
                onChange={(e) => update(f.name, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent to-accent-glow px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : saved ? (
            <Check className="h-4 w-4" />
          ) : null}
          {saved ? "Saved" : "Save Profile"}
        </button>
        {error && <span className="text-sm text-red-400">{error}</span>}
      </div>
    </section>
  );
}
