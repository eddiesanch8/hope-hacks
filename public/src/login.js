console.log("Login JS Loaded"); // Check if JS is connected

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent page reload

    const email = loginForm.email.value.trim();
    const password = loginForm.password.value;

    // --- Empty field check ---
    if (!email || !password) {
      loginMessage.textContent = "Please fill out both fields.";
      return;
    }

    // --- Email format check ---
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      loginMessage.textContent = "Enter a valid email address.";
      return;
    }

    // --- Password length check ---
    if (password.length < 8) {
      loginMessage.textContent = "Password must be at least 8 characters long.";
      return;
    }

    // --- Password strength check ---
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    // 1 uppercase, 1 lowercase, 1 number, 1 special char, at least 8 chars
    if (!passwordPattern.test(password)) {
      loginMessage.textContent = "Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.";
      return;
    }

    // --- Success case ---
    loginMessage.textContent = "Login successful! Welcome back!";

    loginForm.reset();
  });
}
