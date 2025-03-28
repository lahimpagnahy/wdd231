document.addEventListener('DOMContentLoaded', () => {
    // Set timestamp
    const timestampField = document.getElementById('timestamp');
    timestampField.value = new Date().toISOString();

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
    const form = document.getElementById('contactForm');
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