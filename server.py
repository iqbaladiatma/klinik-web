#!/usr/bin/env python3
"""
Simple HTTP server untuk menjalankan website Klinik MMC Blora
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

# Set working directory to the script's directory
os.chdir(Path(__file__).parent.absolute())

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def guess_type(self, path):
        mimetype = super().guess_type(path)
        if path.endswith('.css'):
            return 'text/css'
        elif path.endswith('.js'):
            return 'application/javascript'
        return mimetype

def run_server():
    """Start the HTTP server"""
    try:
        with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
            print(f"Server berjalan di http://localhost:{PORT}")
            print(f"Direktori: {os.getcwd()}")
            print("\nTekan Ctrl+C untuk menghentikan server")
            
            # Buka browser secara otomatis
            webbrowser.open(f'http://localhost:{PORT}')
            
            # Start server
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\nServer dihentikan.")
        sys.exit(0)
    except OSError as e:
        if e.errno == 98:  # Address already in use
            print(f"Port {PORT} sudah digunakan. Coba port lain.")
            sys.exit(1)
        else:
            print(f"Error: {e}")
            sys.exit(1)

if __name__ == "__main__":
    run_server()