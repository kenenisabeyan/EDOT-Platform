// Hamburger toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Hero Button Click
const heroButton = document.querySelector(".hero button");

heroButton.addEventListener("click", () => {
  alert("Welcome to EDOT Platform! Start exploring our courses.");
});

// Smooth scroll for hero button
heroButton.addEventListener("click", () => {
  document.getElementById("courses").scrollIntoView({ behavior: "smooth" });
});

// Contact form validation
const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields!");
      return;
    }

    alert("Thank you for contacting EDOT! We will reply soon.");
    form.reset();
  });
}
