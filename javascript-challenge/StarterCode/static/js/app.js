// from data.js
var tableData = data;

// YOUR CODE HERE!
var tbody = d3.select("tbody"); 

console.log(tableData);

tableData.forEach(ufosightings => console.log(ufosightings));

tableData.forEach(function(ufosightings) {
	console.log(ufosightings);
	var row = tbody.append("tr");
	Object.entries(ufosightings).forEach(([key,value]) => {
		console.log(key, value);
		var cell = row.append("td");
		cell.text(value);
	});
});

var button = d3.select("#filter-btn");
var clearInput = d3.select("tbody");

button.on("click", function(){
	clearInput.html("");
	var inputElement = d3.select("#datetime");

	var inputValue = inputElement.property("value");

	console.log(inputValue);
	console.log(tableData);

	var filteredData = tableData.filter(ufo => ufo.datetime === inputValue);

	filteredData.forEach(function(filterufosightings) {
	console.log(filterufosightings);
	var row = tbody.append("tr");
	Object.entries(filterufosightings).forEach(([key,value]) => {
		console.log(key, value);
		var cell = row.append("td");
		cell.text(value);
		});
	});

	console.log(filteredData);


});