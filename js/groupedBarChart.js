// Function to create a user membership grouped bar chart using attributes read in from the Chester Square BlueBikes station dataset
function grouped_bar_chart(data, id, title) {
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
     .attr("id", id)
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
  if (id == "users") {
    xScale1.domain(['subscriber', 'customer']).range([0, xScale0.bandwidth()]);
  }
  else {
    xScale1.domain(['male', 'female', 'unreported']).range([0, xScale0.bandwidth()]);
  }
  yScale.domain([0, 290000]);

  let model_name = svg.selectAll(".yearmonth")
    .data(models)
    .enter().append("g")
    .attr("class", d => "yearmonth" + " " + d.yearmonth)
    .attr("transform", d => `translate(${xScale0(d.yearmonth)},0)`)
//    .on("mouseover", handleMouseOver)
//    .on("mouseout", handleMouseOut);

  // ^ handles highlighting functions when mousing over the charts    

  if (id == "users") {
    // /* Add field1 bars */
    model_name.selectAll(".bar.field1")
      .data(d => [d])
      .enter()
      .append("rect")
      .attr("class", "bar subscriber")
      .attr("x", d => xScale1('subscriber'))
      .attr("y", d => yScale(d.subscriber))
      .attr("width", xScale1.bandwidth())
      .attr("height", d => {
        return height - margin.top - margin.bottom - yScale(d.subscriber)
      });
      
    // /* Add field2 bars */
    model_name.selectAll(".bar.field2")
      .data(d => [d])
      .enter()
      .append("rect")
      .attr("class", "bar customer")
      .attr("x", d => xScale1('customer'))
      .attr("y", d => yScale(d.customer))
      .attr("width", xScale1.bandwidth())
      .attr("height", d => {
        return height - margin.top - margin.bottom - yScale(d.customer)
      });
  }
  else {
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
  }

   
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
  let xLabel = svg.append("text")
                  .attr("text-anchor", "middle")
                  .attr("transform", "translate("+ ((width/2)-90) +","+(height-(margin.bottom/3)-50)+")")
                  .text("Year-Month");

  // create a y-axis title
  let yLabel = svg.append("text")
                  .attr("text-anchor", "middle")
                  .attr("transform", "translate("+ ((margin.left/2)-130) +","+((height/2)-55)+")rotate(-90)")
                  .text("Number of Users");

  // create a chart title
  let chartTitle = svg.append("text")
                      .attr("class", "chartTitle")
                      .attr("text-anchor", "middle")
                      .attr("transform", "translate("+ ((width/2) - 90) +","+((margin.bottom/3)-50)+")")
                      .text(title);

  let color = d3.scaleOrdinal().range(["#e9a3c9", "#a1d76a"]);

  if (id == "users") {
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
  else {
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
  }


}
