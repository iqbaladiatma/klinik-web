#!/usr/bin/env python3
"""
Build script untuk optimasi website
Meminimalkan CSS dan JS, mengoptimalkan gambar
"""

import os
import re
import shutil
from pathlib import Path

def minify_css(css_content):
    """Minify CSS content"""
    # Remove comments
    css_content = re.sub(r'/\*.*?\*/', '', css_content, flags=re.DOTALL)
    # Remove extra whitespace
    css_content = re.sub(r'\s+', ' ', css_content)
    # Remove unnecessary spaces around certain characters
    css_content = re.sub(r'\s*([{}:;,>+~])\s*', r'\1', css_content)
    # Remove trailing semicolon before }
    css_content = re.sub(r';\s*}', '}', css_content)
    return css_content.strip()

def minify_js(js_content):
    """Basic JS minification"""
    # Remove single line comments
    js_content = re.sub(r'//.*$', '', js_content, flags=re.MULTILINE)
    # Remove multi-line comments
    js_content = re.sub(r'/\*.*?\*/', '', js_content, flags=re.DOTALL)
    # Remove extra whitespace
    js_content = re.sub(r'\s+', ' ', js_content)
    # Remove spaces around certain characters
    js_content = re.sub(r'\s*([{}();,=+\-*/])\s*', r'\1', js_content)
    return js_content.strip()

def create_production_build():
    """Create production-ready build"""
    print("🚀 Creating production build...")
    
    # Create dist directory
    dist_dir = Path('dist')
    if dist_dir.exists():
        shutil.rmtree(dist_dir)
    dist_dir.mkdir()
    
    # Copy HTML files
    html_files = ['index-optimized.html', 'tentang-kami.html', 'layanan.html', 
                  'tim-dokter.html', 'kontak.html', 'mmc-skincare.html']
    
    for html_file in html_files:
        if Path(html_file).exists():
            if html_file == 'index-optimized.html':
                shutil.copy2(html_file, dist_dir / 'index.html')
            else:
                shutil.copy2(html_file, dist_dir / html_file)
            print(f"✅ Copied {html_file}")
    
    # Create CSS directory and minify CSS
    css_dir = dist_dir / 'css'
    css_dir.mkdir()
    
    with open('css/style-optimized.css', 'r', encoding='utf-8') as f:
        css_content = f.read()
    
    minified_css = minify_css(css_content)
    with open(css_dir / 'style.css', 'w', encoding='utf-8') as f:
        f.write(minified_css)
    print("✅ Minified CSS")
    
    # Create JS directory and minify JS
    js_dir = dist_dir / 'js'
    js_dir.mkdir()
    
    with open('js/script-optimized.js', 'r', encoding='utf-8') as f:
        js_content = f.read()
    
    minified_js = minify_js(js_content)
    with open(js_dir / 'script.js', 'w', encoding='utf-8') as f:
        f.write(minified_js)
    print("✅ Minified JavaScript")
    
    # Update HTML files to use minified assets
    for html_file in dist_dir.glob('*.html'):
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Update CSS reference
        content = content.replace('css/style-optimized.css', 'css/style.css')
        # Update JS reference
        content = content.replace('js/script-optimized.js', 'js/script.js')
        
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(content)
    
    # Copy config files
    config_files = ['vercel.json', 'netlify.toml', 'README.md']
    for config_file in config_files:
        if Path(config_file).exists():
            shutil.copy2(config_file, dist_dir / config_file)
    
    print("🎉 Production build completed!")
    print(f"📁 Build output: {dist_dir.absolute()}")

if __name__ == "__main__":
    create_production_build()