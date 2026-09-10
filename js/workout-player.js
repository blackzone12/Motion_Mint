// Interactive Live Workout Player for MotionMint
// Features: set logging, animated rest timer, MED (Minimum Effective Dose) mode, audio chimes

import { sound } from './sound.js';
import { store } from './state.js';

export class WorkoutPlayer {
  constructor(containerEl) {
    this.container = containerEl;
    this.currentWorkout = null;
    this.isMedMode = false;
    this.currentExIndex = 0;
    this.completedSets = {}; // { [exIndex]: [ { completed: bool, reps: num, weight: num } ] }
    this.timerInterval = null;
    this.restTimeRemaining = 0;
    this.totalRestTime = 60;
    this.isResting = false;
    this.startTime = null;
  }

  startWorkout(workoutData, isMed = false) {
    this.isMedMode = isMed;
    this.currentWorkout = isMed && workoutData.medRoutine ? {
      ...workoutData.medRoutine,
      type: `${workoutData.name} (10-Min MED Mode)`
    } : workoutData;

    this.currentExIndex = 0;
    this.completedSets = {};
    this.isResting = false;
    this.startTime = Date.now();

    // Initialize sets for all exercises
    this.currentWorkout.exercises.forEach((ex, idx) => {
      const setCount = isMed ? 2 : (ex.defaultSets || 3);
      this.completedSets[idx] = Array.from({ length: setCount }, () => ({
        completed: false,
        reps: ex.defaultReps ? parseInt(ex.defaultReps) || 10 : 10,
        weight: 0
      }));
    });

    this.render();
    sound.playTap();
  }

