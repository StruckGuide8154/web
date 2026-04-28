from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='.', static_url_path='')


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/<path:filename>')
def serve(filename):
    return app.send_static_file(filename)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
