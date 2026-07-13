export function generateAdaptiveFeedback(percentage) {
  if (percentage >= 80) {
    return {
      title: "Concept Mastered!",
      message: "Outstanding! You've shown deep understanding of this concept. Ready to proceed to the next topic.",
      stars: 3,
      badge: "Mastery Badge Unlocked"
    };
  } else if (percentage >= 50) {
    return {
      title: "Passing Performance!",
      message: "Good effort! You understand the basics, but a quick revision with the AI Tutor could help clear up outstanding questions.",
      stars: 2,
      badge: null
    };
  } else {
    return {
      title: "Needs Revision",
      message: "Keep going! We recommend using the 'Explain Simply' mode with our offline AI Tutor to review this concept before re-testing.",
      stars: 1,
      badge: null
    };
  }
}
