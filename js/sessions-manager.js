// Workout Sessions Management Component for MotionMint
// Handles Active Sessions, Upcoming Schedule, and Completed Session History Logs

import { store } from './state.js';
import { sound } from './sound.js';

export class SessionsManager {
  constructor(containerEl, appController) {
    this.container = containerEl;
    this.app = appController;
    this.activeTab = 'upcoming'; // 'upcoming' | 'history'
  }

  render() {
    if (!this.container) return;

    const state = store.getState();
    const plan = state.plan;
    const dailyLogs = state.dailyLogs || {};

    // Extract all completed sessions from dailyLogs
    const completedSessions = [];
    Object.entries(dailyLogs).forEach(([dateStr, log]) => {
      if (log.workout && log.workout.completed) {
        completedSessions.push({
          date: dateStr,
          ...log.workout
        });
      }
    });

    // Sort completed sessions descending (newest first)
    completedSessions.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Weekly upcoming schedule
    const weeklySchedule = plan?.weeklySchedule || [];

    // Calculate total workout stats
    const totalWorkouts = completedSessions.length;
    const totalMinutes = completedSessions.reduce((acc, s) => acc + (s.durationMinutes || 30), 0);
    const totalVolume = completedSessions.reduce((acc, s) => acc + (s.totalVolume || 0), 0);

    this.container.innerHTML = `
      <div class="sessions-view-wrap">
        <div class="sessions-header">
          <div>
            <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; margin-bottom: 0.3rem;">
              <h2 class="view-title">🏋️ Workout Sessions Center</h2>
              <span style="font-size: 0.75rem; padding: 0.2rem 0.6rem; border-radius: 999px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); color: #34d399; font-weight: 700;">
                🔒 Offline Storage Engine Active (No Login Required)
              </span>
            </div>
            <p class="view-subtitle">Your workouts, logged weights, and rep counts are automatically preserved across Chrome, Brave, Edge & Safari.</p>
          </div>

          <div class="sessions-stats-bar glass-panel">
            <div class="sess-stat">
              <span class="sess-stat-val">${totalWorkouts}</span>
              <span class="sess-stat-lbl">Completed Sessions</span>
            </div>
            <div class="sess-stat">
              <span class="sess-stat-val">${totalMinutes} min</span>
              <span class="sess-stat-lbl">Total Time Trained</span>
            </div>
            <div class="sess-stat">
              <span class="sess-stat-val">${totalVolume > 0 ? (totalVolume + ' kg') : '--'}</span>
              <span class="sess-stat-lbl">Total Volume Load</span>
            </div>
          </div>
        </div>

        <!-- Sessions Subtabs & Backup Controls -->
        <div class="sessions-tabs-row" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button class="sess-tab-btn ${this.activeTab === 'upcoming' ? 'active' : ''}" data-tab="upcoming">
              📅 Active & Upcoming Week (${weeklySchedule.filter(d => !d.isRest).length} Workouts)
            </button>
            <button class="sess-tab-btn ${this.activeTab === 'history' ? 'active' : ''}" data-tab="history">
              📜 Completed Sessions History (${totalWorkouts})
            </button>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button type="button" class="btn-outline-small" id="btn-export-sessions-backup" title="Export workout records to JSON file" style="font-size: 0.78rem; padding: 0.35rem 0.65rem;">
              📥 Export JSON Backup
            </button>
          </div>
        </div>

        <!-- Tab 1: Upcoming Schedule -->
        <div class="sess-tab-panel ${this.activeTab === 'upcoming' ? 'active' : ''}" id="panel-upcoming">
          <div class="upcoming-sessions-grid">
            ${weeklySchedule.map((dayItem, idx) => {
              const workout = dayItem.workout;
              return `
                <div class="session-card glass-panel ${dayItem.isRest ? 'is-rest' : ''}">
                  <div class="sess-card-header">
                    <span class="day-badge">${dayItem.day}</span>
                    <span class="sess-type-pill">${dayItem.isRest ? '🌱 Rest & Step Day' : (workout?.type || 'Strength')}</span>
                  </div>

                  <h3 class="sess-card-title">${dayItem.isRest ? 'Active Recovery & Mobility' : workout?.name}</h3>
                  
                  ${dayItem.isRest ? `
                    <p class="sess-desc">Maintain 8,000+ gentle steps and full hydration. Allow central nervous system recovery.</p>
                  ` : `
                    <div class="sess-muscles-row">
                      <span>Target:</span>
                      ${(workout?.targetMuscles || []).map(m => `<span class="muscle-tag">${m}</span>`).join('')}
                    </div>

                    <div class="sess-exercises-list">
                      ${(workout?.exercises || []).map((ex, i) => `
                        <div class="sess-ex-row">
                          <span class="ex-bullet">${i + 1}.</span>
                          <span class="ex-name-txt">${ex.name.split('/')[0]}</span>
                          <span class="ex-sets-txt">${ex.defaultSets || 3} sets × ${ex.defaultReps || '10-12'}</span>
                        </div>
                      `).join('')}
                    </div>

                    <div class="sess-card-actions">
                      <button class="btn-primary-large btn-launch-session" data-day-idx="${idx}">
                        🔥 Start Session (${workout?.estMinutes || 30}m)
                      </button>
                      <button class="btn-med-action btn-launch-med" data-day-idx="${idx}">
                        ⚡ 10-Min MED Express
                      </button>
                    </div>
                  `}
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Tab 2: Completed History -->
        <div class="sess-tab-panel ${this.activeTab === 'history' ? 'active' : ''}" id="panel-history">
          ${completedSessions.length === 0 ? `
            <div class="empty-history glass-panel">
              <span class="empty-icon">📝</span>
              <h3>No Completed Sessions Yet</h3>
              <p>Start today's session from the dashboard or upcoming tab to log your weights, sets, and volume!</p>
              <div style="margin-top: 1rem; font-size: 0.82rem; color: #10b981; background: rgba(16, 185, 129, 0.1); padding: 0.5rem 1rem; border-radius: var(--radius-sm); border: 1px solid rgba(16, 185, 129, 0.3);">
                🔒 <strong>100% Offline Multi-Engine Storage:</strong> All logged workouts remain permanently on this browser without requiring account registration.
              </div>
            </div>
          ` : `
            <div class="history-list">
              ${completedSessions.map(sess => `
                <div class="history-item-card glass-panel">
                  <div class="hist-top-row">
                    <div>
                      <span class="hist-date">${this.formatDate(sess.date)}</span>
                      <h4 class="hist-name">${sess.name} ${sess.isMed ? '<span class="badge-med-mini">10-Min MED</span>' : ''}</h4>
                    </div>
                    <div class="hist-metrics">
                      <span class="hist-chip">⏱️ ${sess.durationMinutes || 30} min</span>
                      <span class="hist-chip">🔢 ${sess.completedSetsCount || 0} sets</span>
                      ${sess.totalVolume > 0 ? `<span class="hist-chip highlight">🏋️ ${sess.totalVolume} kg volume</span>` : ''}
                    </div>
                  </div>

                  ${sess.exercisesLogged ? `
                    <div class="hist-logged-details">
                      <span class="details-title">Logged Sets & Weights:</span>
                      <div class="hist-sets-summary">
                        ${Object.entries(sess.exercisesLogged).map(([exIdx, sets]) => {
                          const completedInEx = sets.filter(s => s.completed);
                          if (completedInEx.length === 0) return '';
                          return `
                            <span class="hist-set-badge">
                              Ex ${parseInt(exIdx) + 1}: ${completedInEx.map(s => `${s.weight > 0 ? s.weight + 'kg × ' : ''}${s.reps}r`).join(', ')}
                            </span>
                          `;
                        }).join('')}
                      </div>
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  attachEventListeners() {
    // Tab switching
    this.container.querySelectorAll('.sess-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeTab = btn.dataset.tab;
        sound.playTap();
        this.render();
      });
    });

    // Launch upcoming session
    this.container.querySelectorAll('.btn-launch-session').forEach(btn => {
      btn.addEventListener('click', () => {
        const dayIdx = parseInt(btn.dataset.dayIdx);
        const state = store.getState();
        const workout = state.plan?.weeklySchedule?.[dayIdx]?.workout;
        if (workout && this.app?.workoutPlayer) {
          this.app.workoutPlayer.startWorkout(workout, false);
        }
      });
    });

    // Launch MED session
    this.container.querySelectorAll('.btn-launch-med').forEach(btn => {
      btn.addEventListener('click', () => {
        const dayIdx = parseInt(btn.dataset.dayIdx);
        const state = store.getState();
        const workout = state.plan?.weeklySchedule?.[dayIdx]?.workout;
        if (workout && this.app?.workoutPlayer) {
          this.app.workoutPlayer.startWorkout(workout, true);
        }
      });
    });

    // Export JSON Backup
    document.getElementById('btn-export-sessions-backup')?.addEventListener('click', () => {
      const json = store.exportBackupJson();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `MotionMint_WorkoutRecords_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      sound.playFanfare();
    });
  }

  formatDate(isoStr) {
    const d = new Date(isoStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  }
}
