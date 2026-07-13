import { analyticsTracker } from "../../learning/analytics/tracker.js";

export function parentPage(container) {
  const masteredCount = analyticsTracker.getMasteredConcepts().length;
  const weakCount = analyticsTracker.getWeakConcepts().length;

  container.innerHTML = `
    <div class="parent-page">
      <div class="page-header">
        <h2>Parent Dashboard</h2>
        <p>Monitor your child's offline learning path and study hours.</p>
      </div>

      <!-- Overview stats -->
      <div class="metrics-grid" style="margin-top:15px;">
        <div class="metric-card">
          <h4>Study Commitment</h4>
          <h2>4.2 hours</h2>
          <p>This week's study time</p>
        </div>
        <div class="metric-card">
          <h4>Quiz Accuracy</h4>
          <h2>84%</h2>
          <p>Average accuracy score</p>
        </div>
      </div>

      <!-- Weekly performance chart mockup -->
      <div class="parent-section">
        <h3>Weekly Activity Trend</h3>
        <div class="chart-mockup" style="height:100px; background:#EEF2F6; border-radius:12px; display:flex; align-items:flex-end; justify-content:space-around; padding:10px;">
          <div style="width:20px; height:40px; background:#4F46E5; border-radius:4px 4px 0 0;"></div>
          <div style="width:20px; height:70px; background:#4F46E5; border-radius:4px 4px 0 0;"></div>
          <div style="width:20px; height:50px; background:#4F46E5; border-radius:4px 4px 0 0;"></div>
          <div style="width:20px; height:85px; background:#4F46E5; border-radius:4px 4px 0 0;"></div>
          <div style="width:20px; height:30px; background:#4F46E5; border-radius:4px 4px 0 0;"></div>
          <div style="width:20px; height:60px; background:#06B6D4; border-radius:4px 4px 0 0;"></div>
          <div style="width:20px; height:10px; background:#94A3B8; border-radius:4px 4px 0 0;"></div>
        </div>
        <div style="display:flex; justify-content:space-around; font-size:9px; color:#64748B; margin-top:5px;">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
      </div>

      <!-- Subject mastery details -->
      <div class="parent-section">
        <h3>Syllabus Diagnostics</h3>
        <div class="diagnostic-list">
          <div class="dia-row">
            <span>Chemistry:</span>
            <strong>${masteredCount >= 2 ? "Strong (Prereqs met)" : "Improving"}</strong>
          </div>
          <div class="dia-row">
            <span>Biology:</span>
            <strong>Needs Review (${weakCount} weak concepts)</strong>
          </div>
        </div>
      </div>

      <!-- Recommendations -->
      <div class="parent-section advice-card" style="background:#ECFDF5; border-left:4px solid #22C55E; padding:15px; border-radius:8px;">
        <h4 style="color:#065F46; margin:0 0 5px 0;">💡 AI Parent Advisor</h4>
        <p style="color:#065F46; font-size:12px; margin:0; line-height:1.4;">
          Rahul is doing great in chemistry equations but needs to spend about 30 more minutes reviewing biology life processes. Ask him to run the "Explain Simply" tutor mode for autotrophic respiration.
        </p>
      </div>
    </div>
  `;
}
