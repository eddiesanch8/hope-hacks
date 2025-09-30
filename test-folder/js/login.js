const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  //   creating a new object from our form inputs
  const formData = new FormData(e.target);
  //   turning our form object into js object that can be read
  const data = Object.fromEntries(formData.entries());

  //   sending the js object as JSON
  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (res.ok) {
    // stores JWT token and redirects user to the get: /dashboard route
    localStorage.setItem("access_token", result.access_token);
    window.location.href = "/dashboard";
  } else {
    alert(result.error);
  }
});
