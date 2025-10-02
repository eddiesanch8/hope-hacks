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
  const signupMessage = document.getElementById("signupMessage"); // Get the hidden thank-you message element
  if (res.ok) {
    signupMessage.classList.toggle("show");
    signupMessage.innerHTML = "Success!";
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  } else {
    const { error } = await res.json();
    signupMessage.innerHTML = `${error}`;
    signupMessage.classList.toggle("showerror");
    setTimeout(() => {
      signupMessage.classList.toggle("showerror");
      signupMessage.innerHTML = "";
    }, 3000);
  }
  form.reset(); // Clears all form input fields so they look empty again
});

//   if (res.ok) {
//     // can also use classList.add('.success')
//     const signupMessage = document.getElementById("signupMessage"); // Get the hidden thank-you message element
//     // Make the thank-you message visible on the page
//     setTimeout(() => {
//       signupMessage.classList.toggle("show");
//       signupMessage.innerHTML = "";
//       window.location.href = "/login";
//     }, 2000);
//   } else {
//     const signupMessage = document.getElementById("signupMessage"); // Get the hidden thank-you message element
//     const { error } = await res.json();
//     signupMessage.classList.toggle("showerror");
//     signupMessage.innerHTML = `${error}`;
//     setTimeout(() => {
//       signupMessage.classList.toggle("showerror");
//       signupMessage.innerHTML = "";
//     }, 3000);
//   }
