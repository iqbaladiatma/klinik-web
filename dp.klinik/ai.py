# app.py
from flask import Flask, request, jsonify
import time
import random

app = Flask(__name__)

# Mock database untuk contoh
knowledge_base = {
    "sapaan": ["Halo!", "Apa kabar?", "Selamat datang!"],
    "fisika": "Teori relativitas Einstein menjelaskan hubungan antara ruang dan waktu.",
    "matematika": "Pythagoras menyatakan a² + b² = c² dalam segitiga siku-siku.",
    "default": "Maaf, saya belum memahami pertanyaan tersebut."
}

@app.route('/chat', methods=['POST'])
def chat_api():
    data = request.json
    prompt = data.get('prompt', '').lower()
    
    # Simulasi delay processing
    time.sleep(random.uniform(0.1, 0.5))
    
    # Logika sederhana untuk pemrosesan
    if any(kw in prompt for kw in ['halo', 'hi', 'hallo']):
        response = random.choice(knowledge_base['sapaan'])
    elif 'relativitas' in prompt:
        response = knowledge_base['fisika']
    elif 'pythagoras' in prompt:
        response = knowledge_base['matematika']
    else:
        response = knowledge_base['default']
    
    return jsonify({
        "response": response,
        "status": "success",
        "timestamp": time.time()
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)