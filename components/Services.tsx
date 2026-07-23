"use client";

import { motion } from "framer-motion";
import {
  ChevronRight,
  Flag,
  CircleStop,
  Share2,
  BarChart3,
  FileText,
  Users,
  MessageCircle,
  Fingerprint,
  ClipboardList,
  Network,
  type LucideIcon,
} from "lucide-react";
import {
  fmsPipeline as defaultPipeline,
  additionalSystems as defaultSystems,
  mission as defaultMission,
} from "@/lib/profile";
import type { PipelineItem, SystemItem } from "@/lib/types";
import SectionHeading from "./SectionHeading";

const iconMap: Record<string, LucideIcon> = {
  Share2,
  BarChart3,
  FileText,
  Users,
  MessageCircle,
  Fingerprint,
  ClipboardList,
  Network,
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function Services({
  fmsPipeline = defaultPipeline,
  additionalSystems = defaultSystems,
  mission = defaultMission,
}: {
  fmsPipeline?: PipelineItem[];
  additionalSystems?: SystemItem[];
  mission?: string;
}) {
  return (
    <section id="services" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          number="02"
          eyebrow="Automation ecosystem"
          title={
            <>
              Systems I <span className="text-gradient">Build</span>
            </>
          }
          subtitle={mission}
        />

        {/* End-to-end pipeline strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="glass mb-12 overflow-x-auto p-5"
        >
          <div className="flex min-w-max items-center gap-2">
            <Chip icon={<Flag className="h-3.5 w-3.5" />} label="Start" tone="start" />
            {fmsPipeline.map((mod) => (
              <div key={mod.name} className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 shrink-0 text-slate-600" />
                <Chip label={mod.name} />
              </div>
            ))}
            <ChevronRight className="h-4 w-4 shrink-0 text-slate-600" />
            <Chip icon={<CircleStop className="h-3.5 w-3.5" />} label="Dispatched" tone="stop" />
          </div>
        </motion.div>

        {/* Core FMS module cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {fmsPipeline.map((mod, i) => (
            <motion.div
              key={mod.name}
              variants={item}
              className="glass group flex gap-4 p-5 transition-colors hover:border-accent/40"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-sm font-bold text-accent-cyan ring-1 ring-inset ring-accent/20">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-semibold text-white">{mod.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">
                  {mod.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional systems */}
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-6 mt-16 text-center text-lg font-semibold text-white"
        >
          Additional Systems &amp; Integrations
        </motion.h3>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {additionalSystems.map((sys) => {
            const Icon = iconMap[sys.icon] ?? Share2;
            return (
              <motion.div
                key={sys.name}
                variants={item}
                className="glass group p-5 transition-colors hover:border-accent/40"
              >
                <div className="mb-3 inline-flex rounded-lg bg-accent/10 p-2.5 text-accent-cyan ring-1 ring-inset ring-accent/20 transition-transform group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="font-semibold text-white">{sys.name}</h4>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">
                  {sys.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function Chip({
  label,
  icon,
  tone = "default",
}: {
  label: string;
  icon?: React.ReactNode;
  tone?: "default" | "start" | "stop";
}) {
  const tones = {
    default: "border-white/10 bg-white/[0.04] text-slate-200",
    start: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
    stop: "border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan",
  } as const;
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${tones[tone]}`}
    >
      {icon}
      {label}
    </span>
  );
}
