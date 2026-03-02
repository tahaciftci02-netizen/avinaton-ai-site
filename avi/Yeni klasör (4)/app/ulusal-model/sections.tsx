"use client";

import { Reveal } from "@/components/ui";

export default function NationalModelSections() {
  const t = () => (key)=> key // dummy translator("ulusalModel");
  const points = t.raw("points") as { title: string; desc: string }[];

  return (
    <div className="mt-10 grid gap-6 md:grid-cols-3">
      {points.map((p) => (
        <div key={p.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <Reveal>
            <div className="text-lg font-semibold">{p.title}</div>
            <p className="mt-3 text-sm leading-relaxed text-white/70">{p.desc}</p>
          </Reveal>
        </div>
      ))}
    </div>
  );
}
