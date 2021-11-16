import unittest
import json
import app
import models


class EndpointTest(unittest.TestCase):

    model_attributes = {
        "Covid": {
            "id",
            "cases",
            "country_id",
            "deaths",
            "lastCovidCase",
            "recovered",
            "country",
        },
        "City": {
            "id",
            "country_id",
            "latitude",
            "longitude",
            "name",
            "population",
            "timeZone",
            "country",
        },
        "Country": {
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
        },
        "CountryReduced": {
            "id",
            "officialName",
            "flag",
            "area",
            "population",
            "continent",
            "city",
        },
        "CovidInstance": {
            "id",
            "totalCases",
            "country",
            "country_id",
            "totalDeaths",
            "date",
            "totalRecovered",
            "city",
        },
    }

    def checkAttributes(self, att_obj, att):
        attributes = self.__class__.model_attributes[att].copy()
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

        all_att = self.checkAttributes(countries[0], "Country")

        self.assertEqual(len(countries), 250)
        self.assertEqual(countries[0]["officialName"], "Malaysia")
        self.assertEqual(countries[0]["population"], 32365998)
        self.assertEqual(all_att, True)

    def test_get_country_all_reduced(self):
        countries = json.loads(app.get_country_all_reduced().data)

        all_att = self.checkAttributes(countries[0], "CountryReduced")

        self.assertEqual(len(countries), 250)
        self.assertEqual(all_att, True)

    def test_get_country_by_name(self):
        country = json.loads(app.get_country_by_name("united-states").data)

        self.assertEqual(
            type(country) == list, False
        )  # Make sure that it does not returns a list

        all_att = self.checkAttributes(country, "Country")

        self.assertEqual(country["commonName"], "United States")
        self.assertEqual(all_att, True)

    def test_get_country_by_id(self):
        country = json.loads(app.get_country_by_id(109).data)

        self.assertEqual(
            type(country) == list, False
        )  # Make sure that it does not returns a list
        all_att = self.checkAttributes(country, "Country")

        self.assertEqual(country["officialName"], "United States of America")
        self.assertEqual(all_att, True)

    def test_get_city_all(self):
        cities = json.loads(app.get_city_all().data)

        all_att = self.checkAttributes(cities[0], "City")

        self.assertEqual(len(cities), 226)
        self.assertEqual(cities[0]["country"]["officialName"], "Malaysia")
        self.assertEqual(cities[0]["population"], 8285000)
        self.assertEqual(all_att, True)

    def test_get_city_by_name(self):
        city = json.loads(app.get_city_by_name("lima").data)

        all_att = self.checkAttributes(city, "City")

        self.assertEqual(city["country_id"], 102)
        self.assertEqual(all_att, True)

    def test_get_city_by_id(self):
        city = json.loads(app.get_city_by_id(92).data)

        self.assertEqual(
            type(city) == list, False
        )  # Make sure that it does not returns a list
        all_att = self.checkAttributes(city, "City")

        self.assertEqual(city["country"]["officialName"], "Republic of Guatemala")
        self.assertEqual(all_att, True)

    def test_get_covid_all(self):
        covid = json.loads(app.get_covid_all().data)

        all_att = self.checkAttributes(covid[0], "Covid")

        self.assertEqual(len(covid), 190)
        self.assertEqual(
            covid[0]["country"]["officialName"], "Islamic Republic of Afghanistan"
        )
        self.assertEqual(covid[0]["deaths"], 7206)
        self.assertEqual(all_att, True)

    def test_get_covid_by_countrId(self):
        covid = json.loads(app.get_covid_by_countryId(109).data)

        self.assertEqual(
            type(covid) == list, False
        )  # Make sure that it does not returns a list
        all_att = self.checkAttributes(covid, "Covid")

        self.assertEqual(covid["deaths"], 700932)
        self.assertEqual(all_att, True)

    def test_get_covid_by_id(self):
        covid = json.loads(app.get_covid_by_id(109).data)

        self.assertEqual(
            type(covid) == list, False
        )  # Make sure that it does not returns a list
        all_att = self.checkAttributes(covid, "Covid")

        self.assertEqual(covid["country"]["officialName"], "Republic of Malta")
        self.assertEqual(all_att, True)

    def test_get_covidInstance_by_countrId(self):
        covid = json.loads(app.get_covidInstance_by_countryId(10).data)

        self.assertEqual(len(covid), 616)
        all_att = self.checkAttributes(covid[0], "CovidInstance")

        self.assertEqual(
            covid[0]["country"]["officialName"], "Lao People's Democratic Republic"
        )
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

        queries = [
            {
                "continent": ["North America"],
                "page": ["2"],
                "lang": ["English"],
                "zone": ["-0400"],
                "sort": ["area", "population", "commonName"],
                "perPage": ["2"],
                "q": ["guil"],
            }
        ]
        for query in queries:
            countries = json.loads(app.countries(query).data)

            all_att = self.checkAttributes(countries["data"][0], "Country")

            self.assertEqual(countries["count"], 3)
            self.assertEqual(len(countries["data"]), 1)
            self.assertEqual(countries["data"][0]["commonName"], "Curaçao")
            self.assertEqual(all_att, True)

    def test_cities(self):

        queries = [
            {
                "population": ["1-100000"],
                "continent": ["Europe"],
                "page": ["2"],
                "sort": ["-population", "country", "name"],
                "perPage": ["5"],
            }
        ]
        for query in queries:
            cities = json.loads(app.cities(query).data)

            all_att = self.checkAttributes(cities["data"][0], "City")

            self.assertEqual(cities["count"], 10)
            self.assertEqual(len(cities["data"]), 5)
            self.assertEqual(cities["data"][0]["name"], "Tórshavn")
            self.assertEqual(cities["data"][1]["id"], 19)
            self.assertEqual(all_att, True)

    def test_covid(self):

        queries = [
            {
                "deaths": ["1-100"],
                "cases": ["1-3000"],
                "recovered": ["5-8000"],
                "sort": ["cases", "recovered", "deaths", "country"],
            }
        ]
        for query in queries:
            covid = json.loads(app.covid(query).data)

            all_att = self.checkAttributes(covid["data"][0], "Covid")

            self.assertEqual(covid["count"], 2)
            self.assertEqual(len(covid["data"]), 2)
            self.assertEqual(covid["data"][0]["country_id"], 166)
            self.assertEqual(covid["data"][1]["id"], 20)
            self.assertEqual(all_att, True)

    def test_all(self):

        queries = [{"q": ["en"]}]
        counts = {"City": 35, "Country": 165, "Covid": 21}
        for query in queries:
            allModels = json.loads(app.all(query).data)

            for model in allModels:
                all_att = self.checkAttributes(allModels[model]["data"][0], model)

                self.assertEqual(allModels[model]["count"], counts[model])
                self.assertEqual(all_att, True)


if __name__ == "__main__":
    with app.app.app_context():
        unittest.main()
