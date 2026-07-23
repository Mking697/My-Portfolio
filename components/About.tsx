"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Workflow,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import {
  competencies as defaultCompetencies,
  skills as defaultSkills,
  profile as defaultProfile,
} from "@/lib/profile";
import type { Competency, Skill } from "@/lib/types";
import SectionHeading from "./SectionHeading";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Database,
  Workflow,
  BarChart3,
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function About({
  competencies = defaultCompetencies,
  skills = defaultSkills,
  summary = defaultProfile.summary,
}: {
  competencies?: Competency[];
  skills?: Skill[];
  summary?: string;
}) {
  return (
    <section id="about" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          number="01"
          eyebrow="What I do"
          title={
            <>
              Core <span className="text-gradient">Competencies</span>
            </>
          }
          subtitle={summary}
        />

        {/* Competency cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {competencies.map((skill) => {
            const Icon = iconMap[skill.icon] ?? Code2;
            return (
              <motion.div
                key={skill.title}
                variants={item}
                className="glass group p-6 transition-colors hover:border-accent/40"
              >
                <div className="mb-4 inline-flex rounded-xl bg-accent/10 p-3 text-accent-cyan ring-1 ring-inset ring-accent/20 transition-transform group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {skill.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  {skill.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Skill proficiency bars */}
        <div className="mt-16 grid gap-x-12 gap-y-6 md:grid-cols-2">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-200">{skill.label}</span>
                <span className="font-semibold text-accent-cyan">
                  {skill.level}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-accent-cyan"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.1 + i * 0.08, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
