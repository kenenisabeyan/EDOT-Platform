/* ===============================
   EDOT AUTH VALIDATION SCRIPT
=============================== */

document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll(".auth-form");

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const inputs = form.querySelectorAll("input");
      let isValid = true;

      inputs.forEach((input) => {
        if (input.value.trim() === "") {
          showError(input, "This field is required");
          isValid = false;
        } else {
          clearError(input);
        }

        if (input.type === "email" && input.value) {
          if (!validateEmail(input.value)) {
            showError(input, "Enter a valid email address");
            isValid = false;
          }
        }

        if (input.type === "password" && input.value.length < 6) {
          showError(input, "Password must be at least 6 characters");
          isValid = false;
        }
      });

      if (isValid) {
        alert("✅ Form submitted successfully!");
        form.reset();
      }
    });
  });
});

/* ========= HELPERS ========= */

function showError(input, message) {
  clearError(input);

  const error = document.createElement("small");
  error.className = "error-text";
  error.textContent = message;

  input.style.borderColor = "#fa5252";
  input.parentElement.appendChild(error);
}

function clearError(input) {
  const error = input.parentElement.querySelector(".error-text");
  if (error) error.remove();
  input.style.borderColor = "#dee2e6";
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}