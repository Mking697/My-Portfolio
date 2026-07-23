"use client";

import { useState } from "react";
import { Plus, Trash2, Loader2, Check } from "lucide-react";
import type { ContentKey } from "@/lib/types";

export default function StringListEditor({
  title,
  description,
  contentKey,
  initial,
  placeholder,
}: {
  title: string;
  description?: string;
  contentKey: ContentKey;
  initial: string[];
  placeholder?: string;
}) {
  const [items, setItems] = useState<string[]>(initial ?? []);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const dirty = () => {
    setSaved(false);
    setError("");
  };

  async function save() {
    setSaving(true);
    setError("");
    const cleaned = items.map((s) => s.trim()).filter(Boolean);
    try {
      const res = await fetch(`/api/admin/content/${contentKey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: cleaned }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed.");
      setItems(cleaned);
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
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">{title}</h2>
          {description && (
            <p className="mt-0.5 text-sm text-slate-400">{description}</p>
          )}
        </div>
        <button
          onClick={() => {
            setItems((p) => [...p, ""]);
            dirty();
          }}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-sm text-slate-200 hover:border-accent hover:text-white"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>

      <div className="space-y-2">
        {items.map((val, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              className={input}
              value={val}
              placeholder={placeholder}
              onChange={(e) => {
                const v = e.target.value;
                setItems((p) => p.map((x, idx) => (idx === i ? v : x)));
                dirty();
              }}
            />
            <button
              onClick={() => {
                setItems((p) => p.filter((_, idx) => idx !== i));
                dirty();
              }}
              className="shrink-0 rounded-lg border border-red-500/20 p-2 text-red-300 hover:border-red-500/50"
              aria-label="Remove"
            >
              <Trash2 className="h-4 w-4" />
            </button>
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
          {saved ? "Saved" : `Save ${title}`}
        </button>
        {error && <span className="text-sm text-red-400">{error}</span>}
      </div>
    </section>
  );
}
