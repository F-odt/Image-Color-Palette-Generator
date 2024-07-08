// Wait until the DOM is fully loaded before executing the code
document.addEventListener('DOMContentLoaded', () => {
    // Log to the console that the DOM is fully loaded
    console.log('DOM fully loaded and parsed');
    
    // Get references to HTML elements
    const imageInput = document.getElementById('imageInput');
    const processButton = document.getElementById('processButton');
    const feedback = document.getElementById('feedback');
    const colorGrid = document.getElementById('colorGrid');

    // Add an event listener to the process button for the 'click' event
    processButton.addEventListener('click', async () => {
        // Log to the console that the process button was clicked
        console.log('Process button clicked');

        // Get the first file from the file input element
        const file = imageInput.files[0];
        
        // Check if no file was selected
        if (!file) {
            // Log to the console that no file was selected
            console.log('No file selected');
            
            // Display a feedback message to the user
            feedback.textContent = 'Please select an image file.';
            return;
        }

        // Check if the selected file is not an image
        if (!file.type.startsWith('image/')) {
            // Log the invalid file type to the console
            console.log('Invalid file type:', file.type);
            
            // Display a feedback message to the user
            feedback.textContent = 'Please upload a valid image file.';
            return;
        }

        // Create a new FormData object to hold the file data
        const formData = new FormData();
        formData.append('image', file);

        try {
            // Log to the console that a request is being sent to the server
            console.log('Sending request to server');
            
            // Display a feedback message to the user
            feedback.textContent = 'Processing image...';

            // Send a POST request to the server with the form data
            const response = await fetch('/extract-colors', {
                method: 'POST',
                body: formData
            });

            // Log to the console that a response was received from the server
            console.log('Received response from server');

            // Check if the response is not ok (status code is not in the range 200-299)
            if (!response.ok) {
                // Parse the error data from the response
                const errorData = await response.json();
                // Throw an error with the error message or a generic server error message
                throw new Error(errorData.error || 'Server error');
            }

            // Parse the colors data from the response
            const colors = await response.json();
            // Log the extracted colors to the console
            console.log('Extracted colors:', colors);

            // Display the extracted colors on the page
            displayColors(colors);
            
            // Display a feedback message to the user
            feedback.textContent = 'Colors extracted successfully!';
        } catch (error) {
            // Log the error to the console
            console.error('Error:', error);

            // Display an error message to the user
            feedback.textContent = `An error occurred: ${error.message}`;
        }
    });

    // Function to display the extracted colors on the page
    function displayColors(colors) {
        // Log to the console that colors are being displayed
        console.log('Displaying colors');
        
        // Clear any existing content in the color grid
        colorGrid.innerHTML = '';

        // Iterate over the colors array and create elements to display each color
        colors.forEach(color => {
            // Create a div element for the color swatch
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch';

            // Create a div element for the color box
            const colorBox = document.createElement('div');
            colorBox.className = 'color-box';
            colorBox.style.backgroundColor = `rgb(${color.rgb.join(',')})`;

            // Create a div element for the color info
            const colorInfo = document.createElement('div');
            colorInfo.className = 'color-info';
            colorInfo.innerHTML = `
                <p>HEX: ${color.hex}</p>
                <p>RGB: ${color.rgb.join(', ')}</p>
            `;

            // Append the color box and color info to the swatch
            swatch.appendChild(colorBox);
            swatch.appendChild(colorInfo);
            
            // Append the swatch to the color grid
            colorGrid.appendChild(swatch);
        });
    }
});
