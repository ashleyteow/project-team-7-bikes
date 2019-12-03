// Function to create a user membership grouped bar chart using attributes read in from the Chester Square BlueBikes station dataset
function users_grouped_bar_chart(data) {
  let models = data.map(i => {
    i.yearmonth = i.yearmonth;
    return i;
  });

  let container = d3.select('.demographics'),
    width = 1200,
    height = 300,
    margin = {top: 50, right: 20, bottom: 60, left: 100},
    barPadding = .2,
    axisTicks = {qty: 10, outerSize: 0};

  let svg = container
     .append("svg")
     .attr("id", "users")
     .attr("width", width)
     .attr("height", height)
     .append("g")
     .attr("transform", `translate(${margin.left},${margin.top})`);

  let xScale0 = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(barPadding);
  let xScale1 = d3.scaleBand();
  let yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]);

  let xAxis = d3.axisBottom(xScale0).tickSizeOuter(axisTicks.outerSize);
  let yAxis = d3.axisLeft(yScale).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize);

  xScale0.domain(models.map(d => d.yearmonth));
  xScale1.domain(['subscriber', 'customer']).range([0, xScale0.bandwidth()]);
  yScale.domain([0, 290000]);

  let model_name = svg.selectAll(".yearmonth")
    .data(models)
    .enter().append("g")
    .attr("class", d => "yearmonth" + " " + d.yearmonth)
    .attr("transform", d => `translate(${xScale0(d.yearmonth)},0)`)
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);

  // ^ handles highlighting functions when mousing over the charts    

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
     .style("font-size", "12px")
     .call(xAxis);

  // Add the Y Axis
  svg.append("g")
     .attr("class", "y axis")
     .style("font-size", "12px")
     .call(yAxis);

  // create a x-axis title
  let xLabel = svg.append("text")
                  .attr("text-anchor", "middle")
                  .style("font-size", "16px")
                  .attr("transform", "translate("+ ((width/2)-90) +","+(height-(margin.bottom/3)-50)+")")
                  .text("Year-Month");

  // create a y-axis title
  let yLabel = svg.append("text")
                  .attr("text-anchor", "middle")
                  .style("font-size", "16px")
                  .attr("transform", "translate("+ ((margin.left/2)-115) +","+((height/2)-55)+")rotate(-90)")
                  .text("Number of Users");

  // create a chart title
  let chartTitle = svg.append("text")
                      .attr("text-anchor", "middle")
                      .attr("transform", "translate("+ ((width/2) - 90) +","+((margin.bottom/3)-50)+")")
                      .text("Membership Status of Bluebikes Users");

  let color = d3.scaleOrdinal().range(["#e9a3c9", "#a1d76a"]);

  // highlights hovered over bar in this grouped bar chart
  function handleMouseOver(d, i) {
    d3.select(this).style('opacity', 0.2);
  }

  // resets mouse opacity on mouse out
  function handleMouseOut(d, i) {
    d3.select(this).style('opacity', 1.0);
  }

  svg.append("rect")
     .attr("x", width/2-180)
     .attr("y", (height/4)-95)
     .attr("width", 15)
     .attr("height", 15)
     .style("fill", "#e9a3c9");
  svg.append("text")
     .attr("x", width/2-160)
     .attr("y", (height/4)-86)
     .text("Member")
     .style("font-size", "15px")
     .attr("alignment-baseline","middle");
  svg.append("rect")
     .attr("x", width/2-80)
     .attr("y", (height/4)-95)
     .attr("width", 15)
     .attr("height", 15)
     .style("fill", "#a1d76a");
  svg.append("text")
     .attr("x", width/2-60)
     .attr("y", (height/4)-86)
     .text("Non-Member")
     .style("font-size", "15px")
     .attr("alignment-baseline","middle");

}