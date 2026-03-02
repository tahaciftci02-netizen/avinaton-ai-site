import OpenAI from "openai";
import { retrieveTopChunks } from "@/lib/ai/retrieve";

export const runtime = "nodejs";

type ReqBody = {
  message?: string;
  locale?: "tr" | "en";
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ReqBody;
    const locale = body?.locale === "en" ? "en" : "tr";

    const message = (body?.message || "").toString().trim();
    if (!message) return json({ code: "EMPTY_MESSAGE" }, 400);

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return json(
        {
          code: "MISSING_OPENAI_KEY",
          error:
            locale === "tr"
              ? "Sunucu tarafında OPENAI_API_KEY tanımlı değil. Netlify/hosting ortam değişkenlerine ekle."
              : "OPENAI_API_KEY is not set on the server. Add it to your Netlify/hosting environment variables.",
        },
        500
      );
    }

    const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
    const client = new OpenAI({ apiKey });

    const chunks = retrieveTopChunks(message, 4);
    const context = chunks
      .map((c, i) => `[#${i + 1}] ${c.title} (${c.url})\n${c.text}`)
      .join("\n\n");

    const system =
      locale === "tr"
        ? [
            "Sen AviNation Türkiye web sitesinin yapay zeka asistanısın.",
            "Görevin: ziyaretçilerin sorularını kısa, net ve güvenilir şekilde Türkçe yanıtlamak.",
            "Öncelik: SADECE sağlanan site bağlamına dayan. Bağlamda yoksa uydurma;",
            "'Bu bilgi sitede yer almıyor' deyip ilgili sayfaya yönlendir.",
            "Cevap sonunda uygun olduğunda 1-3 madde halinde 'İlgili sayfalar' linklerini ver.",
          ].join(" ")
        : [
            "You are the AI assistant for the AviNation Türkiye website.",
            "Your task: answer visitor questions concisely, clearly, and reliably in English.",
            "Priority: rely ONLY on the provided site context. If the context doesn't contain the answer, do not invent it;",
            "say you can't find it on the site and point to the most relevant page.",
            "When helpful, end with 1–3 bullet links under 'Related pages'.",
          ].join(" ");

    const user =
      (locale === "tr" ? `Kullanıcı sorusu: ${message}` : `User question: ${message}`) +
      "\n\n" +
      (locale === "tr" ? "Site bağlamı (referans):\n" : "Site context (reference):\n") +
      (context || (locale === "tr" ? "(eşleşen içerik bulunamadı)" : "(no matching content found)"));

    const resp = await client.responses.create({
      model,
      input: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      max_output_tokens: 350,
    });

    const text = resp.output_text || "";
    return json({ text });
  } catch (err: any) {
    const msg = typeof err?.message === "string" ? err.message : "Unknown error";
    return json({ code: "UNHANDLED_ERROR", error: msg }, 500);
  }
}
