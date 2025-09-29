console.log("Hi") // Prints "Hi" in the browser console (helps check if the JS is loading correctly)

// Find the form element on the page by its id "signupForm"
const form = document.getElementById("signupForm"); // Selects the <form> so we can work with it in JS

// If the form exists, run this function when the user submits it
form.addEventListener("submit", function(e) { // Listens for the "submit" event (when user clicks Sign Up)

    e.preventDefault(); // Stops the page from refreshing (default form behavior)

    // --- Get values from the form ---
    const firstName = form.firstName.value.trim(); // Gets the First Name, removes extra spaces
    const lastName = form.lastName.value.trim();   // Gets the Last Name, removes extra spaces
    const email = form.email.value.trim();         // Gets the Email, removes extra spaces
    const password = form.password.value;          // Gets the Password (no .trim for security)
    const confirmPassword = form.confirmPassword.value; // Gets the Confirm Password field

    // --- Check: required fields ---
    if (!firstName || !lastName || !email || !password || !confirmPassword) { 
        alert("Please fill out all fields to complete the sign-up."); // Show warning if any field is empty
        return; // Stop running further code
    }

    // --- Check: email format ---
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Pattern to check if email looks valid
    if (!emailPattern.test(email)) { // Tests the user's email against the pattern
        alert("Please enter a valid email address."); // Show error if email is not valid
        return; // Stop running further code
    }

    // --- Check: password strength ---
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/; 
    // This regex requires: 1 uppercase, 1 lowercase, 1 number, 1 special character, 8+ chars
    if (!passwordPattern.test(password)) { // Test password against rules
        alert("Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character."); 
        return; // Stop running further code
    }

    // --- Check: confirm password matches password ---
    if (password !== confirmPassword) { // Compare password and confirmPassword
        alert("Passwords do not match."); // Show error if they are different
        return; // Stop running further code
    }

    // --- Success case ---
    alert("Sign-up successful!"); // If everything passed, show success message

    const thankYou = document.getElementById("thankYouMessage"); // Get the hidden thank-you message element
    thankYou.style.display = "block"; // Make the thank-you message visible on the page

    form.reset(); // Clears all form input fields so they look empty again
});






