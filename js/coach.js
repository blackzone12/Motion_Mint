// Behavioral Reset Coach & Emergency Protocol Engine for MotionMint
// Solves real-life failure points: low motivation, skipped days, cravings, and plateaus

import { sound } from './sound.js';
import { store } from './state.js';

export const COACH_SCENARIOS = [
  {
    id: 'scen_low_energy',
    title: '😴 Exhausted / Zero Energy Today',
    question: 'How do I handle days when work drained all my energy?',
    strategy: 'The 2-Minute Rule & Minimum Effective Dose (MED)',
    antidote: [
      '⚡ **Do Not Skip Entirely:** Skipping completely weakens your neurological habit loop. Instead, downscale to the Minimum Effective Dose (MED).',
      '👟 **The 2-Minute Clothes Anchor:** Put on your workout shoes and do just 1 set of bodyweight squats or a 5-minute easy walk.',
      '🎯 **Permission to Stop:** If after 5 minutes you still feel completely drained, give yourself full permission to stop. 85% of the time, overcoming the initial friction is enough to finish.'
    ],
    actionLabel: 'Launch 10-Min MED Workout',
    actionType: 'start_med'
  },
  {
    id: 'scen_missed_days',
    title: '📉 Fell Off Track for 3+ Days',
    question: 'I missed several days in a row and feel like quitting.',
    strategy: 'The "Never Miss Twice" & Identity Reboot',
    antidote: [
      '🧠 **Eradicate Guilt:** 3 missed days out of a 90-day journey is only 3.3%. It has zero physiological impact on long-term muscle or metabolism.',
      '🛡️ **The Never Miss Twice Rule:** Missing once is an accident. Missing twice is the start of a new, undesirable habit. Lock in ONE easy habit today (e.g. 500ml water) to reclaim your streak.',
      '✨ **Do Not Compensate:** Never do "double workouts" or starve yourself to make up for missed days. Just resume your scheduled day normally.'
    ],
    actionLabel: 'Check Off 1 Habit Right Now',
    actionType: 'goto_habits'
  },
  {
    id: 'scen_cravings',
    title: '🍪 Intense Late-Night Sugar / Fast Food Craving',
    question: 'I have an overwhelming urge to binge on junk food right now.',
    strategy: 'The 10-Minute Delay & Hydration Buffer',
    antidote: [
      '💧 **The 500ml Cold Water Buffer:** Your brain frequently misinterprets mild dehydration or low dopamine as sugar cravings. Drink 500ml cold water immediately.',
      '⏱️ **The 10-Minute Timer Rule:** Tell yourself: "I can eat whatever I want, but I must wait 10 full minutes after drinking this water." Cravings are temporary neurochemical waves that peak and dissipate within 8-12 minutes.',
      '🍵 **Hot Herbal Tea Swap:** Peppermint or cinnamon tea stimulates oral and gustatory receptors, signaling satiety to the hypothalamus.'
    ],
    actionLabel: 'Set 10-Min Craving Timer',
    actionType: 'start_craving_timer'
  },
  {
    id: 'scen_travel',
    title: '✈️ Traveling / Stuck in a Hotel Room',
    question: 'I am away from my normal gym and kitchen setup.',
    strategy: 'The Zero-Gear Hotel Protocol',
    antidote: [
      '🏨 **No Gym Required:** Perform a 12-minute density circuit right next to the bed: 15 Bodyweight Squats, 10 Incline Push-ups (on desk/bed), 30s Plank, repeated for 4 rounds.',
      '🥗 **Dining Out Anchor:** Order protein-first (grilled chicken/fish/eggs) and double vegetables before looking at the carbohydrate menu.',
      '🚶 **Airport / Transit Steps:** Take the stairs and pace during phone calls to hit 7,000+ steps effortlessly.'
    ],
    actionLabel: 'View Bodyweight Travel Plan',
    actionType: 'view_bodyweight'
  },
  {
    id: 'scen_plateau',
    title: '⚖️ Weight Scale Stalled / Progress Plateau',
    question: 'The scale hasn\'t moved in 10 days despite doing my workouts.',
    strategy: 'Water Retention vs Fat Loss & NEAT Calibration',
    antidote: [
      '💧 **Cortisol & Muscle Inflammation:** When you exercise, muscle micro-tears hold onto glycogen and water for repair. Fat loss is often happening underneath the temporary water weight.',
      '📏 **Track Measurements, Not Just Weight:** Check your waist circumference, energy levels, and strength progress in workout logs.',
      '⚡ **Check NEAT (Non-Exercise Activity):** As calories drop, your body unconsciously fidgets and moves less. Maintain your 8,000 daily step baseline to keep metabolic rate elevated.'
    ],
    actionLabel: 'Review Nutrition Blueprint',
    actionType: 'goto_nutrition'
  }
];

