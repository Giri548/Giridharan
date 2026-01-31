function* paginator(total) {
  let index = 0;
  while (index < total) {
    yield index++;
  }
}

class Quiz {
  constructor(questions) {
    this.questions = this.shuffle(questions);
    this.answers = [];
    this.score = 0;
    this.page = paginator(this.questions.length);
    this.currentIndex = this.page.next().value;
  }

    
  shuffle(questions) {
    return Array.from(questions).sort(() => Math.random() - 0.5);
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }

  submitAnswer(answer) {
    this.answers.push(answer);
  }

  
  calculateScore(...answers) {
    this.score = answers.reduce((sum, ans, idx) => {
      return ans === this.questions[idx].correct ? sum + 1 : sum;
    }, 0);
    return this.score;
  }

  next() {
    const nextPage = this.page.next();
    this.currentIndex = nextPage.done ? null : nextPage.value;
  }
}


const questionBank = [
  {
    text: "Which keyword defines a constant in JavaScript?",
    options: ["var", "let", "const", "define"],
    correct: "const"
  },
  {
    text: "Which ES6 feature supports pagination logic here?",
    options: ["Promises", "Generators", "Closures", "Callbacks"],
    correct: "Generators"
  },
  {
    text: "Which method converts iterable data into an array?",
    options: ["Array.map()", "Array.from()", "Array.of()", "Array.filter()"],
    correct: "Array.from()"
  }
];


const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const progressEl = document.getElementById("progress");


const quiz = new Quiz(questionBank);

function render() {
  if (quiz.currentIndex === null) {
    const finalScore = quiz.calculateScore(...quiz.answers);
    questionEl.textContent = "Quiz Completed 🎉";
    optionsEl.innerHTML = `Score: ${finalScore} / ${quiz.questions.length}`;
    nextBtn.style.display = "none";
    progressEl.textContent = "";
    return;
  }

  const q = quiz.getCurrentQuestion();
  questionEl.textContent = q.text;
  optionsEl.innerHTML = "";

  q.options.forEach(opt => {
    optionsEl.innerHTML += `
      <div class="option">
        <label>
          <input type="radio" name="answer" value="${opt}" />
          ${opt}
        </label>
      </div>
    `;
  });

  progressEl.textContent = `Question ${quiz.currentIndex + 1} of ${quiz.questions.length}`;
}

nextBtn.addEventListener("click", () => {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) return alert("Select an answer");

  quiz.submitAnswer(selected.value);
  quiz.next();
  render();
});

render();