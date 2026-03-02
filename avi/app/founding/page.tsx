import type { Metadata } from "next";
import { getT } from "@/lib/t";
import { Container } from "@/components/ui";
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  ;
}): Promise<Metadata> {
  const locale = "tr";
  const t = getT("founding");
  return { title: t("metaTitle") };
}

export default async function FoundingPage({
  params,
}: {
  ;
}) {
  const locale = "tr";
  const t = getT("founding");
  const tNav = getT("nav");

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <div className="text-xs font-semibold tracking-widest text-gold/90">{t("kicker")}</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{t("title")}</h1>
        <p className="mt-5 max-w-3xl leading-relaxed text-white/75">{t("p1")}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/apply" className="rounded-2xl bg-gold px-5 py-3 text-sm font-semibold text-navy hover:brightness-105">
            {tNav("apply")}
          </Link>
          <Link href="/clubs" className="rounded-2xl border border-gold/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 hover:border-gold/55">
            {tNav("clubs")}
          </Link>
        </div>
      </Container>
    </div>
  );
}
