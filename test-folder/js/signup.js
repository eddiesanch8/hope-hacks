const signUpForm = document.getElementById("signupForm");

signUpForm.addEventListener("submit", async (e) => {
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

  //   once we validate, we will send our clean data up to the server at the post: /signup endpoint
  const res = await fetch("/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  //waits for a response. if it is successful, we can add a success message with a timeout...
  // make it pretty with css and html, maybe add an effect
  if (res.ok) {
    // can also use classList.add('.success')
    document.getElementById("successMsg").style.display = "flex";
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  } else {
    const { error } = await res.json();
    alert(error);
  }
});
