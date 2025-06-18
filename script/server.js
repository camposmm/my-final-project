document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            performSearch();
        });
    }

    function performSearch() {
        const destination = document.getElementById('destination').value.trim();
        const budget = document.getElementById('budget').value;
        const interest = document.getElementById('interest').value;
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        
        if (!destination) {
            showAlert("Please enter a destination.", "error");
            return;
        }
        
        // Show loading indicator
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '<div class="loading">Searching for the best travel options...</div>';
        
        // Simulate API search with mock data
        setTimeout(() => {
            showSearchResults(destination, budget, interest, startDate, endDate);
        }, 1500);
    }

    function showSearchResults(destination, budget, interest, startDate, endDate) {
        const resultsContainer = document.getElementById('results');
        
        // Clear loading indicator
        resultsContainer.innerHTML = '';
        
        // Destination results
        const destinationResults = document.getElementById('destination-results');
        destinationResults.innerHTML = `
            <h3>Top Destinations for ${destination}</h3>
            <div class="destination-grid">
                <div class="destination-card">
                    <h4>${destination} Beach Resort</h4>
                    <p>⭐ 4.7 (1,200 reviews)</p>
                    <p>Perfect for beach lovers with ${budget} budget</p>
                </div>
                <div class="destination-card">
                    <h4>${destination} Cultural Tour</h4>
                    <p>⭐ 4.9 (850 reviews)</p>
                    <p>Explore local history and traditions</p>
                </div>
                <div class="destination-card">
                    <h4>${destination} Food Experience</h4>
                    <p>⭐ 4.8 (1,050 reviews)</p>
                    <p>Taste authentic local cuisine</p>
                </div>
            </div>
        `;
        
        // Hotel results
        const hotelResults = document.getElementById('hotel-results');
        hotelResults.innerHTML = `
            <h3>Recommended Hotels</h3>
            <div class="hotel-grid">
                <div class="hotel-card">
                    <h4>${destination} Beach Resort</h4>
                    <p>⭐ 4.6 | $120/night</p>
                    <p>Beachfront property with spa</p>
                </div>
                <div class="hotel-card">
                    <h4>${destination} City Hotel</h4>
                    <p>⭐ 4.4 | $95/night</p>
                    <p>Central location near attractions</p>
                </div>
                <div class="hotel-card">
                    <h4>${destination} Boutique Inn</h4>
                    <p>⭐ 4.8 | $150/night</p>
                    <p>Charming local experience</p>
                </div>
            </div>
        `;
        
        // Flight results
        const flightResults = document.getElementById('flight-results');
        flightResults.innerHTML = `
            <h3>Flight Options</h3>
            <div class="flight-grid">
                <div class="flight-card">
                    <h4>✈️ Sky Airlines</h4>
                    <p>Departure: ${startDate || '2025-03-10'}</p>
                    <p>Return: ${endDate || '2025-03-20'}</p>
                    <p>Price: $${budget === 'low' ? '350' : budget === 'medium' ? '550' : '850'}</p>
                </div>
                <div class="flight-card">
                    <h4>✈️ Ocean Airways</h4>
                    <p>Departure: ${startDate || '2025-03-10'}</p>
                    <p>Return: ${endDate || '2025-03-20'}</p>
                    <p>Price: $${budget === 'low' ? '320' : budget === 'medium' ? '520' : '780'}</p>
                </div>
            </div>
        `;
    }
});