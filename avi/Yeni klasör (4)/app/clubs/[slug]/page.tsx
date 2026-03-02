import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui";
import Link from 'next/link';
import { getClub, clubs } from "@/lib/clubs";

export const dynamicParams = false;

export function generateStaticParams() {
  const locales: Locale[] = ["tr", "en"];
  return locales.flatMap((locale) => clubs.map((c) => ({ locale, slug: c.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const locale = "tr";
  const t = getT("club");
  const club = getClub(params.slug);
  if (!club) return { title: t("metaTitle") };
  return { title: `${club.name} | ${t("metaTitle")}` };
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/10 py-3 text-sm">
      <div className="text-white/60">{label}</div>
      <div className="text-right font-semibold text-white/90">{value}</div>
    </div>
  );
}

export default async function ClubProfilePage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const locale = "tr";
  const t = getT("club");
  const tClubs = getT("clubs");

  const club = getClub(params.slug);
  if (!club) return notFound();

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <div className="mb-8">
          <Link href="/clubs" className="navLink">
            ← {t("back")}
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-9">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-1">
                <Image src={club.logo} alt={club.name} width={96} height={96} className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0">
                <div className="text-2xl font-semibold tracking-tight">{club.name}</div>
                <div className="mt-1 text-sm text-white/70">
                  {club.uni}
                  {club.city ? ` • ${club.city}` : ""}
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-2 text-sm leading-relaxed text-white/75">
              {club.description ? <p>{club.description}</p> : null}
              {club.focus ? <p>{club.focus}</p> : null}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-9">
            <div className="text-xs font-semibold tracking-widest text-gold/90">{tClubs("kicker")}</div>
            <div className="mt-2 text-lg font-semibold">{t("contactTitle")}</div>

            <div className="mt-4">
              <InfoRow label={t("labels.university")} value={club.uni} />
              <InfoRow label={t("labels.city")} value={club.city} />
              <InfoRow label={t("labels.email")} value={club.email} />
            </div>

            <div className="mt-6 flex flex-col gap-2">
              {club.website ? (
                <a className="navLink" href={club.website} target="_blank" rel="noreferrer">
                  {t("website")} ↗
                </a>
              ) : null}
              {club.instagram ? (
                <a className="navLink" href={club.instagram} target="_blank" rel="noreferrer">
                  {t("instagram")} ↗
                </a>
              ) : null}
              {club.linkedin ? (
                <a className="navLink" href={club.linkedin} target="_blank" rel="noreferrer">
                  {t("linkedin")} ↗
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
