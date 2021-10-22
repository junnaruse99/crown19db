from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import traceback
import requests
import json
from flask_marshmallow import Marshmallow
from marshmallow import fields

API_URL = 'https://restcountries.com/v3.1/all'

app = Flask(__name__)
app.debug = True
app.config['QLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config ['SQLALCHEMY_DATABASE_URI'] = \
    "postgresql+psycopg2://username:password"\
    "@crown19db.ck9wwhipyc5v.us-west-2.rds.amazonaws.com:5432/postgres"

db = SQLAlchemy(app)
ma = Marshmallow(app)

#### TODO Might be a good idea to add a video attribute in case we need more info

class Country(db.Model):
    __tablename__ = 'country'

    id = db.Column(db.Integer, primary_key=True)
    commonName = db.Column(db.String(), nullable=True)
    officialName = db.Column(db.String(), nullable=True)
    region = db.Column(db.String(), nullable=True)
    subregion = db.Column(db.String(), nullable=True)
    flag = db.Column(db.String(), nullable=True)
    coatOfArms = db.Column(db.String(), nullable=True)
    maps = db.Column(db.String(), nullable=True)
    area = db.Column(db.Integer, nullable=True)
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)
    population = db.Column(db.Integer, nullable=True)
    continent = db.Column(db.String(), nullable=True)
    currency = db.relationship('Currency', backref='Country')
    language = db.relationship('Language', backref='Country')
    timezone = db.relationship('TimeZone', backref='Country')

    def __repr__(self):
        return '<Country %r>' % self.commonName

class Currency(db.Model):
    __tablename__ = 'currency'

    id = db.Column(db.Integer, primary_key=True)
    country_id = db.Column(db.Integer, db.ForeignKey('country.id'))
    name = db.Column(db.String(), unique=False, nullable=False)

class Language(db.Model):
    __tablename__ = 'language'

    id = db.Column(db.Integer, primary_key=True)
    country_id = db.Column(db.Integer, db.ForeignKey('country.id'))
    name = db.Column(db.String(), unique=False, nullable=False)

class TimeZone(db.Model):
    __tablename__ = 'time_zone'

    id = db.Column(db.Integer, primary_key=True)
    country_id = db.Column(db.Integer, db.ForeignKey('country.id'))
    zone = db.Column(db.String(), unique=False, nullable=False)


class CountrySchema(ma.Schema):
    id = fields.Integer(required=True)
    commonName = fields.String(required=True)
    officialName = fields.String(required=True)
    region = fields.String(required=True)
    subregion = fields.String(required=True)
    flag = fields.String(required=True)
    coatOfArms = fields.String(required=True)
    maps = fields.String(required=True)
    area = fields.Integer(required=True)
    latitude = fields.Float(required=True)
    longitude = fields.Float(required=True)
    population = fields.Integer(required=True)
    continent = fields.String(required=True)

    class Meta:
        ordered = True

#### TODO Currency, Language and TimeZone schema (I don't know if it is going to be necessary to do this yet)

def add_country():
    try:

        # Create the tables
        db.create_all()

        r = requests.get(API_URL)

        # Make sure that api works
        if r.status_code != 200:
            raise Exception('Api not working') 

        # Adding country
        for data in r.json():

            languages = []
            currencies = []
            timezones = []

            # Currencies
            if 'currencies' in data:
                for curr in data['currencies']:
                    currencies.append(Currency(
                        name=data['currencies'][curr]['name']
                        ))

            # Languages
            if 'languages' in data:
                for lan in data['languages']:
                    languages.append(Language(
                        name=data['languages'][lan]
                        ))

            # Timezone
            if 'timezones' in data:
                for tz in data['timezones']:
                    timezones.append(TimeZone(
                        zone=tz
                        ))

            # Create a new country name object
            
            # Check if each attribute exists
            if 'name' in data and 'common' in data['name']:
                commonName = data['name']['common']
            else:
                commonName = None

            if 'name' in data and 'official' in data['name']:
                officialName = data['name']['official']
            else:
                officialName = None

            if 'region' in data:
                region = data['region']
            else:
                region = None

            if 'subregion' in data:
                subregion = data['subregion']
            else:
                subregion = None

            if 'area' in data:
                area = data['area']
            else:
                area = None

            if 'population' in data:
                population = data['population']
            else:
                population = None

            if len(data['flags']) == 0:
                flag = None
            else:
                flag = data['flags'][next(iter(data['flags']))]

            if len(data['coatOfArms']) == 0:
                coat = None
            else:
                coat = data['coatOfArms'][next(iter(data['coatOfArms']))]

            if len(data['maps']) == 0:
                maps = None
            else:
                maps = data['maps'][next(iter(data['maps']))]

            if len(data['continents']) == 0:
                continent = None
            else:
                continent = data['continents'][0]

            country = Country(
                commonName=commonName,
                officialName=officialName, 
                region=region,
                subregion=subregion,
                area=area,
                population = population,
                flag=flag,
                coatOfArms=coat,
                maps=maps,
                continent=continent,
                latitude=data['latlng'][0],
                longitude=data['latlng'][1],
                currency = currencies,
                language = languages,
                timezone = timezones
                )

            # Save everything
            db.session.add(country)
            for currency in currencies:
                db.session.add(currency)
            for language in languages:
                db.session.add(language)
            for timezone in timezones:
                db.session.add(timezone)

        # Save everything
        
        db.session.commit()

    except Exception as error: 
        print(repr(error))
        traceback.print_exc()

if __name__ == '__main__':
    add_country()

