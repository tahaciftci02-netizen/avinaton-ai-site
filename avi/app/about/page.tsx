import { Container } from "@/components/ui";
import { getT } from "@/lib/t";
import type { Metadata } from "next";
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  ;
}): Promise<Metadata> {
  const locale = "tr";
  const t = getT("about");
  return { title: t("metaTitle") };
}

export default async function AboutPage({
  params,
}: {
  ;
}) {
  const locale = "tr";
  const t = getT("about");
  const tNav = getT("nav");

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <div className="text-xs font-semibold tracking-widest text-gold/90">AVINATION</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{t("title")}</h1>

        <div className="mt-6 max-w-3xl space-y-4 leading-relaxed text-white/75">
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
        </div>

        <div className="mt-10">
          <Link href="/" className="navLink">
            ← {tNav("home")}
          </Link>
        </div>
      </Container>
    </div>
  );
}
