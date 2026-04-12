const questions = [
  {
    question: "What it what?",
    answers: [
      { text: "shark", correct: false },
      { text: "bear", correct: true },
      { text: "goat", correct: false },
      { text: "worm", correct: false },
    ],
  },
  {
    question: "How many planets does the Solar System have?",
    answers: [
      { text: "1", correct: false },
      { text: "2", correct: false },
      { text: "3", correct: false },
      { text: "4", correct: true },
    ],
  },
  {
    question:
      "What Basketball, Football, Handball, Baseball, Hockey… Only one of these sports is not timed. Which one?",
    answers: [
      { text: "Basketball", correct: false },
      { text: "Football", correct: true },
      { text: "Handball", correct: false },
      { text: "Hockey", correct: false },
    ],
  },
  {
    question:
      "The Chinese language is the most widely spoken language in the world. Which one comes second?",
    answers: [
      { text: "russian", correct: false },
      { text: "belorussian", correct: true },
      { text: "english", correct: false },
      { text: "aaaaaa", correct: false },
    ],
  },
  {
    question:
      "How old was Isaac Newton when he established the law of universal gravitation?",
    answers: [
      { text: "3", correct: false },
      { text: "33", correct: true },
      { text: "333", correct: false },
      { text: "3333", correct: false },
    ],
  },
  {
    question: "What is the 27 club?",
    answers: [
      { text: "russian", correct: false },
      { text: "belorussian", correct: true },
      { text: "english", correct: false },
      { text: "aaaaaa", correct: false },
    ],
  },
  {
    question: "With which country does France share the largest border with?",
    answers: [
      { text: "russian", correct: false },
      { text: "belorussian", correct: true },
      { text: "english", correct: false },
      { text: "aaaaaa", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("item");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!!!`;
  nextButton.innerHTML = `Play again`;
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
