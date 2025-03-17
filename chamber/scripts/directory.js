document.addEventListener('DOMContentLoaded', () => {
    // Toggle menu for mobile view
    const menuButton = document.getElementById('menu-button');
    const primaryNav = document.getElementById('primary-nav');
    
    menuButton.addEventListener('click', () => {
        primaryNav.classList.toggle('open');
    });
    
    // Grid/List view toggle
    const gridButton = document.getElementById('grid-btn');
    const listButton = document.getElementById('list-btn');
    const directory = document.getElementById('directory');
    
    gridButton.addEventListener('click', () => {
        directory.classList.add('grid');
        directory.classList.remove('list');
        gridButton.classList.add('active');
        listButton.classList.remove('active');
    });
    
    listButton.addEventListener('click', () => {
        directory.classList.add('list');
        directory.classList.remove('grid');
        listButton.classList.add('active');
        gridButton.classList.remove('active');
    });
    
    // Fetch member data
    fetchMembers();
    
    // Set copyright year
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Set last modified date
    document.getElementById('last-modified').textContent = document.lastModified;
});

async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

function displayMembers(members) {
    const directory = document.getElementById('directory');
    
    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        let membershipBadge = '';
        if (member.membershipLevel === 2) {
            membershipBadge = '<span class="badge silver">Silver</span>';
        } else if (member.membershipLevel === 3) {
            membershipBadge = '<span class="badge gold">Gold</span>';
        }
        
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo">
            <h3>${member.name} ${membershipBadge}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">${member.website}</a></p>
        `;
        
        directory.appendChild(card);
    });
}