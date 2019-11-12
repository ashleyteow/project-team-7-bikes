// read in the data
d3.csv('data/demographics_data/age.csv', function(d) {
  return {
    yearmonth: d.yearmonth,
    age: +d.age
  };
  // create a bar chart with the data that was read in
}).then(lineChart);

d3.csv("data/demographics_data/gender.csv", function(d) {
  return {
    yearmonth: d.yearmonth,
    count: +d.count,
    gender: d.gender
  };
}).then(grouped_bar_chart_gender);

d3.csv("data/demographics_data/users.csv", function(d) {
  return {
    yearmonth: d.yearmonth,
    count: +d.count,
    usertype: d.usertype
  };
}).then(grouped_bar_chart_member);

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

  var svg = d3.select(".vis-holder")
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
};

function grouped_bar_chart_gender(data) {

  // svg width
  var width = 1400;
  // svg height
  var height = 800;
  // margins around visualization
  var margin = {
    top: 5,
    bottom: 0,
    left: 40,
    right: 30
  };

  var svg = d3.select(".vis-holder")
        .append('svg')
        .attr('class', 'svg-vis-gender-bar')
        .attr('width', width)
        .attr('height', height)
        .attr('margin', margin);

var color = d3.scaleOrdinal(d3.schemeCategory10);

var x = d3.scaleBand().rangeRound([0, width])
  .padding(0.1);
 var y = d3.scaleLinear().rangeRound([height, 0]);

var ymaxdomain = d3.max(data, function(d) {
  return d.count;
});
x.domain(data.map(function(d) {
  return d.yearmonth
}));
y.domain([0, ymaxdomain]);

var x1 = d3.scaleBand()
  .rangeRound([0, x.bandwidth()])
  .padding(0.05)
  .domain(data.map(function(d) {
    return d.gender;
  }));

color.domain(data.map(function(d) {
  return d.gender;
}));

var groups = svg.selectAll(null)
  .data(data)
  .enter()
  .append("g")
  .attr("transform", function(d) {
    return "translate(" + x(d.yearmonth) + ",0)";
  });

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

svg.append("g")
  .attr("class", "y axis")
  .attr("transform", `translate(${margin.left}, 0)`)
  .call(d3.axisLeft(y).ticks(null, "s"))
  .append("text")
  .attr("x", 2)
  .attr("y", y(y.ticks().pop()) + 0.5)
  .attr("dy", "0.32em")
  .attr("fill", "#000")
  .attr("font-weight", "bold")
  .attr("text-anchor", "start");

  var bars = groups.selectAll(null)
  .data(function(d) {
    return [d]
  })
  .enter()
  .append("rect")
  .attr("x", function(d, i) {
    return x1(d.gender)
  })
  .attr("y", function(d) {
    return y(d.count);
  })
  .attr("width", x1.bandwidth())
  .attr("height", function(d) {
    return height - y(d.count) + 100;
  })
  .attr("fill", function(d) {
    return color(d.gender)
  });

  // create a x-axis title
  var xLabel = svg.append("text")
                  .attr("text-anchor", "middle")
                  .attr("transform", "translate("+ (width/2) +","+(height-(margin.bottom/3))+")")
                  .text("Year-Month");

  // create a y-axis title
  var yLabel = svg.append("text")
                  .attr("text-anchor", "middle")
                  .attr("transform", "translate("+ (margin.left/2) +","+(height/2)+")rotate(-90)")
                  .text("Self-Reported Gender");

  // create a chart title
  var chartTitle = svg.append("text")
                      .attr("text-anchor", "middle")
                      .attr("transform", "translate("+ (width/2) +","+((margin.bottom/3)+15)+")")
                      .text("Gender Distribution of BlueBikes Users from 10/2018-9/2019");
}

function grouped_bar_chart_member(data) {

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

  var svg = d3.select(".vis-holder")
        .append('svg')
        .attr('class', 'svg-vis-member-bar')
        .attr('width', width)
        .attr('height', height)
        .attr('margin', margin);

var color = d3.scaleOrdinal(d3.schemeCategory10);

var x = d3.scaleBand().rangeRound([0, width])
  .padding(0.1);
 var y = d3.scaleLinear().rangeRound([height, 0]);

var ymaxdomain = d3.max(data, function(d) {
  return d.count;
});
x.domain(data.map(function(d) {
  return d.yearmonth
}));
y.domain([0, ymaxdomain]);

var x1 = d3.scaleBand()
  .rangeRound([0, x.bandwidth()])
  .padding(0.05)
  .domain(data.map(function(d) {
    return d.usertype;
  }));

color.domain(data.map(function(d) {
  return d.usertype;
}));

var groups = svg.selectAll(null)
  .data(data)
  .enter()
  .append("g")
  .attr("transform", function(d) {
    return "translate(" + x(d.yearmonth) + ",0)";
  });

svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

svg.append("g")
  .attr("class", "axis")
  .attr("transform", `translate(${margin.left}, 0)`)
  .call(d3.axisLeft(y).ticks(null, "s"))
  .append("text")
  .attr("x", 2)
  .attr("y", y(y.ticks().pop()) + 0.5)
  .attr("dy", "0.32em")
  .attr("fill", "#000")
  .attr("font-weight", "bold")
  .attr("text-anchor", "start");

  var bars = groups.selectAll(null)
  .data(function(d) {
    return [d]
  })
  .enter()
  .append("rect")
  .attr("x", function(d, i) {
    return x1(d.usertype)
  })
  .attr("y", function(d) {
    return y(d.count);
  })
  .attr("width", x1.bandwidth())
  .attr("height", function(d) {
    return height - y(d.count);
  })
  .attr("fill", function(d) {
    return color(d.usertype)
  });

  // create a x-axis title
  var xLabel = svg.append("text")
                  .attr("text-anchor", "middle")
                  .attr("transform", "translate("+ (width/2) +","+(height-(margin.bottom/3))+")")
                  .text("Year-Month");

  // create a y-axis title
  var yLabel = svg.append("text")
                  .attr("text-anchor", "middle")
                  .attr("transform", "translate("+ (margin.left/2) +","+(height/2)+")rotate(-90)")
                  .text("Member Status");

  // create a chart title
  var chartTitle = svg.append("text")
                      .attr("text-anchor", "middle")
                      .attr("transform", "translate("+ (width/2) +","+((margin.bottom/3)-10)+")")
                      .text("BlueBikes Membership Status from 10/2018-9/2019");
}