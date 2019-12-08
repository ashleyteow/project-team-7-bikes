The data originally acquired from https://www.bluebikes.com/system-data, containing multiple csv files for each separate month from October 2018 to September 2019, was merged into a single csv file. It contains each BlueBikes’ trip duration in seconds, start time and date, stop time and date, start station id and name, start station latitude and longitude, end station id and name, end station latitude and longitude, bike id, user type (either a single user or regular member), user birth year, user gender, and an added column for the year and month.

- all_data.zip – zipped file containing original cleaned data containing:
  	- columbus_mass_end.csv -- data for trips that end at the Columbus Ave @ Mass Ave station
  	- columbus_mass_start.csv -- data for trips that start at the Columbus Ave @ Mass Ave station
  	- south_end_lib_end.csv -- data for trips that end at the South End Library station
  	- south_end_lib_start.csv -- data for trips that start at the South End Library station
  	- tremont_northampton_end.csv -- data for trips that end at the Tremont St @ Northampton St station
      - tremont_northampton_start.csv -- data for trips that start at the Tremont St @ Northampton St station
      - wash_lenox_end.csv -- data for trips that end at the Washington St @ Lenox St station
     - wash_lenox_start.csv -- data for trips that start at the Washington St @ Lenox St station
  	- wash_rutland_end.csv -- data for trips that end at the Washington St @ Rutland St station
	- wash_rutland_start.csv -- data for trips that start at the Washington St @ Rutland St station
    
	- Data attributes (for each):
		- Trip duration in seconds (quantitative),
		- Start time and date (ordinal)
		- Stop time and date (ordinal)
		- Start station id (categorical)
		- Start station name (categorical)
		- Start station latitude (quantitative)
		- Start station longitude (quantitative)
		- End station id (categorical)
		- End station name (categorical)
		- End station latitude (quantitative)
		- End station longitude (quantitative)
		- Bike ID (categorical)
		- User type (categorical)
		- Birth year (ordinal)
		- Gender (categorical)


- chester_square_stations
- chester_square_stations/all_boston_end_hour.csv -- data for all trips in the city of Boston grouped by the trip start time
	- Data attributes:
		- end_hour (ordinal): hour of the time during which the trip ended
		- subscriber (quantitative): the number of subscribers who rode during this hour
		- customer (quantitative): the number of casual users who rode during this hour
		- total (quantitative): the total number of users (both member and causal user) during this hour
		- pct (quantitative): the percentage of rides for the entire day that occurred during this hour

- chester_square_stations/all_boston_start_hour.csv -- data for all trips in the city of Boston grouped by the trip end time
	- Data attributes:
		-start_hour (ordinal): hour of the time during which the trip ended
		- subscriber (quantitative): the number of subscribers who rode during this hour
		- customer (quantitative): the number of casual users who rode during this hour
		- total (quantitative): the total number of users (both member and causal user) during this hour
		- pct (quantitative): the percentage of rides for the entire day that occurred during this hour

- chester_square_stations/columbus_mass_end_hour.csv -- data for trips that end at the Columbus Ave @ Mass Ave station
	- Data attributes:
		- end_hour (ordinal): hour of the time during which the trip ended at this stop
		- subscriber (quantitative): the number of subscribers who rode during this hour ending at this stop
		- customer (quantitative): the number of casual users who rode during this hour ending at this stop
		- total (quantitative):  the total number of users (both member and causal user) during this hour ending at this stop
		- pct (quantitative):  the percentage of rides for the entire day that occurred during this hour ending at this stop
		- all_boston_pct (quantitative):  a derived variable from the chester_square_stations/all_boston_end_hour.csv used to compare the “pct” variable to the total number of rides that occurred during this hour in all of Boston
 
- chester_square_stations/columbus_mass_start_hour.csv -- data for trips that start at the Columbus Ave @ Mass Ave station
	- Data attributes:
		- start_hour (ordinal): hour of the time during which the trip started at this stop
		- subscriber (quantitative): the number of subscribers who rode during this hour starting at this stop
		- customer (quantitative): the number of casual users who rode during this hour starting at this stop
		- total (quantitative):  the total number of users (both member and causal user) during this hour starting at this stop
		- pct (quantitative):  the percentage of rides for the entire day that occurred during this hour starting at this stop
		- all_boston_pct (quantitative):  a derived variable from the chester_square_stations/all_boston_end_hour.csv used to compare the “pct” variable to the total number of rides that occurred during this hour in all of Boston

