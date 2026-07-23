"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/config";
import { profile as defaultProfile } from "@/lib/profile";
import type { ProfileData } from "@/lib/types";

const links = [
  { href: "#about", label: "About", id: "about" },
  { href: "#services", label: "Services", id: "services" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#contact", label: "Contact", id: "contact" },
];

export default function Navbar({
  profile = defaultProfile,
}: {
  profile?: ProfileData;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the nav link for the section in view.
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-base-950/70 backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="text-lg font-bold tracking-tight"
        >
          <span className="text-gradient">MT</span>
          <span className="text-slate-400">.dev</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative text-sm transition-colors ${
                active === link.id
                  ? "text-white"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {link.label}
              {active === link.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-accent to-accent-cyan"
                />
              )}
            </a>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <a
            href={profile.cvUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded-full border border-white/15 px-4 py-1.5 text-sm text-slate-200 transition-colors hover:border-accent-cyan hover:text-white sm:inline-flex"
          >
            <Download className="h-3.5 w-3.5" /> CV
          </a>

          {isClerkConfigured ? (
            <>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="hidden rounded-full border border-white/15 px-4 py-1.5 text-sm text-slate-200 transition-colors hover:border-accent hover:text-white sm:block">
                    Admin
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link
                  href="/admin"
                  className="hidden rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm text-white transition-colors hover:bg-accent/20 sm:block"
                >
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </>
          ) : (
            <Link
              href="/admin"
              className="hidden rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm text-white transition-colors hover:bg-accent/20 sm:block"
            >
              Admin
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-200 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/10 md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    active === link.id
                      ? "bg-accent/10 text-white"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 flex items-center gap-3 border-t border-white/10 pt-3">
                <a
                  href={profile.cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm text-slate-200"
                >
                  <Download className="h-4 w-4" /> Download CV
                </a>
                <Link
                  href="/admin"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm text-white"
                >
                  Admin
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
