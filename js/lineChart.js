// THIS FUNCTION DRAWS A LINE CHART WITH NO BRUSHING AND LINKING
// Function to create a line chart using attributes read in from the Chester Square BlueBikes station dataset
function lineChart(data) {
  var maxDate  = d3.max(data, function(d){ return d.yearmonth; });
  var minDate  = d3.min(data, function(d){ return d.yearmonth; });
  var maxAge = d3.max(data, function(d){ return d.age; });

  // svg width
  var width = 1300;
  // svg height
  var height = 300;
  // margins around visualization
  var margin = {
    top: 40,
    bottom: 80,
    left: 80,
    right: 100
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

// create a x-axis title
  var xLabel = svg.append("text")
                  .attr("text-anchor", "middle")
                  .attr("transform", "translate("+ (width/2) +","+(height-(margin.bottom/3)-40)+")")
                  .text("Year-Month");    

  var yAxis = d3.axisLeft(yScale);
    svg.append('g')
       .attr('class', 'y axis')
       .attr("transform", `translate(${margin.left}, 0)`)
       .call(yAxis.scale(yScale));                                 

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
  

  var line = d3.line()
             .x(function(d) { return xScale(d.yearmonth); })    
             .y(function(d) { return yScale(d.age); });

  svg.append('path')
            .attr('d', line(data))
            .attr('class', 'linePath'); 



  svg.append('g').append('rect')
      .attr("x", -xScale.step() / 2)
      .attr("y", 0)
      .attr("width", width - margin.left - margin.right + xScale.step())
      .attr("height", height - margin.top - margin.bottom)
      .attr("fill", "grey")
      .attr("opacity", 0); 

  // Set up Brush
  var lineBrush = d3.brushX()
    .extent([[-xScale.step() / 2, 0], [width - margin.left - margin.right + xScale.step() / 2, height - margin.bottom - margin.top / 2]])
    .on('end', lineBrushEnded);  

  svg.append('g')
    .attr("class", "brush")
    .style("opacity", ".5")
    .attr("brushnum", 1)
    .call(lineBrush)
    // .call(lineBrush.move, [
    //   xScale(presentTime) - xScale.step() / 2,
    //   xScale(presentTime) + xScale.step() / 2
    // ]);          

  svg.on("mousedown", function () {
    var coords = d3.mouse(this);
    xcoord = coords[0];
    svg.select('.brush').call(lineBrush.move, [xcoord - xScale.step() / 2, xcoord + xScale.step() / 2]).call(lineBrushEnded);
  })

  function lineBrushEnded() {
    const selection = d3.event.selection;
    if (!d3.event.sourceEvent || !selection) return;
    const range = xScale.domain().map(xScale), dx = xScale.step() / 2;
    const x0 = range[d3.bisectRight(range, selection[0])] - dx;
    const x1 = range[d3.bisectRight(range, selection[1]) - 1] + dx;
    d3.select(this).transition().call(d3.event.target.move, x1 > x0 ? [x0, x1] : null);
    d3.select(".svg-vis-demographics-line").html(null);
    // time = formatTime(parseSingle(invertPoint((x1 + x0) / 2)))

    // AP_stuff(max, data2.filter(function (d) { return d.time == time; }), time)
  };  
};  