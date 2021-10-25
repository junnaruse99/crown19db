import traceback
import requests
import json
from models import Country, Language, Currency, TimeZone, City, db
import pandas as pd
import numpy as np

COUNTRY_API_URL = "https://restcountries.com/v3.1/all"

COUNTRY_DICT = {
    "Iran, Islamic Rep. of": "Iran",
    "Syrian Arab Republic": "Syria",
    "West Bank and Gaza Strip": "Palestine",
    "Viet Nam": "Vietnam",
    "Russian Federation": "Russia",
    "Venezuela, Bolivarian Rep. of": "Venezuela",
    "Sudan, The Republic of": "Sudan",
    "Libyan Arab Jamahiriya": "Libya",
    "Libyan": "Libya",
    "Korea, Republic of": "South Korea",
    "Tanzania, United Republic of": "Tanzania",
    "Côte d'Ivoire": "Ivory Coast",
    "Czech Republic": "Czechia",
    "Congo, Democratic Republic of the": "DR Congo",
    "Wallis and Futuna Islands": "Wallis and Futuna",
    "Moldova, Republic of": "Moldova",
    "Korea, Dem. People's Rep. of": "North Korea",
    "Lao People's Dem. Rep.": "Laos",
    "Taiwan, China": "China",
    "Brunei Darussalam": "Brunei",
    "Faeroe Islands": "Faroe Islands",
    "South Sudan, The Republic of": "Sudan",
}

CITY_DICT = {
    "Washington, D.C.": "New York",
    "St. George's": "Saint George's",
    "City of San Marino": "San Marino",
    "South Tarawa": "Tarawa",
    "City of Victoria": "Hong Kong",
    "Sri Jayawardenepura Kotte": "Colombo",
    "Nuku'alofa": "Nuku`alofa",
}


def add_country():
    try:

        db.create_all()

        # with open('cities.json') as json_file:
        #     cities = json.load(json_file)

        cities = pd.read_csv("../data/worldcities.csv")

        r = requests.get(COUNTRY_API_URL)

        # Make sure that api works
        if r.status_code != 200:
            raise Exception("Api not working")

        # Adding country
        for data in r.json():

            languages = []
            currencies = []
            timezones = []

            # Currencies
            if "currencies" in data:
                for curr in data["currencies"]:
                    currencies.append(Currency(name=data["currencies"][curr]["name"]))

            # Languages
            if "languages" in data:
                for lan in data["languages"]:
                    languages.append(Language(name=data["languages"][lan]))

            # Timezone
            if "timezones" in data:
                for tz in data["timezones"]:
                    timezones.append(TimeZone(zone=tz))

            # Create a new country name object

            # Check if each attribute exists
            if "subregion" in data:
                subregion = data["subregion"]
            else:
                subregion = None
            if len(data["flags"]) != 0:
                flag = data["flags"][next(iter(data["flags"]))]
            else:
                flag = None
            if len(data["coatOfArms"]) != 0:
                coat = data["coatOfArms"][next(iter(data["coatOfArms"]))]
            else:
                coat = None
            if len(data["maps"]) != 0:
                maps = data["maps"][next(iter(data["maps"]))]
            else:
                maps = None
            continent = data["continents"][0]
            if "capital" in data:
                capital = data["capital"][0]
            else:
                capital = ""

            country = Country(
                commonName=data["name"]["common"],
                officialName=data["name"]["official"],
                region=data["region"],
                subregion=subregion,
                area=data["area"],
                population=data["population"],
                flag=flag,
                coatOfArms=coat,
                maps=maps,
                continent=continent,
                latitude=data["latlng"][0],
                longitude=data["latlng"][1],
                currency=currencies,
                language=languages,
                timezone=timezones,
                covid=None,
                covidInstances=[],
                city=None,
            )

            # Add the city
            # Check that the name of the country is in my city data
            if capital in CITY_DICT:
                capital_aux = CITY_DICT[capital]
            else:
                capital_aux = capital

            city_obj = cities[cities["city"] == capital_aux]

            if city_obj.empty:
                city_obj = cities[cities["city_ascii"] == capital_aux]

            if not city_obj.empty:
                population = city_obj["population"].values[0]
                try:
                    population = int(population)
                except ValueError:
                    population = None

                city_capital = City(
                    name=capital,
                    latitude=city_obj["lat"].values[0],
                    longitude=city_obj["lng"].values[0],
                    population=population,
                    timeZone=None,
                )
                country.city = city_capital
            else:
                city_capital = None

            # Save everything
            db.session.add(country)
            if city_capital:
                db.session.add(city_capital)
            else:
                print(country.commonName, capital)

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


if __name__ == "__main__":
    add_country()
