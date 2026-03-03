const user = JSON.parse(localStorage.getItem("edotUser"));

if (!user || !user.loggedIn) {
  window.location.href = "login.html";
}

const progressData = JSON.parse(localStorage.getItem("edotProgress")) || {
  math: 40,
  english: 25,
  programming: 10
};

localStorage.setItem("edotProgress", JSON.stringify(progressData));

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("show");
});

// Active link highlight
document.querySelectorAll(".sidebar a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelector(".sidebar a.active")?.classList.remove("active");
    link.classList.add("active");
  });
});