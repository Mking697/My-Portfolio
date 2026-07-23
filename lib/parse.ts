import type { ProjectInput } from "./types";

/** Normalize an incoming request body into a clean ProjectInput. */
export function parseProjectInput(body: unknown): {
  data?: ProjectInput;
  error?: string;
} {
  if (typeof body !== "object" || body === null) {
    return { error: "Invalid request body." };
  }
  const b = body as Record<string, unknown>;

  const title = typeof b.title === "string" ? b.title.trim() : "";
  if (!title) return { error: "Title is required." };

  const description =
    typeof b.description === "string" ? b.description.trim() : "";

  // tech_stack accepts an array or a comma-separated string.
  let tech_stack: string[] = [];
  if (Array.isArray(b.tech_stack)) {
    tech_stack = b.tech_stack.map((t) => String(t).trim()).filter(Boolean);
  } else if (typeof b.tech_stack === "string") {
    tech_stack = b.tech_stack
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }

  const nullableStr = (v: unknown) => {
    const s = typeof v === "string" ? v.trim() : "";
    return s.length ? s : null;
  };

  return {
    data: {
      title,
      description,
      tech_stack,
      live_url: nullableStr(b.live_url),
      github_url: nullableStr(b.github_url),
      image_url: nullableStr(b.image_url),
      featured: Boolean(b.featured),
    },
  };
}
