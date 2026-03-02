"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import React from "react";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={"mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8 " + className}>
      {children}
    </div>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-white/5 px-3 py-1 text-xs text-white/80">
      <span className="h-1.5 w-1.5 rounded-full bg-gold/80" />
      {children}
    </span>
  );
}

export function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gold px-5 py-3 text-sm font-semibold text-navy shadow-glow transition hover:brightness-105"
    >
      {children}
      <span className="transition group-hover:translate-x-0.5">→</span>
    </a>
  );
}

export function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gold/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:border-gold/55 hover:bg-white/8"
    >
      {children}
    </a>
  );
}

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxGlow() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 120]);
  const opacity = useTransform(scrollY, [0, 500], [0.55, 0.15]);
  return (
    <motion.div
      style={{ y, opacity }}
      className="pointer-events-none absolute inset-x-0 -top-44 mx-auto h-[520px] w-[520px] rounded-full bg-gold/15 blur-3xl"
    />
  );
}
