"use strict";

/* =========================
   STICKY NAVBAR
========================= */
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});

/* =========================
   SMOOTH SCROLL
========================= */
const exploreBtn = document.querySelector('a[href="#features"]');

if (exploreBtn) {
  exploreBtn.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector("#features").scrollIntoView({
      behavior: "smooth",
    });
  });
}

/* =========================
   CTA BUTTON FEEDBACK
========================= */
const ctaBtn = document.querySelector(".cta-card .btn");

if (ctaBtn) {
  ctaBtn.addEventListener("mouseenter", () => {
    ctaBtn.style.transform = "scale(1.05)";
  });

  ctaBtn.addEventListener("mouseleave", () => {
    ctaBtn.style.transform = "scale(1)";
  });
}

/* =========================
   CHAT ICON (FUTURE READY)
========================= */
const chatIcon = document.querySelector(".chat-container");

if (chatIcon) {
  chatIcon.addEventListener("click", () => {
    alert("💬 EDOT Support: Chat feature coming soon!");
  });
}

/* =========================
   BUTTON CLICK RIPPLE (UX)
========================= */
const buttons = document.querySelectorAll(".btn");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.add("clicked");
    setTimeout(() => btn.classList.remove("clicked"), 200);
  });
});
