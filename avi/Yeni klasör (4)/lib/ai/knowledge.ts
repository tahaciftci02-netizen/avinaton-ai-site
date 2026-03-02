export type KnowledgeChunk = {
  id: string;
  title: string;
  url: string;
  text: string;
};

// Mini-RAG bilgi tabanı: kısa, bakımı kolay ve “site içeriğine dayalı” cevap için yeterli.
// İstersen ileride bunu otomatik içerik tarama + embeddings (vektör arama) ile büyütebilirsin.
export const KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: "about-what",
    title: "AviNation Türkiye nedir?",
    url: "/about",
    text:
      "AviNation Türkiye, üniversite havacılık öğrenci topluluklarını bir araya getiren ulusal bir koordinasyon ağıdır. Kulüpler bağımsız kalır; AviNation bir üst yönetim değil, ortak standart ve ortak görünürlük sağlayan bir koordinasyon modelidir. Amaç: ulusal ağ algısı ile sponsor ve sektör iletişiminde etkiyi artırmak.",
  },
  {
    id: "about-pillars",
    title: "Temel ilkeler",
    url: "/about",
    text:
      "Modelin üç ana vurgusu: (1) Bağımsızlık: karar mekanizması kulüpte kalır. (2) Standart: duyuru/afiş yerleşimi/üyelik ibareleri tek kalite standardında ilerler. (3) Algı: tek tek kulüpler yerine ulusal ağ algısı oluşur.",
  },
  {
    id: "apply",
    title: "Kulüp başvurusu",
    url: "/apply",
    text:
      "Kulübünü AviNation Türkiye ağına dahil etmek için başvuru sayfasını kullanabilirsin. Genel süreç: kulüp bilgileri ve iletişim → kısa değerlendirme → standartların paylaşımı → ağ içerisinde görünürlük ve koordinasyon. Detaylar için Başvur sayfasına yönlendirilir.",
  },
  {
    id: "clubs",
    title: "Kulüpler",
    url: "/clubs",
    text:
      "Kulüpler sayfasında ağa dahil olan üniversite havacılık toplulukları listelenir. Her kulübün kendi sayfasında özet, üniversite bilgisi ve varsa sosyal bağlantılar bulunur.",
  },
  {
    id: "partners",
    title: "Partnerlik ve sponsor iletişimi",
    url: "/partners",
    text:
      "Partnerlik sayfası, kurumlarla yapılabilecek iş birlikleri ve iletişim için giriş noktasıdır. Hedef; tek tek kulüpler yerine ulusal ağ algısı oluşturarak sektör iletişimini kolaylaştırmaktır.",
  },
  {
    id: "ulusal-model",
    title: "Ulusal Model",
    url: "/ulusal-model",
    text:
      "Ulusal Model, kulüplerin bağımsızlığını korurken ortak standartlar ve koordinasyonla daha sürdürülebilir ve görünür bir yapı kurmayı hedefler. Model; kalite standardı, kurumsal algı ve ortak iletişim prensipleri üzerine kurulur.",
  },
  {
    id: "founding",
    title: "Kuruluş ve yapı",
    url: "/founding",
    text:
      "Kuruluş sayfası; ağın amacı, yaklaşımı ve yapılanması hakkında genel çerçeve sunar. AviNation bir kulüp üst yönetimi değil, kulüpleri ortak hedeflerde hizalayan bir koordinasyon ağıdır.",
  },
];
