#  Javascript Files

`ageLineChart.js`: this is the code that creates the line chart showing the average age of Bluebikes users each month

`barchart.js`: this is the code that creates the bar charts showing the usage of the Chester Square Bluebikes stations

`groupedBarChart.js`: this is the code that creates the two grouped bar charts representing the member breakdown and the gender breakdown of Bluebikes users

`visualization.js`: this is where our data is read in from our csv files stored in /data. After reading them in, we call on the appropriate visualization function to create a kind of chart using the existing data.
    - Eg. the function called when reading in the chester_square_start_hour.csv file calls on the basic_bar_chart function that is stored in its own file within this js directory.
