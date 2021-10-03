import pandas as pd
import json

def main():

    countryNames = {'US': 'United States'}

    confirmed = pd.read_csv('./time_series_covid19_confirmed_global.csv')
    confirmed.fillna(value='', inplace=True)
    deaths = pd.read_csv('./time_series_covid19_deaths_global.csv')
    deaths.fillna(value='', inplace=True)
    recovered = pd.read_csv('./time_series_covid19_recovered_global.csv')
    recovered.fillna(value='', inplace=True)

    # Get the sum of confirmed, deaths and recovered per day 
    confirmed_sum = confirmed[confirmed.columns.tolist()[4:]].sum().values.tolist()
    deaths_sum = deaths[deaths.columns.tolist()[4:]].sum().values.tolist()
    recovered_sum = recovered[recovered.columns.tolist()[4:]].sum().values.tolist()

    confirmed_country = confirmed.groupby(by=['Country/Region']).sum()
    deaths_country = deaths.groupby(by=['Country/Region']).sum()
    recovered_country = recovered.groupby(by=['Country/Region']).sum()

    transformed = []
    # Get countries with most cases
    days = confirmed_country.max().index.tolist()

    max_cases_country = confirmed_country.max().values.tolist()
    max_deaths_country = deaths_country.max().values.tolist()
    max_recovered_country = recovered_country.max().values.tolist()

    max_cases_state = confirmed[days].max().values.tolist()
    max_deaths_state = deaths[days].max().values.tolist()
    max_recovered_state = recovered[days].max().values.tolist()

    for i in reversed(range(len(days))):
        aux = {}
        aux['Date'] = days[i]
        
        country_name = confirmed_country.loc[confirmed_country[days[i]] == max_cases_country[i]].index.tolist()
        aux['Country-cases'] = []
        for names in country_name:
            if names in countryNames:
                aux['Country-cases'].append(countryNames[names])
            else:
                aux['Country-cases'].append(names)

        aux['Country-deaths'] = deaths_country.loc[deaths_country[days[i]] == max_deaths_country[i]].index.tolist()
        aux['Country-recovered'] = recovered_country.loc[recovered_country[days[i]] == max_recovered_country[i]].index.tolist()
        
        aux['State-cases'] = confirmed.loc[confirmed[days[i]] == max_cases_state[i]]['Province/State'].values.tolist()
        aux['State-deaths'] = deaths.loc[deaths[days[i]] == max_deaths_state[i]]['Province/State'].values.tolist()
        aux['State.recovered'] = recovered.loc[recovered[days[i]] == max_recovered_state[i]]['Province/State'].values.tolist()
        
        aux['Cases'] = max_cases_country[i]
        aux['Deaths'] = max_deaths_country[i]
        aux['Recovered'] = max_recovered_country[i]
        transformed.append(aux)

    with open("covid.json", "w") as outfile:
        json.dump(transformed, outfile)
  
main()