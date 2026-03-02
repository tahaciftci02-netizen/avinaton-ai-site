"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Container, Reveal } from "./ui";
import { useRef } from "react";

function Panel({ title, desc, tag }: { title: string; desc: string; tag: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-gold/18 bg-white/5 p-7">
      <div className="text-xs font-semibold tracking-widest text-gold/90">{tag}</div>
      <div className="mt-2 text-lg font-semibold">{title}</div>
      <p className="mt-3 text-sm leading-relaxed text-white/70">{desc}</p>
    </div>
  );
}

export default function CinematicShowcase() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);

  const t = () => (key)=> key // dummy translator("cinematic");
  const panels = t.raw("panels") as { tag: string; title: string; desc: string }[];

  return (
    <div ref={ref} className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="kicker">{t("kicker")}</div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{t("title")}</h2>
          <p className="mt-3 max-w-3xl text-white/70">{t("text")}</p>
        </Reveal>

        <motion.div style={{ y }} className="mt-10 grid gap-6 md:grid-cols-3">
          {panels.map((p) => (
            <Panel key={p.tag} {...p} />
          ))}
        </motion.div>
      </Container>
    </div>
  );
}
