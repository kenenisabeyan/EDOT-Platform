const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    status.style.color = "red";
    status.textContent = "Please fill in all fields.";
    return;
  }

  if (!email.includes("@")) {
    status.style.color = "red";
    status.textContent = "Enter a valid email address.";
    return;
  }

  status.style.color = "#38bdf8";
  status.textContent = "Message sent successfully!";

  form.reset();
});