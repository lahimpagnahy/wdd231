document.addEventListener('DOMContentLoaded', () => {
    // Load place data from JSON
    loadPlaceData();
    
    // Display visit message
    displayVisitMessage();
});

async function loadPlaceData() {
    try {
        const response = await fetch('data/points-of-interest.json');
        const data = await response.json();
        displayPlaces(data.places);
    } catch (error) {
        console.error('Error loading place data:', error);
        document.querySelector('.discover-grid').innerHTML = '<p>Error loading places. Please try again later.</p>';
    }
}

function displayPlaces(places) {
    const gridContainer = document.querySelector('.discover-grid');
    
    places.forEach(place => {
        const placeCard = document.createElement('div');
        placeCard.className = 'place-card';
        
        placeCard.innerHTML = `
            <h2>${place.name}</h2>
            <figure>
                <img src="${place.image}" alt="${place.name}" loading="lazy" width="300" height="200">
            </figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button>Learn More</button>
        `;
        
        gridContainer.appendChild(placeCard);
    });
}

function displayVisitMessage() {
    const visitMessageElement = document.getElementById('visit-message');
    const currentDate = Date.now();
    
    // Get the last visit date from localStorage
    const lastVisit = localStorage.getItem('lastVisit');
    
    // Display appropriate message based on visit history
    if (!lastVisit) {
        visitMessageElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSinceLastVisit = Math.floor((currentDate - lastVisit) / (1000 * 60 * 60 * 24));
        
        if (daysSinceLastVisit < 1) {
            visitMessageElement.textContent = "Back so soon! Awesome!";
        } else {
            const dayWord = daysSinceLastVisit === 1 ? "day" : "days";
            visitMessageElement.textContent = `You last visited ${daysSinceLastVisit} ${dayWord} ago.`;
        }
    }
    
    // Update the last visit date in localStorage
    localStorage.setItem('lastVisit', currentDate);
}