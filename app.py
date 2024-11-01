
from flask import Flask, render_template, request, jsonify, send_from_directory, abort
import requests
import os
from PIL import Image
import io
import time

# Importando configurações do config.py
import config

app = Flask(__name__)
app.static_folder = 'static'  # Define a pasta onde estão os arquivos estáticos

#Token e URL do arquivo de configuração
AUTH_TOKEN = config.AUTH_TOKEN
GLIF_URL = config.GLIF_URL # Modelo usado:  SD3 with GPT4 DALL·E 3 prompt preprocess

@app.route('/')
def home():
    return render_template('index.html')

def generate_image(prompt, index):
    headers = {
        "Authorization": f"Bearer {AUTH_TOKEN}",
        "Content-Type": "application/json"
    }

    data = {"inputs": [prompt]}

    response = requests.post(GLIF_URL, json=data, headers=headers)

    if response.status_code == 200:
        response_json = response.json()
        image_url = response_json.get("output")

        if image_url:
            image_response = requests.get(image_url)
            if image_response.status_code == 200:
                img_data = image_response.content
                img = Image.open(io.BytesIO(img_data))
                output_path = f"images/cena{index:02d}.png"
                os.makedirs(os.path.dirname(output_path), exist_ok=True)
                img.save(output_path)
                return {"path": f"/images/cena{index:02d}.png", "prompt": prompt}
            else:
                print(f"Erro ao baixar a imagem do URL: {image_url}. Código de status: {image_response.status_code}")
                return None
        else:
            print(f"Erro: Nenhum URL de imagem retornado pela API para o prompt: '{prompt}'")
            return None
    else:
        print(f"Erro ao gerar imagem para o prompt: '{prompt}'. Código de status: {response.status_code}, Resposta: {response.text}")
        return None

@app.route('/generate_images', methods=['POST'])
def generate_images():
    prompts = request.json['prompts']
    generated_images = []
    for i, prompt in enumerate(prompts, start=1):
        img_info = generate_image(prompt, i) 
        if img_info:
            generated_images.append(img_info) 
        time.sleep(1) 
    return jsonify({"images": generated_images})

@app.route('/images/<path:filename>')
def serve_image(filename):
    return send_from_directory('images', filename)

@app.route('/image_status/<int:index>')
def image_status(index):
    image_path = f"images/cena{index:02d}.png"
    if os.path.exists(image_path):
        return jsonify({"path": f"/images/cena{index:02d}.png"})
    else:
        return jsonify({"path": None})

if __name__ == '__main__':
    app.run(debug=True)
