/* ============================================
   TechConnect Developer Community Hub
   Vanilla JavaScript - Works with Your JSON
   ============================================ */

// ========================================
// GLOBAL STATE
// ========================================
let developers = [];
let filteredDevelopers = [];
let isCardView = true;
let nextId = 16;

// ========================================
// DOM ELEMENTS
// ========================================
const cardView = document.getElementById("cardView");
const tableView = document.getElementById("tableView");
const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("searchInput");
const viewToggle = document.getElementById("viewToggle");
const toggleIcon = document.getElementById("toggleIcon");
const toggleText = document.getElementById("toggleText");
const developerCount = document.getElementById("developerCount");
const addDeveloperForm = document.getElementById("addDeveloperForm");

// Form inputs
const devName = document.getElementById("devName");
const devRole = document.getElementById("devRole");
const devSkills = document.getElementById("devSkills");
const devLocation = document.getElementById("devLocation");
const devAvatar = document.getElementById("devAvatar");
const devAvailable = document.getElementById("devAvailable");

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  loadDevelopers();
  setupEventListeners();
});

// ========================================
// LOAD DEVELOPERS FROM JSON
// ========================================
async function loadDevelopers() {
  try {
    const response = await fetch("developers.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    developers = await response.json();
    filteredDevelopers = [...developers];

    // Set nextId for new developers
    nextId = Math.max(...developers.map((d) => d.id)) + 1;

    renderDirectory();
  } catch (error) {
    console.error("Error loading developers.json:", error);

    // Fallback: Use embedded data if file fetch fails
    developers = getEmbeddedDevelopers();
    filteredDevelopers = [...developers];
    nextId = Math.max(...developers.map((d) => d.id)) + 1;
    renderDirectory();

    showAlert(
      "Warning: Could not load developers.json. Using embedded data.",
      "warning",
    );
  }
}

// Embedded developers data (fallback - YOUR JSON)
function getEmbeddedDevelopers() {
  return [
    {
      id: 1,
      name: "Amahle Dlamini",
      role: "Frontend Developer",
      skills: ["HTML", "CSS", "JavaScript", "React", "Figma"],
      avatar: "https://placehold.co/100x100/4F81BD/ffffff",
      availableForHire: true,
      location: "Cape Town",
    },
    {
      id: 2,
      name: "Sipho Nkosi",
      role: "Backend Developer",
      skills: ["Node.js", "Express", "MongoDB", "SQL"],
      avatar: "https://placehold.co/100x100/9BBB59/ffffff",
      availableForHire: false,
      location: "Johannesburg",
    },
    {
      id: 3,
      name: "Lerato Mokoena",
      role: "Full Stack Developer",
      skills: ["React", "Node.js", "PostgreSQL", "Docker", "Git"],
      avatar: "https://placehold.co/100x100/C0504D/ffffff",
      availableForHire: true,
      location: "Pretoria",
    },
    {
      id: 4,
      name: "Thabo Sithole",
      role: "UI/UX Designer",
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
      avatar: "https://placehold.co/100x100/F79646/ffffff",
      availableForHire: false,
      location: "Durban",
    },
    {
      id: 5,
      name: "Nomvula Zulu",
      role: "DevOps Engineer",
      skills: ["Docker", "Kubernetes", "CI/CD", "AWS", "Linux"],
      avatar: "https://placehold.co/100x100/8064A2/ffffff",
      availableForHire: true,
      location: "Cape Town",
    },
    {
      id: 6,
      name: "Kagiso Motsepe",
      role: "Frontend Developer",
      skills: ["Vue.js", "CSS", "TypeScript", "Tailwind CSS"],
      avatar: "https://placehold.co/100x100/17375E/ffffff",
      availableForHire: true,
      location: "Johannesburg",
    },
    {
      id: 7,
      name: "Zanele Mthembu",
      role: "Backend Developer",
      skills: ["Python", "Django", "REST APIs", "MySQL", "Redis"],
      avatar: "https://placehold.co/100x100/538135/ffffff",
      availableForHire: false,
      location: "Port Elizabeth",
    },
    {
      id: 8,
      name: "Bongani Cele",
      role: "Full Stack Developer",
      skills: ["Angular", "Java", "Spring Boot", "MongoDB"],
      avatar: "https://placehold.co/100x100/833C00/ffffff",
      availableForHire: true,
      location: "Durban",
    },
    {
      id: 9,
      name: "Precious Khumalo",
      role: "UI/UX Designer",
      skills: ["Sketch", "Figma", "Wireframing", "Accessibility", "CSS"],
      avatar: "https://placehold.co/100x100/31849B/ffffff",
      availableForHire: false,
      location: "Pretoria",
    },
    {
      id: 10,
      name: "Mandla Ntuli",
      role: "DevOps Engineer",
      skills: ["Terraform", "Azure", "Bash", "Ansible"],
      avatar: "https://placehold.co/100x100/7F7F7F/ffffff",
      availableForHire: true,
      location: "Cape Town",
    },
    {
      id: 11,
      name: "Ayanda Mkhize",
      role: "Frontend Developer",
      skills: ["React", "Redux", "JavaScript", "SASS"],
      avatar: "https://placehold.co/100x100/1F3864/ffffff",
      availableForHire: false,
      location: "Bloemfontein",
    },
    {
      id: 12,
      name: "Thandeka Ndlovu",
      role: "Backend Developer",
      skills: ["Go", "gRPC", "PostgreSQL", "Docker", "Kafka"],
      avatar: "https://placehold.co/100x100/375623/ffffff",
      availableForHire: true,
      location: "Johannesburg",
    },
    {
      id: 13,
      name: "Lwazi Hadebe",
      role: "Full Stack Developer",
      skills: ["Next.js", "GraphQL", "Prisma", "TypeScript", "Vercel"],
      avatar: "https://placehold.co/100x100/632523/ffffff",
      availableForHire: true,
      location: "Cape Town",
    },
    {
      id: 14,
      name: "Nandi Shabalala",
      role: "UI/UX Designer",
      skills: ["User Testing", "Figma", "InVision", "Design Systems"],
      avatar: "https://placehold.co/100x100/984807/ffffff",
      availableForHire: false,
      location: "Durban",
    },
    {
      id: 15,
      name: "Sibusiso Mahlangu",
      role: "DevOps Engineer",
      skills: ["Jenkins", "GitHub Actions", "GCP", "Prometheus", "Grafana"],
      avatar: "https://placehold.co/100x100/3F3151/ffffff",
      availableForHire: true,
      location: "Pretoria",
    },
  ];
}

// ========================================
// EVENT LISTENER SETUP
// ========================================
function setupEventListeners() {
  // Live search with event listener
  searchInput.addEventListener("input", handleSearch);

  // View toggle button
  viewToggle.addEventListener("click", toggleView);

  // Form submission with validation
  addDeveloperForm.addEventListener("submit", handleAddDeveloper);

  // Real-time validation on input
  devName.addEventListener("blur", validateName);
  devRole.addEventListener("blur", validateRole);
  devSkills.addEventListener("blur", validateSkills);
  devLocation.addEventListener("blur", validateLocation);
}

// ========================================
// LIVE SEARCH FILTERING
// ========================================
function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase().trim();

  if (searchTerm === "") {
    filteredDevelopers = [...developers];
  } else {
    filteredDevelopers = developers.filter((developer) => {
      const nameMatches = developer.name.toLowerCase().includes(searchTerm);
      const roleMatches = developer.role.toLowerCase().includes(searchTerm);
      // Search through skills array instead of single skill string
      const skillsMatches = developer.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm),
      );
      const locationMatches = developer.location
        .toLowerCase()
        .includes(searchTerm);
      return nameMatches || roleMatches || skillsMatches || locationMatches;
    });
  }

  renderDirectory();
}

