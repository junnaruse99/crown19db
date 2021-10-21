from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import traceback
import requests
import json

API_URL = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=countries-codes&q='

app = Flask(__name__)
app.debug = True
app.config['QLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config ['SQLALCHEMY_DATABASE_URI'] = \
    "postgresql+psycopg2://username:password"\
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
    countryId = db.Column(db.String(), unique=True, nullable=False)
   
db.create_all()

def add_country():
    try:
        r =requests.get(API_URL)

        # Make sure that api works
        if r.status_code != 200:
            raise Exception('Api not working') 

        countriesName = []

        records = r.text['records']

        for record in records:
            # Create a new country name object
            countryName = CountryName(record['fields']['cou_name_en'])

        print(r.text)
        # country = Country('United States')
        # db.session.bulk_save_objects(me)
        # db.session.commit()
    except Exception as error: 
        print(repr(erros))
        traceback.print_exc()

if __name__ == '__main__':
    add_country()

