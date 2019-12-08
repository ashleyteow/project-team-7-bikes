/* visualization.js: this is where our data is read in from our csv files stored 
in /data. After reading them in, we call on the appropriate
 visualization function to create a kind of chart using the existing data. 
 Eg. the function called when reading in the chester_square_start_hour.csv file
  calls on the basic_bar_chart function that is stored in its own file within 
  this js directory.*/
// -------------------- START DISPLAY CHESTER SQUARE MAP CODE --------------------------

// Sets the configuration for loading in the map from the Leaflet API, with our default zooms
// as well as the coordinate set to the center of Chester Square.
let mymap = L.map('map', {
  center: [42.338389, -71.078518],
  zoom: 10
});

// Disable zooms for the map because we just want a static map with the markers representing the stations.
mymap.dragging.disable();
mymap.doubleClickZoom.disable();
mymap.scrollWheelZoom.disable();

// Add markers for each Bluebikes lcocation in the Chester Square area.
L.marker([42.338921, -71.081050]).bindTooltip("Tremont St @ Northampton St").addTo(mymap);
L.marker([42.338606, -71.074023]).bindTooltip("Washington St @ Rutland St").addTo(mymap);
L.marker([42.340811, -71.081176]).bindTooltip("Columbus St @ Massachusetts Ave").addTo(mymap);
L.marker([42.341332, -71.076847]).bindTooltip("South End Library").addTo(mymap);
L.marker([42.3350989929, -71.0790377855]).bindTooltip("Washington St @ Lenox St").addTo(mymap);


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    minZoom: 15,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYXNobGV5dGVvdyIsImEiOiJjazM1OWMxZjkxY2hqM2NwYjI0ZmU1Zzg1In0.tIRp8wbJTjo6Rqdwii7Vmw'
}).addTo(mymap);

// -------------------- END DISPLAY CHESTER SQUARE MAP CODE --------------------------


// Reading in the data for the trips that END at all 4 stations around Chester Square then calling the basic_bar_chart function with the appropriate title
d3.csv('data/chester_square.csv', function(d) {
  return {
    hour: d.hour,
    subscriber_start: d.subscriber_start,
    customer_start: d.customer_start,
    total_start: +d.total_start,
    pct_start: +d.pct_start * 100,
    all_boston_pct_start: +d.all_boston_pct_start * 100,
    subscriber_end: d.subscriber_end,
    customer_end: d.customer_end,
    total_end: +d.total_end,
    pct_end: +d.pct_end * 100,
    all_boston_pct_end: +d.all_boston_pct_end * 100
  };
  // create a bar chart with the data that was read in
}).then(function(result) {
  basic_bar_chart(result, "Hourly Percentage of Daily Trips Ending in Chester Square", "chester_square_end_trips", false);
  basic_bar_chart(result, "Hourly Percentage of Daily Trips Starting in Chester Square", "chester_square_start_trips", true);
});

// Read in gender data to be displayed in grouped bar chart representing gender breakdown of the 4 Chester Square Station customers
d3.csv("data/demographics.csv", function(d) {
  return {
    yearmonth: d.yearmonth,
    male: +d.male,
    female: +d.female,
    unreported: +d.unreported,
    subscriber: +d.subscriber,
    customer: +d.customer,
    age: +d.age

  };
}).then(function(result) {
    let ageChart = scatterplotLine()
    .x(d => d.yearmonth)
    .xLabel("Year-Month")
    .y(d => d.age)
    .yLabel("Age")
    .yLabelOffset(40)
    .selectionDispatcher(d3.dispatch("selectionUpdated"))
      ("#svg-vis-demographics-line", result);  

    grouped_bar_chart(result, "users", "Membership Status of Bluebikes Users");
    grouped_bar_chart(result, "gender", "Gender of Bluebikes Users");
});


// Helper function for the toggle buttons. It is called as an onclick css selector in the index.html page.
function showStartTrips() {
  let startTrips = document.getElementById("chester_square_start_trips");
  let endTrips = document.getElementById("chester_square_end_trips");
  if (startTrips.style.display === "none") {
    startTrips.style.display = "block";
    endTrips.style.display = "none";
  } else {
    startTrips.style.display = "none";
    endTrips.style.display = "block";
  }
}
