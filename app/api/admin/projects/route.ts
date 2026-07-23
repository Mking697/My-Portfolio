import { NextResponse } from "next/server";
import { getProjects, createProject } from "@/lib/projects";
import { parseProjectInput } from "@/lib/parse";

// NOTE: these routes are guarded by middleware.ts (Clerk) when Clerk is
// configured. In local mode (no keys) they're open so the dashboard works.

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json({ projects });
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const { data, error } = parseProjectInput(body);
  if (error || !data) {
    return NextResponse.json({ error: error ?? "Invalid input." }, { status: 400 });
  }

  try {
    const project = await createProject(data);
    return NextResponse.json({ project }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Create failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
