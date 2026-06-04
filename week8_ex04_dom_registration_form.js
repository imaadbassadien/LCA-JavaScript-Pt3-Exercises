// Get form elements
const form = document.getElementById("registrationForm");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const submitBtn = document.getElementById("submitBtn");
const formMessage = document.getElementById("formMessage");

// Error div elements
const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

// Listen for form submit event
form.addEventListener("submit", function (event) {
  // Prevent default form submission (Task 2)
  event.preventDefault();

  // Clear previous error messages
  clearAllErrors();

  // Track if all validations pass
  let isValid = true;

  // Validate Username (Task 3)
  if (username.value.trim() === "") {
    showError(username, usernameError, "Username cannot be empty");
    isValid = false;
  }

  // Validate Email (Task 3)
  if (email.value.trim() === "") {
    showError(email, emailError, "Email cannot be empty");
    isValid = false;
  } else if (!email.value.includes("@")) {
    showError(email, emailError, "Email must contain @ symbol");
    isValid = false;
  }

  // Validate Password (Task 3)
  if (password.value.trim() === "") {
    showError(password, passwordError, "Password cannot be empty");
    isValid = false;
  } else if (password.value.length < 6) {
    showError(
      password,
      passwordError,
      "Password must be at least 6 characters long",
    );
    isValid = false;
  }

  // Validate Confirm Password (Task 3)
  if (confirmPassword.value.trim() === "") {
    showError(
      confirmPassword,
      confirmPasswordError,
      "Confirm Password cannot be empty",
    );
    isValid = false;
  } else if (confirmPassword.value !== password.value) {
    showError(confirmPassword, confirmPasswordError, "Passwords do not match");
    isValid = false;
  }

  // If all validations pass (Task 4)
  if (isValid) {
    // Clear all errors and reset borders
    clearAllErrors();

    // Display success message
    formMessage.textContent = "Registration successful!";
    formMessage.className = "success";

    // Log form data to console
    console.log("Registration successful!");
    console.log("Username:", username.value);
    console.log("Email:", email.value);
  }
});

// Function to show error (Task 4)
function showError(inputElement, errorElement, message) {
  errorElement.textContent = message;
  inputElement.classList.add("error");
  inputElement.classList.remove("success");
}

// Function to clear all errors (Task 3 & 4)
function clearAllErrors() {
  // Clear error messages
  usernameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";

  // Reset border colors
  username.classList.remove("error");
  username.classList.remove("success");
  email.classList.remove("error");
  email.classList.remove("success");
  password.classList.remove("error");
  password.classList.remove("success");
  confirmPassword.classList.remove("error");
  confirmPassword.classList.remove("success");

  // Hide form message
  formMessage.className = "";
  formMessage.textContent = "";
}
