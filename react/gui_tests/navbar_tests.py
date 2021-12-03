import unittest
import sys
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

# TODO automatically set subdomain based on what 
# branch the test is running in 
url = "https://dev.crown19db.me/"
path = sys.argv[1]

class NavbarTest(unittest.TestCase):
    def setUp(cls):
        options = Options()
        options.add_argument('--headless')
        options.add_argument('--log-level=3')
        options.add_argument('--no-sandbox')
        cls.driver = webdriver.Chrome(path, options=options)
        cls.driver.get(url)

    def tearDown(cls):
        cls.driver.quit()

    def test_brand_button(self):
        self.driver.find_element(By.CLASS_NAME, "navbar-brand").click()
        header = self.driver.find_element(By.TAG_NAME, "h1")
        self.assertEqual(header.text, "Welcome to CovidDB")
        self.assertEqual(self.driver.current_url, url)

    def test_collapse_button(self):
        link_list = self.driver.find_elements(By.CLASS_NAME, "nav-link")
        for link in link_list:
            self.assertFalse(link.is_displayed())

        self.driver.find_element(By.CLASS_NAME, "navbar-toggler").click()
        for link in link_list:
            self.assertTrue(link.is_displayed())

        self.driver.find_element(By.CLASS_NAME, "navbar-toggler").click()
        for link in link_list:
            self.assertFalse(link.is_displayed())

    def test_home_button(self):
        self.driver.find_element(By.CLASS_NAME, "navbar-toggler").click()
        link = self.driver.find_elements(By.CLASS_NAME, "nav-link")[0]
        self.assertEqual(link.text, "Home")
        link.click()
        header = self.driver.find_element(By.TAG_NAME, "h1")
        self.assertEqual(header.text, "Welcome to CovidDB")
        self.assertEqual(self.driver.current_url, url)

    def test_about_button(self):
        self.driver.find_element(By.CLASS_NAME, "navbar-toggler").click()
        link = self.driver.find_elements(By.CLASS_NAME, "nav-link")[1]
        self.assertEqual(link.text, "About us")
        link.click()
        header = self.driver.find_element(By.TAG_NAME, "h1")
        self.assertEqual(header.text, "About CovidDB")
        self.assertEqual(self.driver.current_url, url + "about")

    def test_country_button(self):
        self.driver.find_element(By.CLASS_NAME, "navbar-toggler").click()
        link = self.driver.find_elements(By.CLASS_NAME, "nav-link")[2]
        self.assertEqual(link.text, "Country")
        link.click()
        header = WebDriverWait(self.driver, timeout=10).until(lambda d: d.find_element(By.TAG_NAME, "h2"))
        self.assertEqual(header.text, "Countries")
        self.assertEqual(self.driver.current_url, url + "country")

    def test_city_button(self):
        self.driver.find_element(By.CLASS_NAME, "navbar-toggler").click()
        link = self.driver.find_elements(By.CLASS_NAME, "nav-link")[3]
        self.assertEqual(link.text, "City")
        link.click()
        header = WebDriverWait(self.driver, timeout=10).until(lambda d: d.find_element(By.TAG_NAME, "h2"))
        self.assertEqual(header.text, "Cities")
        self.assertEqual(self.driver.current_url, url + "city")

    def test_covid_button(self):
        self.driver.find_element(By.CLASS_NAME, "navbar-toggler").click()
        link = self.driver.find_elements(By.CLASS_NAME, "nav-link")[4]
        self.assertEqual(link.text, "Covid")
        link.click()
        header = WebDriverWait(self.driver, timeout=10).until(lambda d: d.find_element(By.TAG_NAME, "h2"))
        self.assertEqual(header.text, "Country Covid Data")
        self.assertEqual(self.driver.current_url, url + "covid")

if __name__ == "__main__":
    PATH = sys.argv[1]
    unittest.main(argv=['first-arg-is-ignored'])