// Habit Manager & Behavioral Matrix Component for MotionMint
// Handles habit check-offs, habit stacking, custom habit additions, and time-slot groupings

import { HABIT_DATABASE, HABIT_CATEGORIES, TIME_SLOTS } from './data/habits.js';
import { sound } from './sound.js';
import { store } from './state.js';

export class HabitManager {
  constructor(containerEl) {
    this.container = containerEl;
  }

  render(dateStr = store.getState().selectedDate) {
    if (!this.container) return;

    const state = store.getState();
    const plan = state.plan;
    const dailyLog = store.getDailyLog(dateStr);

    if (!plan || !plan.habits || plan.habits.length === 0) {
      this.container.innerHTML = `
        <div class="empty-state glass-panel">
          <p>No active habit plan found. Run the diagnostic onboarding wizard to generate your customized blueprint!</p>
        </div>
      `;
      return;
    }

    // Group habits by Time Slots
    const grouped = {
      morning: [],
      afternoon: [],
      pre_post: [],
      evening: [],
      anytime: []
    };

    plan.habits.forEach(habit => {
      const slot = habit.timeSlot || 'anytime';
      if (grouped[slot]) {
        grouped[slot].push(habit);
      } else {
        grouped.anytime.push(habit);
      }
    });

    let totalHabits = plan.habits.length;
    let completedCount = 0;
    plan.habits.forEach(h => {
      if (dailyLog.habits && dailyLog.habits[h.id]) {
        completedCount++;
      }
    });

    const completionRate = totalHabits > 0 ? Math.round((completedCount / totalHabits) * 100) : 0;

    this.container.innerHTML = `
      <div class="habit-matrix-wrap">
        <div class="habit-section-header">
          <div class="habit-header-left">
            <h3 class="section-title">⚡ Daily Atomic Habit Stack</h3>
            <span class="habit-completion-pill ${completionRate === 100 ? 'all-done' : ''}">
              ${completedCount}/${totalHabits} Completed (${completionRate}%)
            </span>
          </div>
          <button class="btn-outline-small" id="btn-open-habit-lab">
            + Customize Habits
          </button>
        </div>

        <div class="habit-slots-container">
          ${Object.entries(TIME_SLOTS).map(([slotKey, slotInfo]) => {
            const slotHabits = grouped[slotInfo.id] || [];
            if (slotHabits.length === 0) return '';

            return `
              <div class="time-slot-block">
                <div class="time-slot-title">
                  <span class="slot-icon">${slotInfo.icon}</span>
                  <span class="slot-label">${slotInfo.label}</span>
                </div>

                <div class="habit-cards-grid">
                  ${slotHabits.map(habit => {
                    const isDone = dailyLog.habits && dailyLog.habits[habit.id];
                    const cat = HABIT_CATEGORIES[habit.category?.toUpperCase()] || HABIT_CATEGORIES.MOVEMENT;

                    return `
                      <div class="habit-card glass-panel ${isDone ? 'is-completed' : ''}" data-habit-id="${habit.id}">
                        <button class="habit-checkbox ${isDone ? 'checked' : ''}" data-habit-id="${habit.id}">
                          ${isDone ? '✓' : ''}
                        </button>

                        <div class="habit-card-content">
                          <div class="habit-card-top">
                            <span class="habit-cat-tag" style="background: ${cat.color}22; color: ${cat.color}">
                              ${cat.icon} ${cat.name}
                            </span>
                            <span class="habit-xp-tag">+${habit.xp || 25} XP</span>
                          </div>

                          <h4 class="habit-title">${habit.title}</h4>
                          <p class="habit-desc">${habit.desc}</p>

                          ${habit.cue ? `
                            <div class="habit-cue-badge">
                              <span class="cue-label">Anchor Trigger:</span> ${habit.cue}
                            </div>
                          ` : ''}
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    this.attachEventListeners(dateStr);
  }

  attachEventListeners(dateStr) {
    // Checkbox toggling
    this.container.querySelectorAll('.habit-checkbox, .habit-card').forEach(el => {
      el.addEventListener('click', (e) => {
        // If clicking inside description, prevent duplicate triggers
        const habitId = el.dataset.habitId || el.closest('[data-habit-id]')?.dataset.habitId;
        if (habitId) {
          e.stopPropagation();
          const isDone = store.toggleHabit(habitId, dateStr);
          if (isDone) {
            sound.playHabitComplete();
          } else {
            sound.playTap();
          }
          this.render(dateStr);
        }
      });
    });

    // Open Habit Lab modal
    const btnLab = this.container.querySelector('#btn-open-habit-lab');
    if (btnLab) {
      btnLab.addEventListener('click', () => {
        this.openHabitLabModal();
      });
    }
  }

  openHabitLabModal() {
    const state = store.getState();
    const currentHabitIds = new Set((state.plan?.habits || []).map(h => h.id));

    const modal = document.createElement('div');
    modal.className = 'modal-backdrop active';
    modal.id = 'habit-lab-modal';

    modal.innerHTML = `
      <div class="modal-dialog glass-panel max-w-lg">
        <div class="modal-header">
          <h3>🧪 Habit Laboratory & Stacking Builder</h3>
          <button class="btn-close-modal" id="btn-close-habit-modal">✕</button>
        </div>

        <div class="modal-tabs">
          <button class="modal-tab-btn active" data-tab="library">Evidence-Based Library</button>
          <button class="modal-tab-btn" data-tab="custom">Build Custom Stack</button>
        </div>

        <div class="modal-tab-content active" id="tab-library">
          <p class="tab-explainer">Add or swap evidence-based behavioral micro-habits into your active daily plan:</p>
          <div class="habit-library-list">
            ${HABIT_DATABASE.map(habit => {
              const isAdded = currentHabitIds.has(habit.id);
              return `
                <div class="lib-habit-item">
                  <div class="lib-item-info">
                    <span class="lib-item-title">${habit.title}</span>
                    <span class="lib-item-desc">${habit.desc}</span>
                    <span class="lib-item-cue">⚓ Cue: ${habit.cue}</span>
                  </div>
                  <button class="btn-lib-toggle ${isAdded ? 'btn-remove' : 'btn-add'}" data-lib-id="${habit.id}">
                    ${isAdded ? 'Remove' : '+ Add'}
                  </button>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="modal-tab-content" id="tab-custom">
          <form id="form-custom-habit" class="custom-habit-form">
            <div class="form-group">
              <label>Habit Name / Action</label>
              <input type="text" id="cust-title" placeholder="e.g. 10 Deep Diaphragmatic Breaths" required />
            </div>

            <div class="form-group">
              <label>Habit Stacking Formula ("After I [Current Cue], I will [Action]")</label>
              <input type="text" id="cust-cue" placeholder="e.g. After I pour my morning coffee..." required />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Time of Day</label>
                <select id="cust-time">
                  <option value="morning">Morning Anchor</option>
                  <option value="afternoon">Mid-Day Anchor</option>
                  <option value="pre_post">Workout Stack</option>
                  <option value="evening">Evening Wind-Down</option>
                  <option value="anytime">Anytime / Baseline</option>
                </select>
              </div>

              <div class="form-group">
                <label>Category</label>
                <select id="cust-category">
                  <option value="movement">Physical Movement</option>
                  <option value="hydration">Hydration & Fuel</option>
                  <option value="nutrition">Mindful Nutrition</option>
                  <option value="sleep">Sleep & Recovery</option>
                  <option value="mindset">Mindset & Focus</option>
                </select>
              </div>
            </div>

            <button type="submit" class="btn-primary-large">
              ✨ Save & Add Custom Habit
            </button>
          </form>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Tab switching
    modal.querySelectorAll('.modal-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        modal.querySelectorAll('.modal-tab-btn').forEach(b => b.classList.remove('active'));
        modal.querySelectorAll('.modal-tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        const tabId = btn.dataset.tab;
        modal.querySelector(`#tab-${tabId}`).classList.add('active');
        sound.playTap();
      });
    });

    // Close
    const close = () => {
      modal.remove();
      this.render();
    };
    modal.querySelector('#btn-close-modal')?.addEventListener('click', close);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });

    // Library toggle
    modal.querySelectorAll('.btn-lib-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const habitId = btn.dataset.libId;
        const habitObj = HABIT_DATABASE.find(h => h.id === habitId);
        if (!habitObj) return;

        store.updateState(state => {
          if (!state.plan) return state;
          const current = state.plan.habits || [];
          const exists = current.some(h => h.id === habitId);
          const newHabits = exists 
            ? current.filter(h => h.id !== habitId)
            : [...current, habitObj];

          return {
            ...state,
            plan: {
              ...state.plan,
              habits: newHabits
            }
          };
        }, 'habit_library_updated');

        sound.playTap();
        // Update button visual
        const isAddedNow = !btn.classList.contains('btn-remove');
        btn.className = `btn-lib-toggle ${isAddedNow ? 'btn-remove' : 'btn-add'}`;
        btn.textContent = isAddedNow ? 'Remove' : '+ Add';
      });
    });

    // Custom form submit
    const customForm = modal.querySelector('#form-custom-habit');
    if (customForm) {
      customForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = modal.querySelector('#cust-title').value.trim();
        const cue = modal.querySelector('#cust-cue').value.trim();
        const timeSlot = modal.querySelector('#cust-time').value;
        const category = modal.querySelector('#cust-category').value;

        if (title && cue) {
          store.addCustomHabit({
            title,
            desc: `Stacked after: ${cue}`,
            cue,
            timeSlot,
            category,
            impact: 'High',
            difficulty: 'Easy'
          });
          sound.playHabitComplete();
          close();
        }
      });
    }
  }
}
