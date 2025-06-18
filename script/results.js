document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'auth.html';
    }
});

function displayFlightResults(flights) {
    const resultsDiv = document.getElementById('flight-results');
    resultsDiv.innerHTML = '<h3>✈️ Flight Results</h3>';

    if (!flights || flights.length === 0) {
        resultsDiv.innerHTML += '<p>No flights found.</p>';
        return;
    }

    flights.slice(0, 5).forEach(flight => {
        resultsDiv.innerHTML += `
            <div class="result-item">
                <strong>${flight.airline}</strong>: ${flight.departure} → ${flight.arrival}<br/>
                Departure: ${flight.departureTime} | Arrival: ${flight.arrivalTime}<br/>
                Price: 💵 $${flight.price}<br/>
                Duration: 🕒 ${flight.duration}
            </div>
        `;
    });
}

function displayHotelResults(hotels) {
    const resultsDiv = document.getElementById('hotel-results');
    resultsDiv.innerHTML = '<h3>🏨 Top Hotels</h3>';

    if (!hotels || hotels.length === 0) {
        resultsDiv.innerHTML += '<p>No hotels found.</p>';
        return;
    }

    hotels.slice(0, 5).forEach(hotel => {
        resultsDiv.innerHTML += `
            <div class="result-item">
                <img src="${hotel.thumbnail}" alt="${hotel.title}" width="100"><br/>
                <strong>${hotel.title}</strong><br/>
                Rating: ⭐ ${hotel.rating}<br/>
                Price/Night: 💵 $${hotel.price}<br/>
                Reviews: 👤 ${hotel.reviewsCount}
            </div>
        `;
    });
}