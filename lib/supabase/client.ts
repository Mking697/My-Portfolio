import { createClient } from "@supabase/supabase-js";

/**
 * Browser / public Supabase client.
 *
 * Uses the ANON key, which is safe to expose. Reads should be gated by
 * Row Level Security (RLS) policies on the database (see supabase/schema.sql):
 * public SELECT on projects is allowed; writes are not.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Fail loudly during dev if env is misconfigured.
  console.warn(
    "[supabase] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing. " +
      "Copy .env.local.example to .env.local and fill in your values.",
  );
}

export const supabase = createClient(
  supabaseUrl ?? "",
  supabaseAnonKey ?? "",
);
