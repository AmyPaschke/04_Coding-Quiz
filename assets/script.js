    var questions = [
    { text: "What is the first letter of the alphabet?", possibleAnswers: ["A", "B", "C", "D", "E"], answerIndex: 0 },
    { text: "What is the last letter of the alphabet?", possibleAnswers: ["A", "B", "C", "D", "Z"], answerIndex: 4 },
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
    var currentQuestion = questions[state.currentQuestionIndex];

    questionTextElement.textContent = currentQuestion.text;

    answersElement.innerHTML = "";

    for (i = 0; i < currentQuestion.possibleAnswers.length; i++) {
      var possibleAnswerButton = document.createElement("BUTTON");
      possibleAnswerButton.textContent = currentQuestion.possibleAnswers[i];
      possibleAnswerButton.setAttribute("data-index", i);
      possibleAnswerButton.onclick = submitAnswer;
      answersElement.appendChild(possibleAnswerButton);
    }

    questionElement.removeAttribute("hidden");
  }

  function submitAnswer(event) {
    var submittedAnswerIndex = event.target.dataset.index;

    var currentQuestion = questions[state.currentQuestionIndex];

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