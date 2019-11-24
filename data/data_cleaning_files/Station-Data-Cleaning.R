# Read in the individual .csv files of data
oct18 = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/BlueBikes Data/201810.csv")
nov18 = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/BlueBikes Data/201811.csv")
dec18 = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/BlueBikes Data/201812.csv")
jan19 = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/BlueBikes Data/201901.csv")
feb19 = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/BlueBikes Data/201902.csv")
mar19 = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/BlueBikes Data/201903.csv")
apr19 = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/BlueBikes Data/201904.csv")
may19 = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/BlueBikes Data/201905.csv")
jun19 = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/BlueBikes Data/201906.csv")
jul19 = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/BlueBikes Data/201907.csv")
aug19 = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/BlueBikes Data/201908.csv")
sep19 = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/Project/BlueBikes Data/201909.csv")

# Merge the individual data files into one
all_boston = rbind(oct18, nov18, dec18, jan19, feb19, mar19, apr19, may19, jun19, jul19, aug19, sep19)
all_boston$start_hour = paste(substr(all_boston$starttime, 12, 13), ":00", sep = "")
all_boston$end_hour = paste(substr(all_boston$stoptime, 12, 13), ":00", sep = "")

install.packages("dplyr")
library(dplyr)
count_start_sub = function(x) {
  x %>%
    group_by(start_hour) %>%
    filter(usertype == "Subscriber") %>%
    summarize(subscriber = n());
}

count_start_cust = function(x) {
  x %>%
    group_by(start_hour) %>%
    filter(usertype == "Customer") %>%
    summarize(customer = n());
}

count_end_sub = function(x) {
  x %>%
    group_by(end_hour) %>%
    filter(usertype == "Subscriber") %>%
    summarize(subscriber = n());
}

count_end_cust = function(x) {
  x %>%
    group_by(end_hour) %>%
    filter(usertype == "Customer") %>%
    summarize(customer = n());
}

# Create subsets of the entire data file for the 4 stations of interest to Chester Square
## All 4 stations in Chester Square
chester_square_start = subset(all_boston, start.station.id == 364 | start.station.id == 57 |
                                start.station.id == 25 | start.station.id == 39)
chester_square_end = subset(all_boston, end.station.id == 364 | end.station.id == 57 |
                              end.station.id == 25 | end.station.id == 39)

chester_square_start_hour = merge(count_start_sub(chester_square_start),
                                  count_start_cust(chester_square_start), by = "start_hour")
chester_square_start_hour$total = chester_square_start_hour$subscriber + chester_square_start_hour$customer

chester_square_end_hour = merge(count_end_sub(chester_square_end),
                                  count_end_cust(chester_square_end), by = "end_hour")
chester_square_end_hour$total = chester_square_end_hour$subscriber + chester_square_end_hour$customer


## Tremont St at Northampton St
tremont_northampton_start = subset(all_boston, start.station.id == 364)
tremont_northampton_end = subset(all_boston, end.station.id == 364)

tremont_northampton_start_hour = merge(count_start_sub(tremont_northampton_start), 
                                       count_start_cust(tremont_northampton_start), by = "start_hour")
tremont_northampton_start_hour$total = tremont_northampton_start_hour$subscriber 
                                      + tremont_northampton_start_hour$customer

tremont_northampton_end_hour = merge(count_end_sub(tremont_northampton_end), 
                                       count_end_cust(tremont_northampton_end), by = "end_hour")
tremont_northampton_end_hour$total = tremont_northampton_end_hour$subscriber + tremont_northampton_end_hour$customer

## Columbus Ave at Massachusetts Ave
columbus_mass_start = subset(all_boston, start.station.id == 57)
columbus_mass_end = subset(all_boston, end.station.id == 57)

columbus_mass_start_hour = merge(count_start_sub(columbus_mass_start), 
                                       count_start_cust(columbus_mass_start), by = "start_hour")
columbus_mass_start_hour$total = columbus_mass_start_hour$subscriber + columbus_mass_start_hour$customer

columbus_mass_end_hour = merge(count_end_sub(columbus_mass_end), 
                                     count_end_cust(columbus_mass_end), by = "end_hour")
columbus_mass_end_hour$total = columbus_mass_end_hour$subscriber + columbus_mass_end_hour$customer


## South End Library - Tremont St at W Newton St
south_end_lib_start = subset(all_boston, start.station.id == 25)
south_end_lib_end = subset(all_boston, end.station.id == 25)

south_end_lib_start_hour = merge(count_start_sub(south_end_lib_start), 
                                 count_start_cust(south_end_lib_start), by = "start_hour")
south_end_lib_start_hour$total = south_end_lib_start_hour$subscriber + south_end_lib_start_hour$customer

south_end_lib_end_hour = merge(count_end_sub(south_end_lib_end), 
                               count_end_cust(south_end_lib_end), by = "end_hour")
south_end_lib_end_hour$total = south_end_lib_end_hour$subscriber + south_end_lib_end_hour$customer

## Washington St at Rutland St
wash_rutland_start = subset(all_boston, start.station.id == 39)
wash_rutland_end = subset(all_boston, end.station.id == 39)

wash_rutland_start_hour = merge(count_start_sub(wash_rutland_start), 
                                 count_start_cust(wash_rutland_start), by = "start_hour")
wash_rutland_start_hour$total = wash_rutland_start_hour$subscriber + wash_rutland_start_hour$customer

wash_rutland_end_hour = merge(count_end_sub(wash_rutland_end), 
                               count_end_cust(wash_rutland_end), by = "end_hour")
wash_rutland_end_hour$total = wash_rutland_end_hour$subscriber + wash_rutland_end_hour$customer

## All of Boston
all_boston_start_hour = merge(count_start_sub(all_boston), 
                                count_start_cust(all_boston), by = "start_hour")
all_boston_start_hour$total = all_boston_start_hour$subscriber + all_boston_start_hour$customer

all_boston_end_hour = merge(count_end_sub(all_boston), 
                              count_end_cust(all_boston), by = "end_hour")
all_boston_end_hour$total = all_boston_end_hour$subscriber + all_boston_end_hour$customer

#---------

write.csv(chester_square_start_hour, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/project-team-7-bikes/data/chester_square_start_hour.csv")
write.csv(chester_square_end_hour, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/project-team-7-bikes/data/chester_square_end_hour.csv")

write.csv(all_boston_start_hour, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/project-team-7-bikes/data/all_boston_start_hour.csv")
write.csv(all_boston_end_hour, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/project-team-7-bikes/data/all_boston_end_hour.csv")
write.csv(tremont_northampton_start_hour, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/project-team-7-bikes/data/tremont_northampton_start_hour.csv")
write.csv(tremont_northampton_end_hour, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/project-team-7-bikes/data/tremont_northampton_end_hour.csv")
write.csv(columbus_mass_start_hour, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/project-team-7-bikes/data/columbus_mass_start_hour.csv")
write.csv(columbus_mass_end_hour, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/project-team-7-bikes/data/columbus_mass_end_hour.csv")
write.csv(south_end_lib_start_hour, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/project-team-7-bikes/data/south_end_lib_start_hour.csv")
write.csv(south_end_lib_end_hour, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/project-team-7-bikes/data/south_end_lib_end_hour.csv")
write.csv(wash_rutland_start_hour, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/project-team-7-bikes/data/wash_rutland_start_hour.csv")
write.csv(wash_rutland_end_hour, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/project-team-7-bikes/data/wash_rutland_end_hour.csv")