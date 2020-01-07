// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "povertyMoe";

function xScale(data, chosenXAxis) {
	var xLinearScale = d3.scaleLinear()
		.domain([d3.min(data, d => d[chosenXAxis])*0.8,
			d3.max(data, d => d[chosenXAxis])*1.2
		])
		.range([0, width]);

	return xLinearScale;
}
function renderYAxes(newYScale, yAxis){
	var leftAxis = d3.axisLeft(newYScale);

	xAxis.transition()
		.duration(1000)
		.call(leftAxis)

	return xAxis;


function renderXAxes(newXScale, xAxis){
	var leftAxis = d3.axisLeft(newYScale);

	xAxis.transition()
		.duration(1000)
		.call(bottomAxis)

	return xAxis;
}


function renderCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

function updateToolTip(chosenXAxis, circlesGroup) {

  if (chosenXAxis === "hair_length") {
    var label = "Hair Length:";
  }
  else {
    var label = "# of Albums:";
  }

  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.rockband}<br>${label} ${d[chosenXAxis]}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}

d3.csv("data/data.csv").then(function(data, err){
	if (err) throw err;

	data.forEach(function(data){
		data.poverty = +data.poverty;
		data.povertyMoe = +data.povertyMoe;
		data.age = +data.age;
		data.ageMoe = +data.ageMoe;
		data.income = +data.income;
		data.incomeMoe = +data.incomeMoe;
		data.healthcare = +data.healthcare;
		data.healthcareLow = +data.healthcareLow;
		data.healthcareHigh = +data.healthcareHigh;
		data.obesity = +data.obesity;
		data.obesityLow = +data.obesityLow;
		data.obesityHigh = +data.obesityHigh;
		data.smokes = +data.smokes;
		data.smokesLow = +data.smokesLow;
		data.smokesHigh = +data.smokesHigh;
	});

	var xLinearScale = xScale(data, chosenXAxis);

	var yLinearScale = d3.scaleLinear()
		.domain([0, d3.max(data, d => d.num_hits)])
		.range([height, 0]);

		var bottomAxis = d3.axisbottom(xLinearScale);
		var leftAxis = d3.axisLeft(yLinearScale);

		var xAxis = chartGroup.append("g")
			.classed("x-axis", true)
			.attr("transform", `translate(0, ${height})`)
			.call(bottomAxis);

		chartGroup.append("g")
			.call(leftAxis);


		var circlesGroup = chartGroup.selectAll("circle")
    		.data(hairData)
    		.enter()
		    .append("circle")
		    .attr("cx", d => xLinearScale(d[chosenXAxis]))
		    .attr("cy", d => yLinearScale(d.num_hits))
		    .attr("r", 8)
		    .attr("fill", "blue")
		    .attr("opacity", ".5");

		var labelsGroup = chartGroup.append("g")
    		.attr("transform", `translate(${width / 2}, ${height + 20})`);

    	var povertyPercent = labelsGroup.append("text")
    		.attr("x", 0)
    		.attr("y", 20)
    		.attr("active", "poverty")
    		.classed("inactive", true)
    		.text("In Poverty %");

    	var AgeMedian = labelsGroup.append("text")
    		.attr("x", 0)
    		.attr("y", 20)
    		.attr("active", "age")
    		.classed("inactive", true)
    		.text("Age (Median)");

    	var houseIncome = labelsGroup.append("text")
    		.attr("x", 0)
    		.attr("y", 20)
    		.attr("active", "income")
    		.classed("inactive", true)
    		.text("House Hold (Median)");

    	chartGroup.append("text")
		    .attr("transform", "rotate(-90)")
		    .attr("y", 0 - margin.left)
		    .attr("x", 0 - (height / 2))
		    .attr("dy", "1em")
		    .classed("axis-text", true)
		    .text("Number of Billboard 500 Hits");

		var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

		labelsGroup.selectAll("text")
	    .on("click", function() {
	      // get value of selection
	      var value = d3.select(this).attr("value");
	      if (value !== chosenXAxis) {

	        // replaces chosenXAxis with value
	        chosenXAxis = value;

	        // console.log(chosenXAxis)

	        // functions here found above csv import
	        // updates x scale for new data
	        xLinearScale = xScale(data, chosenXAxis);

	        // updates x axis with transition
	        xAxis = renderAxes(xLinearScale, xAxis);

	        // updates circles with new x values
	        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

	        // updates tooltips with new info
	        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

	        // changes classes to change bold text
	        if (chosenXAxis === "poverty") {
	          povertyPercent
	            .classed("active", true)
	            .classed("inactive", false);
	          AgeMedian
	            .classed("active", false)
	            .classed("inactive", true);
	        }
	        else {
	          povertyPercent
	            .classed("active", false)
	            .classed("inactive", true);
	          AgeMedian
	            .classed("active", true)
	            .classed("inactive", false);
        }
      }
    });
}).catch(function(error) {
  console.log(error);
});