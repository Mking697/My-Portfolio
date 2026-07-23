// Feature detection based on environment variables.
// Lets the app run fully locally (in-memory data, open admin) when no
// external services are configured, and light up Clerk/Supabase the moment
// real keys are added — with zero code changes.

// Client-safe: NEXT_PUBLIC_ vars are inlined into the browser bundle.
export const isClerkConfigured =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Server-only: whether we can perform privileged writes to Supabase.
export const isSupabaseAdminConfigured =
  isSupabaseConfigured && !!process.env.SUPABASE_SERVICE_ROLE_KEY;
