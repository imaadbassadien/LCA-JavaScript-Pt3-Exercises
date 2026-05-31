// Task 2: Update Name and Role
const updateNameBtn = document.getElementById("updateNameBtn");
const updateRoleBtn = document.getElementById("updateRoleBtn");
const toggleStatusBtn = document.getElementById("toggleStatusBtn");
const changeImageBtn = document.getElementById("changeImageBtn");

const profileName = document.getElementById("profileName");
const profileRole = document.getElementById("profileRole");
const profileImage = document.getElementById("profileImage");
const profileCard = document.getElementById("profileCard");

// Update Name functionality
updateNameBtn.addEventListener("click", () => {
  const newName = prompt("Enter your new name:");
  if (newName && newName.trim() !== "") {
    profileName.textContent = newName;
  }
});

// Update Role functionality
updateRoleBtn.addEventListener("click", () => {
  const newRole = prompt("Enter your new role:");
  if (newRole && newRole.trim() !== "") {
    profileRole.textContent = newRole;
  }
});

// Task 3: Toggle Active Status
toggleStatusBtn.addEventListener("click", () => {
  profileCard.classList.toggle("active-status");
});

// Task 4: Change Profile Image (Bonus)
changeImageBtn.addEventListener("click", () => {
  const newImageUrl = prompt("Enter the new image URL:");
  if (newImageUrl && newImageUrl.trim() !== "") {
    profileImage.src = newImageUrl;
  }
});
