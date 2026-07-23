"use client";

import { useState } from "react";
import { Mail, Trash2, Loader2, Inbox } from "lucide-react";
import type { Message } from "@/lib/types";

export default function MessagesViewer({ initial }: { initial: Message[] }) {
  const [messages, setMessages] = useState<Message[]>(initial ?? []);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Delete failed.");
      }
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Delete failed.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-white">Contact Messages</h2>
        <p className="mt-0.5 text-sm text-slate-400">
          {messages.length} message{messages.length !== 1 && "s"} from your
          contact form.
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="glass flex flex-col items-center gap-2 p-10 text-center text-slate-500">
          <Inbox className="h-8 w-8" />
          No messages yet.
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div key={m.id} className="glass p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-semibold text-white">{m.name}</p>
                  <a
                    href={`mailto:${m.email}`}
                    className="inline-flex items-center gap-1.5 text-sm text-accent-cyan hover:text-white"
                  >
                    <Mail className="h-3.5 w-3.5" /> {m.email}
                  </a>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="text-xs text-slate-500">
                    {new Date(m.created_at).toLocaleString()}
                  </span>
                  <button
                    onClick={() => remove(m.id)}
                    disabled={deletingId === m.id}
                    className="rounded-lg border border-red-500/20 p-2 text-red-300 hover:border-red-500/50 disabled:opacity-50"
                    aria-label="Delete message"
                  >
                    {deletingId === m.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-wrap border-t border-white/5 pt-3 text-sm text-slate-300">
                {m.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
