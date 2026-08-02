import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-24">
      <div className="glass mx-auto max-w-md p-10 text-center">
        <p className="text-gradient text-6xl font-bold">404</p>
        <h1 className="mt-4 text-xl font-semibold text-white">
          Page not found
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link
          href="/"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-glow px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_-8px_rgba(124,58,237,0.9)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to home
        </Link>
      </div>
    </main>
  );
}
