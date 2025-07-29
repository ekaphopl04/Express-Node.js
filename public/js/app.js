// Frontend JavaScript for API testing
document.addEventListener('DOMContentLoaded', function() {
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
