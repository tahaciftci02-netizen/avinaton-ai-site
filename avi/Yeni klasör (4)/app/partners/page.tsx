import type { Metadata } from "next";
import { Container } from "@/components/ui";

export async function generateMetadata({
  params,
}: {
  ;
}): Promise<Metadata> {
  const locale = "tr";
  const t = getT("partners");
  return { title: t("metaTitle") };
}

export default async function PartnersPage({
  params,
}: {
  ;
}) {
  const locale = "tr";
  const t = getT("partners");

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("title")}</h1>
        <p className="mt-5 max-w-3xl leading-relaxed text-white/75">{t("p1")}</p>

        <div className="mt-10">
          <a href="mailto:avinationturkiye@gmail.com" className="rounded-2xl bg-gold px-5 py-3 text-sm font-semibold text-navy hover:brightness-105">
            {t("cta")}
          </a>
        </div>
      </Container>
    </div>
  );
}
