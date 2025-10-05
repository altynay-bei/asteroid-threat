// Initialize Leaflet map
let map = L.map('map').setView([20, 0], 2); // start view

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © OpenStreetMap'
}).addTo(map);

let marker; // asteroid marker

function placeImpact() {
  map.on('click', function(e) {
    if (marker) map.removeLayer(marker);
    marker = L.marker(e.latlng).addTo(map);

    // Get user inputs
    let d = parseFloat(document.getElementById('diameter').value); // meters
    let v = parseFloat(document.getElementById('velocity').value) * 1000; // km/s to m/s
    let density = 3000; // kg/m^3

    // Calculate mass
    let r = d / 2;
    let volume = (4/3) * Math.PI * Math.pow(r, 3);
    let mass = density * volume;

    // Kinetic energy
    let energyJ = 0.5 * mass * v * v;
    let energyMT = energyJ / 4.184e15;

    document.getElementById('results').innerHTML =
      `Impact at [${e.latlng.lat.toFixed(2)}, ${e.latlng.lng.toFixed(2)}]<br>` +
      `Mass: ${mass.toExponential(2)} kg<br>` +
      `Energy: ${energyMT.toFixed(2)} megatons TNT`;
  });
}