// ========================================
// RENDER DIRECTORY (CARD OR TABLE)
// ========================================
function renderDirectory() {
  updateDeveloperCount();

  if (isCardView) {
    renderCardView();
  } else {
    renderTableView();
  }
}

// ========================================
// CARD VIEW RENDERING
// ========================================
function renderCardView() {
  cardView.innerHTML = "";

  if (filteredDevelopers.length === 0) {
    cardView.innerHTML = `
            <div class="col-12">
                <div class="empty-state">
                    <div class="icon">🔍</div>
                    <h4 class="text-muted">No developers found</h4>
                    <p class="text-muted">Try adjusting your search criteria</p>
                </div>
            </div>
        `;
    return;
  }

  filteredDevelopers.forEach((developer) => {
    const card = createDeveloperCard(developer);
    cardView.appendChild(card);
  });
}

function createDeveloperCard(developer) {
  const card = document.createElement("div");
  card.className = "col-md-6 col-lg-4";

  // Display skills array
  const primarySkill = developer.skills[0] || "Various";
  const allSkills = developer.skills.join(", ");

  card.innerHTML = `
        <div class="card developer-card" data-id="${developer.id}">
            ${
              developer.avatar
                ? `
            <div class="text-center mt-3">
                <img src="${developer.avatar}" alt="${developer.name}" class="rounded-circle" style="width: 100px; height: 100px; object-fit: cover;">
            </div>
            `
                : ""
            }
            <div class="card-header">
                <h3 class="card-title">${escapeHtml(developer.name)}</h3>
            </div>
            <div class="card-body">
                <div class="card-info">
                    <span>💼</span>
                    <strong>${escapeHtml(developer.role)}</strong>
                </div>
                <div class="card-info">
                    <span>📍</span>
                    <span>${escapeHtml(developer.location)}</span>
                </div>
                <div class="mt-2">
                    <small class="text-muted">Skills:</small>
                    <div class="mt-1">
                        ${developer.skills
                          .map(
                            (skill) =>
                              `<span class="badge bg-primary me-1 mb-1">${escapeHtml(skill)}</span>`,
                          )
                          .join("")}
                    </div>
                </div>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
                <button 
                    class="btn ${developer.availableForHire ? "badge-available badge-toggle-btn" : "badge-not-available badge-toggle-btn"}"
                    data-id="${developer.id}"
                    data-action="toggle-available"
                >
                    ${developer.availableForHire ? "✓ Available for Hire" : "✗ Not Available"}
                </button>
            </div>
        </div>
    `;

  card.classList.add("new-card");
  return card;
}

