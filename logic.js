// part 1: creating earthquake visualization
// create map object
let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});

// add a title layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 10,
    attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// get dataset from USGS GeoJson Feed
let link = 
"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// function to determine marker color based on depth
function getMarkerColor(depth) {
    if (depth < 10) return "#FF5733";
    else if (depth < 50) return "#FFC300";
    else if (depth < 100) return "#C7FF33";
    else return "#33FF57";
}

d3.json(link).then(function(data) {
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            const radius = feature.properties.mag * 5; // Adjust the multiplier for marker size
            const color = getMarkerColor(feature.geometry.coordinates[2]); // Depth is the third coordinate

            return L.circleMarker(latlng, {
                radius: radius,
                fillColor: color,
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).bindPopup(
                `<strong>Location:</strong> ${feature.properties.place}<br>` +
                `<strong>Magnitude:</strong> ${feature.properties.mag}<br>` +
                `<strong>Depth:</strong> ${feature.geometry.coordinates[2]} km`
            );
        }
    }).addTo(myMap);
});
s