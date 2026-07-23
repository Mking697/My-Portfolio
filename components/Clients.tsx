"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import {
  clients as defaultClients,
  motto as defaultMotto,
} from "@/lib/profile";
import SectionHeading from "./SectionHeading";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Clients({
  clients = defaultClients,
  motto = defaultMotto,
}: {
  clients?: string[];
  motto?: string;
}) {
  return (
    <section id="clients" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          number="05"
          eyebrow="Trusted by"
          title={
            <>
              Clients &amp; <span className="text-gradient">Collaborations</span>
            </>
          }
          subtitle={
            <span className="inline-flex items-center gap-2">
              <Quote className="h-4 w-4 text-accent-cyan" />
              <span className="italic">{motto}</span>
            </span>
          }
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {clients.map((client) => (
            <motion.div
              key={client}
              variants={item}
              className="glass flex min-h-[88px] items-center justify-center p-5 text-center transition-colors hover:border-accent/40"
            >
              <span className="text-sm font-semibold text-slate-200">
                {client}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
