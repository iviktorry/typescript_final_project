const questions = [
  {
    question: "Which planet in the Solar System rotates on its side (its axis is tilted by more than 90 degrees)?",
    answers: [
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
      { text: "Uranus", correct: true },
      { text: "Neptune", correct: false },
    ],
  },
  {
    question: "In which country was the popular dessert \"Pavlova\" invented?",
    answers: [
      { text: "Russia", correct: false },
      { text: "New Zealand", correct: true },
      { text: "France", correct: false },
      { text: "Italy", correct: false },
    ],
  },
  {
    question: "Which chemical element makes up more than 75% of the mass of the observable universe?",
    answers: [
      { text: "Helium", correct: false },
      { text: "Oxygen", correct: false },
      { text: "Carbon", correct: false },
      { text: "Hydrogen", correct: true },
    ],
  },
  {
    question: "What was the name of Alexander the Great's horse?",
    answers: [
      { text: "Incitatus", correct: false },
      { text: "Bucephalus", correct: true },
      { text: "Rocinante", correct: false },
      { text: "Bolivar", correct: false },
    ],
  },
  {
    question: "What is the capital city of Canada?",
    answers: [
      { text: "Toronto", correct: false },
      { text: "Vancouver", correct: false },
      { text: "Ottawa", correct: true },
      { text: "Montreal", correct: false },
    ],
  },
  {
    question: "In what year did the first human moon landing occur?",
    answers: [
      { text: "1961", correct: false },
      { text: "1969", correct: true },
      { text: "1975", correct: false },
      { text: "1957", correct: false },
    ],
  },
  {
    question: "Which animal is the official national symbol of Scotland?",
    answers: [
      { text: "Loch Ness Monster", correct: false },
      { text: "Unicorn", correct: true },
      { text: "Red Deer", correct: false },
      { text: "Golden Eagle", correct: false },
    ],
  },
  {
    question: "How many strings does a standard classical violin have?",
    answers: [
      { text: "4", correct: true },
      { text: "3", correct: false },
      { text: "5", correct: false },
      { text: "6", correct: false },
    ],
  },
  {
    question: "Which organ in the human body consumes about 20% of the body's total energy?",
    answers: [
      { text: "Heart", correct: false },
      { text: "Liver", correct: false },
      { text: "Brain", correct: true },
      { text: "Lungs", correct: false },
    ],
  },
  {
    question: "What is the name of the deepest point in the world's oceans?",
    answers: [
      { text: "Philippine Trench", correct: false },
      { text: "Greenland Sea", correct: false },
      { text: "Lomonosov Ridge", correct: false },
      { text: "Challenger Deep", correct: true },
    ],
  },
  {
    question: "multiple?",
    answers: [
      { text: "Philippine Trench", correct: false },
      { text: "Greenland Sea", correct: false },
      { text: "Lomonosov Ridge", correct: true },
      { text: "Challenger Deep", correct: true },
      { text: "Challenger Deep", correct: true },
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
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(questionData) {
  resetState();
  questionElement.innerHTML = questionData.question;

  questionData.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("item");

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", () => {
      button.classList.toggle("selected");
      nextButton.innerHTML = "Submit";
      nextButton.style.display = "block";
    });

    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "block";
  nextButton.innerHTML = "Submit";

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

function handleSubmit(){
  const buttons = Array.from(answerButtons.children);
  
  buttons.forEach(button => {
    const isCorrect = button.dataset.correct === "true";
    const isSelected = button.classList.contains("selected");

    if(isCorrect){
      button.classList.add("correct");
    }
    else if(isSelected && !isCorrect) {
      button.classList.add("incorrect");
    }

    button.disabled = true;
  });

  nextButton.innerHTML = "Next";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex]);
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if(nextButton.innerHTML === "Submit"){
    handleSubmit();
  }
  else if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
