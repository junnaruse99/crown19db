# To run the API server locally:
# - cd back
# - pip install flask
# - python app.py
# - localhost:5000
# To deploy the API server to prod:
# - push to GitLab

from flask import Flask, jsonify, json, Response
from flask_sqlalchemy import SQLAlchemy
import traceback
# from Country import Country

app = Flask(__name__)
app.config['QLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config ['SQLALCHEMY_DATABASE_URI'] = \
    "postgresql+psycopg2://username:password"\
    "@crown19db.ck9wwhipyc5v.us-west-2.rds.amazonaws.com:5432/postgres"
    # mysql://username:password@server/db
    # "crown19db.ck9wwhipyc5v.us-west-2.rds.amazonaws.com:5432"
    # "sqlite:///students.sqlite3" # TODO

db = SQLAlchemy(app)

# class Students(db.Model):
#    id = db.Column('student_id', db.Integer, primary_key = True)
#    name = db.Column(db.String(100))
#    city = db.Column(db.String(50))  
#    addr = db.Column(db.String(200))
#    pin = db.Column(db.String(10))

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

@app.route("/v1/models/country/all", methods=["GET"])
def get_country_all():
    return Country.query.all()

@app.route("/v1/models/country/", methods=["POST"])
def add_country():
    try:
        country = Country('United States')
        db.session.add(me)
        db.session.commit()
        return Response(status=201)
    except:
        traceback.print_exc()
        return Response(status=500)

@app.route("/v1/models/country/name=<countryName>", methods=["GET"])
def get_country(countryName):
    country = Country.query.filter_by(name=countryName).first_or_404(description='There is no data with {}'.format(countryName))
    return country.id

# @app.route("/")
# @app.route("/v1")
# @app.route("/v1/models")
# @app.route("/v1/models/country")
# @app.route("/v1/models/city")
# @app.route("/v1/models/covid")
# def index():
#     postmanUrl = "https://documenter.getpostman.com/view/17756516/UUy4cRDr"
#     output = f"\
#         To learn how to use CovidDB's API, please visit our\
#         <a href=\"{postmanUrl}\">Postman</a> documentation."
#     all_students = Students.query.all()
#     result = 
#     return output

# @app.route("/v1/models/country/all", methods=["GET"])
# def get_country_all():
#     return "countries all"

# @app.route("/v1/models/country/name=<countryName>", methods=["GET"])
# def get_country(countryName):
#     return "countries " + countryName

# @app.route("/v1/models/city/all")
# def get_city_all():
#     return "city all"

# @app.route("/v1/models/city/name=<cityName>")
# def get_city(cityName):
#     return "city " + cityName

# @app.route("/v1/models/covid/all")
# def get_covid_all():    
#     return open("covid.json", "r").read()

# @app.route("/v1/models/covid/country=<countryName>")
# def get_covid(countryName):
#     covidData = json.load(open("covid.json", "r"))

#     return "covid " + countryName


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
