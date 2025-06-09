from flask import Flask, request, jsonify
import easyocr
import os
import tempfile

reader = easyocr.Reader(['en'], gpu=False)

app = Flask(__name__)

@app.route('/extract', methods=['POST'])
def extract():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']

    with tempfile.NamedTemporaryFile(delete=False) as temp:
        file.save(temp.name)
        results = reader.readtext(temp.name, detail=0)

    # Combine lines and parse the structured info
    full_text = ' '.join(results)

    # Very basic pattern matching (you can improve with regex or NLP)
    data = {
        "name": extract_name(full_text),
        "dob": extract_dob(full_text),
        "gender": extract_gender(full_text),
        "aadhar_number": extract_aadhar(full_text),
        "father_name": extract_father_name(full_text),
        "address": extract_address(full_text)
    }

    return jsonify(data)

# Dummy extractors — replace with real logic
def extract_name(text): return find_near(text, "Name")
def extract_dob(text): return find_near(text, "DOB")
def extract_gender(text): return "Male" if "Male" in text else "Female" if "Female" in text else ""
def extract_aadhar(text): return find_12_digit_number(text)
def extract_father_name(text): return find_near(text, "S/O") or find_near(text, "Father")
def extract_address(text): return find_near(text, "Address")

# Helpers
import re
def find_12_digit_number(text):
    match = re.search(r'\d{4}\s\d{4}\s\d{4}', text)
    return match.group(0) if match else ""

def find_near(text, keyword):
    # This is a naive match, you can replace with more robust NLP or regex
    lines = text.split('\n')
    for line in lines:
        if keyword.lower() in line.lower():
            return line.split(':')[-1].strip()
    return ""

if __name__ == '__main__':
    app.run(port=5001)



















# # === document_parser.py (Python ML service) ===
# import pytesseract
# from pdf2image import convert_from_path
# from PIL import Image
# import re
# import io
# from flask import Flask, request, jsonify
# import os
# import tempfile

# app = Flask(__name__)

# # Ensure Tesseract is in PATH or set the path manually
# pytesseract.pytesseract.tesseract_cmd = '/usr/bin/tesseract'


# def extract_text_from_image(image: Image.Image) -> str:
#     return pytesseract.image_to_string(image)


# def extract_fields(text: str) -> dict:
#     name_match = re.search(r"Name[:\s]*([A-Z][a-z]+(?: [A-Z][a-z]+)*)", text)
#     dob_match = re.search(r"DOB[:\s]*(\d{2}[/-]\d{2}[/-]\d{4})", text)
#     father_match = re.search(r"Father(?:'s)? Name[:\s]*([A-Z][a-z]+(?: [A-Z][a-z]+)*)", text)
#     address_match = re.search(r"Address[:\s]*(.+?)(?:\\n|$)", text)

#     return {
#         "name": name_match.group(1) if name_match else "",
#         "dob": dob_match.group(1) if dob_match else "",
#         "father_name": father_match.group(1) if father_match else "",
#         "address": address_match.group(1).strip() if address_match else ""
#     }


# @app.route("/extract", methods=["POST"])
# def extract():
#     file = request.files.get('file')
#     if not file:
#         return jsonify({"error": "No file uploaded"}), 400

#     with tempfile.NamedTemporaryFile(delete=False) as temp:
#         temp.write(file.read())
#         temp.flush()
#         temp_path = temp.name

#     ext = os.path.splitext(file.filename)[-1].lower()

#     try:
#         if ext == ".pdf":
#             images = convert_from_path(temp_path, fmt='jpeg')
#             text = "\n".join([extract_text_from_image(img) for img in images])
#         else:
#             image = Image.open(temp_path)
#             text = extract_text_from_image(image)

#         fields = extract_fields(text)
#         field_array = [{"label": k.replace('_', ' ').title(), "value": v} for k, v in fields.items()]

#         return jsonify(field_array)

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

#     finally:
#         os.remove(temp_path)


# if __name__ == '__main__':
#     app.run(debug=True, port=5001)
