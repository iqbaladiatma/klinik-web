#!/usr/bin/env python3
"""
Update semua tombol dari "Buat Janji" ke "Konsultasi"
"""

import os
import re

def update_file(filename):
    """Update file dengan mengganti tombol buat janji ke konsultasi"""
    if not os.path.exists(filename):
        print(f"File {filename} tidak ditemukan")
        return
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace function calls
    content = content.replace('buatJanji()', 'konsultasi()')
    
    # Replace button text
    content = content.replace('Buat Janji Temu', 'Konsultasi Gratis')
    content = content.replace('Buat Janji', 'Konsultasi')
    content = content.replace('Buat Janji Sekarang', 'Konsultasi Sekarang')
    content = content.replace('Buat Janji Konsultasi', 'Konsultasi Gratis')
    
    # Replace specific button texts
    content = content.replace('Book Treatment', 'Konsultasi')
    content = content.replace('Pilih Paket', 'Konsultasi')
    
    # Replace icons for consultation
    content = re.sub(r'<i class="fas fa-calendar-plus"></i>\s*Konsultasi', '<i class="fas fa-comments"></i> Konsultasi', content)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Updated {filename}")

# List of files to update
files_to_update = [
    'layanan.html',
    'tim-dokter.html', 
    'kontak.html',
    'mmc-skincare.html'
]

print("🔄 Updating button texts from 'Buat Janji' to 'Konsultasi'...")

for filename in files_to_update:
    update_file(filename)

print("✅ All files updated!")