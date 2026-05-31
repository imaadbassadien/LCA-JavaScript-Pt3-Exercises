// Task 3: Make the Button Work
const generateButton = document.getElementById("generateButton");
const resetButton = document.getElementById("resetButton");
const spellArea = document.getElementById("spellArea");
const ingredientsList = document.getElementById("ingredientsList");

function generateSpell() {
  // Task 5: Countdown to Magic
  let count = 3;
  spellArea.textContent = count;

  const countdownInterval = setInterval(() => {
    count--;

    if (count > 0) {
      spellArea.textContent = count;
    } else {
      clearInterval(countdownInterval);

      // Randomly select an ingredient from the ingredientsList
      const ingredients = ingredientsList.querySelectorAll("li");
      const randomIndex = Math.floor(Math.random() * ingredients.length);
      const selectedIngredient = ingredients[randomIndex].textContent;

      // Display the spell in the spellArea
      spellArea.textContent = "✨ " + selectedIngredient + " ✨";

      // Task 4: Add Some Colorful Magic
      // Generate a random color
      const randomColor =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
      spellArea.style.backgroundColor = randomColor;
    }
  }, 1000);
}

// Add click event listener to the Generate Spell button
generateButton.addEventListener("click", generateSpell);

// Task 6: Reset Button functionality
resetButton.addEventListener("click", () => {
  spellArea.textContent = "";
  spellArea.style.backgroundColor = "#f0f0f0"; // Reset to default background color
});
