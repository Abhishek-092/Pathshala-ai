import React, { useState, useEffect } from "react";
import { generateQuizForConcept } from "../../learning/assessment/generator.js";
import { gradeQuiz } from "../../learning/assessment/evaluator.js";
import { generateAdaptiveFeedback } from "../../learning/assessment/feedback.js";
import { curriculumEngine } from "../../learning/curriculum/curriculumEngine.js";
import { eventBus } from "../../core/eventBus.js";

export default function Quiz({ params }) {
  const [questions, setQuestions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [textAnswer, setTextAnswer] = useState("");
  const [report, setReport] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);

  const conceptId = params.conceptId || "chem-reactions";

  useEffect(() => {
    async function loadQuiz() {
      const packId = curriculumEngine.activePackId || "class10-science";
      const qList = await generateQuizForConcept(conceptId, packId);
      setQuestions(qList);
      setLoading(false);
    }
    loadQuiz();
  }, [conceptId]);

  if (loading) {
    return <div className="text-center py-12">Loading assessment quiz...</div>;
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <p>No quiz questions found for this topic.</p>
        <button className="primary-btn mt-4" onClick={() => window.reactNavigate("chapters")}>Go Back</button>
      </div>
    );
  }

  const handleAnswerSubmit = (ans) => {
    const nextAnswers = [...userAnswers, ans];
    setUserAnswers(nextAnswers);
    setTextAnswer("");

    if (activeQuestionIndex + 1 < questions.length) {
      setActiveQuestionIndex(activeQuestionIndex + 1);
    } else {
      // Evaluate and finish
      const quizReport = gradeQuiz(questions, nextAnswers);
      const quizFeedback = generateAdaptiveFeedback(quizReport.percentage);
      setReport(quizReport);
      setFeedback(quizFeedback);

      // Emit event to update tracker and unlock items
      eventBus.emit("QuizFinished", {
        conceptId,
        score: quizReport.percentage,
        xpEarned: quizReport.xpEarned
      });
    }
  };

  // Render Results Screen
  if (report) {
    return (
      <div className="quiz-results-screen bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 p-8 rounded-[32px] max-w-xl mx-auto shadow-sm">
        <div className="text-4xl text-center mb-4">{"⭐".repeat(feedback.stars)}</div>
        <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-white font-headline mb-2">{feedback.title}</h2>
        <p className="text-center text-slate-500 dark:text-slate-400 text-sm mb-6">{feedback.message}</p>
        
        <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 mb-6 space-y-3">
          <div className="flex justify-between text-sm"><span className="text-slate-500">Score:</span> <strong className="text-slate-800 dark:text-white">{report.percentage}%</strong></div>
          <div className="flex justify-between text-sm"><span className="text-slate-500">XP Earned:</span> <strong className="text-primary">+{report.xpEarned} XP</strong></div>
          <div className="flex justify-between text-sm"><span className="text-slate-500">Correct Answers:</span> <strong className="text-slate-800 dark:text-white">{report.correctCount}/{report.totalCount}</strong></div>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-sm text-slate-800 dark:text-white">Review Explanations:</h4>
          {report.results.map((res, i) => (
            <div key={i} className={`p-4 rounded-xl border ${res.isCorrect ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-800 dark:text-emerald-300" : "bg-rose-500/5 border-rose-500/20 text-rose-800 dark:text-rose-300"}`}>
              <strong className="text-xs">Q{i + 1}: {res.question}</strong>
              <p className="text-xs mt-1">Your answer: <em>{res.userAnswer || "N/A"}</em></p>
              <p className="text-xs font-semibold">Correct: {res.correctAnswer}</p>
              <p className="text-[11px] text-slate-400 mt-2">{res.explanation}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button className="primary-btn w-full py-4" onClick={() => window.reactNavigate("chapters")}>Continue</button>
        </div>
      </div>
    );
  }

  const q = questions[activeQuestionIndex];

  return (
    <div className="quiz-page bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 p-8 rounded-[32px] max-w-xl mx-auto shadow-sm">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-slate-400 font-semibold mb-2">
          <span>Question {activeQuestionIndex + 1} of {questions.length}</span>
          <span>{Math.round((activeQuestionIndex / questions.length) * 100)}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-primary" style={{ width: `${(activeQuestionIndex / questions.length) * 100}%` }} />
        </div>
      </div>

      {/* Question Body */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-white font-headline mb-6">{q.question}</h3>
        
        <div className="flex flex-col gap-3">
          {q.options ? (
            q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswerSubmit(opt)}
                className="w-full text-left px-5 py-4 border border-slate-200 dark:border-slate-700 rounded-2xl hover:border-primary hover:bg-indigo-50/10 active:scale-[0.98] transition-all text-sm font-semibold"
              >
                {opt}
              </button>
            ))
          ) : (
            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAnswerSubmit(textAnswer)}
                className="w-full px-5 py-4 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary outline-none text-sm dark:bg-slate-850 dark:text-white"
                placeholder="Type your answer here..."
              />
              <button
                onClick={() => handleAnswerSubmit(textAnswer)}
                className="primary-btn py-4 w-full"
              >
                Submit Answer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
