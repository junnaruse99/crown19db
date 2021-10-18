"""
imports
"""

import unittest
import script
import scrapper


class TestBackend(unittest.TestCase):

    def test_template(self):
        self.assertEqual(True, True)

    def test_scrapper(self):
        scrapper.main()
        pass

    def test_script(self):
        pass

if __name__ == '__main__':
    unittest.main()