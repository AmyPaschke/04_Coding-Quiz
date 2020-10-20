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

//once page loads, load these elements
document.addEventListener('DOMContentLoaded', setupWorld())

//sets question to none and score to 0
function setupWorld() {
  state = {
    currentQuestionIndex: 0,
    currentScore: 0,
  }
}

let count = 75;
//on button click, quiz begins
function startQuiz() {
  state.currentQuestionIndex = 0;

  let timer = setInterval(function() {
  count--;
  document.getElementById("seconds").textContent = count;
  if (count === 0 || state.currentQuestionIndex === 4) //add to the "if" statement or add in somewhere else?
  clearInterval(timer);
  }, 1000);

  startQuizElement.setAttribute("hidden", true);

  timerElement.removeAttribute("hidden");

  displayNextQuestion();
} 

//this will scroll through each question
function displayNextQuestion() {
  let currentQuestion = questions[state.currentQuestionIndex];

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

  let currentQuestion = questions[state.currentQuestionIndex];

  if (submittedAnswerIndex == currentQuestion.answerIndex) {
    awardPoints(10);

    //correctAnswer.removeAttribute("hidden")

  } else {
    //incorrectAnswer.removeAttribute("hidden");
  }

  if (state.currentQuestionIndex >= questions.length - 1) {
    endQuiz();
  } else {
    state.currentQuestionIndex += 1;
    displayNextQuestion();
  }
}

function awardPoints(points) {
  state.currentScore += points;
  scoreElement.textContent = state.currentScore;
}

function endQuiz() {
  questionElement.setAttribute("hidden", true);

  submitScoreElement.removeAttribute("hidden");
}

//variables for the high-score html
let form = document.querySelector("form");
let scoreButton = document.getElementById("score-button");
let clearButton = document.getElementById("clear-button");
let ul = document.querySelector("ul");
let input = document.querySelector("item");

//array will be filled with JSON strings/arrays after we parse through local storage
let itemsArray;
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

  let inputValue = document.getElementById("item").value;
  liMaker(inputValue);

  itemsArray.push(inputValue);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  
  data.forEach((item) => {
    liMaker(item); 
  })
})

function clearStorage() {
  localStorage.clear();
}

//this will remove all locally stored initials
//clearButton.addEventListener("click", clearStorage())

