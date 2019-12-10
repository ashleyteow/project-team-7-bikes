// Function to create a bar chart using attributes read in from the Chester Square BlueBikes station dataset
function basic_bar_chart(mydata, title, id, start) {
    // svg width
    let width = 1300;
    // svg height
    let height = 600;
    // margins around visualization
    let margin = {
        top: 80,
        bottom: 80,
        left: 100,
        right: 30
    };

    // initialize the svg witht the width, height, and margins
    let svg = d3.select(".hourly-trips")
                .append('svg')
                .attr('id', id)
                .attr('width', width)
                .attr('height', height)
                .attr('margin', margin);

    let tooltip = d3.select("body").append("div").attr("class", "toolTip");

    // create the x-scale using the keys from a map call
    // x-scale contains 0:00-23:00, indicating the hour of day in 24-hour time
    let xScale = d3.scaleBand()
                     .domain(d3.map(mydata, function(d) { return d.hour }).keys())
                     .range([margin.left, width-margin.right])
                     .padding(0.1);

    // create the y-scale with the domain being the minimum # of rides to the maximum number of rides
    let yScale = d3.scaleLinear()
                   .domain([0, 15])
                   .range([height-margin.bottom, margin.top]);

    // add the x-axis onto the svg, scaled to xScale
    let xAxis = svg.append("g")
                      .attr("transform", `translate(0, ${height-margin.bottom})`)
                      .call(d3.axisBottom().scale(xScale));
    
    // add the y-axis onto the svg, scaled to yScale
    let yAxis = svg.append("g")
                      .attr("transform", `translate(${margin.left}, 0)`)
                      .call(d3.axisLeft().scale(yScale));

    // append the bars onto the svg representing the data
    let rect = svg.append("g")
                  .selectAll("rect")
                  .data(mydata)
                  .enter()
                  .append("rect")
                  .attr("class", "bar")
                   .attr("x", function(d) {
                       return xScale(d.hour);
                        })
                   .attr("y", function(d) {
                    if (start) {
                        return yScale(d.pct_start);
                    }
                    else {
                        return yScale(d.pct_end);
                    }
                    
                   })
                   .attr("width", xScale.bandwidth())
                   .attr("height", function(d) {
                    if (start) {
                        return height-margin.bottom-yScale(d.pct_start);
                    }
                    else {
                        return height-margin.bottom-yScale(d.pct_end);
                    }
                    
                   })
                    .on("mouseover.tooltip", function(d){
                                tooltip.style("left", d3.event.pageX - 50 + "px")
                                tooltip.style("top", d3.event.pageY - 70 + "px")
                                tooltip.style("display", "inline-block")

                                if (start) {
                                  tooltip.html("Members:  <br> " + ((d.subscriber_start / d.total_start) * 100).toFixed(2) + "%" + "<br>" +
                                    "Non-members:  <br> " + ((d.customer_start / d.total_start) * 100).toFixed(2) + "%");
                                }
                                else {
                                  tooltip.html("Members:  <br> " + ((d.subscriber_end / d.total_end) * 100).toFixed(2) + "%" + "<br>" +
                                    "Non-members:  <br> " + ((d.customer_end / d.total_end) * 100).toFixed(2) + "%");
                                }
                    })
                    .on("mouseout.tooltip", function(d){ tooltip.style("display", "none"); })
                                                             .on("mouseover.opacity", handleMouseOver)
                                                             .on("mouseout.opacity", handleMouseOut);

                                                             
      // highlights hovered over bar in this grouped bar chart
      function handleMouseOver(d, i) {
        d3.select(this).attr("class", "mouseover-opacity");
      }
    
      // resets mouse opacity on mouse out
      function handleMouseOut(d, i) {
        d3.select(this).attr("class", "mouseoff-opacity");
      }
                                                             
    let line = d3.line()
                   .x(function(d) { return xScale(d.hour); })
                   .y(function(d) {
                    if (start) {
                        return yScale(d.all_boston_pct_start);
                    }
                    else {
                        return yScale(d.all_boston_pct_end);
                    }
                 })
    
    svg.append('path')
                .attr('d', line(mydata))
                .attr('class', 'dataLine');
    
    // create a x-axis title
    let xLabel = svg.append("text")
                    .attr("text-anchor", "middle")
                    .attr("transform", "translate("+ (width/2) +","+(height-(margin.bottom/3))+")")
                    .attr("class", "chart-label")
                    .text("Hour of Day");

    // create a y-axis title
    let yLabel = svg.append("text")
                    .attr("text-anchor", "middle")
                    .attr("transform", "translate("+ (margin.left/2) +","+(height/2)+")rotate(-90)")
                    .attr("class", "chart-label")
                    .text("Percent of Daily Trips (%)");

    // create a chart title
    let chartTitle = svg.append("text")
                    .attr("text-anchor", "middle")
                    .attr("transform", "translate("+ (width/2) +","+(15+(margin.bottom/3))+")")
                    .text(title)
                    .attr("class", "chartTitle");


    svg.append("rect")
     .attr("x", (width/2) - 200)
     .attr("y", (height/3) - 140)
     .attr("width", 30)
     .attr("height", 5)
     .attr("id", "legend-all-boston-line");
      svg.append("text")
     .attr("x", width/2-160)
     .attr("y", (height/3)-136)
     .text("All Boston Stations")
     .attr("class", "legend-text")
     .attr("alignment-baseline","middle");
    svg.append("rect")
     .attr("x", (width/2))
     .attr("y", (height/3) - 140)
     .attr("width", 30)
     .attr("height", 5)
     .attr("id", "legend-chester-sq-bars");
      svg.append("text")
     .attr("x", width/2+40)
     .attr("y", (height/3)-136)
     .text("Chester Square Stations")
     .attr("class", "legend-text")
     .attr("alignment-baseline","middle");

};
