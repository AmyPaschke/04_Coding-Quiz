//variables for the high-score html
let form = document.querySelector("form");
let scoreButton = document.getElementById("score-button");
let clearButton = document.getElementById("clear-button");
let ol = document.getElementById("ol");
let userInitials = document.getElementById("user-initials");
let userScore = document.getElementById("user-score");

//function added to clear local storage
function clearStorage(event) {
    event.preventDefault();
    localStorage.clear();
    window.location.reload();
}

//on click, this will remove all locally stored initials
clearButton.addEventListener("click", clearStorage);

renderHighScore();

//this pulls the initials and score from local storage
function renderHighScore() {
    let highScores = JSON.parse(localStorage.getItem("high-scores"));

    //this will sort the scores in numerical order
    highScores.sort(function(a, b) {
      return b.currentScore - a.currentScore;
    });

    for (let i = 0; i < highScores.length; i++) {
      let createLi = document.createElement("li");
      createLi.textContent = `Initials: ${highScores[i].initials}, Score: ${highScores[i].currentScore}`
      ol.appendChild(createLi);
    }

  }


