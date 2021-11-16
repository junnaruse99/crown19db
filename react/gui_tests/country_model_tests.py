import unittest
import sys
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import Select

# TODO automatically set subdomain based on what 
# branch the test is running in
url = "https://dev.crown19db.me/country"
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

    def test_searching(self):
        search_bar = WebDriverWait(self.driver, timeout=10).until(lambda d: d.find_element(By.NAME, "q"))
        search_bar.send_keys("china", Keys.ENTER)
        headers = WebDriverWait(self.driver, timeout=10).until(lambda d: d.find_elements(By.CLASS_NAME, "card-title"))
        self.assertEqual(headers[0].text, "People's Republic of China")
        self.assertEqual(headers[1].text, "Macao Special Administrative Region of the People's Republic of China")
        self.assertEqual(headers[2].text, "Republic of China (Taiwan)")
        self.assertEqual(headers[3].text, "Hong Kong Special Administrative Region of the People's Republic of China")
        self.assertEqual(self.driver.current_url, url + "?q=china")      
        self.assertEqual(1, 1)

    def test_continent_filter(self):
        filter_select = WebDriverWait(self.driver, timeout=10).until(lambda d: Select(d.find_element(By.ID, "continent")))
        filter_select.select_by_visible_text("Antarctica")
        headers = WebDriverWait(self.driver, timeout=10).until(lambda d: d.find_elements(By.CLASS_NAME, "card-title"))
        self.assertEquals(headers[0].text, "Heard Island and McDonald Islands")
        self.assertEquals(headers[1].text, "Territory of the French Southern and Antarctic Lands")
        self.assertEquals(headers[2].text, "Antarctica")
        self.assertEquals(headers[3].text, "Bouvet Island")
        self.assertEquals(headers[4].text, "South Georgia and the South Sandwich Islands")
        self.assertEqual(self.driver.current_url, url + "?continent=Antarctica")

    def test_population_filter(self):
        filter_select = WebDriverWait(self.driver, timeout=10).until(lambda d: Select(d.find_element(By.ID, "population")))
        filter_select.select_by_visible_text("> 200M")
        headers = WebDriverWait(self.driver, timeout=10).until(lambda d: d.find_elements(By.CLASS_NAME, "card-title"))
        self.assertEquals(headers[0].text, "People's Republic of China")
        self.assertEquals(headers[1].text, "Republic of India")
        self.assertEquals(headers[2].text, "United States of America")
        self.assertEquals(headers[3].text, "Republic of Indonesia")
        self.assertEquals(headers[4].text, "Federative Republic of Brazil")
        self.assertEquals(headers[5].text, "Federal Republic of Nigeria")
        self.assertEquals(headers[6].text, "Islamic Republic of Pakistan")
        self.assertEqual(self.driver.current_url, url + "?population=200000000-999999999999")

    def test_ascending_sort(self):
        sort_select = WebDriverWait(self.driver, timeout=10).until(lambda d: Select(d.find_element(By.ID, "sort")))
        sort_select.select_by_visible_text("Land Mass (Asc)")
        headers = WebDriverWait(self.driver, timeout=10).until(lambda d: d.find_elements(By.CLASS_NAME, "card-title"))
        self.assertEquals(headers[0].text, "Svalbard og Jan Mayen")
        self.assertEquals(headers[1].text, "Vatican City State")
        self.assertEquals(headers[2].text, "Principality of Monaco")
        self.assertEquals(headers[3].text, "Gibraltar")

    def test_descending_sort(self):
        sort_select = WebDriverWait(self.driver, timeout=10).until(lambda d: Select(d.find_element(By.ID, "sort")))
        sort_select.select_by_visible_text("Name (Z-A)")
        headers = WebDriverWait(self.driver, timeout=10).until(lambda d: d.find_elements(By.CLASS_NAME, "card-title"))
        self.assertEquals(headers[0].text, "Virgin Islands of the United States")
        self.assertEquals(headers[1].text, "Virgin Islands")
        self.assertEquals(headers[2].text, "Vatican City State")
        self.assertEquals(headers[3].text, "United States of America")

if __name__ == "__main__":
    PATH = sys.argv[1]
    unittest.main(argv=['first-arg-is-ignored'])