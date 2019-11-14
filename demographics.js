// read in the data
// d3.csv('data/demographics_data/age.csv', function(d) {
//   return {
//     yearmonth: d.yearmonth,
//     age: +d.age
//   };
//   // create a bar chart with the data that was read in
// }).then(lineChart);

// d3.csv("data/demographics_data/gender.csv", function(d) {
//   return {
//     yearmonth: d.yearmonth,
//     count: +d.count,
//     gender: d.gender
//   };
// }).then(grouped_bar_chart_gender);

// // d3.csv("data/demographics_data/users.csv", function(d) {
// //   return {
// //     yearmonth: d.yearmonth,
// //     count: +d.count,
// //     usertype: d.usertype
// //   };
// // }).then(grouped_bar_chart_member);

// function lineChart(data){

//   var maxDate  = d3.max(data, function(d){ return d.yearmonth; });
//   var minDate  = d3.min(data, function(d){ return d.yearmonth; });
//   var maxAge = d3.max(data, function(d){ return d.age; });

//   // svg width
//   var width = 1200;
//   // svg height
//   var height = 800;
//   // margins around visualization
//   var margin = {
//     top: 40,
//     bottom: 80,
//     left: 80,
//     right: 30
//   };

//   var svg = d3.select(".vis-holder")
//         .append('svg')
//         .attr('class', 'svg-vis-demographics-line')
//         .attr('width', width)
//         .attr('height', height)
//         .attr('margin', margin);

//   var xScale = d3.scaleBand()
//              .domain(d3.map(data, function(d) { return d.yearmonth; }).keys())
//              .range([margin.left, width-margin.right], 1.0);

//   var yScale = d3.scaleLinear()
//              .domain([0, maxAge + 10])
//              .range([height - margin.bottom - margin.top, 0]);

//   var xAxis = d3.axisBottom(xScale);
//   svg.append('g')
//           .attr('class', 'x axis')
//           .attr('transform', 'translate(0, ' + (height - margin.bottom - margin.top) + ')')
//           .call(xAxis.scale(xScale));

//   var yAxis = d3.axisLeft(yScale);
//   svg.append('g')
//      .attr('class', 'y axis')
//      .attr("transform", `translate(${margin.left}, 0)`)
//      .call(yAxis.scale(yScale));

//   var line = d3.line()
//            .x(function(d) { return xScale(d.yearmonth); })    
//            .y(function(d) { return yScale(d.age); });

//   svg.append('path')
//           .attr('d', line(data))
//           .attr('class', 'dataLine');

//   // create a x-axis title
//   var xLabel = svg.append("text")
//                   .attr("text-anchor", "middle")
//                   .attr("transform", "translate("+ (width/2) +","+(height-(margin.bottom/3)-40)+")")
//                   .text("Year-Month");

//   // create a y-axis title
//   var yLabel = svg.append("text")
//                   .attr("text-anchor", "middle")
//                   .attr("transform", "translate("+ (margin.left/2) +","+(height/2)+")rotate(-90)")
//                   .text("Average User Age");

//   // create a chart title
//   var chartTitle = svg.append("text")
//                       .attr("text-anchor", "middle")
//                       .attr("transform", "translate("+ (width/2) +","+((margin.bottom/3)-10)+")")
//                       .text("Average Age of BlueBikes Users from 10/2018-9/2019");
// };

// function grouped_bar_chart_gender(data) {

//   // svg width
//   var width = 1200;
//   // svg height
//   var height = 800;
//   // margins around visualization
//   var margin = {
//     top: 80,
//     bottom: 80,
//     left: 100,
//     right: 30
//   };

//   var svg = d3.select(".vis-holder")
//         .append('svg')
//         .attr('class', 'svg-vis-gender-bar')
//         .attr('width', width)
//         .attr('height', height)
//         .attr('margin', margin);

// var color = d3.scaleOrdinal(d3.schemeCategory10);

