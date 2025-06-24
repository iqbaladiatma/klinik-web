# 🚀 Panduan Deployment Klinik MMC Blora

## 📋 Persiapan Sebelum Deploy

### 1. Optimasi Website
```bash
# Jalankan build script untuk optimasi
python build.py

# Atau gunakan versi optimized langsung
# File yang sudah dioptimalkan:
# - index-optimized.html
# - css/style-optimized.css  
# - js/script-optimized.js
```

### 2. Struktur File untuk Deploy
```
klinik_mmc_blora_website/
├── index.html (atau index-optimized.html)
├── tentang-kami.html
├── layanan.html
├── tim-dokter.html
├── kontak.html
├── mmc-skincare.html
├── css/
│   └── style-optimized.css
├── js/
│   └── script-optimized.js
├── vercel.json
├── netlify.toml
└── README.md
```

## 🌐 Deployment ke Vercel

### Metode 1: Drag & Drop (Paling Mudah)
1. Buka [vercel.com](https://vercel.com)
2. Sign up/Login dengan GitHub, GitLab, atau Bitbucket
3. Klik **"New Project"**
4. Pilih **"Browse All Templates"** → **"Other"** → **"Upload"**
5. Drag & drop folder website atau pilih **"select it"**
6. Tunggu proses upload dan deployment
7. Website live di: `https://your-project-name.vercel.app`

### Metode 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd klinik_mmc_blora_website
vercel

# Follow prompts:
# ? Set up and deploy? [Y/n] y
# ? Which scope? your-username
# ? Link to existing project? [y/N] n
# ? What's your project's name? klinik-mmc-blora
# ? In which directory is your code located? ./
```

### Metode 3: GitHub Integration
1. Push code ke GitHub repository
2. Di Vercel dashboard, klik **"New Project"**
3. Import dari GitHub repository
4. Configure build settings (optional)
5. Deploy

## 🎯 Deployment ke Netlify

### Metode 1: Drag & Drop (Termudah)
1. Buka [netlify.com](https://netlify.com)
2. Sign up/Login
3. Drag & drop folder website ke area **"Want to deploy a new site without connecting to Git?"**
4. Tunggu proses deployment
5. Website live di: `https://random-name.netlify.app`
6. Bisa custom domain di **Site Settings** → **Domain Management**

### Metode 2: Git Integration
1. Push code ke GitHub/GitLab/Bitbucket
2. Di Netlify dashboard: **"New site from Git"**
3. Choose Git provider dan authorize
4. Select repository
5. Configure build settings:
   - Build command: (kosongkan atau `python build.py`)
   - Publish directory: `./` atau `dist/`
6. Deploy site

### Metode 3: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd klinik_mmc_blora_website
netlify deploy

# Deploy to production
netlify deploy --prod
```

## ⚙️ Konfigurasi Domain Custom

### Vercel
1. Di dashboard project → **Settings** → **Domains**
2. Add domain (contoh: `www.mmcblora.com`)
3. Configure DNS di provider domain:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### Netlify
1. Di site dashboard → **Domain settings**
2. Add custom domain
3. Configure DNS:
   ```
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```

## 🎯 Optimasi SEO & Performance

### 1. File yang Sudah Dioptimalkan
- ✅ Minified CSS & JavaScript
- ✅ Optimized images (WebP format recommended)
- ✅ Lazy loading untuk gambar
- ✅ Critical CSS inlined
- ✅ Meta tags untuk SEO

### 2. Rekomendasi Tambahan
```html
<!-- Tambahkan di <head> untuk SEO lokal -->
<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "MedicalOrganization",
  "name": "Klinik MMC Blora",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jl. Pemuda No. 123",
    "addressLocality": "Blora",
    "addressRegion": "Jawa Tengah",
    "postalCode": "58211",
    "addressCountry": "ID"
  },
  "telephone": "+62-296-123-4567",
  "url": "https://mmcblora.com"
}
</script>
```

## 📊 Monitoring & Analytics

### Google Analytics 4
```html
<!-- Tambahkan sebelum </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Google Search Console
1. Verify ownership via HTML tag
2. Submit sitemap: `https://yourdomain.com/sitemap.xml`

## 🔧 Tips Performance

### 1. Compress Images
```bash
# Gunakan tools online:
# - TinyPNG.com
# - Squoosh.app
# - ImageOptim
```

### 2. Enable Gzip Compression
Sudah dikonfigurasi di `netlify.toml` dan `vercel.json`

### 3. CDN untuk Font Awesome
```html
<!-- Ganti dengan CDN yang lebih cepat -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.0.0/css/all.min.css">
```

## 🚀 Quick Deploy Commands

### Deploy ke Vercel (One-liner)
```bash
npx vercel --prod
```

### Deploy ke Netlify (One-liner)
```bash
npx netlify-cli deploy --prod --dir=.
```

## 📱 Testing Sebelum Deploy

### 1. Local Testing
```bash
# Jalankan local server
python server.py
# Test di http://localhost:8000/index-optimized.html
```

### 2. WhatsApp Integration Testing
- ✅ Semua tombol "Konsultasi" mengarah ke WhatsApp
- ✅ Nomor WhatsApp: +62 812-3456-7890
- ✅ Pesan otomatis untuk konsultasi
- ✅ Responsive di mobile dan desktop

### 2. Performance Testing
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://webpagetest.org/)

### 3. Mobile Testing
- Chrome DevTools (Device simulation)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

## 🎯 Checklist Deploy

- [ ] Versi optimized sudah siap
- [ ] Semua link internal sudah benar
- [ ] Images loading dengan lazy loading
- [ ] Meta tags untuk SEO sudah lengkap
- [ ] Contact forms sudah berfungsi
- [ ] WhatsApp integration sudah benar
- [ ] Responsive di semua device
- [ ] Performance score > 90
- [ ] Domain custom sudah dikonfigurasi (optional)

## 🆘 Troubleshooting

### Issue: CSS/JS tidak load
**Solusi**: Pastikan path relatif benar di HTML

### Issue: Images tidak muncul
**Solusi**: Periksa CORS policy atau gunakan CDN

### Issue: Font Awesome tidak load
**Solusi**: Gunakan CDN atau host locally

### Issue: WhatsApp link tidak berfungsi
**Solusi**: Pastikan format nomor telepon benar

## 📞 Support

Jika ada masalah deployment:
1. Check build logs di Vercel/Netlify dashboard
2. Test locally terlebih dahulu
3. Periksa konfigurasi DNS jika menggunakan custom domain

---

**Selamat! Website Klinik MMC Blora siap online! 🎉**