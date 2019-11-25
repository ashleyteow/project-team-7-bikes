// Function to create a user membership grouped bar chart using attributes read in from the Chester Square BlueBikes station dataset
function users_grouped_bar_chart(data) {
  var models = data.map(i => {
    i.yearmonth = i.yearmonth;
    return i;
  });

  var container = d3.select('.demographics'),
    width = 1200,
    height = 300,
    margin = {top: 50, right: 20, bottom: 60, left: 100},
    barPadding = .2,
    axisTicks = {qty: 10, outerSize: 0};

  var svg = container
     .append("svg")
     .attr("id", "users")
     .attr("width", width)
     .attr("height", height)
     .append("g")
     .attr("transform", `translate(${margin.left},${margin.top})`);

  var xScale0 = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(barPadding);
  var xScale1 = d3.scaleBand();
  var yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]);

  var xAxis = d3.axisBottom(xScale0).tickSizeOuter(axisTicks.outerSize);
  var yAxis = d3.axisLeft(yScale).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize);

  xScale0.domain(models.map(d => d.yearmonth));
  xScale1.domain(['subscriber', 'customer']).range([0, xScale0.bandwidth()]);
  yScale.domain([0, 290000]);

  var model_name = svg.selectAll(".yearmonth")
    .data(models)
    .enter().append("g")
    .attr("class", "yearmonth")
    .attr("transform", d => `translate(${xScale0(d.yearmonth)},0)`);

  /* Add field1 bars */
  model_name.selectAll(".bar.field1")
    .data(d => [d])
    .enter()
    .append("rect")
    .attr("class", "bar subscriber")
  .style("fill","#e9a3c9")
    .attr("x", d => xScale1('subscriber'))
    .attr("y", d => yScale(d.subscriber))
    .attr("width", xScale1.bandwidth())
    .attr("height", d => {
      return height - margin.top - margin.bottom - yScale(d.subscriber)
    });
    
  /* Add field2 bars */
  model_name.selectAll(".bar.field2")
    .data(d => [d])
    .enter()
    .append("rect")
    .attr("class", "bar customer")
  .style("fill","#a1d76a")
    .attr("x", d => xScale1('customer'))
    .attr("y", d => yScale(d.customer))
    .attr("width", xScale1.bandwidth())
    .attr("height", d => {
      return height - margin.top - margin.bottom - yScale(d.customer)
    });
   
  // Add the X Axis
  svg.append("g")
     .attr("class", "x axis")
     .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
     .call(xAxis);

  // Add the Y Axis
  svg.append("g")
     .attr("class", "y axis")
     .call(yAxis);

  // create a x-axis title
  var xLabel = svg.append("text")
                  .attr("text-anchor", "middle")
                  .attr("transform", "translate("+ ((width/2)-90) +","+(height-(margin.bottom/3)-40)+")")
                  .text("Year-Month");

  // create a y-axis title
  var yLabel = svg.append("text")
                  .attr("text-anchor", "middle")
                  .attr("transform", "translate("+ ((margin.left/2)-125) +","+(height/2)+")rotate(-90)")
                  .text("Number of Users");

  // create a chart title
  var chartTitle = svg.append("text")
                      .attr("text-anchor", "middle")
                      .attr("transform", "translate("+ ((width/2) - 50) +","+((margin.bottom/3)-30)+")")
                      .text("BlueBikes Usage by Membership from October 2018-September 2019");

  var color = d3.scaleOrdinal().range(["#e9a3c9", "#a1d76a"]);



	var legend = svg.selectAll('.legend')
    .data(["Member", "Non-Member"])
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr("transform", function (d, i) {
      return "translate(" + ((width / 2 + margin.left / 2 - Math.abs((125) * (i - 1) * (i - 2)) - Math.abs((i) * (122) * (i - 2)) - Math.abs((i) * (i - 1) * (10))) - 75) + "," + ((-margin.top / 6) - 30) + ")";
    });

  legend.append('rect')
    .attr('x', function (d, i) { return (i * 10) + margin.left; })
    .attr('y', margin.top - 10)
    .attr('width', 10)
    .attr('height', 10)
    .style('fill', color);


  legend.append('text')
    .attr('x', function (d, i) { return (i * 10) + margin.left + 15; })
    .attr('y', margin.top)
    .text(function (d) { return d; });
  }
