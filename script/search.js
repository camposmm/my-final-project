// search.js

// Function to fetch flights from Skyscanner API
async function searchFlights(origin, destination, departureDate) {
    const url = `https://skyscanner50.p.rapidapi.com/search?origin=${origin}&destination=${destination}&departureDate=${departureDate}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': SKYSCANNER_API_KEY,
            'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        displayFlightResults(result.data);
    } catch (error) {
        console.error('Error fetching flight data:', error);
        document.getElementById('flight-results').innerHTML = '<p>Failed to load flight results.</p>';
    }
}

// Function to handle form submission
function handleFlightSearch() {
    const origin = document.getElementById('origin').value.trim();
    const destination = document.getElementById('dest').value.trim();
    const departureDate = document.getElementById('departure-date').value;

    if (!origin || !destination || !departureDate) {
        alert("Please fill in all fields.");
        return;
    }

    searchFlights(origin, destination, departureDate);
}

// Function to display flight results
function displayFlightResults(flights) {
    const resultsDiv = document.getElementById('flight-results');
    resultsDiv.innerHTML = '<h3>✈️ Flight Results</h3>';

    if (!flights || flights.length === 0) {
        resultsDiv.innerHTML += '<p>No flights found.</p>';
        return;
    }

    flights.slice(0, 5).forEach(flight => {
        resultsDiv.innerHTML += `
            <div class="flight-card">
                <strong>${flight.airline}</strong>: ${flight.departure} → ${flight.arrival}<br/>
                Departure: ${flight.departureTime} | Arrival: ${flight.arrivalTime}<br/>
                Price: 💵 $${flight.price}<br/>
                Duration: 🕒 ${flight.duration}
            </div>
        `;
    });
}