'use client';

"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { getT } from "@/lib/t";
import { Container, Pill, Reveal, ParallaxGlow } from "./ui";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav() {
  const tNav = getT("nav");
const tSite = getT("site");
return (
    <div className="sticky top-0 z-50 border-b border-white/5 bg-black/10 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full border border-gold/25 bg-white/5 p-1">
            <Image
              src="/logo.png"
              alt={`${tSite("name")} logo`}
              width={64}
              height={64}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-wide">{tSite("name")}</div>
            <div className="text-xs text-white/60">{tSite("tagline")}</div>
          </div>
        </Link>

        <div className="hidden items-center gap-6 text-sm text-white/75 md:flex">
          <Link href={`/${locale}/ulusal-model`} className="navLink hover:text-white">
            {tNav("ulusalModel")}
          </Link>
          <Link href={`/${locale}/partners`} className="navLink hover:text-white">
            {tNav("partners")}
          </Link>
          <Link href={`/${locale}/about`} className="navLink hover:text-white">
            {tNav("about")}
          </Link>
          <Link href={`/${locale}/clubs`} className="navLink hover:text-white">
            {tNav("clubs")}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          
          <Link
            href={`/${locale}/apply`}
            className="rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-navy hover:brightness-105"
          >
            {tNav("apply")}
          </Link>
        </div>
      </Container>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const tHome = getT("home");
const tNav = getT("nav");
const stats = tHome.raw("heroStats") as { k: string; v: string }[];

  return (
    <div className="relative overflow-hidden">
      <ParallaxGlow />
      <Container className="relative py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <Reveal>
              <Pill>{tHome("heroPill")}</Pill>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                AviNation <span className="text-gold">Türkiye</span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                {tHome("heroSubtitle")}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={`/${locale}/founding`}
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gold px-5 py-3 text-sm font-semibold text-navy shadow-glow transition hover:brightness-105"
                >
                  {tHome("foundingCta")}{" "}
                  <span className="transition group-hover:translate-x-0.5">→</span>
                </Link>

                <Link
                  href={`/${locale}/ulusal-model`}
                  className="inline-flex items-center justify-center rounded-2xl border border-gold/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:border-gold/55 hover:bg-white/8"
                >
                  {tNav("ulusalModel")}
                </Link>

                <Link
                  href={`/${locale}/about`}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gold/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:border-gold/55 hover:bg-white/8"
                >
                  {tHome("whatIs")} <span className="opacity-70">↗</span>
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
                {stats.map((s) => (
                  <div key={s.k} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-lg font-semibold text-white">{s.k}</div>
                    <div className="mt-1 text-xs leading-relaxed text-white/65">{s.v}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="relative">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft"
            >
              <div className="text-sm font-semibold text-white/90">{tHome("heroTitle")}</div>
              <div className="mt-3 text-sm leading-relaxed text-white/70">
                {tHome("metaDescription")}
              </div>
              <div className="mt-6 flex gap-3">
                <Link
                  href={`/${locale}/clubs`}
                  className="rounded-xl border border-gold/30 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 hover:border-gold/55"
                >
                  {tHome("ctaPrimary")}
                </Link>
                <Link
                  href={`/${locale}/apply`}
                  className="rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-navy hover:brightness-105"
                >
                  {tHome("ctaSecondary")}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export function Manifesto() {
  const t = getT("landing.sections");
return (
    <Container className="py-14 sm:py-18">
      <Reveal>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{t("whyTitle")}</h2>
      </Reveal>
      <p className="mt-4 max-w-3xl leading-relaxed text-white/75">
        {useTranslations("home")("heroSubtitle")}
      </p>
    </Container>
  );
}

export function Features() {
  const tLanding = getT("landing");
const features = tLanding.raw("features") as { title: string; desc: string }[];
  return (
    <Container className="py-14 sm:py-18">
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-lg font-semibold">{f.title}</div>
            <p className="mt-3 text-sm leading-relaxed text-white/70">{f.desc}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}

export function Model() {
  const t = getT("landing.sections");
const steps = useTranslations("landing").raw("steps") as { n: string; title: string; desc: string }[];

  return (
    <Container className="py-14 sm:py-18">
      <Reveal>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{t("howTitle")}</h2>
      </Reveal>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs font-semibold tracking-widest text-gold/90">{s.n}</div>
            <div className="mt-2 text-lg font-semibold">{s.title}</div>
            <p className="mt-3 text-sm leading-relaxed text-white/70">{s.desc}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}

export function FoundingSection() {
  const t = getT("founding");
const tNav = getT("nav");
return (
    <Container className="py-14 sm:py-18">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10">
        <h3 className="text-2xl font-semibold tracking-tight">{t("title")}</h3>
        <p className="mt-4 max-w-3xl leading-relaxed text-white/75">{t("p1")}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href={`/${locale}/founding`} className="rounded-2xl bg-gold px-5 py-3 text-sm font-semibold text-navy">
            {tNav("apply")}
          </Link>
          <Link href={`/${locale}/clubs`} className="rounded-2xl border border-gold/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 hover:border-gold/55">
            {tNav("clubs")}
          </Link>
        </div>
      </div>
    </Container>
  );
}

export function ContactSection() {
  const t = getT("partners");
return (
    <Container className="py-14 sm:py-18">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10">
        <h3 className="text-2xl font-semibold tracking-tight">{t("title")}</h3>
        <p className="mt-4 max-w-3xl leading-relaxed text-white/75">{t("p1")}</p>
        <div className="mt-7">
          <a
            href="mailto:avinationturkiye@gmail.com"
            className="inline-flex items-center justify-center rounded-2xl bg-gold px-5 py-3 text-sm font-semibold text-navy hover:brightness-105"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </Container>
  );
}

export function Footer() {
  const tSite = getT("site");
const tNav = getT("nav");
return (
    <footer className="border-t border-white/5 py-10">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-sm font-semibold">{tSite("name")}</div>
          <div className="mt-1 text-xs text-white/60">{tSite("tagline")}</div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-white/70">
          <Link href={`/${locale}/clubs`} className="hover:text-white">{tNav("clubs")}</Link>
          <Link href={`/${locale}/ulusal-model`} className="hover:text-white">{tNav("ulusalModel")}</Link>
          <Link href={`/${locale}/partners`} className="hover:text-white">{tNav("partners")}</Link>
          <Link href={`/${locale}/about`} className="hover:text-white">{tNav("about")}</Link>
        </div>
      </Container>
    </footer>
  );
}
