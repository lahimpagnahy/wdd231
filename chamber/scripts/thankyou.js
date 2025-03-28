document.addEventListener('DOMContentLoaded', () => {
    // Retrieve form data from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Function to safely get and decode URL parameter
    const getParam = (param) => {
        const value = urlParams.get(param);
        return value ? decodeURIComponent(value) : 'Not Provided';
    };

    // Map membership levels to more readable format
    const membershipLevels = {
        'np': 'Non-Profit (No Fee)',
        'bronze': 'Bronze Membership',
        'silver': 'Silver Membership',
        'gold': 'Gold Membership'
    };

    // Populate confirmation details
    document.getElementById('confirmFirstName').textContent = getParam('firstName');
    document.getElementById('confirmLastName').textContent = getParam('lastName');
    document.getElementById('confirmEmail').textContent = getParam('email');
    document.getElementById('confirmPhone').textContent = getParam('phone');
    document.getElementById('confirmOrganization').textContent = getParam('organization');
    
    // Convert membership level code to readable text
    const membershipLevel = getParam('membershipLevel');
    document.getElementById('confirmMembershipLevel').textContent = 
        membershipLevels[membershipLevel] || membershipLevel;

    // Format and display timestamp
    const timestamp = getParam('timestamp');
    try {
        const date = new Date(timestamp);
        document.getElementById('confirmTimestamp').textContent = 
            date.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
            });
    } catch (error) {
        document.getElementById('confirmTimestamp').textContent = 'Not Available';
    }

    // Set current year
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Set last modified
    const lastModifiedSpan = document.getElementById('last-modified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
});