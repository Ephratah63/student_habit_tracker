// CORE DESIGNING YOUR LIFE DASHBOARD ENGINE LOGIC
// ==========================================================================

// Global State
let lifeTasks = JSON.parse(localStorage.getItem("life_tasks")) || [];
let historicalCycles =
  JSON.parse(localStorage.getItem("life_history_snapshots")) || [];

// Current Goal Matrix Targets configuration
const currentGoals = { work: 95, health: 90, love: 70, play: 40 };

// 1. Core Priority Daily Reset Scheduler Trigger Engine
function checkDailyReset() {
  const lastResetDate = localStorage.getItem("last_routine_reset_date");
  const todayString = new Date().toDateString();

  if (lastResetDate !== todayString) {
    // A new day has passed! Reset completion states for recurring priority items
    lifeTasks.forEach((task) => {
      if (task.isPriorityRecurring) {
        task.completed = false;
      }
    });
    localStorage.setItem("last_routine_reset_date", todayString);
    saveAndRenderDashboard();
  }
}

// 2. Analytical Percentage Calculator Engine
function calculateGauges() {
  const categories = ["work", "health", "love", "play"];

  categories.forEach((cat) => {
    // Filter tasks that match the specific core design life categories
    const catTasks = lifeTasks.filter((t) => t.category.toLowerCase() === cat);
    const completedCatTasks = catTasks.filter((t) => t.completed);

    let percentage = 0;
    if (catTasks.length > 0) {
      percentage = Math.round(
        (completedCatTasks.length / catTasks.length) * 100,
      );
    }

    // Update active DOM elements interface values dynamically
    const card = document.querySelector(`.gauge_card[data-category="${cat}"]`);
    if (card) {
      card.querySelector(".active_progress").style.width = `${percentage}%`;
      card.querySelector(".current_val").innerText = `${percentage}%`;

      // Dynamic metric indicator shift adjustment: turns green if goal is surpassed
      if (percentage >= currentGoals[cat]) {
        card.querySelector(".active_progress").style.background = "#2e7d32"; // Healthy achievement green
      } else {
        card.querySelector(".active_progress").style.background = "#51e2f5"; // Standard slate neon theme
      }
    }
  });
}

// 3. Cycle Data Snapshot Capturer
function saveCycleSnapshot() {
  const categories = ["work", "health", "love", "play"];
  const snapshotData = {
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    metrics: {},
  };

  categories.forEach((cat) => {
    const catTasks = lifeTasks.filter((t) => t.category.toLowerCase() === cat);
    const completed = catTasks.filter((t) => t.completed).length;
    snapshotData.metrics[cat] =
      catTasks.length > 0 ? Math.round((completed / catTasks.length) * 100) : 0;
  });

  // Save array index state histories list entries dynamically
  historicalCycles.push(snapshotData);
  localStorage.setItem(
    "life_history_snapshots",
    JSON.stringify(historicalCycles),
  );
  renderHistoryTimeline();
}

// 4. Render Log Component UI Views builder
function renderHistoryTimeline() {
  const container = document.getElementById("history_timeline_log");
  if (!container) return;

  if (historicalCycles.length === 0) {
    container.innerHTML = `<p class="empty_log_msg">No historical cycles logged yet. Click Snapshot to start tracking trends!</p>`;
    return;
  }

  container.innerHTML = historicalCycles
    .map(
      (cycle, idx) => `
    <div class="history_snapshot_card">
      <h4>Cycle Log #${idx + 1}</h4>
      <small style="color:#757575;">Saved: ${cycle.date}</small>
      <hr style="border:none; border-top:1px solid rgba(0,0,0,0.1); margin:0.5em 0;" />
      <ul>
        <li><span>💼 Work:</span> <strong>${cycle.metrics.work}%</strong></li>
        <li><span>❤️ Health:</span> <strong>${cycle.metrics.health}%</strong></li>
        <li><span>✨ Love:</span> <strong>${cycle.metrics.love}%</strong></li>
        <li><span>🎮 Play:</span> <strong>${cycle.metrics.play}%</strong></li>
      </ul>
    </div>
  `,
    )
    .join("");
}

// Helper state sync utilities
function saveAndRenderDashboard() {
  localStorage.setItem("life_tasks", JSON.stringify(lifeTasks));
  calculateGauges();
}

// 5. Initializers Hook Listener bindings Setup
document.addEventListener("DOMContentLoaded", () => {
  checkDailyReset();
  calculateGauges();
  renderHistoryTimeline();

  const snapshotBtn = document.getElementById("snapshot_cycle_btn");
  if (snapshotBtn) {
    snapshotBtn.addEventListener("click", saveCycleSnapshot);
  }
});
