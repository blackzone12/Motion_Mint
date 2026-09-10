// Analytics, Heatmap & Progress Visualizer for MotionMint
// Generates GitHub-style habit heatmap, interactive canvas trend charts, and consistency metrics

import { store } from './state.js';

export class AnalyticsManager {
  constructor(containerEl) {
    this.container = containerEl;
  }

  render() {
    if (!this.container) return;

    const state = store.getState();
    const plan = state.plan;
    const dailyLogs = state.dailyLogs;

    // Calculate adherence stats
    const stats = this.calculateAdherenceStats(dailyLogs, plan);

    this.container.innerHTML = `
      <div class="analytics-view-wrap">
        <div class="analytics-header">
          <div>
            <h2 class="view-title">📈 Behavioral Analytics & Heatmap</h2>
            <p class="view-subtitle">Visualizing your neural rewiring, consistency streaks, and habit adherence.</p>
          </div>
        </div>

        <!-- High-level Stats Cards -->
        <div class="stats-overview-grid">
          <div class="stat-card glass-panel">
            <span class="stat-icon">🔥</span>
            <div class="stat-meta">
              <span class="stat-num">${state.currentStreak || 1} Days</span>
              <span class="stat-title">Current Streak</span>
            </div>
          </div>

          <div class="stat-card glass-panel">
            <span class="stat-icon">🏆</span>
            <div class="stat-meta">
              <span class="stat-num">${state.longestStreak || 1} Days</span>
              <span class="stat-title">Longest Streak</span>
            </div>
          </div>

          <div class="stat-card glass-panel">
            <span class="stat-icon">⚡</span>
            <div class="stat-meta">
              <span class="stat-num">${stats.consistencyRate}%</span>
              <span class="stat-title">Habit Consistency (Last 30D)</span>
            </div>
          </div>

          <div class="stat-card glass-panel">
            <span class="stat-icon">🌟</span>
            <div class="stat-meta">
              <span class="stat-num">${state.xp || 0} XP</span>
              <span class="stat-title">Level ${state.level || 1} Architect</span>
            </div>
          </div>
        </div>

        <!-- 365-Day GitHub Style Heatmap -->
        <div class="heatmap-card glass-panel">
          <div class="heatmap-header">
            <h3>🗓 365-Day Habit & Workout Heatmap</h3>
            <div class="heatmap-legend">
              <span>Less</span>
              <span class="legend-cell lvl-0"></span>
              <span class="legend-cell lvl-1"></span>
              <span class="legend-cell lvl-2"></span>
              <span class="legend-cell lvl-3"></span>
              <span class="legend-cell lvl-4"></span>
              <span>More</span>
            </div>
          </div>
          <div class="heatmap-scroll-container" id="heatmap-grid-container"></div>
        </div>

        <!-- Progress Trend Chart (Canvas) -->
        <div class="trend-chart-card glass-panel">
          <div class="chart-header">
            <h3>📊 30-Day Adherence & Body Trajectory</h3>
            <span class="chart-tag">Progressive Habit Load</span>
          </div>
          <div class="canvas-chart-wrapper">
            <canvas id="progress-trend-canvas" width="800" height="260"></canvas>
          </div>
        </div>

        <!-- Identity & Milestones -->
        <div class="achievements-card glass-panel">
          <h3>🎖 Behavioral Identity Badges</h3>
          <div class="badges-grid">
            <div class="badge-item ${state.currentStreak >= 1 ? 'unlocked' : 'locked'}">
              <span class="badge-icon">🌱</span>
              <span class="badge-name">First Anchor</span>
              <span class="badge-desc">Completed your first atomic habit</span>
            </div>
            <div class="badge-item ${state.currentStreak >= 3 ? 'unlocked' : 'locked'}">
              <span class="badge-icon">⚡</span>
              <span class="badge-name">3-Day Spark</span>
              <span class="badge-desc">Maintained 3-day consecutive consistency</span>
            </div>
            <div class="badge-item ${state.currentStreak >= 7 ? 'unlocked' : 'locked'}">
              <span class="badge-icon">🛡️</span>
              <span class="badge-name">The 7-Day Armor</span>
              <span class="badge-desc">Crushed an entire week without breaking the chain</span>
            </div>
            <div class="badge-item ${state.currentStreak >= 21 ? 'unlocked' : 'locked'}">
              <span class="badge-icon">🧠</span>
              <span class="badge-name">Neural Rewired</span>
              <span class="badge-desc">21 Days of automated habit reflex</span>
            </div>
          </div>
        </div>
      </div>
    `;

    this.renderHeatmap();
    this.renderTrendCanvas();
  }

