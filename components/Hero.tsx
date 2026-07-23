"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Download, MapPin, Sparkles } from "lucide-react";
import SplineScene from "./SplineScene";
import { profile as defaultProfile } from "@/lib/profile";
import type { ProfileData } from "@/lib/types";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero({
  profile = defaultProfile,
}: {
  profile?: ProfileData;
}) {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-grid-glow"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 pt-28 pb-16 md:grid-cols-2 md:pt-24">
        {/* Left: copy */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center md:text-left"
        >
          <motion.span
            variants={item}
            className="glass mx-auto mb-6 inline-flex items-center gap-2 px-4 py-1.5 text-xs text-slate-300 md:mx-0"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent-cyan" />
            Available for freelance &amp; automation projects
          </motion.span>

          <motion.h1
            variants={item}
            className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            {profile.name}
            <span className="mt-2 block text-2xl font-medium text-slate-300 sm:text-3xl lg:text-[2rem]">
              <span className="text-gradient">{profile.title}</span>
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-xl text-base text-slate-400 md:mx-0 md:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-5 flex items-center justify-center gap-2 text-sm text-slate-400 md:justify-start"
          >
            <MapPin className="h-4 w-4 text-accent-cyan" />
            {profile.location}
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row md:items-start md:justify-start"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-glow px-7 py-3 text-sm font-semibold text-white shadow-[0_0_40px_-8px_rgba(124,58,237,0.9)] transition-transform hover:scale-[1.03]"
            >
              View My Work
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href={profile.cvUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-accent-cyan hover:text-white"
            >
              <Download className="h-4 w-4" /> Download CV
            </a>
          </motion.div>
        </motion.div>

        {/* Right: 3D canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative h-[380px] w-full sm:h-[460px] md:h-[520px]"
        >
          {profile.heroImage ? (
            <div className="relative flex h-full w-full items-center justify-center">
              {/* Glow */}
              <div className="absolute h-72 w-72 rounded-full bg-accent/30 blur-3xl animate-pulse-glow" />
              {/* Floating framed image */}
              <div className="animate-float relative aspect-square h-full max-h-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_70px_-12px_rgba(124,58,237,0.7)]">
                <Image
                  src={profile.heroImage}
                  alt={`${profile.name} — ${profile.title}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          ) : (
            <SplineScene />
          )}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </motion.a>
    </section>
  );
}
