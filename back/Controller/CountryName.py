from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import traceback
import requests
import json

API_URL = 'https://restcountries.com/v3.1/all'

app = Flask(__name__)
app.debug = True
app.config['QLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config ['SQLALCHEMY_DATABASE_URI'] = \
    "postgresql+psycopg2://username:password"\
    "@crown19db.ck9wwhipyc5v.us-west-2.rds.amazonaws.com:5432/postgres"

db = SQLAlchemy(app)

class CountryName(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    officialName = db.Column(db.String(), unique=True, nullable=False)
    commonName = db.Column(db.String(), unique=True, nullable=False)
   
    def __init__(self, officialName=None, commonName=None):
       self.officialName = officialName
       self.commonName = commonName

    def __repr__(self):
        return '<Country Name %r>' % self.officialName

def add_countryName():
    try:
        r = requests.get(API_URL)

        # Make sure that api works
        if r.status_code != 200:
            raise Exception('Api not working') 

        countriesName = []

        db.create_all()

        for data in r.json():
            # Create a new country name object
            countriesName.append(CountryName(data['name']['official'], data['name']['common']))
            
        db.session.bulk_save_objects(countriesName)
        db.session.commit()

    except Exception as error: 
        print(repr(error))
        traceback.print_exc()

if __name__ == '__main__':
    add_countryName()