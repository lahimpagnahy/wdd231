document.addEventListener('DOMContentLoaded', () => {
    // Set timestamp
    const timestampField = document.getElementById('timestamp');
    timestampField.value = new Date().toISOString();

    // Last Modified
    const lastModifiedSpan = document.getElementById('last-modified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }

    // Current Year
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Modal functionality
    const learnMoreButtons = document.querySelectorAll('.learn-more');
    const closeModalButtons = document.querySelectorAll('.close-modal');

    learnMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            modal.showModal();
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('dialog');
            modal.close();
        });
    });

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) value = value.slice(0, 10);
        
        if (value.length > 6) {
            value = `${value.slice(0,3)}-${value.slice(3,6)}-${value.slice(6)}`;
        } else if (value.length > 3) {
            value = `${value.slice(0,3)}-${value.slice(3)}`;
        }
        
        e.target.value = value;
    });

    // Form validation
    const form = document.getElementById('membershipForm');
    form.addEventListener('submit', (e) => {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        });

        if (!isValid) {
            e.preventDefault();
            alert('Please fill out all required fields.');
        }
    });
});