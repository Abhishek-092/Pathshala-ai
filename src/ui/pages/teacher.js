import { router } from "../../core/router.js";

export function teacherPage(container) {
  let createdWorksheet = null;

  function render() {
    container.innerHTML = `
      <div class="teacher-page">
        <div class="page-header">
          <h2>Teacher Dashboard</h2>
          <p>Compose custom quizzes, generate worksheets, and export classroom reports.</p>
        </div>

        <!-- Custom Quiz Creator -->
        <div class="teacher-section card">
          <h3>✍️ AI Worksheet Generator</h3>
          <p class="subtitle">Enter a concept name. Our local AI will structure questions and export printable PDF formats completely offline.</p>
          
          <div class="worksheet-form" style="margin-top:15px;">
            <label>Worksheet Concept / Topic:</label>
            <input type="text" id="work-topic" class="text-input" placeholder="e.g. Acid Neutralization" value="Redox Reactions" />
            
            <label>Number of Questions:</label>
            <input type="number" id="work-count" class="text-input" min="3" max="20" value="5" />

            <button class="primary-btn" id="btn-generate-worksheet" style="margin-top:15px;">Generate Worksheet</button>
          </div>
        </div>

        <div id="worksheet-output-container">
          ${createdWorksheet ? renderWorksheetOutput() : ""}
        </div>

        <!-- Classroom Sync -->
        <div class="teacher-section">
          <h3>Classroom Sync Status</h3>
          <div class="sync-row" style="background:#FFFBEB; border:1px solid #F59E0B; padding:10px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong>Offline Classroom Server</strong>
              <p style="font-size:11px; margin:0; color:#64748B;">Connect local hotspot to sync student devices.</p>
            </div>
            <span class="status-badge orange">Waiting for Devices</span>
          </div>
        </div>
      </div>
    `;

    container.querySelector("#btn-generate-worksheet").addEventListener("click", () => {
      const topic = container.querySelector("#work-topic").value;
      const count = container.querySelector("#work-count").value;
      createdWorksheet = {
        topic,
        count,
        generatedAt: new Date().toLocaleDateString(),
        questions: [
          "Define the target reaction process.",
          "Write a balanced equation representing this transition.",
          "Identify which elements undergo reduction and oxidation.",
          "Explain a practical daily-life application of this process."
        ]
      };
      render();
    });
  }

  function renderWorksheetOutput() {
    return `
      <div class="worksheet-results-card" style="background:#F8FAFC; border:1px solid #E2E8F0; padding:15px; border-radius:12px; margin-top:20px;">
        <h4 style="margin:0 0 10px 0;">📄 Generated Worksheet: ${createdWorksheet.topic}</h4>
        <p style="font-size:11px; color:#64748B; margin-bottom:15px;">Size: 32 KB • Format: PDF Ready • Date: ${createdWorksheet.generatedAt}</p>
        
        <ol style="padding-left:20px; font-size:12px; line-height:1.6; margin-bottom:15px;">
          ${createdWorksheet.questions.map(q => `<li>${q}</li>`).join("")}
        </ol>

        <button class="secondary-btn" id="btn-export-worksheet">💾 Export PDF</button>
      </div>
    `;
  }

  render();
}
