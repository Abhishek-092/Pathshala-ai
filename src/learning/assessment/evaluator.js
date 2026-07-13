export function gradeQuiz(questions, userAnswers) {
  let correctCount = 0;
  const results = questions.map((q, idx) => {
    const userAnswer = userAnswers[idx];
    const isCorrect = String(userAnswer).trim().toLowerCase() === String(q.answer).trim().toLowerCase();
    
    if (isCorrect) {
      correctCount++;
    }

    return {
      question: q.question,
      userAnswer,
      correctAnswer: q.answer,
      isCorrect,
      explanation: q.explanation
    };
  });

  const percentage = Math.round((correctCount / questions.length) * 100);
  const xpEarned = correctCount * 20;

  return {
    correctCount,
    totalCount: questions.length,
    percentage,
    xpEarned,
    results
  };
}
