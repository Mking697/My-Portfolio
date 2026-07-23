import "server-only";
import { createClient } from "@supabase/supabase-js";
import { isSupabaseConfigured, isSupabaseAdminConfigured } from "./config";
import { listLocal, createLocal, updateLocal, deleteLocal } from "./store";
import type { Project, ProjectInput } from "./types";

/**
 * Unified project data access.
 * - Uses Supabase when configured (anon for reads, service-role for writes).
 * - Falls back to the in-memory store otherwise, so everything works locally.
 */

function anonClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  );
}

function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}

export async function getProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured) return listLocal();

  const { data, error } = await anonClient()
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[projects] read failed, using local fallback:", error.message);
    return listLocal();
  }
  return (data ?? []) as Project[];
}

export async function createProject(input: ProjectInput): Promise<Project> {
  if (!isSupabaseAdminConfigured) return createLocal(input);

  const { data, error } = await adminClient()
    .from("projects")
    .insert(input)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Project;
}

export async function updateProject(
  id: string,
  input: Partial<ProjectInput>,
): Promise<Project | null> {
  if (!isSupabaseAdminConfigured) return updateLocal(id, input);

  const { data, error } = await adminClient()
    .from("projects")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Project;
}

export async function deleteProject(id: string): Promise<boolean> {
  if (!isSupabaseAdminConfigured) return deleteLocal(id);

  const { error } = await adminClient().from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return true;
}
