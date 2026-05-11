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
let maxSelections = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(questionData) {
  resetState();
  questionElement.innerHTML = questionData.question;
  maxSelections = questionData.answers.filter(a => a.correct).length;

  questionData.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("item");

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", () => {
      handleSelection(button);
    });

    answerButtons.appendChild(button);
  });
}

function handleSelection(button) {
  const selectedButtons = Array.from(answerButtons.querySelectorAll(".selected"));

  if (maxSelections === 1) {
    answerButtons.querySelectorAll(".selected").forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
  } 
  else {
    if (button.classList.contains("selected")) {
      button.classList.remove("selected");
    } else if (selectedButtons.length < maxSelections) {
      button.classList.add("selected");
    }
  }
}

function resetState() {
  nextButton.style.display = "block";
  nextButton.innerHTML = "Submit";

  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function handleSubmit(){
  const buttons = Array.from(answerButtons.children);
  const selectedCorrect = buttons.filter(btn => btn.classList.contains("selected")
  && btn.dataset.correct).length; //!!!!!!!!!!!!!!!!!!!
  const selectedIncorrect = buttons.filter(btn => btn.classList.contains("selected")
  && btn.dataset.correct !== "true").length;
  
  if(selectedCorrect === maxSelections && selectedIncorrect === 0){
    score++;
  }
  
  buttons.forEach(button => {
    const isCorrect = button.dataset.correct === "true";
    const isSelected = button.classList.contains("selected");
    
    if(isCorrect){
      button.classList.add("correct");
    }
    if(isSelected && !isCorrect) {
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

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!!!`;
  nextButton.innerHTML = `Play again`;
}

nextButton.addEventListener("click", () => {
  if(nextButton.innerHTML === "Submit"){
    handleSubmit();
  }
  else if (nextButton.innerHTML === "Next") {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
