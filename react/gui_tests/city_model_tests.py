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
url = "https://www.crown19db.me/city"
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
        expected = ["Beijing", "Taipei", "City of Victoria"]
        for i in range(len(rows)):
            header = rows[i].find_elements(By.TAG_NAME, "td")[0]
            self.assertEqual(header.text, expected[i])

        self.assertEqual(self.driver.current_url, url + "?q=china")      

    def test_continent_filter(self):
        filter_select = WebDriverWait(self.driver, timeout=10).until(lambda d: Select(d.find_element(By.ID, "continent")))
        filter_select.select_by_visible_text("Oceania")
        rows = WebDriverWait(self.driver, timeout=10).until(lambda d: d.find_elements(By.CLASS_NAME, "modelrow"))
        expected = ["Pago Pago", "Apia", "Avarua", "Palikir"]
        for i in range(4):
            header = rows[i].find_elements(By.TAG_NAME, "td")[0]
            self.assertEqual(header.text, expected[i])

        self.assertEqual(self.driver.current_url, url + "?continent=Oceania")   
        
    def test_ascending_sort(self):
        sort_select = WebDriverWait(self.driver, timeout=10).until(lambda d: Select(d.find_element(By.ID, "sort")))
        sort_select.select_by_visible_text("City Name (A-Z)")
        rows = WebDriverWait(self.driver, timeout=10).until(lambda d: d.find_elements(By.CLASS_NAME, "modelrow"))
        expected = ["Abu Dhabi", "Abuja", "Accra", "Adamstown"]
        for i in range(4):
            header = rows[i].find_elements(By.TAG_NAME, "td")[0]
            self.assertEqual(header.text, expected[i])

        self.assertEqual(self.driver.current_url, url + "?sort=name")   

    def test_descending_sort(self):
        sort_select = WebDriverWait(self.driver, timeout=10).until(lambda d: Select(d.find_element(By.ID, "sort")))
        sort_select.select_by_visible_text("Country Name (Z-A)")
        rows = WebDriverWait(self.driver, timeout=10).until(lambda d: d.find_elements(By.CLASS_NAME, "modelrow"))
        expected = ["Road Town", "Vatican City", "Washington, D.C.", "Dodoma"]
        for i in range(4):
            header = rows[i].find_elements(By.TAG_NAME, "td")[0]
            self.assertEqual(header.text, expected[i])

        self.assertEqual(self.driver.current_url, url + "?sort=-country")   

if __name__ == "__main__":
    PATH = sys.argv[1]
    unittest.main(argv=['first-arg-is-ignored'])