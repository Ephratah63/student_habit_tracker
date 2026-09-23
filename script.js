function dark_theme() {
  const switchTheme = document.getElementById("switch");
  if (!switchTheme) return; // Exit if the switch element is not found

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    switchTheme.checked = true;
  }

  switchTheme.addEventListener("change", () => {
    if (switchTheme.checked) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  });
}

document.addEventListener("DOMContentLoaded", dark_theme);
