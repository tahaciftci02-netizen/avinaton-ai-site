import { KNOWLEDGE_BASE, type KnowledgeChunk } from "./knowledge";

function normalize(s: string) {
  return (s || "")
    .toLowerCase()
    .replace(/[\u00C7]/g, "ç")
    .replace(/[\u011E]/g, "ğ")
    .replace(/[\u0130]/g, "i")
    .replace(/[\u00D6]/g, "ö")
    .replace(/[\u015E]/g, "ş")
    .replace(/[\u00DC]/g, "ü")
    .replace(/[^a-z0-9çğıöşü\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(s: string) {
  const t = normalize(s)
    .split(" ")
    .filter(Boolean)
    .filter((w) => w.length >= 2);

  // Basit bigram ekleyerek arama kalitesini biraz artırıyoruz.
  const bigrams: string[] = [];
  for (let i = 0; i < t.length - 1; i++) bigrams.push(`${t[i]} ${t[i + 1]}`);
  return { t, bigrams };
}

export function retrieveTopChunks(query: string, k = 4): KnowledgeChunk[] {
  const q = tokens(query);
  const qset = new Set([...q.t, ...q.bigrams]);

  const scored = KNOWLEDGE_BASE.map((c) => {
    const ct = tokens(`${c.title} ${c.text}`);
    const cset = new Set([...ct.t, ...ct.bigrams]);
    let overlap = 0;
    for (const w of qset) if (cset.has(w)) overlap += w.includes(" ") ? 2 : 1;

    // Kısa metinlerde biraz denge: başlık eşleşmesine küçük bonus
    const titleBonus = normalize(c.title).includes(normalize(query)) ? 2 : 0;
    return { c, score: overlap + titleBonus };
  })
    .sort((a, b) => b.score - a.score)
    .filter((x) => x.score > 0);

  return scored.slice(0, Math.max(1, k)).map((x) => x.c);
}
