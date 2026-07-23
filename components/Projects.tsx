"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";
import type { Project } from "@/lib/types";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// Map a project to filter categories based on its tech stack.
const FILTERS = ["All", "Automation & FMS", "Web & Marketplace", "E-commerce"] as const;
type Filter = (typeof FILTERS)[number];

function matches(project: Project, filter: Filter): boolean {
  if (filter === "All") return true;
  const t = project.tech_stack.join(" ").toLowerCase();
  if (filter === "Automation & FMS")
    return /automation|apps script|fms|ims|whatsapp|email|pdf|looker|pabbly/.test(
      t,
    );
  if (filter === "Web & Marketplace")
    return /web development|html|css|javascript|marketplace|lead generation/.test(
      t,
    );
  if (filter === "E-commerce") return /shopify|e-commerce|ecommerce/.test(t);
  return true;
}

export default function Projects({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");

  // Only show filters that actually have projects.
  const available = useMemo(
    () => FILTERS.filter((f) => projects.some((p) => matches(p, f))),
    [projects],
  );

  const filtered = useMemo(
    () => projects.filter((p) => matches(p, filter)),
    [projects, filter],
  );

  return (
    <section id="projects" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          number="04"
          eyebrow="Selected work"
          title={
            <>
              Featured <span className="text-gradient">Projects</span>
            </>
          }
          subtitle="From live web platforms and marketplaces to logistics automation, data systems and reporting engines."
        />

        {/* Filter tabs */}
        {available.length > 2 && (
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {available.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  filter === f
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {filter === f && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full border border-accent/40 bg-accent/15"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{f}</span>
              </button>
            ))}
          </div>
        )}

        {projects.length === 0 ? (
          <p className="text-center text-slate-500">
            No projects yet. Add some from the{" "}
            <span className="text-accent-cyan">Admin</span> dashboard.
          </p>
        ) : (
          <motion.div
            layout
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
