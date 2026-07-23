import { NextResponse } from "next/server";
import { getContent, setContent, CONTENT_KEYS } from "@/lib/content";
import type { ContentKey, SiteContent } from "@/lib/types";

// Protected by middleware.ts (Clerk) since it's under /api/admin.

type Params = { params: Promise<{ key: string }> };

function isContentKey(k: string): k is ContentKey {
  return (CONTENT_KEYS as string[]).includes(k);
}

export async function GET(_req: Request, { params }: Params) {
  const { key } = await params;
  if (!isContentKey(key)) {
    return NextResponse.json({ error: "Unknown content key." }, { status: 404 });
  }
  const value = await getContent(key);
  return NextResponse.json({ value });
}

export async function PUT(req: Request, { params }: Params) {
  const { key } = await params;
  if (!isContentKey(key)) {
    return NextResponse.json({ error: "Unknown content key." }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }
  if (typeof body !== "object" || body === null || !("value" in body)) {
    return NextResponse.json({ error: "Missing 'value'." }, { status: 400 });
  }

  const value = (body as { value: unknown }).value;
  try {
    await setContent(key, value as SiteContent[typeof key]);
    return NextResponse.json({ ok: true, value });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Save failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
