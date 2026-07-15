import { db } from "../../services/storage/db";

export interface QuizQuestion {
  id: string;
  conceptId: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface GradingReport {
  score: number;
  percentage: number;
  correctCount: number;
  totalCount: number;
  xpEarned: number;
  results: Array<{
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    explanation: string;
  }>;
}

class AssessmentEngine {
  gradeQuiz(questions: QuizQuestion[], userAnswers: string[]): GradingReport {
    let correctCount = 0;
    const results = questions.map((q, idx) => {
      const uAns = userAnswers[idx] || "";
      const isCorrect = uAns.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
      if (isCorrect) correctCount++;

      return {
        question: q.question,
        userAnswer: uAns,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation
      };
    });

    const percentage = Math.round((correctCount / questions.length) * 100);
    const xpEarned = Math.round(percentage * 1.5);

    return {
      score: percentage,
      percentage,
      correctCount,
      totalCount: questions.length,
      xpEarned,
      results
    };
  }

  getAdaptiveFeedback(percentage: number) {
    if (percentage >= 90) {
      return { stars: 3, title: "Outstanding Work!", message: "You have fully mastered this topic! Keep up the brilliant momentum." };
    } else if (percentage >= 70) {
      return { stars: 2, title: "Nicely Done!", message: "Great progress. Review the explanations below to secure full mastery next time." };
    } else {
      return { stars: 1, title: "Keep Practicing", message: "Review the lesson materials and try again. Practice is key to learning." };
    }
  }

  async generateQuizForConcept(conceptId: string, packId: string): Promise<QuizQuestion[]> {
    const pack = await db.packs.get(packId);
    if (!pack || !pack.quizBank) return [];

    const questions = pack.quizBank.filter((q: any) => q.conceptId === conceptId);
    
    if (questions.length === 0) {
      return [
        {
          id: `gen-${conceptId}-1`,
          conceptId,
          question: `Which of the following describes the key principle of ${conceptId.replace("-", " ")}?`,
          options: ["Core Mechanism", "External Process", "Random Transition", "Non-reactive state"],
          correctAnswer: "Core Mechanism",
          explanation: "The core mechanism represents the central function of this concept."
        }
      ];
    }

    return questions.map((q: any) => ({
      id: q.id,
      conceptId: q.conceptId,
      question: q.question,
      options: q.options,
      correctAnswer: q.answer || q.correctAnswer || "",
      explanation: q.explanation || ""
    }));
  }
}

export const assessmentEngine = new AssessmentEngine();
