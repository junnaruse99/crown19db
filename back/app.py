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

country_schema = CountrySchema()

#### TODO Join Currency, Language and TimeZone tables to country tables (This information I was planning on using it for the instance)

@app.route("/api/v1/models/country/all", methods=["GET"])
def get_country_all():
    # Country.query.'' returns an object so use of the schema to transform it into an object
    countries = [country_schema.dump(country_obj) for country_obj in Country.query.all()]
    # jsonify to transform it to json
    return jsonify(countries=countries)

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
