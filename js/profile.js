const profile = JSON.parse(localStorage.getItem("edotProfile")) || {};

username.value = profile.name || "";
bio.value = profile.bio || "";

profileForm.onsubmit = e => {
  e.preventDefault();
  localStorage.setItem("edotProfile", JSON.stringify({
    name: username.value,
    bio: bio.value
  }));
  alert("Profile saved");
};