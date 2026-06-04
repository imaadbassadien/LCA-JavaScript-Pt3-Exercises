function validateLogin(event) {
  if (event) event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const modal = document.getElementById("modal");

  if (username === "admin" && password === "password123") {
    window.location.href = "index.html";
  } else {
    console.log("Invalid credentials");
    modal.style.display = "block";
  }
}

function dismissModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

function toggleNav() {
  const sidebar = document.getElementById("sidebar");
  const navOptions = document.getElementById("nav-options");

  if (sidebar.classList.contains("open")) {
    sidebar.classList.remove("open");
    navOptions.style.display = "none";
    sidebar.style.width = "60px";
  } else {
    sidebar.classList.add("open");
    navOptions.style.display = "block";
    sidebar.style.width = "250px";
  }
}
