const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = "Please fill in all fields.";
    formStatus.style.color = "red";
    return;
  }

  // Simulated success
  formStatus.textContent = "Message sent successfully! ✅";
  formStatus.style.color = "green";

  contactForm.reset();
});