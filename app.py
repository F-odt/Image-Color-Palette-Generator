import numpy as np
from PIL import Image
from flask import Flask, request, jsonify, render_template
from io import BytesIO
import logging
from flask_cors import CORS

# Set up logging and initialize Flask app
logging.basicConfig(level=logging.DEBUG)
app = Flask(__name__)
CORS(app)


# Function to extract colors from an image
def extract_colors(image, num_colors=10):
    # Resize image to speed up processing
    img = image.copy()
    img.thumbnail((100, 100))

    # Convert image to numpy array and reshape
    np_img = np.array(img)
    pixels = np_img.reshape(-1, 3)

    # Get unique colors and their counts
    unique_colors, counts = np.unique(pixels, axis=0, return_counts=True)

    # Sort colors by count (descending) and get top colors
    sorted_indices = counts.argsort()[::-1]
    sorted_colors = unique_colors[sorted_indices]
    top_colors = sorted_colors[:num_colors]

    # Convert to hex and RGB format
    color_data = []
    for color in top_colors:
        hex_color = '#{:02x}{:02x}{:02x}'.format(*color)
        rgb_color = tuple(color.tolist())  # Convert numpy array to list
        color_data.append({'hex': hex_color, 'rgb': rgb_color})

    return color_data


# Route for the home page
@app.route('/')
def index():
    return render_template('index.html')


# Route for extracting colors from uploaded image
@app.route('/extract-colors', methods=['POST'])
def extract_colors_route():
    app.logger.info("Extract colors route called")

    # Check if image file is provided
    if 'image' not in request.files:
        app.logger.error("No image file provided")
        return jsonify({'error': 'No image file provided'}), 400

    image_file = request.files['image']
    if image_file.filename == '':
        app.logger.error("No image file selected")
        return jsonify({'error': 'No image file selected'}), 400

    try:
        # Process the image and extract colors
        app.logger.info(f"Processing image: {image_file.filename}")
        image = Image.open(BytesIO(image_file.read())).convert('RGB')
        app.logger.info("Image opened successfully")
        colors = extract_colors(image)
        app.logger.info(f"Colors extracted: {colors}")
        return jsonify(colors)
    except Exception as e:
        # Handle any errors during processing
        app.logger.error(f"Error processing image: {str(e)}", exc_info=True)
        return jsonify({'error': f'Error processing image: {str(e)}'}), 500


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
