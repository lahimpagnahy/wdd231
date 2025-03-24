// DOM elements
const spotlightContainer = document.getElementById('spotlight-container');

// Sample business data for the spotlights
const businesses = [
    {
        name: "Sahara Desert",
        description: "Experience the magic of the desert with guided tours in authentic settings.",
        logo: "images/sahara-desert-tours.png",
        phone: "(261) 555-0112",
        website: "https://www.saharadesertours.com",
        email: "info@saharadesertours.com",
        membership: "gold"
    },
    {
        name: "Manuscripts Museum",
        description: "Home to thousands of historically significant manuscripts dating back centuries.",
        logo: "images/boise-museum.png",
        phone: "(261) 555-0225",
        website: "https://www.boisemanuscripts.org",
        email: "visit@boisemanuscripts.org",
        membership: "gold"
    },
    {
        name: "Djinguereber Marketplace",
        description: "The largest marketplace in boise featuring local artisans and products.",
        logo: "images/marketplace.png",
        phone: "(261) 555-0333",
        website: "https://www.djinguerebermarket.com",
        email: "contact@djinguerebermarket.com",
        membership: "silver"
    },
    {
        name: "Grand Hotel",
        description: "Luxury accommodations with traditional Malian architecture and hospitality.",
        logo: "images/grand-hotel.png",
        phone: "(261) 555-0444",
        website: "https://www.grandhotelboise.com",
        email: "reservations@grandhotelboise.com",
        membership: "gold"
    },
    {
        name: " Artisan Crafts",
        description: "Authentic handcrafted goods from local artists and craftspeople.",
        logo: "images/artisan.png",
        phone: "(261) 555-0555",
        website: "https://www.maliartisancrafts.com",
        email: "shop@maliartisancrafts.com",
        membership: "silver"
    },
    {
        name: "Tech Solutions",
        description: "IT services and technology solutions for local businesses and organizations.",
        logo: "images/tech.png",
        phone: "(261) 555-0666",
        website: "https://www.boisetech.com",
        email: "support@boisetech.com",
        membership: "gold"
    }
];

// Function to display business spotlights
function displaySpotlights() {
    // Clear the container
    spotlightContainer.innerHTML = '';
    
    // Filter businesses by membership level (gold and silver only)
    const eligibleBusinesses = businesses.filter(business => 
        business.membership === 'gold' || business.membership === 'silver'
    );
    
    // Shuffle array to randomize spotlights
    const shuffled = [...eligibleBusinesses].sort(() => 0.5 - Math.random());
    
    // Get number of spotlights to display based on screen size
    let numberOfSpotlights = 3;
    if (window.innerWidth < 640) {
        numberOfSpotlights = 1;
    } else if (window.innerWidth < 1024) {
        numberOfSpotlights = 2;
    }
    
    // Get subset of businesses to display
    const selectedBusinesses = shuffled.slice(0, numberOfSpotlights);
    
    // Create spotlight cards
    selectedBusinesses.forEach(business => {
        const card = document.createElement('div');
        card.className = 'spotlight-card';
        
        // Create membership badge class
        const membershipClass = `spotlight-membership ${business.membership}`;
        
        // Check if we're on desktop view (larger screens)
        const isDesktop = window.innerWidth >= 1024;
        
        if (isDesktop) {
            // Desktop layout with logo on the right
            card.innerHTML = `
                <div class="spotlight-content">
                    <h3 class="spotlight-name">${business.name}</h3>
                    <span class="${membershipClass}">${business.membership.toUpperCase()} Member</span>
                    <p>${business.description}</p>
                    <div class="spotlight-contact">
                        <p>${business.phone}</p>
                        <a href="${business.website}" target="_blank">Visit Website</a>
                        <a href="mailto:${business.email}">Email</a>
                    </div>
                </div>
                <img src="${business.logo}" alt="${business.name} Logo" class="spotlight-logo">
            `;
        } else {
            // Mobile/tablet layout with logo on top
            card.innerHTML = `
                <img src="${business.logo}" alt="${business.name} Logo" class="spotlight-logo">
                <h3 class="spotlight-name">${business.name}</h3>
                <span class="${membershipClass}">${business.membership.toUpperCase()} Member</span>
                <p>${business.description}</p>
                <div class="spotlight-contact">
                    <p>${business.phone}</p>
                    <a href="${business.website}" target="_blank">Visit Website</a>
                    <a href="mailto:${business.email}">Email</a>
                </div>
            `;
        }
        
        spotlightContainer.appendChild(card);
    });
}

// Call the display function when the page loads
document.addEventListener('DOMContentLoaded', displaySpotlights);

// Update spotlights when the window resizes
window.addEventListener('resize', () => {
    // Use a debounce to prevent too many updates during resize
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(displaySpotlights, 250);
});