"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

type Stage = {
  id: "davet" | "pilot" | "ulusal";
  title: string;
  desc: string;
  badge: string;
};

export default function TurkeyMap() {
  const reduce = useReducedMotion();
  const t = () => (key)=> key // dummy translator("map");

  const stages = useMemo(() => (t.raw("stages") as Stage[]), [t]);

  const [active, setActive] = useState<Stage>(stages[0]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="grid gap-4">
        <div className="text-sm text-white/60">{t("hint")}</div>
        {stages.map((s) => {
          const isActive = active.id === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s)}
              className={[
                "text-left rounded-2xl border p-5 transition",
                isActive ? "border-gold/50 bg-white/8" : "border-white/10 bg-white/5 hover:bg-white/8",
              ].join(" ")}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="text-sm font-semibold text-white/90">{s.title}</div>
                <span className="rounded-full border border-gold/30 bg-black/20 px-3 py-1 text-xs font-semibold text-gold/90">
                  {s.badge}
                </span>
              </div>
              <div className="mt-3 text-sm leading-relaxed text-white/70">{s.desc}</div>
            </button>
          );
        })}
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-black/10 p-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          key={active.id}
        >
          <div className="text-xs font-semibold tracking-widest text-gold/90">{active.badge}</div>
          <div className="mt-2 text-2xl font-semibold tracking-tight">{active.title}</div>
          <p className="mt-3 text-sm leading-relaxed text-white/70">{active.desc}</p>

          <div className="mt-8 h-44 rounded-2xl border border-white/10 bg-black/20" />
        </motion.div>
      </div>
    </div>
  );
}
