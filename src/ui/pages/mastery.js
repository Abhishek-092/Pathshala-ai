import { router } from "../../core/router.js";
import { analyticsTracker } from "../../learning/analytics/tracker.js";
import { generateStudyPlan } from "../../learning/planner/scheduler.js";
import { curriculumEngine } from "../../learning/curriculum/curriculumEngine.js";
import { getStoreValue } from "../../storage/indexeddb/database.js";

export async function masteryPage(container) {
  const packId = curriculumEngine.activePackId || "class10-science";
  const pack = await getStoreValue("packs", packId);
  const progress = analyticsTracker.progress;

  let plannerResults = null;

  function render() {
    container.innerHTML = `
      <div class="mastery-page">
        <!-- Interactive Graph -->
        <div class="mastery-section">
          <h3>Interactive Concept Graph</h3>
          <p class="subtitle">Click any node to study or tutor the concept.</p>
          <div class="knowledge-graph-container" id="concept-svg-graph">
            <!-- SVG rendered dynamically -->
          </div>
        </div>

        <!-- Radar Chart -->
        <div class="mastery-section">
          <h3>Syllabus Competency Breakdown</h3>
          <div class="radar-chart-container">
            <svg viewBox="0 0 200 200" class="radar-svg">
              <polygon points="100,20 180,80 150,170 50,170 20,80" fill="none" stroke="#E2E8F0" stroke-width="2"/>
              <!-- Scaled polygon based on mock metrics -->
              <polygon points="100,50 160,90 130,150 70,140 40,90" fill="rgba(79, 70, 229, 0.2)" stroke="#4F46E5" stroke-width="2"/>
              <text x="100" y="15" font-size="8" text-anchor="middle" fill="#64748B">Chemistry</text>
              <text x="190" y="80" font-size="8" fill="#64748B">Physics</text>
              <text x="160" y="185" font-size="8" fill="#64748B">Biology</text>
              <text x="40" y="185" font-size="8" fill="#64748B">Coding</text>
              <text x="5" y="80" font-size="8" fill="#64748B">Logic</text>
            </svg>
          </div>
        </div>

        <!-- Study Planner Form -->
        <div class="mastery-section planner-card">
          <h3>📅 Offline AI Study Planner</h3>
          <p>Generate a structured study roadmap based on local parameters.</p>
          
          <div class="planner-form" style="margin-top: 15px;">
            <label>Exam Target Date:</label>
            <input type="date" id="plan-date" class="text-input" value="2026-08-15" />

            <label>Daily Study Commitment (Hours):</label>
            <input type="number" id="plan-hours" class="text-input" min="1" max="12" value="2" />

            <label>Current Confidence (%):</label>
            <input type="range" id="plan-conf" min="10" max="100" value="50" style="width:100%;" />

            <button class="primary-btn" id="btn-generate-plan" style="margin-top:15px;">Generate Roadmap</button>
          </div>

          <div id="planner-output-box" class="planner-results">
            ${plannerResults ? renderPlannerOutput() : ""}
          </div>
        </div>
      </div>
    `;

    renderConceptGraph();

    // Hook planner generator
    container.querySelector("#btn-generate-plan").addEventListener("click", () => {
      const examDate = container.querySelector("#plan-date").value;
      const hours = container.querySelector("#plan-hours").value;
      const conf = container.querySelector("#plan-conf").value;
      
      const weak = analyticsTracker.getWeakConcepts();
      plannerResults = generateStudyPlan(examDate, hours, conf, weak);
      render();
    });
  }

  function renderPlannerOutput() {
    return `
      <div class="plan-details" style="border-top:1px dashed #CBD5E1; margin-top:20px; padding-top:15px;">
        <h4>Study Target Summary</h4>
        <p>Days remaining: <strong>${plannerResults.daysRemaining} days</strong></p>
        <p>Total hours planned: <strong>${plannerResults.totalStudyHours} hours</strong></p>
        <p>Daily Commitment: <strong>${plannerResults.dailyTarget}</strong></p>
        
        <div class="milestones" style="margin-top:15px;">
          <h5>Roadmap Milestones:</h5>
          ${plannerResults.schedule.map(s => `
            <div class="milestone-block">
              <strong>${s.phase} (${s.duration})</strong>
              <p>${s.focus}</p>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  function renderConceptGraph() {
    const graphDiv = container.querySelector("#concept-svg-graph");
    if (!graphDiv) return;

    if (!pack || !pack.graph) {
      graphDiv.innerHTML = `<p>Connect a knowledge pack to view dependencies.</p>`;
      return;
    }

    const nodes = pack.graph.nodes || [];
    const edges = pack.graph.edges || [];

    let edgesSvg = "";
    edges.forEach(e => {
      const fromNode = nodes.find(n => n.id === e.from);
      const toNode = nodes.find(n => n.id === e.to);
      if (fromNode && toNode) {
        edgesSvg += `<line x1="${fromNode.x}" y1="${fromNode.y}" x2="${toNode.x}" y2="${toNode.y}" stroke="#CBD5E1" stroke-width="2" marker-end="url(#arrow)"/>`;
      }
    });

    let nodesSvg = "";
    nodes.forEach(n => {
      const userProg = progress[n.id];
      const status = userProg ? userProg.status : "Locked";
      
      let fillColor = "#94A3B8"; // Grey / Locked
      if (status === "Mastered") fillColor = "#22C55E"; // Green
      else if (status === "Learning") fillColor = "#F59E0B"; // Yellow/Orange
      else if (status === "Weak") fillColor = "#EF4444"; // Red

      nodesSvg += `
        <g class="graph-node-group" data-id="${n.id}" style="cursor: pointer;">
          <circle cx="${n.x}" cy="${n.y}" r="22" fill="${fillColor}" stroke="#FFFFFF" stroke-width="2" filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.1))"/>
          <text x="${n.x}" y="${n.y + 4}" font-size="8" fill="#FFFFFF" text-anchor="middle" font-weight="bold">${n.label.substring(0, 8)}</text>
        </g>
      `;
    });

    graphDiv.innerHTML = `
      <svg viewBox="0 0 800 400" width="100%" height="250" style="background:#F8FAFC; border-radius:12px;">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#CBD5E1" />
          </marker>
        </defs>
        ${edgesSvg}
        ${nodesSvg}
      </svg>
    `;

    // Hook node groups
    graphDiv.querySelectorAll(".graph-node-group").forEach(group => {
      group.addEventListener("click", () => {
        const id = group.getAttribute("data-id");
        router.navigate("lesson", { conceptId: id });
      });
    });
  }

  render();
}
