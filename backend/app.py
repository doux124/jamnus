from flask import Flask, request, jsonify
from flask_cors import CORS
from receipt_processor import ReceiptProcessor
import os

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Initialize the ReceiptProcessor with environment variables for project ID and PAT (Personal Access Token)
project_id = os.getenv('JAMAI_PROJECT_ID')
pat = os.getenv('JAMAI_PAT')

# Instantiate the processor class
processor = ReceiptProcessor(project_id, pat)

@app.route('/')
def index():
    return "Welcome to the Receipt Processor API"

@app.route('/process_receipt', methods=['POST'])
def process_receipt():
    # Check if an image file is part of the request
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    # Save the file to a temporary location
    try:
        temp_filename = os.path.join('temp', file.filename)
        os.makedirs(os.path.dirname(temp_filename), exist_ok=True)
        file.save(temp_filename)

        # Process the receipt with the ReceiptProcessor class
        result = processor.process_receipt(temp_filename)
        if result:
            # Clean up the saved temporary file after processing
            os.remove(temp_filename)
            return jsonify(result), 200
        else:
            os.remove(temp_filename)
            return jsonify({"error": "Failed to process receipt"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/process_folder', methods=['POST'])
def process_folder():
    # Get folder path from the request
    data = request.json
    folder_path = data.get('folder_path')

    if not folder_path or not os.path.exists(folder_path):
        return jsonify({"error": "Invalid folder path"}), 400

    # Process all receipts in the folder
    try:
        results = []
        for filename in os.listdir(folder_path):
            if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
                image_path = os.path.join(folder_path, filename)
                result = processor.process_receipt(image_path)
                if result:
                    results.append({"filename": filename, **result})

        return jsonify(results), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Run the Flask app
    app.run(debug=True)
