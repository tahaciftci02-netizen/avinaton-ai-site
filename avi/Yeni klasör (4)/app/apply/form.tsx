"use client";

import { useMemo, useState, type FormEvent } from "react";

const inputBase =
  "mt-2 w-full rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 shadow-inner focus:border-gold/45 focus:bg-white/7 focus:outline-none";

export default function ApplyForm() {
  const t = () => (key)=> key // dummy translator("applyForm");

  const [submitted, setSubmitted] = useState(false);
  const [agree, setAgree] = useState(false);

  const [university, setUniversity] = useState("");
  const [clubName, setClubName] = useState("");
  const [repName, setRepName] = useState("");
  const [repRole, setRepRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [advisor, setAdvisor] = useState("");
  const [motivation, setMotivation] = useState("");

  const isValid = useMemo(() => {
    return (
      university.trim().length > 1 &&
      clubName.trim().length > 1 &&
      repName.trim().length > 1 &&
      repRole.trim().length > 1 &&
      email.trim().length > 3 &&
      phone.trim().length > 3 &&
      motivation.trim().length > 10 &&
      agree
    );
  }, [university, clubName, repName, repRole, email, phone, motivation, agree]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    // TODO: connect to a real backend / Netlify forms if desired
    setSubmitted(true);
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
      <div className="kicker">{t("kicker")}</div>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight">{t("heading")}</h2>
      <p className="mt-3 text-white/70">{t("lead")}</p>

      {submitted && (
        <div className="mt-6 rounded-2xl border border-gold/30 bg-gold/10 p-4">
          <div className="font-semibold text-white/90">{t("submittedTitle")}</div>
          <div className="mt-1 text-sm text-white/70">{t("submittedText")}</div>
        </div>
      )}

      <form className="mt-8 grid gap-5" onSubmit={onSubmit}>
        <div>
          <label className="text-xs font-semibold tracking-wide text-white/75">{t("university")}</label>
          <input className={inputBase} value={university} onChange={(e) => setUniversity(e.target.value)} placeholder={t("universityPh")} />
        </div>

        <div>
          <label className="text-xs font-semibold tracking-wide text-white/75">{t("clubName")}</label>
          <input className={inputBase} value={clubName} onChange={(e) => setClubName(e.target.value)} placeholder={t("clubNamePh")} />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="text-xs font-semibold tracking-wide text-white/75">{t("repName")}</label>
            <input className={inputBase} value={repName} onChange={(e) => setRepName(e.target.value)} placeholder={t("repNamePh")} />
          </div>

          <div>
            <label className="text-xs font-semibold tracking-wide text-white/75">{t("repRole")}</label>
            <input className={inputBase} value={repRole} onChange={(e) => setRepRole(e.target.value)} placeholder={t("repRolePh")} />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="text-xs font-semibold tracking-wide text-white/75">{t("email")}</label>
            <input className={inputBase} value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("emailPh")} />
          </div>

          <div>
            <label className="text-xs font-semibold tracking-wide text-white/75">{t("phone")}</label>
            <input className={inputBase} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t("phonePh")} />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="text-xs font-semibold tracking-wide text-white/75">{t("linkedin")}</label>
            <input className={inputBase} value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder={t("linkedinPh")} />
          </div>

          <div>
            <label className="text-xs font-semibold tracking-wide text-white/75">{t("advisor")}</label>
            <input className={inputBase} value={advisor} onChange={(e) => setAdvisor(e.target.value)} placeholder={t("advisorPh")} />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold tracking-wide text-white/75">{t("motivation")}</label>
          <textarea
            className={inputBase + " min-h-[130px] resize-y"}
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            placeholder={t("motivationPh")}
          />
        </div>

        <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/10 p-4 text-sm text-white/75">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 accent-gold"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <span>{t("consent")}</span>
        </label>

        {!isValid && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {t("invalid")}
          </div>
        )}

        <button
          type="submit"
          disabled={!isValid}
          className="rounded-2xl bg-gold px-5 py-3 text-sm font-semibold text-navy disabled:opacity-50"
        >
          {t("submit")}
        </button>
      </form>
    </div>
  );
}
