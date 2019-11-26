// Function to create a gender grouped bar chart using attributes read in from the Chester Square BlueBikes station dataset
function gender_grouped_bar_chart(data) {
  var models = data.map(i => {
    i.yearmonth = i.yearmonth;
    return i;
  });

  var width = 1200;
  var height = 300;

  let margin = {
    top: 50,
    right: 20,
    bottom: 60,
    left: 100
  }

  var barPadding = .2;
  var axisTicks = {qty: 10, outerSize: 0};
    

  let svg = d3.select(".demographics")
     .append("svg")
     .attr("id", "gender")
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
  xScale1.domain(['male', 'female', 'unreported']).range([0, xScale0.bandwidth()]);
  yScale.domain([0, 250000]);

  var model_name = svg.selectAll(".yearmonth")
    .data(models)
    .enter().append("g")
    .attr("class", d => "yearmonth" + " " + d.yearmonth)
    .attr("transform", d => `translate(${xScale0(d.yearmonth)},0)`)
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);

  /* Add field1 bars */
  model_name.selectAll(".bar.field1")
    .data(d => [d])
    .enter()
    .append("rect")
    .attr("class", "bar male")
  .style("fill","#66c2a5")
    .attr("x", d => xScale1('male'))
    .attr("y", d => yScale(d.male))
    .attr("width", xScale1.bandwidth())
    .attr("height", d => {
      return height - margin.top - margin.bottom - yScale(d.male)
    });
    
  /* Add field2 bars */
  model_name.selectAll(".bar.field2")
    .data(d => [d])
    .enter()
    .append("rect")
    .attr("class", "bar female")
  .style("fill","#fc8d62")
    .attr("x", d => xScale1('female'))
    .attr("y", d => yScale(d.female))
    .attr("width", xScale1.bandwidth())
    .attr("height", d => {
      return height - margin.top - margin.bottom - yScale(d.female)
    });

  /* Add field3 bars */
  model_name.selectAll(".bar.field3")
    .data(d => [d])
    .enter()
    .append("rect")
    .attr("class", "bar unreported")
  .style("fill","#8da0cb")
    .attr("x", d => xScale1('unreported'))
    .attr("y", d => yScale(d.unreported))
    .attr("width", xScale1.bandwidth())
    .attr("height", d => {
      return height - margin.top - margin.bottom - yScale(d.unreported)
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
  var xLabel = svg.append("text")
                  .style("font-size", "16px")
                  .attr("text-anchor", "middle")
                  .attr("transform", "translate("+ ((width/2)-90) +","+(height-(margin.bottom/3)-50)+")")
                  .text("Year-Month");

  // create a y-axis title
  var yLabel = svg.append("text")
                   .style("font-size", "16px")
                  .attr("text-anchor", "middle")
                  .attr("transform", "translate("+ ((margin.left/2)-115) +","+((height/2) - 55)+")rotate(-90)")
                  .text("Number of Users");

  // create a chart title
  var chartTitle = svg.append("text")
                      .attr("class", "label")
                      .attr("text-anchor", "middle")
                      .attr("transform", "translate("+ ((width/2) - 90) +","+((margin.bottom/3)-45)+")")
                      .text("Gender of Bluebikes Users");

  var color = d3.scaleOrdinal().range(["#66c2a5", "#fc8d62", "#8da0cb"]);

  // highlights hovered over bar in this grouped bar chart
  function handleMouseOver(d, i) {
    d3.select(this).style('opacity', 0.2);
  }

  // resets mouse opacity on mouse out
  function handleMouseOut(d, i) {
    d3.select(this).style('opacity', 1.0);
  }

	svg.append("rect")
	   .attr("x", width/2-230)
	   .attr("y", (height/4)-90)
	   .attr("width", 15)
     .attr("height", 15)
	   .style("fill", "#66c2a5");
	svg.append("text")
	   .attr("x", width/2-205)
	   .attr("y", (height/4)-81)
	   .text("Male")
	   .style("font-size", "15px")
	   .attr("alignment-baseline","middle");
  svg.append("rect")
     .attr("x", width/2-140)
     .attr("y", (height/4)-90)
     .attr("width", 15)
     .attr("height", 15)
     .style("fill", "#fc8d62");
	svg.append("text")
     .attr("x", width/2-115)
     .attr("y", (height/4)-81)
	   .text("Female")
	   .style("font-size", "15px")
	   .attr("alignment-baseline","middle");
  svg.append("rect")
     .attr("x", (width/2)-40)
     .attr("y", (height/4)-90)
     .attr("width", 15)
     .attr("height", 15)
     .style("fill", "#8da0cb");
  svg.append("text")
     .attr("x", (width/2)-20)
     .attr("y", (height/4)-81)
     .text("Unreported")
     .style("font-size", "15px")
     .attr("alignment-baseline","middle");
};