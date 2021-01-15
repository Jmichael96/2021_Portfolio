// idwJh8J0x9cq7vGdT0SgaIkuv0Gdb1pM
var map = tt.map({
    key: 'idwJh8J0x9cq7vGdT0SgaIkuv0Gdb1pM',
    container: 'map',
    basePath: '/',
    style: '/custommap.json',
    source: 'vector',
    center: [-97, 29],
    zoom: 4
});

function createMarker(position, color, popupText) {
    let markerElement = document.createElement('div');
    markerElement.className = 'marker';

    let markerContentElement = document.createElement('div');
    markerContentElement.className = 'marker-content';
    markerContentElement.style.backgroundColor = color;
    markerElement.appendChild(markerContentElement);

    // add marker to map
    new tt.Marker({ scale: 1.3 })
        .setLngLat(position)
        .addTo(map);
}

createMarker([-95.461195, 30.168032], '#3b4e74', 'The Woodlands, TX');