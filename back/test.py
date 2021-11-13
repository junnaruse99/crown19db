import unittest
import json
import app
import models


class EndpointTest(unittest.TestCase):
    def checkAttributes(self, att_obj, attributes):
        all_att = True

        # Check that both are same size
        if len(att_obj) != len(attributes):
            all_att = False

        # Check the attributes of the return object
        for att in att_obj:
            if att in attributes:
                attributes.remove(att)
            else:
                all_att = False

        if len(attributes) != 0:
            all_att = False

        return all_att

    def test_get_country_all(self):
        countries = json.loads(app.get_country_all().data)

        attributes = {
            "id",
            "commonName",
            "officialName",
            "region",
            "subregion",
            "flag",
            "coatOfArms",
            "maps",
            "area",
            "latitude",
            "longitude",
            "population",
            "continent",
            "currency",
            "language",
            "timezone",
            "city",
        }

        all_att = self.checkAttributes(countries[0], attributes)

        self.assertEqual(len(countries), 250)
        self.assertEqual(countries[0]["officialName"], "Malaysia")
        self.assertEqual(countries[0]["population"], 32365998)
        self.assertEqual(all_att, True)

    def test_get_country_all_reduced(self):
        countries = json.loads(app.get_country_all_reduced().data)

        attributes = {
            "id",
            "officialName",
            "flag",
            "area",
            "population",
            "continent",
            "city",
        }

        all_att = self.checkAttributes(countries[0], attributes)

        self.assertEqual(len(countries), 250)
        self.assertEqual(all_att, True)

    def test_get_country_by_name(self):
        country = json.loads(app.get_country_by_name("united-states").data)

        attributes = {
            "id",
            "commonName",
            "officialName",
            "region",
            "subregion",
            "flag",
            "coatOfArms",
            "maps",
            "area",
            "latitude",
            "longitude",
            "population",
            "continent",
            "currency",
            "language",
            "timezone",
            "city",
        }

        self.assertEqual(
            type(country) == list, False
        )  # Make sure that it does not returns a list

        all_att = self.checkAttributes(country, attributes)

        self.assertEqual(all_att, True)
        self.assertEqual(country["commonName"], "United States")

    def test_get_country_by_id(self):
        country = json.loads(app.get_country_by_id(109).data)

        attributes = {
            "id",
            "commonName",
            "officialName",
            "region",
            "subregion",
            "flag",
            "coatOfArms",
            "maps",
            "area",
            "latitude",
            "longitude",
            "population",
            "continent",
            "currency",
            "language",
            "timezone",
            "city",
        }

        self.assertEqual(
            type(country) == list, False
        )  # Make sure that it does not returns a list
        all_att = self.checkAttributes(country, attributes)

        self.assertEqual(all_att, True)
        self.assertEqual(country["officialName"], "United States of America")

    def test_get_city_all(self):
        cities = json.loads(app.get_city_all().data)

        attributes = {
            "id",
            "country",
            "country_id",
            "latitude",
            "longitude",
            "name",
            "population",
            "timeZone",
        }

        all_att = self.checkAttributes(cities[0], attributes)

        self.assertEqual(len(cities), 226)
        self.assertEqual(cities[0]["country"]["commonName"], "Malaysia")
        self.assertEqual(cities[0]["population"], 8285000)
        self.assertEqual(all_att, True)

    def test_get_city_by_name(self):
        city = json.loads(app.get_city_by_name("lima").data)

        attributes = {
            "id",
            "country_id",
            "latitude",
            "longitude",
            "name",
            "population",
            "timeZone",
            "country",
        }

        all_att = self.checkAttributes(city, attributes)

        self.assertEqual(all_att, True)
        self.assertEqual(city["country_id"], 102)

    def test_get_city_by_id(self):
        city = json.loads(app.get_city_by_id(92).data)

        attributes = {
            "id",
            "country",
            "country_id",
            "latitude",
            "longitude",
            "name",
            "population",
            "timeZone",
        }

        self.assertEqual(
            type(city) == list, False
        )  # Make sure that it does not returns a list
        all_att = self.checkAttributes(city, attributes)

        self.assertEqual(all_att, True)
        self.assertEqual(city["country"]["commonName"], "Guatemala")

    def test_get_covid_all(self):
        covid = json.loads(app.get_covid_all().data)

        attributes = {
            "id",
            "cases",
            "country",
            "country_id",
            "deaths",
            "lastCovidCase",
            "recovered",
            "country",
        }

        all_att = self.checkAttributes(covid[0], attributes)

        self.assertEqual(len(covid), 191)
        self.assertEqual(covid[0]["country"]["commonName"], "Afghanistan")
        self.assertEqual(covid[0]["deaths"], 7206)
        self.assertEqual(all_att, True)

    def test_get_covid_by_countrId(self):
        covid = json.loads(app.get_covid_by_countryId(109).data)

        attributes = {
            "id",
            "cases",
            "country_id",
            "deaths",
            "lastCovidCase",
            "recovered",
            "country",
        }

        self.assertEqual(
            type(covid) == list, False
        )  # Make sure that it does not returns a list
        all_att = self.checkAttributes(covid, attributes)

        self.assertEqual(all_att, True)
        self.assertEqual(covid["deaths"], 700932)

    def test_get_covid_by_id(self):
        covid = json.loads(app.get_covid_by_id(109).data)

        attributes = {
            "id",
            "cases",
            "country",
            "country_id",
            "deaths",
            "lastCovidCase",
            "recovered",
        }

        self.assertEqual(
            type(covid) == list, False
        )  # Make sure that it does not returns a list
        all_att = self.checkAttributes(covid, attributes)

        self.assertEqual(all_att, True)
        self.assertEqual(covid["country"]["commonName"], "Malta")

    def test_get_covidInstance_by_countrId(self):
        covid = json.loads(app.get_covidInstance_by_countryId(10).data)

        attributes = {
            "id",
            "totalCases",
            "country",
            "country_id",
            "totalDeaths",
            "date",
            "totalRecovered",
            "city",
        }

        self.assertEqual(len(covid), 616)
        all_att = self.checkAttributes(covid[0], attributes)

        self.assertEqual(covid[0]["country"]["commonName"], "Laos")
        self.assertEqual(covid[0]["totalCases"], 606)
        self.assertEqual(all_att, True)

    def test_else_router(self):
        response = app.index()

        postmanUrl = "https://documenter.getpostman.com/view/17756516/UUy4cRDr"
        output = f'\
        To learn how to use CovidDB\'s API, please visit our\
        <a href="{postmanUrl}">Postman</a> documentation.'

        self.assertEqual(response, output)


    def test_countries(self):
        attributes = {
                "id",
                "commonName",
                "officialName",
                "region",
                "subregion",
                "flag",
                "coatOfArms",
                "maps",
                "area",
                "latitude",
                "longitude",
                "population",
                "continent",
                "currency",
                "language",
                "timezone",
                "city",
            }

        queries = [{'continent':['North America'], 'page':['2'], 'lang': ['English'], 'zone':['-0400'], 'sort':['area', 'population', 'commonName'], 'perPage':['2']}]
        for query in queries:
            countries = json.loads(app.countries(query).data)

            all_att = self.checkAttributes(countries['data'][0], attributes)

            self.assertEqual(countries['count'], 20)
            self.assertEqual(len(countries['data']), 2)
            self.assertEqual(countries['data'][0]["commonName"], "Anguilla")
            self.assertEqual(countries['data'][1]["id"], 143)
            self.assertEqual(all_att, True)

    def test_cities(self):
        attributes = {
            "id",
            "country_id",
            "latitude",
            "longitude",
            "name",
            "population",
            "timeZone",
            "country",
        }

        queries = [{'population':['1-100000'], 'continent':['Europe'], 'page':['2'], 'sort':['-population', 'country', 'name'], 'perPage':['5']}]
        for query in queries:
            cities = json.loads(app.cities(query).data)

            all_att = self.checkAttributes(cities['data'][0], attributes)

            self.assertEqual(cities['count'], 10)
            self.assertEqual(len(cities['data']), 5)
            self.assertEqual(cities['data'][0]["name"], "Tórshavn")
            self.assertEqual(cities['data'][1]["id"], 19)
            self.assertEqual(all_att, True)

    def test_covid(self):
        attributes = {
            "id",
            "cases",
            "country_id",
            "deaths",
            "lastCovidCase",
            "recovered",
            "country",
        }

        queries = [{'deaths':['1-100'], 'cases':['1-3000'], 'recovered':['5-8000'], 'sort':['cases', 'recovered', 'deaths', 'country']}]
        for query in queries:
            covid = json.loads(app.covid(query).data)

            all_att = self.checkAttributes(covid['data'][0], attributes)

            self.assertEqual(covid['count'], 2)
            self.assertEqual(len(covid['data']), 2)
            self.assertEqual(covid['data'][0]["country_id"], 166)
            self.assertEqual(covid['data'][1]["id"], 20)
            self.assertEqual(all_att, True)
if __name__ == "__main__":
    with app.app.app_context():
        unittest.main()
