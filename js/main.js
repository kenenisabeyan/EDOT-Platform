"use strict";

/* =========================
   LOGIN FORM
========================= */
const loginForm = document.querySelector("#login-form");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.querySelector("#login-email").value.trim();
    const password = document.querySelector("#login-password").value.trim();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      alert("Invalid email address");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    alert("Login successful (demo)");
    this.reset();
  });
}

/* =========================
   REGISTER FORM
========================= */
const registerForm = document.querySelector("#register-form");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.querySelector("#register-name").value.trim();
    const email = document.querySelector("#register-email").value.trim();
    const password = document.querySelector("#register-password").value.trim();

    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    if (!email.includes("@")) {
      alert("Invalid email address");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    alert("Account created successfully (demo)");
    this.reset();
  });
}
