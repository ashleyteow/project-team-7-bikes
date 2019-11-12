/* -----Start Stops---- */
// read in the data
d3.csv('data/chester_square_stations/tremont_northampton_start_hour.csv', function(d) {
  return {
		start_hour: d.start_hour,
		n: +d.total,
		subscriber: +d.subscriber,
		customer: +d.customer,
		pct: +d.pct * 100,
		all_boston_pct: +d.all_boston_pct * 100
  };
  // create a bar chart with the data that was read in
}).then(basic_bar_chart_start);

d3.csv('data/chester_square_stations/columbus_mass_start_hour.csv', function(d) {
  return {
		start_hour: d.start_hour,
		n: +d.total,
		subscriber: +d.subscriber,
		customer: +d.customer,
		pct: +d.pct * 100,
		all_boston_pct: +d.all_boston_pct * 100
  };
  // create a bar chart with the data that was read in
}).then(basic_bar_chart_start);

d3.csv('data/chester_square_stations/south_end_lib_start_hour.csv', function(d) {
  return {
		start_hour: d.start_hour,
		n: +d.total,
		subscriber: +d.subscriber,
		customer: +d.customer,
		pct: +d.pct * 100,
		all_boston_pct: +d.all_boston_pct * 100
  };
  // create a bar chart with the data that was read in
}).then(basic_bar_chart_start);

d3.csv('data/chester_square_stations/wash_rutland_start_hour.csv', function(d) {
  return {
		start_hour: d.start_hour,
		n: +d.total,
		subscriber: +d.subscriber,
		customer: +d.customer,
		pct: +d.pct * 100,
		all_boston_pct: +d.all_boston_pct * 100
  };
  // create a bar chart with the data that was read in
}).then(basic_bar_chart_start);

function basic_bar_chart_start(mydata) {
	// svg width
	var width = 1200;
	// svg height
	var height = 800;
	// margins around visualization
	var margin = {
		top: 80,
		bottom: 80,
		left: 100,
		right: 30
	};

	// initialize the svg witht the width, height, and margins
	var svg = d3.select(".vis-holder")
				.append('svg')
				.attr('class', 'svg-vis-start')
				.attr('width', width)
				.attr('height', height)
				.attr('margin', margin);

	// create the x-scale using the keys from a map call
	// x-scale contains 0:00-23:00, indicating the hour of day in 24-hour time
	var xScale = d3.scaleBand()
	  			   .domain(d3.map(mydata, function(d) { return d.start_hour; }).keys())
	  			   .range([margin.left, width-margin.right])
	  			   .padding(0.1);

	// create the y-scale with the domain being the minimum # of rides to the maximum number of rides
	var yScale = d3.scaleLinear()
				   .domain([0, 25])
				   .range([height-margin.bottom, margin.top]);

	// add the x-axis onto the svg, scaled to xScale
	var xAxis = svg.append("g")
			   	   .attr("transform", `translate(0, ${height-margin.bottom})`)
               	   .call(d3.axisBottom().scale(xScale));
	
	// add the y-axis onto the svg, scaled to yScale
	var yAxis = svg.append("g")
			   	   .attr("transform", `translate(${margin.left}, 0)`)
               	   .call(d3.axisLeft().scale(yScale));

    // append the bars onto the svg representing the data
    var rect = svg.append("g")
    			  .selectAll("rect")
    			  .data(mydata)
    			  .enter()
    			  .append("rect")
    			  .attr("class", "bar")
             	  .attr("x", function(d) { return xScale(d.start_hour); })
             	  .attr("y", function(d) { return yScale(d.pct); })
             	  .attr("width", xScale.bandwidth())
             	  .attr("height", function(d) { 
					return height-margin.bottom-yScale(d.pct);
             	  });

	var line = d3.line()
	  			 .x(function(d) { return xScale(d.start_hour); })
	  			 .y(function(d) { return yScale(d.all_boston_pct); })
	
	svg.append('path')
  			  .attr('d', line(mydata))
  			  .attr('class', 'dataLine');
    
    // create a x-axis title
    var xLabel = svg.append("text")
            		.attr("text-anchor", "middle")
            		.attr("transform", "translate("+ (width/2) +","+(height-(margin.bottom/3))+")")
            		.text("Hour of Day");

    // create a y-axis title
    var yLabel = svg.append("text")
            		.attr("text-anchor", "middle")
            		.attr("transform", "translate("+ (margin.left/2) +","+(height/2)+")rotate(-90)")
            		.text("Percent of Daily Trips");

    // create a chart title
    var chartTitle = svg.append("text")
            		.attr("text-anchor", "middle")
            		.attr("transform", "translate("+ (width/2) +","+(15+(margin.bottom/3))+")")
            		.text("Hourly Percentage of Trips Starting at Tremont St at Northampton St");
};

