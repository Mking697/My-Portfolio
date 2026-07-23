"use client";

import { Suspense, lazy } from "react";
import { motion } from "framer-motion";

/**
 * 3D canvas slot for the Hero.
 *
 * ─────────────────────────────────────────────────────────────
 * HOW TO PLUG IN A REAL SPLINE SCENE
 * ─────────────────────────────────────────────────────────────
 * 1. Design a scene at https://spline.design and hit "Export → Code (React)".
 * 2. Copy the scene URL it gives you (ends in `.splinecode`).
 * 3. Set `SPLINE_SCENE_URL` below (or read it from an env var).
 * 4. The <Spline /> component is already wired up — once a URL is present it
 *    renders the live 3D scene; otherwise you get the animated placeholder.
 *
 * The import is lazy + Suspense-wrapped so the ~heavy runtime only loads on
 * the client and never blocks first paint.
 */

const SPLINE_SCENE_URL = ""; // e.g. "https://prod.spline.design/xxxx/scene.splinecode"

// Lazy so @splinetool/runtime is only fetched in the browser when needed.
const Spline = lazy(() => import("@splinetool/react-spline"));

export default function SplineScene() {
  if (SPLINE_SCENE_URL) {
    return (
      <div className="h-full w-full">
        <Suspense fallback={<PlaceholderOrb />}>
          <Spline scene={SPLINE_SCENE_URL} />
        </Suspense>
      </div>
    );
  }

  return <PlaceholderOrb />;
}

/** Animated stand-in so the layout looks alive before a Spline scene is added. */
function PlaceholderOrb() {
  return (
    <div className="relative flex h-full min-h-[320px] w-full items-center justify-center">
      {/* Glow */}
      <div className="absolute h-72 w-72 rounded-full bg-accent/30 blur-3xl animate-pulse-glow" />

      {/* Rotating rings */}
      <motion.div
        aria-hidden
        className="absolute h-80 w-80 rounded-full border border-accent-cyan/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden
        className="absolute h-64 w-64 rounded-full border border-accent-glow/40"
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      {/* Core orb */}
      <motion.div
        className="relative h-40 w-40 rounded-full bg-gradient-to-br from-accent-glow via-accent to-accent-cyan shadow-[0_0_80px_-10px_rgba(124,58,237,0.8)] animate-float"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="absolute inset-3 rounded-full bg-base-950/40 backdrop-blur-sm" />
      </motion.div>

      <span className="pointer-events-none absolute bottom-2 text-[11px] uppercase tracking-[0.3em] text-slate-500">
        3D canvas · Spline ready
      </span>
    </div>
  );
}
