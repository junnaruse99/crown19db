import unittest
import sys
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

url = "http://localhost:3000/"
path = sys.argv[1]

class SplashTest(unittest.TestCase):
    def setUp(cls):
        options = Options()
        options.add_argument('--headless')
        options.add_argument('--log-level=3')
        options.add_argument('--no-sandbox')
        cls.driver = webdriver.Chrome(path, options=options)
        cls.driver.get(url)

    def tearDown(cls):
        cls.driver.quit()

    def test_countries_card(self):
        card = self.driver.find_elements(By.CLASS_NAME, "card-block")[0]
        self.assertEqual(card.find_element(By.CLASS_NAME, "card-title").text, "Countries")
        card.click()
        header = WebDriverWait(self.driver, timeout=10).until(lambda d: d.find_element(By.TAG_NAME, "h2"))
        self.assertEqual(header.text, "Countries")
        self.assertEqual(self.driver.current_url, url + "country")

    def test_cities_card(self):
        card = self.driver.find_elements(By.CLASS_NAME, "card-block")[1]
        self.assertEqual(card.find_element(By.CLASS_NAME, "card-title").text, "Cities")
        card.click()
        header = WebDriverWait(self.driver, timeout=10).until(lambda d: d.find_element(By.TAG_NAME, "h2"))
        self.assertEqual(header.text, "Cities")
        self.assertEqual(self.driver.current_url, url + "city")

    def test_covid_card(self):
        card = self.driver.find_elements(By.CLASS_NAME, "card-block")[2]
        self.assertEqual(card.find_element(By.CLASS_NAME, "card-title").text, "Covid")
        card.click()
        header = WebDriverWait(self.driver, timeout=10).until(lambda d: d.find_element(By.TAG_NAME, "h2"))
        self.assertEqual(header.text, "Country Covid Data")
        self.assertEqual(self.driver.current_url, url + "covid")

if __name__ == "__main__":
    PATH = sys.argv[1]
    unittest.main(argv=['first-arg-is-ignored'])