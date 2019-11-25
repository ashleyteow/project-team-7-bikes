// ------------------- test line function scatterplot -----------------------------
// TODO: add jquery to acknowledgements

function scatterplotLine() {

  // Based on Mike Bostock's margin convention
  // https://bl.ocks.org/mbostock/3019563
  let margin = {
      top: 40,
      bottom: 80,
      left: 80,
      right: 100
    },
    width = 1300,
    height = 500;
    xValue = d => d[0],
    yValue = d => d[1],
    xLabelText = "",
    yLabelText = "",
    yLabelOffsetPx = 0,
    xScale = d3.scalePoint(),
    yScale = d3.scaleLinear(),
    ourBrush = null,
    selectableElements = d3.select(null),
    dispatcher = null;

  // Create the chart by adding an svg to the div with the id 
  // specified by the selector using the given data
  function chart(selector, data) {
    var maxDate  = d3.max(data, function(d){ return d.yearmonth; });
    var minDate  = d3.min(data, function(d){ return d.yearmonth; });
    var maxAge = d3.max(data, function(d){ return d.age; });

    let svg = d3.select(".demographics")
      .append('svg')
      .attr('class', 'svg-vis-demographics-line')
      .attr("preserveAspectRatio", "xMidYMid meet")
      .attr('width', width)
      .attr('height', height)
      .attr('margin', margin);


    svg = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    xScale
         .domain(d3.map(data, function(d) { return d.yearmonth; }).keys())
         .range([margin.left, width-margin.right], 1.0);

    yScale
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


    // Add the points
    let points = svg.append("g")
      .selectAll(".linePoint")
        .data(data);
    
    points.exit().remove();
          
    points = points.enter()
      .append("circle")
        .attr("class", "point linePoint")
      .merge(points)
        .attr("cx", X)
        .attr("cy", Y)        
        .attr("r",3);
        
    selectableElements = points;

    svg.call(brush);

    // Highlight points when brushed
    function brush(g) {   
      const brush = d3.brushX()
        .on("start brush", highlight)
        .on("end", brushEnd)
        .extent([
          [-margin.left, -margin.bottom],
          [width + margin.right, height + margin.top]
        ]);

      ourBrush = brush;

      svg.call(brush); // Adds the brush to this element

      // Highlight the selected circles.
      function highlight() {
        d3.selectAll('.yearmonth').transition().style('opacity', 0.2);
        if (d3.event.selection === null) return;
        const [
          x0, x1
        ] = d3.event.selection;

        
        points.classed("selected", d =>
          x0 <= X(d) && X(d) <= x1
        );

        // Get the name of our dispatcher's event
        let dispatchString = Object.getOwnPropertyNames(dispatcher._)[0];
        // array of selected points
        var selectedData = svg.selectAll(".selected").data();
    


        // get the yearmonth from each selected point
        // selectedData[0].yearmonth

        // Array of g objects of size 12. Get the grouped bars (g tags with yearmonth class) that come from the gender chart that correspond to the year month that was selected in the line chart
        ;


        var counter = 0;
      
        var bars = [];
        while (counter < selectedData.length) {
          var rects = $("#gender").find(".yearmonth").each(function(idx, val) {
            if (val.id == selectedData[counter].yearmonth) {
              bars.push(val)
            }
          });
          counter++
        }

        for (var i = 0; i < bars.length; i++) {
          $("#" + bars[i].id).children().each(function(idx, val) {
            val.style.fill = 'purple';
          });
        }
        d3.selectAll(".yearmonth").transition()
        .style("opacity", "0.3");   
      }
      
      function brushEnd() {
        // We don't want an infinite recursion
        if (d3.event.sourceEvent.type != "end") {
          d3.select(this).call(brush.move, null);
          // d3.selectAll('.yearmonth').transition().style('opacity', 1.0);
        }
        d3.selectAll('.yearmonth').transition().style('opacity', 1.0);
      }
    }

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
}


      














