let score = 0;

function checkAnswer(correct) {
  if (correct) score++;
}

function finishQuiz() {
  localStorage.setItem("quizScore", score);
  alert("Quiz Completed! Score: " + score);
}