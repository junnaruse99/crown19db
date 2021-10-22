from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import traceback
import requests
import json
from flask_marshmallow import Marshmallow
from marshmallow import fields
from Country import Country
from CountryCity import CountryCity

API_URL = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=&rows=10000&sort=name'

app = Flask(__name__)
app.debug = True
app.config['QLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config ['SQLALCHEMY_DATABASE_URI'] = \
    "postgresql+psycopg2://username:password"\
    "@crown19db.ck9wwhipyc5v.us-west-2.rds.amazonaws.com:5432/postgres"

db = SQLAlchemy(app)
ma = Marshmallow(app)

#### TODO We need more information for cities, this is too little, maybe another api 
#### I still don't know how to do city
class City(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=True, nullable=False)
    latitude = db.Column(db.Float, unique=True, nullable=False)
    longitude = db.Column(db.Float, unique=True, nullable=False)
    population = db.Column(db.String(), unique=True, nullable=False)
    timeZone = db.Column(db.String(), unique=True, nullable=False)
    city_id = db.relationship('CountryCity', backref='City')

    def __repr__(self):
        return '<City %r>' % self.name

class CitySchema(ma.Schema):
    id = fields.Integer(required=True)
    name = fields.String(required=True)
    latitude = fields.Float(required=True)
    longitude = fields.Float(required=True)
    population = fields.Integer(required=True)
    timeZone = fields.String(required=True)

    class Meta:
        ordered = True

def add_city():
    try:

        db.create_all()

        r = requests.get(API_URL)

        # Make sure that api works
        if r.status_code != 200:
            raise Exception('Api not working') 

        for data in r.json()['records']:
            # Create a new city name object
            
            countryName = data['cou_name_en']
            cityName = data['ascii_name']
            [lat, long] = data['coordinates']
            timezone = data['timezone']
            population = data['population']

            city = City(
                name = cityName,
                latitude = lat,
                longitude = long,
                population = population,
                timeZone = timezone
            )

            # Let's look for the country
            country = Country.query.filter_by(commonName=countryName)

            if len(country) == 0:
                print(countryName)
            else:
                countryCity = CountryCity(
                    is_capital = False,
                    country_id = country[0].id
                )

                db.session.add(city)
                db.session.add(countryCity)

        db.session.commit()
            
    except Exception as error: 
        print(repr(error))
        traceback.print_exc()

if __name__ == '__main__':
    add_city()