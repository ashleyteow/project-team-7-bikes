// -------------------- START DISPLAY CHESTER SQUARE MAP CODE --------------------------
var mymap = L.map('map', {
  center: [42.338389, -71.078518],
  zoom: 16
  // zoom: 10
});


L.marker([42.338921, -71.081050]).addTo(mymap);
L.marker([42.338606, -71.074023]).addTo(mymap);
L.marker([42.340811, -71.081176]).addTo(mymap);
L.marker([42.341297, -71.080406]).addTo(mymap);



L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    minZoom: 15,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYXNobGV5dGVvdyIsImEiOiJjazM1OWMxZjkxY2hqM2NwYjI0ZmU1Zzg1In0.tIRp8wbJTjo6Rqdwii7Vmw'
}).addTo(mymap);


// -------------------- END DISPLAY CHESTER SQUARE MAP CODE --------------------------


// Reading in the data for the trips that START at all 4 stations around Chester Square then calling the basic_bar_chart function with the appropriate title
d3.csv('data/chester_square_start_hour.csv', function(d) {
  return {
		start_hour: d.start_hour,
		n: +d.total,
		subscriber: +d.subscriber,
		customer: +d.customer,
		pct: +d.pct * 100,
		all_boston_pct: +d.all_boston_pct * 100
		// all_boston_pct: +d.all_boston_pct * 100
  };
  // create a bar chart with the data that was read in
}).then(function(result) {
	basic_bar_chart(result, "Hourly Percentage of BlueBikes Trips Starting in Chester Square", "chester_square_start_trips");
});

// Reading in the data for the trips that END at all 4 stations around Chester Square then calling the basic_bar_chart function with the appropriate title
d3.csv('data/chester_square_end_hour.csv', function(d) {
  return {
		start_hour: d.start_hour,
		n: +d.total,
		subscriber: +d.subscriber,
		customer: +d.customer,
		pct: +d.pct * 100,
		all_boston_pct: +d.all_boston_pct * 100
		// all_boston_pct: +d.all_boston_pct * 100
  };
  // create a bar chart with the data that was read in
}).then(function(result) {
	basic_bar_chart(result, "Hourly Percentage of BlueBikes Trips Ending in Chester Square", "chester_square_end_trips");
});

var genderChart;
var ageChart;

// Read in gender data to be displayed in grouped bar chart representing gender breakdown of the 4 Chester Square Station customers
d3.csv("data/demographics_data/demographics.csv", function(d) {
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
    let usersChart = users_grouped_bar_chart(result);  
    let genderChart = gender_grouped_bar_chart(result);  
    
    
});


// Helper function for the toggle buttons
function showStartTrips() {
  var startTrips = document.getElementById("chester_square_start_trips");
  var endTrips = document.getElementById("chester_square_end_trips");
  if (startTrips.style.display === "none") {
    startTrips.style.display = "block";
    endTrips.style.display = "none";
  } else {
    startTrips.style.display = "none";
    endTrips.style.display = "block";
  }
}
