"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getT } from "@/lib/t";

type Msg = { role: "user" | "assistant"; text: string };

export default function AIAssistant() {  const locale = "tr";
  const t = getT("ai");
const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      text: t("greeting"),
    },
  ]);

  const listRef = useRef<HTMLDivElement | null>(null);
  const canSend = useMemo(() => input.trim().length > 0 && !busy, [input, busy]);

  useEffect(() => {
    // Scroll to bottom
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [open, msgs.length, busy]);

  // Reset greeting when locale changes
  useEffect(() => {
    setMsgs([{ role: "assistant", text: t("greeting") }]);
    setError(null);
    setInput("");
    setBusy(false);
  }, [locale, t]);

  async function send() {
    const q = input.trim();
    if (!q || busy) return;

    setError(null);
    setBusy(true);
    setInput("");
    setMsgs((m) => [...m, { role: "user", text: q }]);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: q, locale }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const code = data?.code as string | undefined;
        if (code === "EMPTY_MESSAGE") setError(t("error_empty"));
        else setError(data?.error || t("error_generic"));
        setBusy(false);
        return;
      }

      const text = (data?.text || "").toString();
      setMsgs((m) => [...m, { role: "assistant", text }]);
      setBusy(false);
    } catch {
      setError(t("error_generic"));
      setBusy(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-2xl border border-gold/30 bg-black/40 px-4 py-3 text-sm font-semibold text-white/90 backdrop-blur hover:border-gold/55"
        aria-label={t("title")}
      >
        <span className="h-2 w-2 rounded-full bg-gold" />
        {t("launcher")}
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 z-[60] w-[92vw] max-w-md overflow-hidden rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-soft">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="text-sm font-semibold text-white/90">{t("title")}</div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/10"
            >
              {t("close")}
            </button>
          </div>

          <div ref={listRef} className="max-h-[55vh] overflow-y-auto px-4 py-3">
            {msgs.map((m, i) => (
              <div key={i} className={"mb-3 flex " + (m.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={
                    "max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed " +
                    (m.role === "user" ? "bg-gold text-navy" : "bg-white/10 text-white/90")
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}

            {busy && (
              <div className="mb-3 flex justify-start">
                <div className="max-w-[85%] rounded-2xl bg-white/10 px-4 py-2 text-sm text-white/70">
                  …
                </div>
              </div>
            )}

            {error && (
              <div className="mt-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-100">
                {error}
              </div>
            )}
          </div>

          <div className="border-t border-white/10 p-3">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("placeholder")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") send();
                }}
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-gold/40"
              />
              <button
                onClick={send}
                disabled={!canSend}
                className="rounded-2xl bg-gold px-4 py-3 text-sm font-semibold text-navy disabled:opacity-50"
              >
                {t("send")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
