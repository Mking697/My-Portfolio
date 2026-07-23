import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { isClerkConfigured } from "@/lib/config";
import AdminUserButton from "@/components/admin/AdminUserButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-base-950/70 backdrop-blur-lg">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> Site
            </Link>
            <span className="text-lg font-bold">
              <span className="text-gradient">Admin</span>
              <span className="text-slate-500"> Dashboard</span>
            </span>
          </div>
          <AdminUserButton />
        </div>
      </header>

      {!isClerkConfigured && (
        <div className="border-b border-amber-500/20 bg-amber-500/10 px-6 py-2.5 text-center text-xs text-amber-200">
          Local demo mode — Clerk auth is off. Add Clerk keys in{" "}
          <code className="text-amber-100">.env.local</code> to lock this page
          down.
        </div>
      )}

      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
