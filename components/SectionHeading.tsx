"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function SectionHeading({
  number,
  eyebrow,
  title,
  subtitle,
}: {
  number: string;
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="mb-12 text-center"
    >
      <div className="mb-4 flex items-center justify-center gap-3">
        <span className="font-mono text-sm font-semibold text-accent">
          {number}
        </span>
        <span className="h-px w-8 bg-accent/40" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-slate-400">{subtitle}</p>
      )}
    </motion.div>
  );
}
