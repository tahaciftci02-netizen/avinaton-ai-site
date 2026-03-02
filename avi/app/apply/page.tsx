import type { Metadata } from "next";
import { getT } from "@/lib/t";
import { Container } from "@/components/ui";
import ApplyForm from "./form";

export async function generateMetadata({
  params,
}: {
  ;
}): Promise<Metadata> {
  const locale = "tr";
  const t = getT("apply");
  return { title: t("metaTitle") };
}

export default async function ApplyPage({
  params,
}: {
  ;
}) {
  const locale = "tr";
  const t = getT("apply");

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("title")}</h1>
        <p className="mt-4 max-w-3xl text-white/70">{t("subtitle")}</p>

        <div className="mt-10">
          <ApplyForm />
        </div>
      </Container>
    </div>
  );
}
