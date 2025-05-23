# TUSKİLOG - TUS Uzmanlık Tercih Sistemi

AI destekli kişilik analizi ile Türkiye'de TUS'ta bulunan uzmanlık dalları arasından en uygun olanları öneren web uygulaması.

## 🎯 Proje Durumu

### ✅ Tamamlanan Özellikler
- **Tam Test Sistemi**: 39 soru, 12 modül
- **AI Analizi**: OpenAI GPT-4o ile kişiselleştirilmiş uzmanlık önerileri
- **PDF Export**: Profesyonel rapor indirme
- **Authentication**: NextAuth.js ile e-posta tabanlı giriş
- **Database**: Supabase entegrasyonu hazır
- **Responsive Design**: Mobil ve desktop uyumlu
- **Processing Animation**: İnteraktif AI analiz süreciği

### 🔧 Teknoloji Stack
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: Supabase (PostgreSQL)
- **AI**: OpenAI GPT-4o
- **PDF**: jsPDF + html2canvas
- **Deployment**: Vercel

## 🚀 Kurulum

### 1. Projeyi Klonlayın
```bash
git clone https://github.com/[username]/tuskilog.git
cd tuskilog
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Environment Variables
`.env.local` dosyasını oluşturun:
```env
# OpenAI
OPENAI_API_KEY=your_openai_api_key

# NextAuth.js
NEXTAUTH_SECRET=your_random_secret
NEXTAUTH_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Email (Gmail önerilen)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your_email@gmail.com
EMAIL_SERVER_PASSWORD=your_app_password
EMAIL_FROM=noreply@tuskilog.com
```

### 4. Supabase Setup
1. [Supabase](https://supabase.com) hesabı oluşturun
2. Yeni proje oluşturun
3. `supabase/schema.sql` dosyasını SQL Editor'de çalıştırın
4. API keys'leri `.env.local`'a ekleyin

### 5. Development Server
```bash
npm run dev
```

## 📦 Deployment (Vercel)

### 1. Vercel Setup
```bash
npm install -g vercel
vercel login
```

### 2. Environment Variables
Vercel dashboard'da tüm environment variables'ları ekleyin.

### 3. Deploy
```bash
vercel --prod
```

## 🔧 Production Checklist

### Gerekli Servisler
- [ ] **OpenAI API Key**: GPT-4o erişimi
- [ ] **Supabase Projesi**: Database ve authentication
- [ ] **Email Provider**: Gmail/SMTP sunucusu
- [ ] **Domain**: Custom domain (opsiyonel)

### Environment Variables
- [ ] `OPENAI_API_KEY`
- [ ] `NEXTAUTH_SECRET` (random string)
- [ ] `NEXTAUTH_URL` (production URL)
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Email konfigürasyonu

## 📊 Sistem Özellikleri

### Test Modülleri
1. **Değerler** (Multi-select)
2. **Düşünme Tarzı** (Likert 1-5)
3. **Çalışma Tarzı** (Likert 1-5)
4. **İletişim** (Likert 1-5)
5. **Motivasyon** (Likert 1-5)
6. **Beceriler** (Likert 1-5)
7. **Yaşam Tarzı** (Likert 1-5)
8. **MBTI-EI** (Multiple choice)
9. **MBTI-SN** (Multiple choice)
10. **MBTI-TF** (Multiple choice)
11. **MBTI-JP** (Multiple choice)
12. **Klinik Tercihler** (Binary A/B)

### AI Analiz Süreci
1. Test tamamlama
2. Data collection (39 soru)
3. OpenAI GPT-4o analizi
4. 45 TUS uzmanlık dalı değerlendirmesi
5. Kişiselleştirilmiş sonuçlar
6. PDF rapor oluşturma

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı ile lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📧 İletişim

Proje Sahibi - [@username](https://github.com/username)
Proje Linki: [https://github.com/username/tuskilog](https://github.com/username/tuskilog)
