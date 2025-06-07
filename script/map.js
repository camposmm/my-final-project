// map.js

// Initialize Google Map
function initMap() {
    const defaultLocation = { lat: -34.397, lng: 150.644 };
    const map = new google.maps.Map(document.getElementById("map"), {
        center: defaultLocation,
        zoom: 8,
    });

    new google.maps.Marker({
        position: defaultLocation,
        map: map,
        title: "Default Location"
    });
}

// Optional: Add marker dynamically based on user input
function addMarker(lat, lng, title) {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat, lng },
        zoom: 10
    });

    new google.maps.Marker({
        position: { lat, lng },
        map: map,
        title
    });
}