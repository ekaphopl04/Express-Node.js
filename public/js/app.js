// Frontend JavaScript for API testing and navigation
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // API Testing functionality
    const testBtn = document.getElementById('testBtn');
    const resultDiv = document.getElementById('result');

    testBtn.addEventListener('click', async function() {
        try {
            resultDiv.textContent = 'Loading...';
            
            const response = await fetch('/api/users');
            const data = await response.json();
            
            resultDiv.textContent = JSON.stringify(data, null, 2);
        } catch (error) {
            resultDiv.textContent = `Error: ${error.message}`;
        }
    });

    // Display initial message
    resultDiv.textContent = 'Click the button above to test the API endpoint';
});
