// Function to create a gender grouped bar chart using attributes read in from the Chester Square BlueBikes station dataset
function gender_grouped_bar_chart2() {

  let margin = {
    top: 50,
    right: 20,
    bottom: 60,
    left: 100
  },
  width = 800,
  height = 300,
  xValue = d => d[0],
  yValue = d => d[1],
  xLabelText = "",
  yLabelText = "",
  yLabelOffsetPx = 0,    
  xScale = d3.scaleBand(),
  xScale1 = d3.scaleBand(),
  yScale = d3.scaleLinear(),
  ourBrush = null,
  selectableElements = d3.select(null),
  dispatcher;

  var barPadding = .2;
  var axisTicks = {qty: 10, outerSize: 0};
    

  // Create the chart by adding an svg to the div with the id 
  // specified by the selector using the given data
  function chart(selector, data) {
    var models = data.map(i => {
        i.yearmonth = i.yearmonth;
        return i;
      });

   let svg = d3.select(".demographics")
     .append("svg")
     .attr("id", "gender")
    .attr("preserveAspectRatio", "xMidYMid meet")
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
      .attr("class", "yearmonth")
      .attr("transform", d => `translate(${xScale0(d.yearmonth)},0)`);

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
                        .attr("transform", "translate("+ ((width/2) - 30) +","+((margin.bottom/3)-30)+")")
                        .text("BlueBikes Usage by Gender from October 2018-September 2019");

    var color = d3.scaleOrdinal().range(["#66c2a5", "#fc8d62", "#8da0cb"]);



   var legend = svg.selectAll('.legend')
      .data(["Male", "Female", "Unreported"])
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr("transform", function (d, i) {
        return "translate(" + ((width / 2 + margin.left / 2 - Math.abs((125) * (i - 1) * (i - 2)) - Math.abs((i) * (122) * (i - 2)) - Math.abs((i) * (i - 1) * (10))) - 115) + "," + ((-margin.top / 6) - 30) + ")";
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
      

    return chart;
  }

  // The x-accessor from the datum
  function X(d) {
    return xScale(xValue(d));
  }

  // The y-accessor from the datum
  function Y(d) {
    return yScale(yValue(d));
  }

  chart.margin = function (_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function (_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function (_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.x = function (_) {
    if (!arguments.length) return xValue;
    xValue = _;
    return chart;
  };

  chart.y = function (_) {
    if (!arguments.length) return yValue;
    yValue = _;
    return chart;
  };

  chart.xLabel = function (_) {
    if (!arguments.length) return xLabelText;
    xLabelText = _;
    return chart;
  };

  chart.yLabel = function (_) {
    if (!arguments.length) return yLabelText;
    yLabelText = _;
    return chart;
  };

  chart.yLabelOffset = function (_) {
    if (!arguments.length) return yLabelOffsetPx;
    yLabelOffsetPx = _;
    return chart;
  };

  // Gets or sets the dispatcher we use for selection events
  chart.selectionDispatcher = function (_) {
    if (!arguments.length) return dispatcher;
    dispatcher = _;
    return chart;
  };

  // Given selected data from another visualization 
  // select the relevant elements here (linking)
  chart.updateSelection = function (selectedData) {
    if (!arguments.length) return;

    // Select an element if its datum was selected
    selectableElements.classed("selected", d =>
      selectedData.includes(d)
    );

  };

  return chart;

};



// // Function to create a gender grouped bar chart using attributes read in from the Chester Square BlueBikes station dataset
// function gender_grouped_bar_chart(data) {
//   var models = data.map(i => {
//     i.yearmonth = i.yearmonth;
//     return i;
//   });

//   var width = 800;
//   var height = 300;

//   let margin = {
//     top: 50,
//     right: 20,
//     bottom: 60,
//     left: 100
//   }

//   var barPadding = .2;
//   var axisTicks = {qty: 10, outerSize: 0};
    

//   let svg = d3.select(".demographics")
//      .append("svg")
//      .attr("id", "gender")
//      .attr("width", width)
//      .attr("height", height)
//      .append("g")
//      .attr("transform", `translate(${margin.left},${margin.top})`);

//   var xScale0 = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(barPadding);
//   var xScale1 = d3.scaleBand();
//   var yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]);

//   var xAxis = d3.axisBottom(xScale0).tickSizeOuter(axisTicks.outerSize);
//   var yAxis = d3.axisLeft(yScale).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize);

//   xScale0.domain(models.map(d => d.yearmonth));
//   xScale1.domain(['male', 'female', 'unreported']).range([0, xScale0.bandwidth()]);
//   yScale.domain([0, 250000]);

//   var model_name = svg.selectAll(".yearmonth")
//     .data(models)
//     .enter().append("g")
//     .attr("class", "yearmonth")
//     .attr("transform", d => `translate(${xScale0(d.yearmonth)},0)`);

//   /* Add field1 bars */
//   model_name.selectAll(".bar.field1")
//     .data(d => [d])
//     .enter()
//     .append("rect")
//     .attr("class", "bar male")
//   .style("fill","#66c2a5")
//     .attr("x", d => xScale1('male'))
//     .attr("y", d => yScale(d.male))
//     .attr("width", xScale1.bandwidth())
//     .attr("height", d => {
//       return height - margin.top - margin.bottom - yScale(d.male)
//     });
    
//   /* Add field2 bars */
//   model_name.selectAll(".bar.field2")
//     .data(d => [d])
//     .enter()
//     .append("rect")
//     .attr("class", "bar female")
//   .style("fill","#fc8d62")
//     .attr("x", d => xScale1('female'))
//     .attr("y", d => yScale(d.female))
//     .attr("width", xScale1.bandwidth())
//     .attr("height", d => {
//       return height - margin.top - margin.bottom - yScale(d.female)
//     });

//   /* Add field3 bars */
//   model_name.selectAll(".bar.field3")
//     .data(d => [d])
//     .enter()
//     .append("rect")
//     .attr("class", "bar unreported")
//   .style("fill","#8da0cb")
//     .attr("x", d => xScale1('unreported'))
//     .attr("y", d => yScale(d.unreported))
//     .attr("width", xScale1.bandwidth())
//     .attr("height", d => {
//       return height - margin.top - margin.bottom - yScale(d.unreported)
//     });
   
//   // Add the X Axis
//   svg.append("g")
//      .attr("class", "x axis")
//      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
//      .call(xAxis);

//   // Add the Y Axis
//   svg.append("g")
//      .attr("class", "y axis")
//      .call(yAxis); 

//   // create a x-axis title
//   var xLabel = svg.append("text")
//                   .attr("text-anchor", "middle")
//                   .attr("transform", "translate("+ ((width/2)-90) +","+(height-(margin.bottom/3)-40)+")")
//                   .text("Year-Month");

//   // create a y-axis title
//   var yLabel = svg.append("text")
//                   .attr("text-anchor", "middle")
//                   .attr("transform", "translate("+ ((margin.left/2)-125) +","+(height/2)+")rotate(-90)")
//                   .text("Number of Users");

//   // create a chart title
//   var chartTitle = svg.append("text")
//                       .attr("text-anchor", "middle")
//                       .attr("transform", "translate("+ ((width/2) - 30) +","+((margin.bottom/3)-30)+")")
//                       .text("BlueBikes Usage by Gender from October 2018-September 2019");

//   var color = d3.scaleOrdinal().range(["#66c2a5", "#fc8d62", "#8da0cb"]);



// 	var legend = svg.selectAll('.legend')
//     .data(["Male", "Female", "Unreported"])
//     .enter()
//     .append('g')
//     .attr('class', 'legend')
//     .attr("transform", function (d, i) {
//       return "translate(" + ((width / 2 + margin.left / 2 - Math.abs((125) * (i - 1) * (i - 2)) - Math.abs((i) * (122) * (i - 2)) - Math.abs((i) * (i - 1) * (10))) - 115) + "," + ((-margin.top / 6) - 30) + ")";
//     });

//   legend.append('rect')
//     .attr('x', function (d, i) { return (i * 10) + margin.left; })
//     .attr('y', margin.top - 10)
//     .attr('width', 10)
//     .attr('height', 10)
//     .style('fill', color);


//   legend.append('text')
//     .attr('x', function (d, i) { return (i * 10) + margin.left + 15; })
//     .attr('y', margin.top)
//     .text(function (d) { return d; });
// };