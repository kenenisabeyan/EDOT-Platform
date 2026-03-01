const form = document.getElementById("contactForm");
const statusText = document.getElementById("formStatus");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name === "" || email === "" || message === "") {
    statusText.style.color = "red";
    statusText.textContent = "Please fill in all fields.";
    return;
  }

  if (!email.includes("@")) {
    statusText.style.color = "red";
    statusText.textContent = "Please enter a valid email.";
    return;
  }

  statusText.style.color = "#38bdf8";
  statusText.textContent = "Message sent successfully!";

  form.reset();
});