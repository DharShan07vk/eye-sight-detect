from flask import Flask, request, jsonify
import os
from werkzeug.utils import secure_filename
import tensorflow as tf
import numpy as np
from PIL import Image
from flask_cors import CORS

# Flask app
app = Flask(__name__)
CORS(app)  # allow requests from React dev server

# Upload folder (optional, for temporary storage)
UPLOAD_FOLDER = os.path.join('static', 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Allowed file types
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# Load trained model
MODEL_PATH = os.path.join('model', 'coloboma_detector.h5')
model = tf.keras.models.load_model(MODEL_PATH)

# Helper: check allowed file type
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Helper: prediction
def predict_image(image_path):
    img = Image.open(image_path).convert("RGB").resize((299, 299))
    img_array = np.array(img) / 255.0  # normalize
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)[0][0]  # sigmoid output

    # Since training labels were coloboma=0, normal=1
    if prediction >= 0.5:
        is_coloboma = False
        confidence = prediction * 100  # confidence of "Normal"
    else:
        is_coloboma = True
        confidence = (1 - prediction) * 100  # confidence of "Coloboma"

    return is_coloboma, round(float(confidence), 2)

# API route for prediction
@app.route('/predict', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "Empty filename"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        is_coloboma, confidence = predict_image(filepath)

        return jsonify({
            "isColoboma": is_coloboma,
            "confidence": confidence
        })

    return jsonify({"error": "Invalid file type"}), 400

if __name__ == '__main__':
    app.run(debug=True)
