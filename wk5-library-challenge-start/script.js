(function(){
    'use strict';

    // add your script here
    var map = L.map('map').setView([20.470530, -103.648205], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var marker = L.marker([20.470530, -103.648205]).addTo(map);

    var circle = L.circle([20.480943, -103.655714], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(map);

    var polygon = L.polygon([
        [20.471441, -103.649600],
        [20.466577, -103.643555],
        [20.471622, -103.647156]
    ]).addTo(map);

    marker.bindPopup("<b>San Pedro Valencia</b><br>Known for it's good fish!").openPopup();
    circle.bindPopup("Lake of Valencia");
    polygon.bindPopup("Half of this town is related to to each other.");

}());