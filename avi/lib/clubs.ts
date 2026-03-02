export type ClubProfile = {
  slug: string;
  slot: number;
  name: string;
  uni: string;
  city?: string;
  foundedYear?: number;

  // Public-facing leadership (safe to share externally)
  advisor?: string;
  president?: string;
  vicePresident?: string;

  // Public contacts
  email?: string;
  website?: string;

  logo: string;
  status: "founding" | "verified" | "invitation";

  // Public descriptions
  shortBio: string;
  longBio: string;
  mission?: string;
  vision?: string;

  // Public-facing structure (no internal ops)
  departments?: { name: string; bullets: string[] }[];
  plannedEvents?: { title: string; note: string; description: string }[];

  highlights: { label: string; value: string }[];
  socials: { label: string; href: string }[];
};

export const clubs: ClubProfile[] = [
  {
    slug: "robotik-kodlama-ve-havacilik-kulubu",
    slot: 1,
    name: "Robotik Kodlama ve Havacılık Kulübü",
    uni: "İstanbul Esenyurt Üniversitesi",
    city: "İstanbul",
    foundedYear: 2024,

    advisor: "Aysel Merve Kuş",
    president: "Taha Çiftçi",
    vicePresident: "Gökhan Alabey",

    email: "havacilikta.robotik1@gmail.com",
    website: "https://robotikhavacilik.com",

    logo: "/clubs/robotik-kodlama-havacilik.png",
    status: "founding",

    shortBio:
      "Havacılık ve robotik kodlamayı aynı pistte buluşturan; atölyeler, teknik geziler ve proje ekipleriyle üretime odaklanan öğrenci topluluğu.",
    longBio:
      "Robotik Kodlama ve Havacılık Kulübü, İstanbul Esenyurt Üniversitesi’nde; havacılık tutkusunu yazılım, kodlama ve mühendislikle birleştiren öğrenci topluluğudur. Amacı, havacılık alanında kariyer hedefleyen öğrencilerin teknik, sosyal ve mesleki gelişimine katkı sunmak; bunu yaparken kodlama, elektronik, otomasyon ve veri analitiği disiplinlerini havacılık uygulamalarıyla buluşturmaktır. Kulüp; teknik geziler, uygulamalı atölyeler, yarışma hazırlıkları ve proje ekipleriyle sürdürülebilir bir üretim kültürü oluşturur. AviNation Founding Circle içinde, ulusal duyuru standardı ve ortak görünürlük modelinin ilk uygulayıcı kulüplerinden biridir.",
    mission:
      "Havacılık alanında kariyer hedefleyen öğrencilerin teknik ve mesleki gelişimine katkı sunmak; kodlama, elektronik, otomasyon ve veri analitiğini havacılık uygulamalarıyla buluşturmak.",
    vision:
      "Modern mühendislik ve robotik sistemlerle; havacılıkta sürdürülebilir, güvenli ve yenilikçi çözümler üreten bir öğrenci ekosistemi kurmak ve üniversiteyi ulusal/uluslararası organizasyonlarda görünür kılmak.",

    departments: [
      {
        name: "Etkinlik Departmanı",
        bullets: [
          "Teknik gezi, atölye, söyleşi ve kampüs içi etkinlik planlama",
          "Alan/Salon rezervasyonları ve etkinlik günü saha yönetimi",
          "Konuk konuşmacı ve eğitmen koordinasyonu",
        ],
      },
      {
        name: "Kurumsal İletişim Departmanı",
        bullets: [
          "Üniversite birimleri ve dış kurumlarla resmî iletişim",
          "İzin/başvuru süreçlerinin takibi",
          "Sponsorluk ve kurum iş birliği görüşmeleri",
        ],
      },
      {
        name: "Sosyal Medya Departmanı",
        bullets: [
          "Duyuru ve içerik dili yönetimi (post/story/reels)",
          "Afiş ve görsel tasarım süreçleri",
          "Etkinlik sonrası fotoğraf/video içerikleri",
        ],
      },
      {
        name: "İnsan Kaynakları Departmanı",
        bullets: [
          "Üye kazanımı ve departman yönlendirme",
          "Aktiflik takibi ve kulüp içi iletişim",
          "Gönüllü yönetimi ve geri bildirim akışı",
        ],
      },
    ],

    plannedEvents: [
      {
        title: "İGA Teknik Gezisi – Havacılığın Kalbine Yolculuk",
        note: "Yakında duyurulacak • Kontenjan sınırlı",
        description:
          "İstanbul Havalimanı (İGA) operasyon alanları, apron yönetimi ve teknik sistemleri yerinde incelemek üzere planlanan teknik gezi.",
      },
      {
        title: "Robotik Kodlama Atölyeleri – Temelden Uygulamaya",
        note: "Coming Soon • Kampüs içi uygulamalı oturumlar",
        description:
          "Python, temel algoritmalar, sensör kullanımı ve basit otonom sistemler üzerine uygulamalı workshop serisi.",
      },
      {
        title: "Sektör Söyleşileri – Pilot, Mühendis ve Uzmanlarla Buluşma",
        note: "Planlama aşamasında",
        description:
          "Havayolu, bakım kuruluşları ve teknoloji firmalarından konuklarla kariyer yolları, staj imkânları ve sektör beklentileri üzerine oturumlar.",
      },
    ],

    highlights: [
      { label: "Statü", value: "Founding Circle" },
      { label: "Odak", value: "Havacılık • Robotik • Topluluk" },
      { label: "Model", value: "Eğitim + Atölye + Proje" },
      { label: "Şehir", value: "İstanbul" },
    ],

    socials: [
      { label: "Instagram", href: "https://www.instagram.com/iesu.robotikkodlama/" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/havacilikrobotik/" },
      { label: "Web", href: "https://robotikhavacilik.com" },
    ],
  },
];

export function getClub(slug: string) {
  return clubs.find((c) => c.slug === slug);
}

export const invitations = Array.from({ length: 8 }).map((_, i) => ({
  slug: `invitation-${i + 2}`,
  slot: i + 2,
}));
