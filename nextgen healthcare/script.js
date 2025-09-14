document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const modeToggle = document.getElementById("modeToggle");

  // Toggle Mobile Menu
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  // Toggle Dark Mode
  modeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      modeToggle.textContent = "☀️ Light Mode";
    } else {
      modeToggle.textContent = "🌙 Dark Mode";
    }
  });
});