- chester_square_stations/south_end_lib_end_hour.csv -- data for trips that end at the South End Library station
		- Data attributes:
		- end_hour (ordinal): hour of the time during which the trip ended at this stop
		- subscriber (quantitative): the number of subscribers who rode during this hour ending at this stop
		- customer (quantitative): the number of casual users who rode during this hour ending at this stop
		- total (quantitative):  the total number of users (both member and causal user) during this hour ending at this stop
		- pct (quantitative):  the percentage of rides for the entire day that occurred during this hour ending at this stop
		- all_boston_pct (quantitative):  a derived variable from the chester_square_stations/all_boston_end_hour.csv used to compare the “pct” variable to the total number of rides that occurred during this hour in all of Boston

- chester_square_stations/south_end_lib_start_hour.csv -- data for trips that start at the South End Library station
	- Data attributes:
		- start_hour (ordinal): hour of the time during which the trip started at this stop
		- subscriber (quantitative): the number of subscribers who rode during this hour starting at this stop
		- customer (quantitative): the number of casual users who rode during this hour starting at this stop
		- total (quantitative):  the total number of users (both member and causal user) during this hour starting at this stop
		- pct (quantitative):  the percentage of rides for the entire day that occurred during this hour starting at this stop
		- all_boston_pct (quantitative):  a derived variable from the chester_square_stations/all_boston_end_hour.csv used to compare the “pct” variable to the total number of rides that occurred during this hour in all of Boston

- chester_square_stations/tremont_northampton_end_hour.csv -- data for trips that end at the Tremont St @ Northampton St station
	- Data attributes:
		- end_hour (ordinal): hour of the time during which the trip ended at this stop
		- subscriber (quantitative): the number of subscribers who rode during this hour ending at this stop
		- customer (quantitative): the number of casual users who rode during this hour ending at this stop
		- total (quantitative):  the total number of users (both member and causal user) during this hour ending at this stop
		- pct (quantitative):  the percentage of rides for the entire day that occurred during this hour ending at this stop
		- all_boston_pct (quantitative):  a derived variable from the chester_square_stations/all_boston_end_hour.csv used to compare the “pct” variable to the total number of rides that occurred during this hour in all of Boston

- chester_square_stations/tremont_northampton_start_hour.csv -- data for trips that start at the Tremont St @ Northampton St station
	- Data attributes:
		- start_hour (ordinal): hour of the time during which the trip started at this stop
		- subscriber (quantitative): the number of subscribers who rode during this hour starting at this stop
		- customer (quantitative): the number of casual users who rode during this hour starting at this stop
		- total (quantitative):  the total number of users (both member and causal user) during this hour starting at this stop
		- pct (quantitative):  the percentage of rides for the entire day that occurred during this hour starting at this stop
		- all_boston_pct (quantitative):  a derived variable from the chester_square_stations/all_boston_end_hour.csv used to compare the “pct” variable to the total number of rides that occurred during this hour in all of Boston

- chester_square_stations/wash_rutland_end_hour.csv -- data for trips that end at the Washington St @ Rutland St station
	- Data attributes:
		- end_hour (ordinal): hour of the time during which the trip ended at this stop
		- subscriber (quantitative): the number of subscribers who rode during this hour ending at this stop
		- customer (quantitative): the number of casual users who rode during this hour ending at this stop
		- total (quantitative):  the total number of users (both member and causal user) during this hour ending at this stop
		- pct (quantitative):  the percentage of rides for the entire day that occurred during this hour ending at this stop
		- all_boston_pct (quantitative):  a derived variable from the chester_square_stations/all_boston_end_hour.csv used to compare the “pct” variable to the total number of rides that occurred during this hour in all of Boston

- chester_square_stations/wash_rutland_start_hour.csv -- data for trips that start at the Washington St @ Rutland St station
	- Data attributes:
		- start_hour (ordinal): hour of the time during which the trip started at this stop
		- subscriber (quantitative): the number of subscribers who rode during this hour starting at this stop
		- customer (quantitative): the number of casual users who rode during this hour starting at this stop
		- total (quantitative):  the total number of users (both member and causal user) during this hour starting at this stop
		- pct (quantitative):  the percentage of rides for the entire day that occurred during this hour starting at this stop
		- all_boston_pct (quantitative):  a derived variable from the chester_square_stations/all_boston_end_hour.csv used to compare the “pct” variable to the total number of rides that occurred during this hour in all of Boston

- data_cleaning_files
- data_cleaning_files/Demographics-Cleaning.R -- code used to prepare demographic data for visualization in d3
- data_cleaning_files/Station-Data-Cleaning.R -- code used to prepare usage data for each stop around Chester Square for visualization in d3

- demographics.csv -- contains demographic data about Bluebikes users
- Data Attributes:
            - yearmonth (ordinal):
            - male :
            - female:
            - unreported:
            - subscriber:
            - customer:
            - age: 