/* -----End Stops---- */
// read in the data
d3.csv('data/chester_square_stations/tremont_northampton_end_hour.csv', function(d) {
  return {
		end_hour: d.end_hour,
		n: +d.total,
		subscriber: +d.subscriber,
		customer: +d.customer,
		pct: +d.pct * 100,
		all_boston_pct: +d.all_boston_pct * 100
  };
  // create a bar chart with the data that was read in
}).then(basic_bar_chart_end);

d3.csv('data/chester_square_stations/columbus_mass_end_hour.csv', function(d) {
  return {
		end_hour: d.end_hour,
		n: +d.total,
		subscriber: +d.subscriber,
		customer: +d.customer,
		pct: +d.pct * 100,
		all_boston_pct: +d.all_boston_pct * 100
  };
  // create a bar chart with the data that was read in
}).then(basic_bar_chart_end);

d3.csv('data/chester_square_stations/south_end_lib_end_hour.csv', function(d) {
  return {
		end_hour: d.end_hour,
		n: +d.total,
		subscriber: +d.subscriber,
		customer: +d.customer,
		pct: +d.pct * 100,
		all_boston_pct: +d.all_boston_pct * 100
  };
  // create a bar chart with the data that was read in
}).then(basic_bar_chart_end);

d3.csv('data/chester_square_stations/wash_rutland_end_hour.csv', function(d) {
  return {
		end_hour: d.end_hour,
		n: +d.total,
		subscriber: +d.subscriber,
		customer: +d.customer,
		pct: +d.pct * 100,
		all_boston_pct: +d.all_boston_pct * 100
  };
  // create a bar chart with the data that was read in
}).then(basic_bar_chart_end);

function basic_bar_chart_end(mydata) {
	// svg width
	var width = 1200;
	// svg height
	var height = 800;
	// margins around visualization
	var margin = {
		top: 80,
		bottom: 80,
		left: 100,
		right: 30
	};

	// initialize the svg witht the width, height, and margins
	var svg = d3.select(".vis-holder")
				.append('svg')
				.attr('class', 'svg-vis-end')
				.attr('width', width)
				.attr('height', height)
				.attr('margin', margin);

	// create the x-scale using the keys from a map call
	// x-scale contains 0:00-23:00, indicating the hour of day in 24-hour time
	var xScale = d3.scaleBand()
	  			   .domain(d3.map(mydata, function(d) { return d.end_hour; }).keys())
	  			   .range([margin.left, width-margin.right])
	  			   .padding(0.1);

	// create the y-scale with the domain being the minimum # of rides to the maximum number of rides
	var yScale = d3.scaleLinear()
				   .domain([0, 25])
				   .range([height-margin.bottom, margin.top]);

	// add the x-axis onto the svg, scaled to xScale
	var xAxis = svg.append("g")
			   	   .attr("transform", `translate(0, ${height-margin.bottom})`)
               	   .call(d3.axisBottom().scale(xScale));
	
	// add the y-axis onto the svg, scaled to yScale
	var yAxis = svg.append("g")
			   	   .attr("transform", `translate(${margin.left}, 0)`)
               	   .call(d3.axisLeft().scale(yScale));

	var tooltip = d3.select(".svg-vis-end")
	    			.append("div")
	    			.attr("class", "tooltip");

	tooltip.append("div")
		   .attr("class", "count");

    // append the bars onto the svg representing the data
    var rect = svg.append("g")
    			  .selectAll("rect")
    			  .data(mydata)
    			  .enter()
    			  .append("rect")
    			  .attr("class", "bar")
             	  .attr("x", function(d) { return xScale(d.end_hour); })
             	  .attr("y", function(d) { return yScale(d.pct); })
             	  .attr("width", xScale.bandwidth())
             	  .attr("height", function(d) { 
					return height-margin.bottom-yScale(d.pct);
             	  });

	var line = d3.line()
	  			 .x(function(d) { return xScale(d.end_hour); })
	  			 .y(function(d) { return yScale(d.all_boston_pct); })
	
	svg.append('path')
  			  .attr('d', line(mydata))
  			  .attr('class', 'dataLine');
    
    // create a x-axis title
    var xLabel = svg.append("text")
            		.attr("text-anchor", "middle")
            		.attr("transform", "translate("+ (width/2) +","+(height-(margin.bottom/3))+")")
            		.text("Hour of Day");

    // create a y-axis title
    var yLabel = svg.append("text")
            		.attr("text-anchor", "middle")
            		.attr("transform", "translate("+ (margin.left/2) +","+(height/2)+")rotate(-90)")
            		.text("Percent of Daily Trips");

    // create a chart title
    var chartTitle = svg.append("text")
            		.attr("text-anchor", "middle")
            		.attr("transform", "translate("+ (width/2) +","+(15+(margin.bottom/3))+")")
            		.text("Hourly Percentage of Trips Ending at Tremont St at Northampton St");
};