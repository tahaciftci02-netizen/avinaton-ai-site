import type { Metadata } from "next";
import { Container, Pill } from "@/components/ui";
import NationalModelSections from "./sections";

export async function generateMetadata({
  params,
}: {
  ;
}): Promise<Metadata> {
  const locale = "tr";
  const t = getT("ulusalModel");
  return { title: t("metaTitle") };
}

export default async function UlusalModelPage({
  params,
}: {
  ;
}) {
  const locale = "tr";
  const t = getT("ulusalModel");

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <Pill>{t("pill")}</Pill>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{t("title")}</h1>
        <p className="mt-5 max-w-3xl leading-relaxed text-white/75">{t("subtitle")}</p>

        <NationalModelSections />

        <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="text-lg font-semibold">{t("faqTitle")}</div>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            {locale === "tr"
              ? "Soru eklemek istersen içerikleri messages dosyalarından genişletebiliriz."
              : "If you want to add FAQs, you can expand the content in the messages files."}
          </p>
        </div>
      </Container>
    </div>
  );
}
