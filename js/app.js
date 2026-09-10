import { store } from './state.js';
import { PlanGenerator } from './generator.js';
import { WorkoutPlayer } from './workout-player.js';
import { HabitManager } from './habit-manager.js';
import { AnalyticsManager } from './analytics.js';
import { ResetCoach } from './coach.js';
import { FoodsManager } from './foods-manager.js';
import { SessionsManager } from './sessions-manager.js';
import { PdfBlueprintGenerator } from './pdf-generator.js';
import { CustomGoalEngine } from './data/custom-goal-engine.js';
import { sound } from './sound.js';
import { GOALS, OBSTACLES, TIMEFRAMES } from './data/presets.js';
import { EXERCISE_DATABASE, EXERCISE_TIERS, ExercisePrescriptionEngine, BODY_PROBLEMS, PROBLEM_METADATA } from './data/exercises.js';

class MotionMintApp {
  constructor() {
    this.currentView = 'dashboard';
    this.workoutPlayer = null;
    this.habitManager = null;
    this.analyticsManager = null;
    this.resetCoach = null;
    this.foodsManager = null;
    this.sessionsManager = null;
  }

  init() {
    this.cacheDom();
    this.initControllers();
    this.bindEvents();

    const state = store.getState();
    // If not onboarded or no plan, start onboarding
    if (!state.isOnboarded || !state.plan) {
      this.startOnboarding();
    } else {
      this.render();
    }

    // Subscribe to state changes for live UI updates
    store.subscribe((newState, changeType) => {
      this.updateHeaderStats(newState);
      if (['date_change', 'habit_toggle', 'workout_completed', 'habit_added', 'reset', 'imported', 'plan_generated'].includes(changeType)) {
        if (this.currentView === 'dashboard') {
          this.renderDashboard();
        } else if (this.currentView === 'analytics') {
          this.analyticsManager?.render();
        } else if (this.currentView === 'sessions') {
          this.sessionsManager?.render();
        }
      }
    });
  }

  cacheDom() {
    this.headerEl = document.getElementById('app-header');
    this.mainContentEl = document.getElementById('main-content');
    this.workoutOverlayEl = document.getElementById('workout-overlay-container');
    this.navLinks = document.querySelectorAll('.nav-link');
  }

  initControllers() {
    this.workoutPlayer = new WorkoutPlayer(this.workoutOverlayEl);
    this.habitManager = new HabitManager(null);
    this.analyticsManager = new AnalyticsManager(null);
    this.resetCoach = new ResetCoach(null, this);
    this.foodsManager = new FoodsManager(null);
    this.sessionsManager = new SessionsManager(null, this);
  }

