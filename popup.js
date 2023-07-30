javascript
// Load the quiz questions and options from a predefined set
const quizQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Rome"],
    answer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
    answer: "Leonardo da Vinci"
  },
  {
    question: "What is the largest ocean in the world?",
    options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
    answer: "Pacific Ocean"
  },
  {
    question: "Which country is known for its pyramids?",
    options: ["Egypt", "China", "Mexico", "Greece"],
    answer: "Egypt"
  }
];

// Display the quiz questions and options in the popup window
function displayQuiz() {
  const quizContainer = document.getElementById("quiz-container");

  quizQuestions.forEach((question, index) => {
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");

    const questionText = document.createElement("p");
    questionText.textContent = `Question ${index + 1}: ${question.question}`;

    const optionsContainer = document.createElement("div");
    optionsContainer.classList.add("options");

    question.options.forEach((option, optionIndex) => {
      const optionElement = document.createElement("div");
      optionElement.classList.add("option");

      const optionInput = document.createElement("input");
      optionInput.type = "radio";
      optionInput.name = `question-${index}`;
      optionInput.value = option;
      optionInput.id = `question-${index}-option-${optionIndex}`;

      const optionLabel = document.createElement("label");
      optionLabel.textContent = option;
      optionLabel.setAttribute("for", `question-${index}-option-${optionIndex}`);

      optionElement.appendChild(optionInput);
      optionElement.appendChild(optionLabel);
      optionsContainer.appendChild(optionElement);
    });

    questionElement.appendChild(questionText);
    questionElement.appendChild(optionsContainer);
    quizContainer.appendChild(questionElement);
  });
}

// Record the user's selected options for each question
function recordAnswers() {
  const answerInputs = document.querySelectorAll("input[type='radio']:checked");
  const userAnswers = [];

  answerInputs.forEach((input) => {
    const questionIndex = parseInt(input.name.split("-")[1]);
    const answer = input.value;
    userAnswers[questionIndex] = answer;
  });

  return userAnswers;
}

// Validate the user's answers and calculate the score
function calculateScore(userAnswers) {
  let score = 0;

  userAnswers.forEach((answer, index) => {
    if (answer === quizQuestions[index].answer) {
      score++;
    }
  });

  return score;
}

// Display the user's score at the end of the quiz
function displayScore(score) {
  const scoreContainer = document.getElementById("score-container");
  const scoreText = document.createElement("p");
  scoreText.textContent = `Your score: ${score}/${quizQuestions.length}`;

  scoreContainer.appendChild(scoreText);
}

// Submit the quiz
function submitQuiz() {
  const userAnswers = recordAnswers();

  if (userAnswers.length !== quizQuestions.length) {
    alert("Please answer all the questions before submitting the quiz.");
    return;
  }

  const score = calculateScore(userAnswers);
  displayScore(score);
}

// Event listener for submitting the quiz
const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", submitQuiz);

// Load the quiz when the popup window is opened
window.addEventListener("DOMContentLoaded", displayQuiz);
