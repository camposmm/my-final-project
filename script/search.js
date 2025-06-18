document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'auth.html';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const destination = document.getElementById('destination').value.trim();
            const budget = document.getElementById('budget').value;
            const interest = document.getElementById('interest').value;
            
            if (!destination) {
                showAlert("Please enter a destination.", "error");
                return;
            }
            
            // Show loading indicator
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = '<div class="loading">Searching...</div>';
            
            // Simulate API search with mock data
            setTimeout(() => {
                const mockDestinations = {
                    beaches: ['Bali, Indonesia', 'Maldives', 'Santorini, Greece'],
                    hiking: ['Swiss Alps', 'Rocky Mountains', 'Patagonia'],
                    history: ['Rome, Italy', 'Cairo, Egypt', 'Kyoto, Japan'],
                    food: ['Bangkok, Thailand', 'Tokyo, Japan', 'Mexico City, Mexico']
                };
                
                const mockHotels = [
                    { name: 'Oceanview Resort', rating: 4.5, price: 120 },
                    { name: 'Mountain Lodge', rating: 4.2, price: 95 },
                    { name: 'Historic Inn', rating: 4.7, price: 150 }
                ];
                
                const mockFlights = [
                    { airline: 'Sky Airlines', departure: 'NYC', price: 350 },
                    { airline: 'Ocean Airways', departure: 'LAX', price: 420 },
                    { airline: 'Global Flyer', departure: 'CHI', price: 290 }
                ];
                
                // Display results
                displaySearchResults(destination, mockDestinations[interest], mockHotels, mockFlights);
            }, 1500);
        });
    }
    
    function displaySearchResults(destination, destinations, hotels, flights) {
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = `
            <h3>Top Destinations for ${destination}</h3>
            <div class="destination-grid">
                ${destinations.map(dest => `
                    <div class="destination-card">
                        <h4>${dest}</h4>
                        <p>Perfect for ${document.getElementById('interest').value} experiences</p>
                    </div>
                `).join('')}
            </div>
            
            <h3>Recommended Hotels</h3>
            <div class="hotel-grid">
                ${hotels.map(hotel => `
                    <div class="hotel-card">
                        <h4>${hotel.name}</h4>
                        <p>Rating: ${'★'.repeat(Math.round(hotel.rating))}</p>
                        <p>Price: $${hotel.price}/night</p>
                    </div>
                `).join('')}
            </div>
            
            <h3>Flight Options</h3>
            <div class="flight-grid">
                ${flights.map(flight => `
                    <div class="flight-card">
                        <h4>${flight.airline}</h4>
                        <p>From ${flight.departure}</p>
                        <p>Price: $${flight.price}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }
});