// DOM Elements
const hamburgerBtn = document.getElementById('hamburger-btn');
const primaryNav = document.getElementById('primary-nav');
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const currentDateElement = document.getElementById('current-date');
const currentYearElement = document.getElementById('current-year');
const lastModifiedElement = document.getElementById('last-modified');

// Toggle navigation menu
hamburgerBtn.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
    hamburgerBtn.classList.toggle('open');
});

// Dark mode toggle functionality
let darkMode = localStorage.getItem('darkMode') === 'enabled';

// Apply dark mode if it was previously enabled
if (darkMode) {
    enableDarkMode();
}

// Toggle dark mode when the moon icon is clicked
darkModeToggle.addEventListener('click', () => {
    darkMode = !darkMode;
    if (darkMode) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});

function enableDarkMode() {
    document.documentElement.style.setProperty('--text-color', '#ECEFF1');
    document.documentElement.style.setProperty('--background-color', '#263238');
    document.documentElement.style.setProperty('--card-background', '#37474F');
    document.documentElement.style.setProperty('--border-color', '#455A64');
    document.documentElement.style.setProperty('--link-color', '#90CAF9');
    darkModeToggle.innerHTML = '<span>☀️</span>';
    localStorage.setItem('darkMode', 'enabled');
}

function disableDarkMode() {
    document.documentElement.style.setProperty('--text-color', '#212121');
    document.documentElement.style.setProperty('--background-color', '#ECEFF1');
    document.documentElement.style.setProperty('--card-background', '#FFFFFF');
    document.documentElement.style.setProperty('--border-color', '#CFD8DC');
    document.documentElement.style.setProperty('--link-color', '#1565C0');
    darkModeToggle.innerHTML = '<span>🌙</span>';
    localStorage.setItem('darkMode', 'disabled');
}

// Display current date in the format: Monday, January 1, 2025
function displayCurrentDate() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    currentDateElement.textContent = now.toLocaleDateString('en-US', options);
}

// Display current year in footer
function displayCurrentYear() {
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;
}

// Display last modified date of the document
function displayLastModified() {
    lastModifiedElement.textContent = document.lastModified;
}

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    displayCurrentDate();
    displayCurrentYear();
    displayLastModified();
});

// Close nav menu when a link is clicked or when clicking outside the menu
document.addEventListener('click', (e) => {
    const isNavOpen = primaryNav.classList.contains('open');
    const isMenuButton = e.target.closest('#hamburger-btn');
    const isInsideMenu = e.target.closest('#primary-nav');
    
    if (isNavOpen && !isMenuButton && !isInsideMenu) {
        primaryNav.classList.remove('open');
        hamburgerBtn.classList.remove('open');
    }
});

// Close menu when window is resized to desktop size
window.addEventListener('resize', () => {
    if (window.innerWidth >= 640) {
        primaryNav.classList.remove('open');
        hamburgerBtn.classList.remove('open');
    }
});