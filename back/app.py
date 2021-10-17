from flask import Flask
app = Flask(__name__)

@app.route("/")
def index():
    return 'Index page'

@app.route("/about")
def about():
    return 'About page'

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)