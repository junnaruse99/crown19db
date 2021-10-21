"""
imports
"""

import unittest
import app


class TestBackend(unittest.TestCase):

    def test_template(self):
        self.assertEqual(True, True)

    def test_scrapper(self):
        pass

    def test_app(self):
        pass

    def test_error(self):
        result = app.get_country("Atlantis")
        self.assertEqual(result.status_code, 404)

if __name__ == '__main__':
    unittest.main()