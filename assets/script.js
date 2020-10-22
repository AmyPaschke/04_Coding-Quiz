//questions for quiz
let questions = [
  { text: "Which of these is not a built-in method?", possibleAnswers: ["toUpperCase()", "length()", "indexOf()", "firstName()"], answerIndex: 3 },
  { text: "What is the style term in JavaScript for when we capitalize the second word in a phrase?", possibleAnswers: ["uppy downy", "camelCase", "capital case", "method writing"], answerIndex: 1 },
  { text: "What do we put inside an <a> tag to link to an outside source?", possibleAnswers: ["href:", "separate:", "at:", "remove:"], answerIndex: 0 },
  { text: "What does the 'P' in 'API' stand for?", possibleAnswers: ["position", "possible", "perpetual", "programming"], answerIndex: 3 },
];

//page elements
let scoreElement = document.getElementById("score");
let startQuizElement = document.getElementById("start-quiz");
let questionElement = document.getElementById("question")
let questionTextElement = document.getElementById("question-text")
let answersElement = document.getElementById("answers");
let submitScoreElement = document.getElementById("submit-score");
let timerElement = document.getElementById("countdown");
let secondsElement = document.getElementById("seconds");
let correctAnswer = document.getElementById("correct-answer");
let incorrectAnswer = document.getElementById("incorrect-answer");

//sets question to none and score to 0
let currentQuestionIndex = 0;
let currentScore = 0;

//the starting amount of seconds
let count = 75;

let timer;
//on button click, quiz begins
function startQuiz() {
  currentQuestionIndex = 0;

  timer = setInterval(function() {
  count--;
  secondsElement.textContent = count;
  if (count <= 0 || currentQuestionIndex === 4) //add to the "if" statement or add in somewhere else?
    endQuiz();
  }, 1000);

  startQuizElement.setAttribute("hidden", true);

  timerElement.removeAttribute("hidden");

  displayNextQuestion();
} 

//this will scroll through each question
function displayNextQuestion() {
  let currentQuestion = questions[currentQuestionIndex];

  questionTextElement.textContent = currentQuestion.text;

  answersElement.innerHTML = "";

  for (i = 0; i < currentQuestion.possibleAnswers.length; i++) {
    let possibleAnswerButton = document.createElement("button");
    possibleAnswerButton.textContent = currentQuestion.possibleAnswers[i];
    possibleAnswerButton.setAttribute("data-index", i);
    possibleAnswerButton.onclick = submitAnswer;
    answersElement.appendChild(possibleAnswerButton);
  }

  questionElement.removeAttribute("hidden");
}

function submitAnswer(event) {
  let submittedAnswerIndex = event.target.dataset.index;

  let currentQuestion = questions[currentQuestionIndex];

  if (submittedAnswerIndex == currentQuestion.answerIndex) {
    awardPoints(10);

    //correctAnswer.removeAttribute("hidden")

  } else {

    count -= 15;
    //incorrectAnswer.removeAttribute("hidden");
  }

  if (currentQuestionIndex >= questions.length - 1) {
    endQuiz();
  } else {
    currentQuestionIndex += 1;
    displayNextQuestion();
  }
}

function awardPoints(points) {
  currentScore += points;
  scoreElement.textContent = currentScore;
}

function endQuiz() {
  questionElement.setAttribute("hidden", true);

  submitScoreElement.removeAttribute("hidden");

  clearInterval(timer);

  count = 0;

  secondsElement.textContent = count;
}

//variables for the high-score html
let scoreButton = document.getElementById("score-button");
let clearButton = document.getElementById("clear-button");
let ol = document.getElementById("ol");
let msgDiv = document.getElementById("msg");
let input = document.getElementById("input");

function displayMessage(type, message) {
  msgDiv.textContent = message;
  msgDiv.setAttribute("class", type);
}

let highScoresArray = [JSON.parse(localStorage.getItem("high-scores"));]

scoreButton.addEventListener("click", function(event) {
  event.preventDefault();

  let initials = document.getElementById("input").value;

  if (initials === "") {
    displayMessage("error", "Initials field cannot be blank.");
    return;
  } else {
    displayMessage("success", "Added initials + score to high scores list.");

    let currentHighScore = {
      initials: initials, 
      currentScore: currentScore,
    }

    highScoresArray.push(currentHighScore);

    localStorage.setItem("high-scores", JSON.stringify(highScoresArray));
  }
})


//array will be filled with JSON strings/arrays after we parse through local storage
/* let itemsArray;
if (localStorage.getItem("items")) {
  itemsArray = JSON.parse(localStorage.getItem("items"));
} else {
  itemsArray = [];
} //this part is not working like intended

localStorage.setItem("items", JSON.stringify(itemsArray));
let data = JSON.parse(localStorage.getItem("items"));

//adds their name to the high score list
let liMaker = function(text) {
  let li = document.createElement("li");
  li.textContent = text;
  ul.appendChild(li);
}

//this will add the initials (the list items) to the page after the user presses submit
scoreButton.addEventListener("click", function(event) {
  event.preventDefault();

  itemsArray.push(input.value);
  localStorage.setItem("items", JSON.stringify(itemsArray));

  liMaker(input.value);
  
  data.forEach((item) => {
    liMaker(item); 
  })
})

function clearStorage() {
  localStorage.clear();
}

//this will remove all locally stored initials
//clearButton.addEventListener("click", clearStorage()) */

