// Function to create a bar chart using attributes read in from the Chester Square BlueBikes station dataset
function basic_bar_chart(mydata, title, id) {
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
	var svg = d3.select(".hourly-trips")
				.append('svg')
				.attr('id', id)
				.attr('width', width)
				.attr('height', height)
				.attr('margin', margin);

	var tooltip = d3.select("body").append("div").attr("class", "toolTip");				

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
             	  .attr("x", function(d) { 
             	  	return xScale(d.start_hour);
             	  	 })
             	  .attr("y", function(d) {
             	   return yScale(d.pct);
             	    })
             	  .attr("width", xScale.bandwidth())
             	  .attr("height", function(d) { 
					return height-margin.bottom-yScale(d.pct);
             	  })
					.on("mouseover", function(d){
					            tooltip
					              .style("left", d3.event.pageX - 50 + "px")
					              .style("top", d3.event.pageY - 70 + "px")
					              .style("display", "inline-block")
					              .html("Members:   " + ((d.subscriber / d.n) * 100).toFixed(2) + "%" + "<br>" +       "Non-members:   " + ((d.customer / d.n) * 100).toFixed(2) + "%");
					        	})
		    		.on("mouseout", function(d){ tooltip.style("display", "none")});             	  


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
            		.text(title);
};