# Read in the individual .csv files of data
## 2018
oct18dem = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/Fall 2019/DS4200/Project/BlueBikes Data/2018dem/201810dem.csv")
nov18dem = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/Fall 2019/DS4200/Project/BlueBikes Data/2018dem/201811dem.csv")
dec18dem = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/Fall 2019/DS4200/Project/BlueBikes Data/2018dem/201812dem.csv")

## 2019
jan19dem = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/Fall 2019/DS4200/Project/BlueBikes Data/2019dem/201901dem.csv")
feb19dem = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/Fall 2019/DS4200/Project/BlueBikes Data/2019dem/201902dem.csv")
mar19dem = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/Fall 2019/DS4200/Project/BlueBikes Data/2019dem/201903dem.csv")
apr19dem = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/Fall 2019/DS4200/Project/BlueBikes Data/2019dem/201904dem.csv")
may19dem = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/Fall 2019/DS4200/Project/BlueBikes Data/2019dem/201905dem.csv")
jun19dem = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/Fall 2019/DS4200/Project/BlueBikes Data/2019dem/201906dem.csv")
jul19dem = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/Fall 2019/DS4200/Project/BlueBikes Data/2019dem/201907dem.csv")
aug19dem = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/Fall 2019/DS4200/Project/BlueBikes Data/2019dem/201908dem.csv")
sep19dem = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/Fall 2019/DS4200/Project/BlueBikes Data/2019dem/201909dem.csv")
oct19dem = read.csv("/Users/gauri_dandi/Documents/Northeastern/2019-2020/Fall 2019/DS4200/Project/BlueBikes Data/2019dem/201910.csv")

# Merge the individual data files into one
all_boston_dem = rbind(oct18dem, nov18dem, dec18dem, jan19dem, feb19dem, mar19dem, apr19dem, 
                       may19dem, jun19dem, jul19dem, aug19dem, sep19dem, oct19dem)
all_boston_dem = all_boston_dem[c("bikeid", "usertype", "age", "gender", "starttime")]
names(all_boston_dem) = c("bikeid", "usertype", "age", "gender", "yearmonth")
levels(all_boston_dem$yearmonth) = c("Oct-2018", "Nov-2018", "Dec-2018", "Jan-2019", "Feb-2019",
                                     "Mar-2019", "Apr-2019", "May-2019", "Jun-2019", "Jul-2019",
                                     "Aug-2019", "Sep-2019", "Oct-2019")

install.packages("dplyr")
library(dplyr)

## Subscriber/Customer Count
count_sub = function(x) {
  x %>%
    group_by(yearmonth) %>%
    filter(usertype == "Subscriber") %>%
    summarize(subscriber = n());
}

count_cust = function(x) {
  x %>%
    group_by(yearmonth) %>%
    filter(usertype == "Customer") %>%
    summarize(customer = n());
}

subscribers = count_sub(all_boston_dem)
customers = count_cust(all_boston_dem)

users = merge(subscribers, customers, by = "yearmonth")

## Gender Count
count_male = function(x) {
  x %>%
    group_by(yearmonth) %>%
    filter(gender == 1) %>%
    summarize(male = n());
}

count_female = function(x) {
  x %>%
    group_by(yearmonth) %>%
    filter(gender == 2) %>%
    summarize(female = n());
}

count_non_reported = function(x) {
  x %>%
    group_by(yearmonth) %>%
    filter(gender == 0) %>%
    summarize(non_reported = n());
}

male = count_male(all_boston_dem)
female = count_female(all_boston_dem)
unreported = count_non_reported(all_boston_dem)

male_female = merge(male, female, by = "yearmonth")
gender = merge(male_female, unreported, by = "yearmonth")

# Age Count
avg_age = function(x) {
  x %>%
    group_by(yearmonth) %>%
    summarize(age = mean(age, na.rm = TRUE));
}

age_df = avg_age(all_boston_dem)

membership_gender = merge(users, gender, by = "yearmonth")
demographics = merge(membership_gender, age_df, by = "yearmonth")
names(demographics) = c("yearmonth", "subscriber", "customer", "male", "female", "unreported", "age")

# Write data frames to .csv files
write.csv(demographics, 
          "/Users/gauri_dandi/project-team-7-bikes/data/demographics.csv")
