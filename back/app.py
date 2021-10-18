# To run the API server locally:
# - cd back
# - pip install flask
# - python app.py
# - localhost:5000
# To deploy the API server to prod:
# - push to GitLab

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
db = SQLAlchemy()



class Students(db.Model):
   id = db.Column('student_id', db.Integer, primary_key = True)
   name = db.Column(db.String(100))
   city = db.Column(db.String(50))  
   addr = db.Column(db.String(200))
   pin = db.Column(db.String(10))

db.create_all()

@app.route("/")
@app.route("/v1")
@app.route("/v1/models")
@app.route("/v1/models/country")
@app.route("/v1/models/city")
@app.route("/v1/models/covid")
def index():
    postmanUrl = "https://documenter.getpostman.com/view/17756516/UUy4cRDr"
    output = f"\
        To learn how to use CovidDB's API, please visit our\
        <a href=\"{postmanUrl}\">Postman</a> documentation."
    all_students = Students.query.all()
    result = 
    return output

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
    return open("covid.json", "r").read()

@app.route("/v1/models/covid/country=<countryName>")
def get_covid(countryName):
    covidData = json.load(open("covid.json", "r"))

    return "covid " + countryName


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
