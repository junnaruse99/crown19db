import os
import pandas as pd
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import traceback
import requests
import json
from datetime import datetime
from Country import Country
from marshmallow import fields
from flask_marshmallow import Marshmallow


ABS_PATH = os.path.abspath('..')
CONFIRMED_PATH = 'data/time_series_covid19_confirmed_global.csv'
DEATH_PATH = 'data/time_series_covid19_deaths_global.csv'
RECOVERED_PATH = 'data/time_series_covid19_recovered_global.csv'
JSON_PATH = 'data'

app = Flask(__name__)
app.debug = True
app.config['QLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config ['SQLALCHEMY_DATABASE_URI'] = \
    "postgresql+psycopg2://username:password"\
    "@crown19db.ck9wwhipyc5v.us-west-2.rds.amazonaws.com:5432/postgres"

db = SQLAlchemy(app)
ma = Marshmallow(app)

class Covid(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    countryId = db.Column(db.Integer, db.ForeignKey('country.id'))
    cases = db.Column(db.String(), unique=False, nullable=False)
    recovered = db.Column(db.String(), unique=False, nullable=False)
    deaths = db.Column(db.String(), unique=False, nullable=False)
    lastCovidCase = db.Column(db.DateTime, unique=False, nullable=False)

    def __repr__(self):
        return '<Covid for country %r>' % self.countryId

class CovidInstance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    countryId = db.Column(db.Integer, db.ForeignKey('Country.id'))
    date = db.Column(db.DateTime, unique=False, nullable=False)
    totalCases = db.Column(db.String(), unique=False, nullable=False)
    totalRecovered = db.Column(db.String(), unique=False, nullable=False)
    totalDeaths = db.Column(db.String(), unique=False, nullable=False)

    def __repr__(self):
        return '<Covid in %r for country %r>' % (self.date, self.countryId)

def generateCovidData():

    # Create the tables
    db.create_all()

    # In case the is difference in country names
    countryNames = {'US': 'United States'}

    # Get the data and fill with '' all null values
    confirmed = pd.read_csv(os.path.join(ABS_PATH, CONFIRMED_PATH))
    confirmed.fillna(value='', inplace=True)
    deaths = pd.read_csv(os.path.join(ABS_PATH, DEATH_PATH))
    deaths.fillna(value='', inplace=True)
    recovered = pd.read_csv(os.path.join(ABS_PATH, RECOVERED_PATH))
    recovered.fillna(value='', inplace=True)

    # Drop columns that I am not going to use
    dropColumns = ['Province/State', 'Lat', 'Long']
    confirmed.drop(dropColumns, inplace=True, axis=1)
    deaths.drop(dropColumns, inplace=True, axis=1)
    recovered.drop(dropColumns, inplace=True, axis=1)

    # Group by datasets by country
    confirmed = confirmed.groupby(['Country/Region']).sum()
    deaths = deaths.groupby(['Country/Region']).sum()
    recovered = recovered.groupby(['Country/Region']).sum()

    # Create an empty list to fill all the country data
    covid_total = []
    covidInstance_total = []
    
    # Merge all three datasets base on the country
    try:
        for idx in confirmed.index:

            if idx in countryNames:
                country_name = countryNames[idx]
            else:
                country_name = idx  

            country_name = Country.query.filter_by(commonName=country_name)

            if len(country_name) == 0:
                print("I couldn't find this country: ", country_name)

            dates = list(confirmed.columns)[4:]

            # This variables are to figure out when was the last day that there was a covid case
            lastDate = dates[0]
            flagLastDate = False

            # Go through the list in descending order
            for date in dates[::-1]:

                covidInstance_total.append(CovidInstance(
                    country_name.id,
                    datetime.strptime(date, '%m/%d/%y'),
                    int(confirmed.loc[idx, col]),
                    int(deaths.loc[idx, col]),
                    int(recovered.loc[idx, col])
                ))

                # If I find that there were more than 0 covid cases and that the flag was not raised, then I found the last day
                if confirmed.loc[idx, col] != 0 and flagLastDate == False:
                    lastDate = col
                    flagLastDate = True

            covid_total.append(
                Covid(
                country_name['id'],
                sum(confirmed.loc[idx, cols]),
                sum(deaths.loc[idx, cols]),
                sum(recovered.loc[idx, cols]),
                datetime.strptime(lastDate, '%m/%d/%y')
                ))

        # Saving my data
        # TODO Define the relationship betwen covid and app table
        db.session.bulk_save_objects(covid_total)
        db.session.bulk_save_objects(covidInstance_total)
        db.session.commit()

    except Exception as error: 
        print(repr(error))
        traceback.print_exc()

if __name__ == '__main__':
    generateCovidData()




