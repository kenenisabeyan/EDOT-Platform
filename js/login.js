document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email && password) {
    localStorage.setItem("edotUser", JSON.stringify({
      email: email,
      loggedIn: true
    }));

    window.location.href = "dashboard.html";
  }
});