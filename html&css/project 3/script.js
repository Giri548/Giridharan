let questions = [];
let currentIndex = 0;
let score = 0;

function addQuestion() {
  let question = document.getElementById("question").value;
  let A = document.getElementById("optionA").value;
  let B = document.getElementById("optionB").value;
  let C = document.getElementById("optionC").value;
  let D = document.getElementById("optionD").value;
  let correct = document.getElementById("correct").value.toUpperCase();

  if (!question || !A || !B || !C || !D || !correct) {
    document.getElementById("msg").innerText = "All fields are required!";
    return;
  }

  if (!["A","B","C","D"].includes(correct)) {
    document.getElementById("msg").innerText = "Correct option must be A, B, C or D!";
    return;
  }

  let qObj = {
    question,
    options: { A, B, C, D },
    correct
  };

  questions.push(qObj);
  document.getElementById("msg").innerText = "Question Added Successfully!";

  document.querySelectorAll("input").forEach(input => input.value = "");
}

function startQuiz() {
  if (questions.length === 0) {
    alert("Please add questions first!");
    return;
  }

  currentIndex = 0;
  score = 0;
  document.getElementById("quizBox").classList.remove("hide");
  document.getElementById("result").innerText = "";
  loadQuestion();
}

function loadQuestion() {
  let q = questions[currentIndex];
  document.getElementById("qText").innerText = q.question;
  document.getElementById("btnA").innerText = "A. " + q.options.A;
  document.getElementById("btnB").innerText = "B. " + q.options.B;
  document.getElementById("btnC").innerText = "C. " + q.options.C;
  document.getElementById("btnD").innerText = "D. " + q.options.D;
}

function selectOption(option) {
  if (option === questions[currentIndex].correct) {
    score++;
  }

  currentIndex++;

  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    document.getElementById("quizBox").classList.add("hide");
    document.getElementById("result").innerText =
      "Quiz Finished! Your Score: " + score + " / " + questions.length;
  }
}