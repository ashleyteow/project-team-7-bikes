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
all_boston$yearmonth = substr(all_boston$starttime, 1, 7)
all_boston$age = 2019 - all_boston$birth.year
all_boston_dem = all_boston[c("bikeid", "usertype", "age", "gender", "yearmonth")]

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
non_reported = count_non_reported(all_boston_dem)
gender1 = merge(male, female, by = "yearmonth")
gender = merge(gender1, non_reported, by = "yearmonth")

# Age Count
avg_age = function(x) {
  x %>%
    group_by(yearmonth) %>%
    summarize(age = mean(age));
}

age = avg_age(all_boston_dem)

# Write data frames to .csv files
write.csv(users, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/project-team-7-bikes/data/users.csv")
write.csv(gender, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/project-team-7-bikes/data/gender.csv")
write.csv(age, 
          "/Users/gauri_dandi/Documents/Northeastern/2019-2020/DS4200/project-team-7-bikes/data/age.csv")