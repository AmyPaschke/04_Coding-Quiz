    let questions = [
      { text: "Which of these is not a built-in method?", possibleAnswers: ["toUpperCase()", "length()", "indexOf()", "firstName()"], answerIndex: 3 },
      { text: "What is the style term in JavaScript for when we capitalize the second word in a phrase?", possibleAnswers: ["uppy downy", "camelCase", "capital case", "method writing"], answerIndex: 1 },
      { text: "What do we put inside an <a> tag to link to an outside source?", possibleAnswers: ["href:", "separate:", "at:", "remove:"], answerIndex: 0 },
      { text: "What does the 'P' in 'API' stand for?", possibleAnswers: ["position", "possible", "perpetual", "programming"], answerIndex: 3 },
    ];

  document.addEventListener('DOMContentLoaded', setupWorld())

  function setupWorld() {
    state = {
      currentQuestionIndex: 0,
      currentScore: 0,
    }

    scoreElement = document.getElementById("score");
    startQuizElement = document.getElementById("start-quiz");
    questionElement = document.getElementById("question")
    questionTextElement = document.getElementById("question-text")
    answersElement = document.getElementById("answers");
    submitScoreElement = document.getElementById("submit-score");
  }

  function startQuiz() {
    state.currentQuestionIndex = 0;

    startQuizElement.setAttribute("hidden", true);

    displayNextQuestion();
  }

  function displayNextQuestion() {
    let currentQuestion = questions[state.currentQuestionIndex];

    questionTextElement.textContent = currentQuestion.text;

    answersElement.innerHTML = "";

    for (i = 0; i < currentQuestion.possibleAnswers.length; i++) {
      let possibleAnswerButton = document.createElement("BUTTON");
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

  function submitHighScore() {
    
  }