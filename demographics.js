// ------------------------------ START READING IN DATA -----------------------------

// Read in age data to be displayed in line chart representing average age
d3.csv('data/demographics_data/age.csv', function(d) {
  return {
    yearmonth: d.yearmonth,
    age: +d.age
  };
  // create a bar chart with the data that was read in
}).then(function(data) {
  lineChart(data);
});


// Read in gender data to be displayed in grouped bar chart representing gender breakdown of the 4 Chester Square Station customers
d3.csv("data/demographics_data/gender.csv", function(d) {
  return {
    yearmonth: d.yearmonth,
    male: +d.male,
    female: +d.female,
    unreported: +d.unreported
  };
}).then(gender_grouped_bar_chart);

// Read in user membership data to be displayed in grouped bar chart representing Bluebikes subscriber/customer breakdown of the 4 Chester Square Station customers
d3.csv("data/demographics_data/users.csv", function(d) {
  return {
    yearmonth: d.yearmonth,
    subscriber: +d.subscriber,
    customer: +d.customer
  };
}).then(users_grouped_bar_chart);

// ------------------------------ END READING IN DATA -----------------------------

// Function to create a line chart using attributes read in from the Chester Square BlueBikes station dataset
function lineChart2(){
  var maxDate  = d3.max(data, function(d){ return d.yearmonth; });
  var minDate  = d3.min(data, function(d){ return d.yearmonth; });
  var maxAge = d3.max(data, function(d){ return d.age; });
  let margin = {
    top: 40,
    bottom: 80,
    left: 80,
    right: 30
  },
  width = 1200,
  height = 800,
  xValue = d => d[0],
  yValue = d => d[1],
  xLabelText = "",
  yLabelText = "",
  yLabelOffsetPx = 0,
  xScale = d3.scaleBand(),
  yScale = d3.scaleLinear(),             
  ourBrush = null,
  selectableElements = d3.select(null),
  dispatcher;

  function chart(data) {
    // console.log("hello");
    // console.log(data);
    let svg = d3.select(".demographics")
      .append('svg')
      .attr('class', 'svg-vis-demographics-line')
      .attr('width', width)
      .attr('height', height)
      .attr('margin', margin);

    svg = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");    

    xScale.domain(d3.map(data, function(d) { return d.yearmonth; }).keys())
          .range([margin.left, width-margin.right], 1.0);

    yScale.domain([0, maxAge + 10])
          .range([height - margin.bottom - margin.top, 0]);

    let xAxis = svg.append("g")
        .attr("transform", "translate(0," + (height) + ")")
        .call(d3.axisBottom(xScale));

    xAxis.append("text")        
        .attr("class", "axisLabel")
        .attr("transform", "translate(" + (width - 50) + ",-10)")
        .text(xLabelText);
    

    let yAxis = svg.append("g")
        .call(d3.axisLeft(yScale))
      .append("text")
        .attr("class", "axisLabel")
        .attr("transform", "translate(" + yLabelOffsetPx + ", -12)")
        .text(yLabelText);


    var line = d3.line()
             .x(function(d) { return xScale(d.yearmonth); })    
             .y(function(d) { return yScale(d.age); });
    
    selectableElements = line;            

    svg.append("path")
        .datum(data)
        .attr("class", "linePath")
        .attr("d", line);

    // create a x-axis title
    var xLabel = svg.append("text")
                    .attr("text-anchor", "middle")
                    .attr("transform", "translate("+ (width/2) +","+(height-(margin.bottom/3)-40)+")")
                    .text("Year-Month");

    // create a y-axis title
    var yLabel = svg.append("text")
                    .attr("text-anchor", "middle")
                    .attr("transform", "translate("+ (margin.left/2) +","+(height/2)+")rotate(-90)")
                    .text("Average User Age");

    // create a chart title
    var chartTitle = svg.append("text")
                        .attr("text-anchor", "middle")
                        .attr("transform", "translate("+ (width/2) +","+((margin.bottom/3)-10)+")")
                        .text("Average Age of BlueBikes Users from 10/2018-9/2019");

    svg.call(brush);

    // Highlight points when brushed
    function brush(g) {
      const brush = d3.brush()
        .on("start brush", highlight)
        .on("end", brushEnd)
        .extent([
          [-margin.left, -margin.bottom],
          [width + margin.right, height + margin.top]
        ]);

      ourBrush = brush;

      g.call(brush); // Adds the brush to this element

      // Highlight the selected circles.
      function highlight() {
        if (d3.event.selection === null) return;
        const [
          [x0, y0],
          [x1, y1]
        ] = d3.event.selection;
        points.classed("selected", d =>
          x0 <= X(d) && X(d) <= x1 && y0 <= Y(d) && Y(d) <= y1
        );

        // Get the name of our dispatcher's event
        let dispatchString = Object.getOwnPropertyNames(dispatcher._)[0];

        // Let other charts know
        dispatcher.call(dispatchString, this, svg.selectAll(".selected").data());
      }
      
      function brushEnd() {
        // We don't want an infinite recursion
        if (d3.event.sourceEvent.type != "end") {
          d3.select(this).call(brush.move, null);
        }
      }
    }

    return chart;                    
  }

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

// Function to create a gender grouped bar chart using attributes read in from the Chester Square BlueBikes station dataset
function gender_grouped_bar_chart2(data) {
  var models = data.map(i => {
    i.yearmonth = i.yearmonth;
    return i;
  });

  var container = d3.select('.demographics'),
    width = 1200,
    height = 800,
    margin = {top: 50, right: 20, bottom: 60, left: 100},
    barPadding = .2,
    axisTicks = {qty: 10, outerSize: 0};

  var svg = container
     .append("svg")
     .attr("class", "demographics")
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
  .style("fill","blue")
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
  .style("fill","red")
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
  .style("fill","green")
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
                      .attr("transform", "translate("+ (width/2) +","+((margin.bottom/3)-30)+")")
                      .text("BlueBikes Usage by Gender from October 2018-September 2019");
}


// Function to create a line chart using attributes read in from the Chester Square BlueBikes station dataset
function lineChart(data){
  var maxDate  = d3.max(data, function(d){ return d.yearmonth; });
  var minDate  = d3.min(data, function(d){ return d.yearmonth; });
  var maxAge = d3.max(data, function(d){ return d.age; });

  // svg width
  var width = 1200;
  // svg height
  var height = 800;
  // margins around visualization
  var margin = {
    top: 40,
    bottom: 80,
    left: 80,
    right: 30
  };

  var svg = d3.select(".demographics")
        .append('svg')
        .attr('class', 'svg-vis-demographics-line')
        .attr('width', width)
        .attr('height', height)
        .attr('margin', margin);

  var xScale = d3.scaleBand()
             .domain(d3.map(data, function(d) { return d.yearmonth; }).keys())
             .range([margin.left, width-margin.right], 1.0);

  var yScale = d3.scaleLinear()
             .domain([0, maxAge + 10])
             .range([height - margin.bottom - margin.top, 0]);

  var xAxis = d3.axisBottom(xScale);
  svg.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0, ' + (height - margin.bottom - margin.top) + ')')
          .call(xAxis.scale(xScale));

  var yAxis = d3.axisLeft(yScale);
  svg.append('g')
     .attr('class', 'y axis')
     .attr("transform", `translate(${margin.left}, 0)`)
     .call(yAxis.scale(yScale));

  var line = d3.line()
           .x(function(d) { return xScale(d.yearmonth); })    
           .y(function(d) { return yScale(d.age); });


  svg.append('path')
          .attr('d', line(data))
          .attr('class', 'dataLine');

  // create a x-axis title
  var xLabel = svg.append("text")
                  .attr("text-anchor", "middle")
                  .attr("transform", "translate("+ (width/2) +","+(height-(margin.bottom/3)-40)+")")
                  .text("Year-Month");

  // create a y-axis title
  var yLabel = svg.append("text")
                  .attr("text-anchor", "middle")
                  .attr("transform", "translate("+ (margin.left/2) +","+(height/2)+")rotate(-90)")
                  .text("Average User Age");

  // create a chart title
  var chartTitle = svg.append("text")
                      .attr("text-anchor", "middle")
                      .attr("transform", "translate("+ (width/2) +","+((margin.bottom/3)-10)+")")
                      .text("Average Age of BlueBikes Users from 10/2018-9/2019");

  // var svg = d3.select(this)
  //             .selectAll("svg")
  //             .data([data]);
  var svgEnter = svg.enter().append("svg");
  var gEnter = svgEnter.append("g");
  gEnter.append("path").attr("class", "area");
  gEnter.append("path").attr("class", "line");
  gEnter.append("g").attr("class", "x axis");
  gEnter
    .append("g")
    .attr("class", "brush")
    .call(brush);  

  svg.merge(svgEnter)
     .attr("width", width)
     .attr("height", height);

  // Update the inner dimensions.
  var g = svg
    .merge(svgEnter)
    .select("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Update the area path.
  g.select(".area").attr("d", area.y0(yScale.range()[0]));

  // Update the line path.
  g.select(".line").attr("d", line);

  // Update the x-axis.
  g.select(".x.axis")
    .attr("transform", "translate(0," + yScale.range()[0] + ")")
    .call(d3.axisBottom(xScale).tickSize(6, 0));     

  g.select(".brush").call(d3.brushX()
          .extent([
            [0,0],
            [xScale.range()[1], yScale.range()[0]]
          ])
          .on("brush", brushed)
        );   
  function brushed() {
    if (!d3.event.sourceEvent) return; // Only transition after input.
    if (!d3.event.selection) return; // Ignore empty selections.
    var selection = d3.event.selection.map(xScale.invert);

    onBrushed(selection);
  }         
                                      
};

// Function to create a gender grouped bar chart using attributes read in from the Chester Square BlueBikes station dataset
function gender_grouped_bar_chart(data) {
  var models = data.map(i => {
    i.yearmonth = i.yearmonth;
    return i;
  });

  var container = d3.select('.demographics'),
    width = 800,
    height = 600,
    margin = {top: 50, right: 20, bottom: 60, left: 100},
    barPadding = .2,
    axisTicks = {qty: 10, outerSize: 0};

  var svg = container
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
    .attr("class", "yearmonth")
    .attr("transform", d => `translate(${xScale0(d.yearmonth)},0)`);

  /* Add field1 bars */
  model_name.selectAll(".bar.field1")
    .data(d => [d])
    .enter()
    .append("rect")
    .attr("class", "bar male")
  .style("fill","blue")
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
  .style("fill","red")
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
  .style("fill","green")
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
                      .attr("transform", "translate("+ (width/2) +","+((margin.bottom/3)-30)+")")
                      .text("BlueBikes Usage by Gender from October 2018-September 2019");
}


// Function to create a user membership grouped bar chart using attributes read in from the Chester Square BlueBikes station dataset
function users_grouped_bar_chart(data) {
  var models = data.map(i => {
    i.yearmonth = i.yearmonth;
    return i;
  });

  var container = d3.select('.demographics'),
    width = 800,
    height = 600,
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
  .style("fill","blue")
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
  .style("fill","red")
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
                      .attr("transform", "translate("+ (width/2) +","+((margin.bottom/3)-30)+")")
                      .text("BlueBikes Usage by Membership from October 2018-September 2019");

}





