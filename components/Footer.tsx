import { Github, Linkedin, Mail } from "lucide-react";
import { profile as defaultProfile } from "@/lib/profile";
import type { ProfileData } from "@/lib/types";

export default function Footer({
  profile = defaultProfile,
}: {
  profile?: ProfileData;
}) {
  const socials = [
    profile.github && { icon: Github, href: profile.github, label: "GitHub" },
    profile.linkedinUrl && {
      icon: Linkedin,
      href: profile.linkedinUrl,
      label: "LinkedIn",
    },
    { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
  ].filter(Boolean) as { icon: typeof Github; href: string; label: string }[];

  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-sm text-slate-400 sm:flex-row">
        <p className="text-center sm:text-left">
          <span className="text-gradient font-semibold">{profile.name}</span> —{" "}
          {profile.title}
        </p>

        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={s.label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:border-accent-cyan hover:text-white"
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <p className="text-center sm:text-right">
          © {new Date().getFullYear()} · All rights reserved
        </p>
      </div>
    </footer>
  );
}
