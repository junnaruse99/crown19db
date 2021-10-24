# To run the API server locally:
# - cd back
# - pip install flask
# - sudo apt-get install libpq-dev
# - pip install psycopg2
# - python app.py
# - localhost:5000
# To deploy the API server to prod:
# - push to GitLab

from flask import Flask, jsonify, json, Response
from flask_sqlalchemy import SQLAlchemy
import traceback
from Controller.Country import Country, Currency, Language, TimeZone, CountrySchema
from Controller.City import City

app = Flask(__name__)
app.config['QLALCHEMY_TRACK_MODIFICATIONS'] = False

# TODO read-in username and password
app.config ['SQLALCHEMY_DATABASE_URI'] = \
    "postgresql+psycopg2://coviddb:crown19db!"\
    "@crown19db.ck9wwhipyc5v.us-west-2.rds.amazonaws.com:5432/postgres"

db = SQLAlchemy(app)

class Country(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=True, nullable=False)
    gdp = db.Column(db.String(), unique=False, nullable=False)
    population = db.Column(db.String(), unique=False, nullable=False)
    populationDensity = db.Column(db.String(), unique=False, nullable=False)
    flag = db.Column(db.String(), unique=True, nullable=False)
    area = db.Column(db.String(), unique=False, nullable=False)
    capitalId = db.relationship('City', backref='country', lazy=True, uselist=False)
    latitude = db.Column(db.Float, unique=False, nullable=False)
    longitude = db.Column(db.Float, unique=False, nullable=False)

    def __repr__(self):
        return '<Country %r>' % self.name

    def __init__(self, name=None, gdp=None,  population=None, populationDensity=None, flag=None, area=None, capitalId=None, latitude=None, longitude=None):
        self.name = name
        self.gdp = gdp
        self.population = population
        self.populationDensity = populationDensity
        self.flag = flag
        self. area = area
        self.capitalId = capitalId
        self.latitude = latitude
        self.longitude = longitude

class CountryName(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=True, nullable=False)

class City(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=True, nullable=False)
    latitude = db.Column(db.Float, unique=True, nullable=False)
    longitude = db.Column(db.Float, unique=True, nullable=False)
    population = db.Column(db.String(), unique=True, nullable=False)
    timeZone = db.Column(db.String(), unique=True, nullable=False)
    countryName = db.relationship('Country', backref='city', lazy=True, uselist=False)
    cityImg = db.Column(db.String(), unique=True, nullable=False)

    def __repr__(self):
        return '<City %r>' % self.name

class Covid(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    countryId = db.relationship('Country', backref='covid', lazy=True, uselist=False)
    cases = db.Column(db.String(), unique=True, nullable=False)
    recovered = db.Column(db.String(), unique=True, nullable=False)
    deaths = db.Column(db.String(), unique=True, nullable=False)
    lastCovidCase = db.Column(db.DateTime, unique=True, nullable=False)
    
    def __repr__(self):
        return '<Covid for country %r>' % self.countryId

class CovidInstance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    countryId = db.relationship('Country', backref='covid', lazy=True, uselist=False)
    date = db.Column(db.DateTime, unique=True, nullable=False)
    totalCases = db.Column(db.String(), unique=True, nullable=False)
    totalRecovered = db.Column(db.String(), unique=True, nullable=False)
    totalDeaths = db.Column(db.String(), unique=True, nullable=False)
    
    def __repr__(self):
        return '<Covid in %r for country %r>' % (self.date, self.countryId)


db.create_all()
country_schema = CountrySchema()

#### TODO Join Currency, Language and TimeZone tables to country tables (This information I was planning on using it for the instance)


@app.route("/api/v1/models/country/all", methods=["GET"])
def get_country_all():
    # Country.query.'' returns an object so use of the schema to transform it into an object
    countries = [country_schema.dump(country_obj) for country_obj in Country.query.all()]
    # jsonify to transform it to json
    return jsonify(countries=countries)
    # return Country.query.all()

@app.route("/api/v1/models/country/id=<countryId>", methods=["GET"])
def get_country(countryId):
    country = Country.query.filter_by(name=countryId).first_or_404(description='There is no data with {}'.format(countryId))
    return country.id

@app.route("/api/v1/models/city/all")
def get_city_all():
    # TODO query database
    return "city all"

@app.route("/api/v1/models/city/id=<cityId>")
def get_city(cityId):
    # TODO query database
    return "city " + cityId

@app.route("/api/v1/models/covid/all")
def get_covid_all():
    # TODO query database
    return open("covid.json", "r").read()

@app.route("/api/v1/models/covid/id=<countryId>")
def get_covid(countryId):
    # TODO query database
    covidData = json.load(open("covid.json", "r"))
    return "covid " + countryId

@app.route("/")
@app.route("/api")
@app.route("/api/v1")
@app.route("/api/v1/models")
@app.route("/api/v1/models/country")
@app.route("/api/v1/models/city")
@app.route("/api/v1/models/covid")
def index():
    postmanUrl = "https://documenter.getpostman.com/view/17756516/UUy4cRDr"
    output = f"\
        To learn how to use CovidDB's API, please visit our\
        <a href=\"{postmanUrl}\">Postman</a> documentation."
    return output


@app.route("/v1/models/country/name=<countryName>", methods=["GET"])
def get_country_by_name(countryName):
    # Remeber that format of country name is lower case and separated by '-' and lowercase (POSTMAN)
    countryName = ' '.join([word.capitalize() for word in countryName.split('-')])
    country = Country.query.filter_by(commonName=countryName).first_or_404(description='There is no data with {}'.format(countryName))
    return jsonify(country_schema.dump(country))

@app.route("/v1/models/country/id=<id>", methods=["GET"])
def get_country_by_id(id):
    # Remeber that format of country name is lower case and separated by '-' and lowercase (POSTMAN)
    country = Country.query.filter_by(id=id).first_or_404(description='There is no data with {}'.format(id))
    return jsonify(country_schema.dump(country))

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
