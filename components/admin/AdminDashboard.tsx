"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  Star,
  ExternalLink,
  Github,
} from "lucide-react";
import type { Project } from "@/lib/types";

type FormValues = {
  title: string;
  description: string;
  tech_stack: string; // comma-separated in the form
  live_url: string;
  github_url: string;
  image_url: string;
  featured: boolean;
};

const emptyForm: FormValues = {
  title: "",
  description: "",
  tech_stack: "",
  live_url: "",
  github_url: "",
  image_url: "",
  featured: false,
};

function toForm(p: Project): FormValues {
  return {
    title: p.title,
    description: p.description,
    tech_stack: p.tech_stack.join(", "),
    live_url: p.live_url ?? "",
    github_url: p.github_url ?? "",
    image_url: p.image_url ?? "",
    featured: p.featured,
  };
}

export default function AdminDashboard({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [form, setForm] = useState<FormValues>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  function openCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setShowForm(true);
  }

  function openEdit(p: Project) {
    setForm(toForm(p));
    setEditingId(p.id);
    setError("");
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      tech_stack: form.tech_stack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      const url = editingId
        ? `/api/admin/projects/${editingId}`
        : "/api/admin/projects";
      const res = await fetch(url, {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed.");

      const saved: Project = data.project;
      setProjects((prev) =>
        editingId
          ? prev.map((p) => (p.id === saved.id ? saved : p))
          : [saved, ...prev],
      );
      closeForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project? This can't be undone.")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Delete failed.");
      }
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed.");
    } finally {
      setDeletingId(null);
    }
  }

  const input =
    "w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Projects
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {projects.length} project{projects.length !== 1 && "s"} · manage
            your portfolio
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-glow px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_-10px_rgba(124,58,237,0.9)] transition-transform hover:scale-[1.03]"
        >
          <Plus className="h-4 w-4" /> New Project
        </button>
      </div>

      {/* Project list */}
      <div className="space-y-3">
        {projects.length === 0 && (
          <div className="glass p-10 text-center text-slate-400">
            No projects yet. Click{" "}
            <span className="text-accent-cyan">New Project</span> to add one.
          </div>
        )}

        {projects.map((p) => (
          <div
            key={p.id}
            className="glass flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="truncate font-semibold text-white">
                  {p.title}
                </h3>
                {p.featured && (
                  <Star className="h-4 w-4 shrink-0 fill-amber-400 text-amber-400" />
                )}
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-slate-400">
                {p.description}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {p.tech_stack.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] text-slate-300"
                  >
                    {t}
                  </span>
                ))}
                {p.live_url && (
                  <a
                    href={p.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-accent-cyan hover:text-white"
                  >
                    <ExternalLink className="h-3 w-3" /> Live
                  </a>
                )}
                {p.github_url && (
                  <a
                    href={p.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-white"
                  >
                    <Github className="h-3 w-3" /> Code
                  </a>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openEdit(p)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-200 transition-colors hover:border-accent hover:text-white"
              >
                <Pencil className="h-4 w-4" /> Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                disabled={deletingId === p.id}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/20 px-3 py-2 text-sm text-red-300 transition-colors hover:border-red-500/50 hover:text-red-200 disabled:opacity-50"
              >
                {deletingId === p.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create / edit modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
            onClick={closeForm}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              className="my-8 w-full max-w-2xl rounded-2xl border border-white/10 bg-base-900 p-6 shadow-2xl sm:p-8"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">
                  {editingId ? "Edit Project" : "New Project"}
                </h2>
                <button
                  onClick={closeForm}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm text-slate-300">
                    Project Title *
                  </label>
                  <input
                    className={input}
                    required
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    placeholder="e.g. Logistics API Integration"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm text-slate-300">
                    Description
                  </label>
                  <textarea
                    className={`${input} resize-none`}
                    rows={4}
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder="What did you build?"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm text-slate-300">
                    Tech Stack{" "}
                    <span className="text-slate-500">(comma separated)</span>
                  </label>
                  <input
                    className={input}
                    value={form.tech_stack}
                    onChange={(e) =>
                      setForm({ ...form, tech_stack: e.target.value })
                    }
                    placeholder="Next.js, Supabase, TypeScript"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm text-slate-300">
                      Live URL
                    </label>
                    <input
                      className={input}
                      value={form.live_url}
                      onChange={(e) =>
                        setForm({ ...form, live_url: e.target.value })
                      }
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm text-slate-300">
                      GitHub Repo URL
                    </label>
                    <input
                      className={input}
                      value={form.github_url}
                      onChange={(e) =>
                        setForm({ ...form, github_url: e.target.value })
                      }
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm text-slate-300">
                    Image URL
                  </label>
                  <input
                    className={input}
                    value={form.image_url}
                    onChange={(e) =>
                      setForm({ ...form, image_url: e.target.value })
                    }
                    placeholder="https://... (cover image)"
                  />
                </div>

                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) =>
                      setForm({ ...form, featured: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-white/20 bg-white/5 accent-accent"
                  />
                  Mark as featured
                </label>

                {error && <p className="text-sm text-red-400">{error}</p>}

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="rounded-lg border border-white/10 px-5 py-2.5 text-sm text-slate-200 hover:border-white/30"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent to-accent-glow px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
                  >
                    {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                    {editingId ? "Save Changes" : "Create Project"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
