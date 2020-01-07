


var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
console.log(link);


d3.json(link, function(data) {
  
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {


  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time)+"</p>");
  }
    function chooseColor(mag) {
        if (mag >= 5 ){
            return "#da2020";}
        else if ( mag > 4 & mag < 5){
            return "#da20bb";}
        else if ( mag > 3 & mag < 4){
            return "#7720da";}
        else if ( mag > 2 & mag < 3){
            return "#2c20da";}
        else if (mag > 1 & mag < 2){
            return "#20dac4"}
        else{
            return "#20da29";}

}
    
console.log(earthquakeData);
    
function setMarkerOptions(data){ 
  var geojsonMarkerOptions = {
    radius: data.properties.mag * 3,
    fillColor: chooseColor(data.properties.mag),
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };
       return geojsonMarkerOptions
   }
    
 
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,  
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, setMarkerOptions(feature))}
      
  });

  
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };
  

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 4,
    layers: [streetmap, earthquakes]
  });

    var legend = L.control({position: "bottomright"});

// When the layer control is added, insert a div with the class of "legend"
legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
//// Add the info legend to the map
legend.addTo(myMap);
  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
    
    document.querySelector(".legend").innerHTML = [
    "<p>Magnitude: </p>",
    "<p class='magnitude_1'> Magnitude: > 5 </p>",
    "<p class='magnitude_2'> Magnitude: 4 - 5 </p>",
    "<p class='magnitude_3'> Magnitude: 3 - 4 </p>",
    "<p class='magnitude_4'> Magnitude: 2 - 3 </p>",
    "<p class='magnitude_5'> Magnitude: 1 - 2 </p>",
    "<p class='magnitude_6'> Magnitude: < 1 </p>"
  ].join("");
    
}



