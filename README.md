# Website Klinik MMC Blora

Website profil perusahaan untuk Klinik MMC Blora dengan desain modern, bersih, dan profesional.

## 🎨 Desain

- **Warna Primer**: Ungu (#6A0DAD)
- **Warna Sekunder**: Putih dan Abu-abu muda
- **Tema**: Modern, bersih, dan profesional
- **Responsif**: Desktop, tablet, dan mobile

## 📱 Halaman Website

### Halaman Utama
1. **Beranda** (`index.html`) - Halaman utama dengan hero section dan overview layanan
2. **Tentang Kami** (`tentang-kami.html`) - Sejarah, visi misi, nilai-nilai, dan fasilitas
3. **Layanan** (`layanan.html`) - Daftar lengkap layanan medis dan paket kesehatan
4. **Tim Dokter** (`tim-dokter.html`) - Profil dokter spesialis dan umum
5. **Kontak** (`kontak.html`) - Informasi kontak, form, peta, dan FAQ

### Halaman Khusus
6. **MMC Skincare** (`mmc-skincare.html`) - Layanan skincare dengan sub-menu:
   - Produk skincare premium
   - Perawatan kecantikan

## ✨ Fitur Utama

### Fitur Umum
- **Navigasi Responsif** dengan dropdown menu
- **Contact Float** - Informasi kontak mengambang di setiap halaman
- **Call-to-Action** - Tombol "Konsultasi" yang mengarah ke WhatsApp di semua halaman
- **Smooth Scrolling** dan animasi fade-in
- **Mobile-first Design**

### Fitur Khusus
- **Hero Section** dengan gambar berkualitas tinggi dari Unsplash
- **Service Cards** dengan ikon Font Awesome
- **Doctor Profiles** dengan foto dan jadwal praktik
- **Treatment Gallery** untuk MMC Skincare
- **Product Showcase** dengan fitur tags
- **Testimonials** dari pelanggan
- **Interactive Contact Form** dengan validasi
- **FAQ Accordion** yang dapat diklik
- **Google Maps** integration
- **WhatsApp Integration** untuk konsultasi langsung
- **Smart Consultation System** dengan pesan otomatis berbeda per layanan

## 🛠️ Teknologi

- **HTML5** - Struktur semantik
- **CSS3** - Modern styling dengan Flexbox dan Grid
- **JavaScript** - Interaktivitas dan animasi
- **Font Awesome 6** - Ikon modern
- **Google Fonts** - Tipografi (Segoe UI fallback)
- **Unsplash Images** - Gambar berkualitas tinggi

## 📁 Struktur Folder

```
klinik_mmc_blora_website/
├── index.html              # Halaman beranda
├── tentang-kami.html       # Halaman tentang kami
├── layanan.html           # Halaman layanan
├── tim-dokter.html        # Halaman tim dokter
├── kontak.html            # Halaman kontak
├── mmc-skincare.html      # Halaman MMC Skincare
├── css/
│   └── style.css          # File CSS utama
├── js/
│   └── script.js          # File JavaScript utama
├── server.py              # Server Python untuk development
└── README.md              # Dokumentasi ini
```

## 🚀 Cara Menjalankan

### Metode 1: Python Server (Recommended)
```bash
cd klinik_mmc_blora_website
python server.py
```
Website akan terbuka di `http://localhost:8000`

### Metode 2: Live Server Extension (VS Code)
1. Install "Live Server" extension di VS Code
2. Right-click pada `index.html`
3. Pilih "Open with Live Server"

### Metode 3: Akses Langsung
Buka file `index.html` langsung di browser (beberapa fitur mungkin tidak berfungsi optimal)

## 📱 Responsive Design

Website ini didesain dengan pendekatan mobile-first dan responsif untuk:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (< 768px)

## 🎯 Call to Action

Setiap halaman dilengkapi dengan:
- **Floating Contact Info** di kanan bawah
- **Tombol "Buat Janji Temu"** yang terintegrasi dengan WhatsApp
- **Quick Contact** di header dan footer
- **Emergency Contact** untuk layanan darurat

## 📞 Informasi Kontak

- **Telepon**: (0296) 123-4567
- **WhatsApp**: 0812-3456-7890
- **Email**: info@mmcblora.com
- **Alamat**: Jl. Pemuda No. 123, Blora, Jawa Tengah

## 🔧 Kustomisasi

### Mengubah Warna
Edit variabel CSS di `css/style.css`:
```css
:root {
    --primary-color: #6A0DAD;  /* Warna primer */
    --primary-light: #8A4FBE;  /* Warna primer terang */
    --primary-dark: #4A0877;   /* Warna primer gelap */
}
```

### Mengubah Konten
1. Edit file HTML sesuai kebutuhan
2. Ganti gambar dari Unsplash dengan gambar lokal jika diperlukan
3. Update informasi kontak di semua halaman

### Menambah Halaman
1. Buat file HTML baru
2. Tambahkan link di navigasi (`nav-menu`)
3. Update footer links jika diperlukan

## 📈 SEO Ready

Website ini sudah dioptimalkan untuk SEO dengan:
- **Meta tags** yang sesuai
- **Semantic HTML** structure
- **Alt text** untuk semua gambar
- **Structured navigation**
- **Mobile-friendly** design

## 🔒 Keamanan

- **Form validation** pada contact form
- **Sanitized inputs** untuk mencegah XSS
- **No inline scripts** untuk keamanan CSP

## 📊 Performance

- **Optimized images** dari Unsplash dengan parameter kualitas
- **Minified CSS** dan clean code structure
- **Lazy loading** ready (dapat diimplementasikan)
- **Efficient JavaScript** dengan event delegation

---

**Dibuat dengan ❤️ untuk Klinik MMC Blora**

*Website profesional untuk layanan kesehatan terpercaya*