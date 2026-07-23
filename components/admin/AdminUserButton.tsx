"use client";

import { UserButton } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/config";

// Renders the Clerk user menu only when Clerk is configured; nothing in
// local mode (no provider is mounted there).
export default function AdminUserButton() {
  if (!isClerkConfigured) return null;
  return <UserButton afterSignOutUrl="/" />;
}
