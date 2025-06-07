// results.js

// Function to fetch hotels from TripAdvisor API
async function searchHotels(location, checkIn, checkOut) {
    const url = `https://tripadvisor14.p.rapidapi.com/accommodations`; 
    const params = new URLSearchParams({
        location,
        checkin: checkIn,
        checkout: checkOut,
        adults: '2',
        rooms: '1'
    });

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': TRIPADVISOR_API_KEY,
            'X-RapidAPI-Host': 'tripadvisor14.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url + '?' + params, options);
        const result = await response.json();

        displayHotelResults(result.data);
    } catch (error) {
        console.error('Error fetching hotel data:', error);
        document.getElementById('hotel-results').innerHTML = '<p>Failed to load hotel results.</p>';
    }
}

// Function to display hotel results
function displayHotelResults(hotels) {
    const resultsDiv = document.getElementById('hotel-results');
    resultsDiv.innerHTML = '<h3>🏨 Top Hotels</h3>';

    if (!hotels || hotels.length === 0) {
        resultsDiv.innerHTML += '<p>No hotels found.</p>';
        return;
    }

    hotels.slice(0, 5).forEach(hotel => {
        resultsDiv.innerHTML += `
            <div class="hotel-card">
                <img src="${hotel.thumbnail}" alt="${hotel.title}" width="100"><br/>
                <strong>${hotel.title}</strong><br/>
                Rating: ⭐ ${hotel.rating}<br/>
                Price/Night: 💵 $${hotel.price}<br/>
                Reviews: 👤 ${hotel.reviewsCount}
            </div>
        `;
    });
}

// Function to fetch attractions from TripAdvisor API
async function searchAttractions(location) {
    const url = `https://tripadvisor14.p.rapidapi.com/attractions`; 
    const params = new URLSearchParams({ location });

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': TRIPADVISOR_API_KEY,
            'X-RapidAPI-Host': 'tripadvisor14.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url + '?' + params, options);
        const result = await response.json();

        displayAttractionResults(result.data);
    } catch (error) {
        console.error('Error fetching attraction data:', error);
        document.getElementById('attraction-results').innerHTML = '<p>Failed to load attraction results.</p>';
    }
}

// Function to display attraction results
function displayAttractionResults(attractions) {
    const resultsDiv = document.getElementById('attraction-results');
    resultsDiv.innerHTML = '<h3>🌟 Top Attractions</h3>';

    if (!attractions || attractions.length === 0) {
        resultsDiv.innerHTML += '<p>No attractions found.</p>';
        return;
    }

    attractions.slice(0, 5).forEach(item => {
        resultsDiv.innerHTML += `
            <div class="attraction-card">
                <strong>${item.title}</strong><br/>
                Description: ${item.description.substring(0, 100)}...<br/>
                Rating: ⭐ ${item.rating || 'N/A'} | Price: 💵 ${item.price || 'Free'}
            </div>
        `;
    });
}