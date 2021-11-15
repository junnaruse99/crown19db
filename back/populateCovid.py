import os
import json
import traceback
from datetime import datetime
from models import Country, Covid, CovidInstance, City, db
import pandas as pd

ABS_PATH = os.path.abspath(".")
CONFIRMED_PATH = "data/time_series_covid19_confirmed_global.csv"
DEATH_PATH = "data/time_series_covid19_deaths_global.csv"
RECOVERED_PATH = "data/time_series_covid19_recovered_global.csv"

COVID_DICT = {
    "Burma": "Myanmar",
    "Cabo Verde": "Cape Verde",
    "Congo (Brazzaville)": "DR Congo",
    "Congo (Kinshasa)": "DR Congo",
    "Cote d'Ivoire": "Ivory Coast",
    "Holy See": "Vatican City",
    "Korea, South": "South Korea",
    "Sao Tome and Principe": "São Tomé and Príncipe",
    "Taiwan*": "Taiwan",
    "US": "United States",
}


def generateCovidData():

    # Make a dict to avoid having country duplicates
    countries = set()

    # Get the data
    confirmed = pd.read_csv(os.path.join(ABS_PATH, CONFIRMED_PATH))
    deaths = pd.read_csv(os.path.join(ABS_PATH, DEATH_PATH))
    recovered = pd.read_csv(os.path.join(ABS_PATH, RECOVERED_PATH))

    # Drop columns that I am not going to use
    dropColumns = ["Province/State", "Lat", "Long"]
    confirmed.drop(dropColumns, inplace=True, axis=1)
    deaths.drop(dropColumns, inplace=True, axis=1)
    recovered.drop(dropColumns, inplace=True, axis=1)

    # Group by datasets by country
    confirmed = confirmed.groupby(["Country/Region"]).sum()
    deaths = deaths.groupby(["Country/Region"]).sum()
    recovered = recovered.groupby(["Country/Region"]).sum()

    # Create an empty list to fill all the country data
    covid_total = []
    covidInstance_total = []

    # Merge all three datasets base on the country
    try:
        for idx in confirmed.index:

            if idx in COVID_DICT:
                country_name = COVID_DICT[idx]
            else:
                country_name = idx

            # Get country obj
            country_obj = Country.query.filter_by(commonName=country_name).first()

            if country_obj and country_obj.id and country_name not in countries:

                # Get city obj
                city_obj = City.query.filter_by(country_id=country_obj.id).first()

                if city_obj:
                    city_id = city_obj.id
                else:
                    city_id = None

                dates = list(confirmed.columns)[4:][::-1]

                # This variables are to figure out when was the last day that there was a covid case
                lastDate = dates[0]
                flagLastDate = False

                # Define variables to obtain total
                maxCases = 0
                maxDeaths = 0
                maxRecovered = 0

                # Go through the list in descending order
                for i, date in enumerate(dates):

                    # Get casesDay and total
                    if pd.notnull(confirmed.loc[idx, date]) and i != len(dates) - 1:
                        confirmedDay = int(confirmed.loc[idx, date] - confirmed.loc[idx, dates[i + 1]])
                        if confirmed.loc[idx, date] > maxCases:
                            maxCases = confirmed.loc[idx, date]
                        if confirmedDay < 0:
                            confirmedDay = 0
                    elif pd.isnull(confirmed.loc[idx, date]):
                        confirmedDay = None
                    else:
                        confirmedDay = int(confirmed.loc[idx, date])

                    # Get deathsDay
                    if pd.notnull(deaths.loc[idx, date]) and i != len(dates) - 1:
                        deathsDay = int(deaths.loc[idx, date] - deaths.loc[idx, dates[i + 1]])
                        if deaths.loc[idx, date] > maxDeaths:
                            maxDeaths = deaths.loc[idx, date]
                        if deathsDay < 0:
                            deathsDay = 0
                    elif pd.isnull(deaths.loc[idx, date]):
                        deathsDay = None
                    else:
                        deathsDay = int(deaths.loc[idx, date])

                    # Get RecoveredDay
                    if pd.notnull(recovered.loc[idx, date]) and i != len(dates) - 1:
                        recoveredDay = int(recovered.loc[idx, date] - recovered.loc[idx, dates[i + 1]])
                        if recovered.loc[idx, date] > maxRecovered:
                            maxRecovered = recovered.loc[idx, date]
                        if recoveredDay < 0:
                            recoveredDay = 0
                    elif pd.isnull(recovered.loc[idx, date]):
                        recoveredDay = None
                    else:
                        recoveredDay = int(recovered.loc[idx, date])

                    covidInstance_total.append(
                        CovidInstance(
                            country_id=country_obj.id,
                            date=datetime.strptime(date, "%m/%d/%y").date(),
                            totalCases=confirmedDay,
                            totalRecovered=recoveredDay,
                            totalDeaths=deathsDay,
                            city_id=city_id,
                            country=country_obj,
                            city=city_obj,
                        )
                    )

                    # If I find that there were more than 0 covid cases and that the flag was not raised, then I found the last day
                    if (confirmed.loc[idx, date] != 0 or confirmed.loc[idx, date] != None) and flagLastDate == False:
                        lastDate = date
                        flagLastDate = True

                covid_total.append(
                    Covid(
                        country_id=country_obj.id,
                        cases=int(maxCases),
                        recovered=int(maxRecovered),
                        deaths=int(maxDeaths),
                        lastCovidCase=datetime.strptime(lastDate, "%m/%d/%y").date(),
                        country=country_obj,
                    )
                )

                countries.add(country_name)

            else:
                print(country_name)

        # Saving my data
        db.session.bulk_save_objects(covid_total)
        db.session.bulk_save_objects(covidInstance_total)
        db.session.commit()

    except Exception as error:
        print(repr(error))
        traceback.print_exc()


if __name__ == "__main__":
    generateCovidData()
