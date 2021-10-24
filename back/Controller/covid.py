import os
import pandas as pd
import json

ABS_PATH = os.path.abspath('..')
CONFIRMED_PATH = 'data/time_series_covid19_confirmed_global.csv'
DEATH_PATH = 'data/time_series_covid19_deaths_global.csv'
RECOVERED_PATH = 'data/time_series_covid19_recovered_global.csv'
JSON_PATH = 'data'

def generateCovidData():

    # In case the is difference in country names
    countryNames = {'US': 'United States'}

    # Get the data and fill with '' all null values
    confirmed = pd.read_csv(os.path.join(ABS_PATH, CONFIRMED_PATH))
    confirmed.fillna(value='', inplace=True)
    deaths = pd.read_csv(os.path.join(ABS_PATH, DEATH_PATH))
    deaths.fillna(value='', inplace=True)
    recovered = pd.read_csv(os.path.join(ABS_PATH, RECOVERED_PATH))
    recovered.fillna(value='', inplace=True)

    # Drop columns that I am not going to use
    dropColumns = ['Province/State', 'Lat', 'Long']
    confirmed.drop(dropColumns, inplace=True, axis=1)
    deaths.drop(dropColumns, inplace=True, axis=1)
    recovered.drop(dropColumns, inplace=True, axis=1)

    # Group by datasets by country
    confirmed = confirmed.groupby(['Country/Region']).sum()
    deaths = deaths.groupby(['Country/Region']).sum()
    recovered = recovered.groupby(['Country/Region']).sum()

    # Create an empty list to fill all the country data
    covid = []
    covidInstance = []
    
    # Merge all three datasets base on the country
    for idx in confirmed.index:

        if idx in countryNames:
            countryName = countryNames[idx]
        else:
            countryName = idx  

        aux = {}
        aux['Country'] = countryName
        cols = list(confirmed.columns)[4:]

        # This variables are to figure out when was the last day that there was a covid case
        lastDate = cols[0]
        flagLastDate = False

        # Go through the list in descending order
        for col in cols[::-1]:
            aux[col] = {
                'Cases': int(confirmed.loc[idx, col]),
                'Deaths': int(deaths.loc[idx, col]),
                'Recovered': int(recovered.loc[idx, col])
            }

            # If I find that there were more than 0 covid cases and that the flag was not raised, then I found the last day
            if confirmed.loc[idx, col] != 0 and flagLastDate == False:
                lastDate = col
                flagLastDate = True

        covidInstance.append(aux)

        covid.append({
            'Country': countryName,
            'Cases': sum(confirmed.loc[idx, cols]),
            'Deaths': sum(deaths.loc[idx, cols]),
            'Recovered': sum(recovered.loc[idx, cols]),
            'lastDateConfirmed': lastDate
        })

    # Saving my data
    with open(os.path.join(ABS_PATH, JSON_PATH, 'covid.json'), "w") as outfile:
        json.dump(covid, outfile)

    with open(os.path.join(ABS_PATH, JSON_PATH, 'covidInstance.json'), "w") as outfile:
        json.dump(covidInstance, outfile)



generateCovidData()




