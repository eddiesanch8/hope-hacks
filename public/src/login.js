console.log("Login JS Loaded"); // Check if JS is connected

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  //   creating a new object from our form inputs
  const formData = new FormData(e.target);
  //   turning our form object into js object that can be read
  const data = Object.fromEntries(formData.entries());

  const { email, password } = data;

  // --- Empty field check ---
  if (!email || !password) {
    loginMessage.textContent = "Please fill out both fields.";
    return;
  }

  //   sending the js object as JSON
  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (res.ok) {
    loginMessage.innerHTML = "Login successful! Welcome back!";
    // stores JWT token and redirects user to the get: /dashboard route
    localStorage.setItem("access_token", result.access_token);
    console.log(loginMessage);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 2000);
  } else {
    alert(result.error);
  }
});
