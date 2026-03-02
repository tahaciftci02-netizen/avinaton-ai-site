"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Container, Reveal } from "./ui";
import TurkeyMap from "./turkey-map";

export function Marquee() {
  const reduce = useReducedMotion();
  const t = () => (key)=> key // dummy translator("extras");
  const items = t.raw("marqueeItems") as string[];

  return (
    <div className="border-y border-white/5 bg-black/10 py-4">
      <Container>
        <div className="overflow-hidden">
          <motion.div
            initial={{ x: 0 }}
            animate={reduce ? { x: 0 } : { x: [-600, 0] }}
            transition={reduce ? {} : { repeat: Infinity, repeatType: "loop", duration: 14, ease: "linear" }}
            className="flex gap-10 whitespace-nowrap text-sm font-semibold tracking-wide text-white/70"
          >
            {items.concat(items).map((x, i) => (
              <span key={`${x}-${i}`} className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold/80" />
                {x}
              </span>
            ))}
          </motion.div>
        </div>
      </Container>
    </div>
  );
}

export function MapSection() {
  const t = () => (key)=> key // dummy translator("extras");
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="kicker">{t("mapKicker")}</div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{t("mapTitle")}</h2>
          <p className="mt-3 max-w-3xl text-white/70">{t("mapText")}</p>
        </Reveal>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <TurkeyMap />
        </div>
      </Container>
    </div>
  );
}

export function FinalCTA() {
  const t = () => (key)=> key // dummy translator("extras");
  const tNav = (() => (key)=> key)("nav");

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{t("finalTitle")}</h2>
          <p className="mt-3 max-w-3xl text-white/70">{t("finalText")}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/founding" className="rounded-2xl border border-gold/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 hover:border-gold/55">
              {t("finalPrimary")}
            </Link>
            <Link href="/apply" className="rounded-2xl bg-gold px-5 py-3 text-sm font-semibold text-navy hover:brightness-105">
              {tNav("apply")}
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