// var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
// var y = d3.scaleLinear().rangeRound([height, 0]);

// var ymaxdomain = d3.max(data, function(d) {
//   return d.count;
// });
// x.domain(data.map(function(d) {
//   return d.yearmonth
// }));
// y.domain([0, ymaxdomain]);

// var x1 = d3.scaleBand()
//   .rangeRound([0, x.bandwidth()])
//   .padding(0.05)
//   .domain(data.map(function(d) {
//     return d.gender;
//   }));

// color.domain(data.map(function(d) {
//   return d.gender;
// }));

// var groups = svg.selectAll(null)
//   .data(data)
//   .enter()
//   .append("g")
//   .attr("transform", function(d) {
//     return "translate(" + x(d.yearmonth) + ",0)";
//   });

// var xAxis = svg.append("g")
//   //.attr("class", "x axis")
// .attr("transform", `translate(${margin.left}, ${height-margin.bottom})`)
//   .call(d3.axisBottom().scale(x));

//     // var xAxis = svg.append("g")
//     //          .attr("transform", `translate(0, ${height-margin.bottom})`)
//     //                .call(d3.axisBottom().scale(xScale));

// // var yAxis = svg.append("g")
// //   //.attr("class", "y axis")
// //      .attr("transform", `translate(${margin.left}, 0)`)
// //   .call(d3.axisLeft(y).ticks(null, "s"))
// //   .append("text")
// //   .attr("x", 2)
// //   .attr("y", y(y.ticks().pop()) + 0.5);

//     var yAxis = svg.append("g")
//              .attr("transform", `translate(${margin.left}, -80)`)
//                    .call(d3.axisLeft().scale(y));

//   var bars = groups.selectAll(null)
//   // .data(function(d) {
//   //   return [d]
//   // })
//   .data(data)
//   .enter()
//   .append("rect")
//   .attr("x", function(d, i) {
//     return x1(d.gender)
//   })
//   .attr("y", function(d) {
//     return y(d.count);
//   })
//   .attr("width", x1.bandwidth())
//   .attr("height", function(d) {
//     return height-margin.bottom-y(d.count);
//   })
//   .attr("fill", function(d) {
//     return color(d.gender)
//   });

//       // var rect = svg.append("g")
//       //       .selectAll("rect")
//       //       .data(mydata)
//       //       .enter()
//       //       .append("rect")
//       //       .attr("class", "bar")
//       //           .attr("x", function(d) { return xScale(d.start_hour); })
//       //           .attr("y", function(d) { return yScale(d.pct); })
//       //           .attr("width", xScale.bandwidth())
//       //           .attr("height", function(d) { 
//       //     return height-margin.bottom-yScale(d.pct);
//       //           });

//   // create a x-axis title
//   var xLabel = svg.append("text")
//                   .attr("text-anchor", "middle")
//                   .attr("transform", "translate("+ (width/2) +","+(height-(margin.bottom/3))+")")
//                   .text("Year-Month");

//   // create a y-axis title
//   var yLabel = svg.append("text")
//                   .attr("text-anchor", "middle")
//                   .attr("transform", "translate("+ (margin.left/2) +","+(height/2)+")rotate(-90)")
//                   .text("Self-Reported Gender");

//   // create a chart title
//   var chartTitle = svg.append("text")
//                       .attr("text-anchor", "middle")
//                       .attr("transform", "translate("+ (width/2) +","+((margin.bottom/3)+15)+")")
//                       .text("Gender Distribution of BlueBikes Users from 10/2018-9/2019");
// }

// function grouped_bar_chart_member(data) {

//   // svg width
//   var width = 1200;
//   // svg height
//   var height = 800;
//   // margins around visualization
//   var margin = {
//     top: 40,
//     bottom: 80,
//     left: 80,
//     right: 30
//   };

