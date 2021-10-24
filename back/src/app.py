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
from models import (
    app, Country, Currency, Language, TimeZone, City, CovidInstance, Covid,
    country_schema, language_schema, currency_schema, timezone_schema, city_schema,
    covid_schema, covidInstance_schema, country_schema_reduced )
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
def get_country_by_ids():
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
    cities = City.query.all()
    # jsonify to transform it to json
    return jsonify([city_schema.dump(city) for city in cities])

@app.route("/api/v1/models/city/name=<cityName>", methods=["GET"])
def get_city_by_name(cityName):
    # Remeber that format of country name is lower case and separated by '-' and lowercase (POSTMAN)
    cityName = ' '.join([word.capitalize() for word in cityName.split('-')])
    city = City.query.filter_by(name=cityName).first_or_404(description='There is no data with {}'.format(cityName))
    return jsonify(city_schema.dump(city))

@app.route("/api/v1/models/city/id=<id>", methods=["GET"])
def get_city_by_id(id):
    # Remeber that format of country name is lower case and separated by '-' and lowercase (POSTMAN)
    city = City.query.filter_by(id=id).first_or_404(description='There is no data with {}'.format(id))
    return jsonify(city_schema.dump(city))


#### COVID #####
@app.route("/api/v1/models/covid/all", methods=["GET"])
def get_covid_all():
    # Country.query.'' returns an object so use of the schema to transform it into an object
    covids = Covid.query.all()
    # jsonify to transform it to json
    return jsonify([covid_schema.dump(covid) for covid in covids])

@app.route("/api/v1/models/covid/country_id=<countryId>", methods=["GET"])
def get_covid_by_countryId(countryId):
    covid = Covid.query.filter_by(country_id=countryId).first_or_404(description='There is no data with {}'.format(countryId))
    return jsonify(covid_schema.dump(covid))

@app.route("/api/v1/models/covid/id=<id>", methods=["GET"])
def get_covid_by_id(id):
    # Remeber that format of country name is lower case and separated by '-' and lowercase (POSTMAN)
    covid = Covid.query.filter_by(id=id).first_or_404(description='There is no data with {}'.format(id))
    return jsonify(covid_schema.dump(covid))

# COVID INSTANCE

@app.route("/api/v1/models/covidInstance/country_id=<countryId>", methods=["GET"])
def get_covidInstance_by_countryId(countryId):
    # Remeber that format of country name is lower case and separated by '-' and lowercase (POSTMAN)
    covidInstances = CovidInstance.query.filter_by(country_id=countryId).all()
    return jsonify([covidInstance_schema.dump(covidInstance) for covidInstance in covidInstances])

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
