// ================== PAGE LOAD ANIMATION ==================
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// ================== CARD SCROLL ANIMATION ==================
const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.2
  }
);

cards.forEach(card => observer.observe(card));

// ================== CARD CLICK FEEDBACK ==================
cards.forEach(card => {
  card.addEventListener("click", () => {
    card.classList.add("clicked");

    setTimeout(() => {
      card.classList.remove("clicked");
    }, 300);
  });
});