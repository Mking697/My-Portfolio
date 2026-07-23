import { NextResponse } from "next/server";
import { deleteMessage } from "@/lib/content";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;
  try {
    const ok = await deleteMessage(id);
    if (!ok) {
      return NextResponse.json(
        { error: "Message not found." },
        { status: 404 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Delete failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
