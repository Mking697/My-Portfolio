import "server-only";
import type { Project, ProjectInput } from "./types";
import { seedProjects } from "./seed";

/**
 * In-memory project store — the fallback used when Supabase isn't configured,
 * so the admin CRUD and public grid work on localhost with no external DB.
 *
 * Stored on globalThis so it survives Next.js hot-reloads during dev.
 * Note: this is ephemeral — it resets when the server process restarts.
 * Configure Supabase for real persistence.
 */
const g = globalThis as unknown as { __projectStore?: Project[] };

function store(): Project[] {
  if (!g.__projectStore) {
    g.__projectStore = seedProjects.map((p) => ({ ...p }));
  }
  return g.__projectStore;
}

export function listLocal(): Project[] {
  return [...store()].sort((a, b) =>
    b.created_at.localeCompare(a.created_at),
  );
}

export function createLocal(input: ProjectInput): Project {
  const project: Project = {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    ...input,
  };
  store().unshift(project);
  return project;
}

export function updateLocal(
  id: string,
  input: Partial<ProjectInput>,
): Project | null {
  const s = store();
  const i = s.findIndex((p) => p.id === id);
  if (i === -1) return null;
  s[i] = { ...s[i], ...input };
  return s[i];
}

export function deleteLocal(id: string): boolean {
  const s = store();
  const i = s.findIndex((p) => p.id === id);
  if (i === -1) return false;
  s.splice(i, 1);
  return true;
}
