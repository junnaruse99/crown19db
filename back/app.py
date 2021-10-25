# To run the API server locally:
# - cd back
# - sudo apt-get install libpq-dev
# - pip install -r requirements.txt
# - python app.py
# - localhost:5000
# To deploy the API server to prod:
# - push to GitLab

from flask import Flask, jsonify, json, Response
from flask_sqlalchemy import SQLAlchemy
import traceback
from models import (
    app, Country, Currency, Language, TimeZone, City, CovidInstance, Covid,
    country_schema, language_schema, currency_schema, timezone_schema, city_schema,
    covid_schema, covidInstance_schema, country_schema_reduced, db )
from init_db import init_db

#### COUNTRY ####
@app.route("/api/v1/models/country/all", methods=["GET"])
def get_country_all():
    # Country.query.'' returns an object so use of the schema to transform it into an object
    countries = Country.query.all()
    # jsonify to transform it to json
    return jsonify([country_schema.dump(country) for country in countries])

# e.g. .../interval=1-10
@app.route("/api/v1/models/country/all/reduced", methods=["GET"])
def get_country_all_reduced():
    # Country.query.'' returns an object so use of the schema to transform it into an object
    countries = Country.query.all()
    # jsonify to transform it to json
    return jsonify([country_schema_reduced.dump(country) for country in countries])

@app.route("/api/v1/models/country/name=<countryName>", methods=["GET"])
def get_country_by_name(countryName):
    # Remeber that format of country name is lower case and separated by '-' and lowercase (POSTMAN)
    countryName = ' '.join([word.capitalize() for word in countryName.split('-')])
    country = Country.query.filter_by(commonName=countryName).first_or_404(description='There is no data with {}'.format(countryName))
    return jsonify(country_schema.dump(country))

@app.route("/api/v1/models/country/id=<id>", methods=["GET"])
def get_country_by_id(id):
    # Remeber that format of country name is lower case and separated by '-' and lowercase (POSTMAN)
    country = Country.query.filter_by(id=id).first_or_404(description='There is no data with {}'.format(id))
    return jsonify(country_schema.dump(country))


#### CITY ####
@app.route("/api/v1/models/city/all", methods=["GET"])
def get_city_all():
    # Country.query.'' returns an object so use of the schema to transform it into an object
    cities = db.session.query(City, Country.commonName).filter(City.country_id == Country.id).all()
    # jsonify to transform it to json
    cities_obj = []
    for city in cities:
        city_aux = city_schema.dump(city[0])
        city_aux['country'] = city[1]
        cities_obj.append(city_aux)

    return jsonify(cities_obj)

@app.route("/api/v1/models/city/name=<cityName>", methods=["GET"])
def get_city_by_name(cityName):
    # Remeber that format of country name is lower case and separated by '-' and lowercase (POSTMAN)
    cityName = ' '.join([word.capitalize() for word in cityName.split('-')])
    city = City.query.filter_by(name=cityName).first_or_404(description='There is no data with {}'.format(cityName))
    return jsonify(city_schema.dump(city))

@app.route("/api/v1/models/city/id=<id>", methods=["GET"])
def get_city_by_id(id):
    # Remeber that format of country name is lower case and separated by '-' and lowercase (POSTMAN)
    city = db.session.query(City, Country.commonName).filter(City.id == id, City.country_id == Country.id).first_or_404(description='There is no data with {}'.format(id))
    city_obj = city_schema.dump(city[0])
    city_obj['country'] = city[1]
    return jsonify(city_obj)


#### COVID #####
@app.route("/api/v1/models/covid/all", methods=["GET"])
def get_covid_all():
    # Country.query.'' returns an object so use of the schema to transform it into an object
    covids = db.session.query(Covid, Country.commonName).filter(Covid.country_id == Country.id).all()
    # jsonify to transform it to json
    covids_obj = []
    for covid in covids:
        covid_aux = covid_schema.dump(covid[0])
        covid_aux['country'] = covid[1]
        covids_obj.append(covid_aux)

    return jsonify(covids_obj)

@app.route("/api/v1/models/covid/country_id=<countryId>", methods=["GET"])
def get_covid_by_countryId(countryId):
    covid = Covid.query.filter_by(country_id=countryId).first_or_404(description='There is no data with {}'.format(countryId))
    return jsonify(covid_schema.dump(covid))

@app.route("/api/v1/models/covid/id=<id>", methods=["GET"])
def get_covid_by_id(id):
    covid = db.session.query(Covid, Country.commonName).filter(Covid.id == id, Covid.country_id == Country.id).first_or_404(description='There is no data with {}'.format(id))
    covid_obj = covid_schema.dump(covid[0])
    covid_obj['country'] = covid[1]
    return jsonify(covid_obj)

# COVID INSTANCEpip3 install 

@app.route("/api/v1/models/covidInstance/country_id=<countryId>", methods=["GET"])
def get_covidInstance_by_countryId(countryId):
    # Country.query.'' returns an object so use of the schema to transform it into an object
    covidInstances = db.session.query(CovidInstance, Country.commonName).filter(CovidInstance.country_id == countryId, CovidInstance.country_id == Country.id).all()
    # jsonify to transform it to json
    covids_obj = []
    for covid in covidInstances:
        covid_aux = covidInstance_schema.dump(covid[0])
        covid_aux['country'] = covid[1]
        covids_obj.append(covid_aux)

    return jsonify(covids_obj)

#### ELSE #####
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


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
