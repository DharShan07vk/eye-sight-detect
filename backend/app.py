from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io

app = Flask(__name__)
CORS(app)  # Allow frontend to access backend

@app.route('/analyze', methods=['POST'])
def analyze_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files['image']

    try:
        # Load the image using Pillow
        img = Image.open(file.stream)

        # 🧠 Placeholder coloboma analysis logic
        # In real project, you would run your ML model here
        result = {
            "isColoboma": True,       # Fake prediction
            "confidence": 0.87        # Fake confidence
        }

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Coloboma Analysis API is running"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