//   var svg = d3.select(".vis-holder")
//         .append('svg')
//         .attr('class', 'svg-vis-member-bar')
//         .attr('width', width)
//         .attr('height', height)
//         .attr('margin', margin);

// var color = d3.scaleOrdinal(d3.schemeCategory10);

// var x = d3.scaleBand().rangeRound([0, width])
//   .padding(0.1);
//  var y = d3.scaleLinear().rangeRound([height, 0]);

// var ymaxdomain = d3.max(data, function(d) {
//   return d.count;
// });
// x.domain(data.map(function(d) {
//   return d.yearmonth
// }));
// y.domain([0, ymaxdomain]);

// var x1 = d3.scaleBand()
//   .rangeRound([0, x.bandwidth()])
//   .padding(0.05)
//   .domain(data.map(function(d) {
//     return d.usertype;
//   }));

// color.domain(data.map(function(d) {
//   return d.usertype;
// }));

// var groups = svg.selectAll(null)
//   .data(data)
//   .enter()
//   .append("g")
//   .attr("transform", function(d) {
//     return "translate(" + x(d.yearmonth) + ",0)";
//   });

// svg.append("g")
//   .attr("class", "axis")
//   .attr("transform", "translate(0," + height + ")")
//   .call(d3.axisBottom(x));

// svg.append("g")
//   .attr("class", "axis")
//   .attr("transform", `translate(${margin.left}, 0)`)
//   .call(d3.axisLeft(y).ticks(null, "s"))
//   .append("text")
//   .attr("x", 2)
//   .attr("y", y(y.ticks().pop()) + 0.5)
//   .attr("dy", "0.32em")
//   .attr("fill", "#000")
//   .attr("font-weight", "bold")
//   .attr("text-anchor", "start");

//   var bars = groups.selectAll(null)
//   .data(function(d) {
//     return [d]
//   })
//   .enter()
//   .append("rect")
//   .attr("x", function(d, i) {
//     return x1(d.usertype)
//   })
//   .attr("y", function(d) {
//     return y(d.count);
//   })
//   .attr("width", x1.bandwidth())
//   .attr("height", function(d) {
//     return height - y(d.count);
//   })
//   .attr("fill", function(d) {
//     return color(d.usertype)
//   });

//   // create a x-axis title
//   var xLabel = svg.append("text")
//                   .attr("text-anchor", "middle")
//                   .attr("transform", "translate("+ (width/2) +","+(height-(margin.bottom/3))+")")
//                   .text("Year-Month");

//   // create a y-axis title
//   var yLabel = svg.append("text")
//                   .attr("text-anchor", "middle")
//                   .attr("transform", "translate("+ (margin.left/2) +","+(height/2)+")rotate(-90)")
//                   .text("Member Status");

//   // create a chart title
//   var chartTitle = svg.append("text")
//                       .attr("text-anchor", "middle")
//                       .attr("transform", "translate("+ (width/2) +","+((margin.bottom/3)-10)+")")
//                       .text("BlueBikes Membership Status from 10/2018-9/2019");
// }

// var models = [
//   {
//     "model_name":"f1",
//     "field1":19,
//     "field2":83
//   },
//   {
//     "model_name":"f2",
//     "field1":67,
//     "field2":93
//   },
//   {
//     "model_name":"f3",
//     "field1":10,
//     "field2":56
//   },
//   {
//     "model_name":"f4",
//     "field1":98,
//     "field2":43
//   }
// ];
d3.csv("data/demographics_data/gender.csv", function(d) {
  return {
    yearmonth: d.yearmonth,
    male: +d.male,
    female: +d.female,
    unreported: +d.unreported
  };
}).then(function(result) {
  console.log(result);
  var models = result.map(i => {
    i.yearmonth = i.yearmonth;
    return i;
  });

  var container = d3.select('.vis-holder'),
    width = 600,
    height = 300,
    margin = {top: 30, right: 20, bottom: 30, left: 50},
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
  model_name.selectAll(".bar.field2")
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
});





