"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function hostname(url: string | null): string {
  if (!url) return "";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export default function ProjectCard({ project }: { project: Project }) {
  const host = hostname(project.live_url);
  const initials = project.title
    .replace(/[^a-zA-Z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  const CoverInner = (
    <>
      {project.image_url ? (
        <Image
          src={project.image_url}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/25 via-base-800 to-accent-cyan/20">
          {host ? (
            // Real brand favicon for live sites
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`https://www.google.com/s2/favicons?domain=${host}&sz=128`}
              alt={`${project.title} favicon`}
              width={56}
              height={56}
              className="h-14 w-14 rounded-xl bg-white/90 p-2 shadow-lg"
            />
          ) : (
            <span className="text-3xl font-bold text-white/70">{initials}</span>
          )}
        </div>
      )}

      {/* Featured / Live badges */}
      <div className="absolute left-3 top-3 flex gap-2">
        {project.featured && (
          <span className="rounded-full bg-accent/90 px-2.5 py-1 text-[11px] font-semibold text-white">
            Featured
          </span>
        )}
        {project.live_url && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-2.5 py-1 text-[11px] font-semibold text-white">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            Live
          </span>
        )}
      </div>

      {/* Hover overlay for live sites */}
      {project.live_url && (
        <div className="absolute inset-0 flex items-center justify-center bg-base-950/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-sm font-semibold text-base-950">
            Visit Site <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      )}
    </>
  );

  return (
    <motion.article
      variants={item}
      className="glass group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
    >
      {/* Cover (clickable when live) */}
      {project.live_url ? (
        <a
          href={project.live_url}
          target="_blank"
          rel="noreferrer"
          className="relative block h-44 w-full overflow-hidden"
          aria-label={`Visit ${project.title}`}
        >
          {CoverInner}
        </a>
      ) : (
        <div className="relative h-44 w-full overflow-hidden">{CoverInner}</div>
      )}

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
          {host && (
            <span className="mt-1 shrink-0 text-[11px] text-slate-400">
              {host}
            </span>
          )}
        </div>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
          {project.description}
        </p>

        {project.tech_stack?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech_stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[11px] text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {(project.live_url || project.github_url) && (
          <div className="mt-5 flex items-center gap-4 border-t border-white/5 pt-4">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-accent-cyan transition-colors hover:text-white"
              >
                <ExternalLink className="h-4 w-4" /> Live
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-slate-300 transition-colors hover:text-white"
              >
                <Github className="h-4 w-4" /> Code
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