  render() {
    if (!this.container || !this.currentWorkout) return;

    const currentEx = this.currentWorkout.exercises[this.currentExIndex];
    const totalExercises = this.currentWorkout.exercises.length;
    const currentSets = this.completedSets[this.currentExIndex] || [];

    // Calculate total workout progress
    let totalSetsAll = 0;
    let completedSetsAll = 0;
    Object.values(this.completedSets).forEach(sets => {
      totalSetsAll += sets.length;
      completedSetsAll += sets.filter(s => s.completed).length;
    });
    const progressPercent = totalSetsAll > 0 ? Math.round((completedSetsAll / totalSetsAll) * 100) : 0;

    this.container.innerHTML = `
      <div class="workout-player-modal active">
        <div class="player-header">
          <div class="player-title-row">
            <div>
              <span class="player-mode-badge ${this.isMedMode ? 'badge-med' : 'badge-standard'}">
                ${this.isMedMode ? '⚡ 10-Min Minimum Effective Dose' : '🔥 Standard Routine'}
              </span>
              <h2 class="player-workout-name">${this.currentWorkout.name}</h2>
            </div>
            <button class="btn-icon-close" id="btn-close-player" title="Exit Workout">✕</button>
          </div>

          <div class="player-progress-bar-container">
            <div class="player-progress-bar" style="width: ${progressPercent}%"></div>
          </div>
          <div class="player-progress-stats">
            <span>Exercise ${this.currentExIndex + 1} of ${totalExercises}</span>
            <span>${progressPercent}% Completed (${completedSetsAll}/${totalSetsAll} sets)</span>
          </div>
        </div>

        <div class="player-body">
          <!-- Exercise Carousel / Header -->
          <div class="exercise-nav-strip">
            ${this.currentWorkout.exercises.map((ex, idx) => {
              const sets = this.completedSets[idx] || [];
              const isAllDone = sets.length > 0 && sets.every(s => s.completed);
              const isActive = idx === this.currentExIndex;
              return `
                <button class="ex-tab-btn ${isActive ? 'active' : ''} ${isAllDone ? 'done' : ''}" data-index="${idx}">
                  <span>${isAllDone ? '✓' : idx + 1}</span>
                  <span class="tab-label">${ex.name.split('/')[0].trim()}</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Active Exercise View -->
          <div class="active-exercise-card glass-panel">
            <div class="ex-main-header">
              <div class="ex-title-wrap">
                <span class="ex-category-pill">${currentEx.muscles ? currentEx.muscles.join(', ') : 'Full Body'}</span>
                <h3 class="ex-name">${currentEx.name}</h3>
              </div>
              <span class="ex-diff-pill">${currentEx.difficulty || 'All Levels'}</span>
            </div>

            <!-- Visual Form Cue Card -->
            <div class="form-cue-box">
              <div class="form-cue-title">
                <span>🎯 Form & Execution Cues</span>
              </div>
              <ul class="form-cues-list">
                ${(currentEx.cues || []).map(cue => `<li>${cue}</li>`).join('')}
              </ul>
              
              <div class="mod-chips-row">
                <div class="mod-chip easier">
                  <span class="mod-label">Easier Mod:</span> ${currentEx.modifications?.easier || 'Reduce load or tempo'}
                </div>
                <div class="mod-chip harder">
                  <span class="mod-label">Harder Mod:</span> ${currentEx.modifications?.harder || 'Add pause or slow tempo'}
                </div>
              </div>
            </div>

            <!-- Set Logger Table -->
            <div class="set-logger-table">
              <div class="set-row header-row">
                <span>SET</span>
                <span>TARGET</span>
                <span>WEIGHT (KG/LB)</span>
                <span>REPS</span>
                <span>CHECK</span>
              </div>

              ${currentSets.map((set, sIdx) => `
                <div class="set-row ${set.completed ? 'completed-set' : ''}">
                  <span class="set-number-badge">${sIdx + 1}</span>
                  <span class="target-reps-text">${currentEx.defaultReps || '10-12'}</span>
                  <div class="input-wrap">
                    <input type="number" min="0" step="0.5" class="set-input set-weight" value="${set.weight || ''}" placeholder="0" data-set-idx="${sIdx}">
                  </div>
                  <div class="input-wrap">
                    <input type="number" min="1" max="100" class="set-input set-reps" value="${set.reps || 10}" data-set-idx="${sIdx}">
                  </div>
                  <button class="btn-check-set ${set.completed ? 'btn-checked' : ''}" data-set-idx="${sIdx}" title="Log Set & Start Rest">
                    ${set.completed ? '✓' : '○'}
                  </button>
                </div>
              `).join('')}
            </div>

            <div class="set-actions-row">
              <button class="btn-outline-small" id="btn-add-set">+ Add Extra Set</button>
            </div>
          </div>

          <!-- Embedded / Floating Rest Timer -->
          <div class="rest-timer-drawer ${this.isResting ? 'visible' : ''}">
            <div class="rest-timer-box glass-panel">
              <div class="rest-info">
                <span class="rest-label">⚡ Rest Interval</span>
                <span class="rest-clock" id="rest-clock-display">${this.formatTime(this.restTimeRemaining)}</span>
              </div>
              <div class="rest-controls">
                <button class="btn-timer-adj" id="btn-minus-15">-15s</button>
                <button class="btn-timer-adj" id="btn-plus-15">+15s</button>
                <button class="btn-skip-rest" id="btn-skip-rest">Skip Rest ⏭</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Navigation Controls -->
        <div class="player-footer">
          <button class="btn-nav-prev" id="btn-prev-ex" ${this.currentExIndex === 0 ? 'disabled' : ''}>
            ← Previous
          </button>
          
          <button class="btn-finish-workout" id="btn-finish-workout">
            🎉 Finish & Log Workout
          </button>

          <button class="btn-nav-next" id="btn-next-ex" ${this.currentExIndex === totalExercises - 1 ? 'disabled' : ''}>
            Next Exercise →
          </button>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  attachEventListeners() {
    // Close / Exit
    const btnClose = this.container.querySelector('#btn-close-player');
    if (btnClose) {
      btnClose.addEventListener('click', () => {
        if (confirm('Are you sure you want to pause or exit this active workout?')) {
          this.stopRestTimer();
          this.container.innerHTML = '';
        }
      });
    }

    // Exercise Tab Switching
    this.container.querySelectorAll('.ex-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(btn.dataset.index);
        if (!isNaN(idx)) {
          this.currentExIndex = idx;
          this.render();
          sound.playTap();
        }
      });
    });

    // Previous / Next Exercise
    const btnPrev = this.container.querySelector('#btn-prev-ex');
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        if (this.currentExIndex > 0) {
          this.currentExIndex--;
          this.render();
          sound.playTap();
        }
      });
    }

    const btnNext = this.container.querySelector('#btn-next-ex');
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (this.currentExIndex < this.currentWorkout.exercises.length - 1) {
          this.currentExIndex++;
          this.render();
          sound.playTap();
        }
      });
    }

    // Add extra set
    const btnAddSet = this.container.querySelector('#btn-add-set');
    if (btnAddSet) {
      btnAddSet.addEventListener('click', () => {
        const sets = this.completedSets[this.currentExIndex] || [];
        const lastSet = sets[sets.length - 1] || { reps: 10, weight: 0 };
        sets.push({ completed: false, reps: lastSet.reps, weight: lastSet.weight });
        this.render();
        sound.playTap();
      });
    }

    // Check Set & Start Timer
    this.container.querySelectorAll('.btn-check-set').forEach(btn => {
      btn.addEventListener('click', () => {
        const sIdx = parseInt(btn.dataset.setIdx);
        const sets = this.completedSets[this.currentExIndex];
        if (sets && sets[sIdx]) {
          sets[sIdx].completed = !sets[sIdx].completed;

          if (sets[sIdx].completed) {
            sound.playTap();
            const currentEx = this.currentWorkout.exercises[this.currentExIndex];
            const restDur = currentEx.restSeconds || (this.isMedMode ? 45 : 60);
            this.startRestTimer(restDur);
          }
          this.render();
        }
      });
    });

    // Input changes
    this.container.querySelectorAll('.set-weight').forEach(input => {
      input.addEventListener('change', () => {
        const sIdx = parseInt(input.dataset.setIdx);
        const sets = this.completedSets[this.currentExIndex];
        if (sets && sets[sIdx]) {
          sets[sIdx].weight = parseFloat(input.value) || 0;
        }
      });
    });

    this.container.querySelectorAll('.set-reps').forEach(input => {
      input.addEventListener('change', () => {
        const sIdx = parseInt(input.dataset.setIdx);
        const sets = this.completedSets[this.currentExIndex];
        if (sets && sets[sIdx]) {
          sets[sIdx].reps = parseInt(input.value) || 10;
        }
      });
    });

    // Timer Controls
    const btnMinus = this.container.querySelector('#btn-minus-15');
    if (btnMinus) {
      btnMinus.addEventListener('click', () => {
        this.restTimeRemaining = Math.max(0, this.restTimeRemaining - 15);
        this.updateTimerDisplay();
      });
    }

    const btnPlus = this.container.querySelector('#btn-plus-15');
    if (btnPlus) {
      btnPlus.addEventListener('click', () => {
        this.restTimeRemaining += 15;
        this.updateTimerDisplay();
      });
    }

    const btnSkip = this.container.querySelector('#btn-skip-rest');
    if (btnSkip) {
      btnSkip.addEventListener('click', () => {
        this.stopRestTimer();
        this.render();
      });
    }

    // Finish Workout
    const btnFinish = this.container.querySelector('#btn-finish-workout');
    if (btnFinish) {
      btnFinish.addEventListener('click', () => {
        this.finishWorkout();
      });
    }
  }

  startRestTimer(seconds) {
    this.stopRestTimer();
    this.restTimeRemaining = seconds;
    this.totalRestTime = seconds;
    this.isResting = true;

    this.timerInterval = setInterval(() => {
      this.restTimeRemaining--;

      if (this.restTimeRemaining <= 3 && this.restTimeRemaining > 0) {
        sound.playTick(false);
      } else if (this.restTimeRemaining === 0) {
        sound.playTick(true);
        sound.playRestComplete();
        this.stopRestTimer();
        this.render();
      }
      this.updateTimerDisplay();
    }, 1000);
  }

  stopRestTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.isResting = false;
  }

  updateTimerDisplay() {
    const clock = this.container.querySelector('#rest-clock-display');
    if (clock) {
      clock.textContent = this.formatTime(this.restTimeRemaining);
    }
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  finishWorkout() {
    this.stopRestTimer();
    const durationMinutes = Math.max(1, Math.round((Date.now() - (this.startTime || Date.now())) / 60000));

    let totalVolume = 0;
    let completedSetsCount = 0;
    Object.entries(this.completedSets).forEach(([exIdx, sets]) => {
      sets.forEach(s => {
        if (s.completed) {
          completedSetsCount++;
          totalVolume += (s.weight || 0) * (s.reps || 10);
        }
      });
    });

    const workoutRecord = {
      name: this.currentWorkout.name,
      type: this.currentWorkout.type,
      isMed: this.isMedMode,
      durationMinutes,
      completedSetsCount,
      totalVolume,
      exercisesLogged: this.completedSets
    };

    // Log in state
    store.logWorkoutCompletion(workoutRecord);

    // Audio & Confetti Celebration
    sound.playFanfare();
    this.showCelebrationModal(workoutRecord);
  }

  showCelebrationModal(record) {
    const xpEarned = record.isMed ? 60 : 100;

    this.container.innerHTML = `
      <div class="workout-celebration-overlay">
        <canvas id="confetti-canvas" class="confetti-canvas"></canvas>
        <div class="celebration-card glass-panel">
          <div class="celebration-badge">🏆</div>
          <h2 class="celebration-title">WORKOUT CRUSHED!</h2>
          <p class="celebration-subtitle">
            ${record.isMed 
              ? '⚡ You locked in the Minimum Effective Dose! Momentum preserved.' 
              : '🔥 Outstanding discipline. Another brick added to your identity.'}
          </p>

          <div class="celebration-stats-grid">
            <div class="stat-box">
              <span class="stat-label">Duration</span>
              <span class="stat-value">${record.durationMinutes} min</span>
            </div>
            <div class="stat-box">
              <span class="stat-label">Sets Completed</span>
              <span class="stat-value">${record.completedSetsCount} sets</span>
            </div>
            <div class="stat-box highlight">
              <span class="stat-label">XP Gained</span>
              <span class="stat-value">+${xpEarned} XP</span>
            </div>
          </div>

          <button class="btn-primary-large" id="btn-celebration-close">
            Back to Command Center →
          </button>
        </div>
      </div>
    `;

    this.launchConfetti();

    const btnClose = this.container.querySelector('#btn-celebration-close');
    if (btnClose) {
      btnClose.addEventListener('click', () => {
        this.container.innerHTML = '';
      });
    }
  }

  launchConfetti() {
    const canvas = this.container.querySelector('#confetti-canvas');
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    const particles = [];
    const colors = ['#10b981', '#06b6d4', '#8b5cf6', '#f59e0b', '#ec4899', '#3b82f6'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.7) * 18,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        alpha: 1
      });
    }

    let frame = 0;
    const animate = () => {
      if (frame > 120) return;
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.rotation += p.rotSpeed;
        p.alpha = Math.max(0, 1 - (frame / 120));

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }
}
