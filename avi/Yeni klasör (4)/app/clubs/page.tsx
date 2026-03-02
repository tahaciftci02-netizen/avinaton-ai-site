import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/ui";
import Link from 'next/link';
import { clubs, invitations } from "@/lib/clubs";

export async function generateMetadata({
  params,
}: {
  ;
}): Promise<Metadata> {
  const locale = "tr";
  const t = getT("clubs");
  return { title: t("metaTitle") };
}

export default async function ClubsPage({
  params,
}: {
  ;
}) {
  const locale = "tr";
  const t = getT("clubs");

  const all = [
    ...clubs.map((c) => ({ kind: "club" as const, ...c })),
    ...invitations.map((x) => ({ kind: "invitation" as const, ...x })),
  ].sort((a, b) => a.slot - b.slot);

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <div className="text-xs font-semibold tracking-widest text-gold/90">{t("kicker")}</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{t("title")}</h1>
        <p className="mt-5 max-w-3xl leading-relaxed text-white/75">{t("intro")}</p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {all.map((c) => (
            <Link
              key={c.slug}
              href={`/clubs/${c.slug}` as any}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-gold/35 hover:bg-white/8"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-1">
                  <Image src={c.logo} alt={c.name} width={80} height={80} className="h-full w-full object-contain" />
                </div>
                <div className="min-w-0">
                  <div className="truncate text-base font-semibold">{c.name}</div>
                  <div className="mt-1 truncate text-xs text-white/60">{c.uni}{c.city ? ` • ${c.city}` : ""}</div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="rounded-full border border-gold/25 bg-black/20 px-3 py-1 text-xs font-semibold text-gold/90">
                  {c.kind === "invitation" ? t("invitedBadge") : t("memberBadge")}
                </span>
                <span className="text-xs font-semibold text-white/70 group-hover:text-white">{t("visit")} →</span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
