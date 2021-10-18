# To run the API server locally:
# - cd back
# - pip install flask
# - python app.py
# - localhost:5000
# To deploy the API server to prod:
# - push to GitLab

from flask import Flask
app = Flask(__name__)


@app.route("/")
@app.route("/v1")
@app.route("/v1/models")
@app.route("/v1/models/country")
@app.route("/v1/models/city")
@app.route("/v1/models/covid")
def index():
    postmanUrl = "https://documenter.getpostman.com/view/17756516/UUy4cRDr"
    return f"\
        To learn how to use CovidDB's API, please visit our\
        <a href=\"{postmanUrl}\">Postman</a> documentation."

@app.route("/v1/models/country/all", methods=["GET"])
def get_country_all():
    return "countries all"

@app.route("/v1/models/country/name=<countryName>", methods=["GET"])
def get_country(countryName):
    return "countries " + countryName

@app.route("/v1/models/city/all")
def get_city_all():
    return "city all"

@app.route("/v1/models/city/name=<cityName>")
def get_city(cityName):
    return "city " + cityName

@app.route("/v1/models/covid/all")
def get_covid_all():
    return "covid all"

@app.route("/v1/models/covid/country=<countryName>")
def get_covid(countryName):
    return "covid " + countryName


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
