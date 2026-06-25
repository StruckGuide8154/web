import os
from pathlib import Path

from flask import Flask, send_from_directory

app = Flask(__name__, static_folder=None)
BASE_DIR = Path(__file__).resolve().parent


@app.route('/')
def index():
    return send_from_directory(BASE_DIR, 'index.html')


@app.route('/<path:filename>')
@app.route('/<path:filename>/')
def serve(filename):
    clean_path = filename.strip('/')
    directory_index = BASE_DIR / clean_path / 'index.html'

    if directory_index.is_file():
        return send_from_directory(BASE_DIR, f'{clean_path}/index.html')

    return send_from_directory(BASE_DIR, filename)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=False)
