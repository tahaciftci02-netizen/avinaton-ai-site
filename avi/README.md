# AviNation Türkiye — Tier-1 Multi-Page (Next.js + Tailwind + Framer Motion)

Bu proje artik tek sayfa değil: `/about`, `/founding`, `/apply`, `/clubs`, `/downloads` sayfalari var.

## Kurulum
```bash
npm install
npm run dev
```

## AI Asistan (Mini‑RAG)
Sitede sağ altta "AI Asistan" bulunur. Cevaplar, site içeriğinden derlenmiş mini bilgi tabanına dayanır.

### Ortam değişkenleri
Local geliştirme için proje köküne `.env.local` ekle:

```
OPENAI_API_KEY=YOUR_KEY
# opsiyonel
OPENAI_MODEL=gpt-4.1-mini
```

Netlify'da da aynı değişkenleri **Site settings → Environment variables** kısmına eklemelisin.

## Deploy (Netlify)
- Build command: `npm run build`
- Publish directory: `.next`
- Netlify Next.js plugin: `@netlify/plugin-nextjs` (netlify.toml içinde hazir)

## E-posta
Başvuru sayfasindaki mail adresi:
`app/(site)/apply/form.tsx` içindeki varsayılan e-posta: `avinationturkiye@gmail.com`

## Dosyalar
PDF'ler `public/downloads` altinda.
