from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

from law import Law
from resume import Resume
from indiv import Indiv
from nego import Nego
from conflict import Conflict

app = Flask(__name__)
CORS(app)
# CORS(app, origins=["http://localhost:5173"])

# Load environment variables
load_dotenv()
project_id = os.getenv("PROJECT_ID")
pat = os.getenv("PAT")

# Validate environment variables
if not project_id or not pat:
    raise ValueError("Missing PROJECT_ID or PAT in environment variables")

# Instantiate processor classes
lawProcessor = Law(project_id, pat)
resumeProcessor = Resume(project_id, pat)
indivProcessor = Indiv(project_id, pat)
negoProcessor = Nego(project_id, pat)
conflictProcessor = Conflict(project_id, pat)

# Helper function to process file-based requests
def process_file_request(request, processor, method_name):
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    temp_filename = os.path.join('temp', file.filename)
    os.makedirs(os.path.dirname(temp_filename), exist_ok=True)

    try:
        file.save(temp_filename)
        result = getattr(processor, method_name)(temp_filename)  # Dynamically call method

        os.remove(temp_filename)  # Cleanup temp file

        if result:
            return jsonify(result), 200
        return jsonify({"error": "Failed to process"}), 500

    except Exception as e:
        if os.path.exists(temp_filename):
            os.remove(temp_filename)  # Cleanup even on error
        return jsonify({"error": str(e)}), 500

# File processing routes
@app.route('/law', methods=['POST'])
def process_law():
    return process_file_request(request, lawProcessor, "process_law")

@app.route('/resume', methods=['POST'])
def process_resume():
    return process_file_request(request, resumeProcessor, "process_resume")

# Helper function for text-based requests
def process_text_request(request, processor, method_name):
    if not request.json or 'text' not in request.json:
        return jsonify({"error": "No text part"}), 400

    text = request.json.get('text', '').strip()
    if not text:
        return jsonify({"error": "No text provided"}), 400

    try:
        result = getattr(processor, method_name)(text)
        if result:
            return jsonify(result), 200
        return jsonify({"error": "Failed to process the text"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Text processing routes
@app.route('/indiv', methods=['POST'])
def process_indiv():
    return process_text_request(request, indivProcessor, "process_indiv")

@app.route('/conflict', methods=['POST'])
def process_conflict():
    return process_text_request(request, conflictProcessor, "process_conflict")

@app.route('/nego', methods=['POST'])
def process_nego():
    return process_text_request(request, negoProcessor, "process_nego")

# Run Flask app
if __name__ == '__main__':
    app.run(debug=True)
