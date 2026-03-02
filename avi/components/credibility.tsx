"use client";

import { getT } from "@/lib/t";
import Link from "next/link";
import { Container, Reveal } from "./ui";

export function Credibility() {
  const t = getT("credibility");
return (
    <div className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="kicker">{t("kicker")}</div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{t("title")}</h2>
          <p className="mt-3 max-w-3xl text-white/70">{t("text")}</p>

          <div className="mt-6">
            <Link
              href="/clubs"
              className="inline-flex items-center justify-center rounded-2xl border border-gold/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 hover:border-gold/55"
            >
              {t("cta")}
            </Link>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
