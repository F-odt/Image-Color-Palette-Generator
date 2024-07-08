# Image Color Extractor

## Description
Image Color Extractor is a web application that allows users to upload an image and extract the top 10 most common colors from it. The application displays the extracted colors as color swatches along with their hex codes and RGB values in a grid layout.

## Features
- Upload image files
- Extract top 10 most common colors from the uploaded image
- Display color swatches with hex codes and RGB values
- Responsive design that works on various devices

## Technologies Used
- Frontend: HTML, CSS, JavaScript
- Backend: Python, Flask
- Image Processing: NumPy, Pillow (PIL)
- CORS handling: Flask-CORS

## Installation

1. Clone the repository: https://github.com/F-odt/Image-Color-Palette-Generator

2. Install the required packages: pip install -r requirements.txt

## Usage

1. Start the Flask server: python app.py
2. Open a web browser and navigate to `http://localhost:5000`

3. Upload an image using the file input button

4. Click the "Process Image" button to extract colors

5. View the extracted colors displayed as swatches with their hex codes and RGB values

## Project Structure
image-color-extractor/
│
├── static/
│   ├── styles.css
│   └── script.js
│
├── templates/
│   └── index.html
│
├── app.py
├── requirements.txt
└── README.md

## Development

To run the application in debug mode, ensure that the following line is present in `app.py`:

```python
if __name__ == '__main__':
    app.run(debug=True)
```
This will enable hot reloading and detailed error messages.

## How It Works
1. **Image Upload**: Users can upload an image file through the web interface.
2. **Color Extraction**: The application processes the image using advanced algorithms to identify the most common colors.
3. **Display Results**: The top 10 colors are displayed as color swatches along with their HEX and RGB values.

## Technical Process
1. The uploaded image is resized to 100x100 pixels to optimize processing speed.
2. The image is converted to a NumPy array for efficient color analysis.
3. Unique colors are identified and counted.
4. Colors are sorted by frequency, and the top 10 are selected.
5. Selected colors are converted to HEX and RGB formats for display.

## Usage Guide

1. **Accessing the Application**
   - Open your web browser and navigate to the application URL (e.g., `http://localhost:5000` if running locally).

2. **Uploading an Image**
   - Click on the file input button labeled "Choose File" or similar.
   - Select an image file from your device.

3. **Processing the Image**
   - After selecting an image, click the "Process Image" button.
   - The application will upload the image and start the color extraction process.

4. **Viewing Results**
   - Once processing is complete, you'll see a grid of color swatches.
   - Each swatch represents one of the top 10 most common colors in the image.
   - Below each swatch, you'll find:
     - The color's HEX code (e.g., #FF5733)
     - The color's RGB values (e.g., 255, 87, 51)

5. **Analyzing Multiple Images**
   - To analyze another image, simply upload a new file and click "Process Image" again.

## Error Handling
- If you try to process without selecting an image, you'll receive an error message.
- Invalid file types will also trigger an error message.
- Any server-side processing errors will be displayed to the user.

## Performance Note
The color extraction process is optimized for speed and accuracy. However, processing time may vary depending on the original image size and complexity.

## Data Privacy
This application does not store uploaded images or extracted color data. All processing is done in real-time and data is not retained after the browser session ends.