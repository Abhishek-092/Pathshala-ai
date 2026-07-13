export function generateStudyPlan(examDateStr, dailyHours, confidence, weakSubjects) {
  const examDate = new Date(examDateStr);
  const today = new Date();
  const diffTime = Math.abs(examDate - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (isNaN(diffDays) || diffDays <= 0) {
    return {
      daysRemaining: 15,
      totalStudyHours: 30,
      dailyTarget: "2 hours/day",
      schedule: [
        { phase: "Phase 1: Foundation", duration: "5 days", focus: "Core Concepts & Definitions" },
        { phase: "Phase 2: Reinforcement", duration: "5 days", focus: "Weak concepts & active quizzes" },
        { phase: "Phase 3: Mastering", duration: "5 days", focus: "Competitive exam mode & simulation tests" }
      ]
    };
  }

  // Study plan formulas
  const totalHours = diffDays * parseFloat(dailyHours);
  const schedule = [];

  // Divide time into 3 phases: Foundation, Practice/Weak Topics, Mock Exams
  const phase1Days = Math.max(1, Math.round(diffDays * 0.4));
  const phase2Days = Math.max(1, Math.round(diffDays * 0.4));
  const phase3Days = Math.max(1, diffDays - phase1Days - phase2Days);

  schedule.push({
    phase: "Phase 1: Concept Foundation",
    duration: `${phase1Days} days`,
    focus: `Core textbook chapters. Recommended daily sessions: ${dailyHours} hours.`
  });

  schedule.push({
    phase: "Phase 2: Target Weak Concepts",
    duration: `${phase2Days} days`,
    focus: `Reviewing ${weakSubjects.join(", ") || "General Science & Maths"} with ELI5 & Analogy explain modes.`
  });

  schedule.push({
    phase: "Phase 3: Revision & Quiz Mastery",
    duration: `${phase3Days} days`,
    focus: "Tackling competitive MCQ banks and full syllabus simulations."
  });

  return {
    daysRemaining: diffDays,
    totalStudyHours: totalHours,
    dailyTarget: `${dailyHours} hours/day`,
    schedule
  };
}
