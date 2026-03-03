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

document.getElementById("mathProgress").style.width = progressData.math + "%";
document.getElementById("englishProgress").style.width = progressData.english + "%";
document.getElementById("programmingProgress").style.width = progressData.programming + "%";

const toggle = document.getElementById("darkToggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});

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

const notifications = JSON.parse(localStorage.getItem("edotNotifications")) || [
  { text: "Welcome to EDOT!", read: false },
  { text: "New Mathematics lesson added", read: false }
];

const list = document.getElementById("notificationList");

function renderNotifications() {
  list.innerHTML = "";
  notifications.forEach((n, i) => {
    const li = document.createElement("li");
    li.textContent = n.text;
    li.className = n.read ? "" : "unread";
    li.onclick = () => {
      notifications[i].read = true;
      localStorage.setItem("edotNotifications", JSON.stringify(notifications));
      renderNotifications();
    };
    list.appendChild(li);
  });
}

renderNotifications();