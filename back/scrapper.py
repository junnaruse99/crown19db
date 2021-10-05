import requests
from bs4 import BeautifulSoup

TOPIC = "Hubei"

def main():
    response = requests.get(
        url="https://en.wikipedia.org/wiki/" + TOPIC,
    )
    soup = BeautifulSoup(response.content, 'html.parser')
    body = soup.find(id="bodyContent").find_all("p")
    print(body)

main()