// ========================================
// TABLE VIEW RENDERING
// ========================================
function renderTableView() {
  tableBody.innerHTML = "";

  if (filteredDevelopers.length === 0) {
    tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-4">
                    <div class="empty-state">
                        <div class="icon">🔍</div>
                        <h4 class="text-muted">No developers found</h4>
                        <p class="text-muted">Try adjusting your search criteria</p>
                    </div>
                </td>
            </tr>
        `;
    return;
  }

  filteredDevelopers.forEach((developer) => {
    const row = createDeveloperRow(developer);
    tableBody.appendChild(row);
  });
}

function createDeveloperRow(developer) {
  const row = document.createElement("tr");
  row.dataset.id = developer.id;

  const allSkills = developer.skills.join(", ");

  row.innerHTML = `
        <td>
            ${developer.avatar ? `<img src="${developer.avatar}" alt="" class="rounded-circle me-2" style="width: 40px; height: 40px; object-fit: cover;">` : ""}
            <strong>${escapeHtml(developer.name)}</strong>
        </td>
        <td>${escapeHtml(developer.role)}</td>
        <td><small>${escapeHtml(allSkills)}</small></td>
        <td>${escapeHtml(developer.location)}</td>
        <td>
            <span class="badge ${developer.availableForHire ? "badge-available" : "badge-not-available"}">
                ${developer.availableForHire ? "✓ Available" : "✗ Not Available"}
            </span>
        </td>
        <td>
            <button 
                class="btn ${developer.availableForHire ? "btn-success" : "btn-secondary"} table-action-btn"
                data-id="${developer.id}"
                data-action="toggle-available"
            >
                Toggle
            </button>
        </td>
    `;

  return row;
}

// ========================================
// VIEW TOGGLE FUNCTION
// ========================================
function toggleView() {
  isCardView = !isCardView;

  if (isCardView) {
    cardView.classList.remove("d-none");
    tableView.classList.add("d-none");
    toggleIcon.textContent = "💳";
    toggleText.textContent = "Card View";
    viewToggle.classList.add("btn-outline-primary");
    viewToggle.classList.remove("btn-outline-dark");
  } else {
    cardView.classList.add("d-none");
    tableView.classList.remove("d-none");
    toggleIcon.textContent = "📋";
    toggleText.textContent = "Table View";
    viewToggle.classList.remove("btn-outline-primary");
    viewToggle.classList.add("btn-outline-dark");
  }
}

// ========================================
// AVAILABLE FOR HIRE BADGE TOGGLE
// ========================================
document.addEventListener("click", (event) => {
  const toggleBtn = event.target.closest('[data-action="toggle-available"]');

  if (toggleBtn) {
    const developerId = parseInt(toggleBtn.dataset.id);
    toggleAvailableStatus(developerId);
  }
});

function toggleAvailableStatus(id) {
  const developer = developers.find((d) => d.id === id);

  if (developer) {
    // Toggle availableForHire status (new property name from your JSON)
    developer.availableForHire = !developer.availableForHire;

    // Re-render to show updated badge
    renderDirectory();
  }
}

// ========================================
// LIVE DEVELOPER COUNT
// ========================================
function updateDeveloperCount() {
  developerCount.textContent = filteredDevelopers.length;
}

// ========================================
// ADD DEVELOPER FORM WITH VALIDATION
// ========================================
function handleAddDeveloper(event) {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  // Convert comma-separated skills to array
  const skillsArray = devSkills.value
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const newDeveloper = {
    id: nextId,
    name: devName.value.trim(),
    role: devRole.value.trim(),
    skills: skillsArray,
    location: devLocation.value.trim(),
    avatar: devAvatar.value.trim() || null,
    availableForHire: devAvailable.checked,
  };

  // Append to developers array (without reloading page)
  developers.push(newDeveloper);
  filteredDevelopers = [...developers];

  // Update next ID
  nextId++;

  // Re-render directory
  renderDirectory();

  // Reset form
  addDeveloperForm.reset();

  // Clear validation states
  clearValidationStates();

  // Show success message
  showAlert(
    `✅ ${newDeveloper.name} has been added to the directory!`,
    "success",
  );

  // Scroll to directory
  document.querySelector('[aria-label="Developer directory"]').scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

// ========================================
// FORM VALIDATION FUNCTIONS
// ========================================
function validateForm() {
  let isValid = true;

  isValid &= validateName();
  isValid &= validateRole();
  isValid &= validateSkills();
  isValid &= validateLocation();

  return isValid;
}

function validateName() {
  const value = devName.value.trim();

  if (value === "" || value.length < 2) {
    devName.classList.add("invalid");
    devName.classList.remove("valid");
    devName.reportValidity();
    return false;
  }

  devName.classList.remove("invalid");
  devName.classList.add("valid");
  return true;
}

function validateRole() {
  const value = devRole.value.trim();

  if (value === "" || value.length < 2) {
    devRole.classList.add("invalid");
    devRole.classList.remove("valid");
    devRole.reportValidity();
    return false;
  }

  devRole.classList.remove("invalid");
  devRole.classList.add("valid");
  return true;
}

function validateSkills() {
  const value = devSkills.value.trim();

  if (value === "" || value.split(",").filter((s) => s.trim()).length === 0) {
    devSkills.classList.add("invalid");
    devSkills.classList.remove("valid");
    devSkills.reportValidity();
    return false;
  }

  devSkills.classList.remove("invalid");
  devSkills.classList.add("valid");
  return true;
}

function validateLocation() {
  const value = devLocation.value.trim();

  if (value === "" || value.length < 2) {
    devLocation.classList.add("invalid");
    devLocation.classList.remove("valid");
    devLocation.reportValidity();
    return false;
  }

  devLocation.classList.remove("invalid");
  devLocation.classList.add("valid");
  return true;
}

function clearValidationStates() {
  const inputs = addDeveloperForm.querySelectorAll(".form-control");
  inputs.forEach((input) => {
    input.classList.remove("invalid", "valid");
  });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================
function escapeHtml(text) {
  if (!text) return "";
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function showAlert(message, type = "info") {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type} alert-dismissible fade show`;
  alert.role = "alert";
  alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

  const main = document.querySelector("main");
  main.insertBefore(alert, main.firstChild);

  setTimeout(() => {
    if (alert.parentNode) {
      alert.remove();
    }
  }, 5000);
}

// ========================================
// END OF SCRIPT
// ============================================
