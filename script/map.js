// REPLACE THIS WITH YOUR ACTUAL GOOGLE MAPS API KEY
const API_KEY = "AIzaSyBteC6Grl6NoUH1SItGsvsTz44VwaYGmo0"; 

function initMap() {
    console.log("Map initialization started");
    const mapElement = document.getElementById("map");
    
    if (!mapElement) {
        console.error("Map element not found");
        return;
    }
    
    try {
        // Show loading state
        mapElement.innerHTML = '<div class="map-loading">Loading map...</div>';
        
        // Get destination from URL or localStorage
        const urlParams = new URLSearchParams(window.location.search);
        const destination = urlParams.get('destination') || localStorage.getItem('lastDestination') || "Bali, Indonesia";
        
        // Create map with default Bali location
        const map = new google.maps.Map(mapElement, {
            center: { lat: -8.3405, lng: 115.0920 },
            zoom: 10,
            mapTypeControl: true
        });
        
        console.log("Map created successfully");
        
        // Add destination marker
        const marker = new google.maps.Marker({
            position: { lat: -8.3405, lng: 115.0920 },
            map: map,
            title: destination
        });
        
        // Add info window
        const infoWindow = new google.maps.InfoWindow({
            content: `<strong>${destination}</strong>`
        });
        
        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });
        
        infoWindow.open(map, marker);
        
        console.log("Marker added for destination:", destination);
        
    } catch (error) {
        console.error("Map initialization error:", error);
        mapElement.innerHTML = `
            <div class="map-error">
                <h3>Map Failed to Load</h3>
                <p>Error: ${error.message}</p>
                <p>Please check your API key and internet connection</p>
            </div>
        `;
    }
}

// More reliable loading function
function loadGoogleMaps() {
    // Check if already loaded
    if (window.google && window.google.maps) {
        console.log("Google Maps already loaded");
        initMap();
        return;
    }
    
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${AIzaSyBteC6Grl6NoUH1SItGsvsTz44VwaYGmo0}&callback=initMap`;
    script.defer = true;
    script.async = true;
    
    script.onerror = () => {
        console.error("Failed to load Google Maps script");
        document.getElementById("map").innerHTML = `
            <div class="map-error">
                <h3>Failed to Load Google Maps</h3>
                <p>Possible causes:</p>
                <ul>
                    <li>Invalid or missing API key</li>
                    <li>No internet connection</li>
                    <li>Google Maps API not enabled in Google Cloud</li>
                </ul>
            </div>
        `;
    };
    
    document.head.appendChild(script);
}