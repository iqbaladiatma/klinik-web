@echo off
echo 🚀 Mempersiapkan deployment Klinik MMC Blora...
echo.

echo 📦 Membuat build optimized...
python build.py
echo.

echo 📁 File siap untuk deploy:
echo - Folder 'dist' untuk Vercel/Netlify
echo - File optimized untuk manual upload
echo.

echo 🌐 Pilihan deployment:
echo 1. Drag folder 'dist' ke Vercel.com
echo 2. Drag folder 'dist' ke Netlify.com  
echo 3. Upload manual files optimized
echo.

echo ✅ Build completed! Website siap di-deploy.
pause