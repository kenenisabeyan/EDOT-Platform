JSON.parse(localStorage.getItem("edotUser"));

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

function logout() {
  localStorage.removeItem("edotUser");
  window.location.href = "login.html";
}

localStorage.setItem("edotUser", JSON.stringify({
  email: email,
  name: email.split("@")[0], // temporary name
  loggedIn: true,
  loginTime: Date.now()
}));