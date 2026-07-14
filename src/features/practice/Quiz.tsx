import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Award } from "lucide-react";
import { Shell } from "../../components/layout/Shell";
import { generateQuizForConcept } from "../../learning/assessment/generator.js";
import { assessmentEngine, type QuizQuestion, type GradingReport } from "../../modules/assessment/assessmentEngine";

export const Quiz: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [textAnswer, setTextAnswer] = useState("");
  const [report, setReport] = useState<GradingReport | null>(null);
  const [feedback, setFeedback] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const activeConceptId = conceptId || "chem-reactions";

  useEffect(() => {
    async function load() {
      const qList = await generateQuizForConcept(activeConceptId, "class10-science");
      
      if (qList && qList.length > 0) {
        setQuestions(qList);
      } else {
        // Fallback mock questions if db is empty during testing
        setQuestions([
          {
            id: "q1",
            conceptId: activeConceptId,
            question: "What type of chemical reaction absorbs heat from surroundings?",
            options: ["Exothermic", "Endothermic", "Displacement", "Synthesis"],
            correctAnswer: "Endothermic",
            explanation: "Endothermic reactions absorb heat energy from the surrounding environment."
          },
          {
            id: "q2",
            conceptId: activeConceptId,
            question: "Balance: H2 + O2 -> H2O requires what coefficient in front of H2O?",
            options: ["1", "2", "3", "4"],
            correctAnswer: "2",
            explanation: "2H2 + O2 -> 2H2O balances the hydrogen and oxygen atoms on both sides."
          }
        ]);
      }
      setLoading(false);
    }
    load();
  }, [activeConceptId]);

  if (loading) {
    return (
      <Shell>
        <div className="text-center py-12 text-slate-500">Loading assessment quiz...</div>
      </Shell>
    );
  }

  const handleAnswerSubmit = (ans: string) => {
    const nextAnswers = [...userAnswers, ans];
    setUserAnswers(nextAnswers);
    setTextAnswer("");

    if (activeQuestionIndex + 1 < questions.length) {
      setActiveQuestionIndex(activeQuestionIndex + 1);
    } else {
      const quizReport = assessmentEngine.gradeQuiz(questions, nextAnswers);
      const quizFeedback = assessmentEngine.getAdaptiveFeedback(quizReport.percentage);
      setReport(quizReport);
      setFeedback(quizFeedback);
    }
  };

  if (report && feedback) {
    return (
      <Shell>
        <div className="quiz-results-screen bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 p-8 rounded-[32px] max-w-xl mx-auto shadow-sm">
          <div className="text-4xl text-center mb-4">{"⭐".repeat(feedback.stars)}</div>
          <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-white font-headline mb-2">{feedback.title}</h2>
          <p className="text-center text-slate-500 dark:text-slate-400 text-sm mb-6">{feedback.message}</p>
          
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 mb-6 space-y-3">
            <div className="flex justify-between text-sm"><span className="text-slate-500">Score:</span> <strong className="text-slate-800 dark:text-white">{report.percentage}%</strong></div>
            <div className="flex justify-between text-sm"><span className="text-slate-500">XP Earned:</span> <strong className="text-indigo-600">+{report.xpEarned} XP</strong></div>
            <div className="flex justify-between text-sm"><span className="text-slate-500">Correct Answers:</span> <strong className="text-slate-800 dark:text-white">{report.correctCount}/{report.totalCount}</strong></div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" />
              Review Explanations:
            </h4>
            {report.results.map((res: any, i: number) => (
              <div key={i} className={`p-4 rounded-xl border ${res.isCorrect ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-800 dark:text-emerald-350" : "bg-rose-500/5 border-rose-500/20 text-rose-800 dark:text-rose-350"}`}>
                <strong className="text-xs">Q{i + 1}: {res.question}</strong>
                <p className="text-xs mt-1">Your answer: <em>{res.userAnswer || "N/A"}</em></p>
                <p className="text-xs font-semibold">Correct: {res.correctAnswer}</p>
                <p className="text-[11px] text-slate-400 mt-2">{res.explanation}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 w-full rounded-2xl transition-all" onClick={() => navigate("/learn/chapters")}>Continue</button>
          </div>
        </div>
      </Shell>
    );
  }

  const q = questions[activeQuestionIndex];

  return (
    <Shell>
      <div className="quiz-page bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 p-8 rounded-[32px] max-w-xl mx-auto shadow-sm">
        <div className="mb-6">
          <div className="flex justify-between text-xs text-slate-400 font-semibold mb-2">
            <span>Question {activeQuestionIndex + 1} of {questions.length}</span>
            <span>{Math.round((activeQuestionIndex / questions.length) * 100)}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600" style={{ width: `${(activeQuestionIndex / questions.length) * 100}%` }} />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white font-headline mb-6">{q.question}</h3>
          
          <div className="flex flex-col gap-3">
            {q.options ? (
              q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswerSubmit(opt)}
                  className="w-full text-left px-5 py-4 border border-slate-200 dark:border-slate-700 rounded-2xl hover:border-indigo-600 hover:bg-indigo-50/10 active:scale-[0.98] transition-all text-sm font-semibold dark:text-slate-200"
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
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-4 w-full rounded-2xl font-bold transition-all"
                >
                  Submit Answer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Shell>
  );
};

export default Quiz;
