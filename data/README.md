# Data Cleaning Process

### chester_square.csv: csv containing data for each of the five Chester Square Bluebikes stations
    - Data Attributes:
        - hour (ordinal): hour of the time during which the trip occurred
        - subscriber_start (quantitative): the number of subscribers that started at one of the Chester Square stops
        - customer_start (quantitative): the number of non-subscribers that started at one of the Chester Square stops
        - total_start (quantitative): total number of users who started at one of the Chester Square stops
        - pct_start: percentage of trips that started at this time for all stops in Chester Square
        - all_boston_pct_start: percentage of trips that started at this hour in all of Boston
        - subscriber_end: the number of subscribers that ended at one of the Chester Square stops
        - customer_end: the number of non-subscribers that ended at one of the Chester Square stops
        - total_end: total number of users who ended at one of the Chester Square stops
        - pct_end: percentage of trips that ended at this time for all stops in Chester Square
        - all_boston_pct_end: percentage of trips that ended at this hour in all of Boston

### /data_cleaning_files
    - Demographics-Cleaning.R: R file used to clean the demographics data and create final datasets for demographic analysis 
    - Station-Data-Cleaning.R: R file used to clean the station-specific data and create the final datasets for analysis of the Chester Square stations 

### /original_data
    - 2018.zip: compressed folder containing all data from 2018 used in Station-Data-Cleaning.R after processing
    - 2018dem.zip: compressed folder containing all data from 2018 used in Demographics-Cleaning.R after processing
    - 2019.zip: compressed folder containing all data from 2019 used in Station-Data-Cleaning.R after processing
    - 2019dem.zip: compressed folder containing all data from 2019 used in Demographics-Cleaning.R after processing

### /station_specific_data
    - Files:
        - columbus_mass_end.csv: csv containing data for trips ending at the Columbus Avenue @ Massachusetts Avenue station
        - columbus_mass_start.csv: csv containing data for trips starting at the Columbus Avenue @ Massachusetts Avenue station
        - south_end_lib_end.csv: csv containing data for trips ending at the South End Library station
        - south_end_lib_start.csv: csv containing data for trips starting at the South End Library station
        - tremont_northampton_end.csv: csv containing data for trips ending at the Tremont Street @ Northampton Street station
        - tremont_northampton_start.csv: csv containing data for trips starting at the Tremont Street @ Northampton Street station
        - wash_rutland_end.csv: csv containing data for trips ending at the Washington Street @ Rutland Street station
        - wash_rutland_start.csv: csv containing data for trips starting at the Washington Street @ Rutland Street station
    - Data Attributes:
        - tripduration (quantitative): the duration of this trip     
        - starttime (ordinal): the start time of this trip   
        - stoptime (ordinal): the end time of this trip
        - start.station.id (categorical): the id of the starting station
        - start.station.name (categorical): the name of the starting station
        - start.station.latitude (quantitative): latitude of the starting station
        - start.station.longitude (quauntitative): longitude of the starting station
        - end.station.id (categorical): the id of the ending station
        - end.station.name (categorical): the name of the ending station
        - end.station.latitude (quantitative): latitude of the ending station
        - end.station.longitude (quauntitative): longitude of the ending station   
        - bikeid (categorical): the id of the bike used
        - usertype (categorical): the membership type of the user (member or non-member)
        - birth.year (categorical): the birth year of the user
        - gender (categorical): the gender of the user
    

### all_boston_end_hour.csv: csv containing data for the end of trips in all of Boston by the hour
    - Data Attributes:
        - end_hour: the hour during which a trip ended 
        - subscriber: the number of subscribers who rode during this hour
        - customer: the number of non-subscribers who rode during this hour
        - total: the total number of rides
        - all_boston_pct: the percentage of trips that ended during this hour in all of Boston

### all_boston_start_hour.csv: csv containing data for the start of trips in all of Boston by the hour
    - Data Attributes:
        - start_hour: the hour during which a trip started 
        - subscriber: the number of subscribers who rode during this hour
        - customer: the number of non-subscribers who rode during this hour
        - total: the total number of rides
        - all_boston_pct: the percentage of trips that started during this hour in all of Boston

### demographics.csv: csv containing the demographic breakdown of Bluebikes users by month and year
    - Data Attributes:
        - yearmonth: the year and month during which the ride happened
        - subscriber: the number of subscribers during this year and month
        - customer: the number of non-subscribers during this year and month
        - male: the number of male riders during this year and month
        - female: the number of female riders during this year and month
        - unreported: the number of riders during this year and month who chose not to report their gender
        - age: the average age of riders during this month
