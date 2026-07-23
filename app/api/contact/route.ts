import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isSupabaseConfigured } from "@/lib/config";

export async function POST(req: Request) {
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are all required." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  // Persist to Supabase when configured; otherwise log locally so the form
  // works on localhost without a database.
  if (isSupabaseConfigured) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } },
    );
    const { error } = await supabase
      .from("messages")
      .insert({ name, email, message });
    if (error) {
      console.error("[contact] insert failed:", error.message);
      return NextResponse.json(
        { error: "Could not send your message. Please try again." },
        { status: 500 },
      );
    }
  } else {
    console.log("[contact] (local mode) new message:", { name, email, message });
  }

  return NextResponse.json({ ok: true });
}
