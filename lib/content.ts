import "server-only";
import { createClient } from "@supabase/supabase-js";
import { isSupabaseConfigured, isSupabaseAdminConfigured } from "./config";
import {
  profile,
  competencies,
  skills,
  experience,
  education,
  fmsPipeline,
  additionalSystems,
  clients,
} from "./profile";
import type { SiteContent, ContentKey, Message } from "./types";

/**
 * Editable site content.
 * - Reads from the Supabase `site_content` table (JSONB per section) when
 *   configured; falls back to the hardcoded defaults for any missing key.
 * - Writes (admin) go to Supabase via the service key; a local in-memory
 *   store is used when Supabase isn't configured (dev without keys).
 */

export const defaultContent: SiteContent = {
  profile: { ...profile },
  competencies,
  skills,
  experience,
  education,
  fmsPipeline,
  additionalSystems,
  clients,
};

export const CONTENT_KEYS: ContentKey[] = [
  "profile",
  "competencies",
  "skills",
  "experience",
  "education",
  "fmsPipeline",
  "additionalSystems",
  "clients",
];

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

// ── Local (no-Supabase) fallback store, survives hot-reloads ──
const g = globalThis as unknown as { __siteContent?: SiteContent };
function localContent(): SiteContent {
  if (!g.__siteContent) {
    g.__siteContent = structuredClone(defaultContent);
  }
  return g.__siteContent;
}

export async function getSiteContent(): Promise<SiteContent> {
  if (!isSupabaseConfigured) return localContent();

  const { data, error } = await anonClient()
    .from("site_content")
    .select("key,value");

  if (error) {
    // Table may not exist yet — fall back to defaults gracefully.
    console.error("[content] read failed, using defaults:", error.message);
    return defaultContent;
  }

  const merged: SiteContent = structuredClone(defaultContent);
  const target = merged as unknown as Record<string, unknown>;
  for (const row of data ?? []) {
    if ((CONTENT_KEYS as string[]).includes(row.key)) {
      target[row.key] = row.value;
    }
  }
  return merged;
}

export async function getContent<K extends ContentKey>(
  key: K,
): Promise<SiteContent[K]> {
  const content = await getSiteContent();
  return content[key];
}

export async function setContent<K extends ContentKey>(
  key: K,
  value: SiteContent[K],
): Promise<void> {
  if (!isSupabaseAdminConfigured) {
    localContent()[key] = value;
    return;
  }
  const { error } = await adminClient()
    .from("site_content")
    .upsert(
      { key, value, updated_at: new Date().toISOString() },
      { onConflict: "key" },
    );
  if (error) throw new Error(error.message);
}

// ── Contact messages ──
export async function getMessages(): Promise<Message[]> {
  if (!isSupabaseAdminConfigured) return [];
  const { data, error } = await adminClient()
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("[messages] read failed:", error.message);
    return [];
  }
  return (data ?? []) as Message[];
}

export async function deleteMessage(id: string): Promise<boolean> {
  if (!isSupabaseAdminConfigured) return false;
  const { error } = await adminClient().from("messages").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return true;
}
