"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import {
  clients as defaultClients,
  motto as defaultMotto,
} from "@/lib/profile";
import SectionHeading from "./SectionHeading";

export default function Clients({
  clients = defaultClients,
  motto = defaultMotto,
}: {
  clients?: string[];
  motto?: string;
}) {
  // Duplicated so the CSS marquee (translateX 0 → -50%) loops seamlessly.
  const track = [...clients, ...clients];

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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        >
          <div className="animate-marquee flex w-max gap-4">
            {track.map((client, i) => (
              <div
                key={`${client}-${i}`}
                className="glass flex min-h-[88px] w-56 shrink-0 items-center justify-center p-5 text-center transition-colors hover:border-accent/40"
              >
                <span className="text-sm font-semibold text-slate-200">
                  {client}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