export class ResetCoach {
  constructor(containerEl, appController) {
    this.container = containerEl;
    this.app = appController;
    this.activeScenario = COACH_SCENARIOS[0];
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="coach-view-wrap">
        <div class="coach-header">
          <div class="coach-avatar">🧠</div>
          <div>
            <h2 class="view-title">MotionMint Reset Coach & Emergency Protocol</h2>
            <p class="view-subtitle">Behavioral science antidotes for the exact moments when willpower drops.</p>
          </div>
        </div>

        <div class="coach-grid">
          <!-- Scenarios Sidebar -->
          <div class="scenarios-list glass-panel">
            <h3>Select Your Current Situation:</h3>
            ${COACH_SCENARIOS.map(scen => `
              <button class="scenario-btn ${scen.id === this.activeScenario.id ? 'active' : ''}" data-scen-id="${scen.id}">
                <span class="scen-title">${scen.title}</span>
                <span class="scen-sub">${scen.strategy}</span>
              </button>
            `).join('')}
          </div>

          <!-- Strategy Solution Display -->
          <div class="solution-display glass-panel">
            <div class="solution-header">
              <span class="solution-badge">⚡ Recommended Behavioral Antidote</span>
              <h3 class="solution-title">${this.activeScenario.title}</h3>
              <p class="solution-question">"${this.activeScenario.question}"</p>
            </div>

            <div class="solution-content">
              ${this.activeScenario.antidote.map(point => {
                // Parse simple markdown bold
                const formatted = point.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                return `<div class="solution-point">${formatted}</div>`;
              }).join('')}
            </div>

            <div class="solution-action-box">
              <button class="btn-primary-large" id="btn-coach-action" data-action="${this.activeScenario.actionType}">
                ${this.activeScenario.actionLabel} →
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  attachEventListeners() {
    this.container.querySelectorAll('.scenario-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.scenId;
        const scen = COACH_SCENARIOS.find(s => s.id === id);
        if (scen) {
          this.activeScenario = scen;
          sound.playTap();
          this.render();
        }
      });
    });

    const btnAction = this.container.querySelector('#btn-coach-action');
    if (btnAction) {
      btnAction.addEventListener('click', () => {
        const action = btnAction.dataset.action;
        sound.playTap();
        this.handleCoachAction(action);
      });
    }
  }

  handleCoachAction(action) {
    if (action === 'start_med') {
      const state = store.getState();
      const plan = state.plan;
      const todaySched = plan?.weeklySchedule?.[0]?.workout;
      if (todaySched && this.app?.workoutPlayer) {
        this.app.workoutPlayer.startWorkout(todaySched, true);
      } else {
        alert('Launching 10-Minute Minimum Effective Dose Workout!');
      }
    } else if (action === 'goto_habits') {
      this.app?.switchView('dashboard');
    } else if (action === 'start_craving_timer') {
      alert('10-Minute Craving Delay protocol initiated! Go drink 500ml water and relax for 10 minutes.');
    } else if (action === 'goto_nutrition') {
      this.app?.switchView('roadmap');
    } else {
      this.app?.switchView('dashboard');
    }
  }
}
