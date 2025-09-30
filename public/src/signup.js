console.log("Hi"); // Prints "Hi" in the browser console (helps check if the JS is loading correctly)

// Find the form element on the page by its id "signupForm"
const form = document.getElementById("signupForm"); // Selects the <form> so we can work with it in JS

// If the form exists, run this function when the user submits it
form.addEventListener("submit", async function (e) {
  // Listens for the "submit" event (when user clicks Sign Up)
  e.preventDefault();

  //   creates a new instance of FormData object from our form
  const formData = new FormData(e.target);
  //formData.entries seperates our forms info into an array of key/value pairs
  //   then object.fromEntries converts them into a javascript object that can be sent out for our post request
  const data = Object.fromEntries(formData.entries());

  // ----- FRONTEND VALIDATION -----
  //   we then deconstruct object into its field names
  const { first_name, last_name, email, password, confirm_password } = data;
  // Check all fields are filled
  if (!first_name || !last_name || !email || !password || !confirm_password) {
    alert("Please fill in all fields.");
    return;
  }
  //   // --- Get values from the form ---
  //   const firstName = form.firstName.value.trim(); // Gets the First Name, removes extra spaces
  //   const lastName = form.lastName.value.trim(); // Gets the Last Name, removes extra spaces
  //   const email = form.email.value.trim(); // Gets the Email, removes extra spaces
  //   const password = form.password.value; // Gets the Password (no .trim for security)
  //   const confirmPassword = form.confirmPassword.value; // Gets the Confirm Password field

  // --- Check: email format ---
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Pattern to check if email looks valid
  if (!emailPattern.test(email)) {
    // Tests the user's email against the pattern
    alert("Please enter a valid email address."); // Show error if email is not valid
    return; // Stop running further code
  }

  // --- Check: password strength ---
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  // This regex requires: 1 uppercase, 1 lowercase, 1 number, 1 special character, 8+ chars
  if (!passwordPattern.test(password)) {
    // Test password against rules
    alert(
      "Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character."
    );
    return; // Stop running further code
  }

  // --- Check: confirm password matches password ---
  if (password !== confirm_password) {
    // Compare password and confirmPassword
    alert("Passwords do not match."); // Show error if they are different
    return; // Stop running further code
  }

  const res = await fetch("/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    // can also use classList.add('.success')
    const thankYou = document.getElementById("thankYouMessage"); // Get the hidden thank-you message element
    thankYou.style.display = "block"; // Make the thank-you message visible on the page
    setTimeout(() => {
      window.location.href = "/login";
      thankYou.style.display = "none";
    }, 2000);
  } else {
    const { error } = await res.json();
    alert(error);
  }
  form.reset(); // Clears all form input fields so they look empty again
});
