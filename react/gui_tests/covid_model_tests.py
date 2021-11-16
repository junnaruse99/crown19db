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
url = "https://dev.crown19db.me/covid"
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
        rows = WebDriverWait(self.driver, timeout=10).until(lambda d: d.find_elements(By.CLASS_NAME, "modelrow"))
        expected = ["People's Republic of China", "Republic of China (Taiwan)"]
        for i in range(len(rows)):
            header = rows[i].find_elements(By.TAG_NAME, "td")[0]
            self.assertEqual(header.text, expected[i])

        self.assertEqual(self.driver.current_url, url + "?q=china")    

    def test_cases_filter(self):
        filter_select = WebDriverWait(self.driver, timeout=10).until(lambda d: Select(d.find_element(By.ID, "cases")))
        filter_select.select_by_visible_text("> 25M")
        rows = WebDriverWait(self.driver, timeout=10).until(lambda d: d.find_elements(By.CLASS_NAME, "modelrow"))
        expected = ["Republic of India", "United States of America"]
        for i in range(len(rows)):
            header = rows[i].find_elements(By.TAG_NAME, "td")[0]
            self.assertEqual(header.text, expected[i])

        self.assertEqual(self.driver.current_url, url + "?cases=25000000-99999999")    

    def test_deaths_filter(self):
        filter_select = WebDriverWait(self.driver, timeout=10).until(lambda d: Select(d.find_element(By.ID, "deaths")))
        filter_select.select_by_visible_text("> 500K")
        rows = WebDriverWait(self.driver, timeout=10).until(lambda d: d.find_elements(By.CLASS_NAME, "modelrow"))
        expected = ["Federative Republic of Brazil", "United States of America"]
        for i in range(len(rows)):
            header = rows[i].find_elements(By.TAG_NAME, "td")[0]
            self.assertEqual(header.text, expected[i])

        self.assertEqual(self.driver.current_url, url + "?deaths=500000-999999")

    def test_recovered_filter(self):
        filter_select = WebDriverWait(self.driver, timeout=10).until(lambda d: Select(d.find_element(By.ID, "recovered")))
        filter_select.select_by_visible_text("> 25M")
        rows = WebDriverWait(self.driver, timeout=10).until(lambda d: d.find_elements(By.CLASS_NAME, "modelrow"))
        expected = ["Republic of India"]
        for i in range(len(rows)):
            header = rows[i].find_elements(By.TAG_NAME, "td")[0]
            self.assertEqual(header.text, expected[i])

        self.assertEqual(self.driver.current_url, url + "?recovered=25000000-99999999")    

    def test_ascending_sort(self):
        sort_select = WebDriverWait(self.driver, timeout=10).until(lambda d: Select(d.find_element(By.ID, "sort")))
        sort_select.select_by_visible_text("# of Cases (Asc)")
        rows = WebDriverWait(self.driver, timeout=10).until(lambda d: d.find_elements(By.CLASS_NAME, "modelrow"))
        expected = ["Federated States of Micronesia", "Independent and Sovereign Republic of Kiribati", "Independent State of Samoa", "Republic of Vanuatu"]
        for i in range(4):
            header = rows[i].find_elements(By.TAG_NAME, "td")[0]
            self.assertEqual(header.text, expected[i])

        self.assertEqual(self.driver.current_url, url + "?sort=cases")    

    def test_descending_sort(self):
        sort_select = WebDriverWait(self.driver, timeout=10).until(lambda d: Select(d.find_element(By.ID, "sort")))
        sort_select.select_by_visible_text("# of Deaths (Desc)")
        rows = WebDriverWait(self.driver, timeout=10).until(lambda d: d.find_elements(By.CLASS_NAME, "modelrow"))
        expected = ["United States of America", "Federative Republic of Brazil", "Republic of India", "United Mexican States"]
        for i in range(4):
            header = rows[i].find_elements(By.TAG_NAME, "td")[0]
            self.assertEqual(header.text, expected[i])

        self.assertEqual(self.driver.current_url, url + "?sort=-deaths")    

if __name__ == "__main__":
    PATH = sys.argv[1]
    unittest.main(argv=['first-arg-is-ignored'])