document.addEventListener('DOMContentLoaded', () => {
    // Toggle menu for mobile view
    const menuButton = document.getElementById('menu-button');
    const primaryNav = document.getElementById('primary-nav');
    
    menuButton.addEventListener('click', () => {
        primaryNav.classList.toggle('open');
    });
    
    
    
});