  bindEvents() {
    // Navigation items
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const view = link.dataset.view;
        this.switchView(view);
        sound.playTap();
      });
    });

    // Sound mute toggle
    const btnMute = document.getElementById('btn-toggle-sound');
    if (btnMute) {
      btnMute.addEventListener('click', () => {
        const isMuted = sound.toggleMute();
        btnMute.textContent = isMuted ? '🔇' : '🔊';
      });
    }

    // New Plan / Re-onboard
    const btnReplan = document.getElementById('btn-replan');
    if (btnReplan) {
      btnReplan.addEventListener('click', () => {
        this.startOnboarding();
      });
    }

    // 7-Page PDF Blueprint Download
    const btnPdf = document.getElementById('btn-open-pdf');
    if (btnPdf) {
      btnPdf.addEventListener('click', () => {
        const state = store.getState();
        if (state.plan) {
          PdfBlueprintGenerator.openPrintPreview(state.plan, state.user);
        }
      });
    }

    // Inbuild Floating Scroll Controller (Up & Down Arrows)
    const btnScrollTop = document.getElementById('btn-scroll-top');
    const btnScrollBottom = document.getElementById('btn-scroll-bottom');

    if (btnScrollTop) {
      btnScrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        sound.playTap();
      });
    }

    if (btnScrollBottom) {
      btnScrollBottom.addEventListener('click', () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        sound.playTap();
      });
    }
  }

  switchView(viewName) {
    this.currentView = viewName;
    this.navLinks.forEach(l => {
      l.classList.toggle('active', l.dataset.view === viewName);
    });

    this.render();
  }

  render() {
    this.updateHeaderStats(store.getState());

    switch (this.currentView) {
      case 'dashboard':
        this.renderDashboard();
        break;
      case 'sessions':
        this.renderSessions();
        break;
      case 'foods':
        this.renderFoods();
        break;
      case 'roadmap':
        this.renderRoadmap();
        break;
      case 'analytics':
        this.renderAnalytics();
        break;
      case 'coach':
        this.renderCoach();
        break;
      case 'profile':
        this.renderProfile();
        break;
      default:
        this.renderDashboard();
    }
  }

  updateHeaderStats(state) {
    const elStreak = document.getElementById('header-streak-num');
    const elLevel = document.getElementById('header-level-num');
    const elXp = document.getElementById('header-xp-bar');

    if (elStreak) elStreak.textContent = state.currentStreak || 1;
    if (elLevel) elLevel.textContent = `Lvl ${state.level || 1}`;
    if (elXp) {
      const currentLevelXp = (state.xp || 0) % 250;
      const pct = Math.round((currentLevelXp / 250) * 100);
      elXp.style.width = `${pct}%`;
      elXp.title = `${currentLevelXp}/250 XP to Level ${(state.level || 1) + 1}`;
    }
  }

  // ==========================================
  // DASHBOARD VIEW
  // ==========================================
  renderDashboard() {
    const state = store.getState();
    const plan = state.plan;
    const user = state.user;
    if (!plan) return;

    const selectedDate = state.selectedDate;
    const dailyLog = store.getDailyLog(selectedDate);

    // Calculate ring metrics
    const totalHabits = (plan.habits || []).length || 1;
    const completedHabits = Object.values(dailyLog.habits || {}).filter(Boolean).length;
    const habitPct = Math.min(100, Math.round((completedHabits / totalHabits) * 100));

    const workoutCompleted = !!(dailyLog.workout && dailyLog.workout.completed);
    const workoutPct = workoutCompleted ? 100 : 0;

    const isToday = selectedDate === store.getTodayDateString();

    // Determine today's workout from weekly schedule
    const dayOfWeekIdx = (new Date(selectedDate).getDay() + 6) % 7; // Mon=0, Sun=6
    const todaySchedule = plan.weeklySchedule?.[dayOfWeekIdx] || plan.weeklySchedule?.[0];
    const todayWorkout = todaySchedule?.workout;
    const isRestDay = todaySchedule?.isRest;

    // Bodyweight and height metrics
    const totalChangeKg = +(user.targetWeightKg - user.weightKg).toFixed(1);
    const bmi = +(user.weightKg / Math.pow(user.heightCm / 100, 2)).toFixed(1);

    this.mainContentEl.innerHTML = `
      <div class="dashboard-grid">
        
        <!-- Out of the Box Custom Goal & Exercise Vault Action Banner -->
        <div class="custom-goal-banner glass-panel">
          <div class="banner-left">
            <span class="banner-icon">✨</span>
            <div>
              <h3 class="banner-title">Have an Out-of-the-Box Goal or Specific Body Problem?</h3>
              <p class="banner-desc">Different body problem == Different exercises. Type your goal or explore our 1,000+ indexed exercise vault!</p>
            </div>
          </div>
          <div class="banner-actions-group" style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button class="btn-custom-goal-prompt" id="btn-open-custom-goal-modal">
              ✍️ Customize Goal / Problems →
            </button>
            <button class="btn-vault-action" id="btn-open-exercise-vault" style="background: rgba(139, 92, 246, 0.2); border: 1px solid #8b5cf6; color: #c4b5fd; padding: 0.6rem 1rem; border-radius: var(--radius-sm); font-weight: 700; cursor: pointer; transition: var(--transition-fast);">
              📚 1,000+ Exercise Vault
            </button>
          </div>
        </div>

        <!-- Last Recorded Workout & Multi-Engine Offline Status -->
        ${state.lastCompletedWorkout ? `
          <div class="last-workout-record-card glass-panel" style="display: flex; justify-content: space-between; align-items: center; padding: 0.85rem 1.25rem; background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: var(--radius-md); flex-wrap: wrap; gap: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <div style="font-size: 1.4rem; background: rgba(16, 185, 129, 0.2); width: 40px; height: 40px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center;">🏆</div>
              <div>
                <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                  <span style="font-weight: 800; font-size: 0.95rem; color: #fff;">Last Recorded Workout: ${state.lastCompletedWorkout.name}</span>
                  <span style="font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 999px; background: rgba(16, 185, 129, 0.25); color: #34d399; font-weight: 700;">🔒 Saved in Browser Offline (No Login)</span>
                </div>
                <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.2rem;">
                  <span>📅 ${new Date(state.lastCompletedWorkout.completedAt || state.lastCompletedWorkout.date).toLocaleDateString()}</span> • 
                  <span>⏱️ ${state.lastCompletedWorkout.durationMinutes || 30} mins</span> • 
                  <span>🔢 ${state.lastCompletedWorkout.completedSetsCount || 0} sets logged</span>
                  ${state.lastCompletedWorkout.totalVolume > 0 ? `• <span>🏋️ ${state.lastCompletedWorkout.totalVolume} kg total volume</span>` : ''}
                </div>
              </div>
            </div>
            <button type="button" class="btn-outline-small" id="btn-view-workout-history" style="font-weight: 700; color: #34d399; border-color: rgba(16, 185, 129, 0.4); padding: 0.4rem 0.8rem;">
              📜 View Full History →
            </button>
          </div>
        ` : `
          <div class="last-workout-record-card glass-panel" style="display: flex; justify-content: space-between; align-items: center; padding: 0.65rem 1rem; background: rgba(15, 20, 34, 0.6); border: 1px solid var(--border-color); border-radius: var(--radius-md); flex-wrap: wrap; gap: 0.5rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 1.1rem;">🔒</span>
              <span style="font-size: 0.8rem; color: var(--text-secondary);">
                <strong style="color: #cbd5e1;">Multi-Engine Storage Active:</strong> All workouts, sets, and habit logs are automatically kept in your browser engine (Chrome/Brave/Edge/Safari) — <strong>100% private, no login required</strong>.
              </span>
            </div>
          </div>
        `}

        <!-- Top Command Bar: Date Selector & Trio Rings -->
        <div class="command-bar-card glass-panel">
          <div class="date-selector-row">
            <div class="date-nav-controls">
              <button class="btn-icon-nav" id="btn-prev-day">◀</button>
              <div class="current-date-info">
                <h2 class="date-heading">${this.formatDisplayDate(selectedDate)}</h2>
                <span class="date-subtag">${isToday ? '⚡ Today\'s Mission' : 'Selected Date Log'}</span>
              </div>
              <button class="btn-icon-nav" id="btn-next-day">▶</button>
            </div>

            <!-- Biometric Trajectory Chip -->
            <div class="biometric-trajectory-pill" title="Current Height: ${user.heightCm}cm | Weight: ${user.weightKg}kg | BMI: ${bmi}">
              <span>📏 ${user.heightCm}cm</span>
              <span>⚖️ ${user.weightKg} → ${user.targetWeightKg} kg (${totalChangeKg > 0 ? '+' : ''}${totalChangeKg}kg in ${user.timeframeMonths}m)</span>
            </div>

            <div class="streak-pill">
              <span class="streak-flame">🔥</span>
              <span class="streak-count">${state.currentStreak || 1} Day Streak</span>
            </div>
          </div>

          <!-- Apple Fitness Inspired Trio Activity Rings -->
          <div class="trio-rings-wrapper">
            <div class="ring-item">
              <div class="ring-svg-wrap">
                <svg class="ring-svg" viewBox="0 0 100 100">
                  <circle class="ring-bg" cx="50" cy="50" r="40" stroke="#10b98122" />
                  <circle class="ring-bar ring-green" cx="50" cy="50" r="40" 
                    stroke-dasharray="251.2" 
                    stroke-dashoffset="${251.2 - (251.2 * habitPct) / 100}" />
                </svg>
                <div class="ring-center-icon">⚡</div>
              </div>
              <div class="ring-meta">
                <span class="ring-label">Atomic Habits</span>
                <span class="ring-value">${completedHabits}/${totalHabits} Done</span>
              </div>
            </div>

            <div class="ring-item">
              <div class="ring-svg-wrap">
                <svg class="ring-svg" viewBox="0 0 100 100">
                  <circle class="ring-bg" cx="50" cy="50" r="40" stroke="#06b6d422" />
                  <circle class="ring-bar ring-cyan" cx="50" cy="50" r="40" 
                    stroke-dasharray="251.2" 
                    stroke-dashoffset="${251.2 - (251.2 * workoutPct) / 100}" />
                </svg>
                <div class="ring-center-icon">🏋️</div>
              </div>
              <div class="ring-meta">
                <span class="ring-label">Today's Workout</span>
                <span class="ring-value">${workoutCompleted ? 'Crushed ✓' : (isRestDay ? 'Active Rest' : 'Ready')}</span>
              </div>
            </div>

            <div class="ring-item">
              <div class="ring-svg-wrap">
                <svg class="ring-svg" viewBox="0 0 100 100">
                  <circle class="ring-bg" cx="50" cy="50" r="40" stroke="#f59e0b22" />
                  <circle class="ring-bar ring-amber" cx="50" cy="50" r="40" 
                    stroke-dasharray="251.2" 
                    stroke-dashoffset="${251.2 - (251.2 * 85) / 100}" />
                </svg>
                <div class="ring-center-icon">🥗</div>
              </div>
              <div class="ring-meta">
                <span class="ring-label">Daily Calories</span>
                <span class="ring-value">${plan.nutrition?.targetCalories || 2100} kcal</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Middle Row: Left = Habit Matrix, Right = Workout Launchpad -->
        <div class="dashboard-main-split">
          <!-- Habit Matrix Container -->
          <div class="habit-container-mount" id="habit-matrix-mount"></div>

          <!-- Workout Launchpad Card -->
          <div class="workout-launchpad-card glass-panel">
            <div class="launchpad-header">
              <div class="launchpad-title-wrap">
                <span class="workout-split-tag">${todaySchedule?.day || 'Today'}: ${isRestDay ? 'Active Recovery' : todayWorkout?.type}</span>
                <h3 class="workout-main-title">${isRestDay ? '🌱 Active Recovery & Mobility' : todayWorkout?.name}</h3>
                <div class="workout-diagnostic-badge" style="display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.75rem; color: #10b981; background: rgba(16, 185, 129, 0.1); padding: 0.2rem 0.6rem; border-radius: 999px; margin-top: 0.3rem;">
                  <span>🎯 Problem Antidote:</span>
                  <span>${(plan.problems || ['General Conditioning']).map(p => (OBSTACLES.find(o => o.id === p)?.label || p.replace(/_/g, ' '))).slice(0, 2).join(' • ')}</span>
                </div>
              </div>
              <span class="workout-duration-badge">⏱️ ${isRestDay ? '15m' : (todayWorkout?.estMinutes || 30) + ' min'}</span>
            </div>

            ${isRestDay ? `
              <div class="rest-day-hero">
                <p class="rest-message">Muscles repair and central nervous system recovers today. Hit your hydration baseline and NEAT steps!</p>
                <div class="rest-tips-box">
                  <span>🚶 Target: 8,000+ Gentle Steps</span>
                  <span>💧 Hydration: ${plan.nutrition?.waterLiters || 3}L Water</span>
                  <span>🧘 5-min hamstring & hip stretch</span>
                </div>
              </div>
            ` : `
              <div class="workout-preview-list">
                <div class="preview-target-muscles">
                  <span>Target:</span>
                  ${(todayWorkout?.targetMuscles || []).map(m => `<span class="muscle-tag">${m}</span>`).join('')}
                </div>

                <div class="preview-exercises-grid">
                  ${(todayWorkout?.exercises || []).map((ex, i) => `
                    <div class="preview-ex-item">
                      <span class="ex-num">${i + 1}</span>
                      <div class="ex-info">
                        <span class="ex-name-preview">${ex.name.split('/')[0]}</span>
                        <span class="ex-sets-preview">${ex.defaultSets || 3} sets × ${ex.defaultReps || '10-12'}</span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="workout-action-buttons">
                ${workoutCompleted ? `
                  <div class="workout-done-banner">
                    <span>🎉 Workout Completed for ${this.formatDisplayDate(selectedDate)}!</span>
                  </div>
                ` : `
                  <button class="btn-primary-large" id="btn-start-full-workout">
                    🔥 Start Full Workout (${todayWorkout?.estMinutes || 30} min)
                  </button>

                  <button class="btn-med-action" id="btn-start-med-workout" title="Short on time? Keep the streak alive with a 10-minute micro-session">
                    ⚡ 10-Min MED (Minimum Effective Dose)
                  </button>
                `}
              </div>
            `}
          </div>
        </div>

        <!-- Bottom Quick Macro Strip -->
        <div class="bottom-quick-bar glass-panel">
          <div class="macro-chips-row">
            <div class="macro-chip">
              <span class="macro-name">Daily Target</span>
              <span class="macro-val">${plan.nutrition?.targetCalories} kcal</span>
            </div>
            <div class="macro-chip protein">
              <span class="macro-name">Protein</span>
              <span class="macro-val">${plan.nutrition?.protein}g</span>
            </div>
            <div class="macro-chip carbs">
              <span class="macro-name">Carbs</span>
              <span class="macro-val">${plan.nutrition?.carbs}g</span>
            </div>
            <div class="macro-chip fats">
              <span class="macro-name">Fats</span>
              <span class="macro-val">${plan.nutrition?.fats}g</span>
            </div>
            <div class="macro-chip water">
              <span class="macro-name">Water Baseline</span>
              <span class="macro-val">${plan.nutrition?.waterLiters}L</span>
            </div>
          </div>
        </div>
      </div>
    `;

    // Mount Habit Manager
    const habitMount = document.getElementById('habit-matrix-mount');
    if (habitMount) {
      this.habitManager.container = habitMount;
      this.habitManager.render(selectedDate);
    }

    // Attach Dashboard Events
    this.attachDashboardEvents(todayWorkout);
  }

  attachDashboardEvents(todayWorkout) {
    const state = store.getState();

    // Date navigation
    document.getElementById('btn-prev-day')?.addEventListener('click', () => {
      const d = new Date(state.selectedDate);
      d.setDate(d.getDate() - 1);
      store.setSelectedDate(this.formatIso(d));
      sound.playTap();
    });

    document.getElementById('btn-next-day')?.addEventListener('click', () => {
      const d = new Date(state.selectedDate);
      d.setDate(d.getDate() + 1);
      store.setSelectedDate(this.formatIso(d));
      sound.playTap();
    });

    // Start Full Workout
    document.getElementById('btn-start-full-workout')?.addEventListener('click', () => {
      if (todayWorkout) {
        this.workoutPlayer.startWorkout(todayWorkout, false);
      }
    });

    // Start MED Workout
    document.getElementById('btn-start-med-workout')?.addEventListener('click', () => {
      if (todayWorkout) {
        this.workoutPlayer.startWorkout(todayWorkout, true);
      }
    });

    // Open Custom Out-of-the-Box Goal Modal
    document.getElementById('btn-open-custom-goal-modal')?.addEventListener('click', () => {
      this.openCustomGoalModal();
    });

    // Open 1,000+ Exercise Vault Modal
    document.getElementById('btn-open-exercise-vault')?.addEventListener('click', () => {
      this.openExerciseVaultModal();
    });

    // View Workout History Records
    document.getElementById('btn-view-workout-history')?.addEventListener('click', () => {
      this.switchView('sessions');
      if (this.sessionsManager) {
        this.sessionsManager.activeTab = 'history';
        this.sessionsManager.render();
      }
      sound.playTap();
    });
  }

  openExerciseVaultModal() {
    sound.playTap();
    const oldModal = document.getElementById('exercise-vault-modal');
    if (oldModal) oldModal.remove();

    const modal = document.createElement('div');
    modal.className = 'modal-backdrop active';
    modal.id = 'exercise-vault-modal';

    let currentProblemFilter = 'all';
    let currentTierFilter = 'all';
    let currentEquipFilter = 'all';
    let searchQuery = '';

    const renderVaultContent = () => {
      const filtered = EXERCISE_DATABASE.filter(ex => {
        if (currentProblemFilter !== 'all') {
          if (!ex.problems || !ex.problems.includes(currentProblemFilter)) return false;
        }
        if (currentTierFilter !== 'all' && ex.tier !== currentTierFilter) return false;
        if (currentEquipFilter !== 'all' && ex.equipment !== currentEquipFilter) return false;
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchName = ex.name.toLowerCase().includes(q);
          const matchMuscles = (ex.muscles || []).some(m => m.toLowerCase().includes(q));
          const matchCues = (ex.cues || []).some(c => c.toLowerCase().includes(q));
          if (!matchName && !matchMuscles && !matchCues) return false;
        }
        return true;
      });

      const listContainer = modal.querySelector('#vault-exercise-list');
      const countLabel = modal.querySelector('#vault-count-label');
      if (countLabel) countLabel.textContent = `Showing ${filtered.length} of ${EXERCISE_DATABASE.length} Biomechanical Exercises`;

      if (listContainer) {
        if (filtered.length === 0) {
          listContainer.innerHTML = `
            <div class="empty-vault-state" style="text-align: center; padding: 2rem; color: var(--text-muted);">
              <span style="font-size: 2.5rem; display: block; margin-bottom: 0.5rem;">🔍</span>
              <p>No exercises match your selected filters. Try broadening your criteria.</p>
            </div>
          `;
        } else {
          listContainer.innerHTML = filtered.slice(0, 50).map(ex => `
            <div class="vault-exercise-card">
              <div class="vault-card-top">
                <div class="vault-title-wrap">
                  <span class="vault-tier-badge tier-${ex.tier.toLowerCase()}">${ex.tier}</span>
                  <h4 class="vault-ex-name">${ex.name}</h4>
                </div>
                <span class="vault-equip-badge">🏋️ ${ex.equipment}</span>
              </div>

              <div class="vault-muscles-row">
                <span><strong>Target:</strong> ${(ex.muscles || []).join(', ')}</span>
                <span><strong>Sets:</strong> ${ex.defaultSets} × ${ex.defaultReps} (Rest: ${ex.restSeconds}s)</span>
              </div>

              <div class="vault-cues-box">
                <strong>Form & Biomechanics:</strong>
                <ul>
                  ${(ex.cues || []).slice(0, 2).map(c => `<li>${c}</li>`).join('')}
                </ul>
              </div>

              <div class="vault-problems-tag-row">
                ${(ex.problems || []).map(p => `
                  <span class="problem-tag-pill">🎯 ${PROBLEM_METADATA[p]?.name || p.replace(/_/g, ' ')}</span>
                `).join('')}
              </div>
            </div>
          `).join('');

          if (filtered.length > 50) {
            listContainer.innerHTML += `
              <div class="vault-more-note" style="text-align: center; padding: 1rem; color: var(--text-muted); font-size: 0.85rem;">
                Displaying first 50 results. Use the search bar above to pinpoint specific movements.
              </div>
            `;
          }
        }
      }
    };

    modal.innerHTML = `
      <div class="modal-dialog glass-panel" style="max-height: 90vh; display: flex; flex-direction: column; width: 90%; max-width: 900px; padding: 1.5rem;">
        <div class="modal-header" style="flex-shrink: 0; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h3 style="font-size: 1.25rem; font-weight: 800; color: #fff;">📚 1,000+ Biomechanical Exercise Vault</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.2rem;" id="vault-count-label">
              Total Database: ${EXERCISE_DATABASE.length} Exercises across all body problems and tiers
            </p>
          </div>
          <button class="btn-close-modal" id="btn-close-vault">✕</button>
        </div>

        <!-- Search and Filter Bar -->
        <div class="vault-filter-toolbar" style="padding: 1rem 0; border-bottom: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 0.75rem; flex-shrink: 0;">
          <input type="text" id="vault-search-input" placeholder="🔍 Search exercises by name, muscle, or movement pattern..." 
            style="width: 100%; padding: 0.75rem 1rem; background: rgba(15, 20, 34, 0.9); border: 1px solid var(--border-color); border-radius: var(--radius-sm); color: #fff; font-size: 0.95rem;" />

          <div class="vault-filter-pills-row" style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
            <select id="vault-problem-select" style="padding: 0.5rem 0.75rem; background: #0f172a; border: 1px solid var(--border-color); border-radius: var(--radius-sm); color: #fff; font-size: 0.85rem;">
              <option value="all">🎯 All Body Problems & Conditions</option>
              ${Object.values(BODY_PROBLEMS).map(p => `
                <option value="${p}">${PROBLEM_METADATA[p]?.name || p.replace(/_/g, ' ')}</option>
              `).join('')}
            </select>

            <select id="vault-tier-select" style="padding: 0.5rem 0.75rem; background: #0f172a; border: 1px solid var(--border-color); border-radius: var(--radius-sm); color: #fff; font-size: 0.85rem;">
              <option value="all">📊 All Tiers (Basic, Inter, Adv)</option>
              <option value="Basic">Tier 1: Basic / Foundation</option>
              <option value="Intermediate">Tier 2: Intermediate</option>
              <option value="Advanced">Tier 3: Advanced Peak</option>
            </select>

            <select id="vault-equip-select" style="padding: 0.5rem 0.75rem; background: #0f172a; border: 1px solid var(--border-color); border-radius: var(--radius-sm); color: #fff; font-size: 0.85rem;">
              <option value="all">🏋️ All Equipment Types</option>
              <option value="gym">Full Gym / Barbells</option>
              <option value="dumbbells">Dumbbells</option>
              <option value="bodyweight">Bodyweight / Calisthenics</option>
              <option value="cables">Cables</option>
              <option value="bands">Resistance Bands</option>
            </select>
          </div>
        </div>

        <!-- Exercise List Mount -->
        <div class="vault-exercise-list" id="vault-exercise-list" style="overflow-y: auto; flex: 1; padding: 1rem 0; display: flex; flex-direction: column; gap: 0.85rem;"></div>
      </div>
    `;

    document.body.appendChild(modal);

    const searchInput = modal.querySelector('#vault-search-input');
    const problemSelect = modal.querySelector('#vault-problem-select');
    const tierSelect = modal.querySelector('#vault-tier-select');
    const equipSelect = modal.querySelector('#vault-equip-select');

    searchInput?.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderVaultContent();
    });

    problemSelect?.addEventListener('change', (e) => {
      currentProblemFilter = e.target.value;
      sound.playTap();
      renderVaultContent();
    });

    tierSelect?.addEventListener('change', (e) => {
      currentTierFilter = e.target.value;
      sound.playTap();
      renderVaultContent();
    });

    equipSelect?.addEventListener('change', (e) => {
      currentEquipFilter = e.target.value;
      sound.playTap();
      renderVaultContent();
    });

    modal.querySelector('#btn-close-vault')?.addEventListener('click', () => modal.remove());

    renderVaultContent();
  }

  openCustomGoalModal() {
    sound.playTap();
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop active';
    modal.id = 'custom-goal-modal';

    const state = store.getState();
    const currentObstacles = state.user?.obstacles || [];
    let selectedProblems = [...currentObstacles];

    modal.innerHTML = `
      <div class="modal-dialog glass-panel max-w-lg" style="max-height: 90vh; overflow-y: auto;">
        <div class="modal-header">
          <h3>✨ Create Out-of-the-Box Custom Goal</h3>
          <button class="btn-close-modal" id="btn-close-custom-goal">✕</button>
        </div>

        <form id="form-custom-goal" style="display: flex; flex-direction: column; gap: 1rem;">
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.4;">
            Tell MotionMint exactly what you want to achieve. Whether you have an unconventional timeframe, specific orthopedic body problem, or unique event:
          </p>

          <div class="form-group">
            <label>Describe Your Custom Goal & Vision</label>
            <textarea id="custom-goal-text" rows="3" style="width: 100%; padding: 0.85rem; background: rgba(15, 20, 34, 0.8); border: 1px solid var(--border-color); border-radius: var(--radius-sm); color: #fff; font-family: var(--font-body); font-size: 0.95rem; resize: vertical;" placeholder="e.g. I want to lose 6kg belly fat and build upper chest and 3D shoulders for my wedding in 2 months with knee-friendly exercises." required></textarea>
          </div>

          <div class="form-group">
            <label style="font-size: 0.85rem; font-weight: 700; color: #cbd5e1;">🎯 Target Body Problems & Joint Sensitivities:</label>
            <div class="problem-pills-custom-grid" style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.3rem;">
              ${OBSTACLES.filter(o => o.category === 'body_problem').map(obs => {
                const isChecked = selectedProblems.includes(obs.id);
                return `
                  <button type="button" class="btn-problem-toggle ${isChecked ? 'selected' : ''}" data-obs="${obs.id}"
                    style="padding: 0.35rem 0.65rem; font-size: 0.78rem; border-radius: 999px; border: 1px solid ${isChecked ? 'var(--accent-emerald)' : 'var(--border-color)'}; background: ${isChecked ? 'rgba(16, 185, 129, 0.2)' : 'rgba(15, 23, 42, 0.6)'}; color: ${isChecked ? '#34d399' : '#94a3b8'}; cursor: pointer;">
                    ${obs.icon} ${obs.label.split('/')[0]}
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <div class="quick-prompts-row" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.5rem;">
            <span style="font-size: 0.75rem; color: var(--text-muted); width: 100%;">💡 Quick Inspiration Prompts:</span>
            <button type="button" class="btn-outline-small btn-prompt-sample" data-sample="Lose 5kg body fat & build chest without lower back pain in 2 months">💍 Wedding Shred (2 Months)</button>
            <button type="button" class="btn-outline-small btn-prompt-sample" data-sample="Build lean muscle mass and improve 5k running stamina with 4 gym days">🏃 Muscle + Stamina</button>
            <button type="button" class="btn-outline-small btn-prompt-sample" data-sample="Fix severe desk posture, anterior pelvic tilt, and knee stiffness">🪑 Desk Worker Posture Reset</button>
          </div>

          <button type="submit" class="btn-primary-large">
            ⚡ Architect My Custom Plan →
          </button>
        </form>
      </div>
    `;

    document.body.appendChild(modal);

    // Problem pill toggle
    modal.querySelectorAll('.btn-problem-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const obsId = btn.dataset.obs;
        if (selectedProblems.includes(obsId)) {
          selectedProblems = selectedProblems.filter(p => p !== obsId);
          btn.style.borderColor = 'var(--border-color)';
          btn.style.background = 'rgba(15, 23, 42, 0.6)';
          btn.style.color = '#94a3b8';
        } else {
          selectedProblems.push(obsId);
          btn.style.borderColor = 'var(--accent-emerald)';
          btn.style.background = 'rgba(16, 185, 129, 0.2)';
          btn.style.color = '#34d399';
        }
        sound.playTap();
      });
    });

    // Quick prompt clicks
    modal.querySelectorAll('.btn-prompt-sample').forEach(btn => {
      btn.addEventListener('click', () => {
        const txt = modal.querySelector('#custom-goal-text');
        if (txt) {
          txt.value = btn.dataset.sample;
          sound.playTap();
        }
      });
    });

    const close = () => modal.remove();
    modal.querySelector('#btn-close-custom-goal')?.addEventListener('click', close);

    modal.querySelector('#form-custom-goal')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const rawPrompt = modal.querySelector('#custom-goal-text').value.trim();
      if (rawPrompt) {
        const customGoalConfig = CustomGoalEngine.analyzeCustomGoal(rawPrompt, state.user);
        
        // Combine NLP problems with manually clicked problems
        const allProblems = Array.from(new Set([
          ...selectedProblems,
          ...(customGoalConfig.detectedProblems || [])
        ]));
        customGoalConfig.detectedProblems = allProblems;

        const updatedUser = {
          ...state.user,
          goal: customGoalConfig.id,
          obstacles: allProblems,
          timeframeMonths: customGoalConfig.targetMonths || state.user.timeframeMonths
        };

        const newPlan = PlanGenerator.generatePlan({
          ...updatedUser,
          obstacles: allProblems,
          customGoalConfig
        });

        store.updateState({
          user: updatedUser,
          plan: newPlan
        }, 'plan_generated');

        sound.playFanfare();
        close();
        this.renderDashboard();
      }
    });
  }

  // ==========================================
  // SESSIONS VIEW
  // ==========================================
  renderSessions() {
    this.mainContentEl.innerHTML = '<div id="sessions-mount"></div>';
    const mount = document.getElementById('sessions-mount');
    this.sessionsManager.container = mount;
    this.sessionsManager.render();
  }

  // ==========================================
  // FOODS VIEW
  // ==========================================
  renderFoods() {
    this.mainContentEl.innerHTML = '<div id="foods-mount"></div>';
    const mount = document.getElementById('foods-mount');
    this.foodsManager.container = mount;
    this.foodsManager.render();
  }

  // ==========================================
  // ROADMAP VIEW
  // ==========================================
  renderRoadmap() {
    const state = store.getState();
    const plan = state.plan;
    if (!plan) return;

    this.mainContentEl.innerHTML = `
      <div class="roadmap-view-wrap">
        <div class="roadmap-header glass-panel">
          <div class="roadmap-title-row">
            <div>
              <span class="roadmap-badge">${plan.timeframe?.label || '3 Months'}</span>
              <h2 class="view-title">${plan.goal?.name}</h2>
              <p class="view-subtitle">${plan.goal?.tagline}</p>
            </div>

            <div class="feasibility-card-mini" style="border-left: 4px solid ${plan.feasibility?.color || '#10b981'}">
              <span class="feasibility-label">Feasibility Score</span>
              <span class="feasibility-val" style="color: ${plan.feasibility?.color}">${plan.feasibility?.score}% - ${plan.feasibility?.rating}</span>
              <span class="feasibility-rate">${plan.feasibility?.weeklyRateKg > 0 ? '+' : ''}${plan.feasibility?.weeklyRateKg} kg/week projected</span>
            </div>
          </div>

          <div class="feasibility-advice-box">
            <span>💡 <strong>Behavioral Reality Engine:</strong> ${plan.feasibility?.advice}</span>
          </div>
        </div>

        <!-- Periodized Phases Breakdown -->
        <div class="phases-timeline-container">
          <h3 class="section-title">🗺️ Periodized Transformation Phases</h3>
          <div class="phases-grid">
            ${(plan.phases || []).map((phase, idx) => `
              <div class="phase-card glass-panel ${idx === 0 ? 'active-phase' : ''}">
                <div class="phase-card-top">
                  <span class="phase-num-pill">PHASE ${phase.phaseIndex}</span>
                  <span class="phase-duration-tag">${phase.duration}</span>
                </div>

                <h4 class="phase-title">${phase.name}</h4>
                <p class="phase-focus">${phase.focus}</p>

                <div class="phase-meta-row">
                  <div class="phase-meta-item">
                    <span class="meta-label">Rep Scheme</span>
                    <span class="meta-val">${phase.repScheme}</span>
                  </div>
                  <div class="phase-meta-item">
                    <span class="meta-label">Target Intensity</span>
                    <span class="meta-val">${phase.intensity}</span>
                  </div>
                </div>

                <div class="phase-weekly-preview">
                  <span class="preview-title">Weekly Structure (${plan.daysPerWeek} Days/Week):</span>
                  <div class="phase-day-chips">
                    ${(phase.weeklySchedule || []).map(d => `
                      <span class="day-chip ${d.isRest ? 'chip-rest' : 'chip-work'}">
                        ${d.day.slice(0, 3)}: ${d.isRest ? 'Rest' : d.workout?.name.split(' ')[0]}
                      </span>
                    `).join('')}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Obstacle Antidotes Section -->
        <div class="antidotes-section glass-panel">
          <h3 class="section-title">🛡️ Your Tailored Obstacle Antidotes</h3>
          <div class="antidotes-grid">
            ${(plan.obstacleAntidotes || []).map(anti => `
              <div class="antidote-card">
                <div class="antidote-header">
                  <span class="antidote-icon">${anti.icon || '⚡'}</span>
                  <h4>${anti.antidoteTitle}</h4>
                </div>
                <p class="antidote-desc">${anti.antidoteDesc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // ANALYTICS & HEATMAP VIEW
  // ==========================================
  renderAnalytics() {
    this.mainContentEl.innerHTML = '<div id="analytics-mount"></div>';
    const mount = document.getElementById('analytics-mount');
    this.analyticsManager.container = mount;
    this.analyticsManager.render();
  }

  // ==========================================
  // EMERGENCY RESET COACH VIEW
  // ==========================================
  renderCoach() {
    this.mainContentEl.innerHTML = '<div id="coach-mount"></div>';
    const mount = document.getElementById('coach-mount');
    this.resetCoach.container = mount;
    this.resetCoach.render();
  }

  // ==========================================
  // PROFILE & SETTINGS VIEW
  // ==========================================
  renderProfile() {
    const state = store.getState();
    const user = state.user || {};

    this.mainContentEl.innerHTML = `
      <div class="profile-view-wrap">
        <div class="profile-card glass-panel">
          <h2 class="view-title">👤 Athlete Profile & Configuration</h2>
          <div class="profile-summary-grid">
            <div class="prof-item"><span class="prof-k">Name:</span> <span class="prof-v">${user.name || 'Champion'}</span></div>
            <div class="prof-item"><span class="prof-k">Goal:</span> <span class="prof-v">${user.goal}</span></div>
            <div class="prof-item"><span class="prof-k">Current Weight:</span> <span class="prof-v">${user.weightKg} kg</span></div>
            <div class="prof-item"><span class="prof-k">Target Weight:</span> <span class="prof-v">${user.targetWeightKg} kg</span></div>
            <div class="prof-item"><span class="prof-k">Height:</span> <span class="prof-v">${user.heightCm} cm</span></div>
            <div class="prof-item"><span class="prof-k">Timeframe:</span> <span class="prof-v">${user.timeframeMonths} Months</span></div>
            <div class="prof-item"><span class="prof-k">Equipment:</span> <span class="prof-v">${user.equipment}</span></div>
            <div class="prof-item"><span class="prof-k">Days / Week:</span> <span class="prof-v">${user.daysPerWeek} Days</span></div>
          </div>

          <div class="profile-actions-row">
            <button class="btn-primary-large" id="btn-re-onboard">
              🔄 Re-run Diagnostic Wizard & Generate New Plan
            </button>
          </div>
        </div>

        <div class="data-manage-card glass-panel">
          <h3>💾 Data & Backup Management</h3>
          <p class="data-desc">Your habits and workout progress are safely stored locally in your browser.</p>
          
          <div class="backup-buttons-row">
            <button class="btn-outline-small" id="btn-export-backup">
              📥 Export JSON Backup
            </button>
            
            <label class="btn-outline-small" style="cursor: pointer;">
              📤 Import JSON Backup
              <input type="file" id="file-import-backup" accept=".json" style="display: none;" />
            </label>

            <button class="btn-danger-small" id="btn-reset-data">
              🗑️ Reset All Data
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btn-re-onboard')?.addEventListener('click', () => {
      this.startOnboarding();
    });

    document.getElementById('btn-export-backup')?.addEventListener('click', () => {
      const json = store.exportBackupJson();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `MotionMint_Backup_${store.getTodayDateString()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });

    document.getElementById('file-import-backup')?.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          const success = store.importBackupJson(evt.target.result);
          if (success) {
            alert('Backup successfully restored!');
            this.render();
          } else {
            alert('Failed to parse JSON backup file.');
          }
        };
        reader.readAsText(file);
      }
    });

    document.getElementById('btn-reset-data')?.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all data and history? This cannot be undone.')) {
        store.resetAllData();
        this.startOnboarding();
      }
    });
  }

  // ==========================================
  // ONBOARDING DIAGNOSTIC WIZARD
  // ==========================================
  startOnboarding() {
    let currentStep = 1;
    const totalSteps = 4;

    const wizardData = {
      name: 'Champion',
      age: 28,
      gender: 'male',
      heightCm: 175,
      weightKg: 78,
      targetWeightKg: 72,
      goal: 'fat_loss',
      timeframeMonths: 3,
      obstacles: ['inconsistency', 'cravings'],
      equipment: 'gym',
      daysPerWeek: 4,
      activityLevel: 'moderate'
    };

    const oldModal = document.getElementById('onboarding-wizard-modal');
    if (oldModal) oldModal.remove();

    const modal = document.createElement('div');
    modal.className = 'onboarding-overlay active';
    modal.id = 'onboarding-wizard-modal';

    const renderStep = () => {
      let content = '';

      if (currentStep === 1) {
        content = `
          <div class="wizard-step">
            <div class="wizard-badge">Step 1 of ${totalSteps}</div>
            <h2 class="wizard-title">What is your primary physical goal?</h2>
            <p class="wizard-sub">Select the primary outcome you want to architect:</p>

            <div class="goal-selection-grid">
              ${Object.values(GOALS).map(g => `
                <div class="goal-card ${wizardData.goal === g.id ? 'selected' : ''}" data-goal="${g.id}">
                  <span class="goal-icon">${g.icon}</span>
                  <h4 class="goal-name">${g.name}</h4>
                  <p class="goal-tagline">${g.tagline}</p>
                </div>
              `).join('')}
            </div>

            <div class="obstacle-section-wizard">
              <h3 class="obstacle-title">🎯 Body Problems, Joint Conditions & Past Obstacles</h3>
              <p class="wizard-sub">Select all physical conditions or friction points that apply (different problems = different exercises):</p>
              
              <div class="obstacle-group-label" style="font-size: 0.85rem; font-weight: 700; color: #34d399; margin: 0.75rem 0 0.4rem;">
                🩹 Joint & Orthopedic Health
              </div>
              <div class="obstacle-pills-grid">
                ${OBSTACLES.filter(o => o.category === 'body_problem' && (o.id.includes('pain') || o.id.includes('impingement') || o.id.includes('joint'))).map(obs => {
                  const isChecked = wizardData.obstacles.includes(obs.id);
                  return `
                    <div class="obstacle-pill ${isChecked ? 'selected' : ''}" data-obs="${obs.id}">
                      <span class="obs-icon">${obs.icon}</span>
                      <span class="obs-label">${obs.label}</span>
                    </div>
                  `;
                }).join('')}
              </div>

              <div class="obstacle-group-label" style="font-size: 0.85rem; font-weight: 700; color: #38bdf8; margin: 0.75rem 0 0.4rem;">
                📐 Posture, Structural Balance & Experience
              </div>
              <div class="obstacle-pills-grid">
                ${OBSTACLES.filter(o => o.category === 'body_problem' && !(o.id.includes('pain') || o.id.includes('impingement') || o.id.includes('joint'))).map(obs => {
                  const isChecked = wizardData.obstacles.includes(obs.id);
                  return `
                    <div class="obstacle-pill ${isChecked ? 'selected' : ''}" data-obs="${obs.id}">
                      <span class="obs-icon">${obs.icon}</span>
                      <span class="obs-label">${obs.label}</span>
                    </div>
                  `;
                }).join('')}
              </div>

              <div class="obstacle-group-label" style="font-size: 0.85rem; font-weight: 700; color: #f59e0b; margin: 0.75rem 0 0.4rem;">
                ⚡ Behavioral & Lifestyle Friction
              </div>
              <div class="obstacle-pills-grid">
                ${OBSTACLES.filter(o => o.category === 'lifestyle').map(obs => {
                  const isChecked = wizardData.obstacles.includes(obs.id);
                  return `
                    <div class="obstacle-pill ${isChecked ? 'selected' : ''}" data-obs="${obs.id}">
                      <span class="obs-icon">${obs.icon}</span>
                      <span class="obs-label">${obs.label}</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        `;
      } else if (currentStep === 2) {
        const feasibility = PlanGenerator.calculateFeasibility({
          weightKg: wizardData.weightKg,
          targetWeightKg: wizardData.targetWeightKg,
          timeframeMonths: wizardData.timeframeMonths,
          goal: wizardData.goal
        });

        content = `
          <div class="wizard-step">
            <div class="wizard-badge">Step 2 of ${totalSteps}</div>
            <h2 class="wizard-title">Target Timeframe & Behavioral Reality Meter</h2>
            <p class="wizard-sub">How many months would you like to take to sustainably reach your goal?</p>

            <div class="timeframe-selection-grid">
              ${TIMEFRAMES.map(tf => `
                <div class="timeframe-card ${wizardData.timeframeMonths === tf.months ? 'selected' : ''}" data-months="${tf.months}">
                  <span class="tf-badge">${tf.badge}</span>
                  <h4 class="tf-months">${tf.label}</h4>
                  <p class="tf-desc">${tf.description}</p>
                  <span class="tf-risk">Burnout Risk: ${tf.crashRisk}</span>
                </div>
              `).join('')}
            </div>

            <!-- Live Feasibility Indicator -->
            <div class="feasibility-meter-box glass-panel" style="border-left: 5px solid ${feasibility.color}">
              <div class="meter-top">
                <span class="meter-title">Sustainability Score: <strong style="color: ${feasibility.color}">${feasibility.score}% (${feasibility.rating})</strong></span>
                <span class="meter-rate">${feasibility.weeklyRateKg > 0 ? '+' : ''}${feasibility.weeklyRateKg} kg/week</span>
              </div>
              <p class="meter-advice">${feasibility.advice}</p>
            </div>
          </div>
        `;
      } else if (currentStep === 3) {
        content = `
          <div class="wizard-step">
            <div class="wizard-badge">Step 3 of ${totalSteps}</div>
            <h2 class="wizard-title">Your Biometrics & Metabolism</h2>
            <p class="wizard-sub">Used to calculate exact TDEE calories, protein targets, and volume loads:</p>

            <div class="form-grid-2col">
              <div class="form-group">
                <label>Your Name / Nickname</label>
                <input type="text" id="wiz-name" value="${wizardData.name}" />
              </div>

              <div class="form-group">
                <label>Biological Gender</label>
                <select id="wiz-gender">
                  <option value="male" ${wizardData.gender === 'male' ? 'selected' : ''}>Male</option>
                  <option value="female" ${wizardData.gender === 'female' ? 'selected' : ''}>Female</option>
                </select>
              </div>

              <div class="form-group">
                <label>Age (Years)</label>
                <input type="number" id="wiz-age" min="15" max="95" value="${wizardData.age}" />
              </div>

              <div class="form-group">
                <label>Height (cm)</label>
                <input type="number" id="wiz-height" min="120" max="230" value="${wizardData.heightCm}" />
              </div>

              <div class="form-group">
                <label>Current Weight (kg)</label>
                <input type="number" id="wiz-weight" step="0.5" min="35" max="220" value="${wizardData.weightKg}" />
              </div>

              <div class="form-group">
                <label>Target Weight (kg)</label>
                <input type="number" id="wiz-target-weight" step="0.5" min="35" max="220" value="${wizardData.targetWeightKg}" />
              </div>
            </div>
          </div>
        `;
      } else if (currentStep === 4) {
        content = `
          <div class="wizard-step">
            <div class="wizard-badge">Step 4 of ${totalSteps}</div>
            <h2 class="wizard-title">Equipment & Schedule Commitment</h2>
            <p class="wizard-sub">Customizes exercise selections and weekly split:</p>

            <div class="equipment-grid">
              <div class="equip-card ${wizardData.equipment === 'gym' ? 'selected' : ''}" data-equip="gym">
                <span class="equip-icon">🏢</span>
                <span class="equip-name">Full Gym</span>
                <span class="equip-sub">Barbells, cables, benches, machines</span>
              </div>

              <div class="equip-card ${wizardData.equipment === 'dumbbells' ? 'selected' : ''}" data-equip="dumbbells">
                <span class="equip-icon">🏋️</span>
                <span class="equip-name">Home Dumbbells / Bands</span>
                <span class="equip-sub">Adjustable DBs, resistance bands</span>
              </div>

              <div class="equip-card ${wizardData.equipment === 'bodyweight' ? 'selected' : ''}" data-equip="bodyweight">
                <span class="equip-icon">🤸</span>
                <span class="equip-name">Bodyweight Only</span>
                <span class="equip-sub">Calisthenics, mat, floor workouts</span>
              </div>
            </div>

            <div class="days-select-group">
              <label class="days-label">How many days per week can you realistically commit?</label>
              <div class="days-pills-row">
                ${[3, 4, 5, 6].map(d => `
                  <button class="day-btn ${wizardData.daysPerWeek === d ? 'selected' : ''}" data-days="${d}">
                    ${d} Days / Week
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
        `;
      }

      modal.innerHTML = `
        <div class="wizard-card glass-panel">
          <div class="wizard-header-strip">
            <div class="brand-logo">
              <span>🌿 MotionMint</span>
            </div>
            <div class="step-indicator">
              ${Array.from({ length: totalSteps }, (_, i) => `
                <div class="step-dot ${i + 1 === currentStep ? 'active' : (i + 1 < currentStep ? 'done' : '')}"></div>
              `).join('')}
            </div>
          </div>

          <div class="wizard-body">
            ${content}
          </div>

          <div class="wizard-footer">
            ${currentStep > 1 ? `
              <button class="btn-nav-prev" id="btn-wiz-prev">← Back</button>
            ` : '<div></div>'}

            ${currentStep < totalSteps ? `
              <button class="btn-primary-large" id="btn-wiz-next">Continue →</button>
            ` : `
              <button class="btn-primary-large" id="btn-wiz-finish">✨ Generate My Habit Plan →</button>
            `}
          </div>
        </div>
      `;

      // Attach wizard events
      modal.querySelectorAll('.goal-card').forEach(card => {
        card.addEventListener('click', () => {
          wizardData.goal = card.dataset.goal;
          sound.playTap();
          renderStep();
        });
      });

      modal.querySelectorAll('.obstacle-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          const obsId = pill.dataset.obs;
          if (wizardData.obstacles.includes(obsId)) {
            wizardData.obstacles = wizardData.obstacles.filter(o => o !== obsId);
          } else {
            wizardData.obstacles.push(obsId);
          }
          sound.playTap();
          renderStep();
        });
      });

      modal.querySelectorAll('.timeframe-card').forEach(card => {
        card.addEventListener('click', () => {
          wizardData.timeframeMonths = parseInt(card.dataset.months) || 3;
          sound.playTap();
          renderStep();
        });
      });

      modal.querySelectorAll('.equip-card').forEach(card => {
        card.addEventListener('click', () => {
          wizardData.equipment = card.dataset.equip;
          sound.playTap();
          renderStep();
        });
      });

      modal.querySelectorAll('.day-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          wizardData.daysPerWeek = parseInt(btn.dataset.days) || 4;
          sound.playTap();
          renderStep();
        });
      });

      const syncInputs = () => {
        const name = modal.querySelector('#wiz-name');
        const gender = modal.querySelector('#wiz-gender');
        const age = modal.querySelector('#wiz-age');
        const height = modal.querySelector('#wiz-height');
        const weight = modal.querySelector('#wiz-weight');
        const targetWeight = modal.querySelector('#wiz-target-weight');

        if (name) wizardData.name = name.value.trim() || 'Champion';
        if (gender) wizardData.gender = gender.value;
        if (age) wizardData.age = parseInt(age.value) || 28;
        if (height) wizardData.heightCm = parseInt(height.value) || 175;
        if (weight) wizardData.weightKg = parseFloat(weight.value) || 78;
        if (targetWeight) wizardData.targetWeightKg = parseFloat(targetWeight.value) || 72;
      };

      modal.querySelector('#btn-wiz-prev')?.addEventListener('click', () => {
        syncInputs();
        currentStep--;
        sound.playTap();
        renderStep();
      });

      modal.querySelector('#btn-wiz-next')?.addEventListener('click', () => {
        syncInputs();
        currentStep++;
        sound.playTap();
        renderStep();
      });

      modal.querySelector('#btn-wiz-finish')?.addEventListener('click', () => {
        syncInputs();
        const generatedPlan = PlanGenerator.generatePlan(wizardData);
        store.updateState({
          isOnboarded: true,
          user: wizardData,
          plan: generatedPlan
        }, 'plan_generated');

        sound.playFanfare();
        modal.remove();
        this.switchView('dashboard');
      });
    };

    document.body.appendChild(modal);
    renderStep();
  }

  formatIso(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  formatDisplayDate(isoStr) {
    const d = new Date(isoStr + 'T00:00:00');
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return d.toLocaleDateString('en-US', options);
  }
}

// Instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
  const app = new MotionMintApp();
  app.init();
});
