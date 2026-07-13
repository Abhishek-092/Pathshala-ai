import { router } from "../../core/router.js";
import { generateQuizForConcept } from "../../learning/assessment/generator.js";
import { gradeQuiz } from "../../learning/assessment/evaluator.js";
import { generateAdaptiveFeedback } from "../../learning/assessment/feedback.js";
import { curriculumEngine } from "../../learning/curriculum/curriculumEngine.js";
import { eventBus } from "../../core/eventBus.js";

export async function quizPage(container, params = {}) {
  const conceptId = params.conceptId || "chem-reactions";
  const packId = curriculumEngine.activePackId || "class10-science";

  const questions = await generateQuizForConcept(conceptId, packId);
  let activeQuestionIndex = 0;
  const userAnswers = [];

  function render() {
    if (activeQuestionIndex >= questions.length) {
      renderResults();
      return;
    }

    const q = questions[activeQuestionIndex];
    container.innerHTML = `
      <div class="quiz-page">
        <!-- Progress Bar -->
        <div class="quiz-header-bar">
          <span>Question ${activeQuestionIndex + 1} of ${questions.length}</span>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${(activeQuestionIndex / questions.length) * 100}%"></div>
          </div>
        </div>

        <!-- Question Body -->
        <div class="quiz-question-box">
          <h3>${q.question}</h3>
          
          <div class="options-container">
            ${q.options ? q.options.map((opt, i) => `
              <button class="option-row" data-val="${opt}">${opt}</button>
            `).join("") : `
              <input type="text" id="quiz-text-answer" class="text-input" placeholder="Type your answer here..." />
              <button class="primary-btn submit-text-answer" style="margin-top: 15px;">Submit Answer</button>
            `}
          </div>
        </div>
      </div>
    `;

    // Hook MCQ buttons
    container.querySelectorAll(".option-row").forEach(btn => {
      btn.addEventListener("click", () => {
        const val = btn.getAttribute("data-val");
        userAnswers.push(val);
        activeQuestionIndex++;
        render();
      });
    });

    // Hook Text inputs
    const submitTextBtn = container.querySelector(".submit-text-answer");
    if (submitTextBtn) {
      submitTextBtn.addEventListener("click", () => {
        const input = container.querySelector("#quiz-text-answer");
        userAnswers.push(input.value);
        activeQuestionIndex++;
        render();
      });
    }
  }

  function renderResults() {
    const report = gradeQuiz(questions, userAnswers);
    const feedback = generateAdaptiveFeedback(report.percentage);

    // Emit event to update Learning Engine & Tracker
    eventBus.emit("QuizFinished", {
      conceptId,
      score: report.percentage,
      xpEarned: report.xpEarned
    });

    container.innerHTML = `
      <div class="quiz-results-screen">
        <div class="stars-row">${"⭐".repeat(feedback.stars)}</div>
        <h2>${feedback.title}</h2>
        <p>${feedback.message}</p>
        
        <div class="report-box">
          <div class="stat"><span>Score:</span> <strong>${report.percentage}%</strong></div>
          <div class="stat"><span>XP Earned:</span> <strong>+${report.xpEarned} XP</strong></div>
          <div class="stat"><span>Correct Answers:</span> <strong>${report.correctCount}/${report.totalCount}</strong></div>
        </div>

        <div class="corrections-list">
          <h4>Review Explanations:</h4>
          ${report.results.map((res, i) => `
            <div class="correction-item ${res.isCorrect ? "correct" : "incorrect"}">
              <strong>Q${i+1}: ${res.question}</strong>
              <p>Your answer: <em>${res.userAnswer || "N/A"}</em></p>
              <p>Correct: <strong>${res.correctAnswer}</strong></p>
              <p class="explanation-note">${res.explanation}</p>
            </div>
          `).join("")}
        </div>

        <div class="results-footer">
          <button class="primary-btn" id="btn-results-continue">Continue</button>
        </div>
      </div>
    `;

    container.querySelector("#btn-results-continue").addEventListener("click", () => {
      router.navigate("chapters");
    });
  }

  render();
}
