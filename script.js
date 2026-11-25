// Week 5 Day 5 - Recipe Box

// GET elements
const input = document.getElementById("recipe-id");
const button = document.getElementById("get-btn");
const statusText = document.getElementById("status");
const recipeArea = document.getElementById("recipe");

// POST elements
const dishInput = document.getElementById("dish-name");
const postButton = document.getElementById("post-btn");
const postStatus = document.getElementById("post-status");
const savedArea = document.getElementById("saved");


// GET: Find a recipe
async function loadRecipe() {

if (input.value === "") {
statusText.textContent = "Type a number first.";
return;
}

recipeArea.textContent = "";

try {

const url = "https://dummyjson.com/recipes/" + input.value;

statusText.textContent = "Loading...";

const response = await fetch(url);

if (!response.ok) {
statusText.textContent =
"No recipe with that number. Try 1 to 50.";
return;
}

const recipe = await response.json();

statusText.textContent = "";

console.log(recipe);

// Create recipe card
const card = document.createElement("div");
card.className = "card p-3";

// Recipe name
const title = document.createElement("h2");
title.className = "h4";
title.textContent = recipe.name;
card.appendChild(title);

// Cuisine
const cuisine = document.createElement("p");
cuisine.textContent = "Cuisine: " + recipe.cuisine;
card.appendChild(cuisine);

// Preparation time
const prepTime = document.createElement("p");
prepTime.textContent =
"Ready in " + recipe.prepTimeMinutes + " minutes";
card.appendChild(prepTime);

recipeArea.appendChild(card);

// Clear input for next recipe
input.value = "";

} catch (error) {

statusText.textContent =
"Can't reach the recipe server. Check your internet.";

}
}


// GET button
button.addEventListener("click", loadRecipe);

// POST: Add a new dish

async function addDish() {

// Check for an empty input
if (dishInput.value === "") {
postStatus.textContent = "Type a dish name first.";
return;
}

// Clear old message
savedArea.textContent = "";

try {

// Show sending message
postStatus.textContent = "Sending...";

const response = await fetch(
"https://dummyjson.com/recipes/add",
{
method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({
name: dishInput.value
})
}
);

// Check server response
if (!response.ok) {
postStatus.textContent =
"The server didn't add it. Try again.";
return;
}

// Read server response
const newDish = await response.json();

postStatus.textContent = "";

console.log(newDish);

// Create success message
const message = document.createElement("p");

message.className = "alert alert-success";

message.textContent =
"Added " + newDish.name +
" as recipe # " + newDish.id +
" (practice server: not really saved)";

savedArea.appendChild(message);

// Clear input
dishInput.value = "";

} catch (error) {

postStatus.textContent =
"Can't reach the recipe server. Check your internet.";

}
}


// POST button
postButton.addEventListener("click", addDish);


// POST code will go below
