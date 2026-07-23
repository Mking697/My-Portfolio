"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Loader2,
  Check,
} from "lucide-react";
import type { ContentKey } from "@/lib/types";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "lines" | "select" | "checkbox";
  options?: string[];
  placeholder?: string;
  hint?: string;
};

// eslint-disable-next-line
type Item = Record<string, any>;

export default function ObjectListEditor({
  title,
  description,
  contentKey,
  initial,
  fields,
  newItem,
  titleField,
}: {
  title: string;
  description?: string;
  contentKey: ContentKey;
  initial: Item[];
  fields: Field[];
  newItem: Item;
  titleField?: string;
}) {
  const [items, setItems] = useState<Item[]>(initial ?? []);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const dirty = () => {
    setSaved(false);
    setError("");
  };

  function update(i: number, name: string, value: unknown) {
    setItems((prev) =>
      prev.map((it, idx) => (idx === i ? { ...it, [name]: value } : it)),
    );
    dirty();
  }
  function add() {
    setItems((prev) => [...prev, structuredClone(newItem)]);
    dirty();
  }
  function remove(i: number) {
    setItems((prev) => prev.filter((_, idx) => idx !== i));
    dirty();
  }
  function move(i: number, dir: -1 | 1) {
    setItems((prev) => {
      const j = i + dir;
      if (j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
    dirty();
  }

  async function save() {
    setSaving(true);
    setError("");
    const cleaned = items.map((it) => {
      const copy: Item = { ...it };
      for (const f of fields) {
        if (f.type === "lines" && Array.isArray(copy[f.name])) {
          copy[f.name] = (copy[f.name] as string[])
            .map((s) => s.trim())
            .filter(Boolean);
        }
        if (f.type === "number") copy[f.name] = Number(copy[f.name]) || 0;
      }
      return copy;
    });

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
          onClick={add}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-sm text-slate-200 hover:border-accent hover:text-white"
        >
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>

      <div className="space-y-4">
        {items.length === 0 && (
          <p className="glass p-6 text-center text-sm text-slate-500">
            No items. Click <span className="text-accent-cyan">Add</span> to
            create one.
          </p>
        )}

        {items.map((item, i) => (
          <div key={i} className="glass p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-300">
                {titleField && item[titleField]
                  ? String(item[titleField])
                  : `Item ${i + 1}`}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  className="rounded p-1.5 text-slate-400 hover:bg-white/5 hover:text-white disabled:opacity-30"
                  aria-label="Move up"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => move(i, 1)}
                  disabled={i === items.length - 1}
                  className="rounded p-1.5 text-slate-400 hover:bg-white/5 hover:text-white disabled:opacity-30"
                  aria-label="Move down"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                <button
                  onClick={() => remove(i)}
                  className="rounded p-1.5 text-red-300 hover:bg-red-500/10"
                  aria-label="Remove"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {fields.map((f) => {
                const span =
                  f.type === "textarea" || f.type === "lines"
                    ? "sm:col-span-2"
                    : "";
                return (
                  <div key={f.name} className={span}>
                    <label className="mb-1 block text-xs text-slate-400">
                      {f.label}
                      {f.hint && (
                        <span className="ml-1 text-slate-600">({f.hint})</span>
                      )}
                    </label>
                    {f.type === "textarea" ? (
                      <textarea
                        className={`${input} resize-none`}
                        rows={3}
                        value={item[f.name] ?? ""}
                        placeholder={f.placeholder}
                        onChange={(e) => update(i, f.name, e.target.value)}
                      />
                    ) : f.type === "lines" ? (
                      <textarea
                        className={`${input} resize-none`}
                        rows={4}
                        value={(item[f.name] ?? []).join("\n")}
                        placeholder={f.placeholder || "One per line"}
                        onChange={(e) =>
                          update(i, f.name, e.target.value.split("\n"))
                        }
                      />
                    ) : f.type === "select" ? (
                      <select
                        className={input}
                        value={item[f.name] ?? ""}
                        onChange={(e) => update(i, f.name, e.target.value)}
                      >
                        {(f.options ?? []).map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : f.type === "checkbox" ? (
                      <label className="flex items-center gap-2 py-2 text-sm text-slate-300">
                        <input
                          type="checkbox"
                          checked={Boolean(item[f.name])}
                          onChange={(e) => update(i, f.name, e.target.checked)}
                          className="h-4 w-4 rounded border-white/20 bg-white/5 accent-accent"
                        />
                        {f.placeholder || "Yes"}
                      </label>
                    ) : (
                      <input
                        type={f.type === "number" ? "number" : "text"}
                        className={input}
                        value={item[f.name] ?? ""}
                        placeholder={f.placeholder}
                        onChange={(e) =>
                          update(
                            i,
                            f.name,
                            f.type === "number"
                              ? e.target.value
                              : e.target.value,
                          )
                        }
                      />
                    )}
                  </div>
                );
              })}
            </div>
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
