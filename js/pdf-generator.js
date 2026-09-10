// 7-Page Transformation Blueprint & PDF Generator for MotionMint
// Formats the document according to the user's exact 7-page structure:
// Page 1: Introduction (What user wants & Solution)
// Page 2: How they will get it & How much time is required (Biometrics & Timeline)
// Page 3: Basic Exercises
// Page 4: Intermediate Exercises
// Page 5: Advanced Exercises
// Page 6: Foods to take on a daily basis
// Page 7: THE END (Contract & Closing)

import { EXERCISE_DATABASE, EXERCISE_TIERS, ExercisePrescriptionEngine, PROBLEM_METADATA } from './data/exercises.js';
import { FOOD_CATEGORIES, FOOD_SWAPS } from './data/foods.js';
import { sound } from './sound.js';

export class PdfBlueprintGenerator {
  static openPrintPreview(plan, user) {
    sound.playTap();

    const userProblems = plan.problems || user.problems || user.obstacles || [];
    const userEquipment = plan.equipment || user.equipment || 'gym';

    // Intelligently select problem-tailored exercises for each tier
    let basicExercises = ExercisePrescriptionEngine.getExercisesForProblems(userProblems, userEquipment, EXERCISE_TIERS.BASIC);
    if (basicExercises.length < 3) {
      basicExercises = EXERCISE_DATABASE.filter(e => e.tier === EXERCISE_TIERS.BASIC).slice(0, 5);
    } else {
      basicExercises = basicExercises.slice(0, 5);
    }

    let intermediateExercises = ExercisePrescriptionEngine.getExercisesForProblems(userProblems, userEquipment, EXERCISE_TIERS.INTERMEDIATE);
    if (intermediateExercises.length < 3) {
      intermediateExercises = EXERCISE_DATABASE.filter(e => e.tier === EXERCISE_TIERS.INTERMEDIATE).slice(0, 5);
    } else {
      intermediateExercises = intermediateExercises.slice(0, 5);
    }

    let advancedExercises = ExercisePrescriptionEngine.getExercisesForProblems(userProblems, userEquipment, EXERCISE_TIERS.ADVANCED);
    if (advancedExercises.length < 3) {
      advancedExercises = EXERCISE_DATABASE.filter(e => e.tier === EXERCISE_TIERS.ADVANCED).slice(0, 5);
    } else {
      advancedExercises = advancedExercises.slice(0, 5);
    }

    const bmi = +(user.weightKg / Math.pow(user.heightCm / 100, 2)).toFixed(1);
    const targetBmi = +(user.targetWeightKg / Math.pow(user.heightCm / 100, 2)).toFixed(1);
    const totalChangeKg = +(user.targetWeightKg - user.weightKg).toFixed(1);

    // Calculate milestone dates
    const today = new Date();
    const addWeeks = (w) => {
      const d = new Date(today);
      d.setDate(d.getDate() + w * 7);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const modal = document.createElement('div');
    modal.className = 'pdf-preview-overlay active';
    modal.id = 'pdf-preview-modal';

    modal.innerHTML = `
      <div class="pdf-modal-toolbar">
        <div class="toolbar-brand">🌿 MotionMint Master Blueprint (7-Page PDF)</div>
        <div class="toolbar-actions">
          <button class="btn-print-action" id="btn-trigger-print">🖨️ Print / Save as PDF</button>
          <button class="btn-close-pdf" id="btn-close-pdf-modal">✕ Close</button>
        </div>
      </div>

      <div class="pdf-document-container" id="printable-blueprint-document">
        
        <!-- ==========================================
             PAGE 1: INTRODUCTION (WHAT USER WANTS & SOLUTION)
             ========================================== -->
        <div class="pdf-page page-1">
          <div class="pdf-page-header">
            <span class="pdf-brand-tag">MOTIONMINT ARCHITECTURE</span>
            <span class="pdf-page-num">Page 1 of 7</span>
          </div>

          <div class="doc-hero-section">
            <div class="doc-badge-pill">PERSONALIZED MASTER BLUEPRINT</div>
            <h1 class="doc-main-title">THE TRANSFORMATION BLUEPRINT</h1>
            <p class="doc-subtitle">Prepared exclusively for: <strong>${user.name || 'Athlete'}</strong></p>
          </div>

          <div class="doc-section-block">
            <h2 class="doc-section-heading">1. What You Want to Achieve (Your Objective)</h2>
            <div class="doc-card-box">
              <div class="doc-grid-2">
                <div>
                  <span class="doc-label">Primary Goal:</span>
                  <p class="doc-val-large">${plan.goal?.name || 'Custom Goal'}</p>
                </div>
                <div>
                  <span class="doc-label">Target Outcome:</span>
                  <p class="doc-val">${plan.goal?.tagline || 'Total body recomposition'}</p>
                </div>
              </div>

              <div class="doc-stat-pills">
                <span class="doc-pill">Starting Weight: <strong>${user.weightKg} kg</strong></span>
                <span class="doc-pill">Target Weight: <strong>${user.targetWeightKg} kg</strong></span>
                <span class="doc-pill">Net Change: <strong>${totalChangeKg > 0 ? '+' : ''}${totalChangeKg} kg</strong></span>
                <span class="doc-pill">Timeframe: <strong>${user.timeframeMonths} Month(s)</strong></span>
              </div>
            </div>
          </div>

          <div class="doc-section-block">
            <h2 class="doc-section-heading">2. The Core Problem (Why 90% of Fitness Apps Fail)</h2>
            <div class="doc-card-box border-warning">
              <p class="doc-paragraph">
                Most commercial fitness apps bombard users with brutal 30-day crash programs without behavioral scaffolding. When motivation dips in week two or life gets hectic, users burn out, quit, and rebound. 
              </p>
              <div class="identified-obstacles-list">
                <span class="doc-label">Your Identified Friction Points:</span>
                <ul>
                  ${(plan.obstacleAntidotes || []).map(o => `<li><strong>${o.label || o.antidoteTitle}:</strong> ${o.antidoteDesc}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>

          <div class="doc-section-block">
            <h2 class="doc-section-heading">3. Your Tailored Solution: The "Habit-First" Matrix</h2>
            <div class="doc-card-box highlight-solution">
              <p class="doc-paragraph">
                MotionMint solves this by anchoring non-negotiable atomic habits (hydration, protein anchors, sleep windows, and 10-minute Minimum Effective Dose backups) alongside a periodized 3-tier exercise progression. You are not just following a workout—you are rewiring your behavioral identity.
              </p>
            </div>
          </div>

          <div class="pdf-page-footer">
            <span>MotionMint OS &copy; 2026</span>
            <span>Confidential & Tailored</span>
          </div>
        </div>

        <!-- ==========================================
             PAGE 2: HOW THEY WILL GET IT & TIME REQUIRED
             ========================================== -->
        <div class="pdf-page page-2">
          <div class="pdf-page-header">
            <span class="pdf-brand-tag">TIMELINE & PHYSIOLOGICAL PROJECTION</span>
            <span class="pdf-page-num">Page 2 of 7</span>
          </div>

          <h2 class="doc-page-title">How You Will Get There & Time Required</h2>
          <p class="doc-page-desc">Precise physiological timeline and biometric projections based on your exact body metrics.</p>

          <!-- Biometrics Card -->
          <div class="doc-card-box">
            <h3 class="box-subheading">Athlete Biometric Profile</h3>
            <div class="doc-grid-4">
              <div class="metric-cell">
                <span class="m-label">Height</span>
                <span class="m-val">${user.heightCm} cm</span>
              </div>
              <div class="metric-cell">
                <span class="m-label">Starting BMI</span>
                <span class="m-val">${bmi}</span>
              </div>
              <div class="metric-cell">
                <span class="m-label">Projected Target BMI</span>
                <span class="m-val" style="color: var(--accent-emerald)">${targetBmi}</span>
              </div>
              <div class="metric-cell">
                <span class="m-label">Weekly Velocity</span>
                <span class="m-val">${plan.feasibility?.weeklyRateKg > 0 ? '+' : ''}${plan.feasibility?.weeklyRateKg} kg/wk</span>
              </div>
            </div>
          </div>

          <!-- Transformation Milestone Timeline -->
          <div class="doc-section-block">
            <h3 class="box-subheading">Biometric Change Milestones</h3>
            <div class="timeline-milestones-list">
              <div class="timeline-item">
                <div class="milestone-badge">WEEKS 1 - 2 (${addWeeks(2)})</div>
                <div class="milestone-text">
                  <strong>Neurological Awakening & Bloat Reduction:</strong>
                  Initial 1.5 - 2.5 kg water bloat dropped, morning brain fog clears, circadian cortisol resets, and atomic habit loops are anchored into daily cues.
                </div>
              </div>

              <div class="timeline-item">
                <div class="milestone-badge">WEEKS 3 - 4 (${addWeeks(4)})</div>
                <div class="milestone-text">
                  <strong>Biomechanical Adaptation & Posture Shift:</strong>
                  Clothes fit noticeably looser/firmer around waist and shoulders. Tendon stiffness disappears and neuromuscular recruitment increases by 20-30%.
                </div>
              </div>

              <div class="timeline-item">
                <div class="milestone-badge">WEEKS 5 - 8 (${addWeeks(8)})</div>
                <div class="milestone-text">
                  <strong>Visible Muscle Definition & Metabolic Acceleration:</strong>
                  Muscle striations become visible, visceral fat layer thins, progressive overload numbers hit personal bests, and clean eating becomes an effortless reflex.
                </div>
              </div>

              <div class="timeline-item">
                <div class="milestone-badge">WEEKS 9 - 12+ (${addWeeks(12)})</div>
                <div class="milestone-text">
                  <strong>Full Transformation & Autopilot Mastery:</strong>
                  Target body weight of ${user.targetWeightKg} kg achieved. New metabolic set-point established to prevent weight rebound permanently.
                </div>
              </div>
            </div>
          </div>

          <!-- Caloric Strategy Summary -->
          <div class="doc-card-box">
            <h3 class="box-subheading">Daily Metabolic Energy Target</h3>
            <div class="doc-grid-4">
              <div class="metric-cell"><span class="m-label">Daily Calories</span><span class="m-val">${plan.nutrition?.targetCalories} kcal</span></div>
              <div class="metric-cell"><span class="m-label">Protein Target</span><span class="m-val">${plan.nutrition?.protein}g / day</span></div>
              <div class="metric-cell"><span class="m-label">Carb Target</span><span class="m-val">${plan.nutrition?.carbs}g / day</span></div>
              <div class="metric-cell"><span class="m-label">Hydration</span><span class="m-val">${plan.nutrition?.waterLiters}L / day</span></div>
            </div>
          </div>

          <div class="pdf-page-footer">
            <span>MotionMint OS &copy; 2026</span>
            <span>Biometric Reality Engine</span>
          </div>
        </div>

        <!-- ==========================================
             PAGE 3: BASIC / FOUNDATION EXERCISES
             ========================================== -->
        <div class="pdf-page page-3">
          <div class="pdf-page-header">
            <span class="pdf-brand-tag">EXERCISE CURRICULUM — TIER 1</span>
            <span class="pdf-page-num">Page 3 of 7</span>
          </div>

          <h2 class="doc-page-title">Page 3: Basic & Foundation Exercises</h2>
          <p class="doc-page-desc">Master these foundational movement patterns (RPE 6-7) to condition tendons, stabilize core joints, and establish flawless lifting mechanics.</p>

          <div class="doc-exercise-table">
            ${basicExercises.map((ex, i) => `
              <div class="doc-ex-card">
                <div class="doc-ex-top">
                  <span class="ex-idx">0${i + 1}</span>
                  <div class="ex-info">
                    <h4 class="ex-name-pdf">${ex.name}</h4>
                    <span class="ex-muscles-pdf">Target: ${ex.muscles.join(', ')}</span>
                  </div>
                  <div class="ex-prescription">
                    <span>${ex.defaultSets} Sets × ${ex.defaultReps}</span>
                    <small>Rest: ${ex.restSeconds}s</small>
                  </div>
                </div>

                <div class="ex-cues-pdf">
                  <strong>Execution & Form Cues:</strong>
                  <ul>
                    ${ex.cues.map(c => `<li>${c}</li>`).join('')}
                  </ul>
                  <div class="ex-mods-pdf">
                    <span><strong>Equipment:</strong> ${ex.gymEquipment || ex.equipment}</span> | 
                    <span><strong>Easier Mod:</strong> ${ex.modifications?.easier}</span>
                    ${ex.progressionNotes ? `<br><small style="color: var(--accent-emerald)"><strong>🎯 Problem Antidote:</strong> ${ex.progressionNotes}</small>` : ''}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="pdf-page-footer">
            <span>MotionMint OS &copy; 2026</span>
            <span>Phase 1: Foundation</span>
          </div>
        </div>

        <!-- ==========================================
             PAGE 4: INTERMEDIATE EXERCISES
             ========================================== -->
        <div class="pdf-page page-4">
          <div class="pdf-page-header">
            <span class="pdf-brand-tag">EXERCISE CURRICULUM — TIER 2</span>
            <span class="pdf-page-num">Page 4 of 7</span>
          </div>

          <h2 class="doc-page-title">Page 4: Intermediate & Progressive Overload</h2>
          <p class="doc-page-desc">Heavier compound movements and gym cable mechanics (RPE 7.5-8.5) to trigger muscle fiber recruitment and accelerate fat oxidation.</p>

          <div class="doc-exercise-table">
            ${intermediateExercises.map((ex, i) => `
              <div class="doc-ex-card">
                <div class="doc-ex-top">
                  <span class="ex-idx">0${i + 1}</span>
                  <div class="ex-info">
                    <h4 class="ex-name-pdf">${ex.name}</h4>
                    <span class="ex-muscles-pdf">Target: ${ex.muscles.join(', ')}</span>
                  </div>
                  <div class="ex-prescription">
                    <span>${ex.defaultSets} Sets × ${ex.defaultReps}</span>
                    <small>Rest: ${ex.restSeconds}s</small>
                  </div>
                </div>

                <div class="ex-cues-pdf">
                  <strong>Execution & Form Cues:</strong>
                  <ul>
                    ${ex.cues.map(c => `<li>${c}</li>`).join('')}
                  </ul>
                  <div class="ex-mods-pdf">
                    <span><strong>Equipment:</strong> ${ex.gymEquipment || ex.equipment}</span> | 
                    <span><strong>Harder Mod:</strong> ${ex.modifications?.harder}</span>
                    ${ex.progressionNotes ? `<br><small style="color: var(--accent-emerald)"><strong>🎯 Problem Antidote:</strong> ${ex.progressionNotes}</small>` : ''}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="pdf-page-footer">
            <span>MotionMint OS &copy; 2026</span>
            <span>Phase 2: Hypertrophy</span>
          </div>
        </div>

        <!-- ==========================================
             PAGE 5: ADVANCED EXERCISES
             ========================================== -->
        <div class="pdf-page page-5">
          <div class="pdf-page-header">
            <span class="pdf-brand-tag">EXERCISE CURRICULUM — TIER 3</span>
            <span class="pdf-page-num">Page 5 of 7</span>
          </div>

          <h2 class="doc-page-title">Page 5: Advanced & Peak Intensity Exercises</h2>
          <p class="doc-page-desc">Maximum density compound lifts, unilateral stability, and peak conditioning finishers (RPE 8.5-9.5) to achieve peak physical condition.</p>

          <div class="doc-exercise-table">
            ${advancedExercises.map((ex, i) => `
              <div class="doc-ex-card">
                <div class="doc-ex-top">
                  <span class="ex-idx">0${i + 1}</span>
                  <div class="ex-info">
                    <h4 class="ex-name-pdf">${ex.name}</h4>
                    <span class="ex-muscles-pdf">Target: ${ex.muscles.join(', ')}</span>
                  </div>
                  <div class="ex-prescription">
                    <span>${ex.defaultSets} Sets × ${ex.defaultReps}</span>
                    <small>Rest: ${ex.restSeconds}s</small>
                  </div>
                </div>

                <div class="ex-cues-pdf">
                  <strong>Execution & Form Cues:</strong>
                  <ul>
                    ${ex.cues.map(c => `<li>${c}</li>`).join('')}
                  </ul>
                  <div class="ex-mods-pdf">
                    <span><strong>Equipment:</strong> ${ex.gymEquipment || ex.equipment}</span> | 
                    <span><strong>Advanced Peak:</strong> ${ex.modifications?.harder}</span>
                    ${ex.progressionNotes ? `<br><small style="color: var(--accent-emerald)"><strong>🎯 Problem Antidote:</strong> ${ex.progressionNotes}</small>` : ''}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="pdf-page-footer">
            <span>MotionMint OS &copy; 2026</span>
            <span>Phase 3: Peak Performance</span>
          </div>
        </div>

        <!-- ==========================================
             PAGE 6: DAILY FOOD BLUEPRINT & MEALS
             ========================================== -->
        <div class="pdf-page page-6">
          <div class="pdf-page-header">
            <span class="pdf-brand-tag">NUTRITION & FUELING ARCHITECTURE</span>
            <span class="pdf-page-num">Page 6 of 7</span>
          </div>

          <h2 class="doc-page-title">Page 6: Foods to Take on a Daily Basis</h2>
          <p class="doc-page-desc">Your customized 4-meal daily schedule, whole food portions, and high-impact food swaps.</p>

          <div class="doc-meals-schedule">
            <div class="meal-block-pdf">
              <div class="meal-hdr-pdf">
                <span class="m-time">07:30 - 09:00 AM</span>
                <h4>MEAL 1: High-Protein Ignition Breakfast (~${Math.round(plan.nutrition?.targetCalories * 0.28)} kcal)</h4>
              </div>
              <p class="meal-food-txt">
                • 2 Whole Eggs + 3 Liquid Egg Whites scrambled with baby spinach<br>
                • 50-70g Rolled Oats with 1/2 scoop Whey Protein & blueberries<br>
                • 500ml Water + Black Coffee / Green Tea
              </p>
            </div>

            <div class="meal-block-pdf">
              <div class="meal-hdr-pdf">
                <span class="m-time">12:30 - 01:30 PM</span>
                <h4>MEAL 2: Metabolic Clean Energy Lunch (~${Math.round(plan.nutrition?.targetCalories * 0.32)} kcal)</h4>
              </div>
              <p class="meal-food-txt">
                • 180g Grilled Chicken Breast / 200g Seared Tofu or Salmon<br>
                • 150g Baked Sweet Potato or 1 cup Brown Basmati Rice<br>
                • 2 Cups Steamed Broccoli, Zucchini & Green Beans with olive oil drizzle
              </p>
            </div>

            <div class="meal-block-pdf">
              <div class="meal-hdr-pdf">
                <span class="m-time">04:00 - 05:00 PM</span>
                <h4>MEAL 3: Mid-Day Pre-Workout Refuel (~${Math.round(plan.nutrition?.targetCalories * 0.15)} kcal)</h4>
              </div>
              <p class="meal-food-txt">
                • 170g 0% Plain Greek Yogurt / Skyr with sliced banana or apple<br>
                • 20g Raw Almonds or 1 Tbsp All-Natural Peanut Butter
              </p>
            </div>

            <div class="meal-block-pdf">
              <div class="meal-hdr-pdf">
                <span class="m-time">07:00 - 08:30 PM</span>
                <h4>MEAL 4: Recovery & Sleep Dinner (~${Math.round(plan.nutrition?.targetCalories * 0.25)} kcal)</h4>
              </div>
              <p class="meal-food-txt">
                • 160g Baked Salmon / Lean Turkey Mince / Low-Fat Cottage Cheese<br>
                • Large Mixed Green Salad with lemon juice, cucumbers & asparagus<br>
                • 100g Steamed Quinoa or Roasted Butternut Squash
              </p>
            </div>
          </div>

          <!-- Food Swaps -->
          <div class="doc-card-box">
            <h4 class="box-subheading">High-Impact Food Swaps</h4>
            <div class="swaps-grid-pdf">
              ${FOOD_SWAPS.slice(0, 2).map(s => `
                <div class="swap-item-pdf">
                  <span class="swap-from">❌ ${s.original}</span>
                  <span class="swap-to">✅ ${s.swap}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="pdf-page-footer">
            <span>MotionMint OS &copy; 2026</span>
            <span>Fueling Blueprint</span>
          </div>
        </div>

        <!-- ==========================================
             PAGE 7: THE END (CONTRACT & CLOSING)
             ========================================== -->
        <div class="pdf-page page-7">
          <div class="pdf-page-header">
            <span class="pdf-brand-tag">IDENTITY CONTRACT & SEAL</span>
            <span class="pdf-page-num">Page 7 of 7</span>
          </div>

          <div class="closing-hero-block">
            <h2 class="closing-title">THE END OF EXCUSES. THE START OF IDENTITY.</h2>
            <p class="closing-quote">
              "You do not rise to the level of your goals. You fall to the level of your systems."
            </p>
          </div>

          <div class="doc-card-box">
            <h3 class="box-subheading">Your Daily Non-Negotiable Rules</h3>
            <div class="rules-checklist-pdf">
              <div class="rule-chk"><span>✓</span> <strong>Never Miss Twice:</strong> Missing one day is life; missing twice is the start of a bad habit.</div>
              <div class="rule-chk"><span>✓</span> <strong>The 10-Min MED Safety:</strong> When busy, complete the 10-minute minimum effective dose rather than skipping.</div>
              <div class="rule-chk"><span>✓</span> <strong>Hydro First:</strong> Drink 500ml water before taking your first morning step or checking your phone.</div>
              <div class="rule-chk"><span>✓</span> <strong>Close the Kitchen:</strong> Stop consuming calories 2.5 hours before your targeted bedtime.</div>
            </div>
          </div>

          <div class="contract-signature-box">
            <div class="contract-text">
              I, <strong>${user.name || 'Athlete'}</strong>, commit to following this MotionMint transformation blueprint across the next <strong>${user.timeframeMonths} Month(s)</strong>. I understand that discipline builds freedom, and consistency builds permanent transformation.
            </div>

            <div class="sig-row">
              <div class="sig-line">
                <span class="sig-label">Athlete Signature</span>
                <span class="sig-val">${user.name || 'Champion'}</span>
              </div>
              <div class="sig-line">
                <span class="sig-label">Date Activated</span>
                <span class="sig-val">${new Date().toLocaleDateString()}</span>
              </div>
              <div class="sig-seal">
                🌿 MOTIONMINT VERIFIED
              </div>
            </div>
          </div>

          <div class="pdf-page-footer">
            <span>MotionMint OS &copy; 2026</span>
            <span>All Rights Reserved</span>
          </div>
        </div>

      </div>
    `;

    document.body.appendChild(modal);

    // Print button trigger
    modal.querySelector('#btn-trigger-print')?.addEventListener('click', () => {
      window.print();
    });

    // Close button
    const close = () => modal.remove();
    modal.querySelector('#btn-close-pdf-modal')?.addEventListener('click', close);
  }
}
