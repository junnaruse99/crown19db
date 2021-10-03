import pandas as pd

def main():
    confirmed = pd.read_csv('./time_series_covid19_confirmed_global.csv')
    # deaths = pd.read_csv('./time_series_covid19_deatds_global.csv')
    # recovered = pd.read_csv('./time_series_covid19_recovered_global.csv')

    print(confirmed.head())
main()