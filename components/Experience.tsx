"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, ChevronRight } from "lucide-react";
import {
  experience as defaultExperience,
  education as defaultEducation,
} from "@/lib/profile";
import type { ExperienceItem, EducationItem } from "@/lib/types";
import SectionHeading from "./SectionHeading";

export default function Experience({
  experience = defaultExperience,
  education = defaultEducation,
}: {
  experience?: ExperienceItem[];
  education?: EducationItem[];
}) {
  return (
    <section id="experience" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          number="03"
          eyebrow="Deployment history"
          title={
            <>
              Professional <span className="text-gradient">Experience</span>
            </>
          }
        />

        {/* Timeline */}
        <div className="relative border-l border-white/10 pl-8">
          {experience.map((job, i) => (
            <motion.div
              key={`${job.company}-${job.period}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative mb-10 last:mb-0"
            >
              {/* Node */}
              <span className="absolute -left-[41px] flex h-5 w-5 items-center justify-center">
                <span
                  className={`h-3 w-3 rounded-full ${
                    job.current
                      ? "bg-accent-cyan shadow-[0_0_12px_2px_rgba(34,211,238,0.7)]"
                      : "bg-accent"
                  }`}
                />
              </span>

              <div className="glass p-6">
                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                      <Briefcase className="h-4 w-4 text-accent-cyan" />
                      {job.role}
                    </h3>
                    <p className="mt-0.5 text-sm text-slate-400">
                      {job.company}
                    </p>
                  </div>
                  <span
                    className={`inline-flex w-fit shrink-0 rounded-full border px-3 py-1 text-xs ${
                      job.current
                        ? "border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan"
                        : "border-white/10 text-slate-300"
                    }`}
                  >
                    {job.period}
                  </span>
                </div>

                <ul className="space-y-2">
                  {job.points.map((point, j) => (
                    <li
                      key={j}
                      className="flex gap-2 text-sm leading-relaxed text-slate-400"
                    >
                      <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-14"
        >
          <h3 className="mb-5 flex items-center gap-2 text-lg font-semibold text-white">
            <GraduationCap className="h-5 w-5 text-accent-cyan" />
            Education &amp; Certifications
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {education.map((edu) => (
              <div key={edu.title} className="glass p-5">
                <p className="font-medium text-white">{edu.title}</p>
                <p className="mt-1 text-sm text-slate-400">
                  {edu.org} · {edu.year}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
