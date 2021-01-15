import csv
import json
import pandas as pd
import matplotlib.pyplot as plot

def getCountiesHospitals():
    dfHospitalsWA = pd.read_html('https://en.wikipedia.org/wiki/List_of_hospitals_in_Washington_(state)')[0]

    x = dfHospitalsWA.groupby('County')['Hospital Beds'].sum().reset_index()
    print(dfHospitalsWA)
    print(x)
    x.plot()
    plot.show()

def createRegionJSONs(grouped_regions):

    # C:\Users\Alex McKee\Documents\projects
    grouped_regions.get_group('Asia').to_json(r'.\public\data\asiaData.json', orient='split')
    grouped_regions.get_group('Africa').to_json(r'.\public\data\africaData.json', orient='split')
    grouped_regions.get_group('Europe').to_json(r'.\public\data\europeData.json', orient='split')
    grouped_regions.get_group('North America').to_json(r'.\public\data\NAData.json', orient='split')
    grouped_regions.get_group('Australia/Oceania').to_json(r'.\public\data\oceaniaData.json', orient='split')
    grouped_regions.get_group('South America').to_json(r'.\public\data\SAData.json', orient='split')

def preprocessNewCasesCol(dfWorldometer):
    newCases = dfWorldometer['New Cases'].str.replace('+', '')
    newCases = newCases.str.replace(',', '').astype(int)
    print(newCases)

    dfWorldometer['Total Cases'] = dfWorldometer['Total Cases'].str.replace(',', '').astype(float)
    dfWorldometer['Total Deaths'] = dfWorldometer['Total Deaths'].str.replace(',', '').astype(float)
    newCases = round(newCases / (dfWorldometer['Total Cases'] - newCases) * 100, 2)
    newCases = "↑" + dfWorldometer['New Cases'].str.replace('+', '') + " (%" + newCases.astype(str) + ")"
    newCases = ["" if x[:2] == "↑0" else x for x in newCases]
    print(newCases)
    dfWorldometer['New Cases'] = newCases
    print(dfWorldometer)

def getWorldData():

    url2 = "https://raw.githubusercontent.com/chrislopez24/corona-parser/master/cases.csv"
    dfWorldometer = pd.read_csv(url2)
    print(dfWorldometer)
    print(dfWorldometer['Total Cases'])

    #preprocessNewCasesCol(dfWorldometer)
    newCases = dfWorldometer['New Cases'].str.replace('+', '')
    dfWorldometer['New Cases'] = newCases.str.replace(',', '').astype(int)
    dfWorldometer['Total Cases'] = dfWorldometer['Total Cases'].str.replace(',', '').astype(float)
    dfWorldometer['mortality rate'] = round((dfWorldometer['Total Deaths'].str.replace(',', '').astype(float)) / (dfWorldometer['Total Cases'])* 100, 2)
    dfWorldometer = dfWorldometer.drop(columns=['#', 'New Recovered', '1 Case every X ppl', '1 Death every X ppl', '1 Test every X ppl'])
    grouped_region = dfWorldometer.groupby('Continent')
    # grouped_region.drop(columns=['#']) - ERROR DataFrameGroupBy object has no attribute drop
    createRegionJSONs(grouped_region)
    dfWorldometer.to_json(r'.\public\data\worldData.json', orient='split')

def getUSStates():
    url = "https://raw.githubusercontent.com/alexdmckee/corona-parser/master/casesUSAStates.csv"
    dfStates = pd.read_csv(url)
    dfStates['mortality rate'] = round((dfStates['Total Deaths'].str.replace(',', '').astype(float)) / (dfStates['Total Cases'].str.replace(',', '').astype(float)) * 100, 2)
    dfStates = dfStates.drop(columns=['Source', 'Projections'])
    dfStates.to_json(r'.\public\data\statesData.json', orient='split')








getWorldData()
getUSStates()
#
# wadoh = pd.read_excel(
#     "https://www.doh.wa.gov/Portals/1/Documents/1600/coronavirus/data-tables/PUBLIC_CDC_Event_Date_SARS.xlsx?ver=20200521120114")
# print(wadoh.head())
# #wadoh.groupby('County').plot(x='WeekStartDate', y='NewPos_All')
#
# wadoh['pInHospital'] = wadoh['NewPos_All'] * .046
# process = wadoh.pivot(index='WeekStartDate', columns='County', values='pInHospital')
# process.plot(legend=False)

# jsonFilePath = r'C:\Users\Alex McKee\Documents\projects\data\statesJSON.json'
# read csv file and add to data



# from get world
# url = "https://covid.ourworldindata.org/data/owid-covid-data.csv"
    # df = pd.read_csv(url)
    # # use tail with groupby to get last n values of group
    # df = df.sort_values(by='date').groupby('location', as_index=False).last()
    # print(df)
    #
    # # Use split to keep col headers
    # df1 = df[['location', 'date', 'total_cases', 'total_deaths', 'total_cases_per_million', 'new_cases_per_million']]
    # print(df1)
    #
    # # to json
    # df1.to_json(r'C:\Users\Alex McKee\Documents\projects\public\data\worldData.json', orient='split')
