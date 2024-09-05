// JavaScript code
const correctCodes = {
    inputOne: "482759",
    inputTwo: "913264",
    inputThree: "507138",
    inputFour: "624871",
    inputFive: "398405",
    inputSix: "408239"
};

// Function to generate a random six-digit code
function generateRandomCode(inputElement) {
    const code = Math.floor(Math.random() * 1000000).toString().padStart(6, '0'); // Generate random 6-digit number
    inputElement.previousElementSibling.innerText = code;
}

// Function to check if all inputs are correct
function checkAllInputsCorrect() {
    // Check if all inputs are correct
    const allInputsCorrect = Object.keys(correctCodes).every(function(inputId) {
        const inputElement = document.getElementById(inputId);
        const userInput = inputElement.value;
        const correctCode = correctCodes[inputId];
        console.log(`Input ${inputId} - User Input: ${userInput}, Correct Code: ${correctCode}`);
        return userInput === correctCode;
    });

    console.log("All inputs correct:", allInputsCorrect); // Log the result to the console

    if (allInputsCorrect) {
        document.body.style.backgroundImage = "url('me.gif')"; // Change background image
    }
}


// Function to check if the input matches the correct code
function check(inputElement, correctCode, correctDisplay) {
    const userInput = inputElement.value;
    const button = inputElement.nextElementSibling.nextElementSibling.querySelector('button'); // Get the button

    if (userInput === correctCode) {
        clearInterval(inputElement.intervalId); // Stop generating random codes for this input
        inputElement.previousElementSibling.innerText = userInput; // Display the correct code
        inputElement.previousElementSibling.style.color = "rgb(3, 209, 3)"; // Turn the displayed code green
        correctDisplay.style.color = "rgb(3, 209, 3)"; // Change text color to green
        correctDisplay.textContent = "CORRECT";
        checkAllInputsCorrect(); // Check if all inputs are correct
    } else {
        // Display "INCORRECT" in red for a short period
        correctDisplay.textContent = "INCORRECT";
        correctDisplay.style.color = "red";
        setTimeout(() => {
            correctDisplay.textContent = "TRY AGAIN"; // Reset the display
        }, 1500); // Change back after 1.5 seconds
    }
}


// Start cycling the code when the page loads
window.onload = function() {
    // Update the code every second for each input
    document.querySelectorAll('.codes input').forEach(function(inputElement) {
        // Create a closure for inputElement
        (function(element) {
            // Generate a random code initially
            generateRandomCode(element);
            
            // Start generating random codes periodically
            element.intervalId = setInterval(() => generateRandomCode(element), 1000);
            
            // Get the display element for correctness feedback
            const correctDisplay = element.nextElementSibling.nextElementSibling;
            
            // Get the correct code for this input
            const correctCode = correctCodes[element.id];
            
            // Attach a change event listener to check correctness
            element.addEventListener('change', function() {
                check(element, correctCode, correctDisplay);
            });
        })(inputElement); // Pass inputElement to the closure function
    });
};