  calculateAdherenceStats(dailyLogs, plan) {
    const today = new Date();
    let totalPossibleHabits = 0;
    let completedHabits = 0;
    const planHabitCount = (plan?.habits || []).length || 4;

    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = this.formatDate(d);
      const log = dailyLogs[key];

      totalPossibleHabits += planHabitCount;
      if (log && log.habits) {
        completedHabits += Object.values(log.habits).filter(v => v === true).length;
      }
    }

    const rate = totalPossibleHabits > 0 ? Math.round((completedHabits / totalPossibleHabits) * 100) : 85;
    return {
      consistencyRate: Math.max(10, rate)
    };
  }

  formatDate(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  renderHeatmap() {
    const container = this.container.querySelector('#heatmap-grid-container');
    if (!container) return;

    const state = store.getState();
    const dailyLogs = state.dailyLogs;

    // Build 52 weeks (364 days ending today)
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sun) to 6 (Sat)
    const totalDays = 52 * 7;
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - totalDays + (6 - dayOfWeek));

    const weeks = [];
    let currentWeek = [];

    let loopDate = new Date(startDate);
    for (let i = 0; i < totalDays; i++) {
      const dateKey = this.formatDate(loopDate);
      const log = dailyLogs[dateKey];

      let level = 0;
      let count = 0;
      if (log) {
        const habitCount = log.habits ? Object.values(log.habits).filter(Boolean).length : 0;
        const hasWorkout = log.workout && log.workout.completed ? 2 : 0;
        count = habitCount + hasWorkout;

        if (count >= 5) level = 4;
        else if (count >= 3) level = 3;
        else if (count >= 2) level = 2;
        else if (count >= 1) level = 1;
      }

      currentWeek.push({
        date: dateKey,
        level,
        count
      });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      loopDate.setDate(loopDate.getDate() + 1);
    }

    container.innerHTML = `
      <div class="heatmap-grid">
        ${weeks.map(week => `
          <div class="heatmap-col">
            ${week.map(day => `
              <div class="heatmap-cell lvl-${day.level}" title="${day.date}: ${day.count} actions completed" data-date="${day.date}"></div>
            `).join('')}
          </div>
        `).join('')}
      </div>
    `;
  }

  renderTrendCanvas() {
    const canvas = this.container.querySelector('#progress-trend-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;

    ctx.clearRect(0, 0, width, height);

    // Mock / Real 30-day data points
    const points = [];
    const state = store.getState();
    const userWeight = state.user?.weightKg || 78;
    const targetWeight = state.user?.targetWeightKg || 72;

    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = this.formatDate(d);
      const log = state.dailyLogs[key];
      const habitsDone = log?.habits ? Object.values(log.habits).filter(Boolean).length : 0;
      const workoutDone = log?.workout?.completed ? 1 : 0;

      // Simulated weight curve moving towards target
      const progressRatio = (30 - i) / 30;
      const currentSimWeight = +(userWeight + (targetWeight - userWeight) * progressRatio * 0.4).toFixed(1);

      points.push({
        day: i === 0 ? 'Today' : `${30 - i}d`,
        score: Math.min(100, (habitsDone * 20) + (workoutDone * 30) + 20),
        weight: currentSimWeight
      });
    }

    // Draw background grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 1;
    for (let y = padding; y <= height - padding; y += 40) {
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw Adherence Area (Smooth Curve)
    const stepX = (width - padding * 2) / (points.length - 1);
    const getY = (score) => height - padding - (score / 100) * (height - padding * 2);

    // Gradient fill
    const grad = ctx.createLinearGradient(0, padding, 0, height - padding);
    grad.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
    grad.addColorStop(1, 'rgba(16, 185, 129, 0.00)');

    ctx.beginPath();
    ctx.moveTo(padding, getY(points[0].score));

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const x0 = padding + i * stepX;
      const y0 = getY(p0.score);
      const x1 = padding + (i + 1) * stepX;
      const y1 = getY(p1.score);

      const midX = (x0 + x1) / 2;
      ctx.bezierCurveTo(midX, y0, midX, y1, x1, y1);
    }

    ctx.lineTo(width - padding, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Line stroke
    ctx.beginPath();
    ctx.moveTo(padding, getY(points[0].score));
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const x0 = padding + i * stepX;
      const y0 = getY(p0.score);
      const x1 = padding + (i + 1) * stepX;
      const y1 = getY(p1.score);
      const midX = (x0 + x1) / 2;
      ctx.bezierCurveTo(midX, y0, midX, y1, x1, y1);
    }
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw data point dots
    points.forEach((p, idx) => {
      if (idx % 3 === 0 || idx === points.length - 1) {
        const x = padding + idx * stepX;
        const y = getY(p.score);

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#06b6d4';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
  }
}
