const form = document.getElementById("contactForm");
const statusText = document.getElementById("formStatus");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    statusText.textContent = "Please fill in all fields.";
    statusText.style.color = "red";
    return;
  }

  statusText.textContent = "Message sent successfully ✔";
  statusText.style.color = "green";

  form.reset();
});