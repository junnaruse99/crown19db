import unittest
import json
import app

class EndpointTest(unittest.TestCase):

    def test_get_country_all(self):
        countries = app.get_country_all
        self.assertEqual(len(countries), 250)

    def test_get(self):
        self.assertEqual(True, True)
