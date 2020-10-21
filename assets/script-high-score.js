//variables for the high-score html
let form = document.querySelector("form");
let scoreButton = document.getElementById("score-button");
let clearButton = document.getElementById("clear-button");
let ol = document.getElementById("ol");
let input = document.getElementById("item");
let userInitials = document.getElementById("user-initials");
let userScore = document.getElementById("user-score");

renderHighScore();

function renderHighScore() {
    let initials = localStorage.getItem("input");
    let score = localStorage.getItem("score");
  
    if (!initials || !score) {
      return;
    }
  
    userInitials.textContent = initials;
    userScore.textContent = score;
  }

//function added to clear local storage
function clearStorage(event) {
    event.preventDefault();
    localStorage.clear();
}

//on click, this will remove all locally stored initials
clearButton.addEventListener("click", clearStorage);
