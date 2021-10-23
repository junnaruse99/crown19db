import traceback
import requests
import json
from models import City, Country

CITY_API_URL = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=&rows=10000&sort=name'

#### TODO We need more information for cities, this is too little, maybe another api 
#### I still don't know how to do city

COUNTRY_DICT = {
    'Iran, Islamic Rep. of': 'Iran',
    'Syrian Arab Republic': 'Syria',
    'West Bank and Gaza Strip': 'Palestine',
    'Viet Nam': 'Vietnam',
    'Russian Federation': 'Russia',
    'Venezuela, Bolivarian Rep. of': 'Venezuela',
    'Sudan, The Republic of': 'Sudan',
    'Libyan Arab Jamahiriya': 'Libya',
    'Libyan': 'Libya',
    'Korea, Republic of': 'South Korea',
    'Tanzania, United Republic of': 'Tanzania',
    "Côte d'Ivoire": 'Ivory Coast',
    'Czech Republic': 'Czechia',
    'Congo, Democratic Republic of the': 'DR Congo',
    'Wallis and Futuna Islands': 'Wallis and Futuna',
    'Moldova, Republic of': 'Moldova',
    "Korea, Dem. People's Rep. of": "North Korea",
    "Lao People's Dem. Rep.": 'Laos',
    "Taiwan, China": "China",
    "Brunei Darussalam": "Brunei",
    "Faeroe Islands": "Faroe Islands",
    'South Sudan, The Republic of': 'Sudan',
}

def add_city():
    try:

        r = requests.get(CITY_API_URL)

        # Make sure that api works
        if r.status_code != 200:
            raise Exception('Api not working') 

        cities = {}

        for fields in r.json()['records']:
            
            data = fields['fields']

            # Create a new city name object
            if 'cou_name_en' in data:
                if data['cou_name_en'] in COUNTRY_DICT:
                    countryName = COUNTRY_DICT[data['cou_name_en']]
                else:
                    countryName = data['cou_name_en']
            else:
                countryName = None

            if 'ascii_name' in data:
                cityName = data['ascii_name']
            elif 'name' in data:
                cityName = data['name']
            else:
                cityName = None

            if countryName and countryName not in cities: cities[countryName] = []

            if countryName and cityName:
                cities[countryName].append({
                    'name': cityName,
                    'latitude': data['coordinates'][0],
                    'longitude': data['coordinates'][1],
                    'population': data['population'],
                    'timeZone': data['timezone']
                })

        # Saving cities in a json
        with open('cities.json', 'w') as fp:
            json.dump(cities, fp)

    except Exception as error: 
        print(repr(error))
        traceback.print_exc()

if __name__ == '__main__':
    add_city()