# Chester Square Neighborhood Bicycle Safety & Convenience Project
# Project Team 7: Bikes, DS 4200 F19
## Shraeya Srinivasan, Ashley Teow, Gauri Dandi

Our goal for this project was to create an interactive visualization incorporating the concepts discussed in the course. The visualization. This project was part of a class at Northeastern University -- DS4200: Information Presentation & Visualization. 

The S-L project will gave us the exposure to real data, interaction with a real “client”, and provide us with the opportunity to conduct novel data analysis and visualization.



## Technologies Used
* [D3- JS Library](https://d3js.org/)
* HTML/CSS 
* JavaScript
* R (pandas)


## View this project:
This website is served automatically from the default `gh-pages` branch at https://northeastern-ds-4200-f19.github.io/project-team-7-bikes/

## Root Files
* `README.md` is this explanatory file for the repo.

* `index.html` contains the main website content. It includes comments surrounded by `<!--` and `-->` to help guide you through making your edits.

* `style.css` contains the CSS.

* `js` contains all JavaScript code.

* `LICENCE` is the source code license.

## Folders
Each folder has an explanatory `README.md` file

* `data` contains data files and data cleaning code.

* `favicons` contains the favicons for the course projects.

* `files` contains presentation slides (PDF) and video walkthrough (MP4).

* `images` contains screenshots, diagrams, and photos.

* `lib` contains any JavaScript library used (D3 and Leaflet).

## Visualization Walkthrough
### Map
The five blue markers represent the five BlueBikes stations closest and most relevant to the Chester Square neighborhood that is included in our analysis. You can zoom in and out of the Chester Square neighborhood area in the map. You can hover over a blue marker to see the name of the BlueBikes station.

### Demographics Graphs
These graphs present demographic data for BlueBikes users in Boston. 
* The first line chart displays the change in average age of BlueBikes users in the past year. 
* The next grouped bar chart displays the number of BlueBikes members versus non-members for each month in the past year. 
* The last grouped bar chart displays the gender counts of BlueBikes users (self-reported) for each month in the past year. 
You can brush over the points on the average age line chart in order to highlight on the other two graphs the member versus nonmember breakdown and gender breakdown for the selected months.

### Station Data Bar Chart
 This bar chart presents the percentage of daily trips taken in each hour of an average day for Chester Square BlueBikes stations. The red line outlines the hourly percentage of trips for all BlueBikes stations in Boston, allowing for a comparison between Chester Square and Boston. The current bar chart displays the data for trips starting in Chester Square. You can select the toggle button to see the data for trips ending in Chester Square. You can also hover over each bar to see the percentage of trips in that hour taken by BlueBikes members versus non-members.
