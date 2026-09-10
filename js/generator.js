// Intelligent Transformation Plan Generator for MotionMint
// Fuses Behavioral Psychology, 3-Tier Exercise Periodization, and Metabolic Nutrition

import { HABIT_DATABASE, HABIT_CATEGORIES } from './data/habits.js';
import { EXERCISE_DATABASE, EXERCISE_TIERS, MUSCLE_GROUPS, ExercisePrescriptionEngine, BODY_PROBLEMS } from './data/exercises.js';
import { GOALS, OBSTACLES, TIMEFRAMES } from './data/presets.js';
import { MealPlanSynthesizer, FOOD_CATEGORIES, FOOD_SWAPS } from './data/foods.js';

export class PlanGenerator {
  static generatePlan(userData) {
    const {
      name = 'Champion',
      age = 28,
      gender = 'male',
      heightCm = 175,
      weightKg = 78,
      targetWeightKg = 72,
      goal = 'fat_loss',
      customGoalConfig = null,
      timeframeMonths = 3,
      obstacles = ['inconsistency', 'cravings'],
      equipment = 'gym',
      daysPerWeek = 4,
      activityLevel = 'moderate'
    } = userData;

    const goalConfig = customGoalConfig || GOALS[goal.toUpperCase()] || GOALS.FAT_LOSS;
    const timeframeConfig = TIMEFRAMES.find(t => t.months === timeframeMonths) || TIMEFRAMES[1];

    const effectiveGoal = goalConfig.detectedGoal || (typeof goal === 'string' ? goal.toLowerCase() : 'fat_loss');
    const focusAreas = goalConfig.focusAreas || [];

    // Combine any diagnosed obstacles & NLP-detected problems
    const combinedProblems = Array.from(new Set([
      ...(obstacles || []),
      ...(goalConfig.detectedProblems || [])
    ]));

    // 1. Calculate Metabolic & Nutrition Profile
    const nutrition = this.calculateNutrition({
      age,
      gender,
      heightCm,
      weightKg,
      targetWeightKg,
      goalConfig,
      activityLevel,
      timeframeMonths
    });

    // 2. Feasibility & Safety Reality Check
    const feasibility = this.calculateFeasibility({
      weightKg,
      targetWeightKg,
      timeframeMonths,
      goal: effectiveGoal
    });

    // 3. Synthesize Tailored Habit Stack (Distinct per goal and custom prompt)
    const habits = this.synthesizeHabits({
      goal: effectiveGoal,
      obstacles: combinedProblems,
      timeframeConfig,
      customHabitStacks: goalConfig.customHabitStacks || []
    });

    // 4. Generate Periodized Multi-Phase Workout Structure
    const phases = this.generatePhases({
      goal: effectiveGoal,
      timeframeMonths,
      equipment,
      daysPerWeek,
      problems: combinedProblems,
      focusAreas
    });

    // 5. Generate Weekly Schedule & Today's Routine
    const weeklySchedule = this.generateWeeklySchedule({
      daysPerWeek,
      equipment,
      goal: effectiveGoal,
      problems: combinedProblems,
      focusAreas,
      tier: EXERCISE_TIERS.BASIC,
      phaseIndex: 0
    });

    // 6. Generate Built-in Daily Meals Blueprint
    const dailyMeals = MealPlanSynthesizer.generateDailyMealSchedule({
      targetCalories: nutrition.targetCalories,
      proteinGrams: nutrition.protein,
      carbsGrams: nutrition.carbs,
      fatGrams: nutrition.fats,
      goalId: effectiveGoal
    });

    // 7. Obstacle Antidote Action Plan
    const obstacleAntidotes = combinedProblems.map(obsId => {
      const found = OBSTACLES.find(o => o.id === obsId);
      return found || {
        id: obsId,
        label: obsId.replace(/_/g, ' '),
        icon: '💡',
        antidoteTitle: 'Custom Problem Protocol',
        antidoteDesc: 'Targeted corrective biomechanics and progressive adaptation.'
      };
    });

    return {
      id: `plan_${Date.now()}`,
      createdAt: new Date().toISOString(),
      userName: name,
      goal: goalConfig,
      timeframe: timeframeConfig,
      nutrition,
      dailyMeals,
      feasibility,
      habits,
      phases,
      weeklySchedule,
      obstacleAntidotes,
      equipment,
      daysPerWeek,
      problems: combinedProblems
    };
  }

  static calculateNutrition({ age, gender, heightCm, weightKg, targetWeightKg, goalConfig, activityLevel, timeframeMonths }) {
    // Mifflin-St Jeor Equation
    let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
    bmr += (gender === 'male' ? 5 : -161);

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725
    };

    const multiplier = activityMultipliers[activityLevel] || 1.55;
    const tdee = Math.round(bmr * multiplier);

    // Target Calories
    let targetCalories = Math.round(tdee * (1 + (goalConfig.calorieFactor ?? -0.15)));
    // Enforce safety floor
    if (gender === 'female' && targetCalories < 1200) targetCalories = 1200;
    if (gender === 'male' && targetCalories < 1500) targetCalories = 1500;

    // Macro Calculation
    const targetProteinGrams = Math.round(weightKg * (goalConfig.proteinPerKg || 2.0));
    const proteinCalories = targetProteinGrams * 4;

    const fatCalories = targetCalories * (goalConfig.fatRatio || 0.25);
    const targetFatGrams = Math.round(fatCalories / 9);

    const carbCalories = Math.max(0, targetCalories - proteinCalories - fatCalories);
    const targetCarbGrams = Math.round(carbCalories / 4);

    // Hydration baseline in liters
    const waterLiters = Math.max(2.5, +(weightKg * 0.038).toFixed(1));

    // Behavioral Nutrition Rules
    const behavioralRules = [
      {
        title: 'Pre-Meal Hydro Anchor',
        rule: 'Drink 400-500ml water 15 minutes before your two largest meals to naturally enhance satiety.',
        icon: '💧'
      },
      {
        title: 'The Palm-Fist Plate Rule',
        rule: 'Each plate should feature: 1-2 palms of dense protein, 2 fists of colorful veggies, and 1 cupped hand of complex carbs.',
        icon: '🥗'
      },
      {
        title: 'The 80/20 Mindful Rule',
        rule: 'Aim for 80% whole single-ingredient foods, allowing 20% flexibility so you never feel restricted or trigger binge cycles.',
        icon: '⚖️'
      }
    ];

    return {
      bmr: Math.round(bmr),
      tdee,
      targetCalories,
      protein: targetProteinGrams,
      carbs: targetCarbGrams,
      fats: targetFatGrams,
      waterLiters,
      behavioralRules
    };
  }

  static calculateFeasibility({ weightKg, targetWeightKg, timeframeMonths, goal }) {
    const totalChangeKg = targetWeightKg - weightKg;
    const weeks = timeframeMonths * 4.33;
    const weeklyRateKg = totalChangeKg / weeks;

    let score = 95; // 0 - 100%
    let rating = 'Highly Feasible & Sustainable';
    let color = '#10b981'; // Green
    let advice = 'Your timeline aligns with natural physiological adaptation. You will retain muscle and maintain steady energy.';
    let isCrashRisk = false;

    if (goal === 'fat_loss') {
      const absLossRate = Math.abs(weeklyRateKg);
      if (absLossRate > 1.2) {
        score = 45;
        rating = 'Severe Crash Risk (High Burnout)';
        color = '#ef4444';
        isCrashRisk = true;
        advice = `Losing ${Math.abs(totalChangeKg)}kg in ${timeframeMonths} month(s) (~${absLossRate.toFixed(1)}kg/week) would force extreme starvation, slowing your thyroid and causing rapid rebound. We recommend pacing over at least ${Math.ceil(Math.abs(totalChangeKg) / 0.6 / 4.33)} months.`;
      } else if (absLossRate > 0.8) {
        score = 75;
        rating = 'Aggressive Sprint Pace';
        color = '#f59e0b';
        advice = 'Aggressive pace. Requires strict adherence to protein intake and sleep habits to safeguard muscle mass.';
      }
    } else if (goal === 'muscle_gain') {
      if (weeklyRateKg > 0.6) {
        score = 60;
        rating = 'Excessive Fat Spillover Risk';
        color = '#f59e0b';
        advice = `Natural muscle gain occurs at ~0.2-0.4kg/week. Gaining faster than ${weeklyRateKg.toFixed(2)}kg/week will mostly result in excess body fat storage.`;
      }
    }

    return {
      score,
      rating,
      color,
      advice,
      isCrashRisk,
      totalChangeKg: +totalChangeKg.toFixed(1),
      weeklyRateKg: +weeklyRateKg.toFixed(2),
      estimatedWeeks: Math.round(weeks)
    };
  }

  static synthesizeHabits({ goal = 'fat_loss', obstacles = [], timeframeConfig, customHabitStacks = [] }) {
    const selected = [];
    const habitLimit = Math.max(3, (timeframeConfig?.habitSlots || 4));

    // 1. Add custom habit stacks from NLP/user custom prompt first
    if (customHabitStacks && customHabitStacks.length > 0) {
      customHabitStacks.forEach(h => {
        if (!selected.some(s => s.id === h.id)) {
          selected.push(h);
        }
      });
    }

    // 2. Goal-Specific Core Habits (Guarantees distinct habit stacks for Fat Loss vs Muscle Gain vs Mobility)
    const GOAL_PRIORITY_HABIT_IDS = {
      fat_loss: ['e_kitchen_close', 'a_walk_10', 'd_step_goal', 'd_mindful_eating', 'm_water_500'],
      muscle_gain: ['w_post_protein', 'm_protein_breakfast', 'e_sleep_7_5', 'w_dynamic_warmup', 'e_screen_off'],
      stamina_mobility: ['m_mobility_5', 'a_posture_reset', 'm_sunlight_10', 'w_dynamic_warmup', 'd_step_goal'],
      recomposition: ['m_protein_breakfast', 'a_walk_10', 'w_post_protein', 'e_sleep_7_5', 'd_mindful_eating']
    };

    const targetGoalKey = GOAL_PRIORITY_HABIT_IDS[goal] ? goal : 'fat_loss';
    const primaryIds = GOAL_PRIORITY_HABIT_IDS[targetGoalKey] || GOAL_PRIORITY_HABIT_IDS.fat_loss;

    primaryIds.forEach(id => {
      if (selected.length < habitLimit) {
        const found = HABIT_DATABASE.find(h => h.id === id);
        if (found && !selected.some(s => s.id === found.id)) {
          selected.push(found);
        }
      }
    });

    // 3. Add Obstacle-Specific Correctives if room remains
    obstacles.forEach(obsId => {
      if (selected.length < habitLimit) {
        const match = HABIT_DATABASE.find(h => 
          h.targetObstacles && 
          h.targetObstacles.includes(obsId) && 
          !selected.some(s => s.id === h.id)
        );
        if (match) {
          selected.push(match);
        }
      }
    });

    // 4. Safe fallback if still needed
    if (selected.length < habitLimit) {
      for (const h of HABIT_DATABASE) {
        if (selected.length >= habitLimit) break;
        if (!selected.some(s => s.id === h.id)) {
          selected.push(h);
        }
      }
    }

    return selected;
  }

  static generatePhases({ goal, timeframeMonths, equipment, daysPerWeek, problems = [], focusAreas = [] }) {
    const phases = [];
    const numPhases = timeframeMonths >= 6 ? 4 : (timeframeMonths === 3 ? 3 : 1);

    const phaseTitles = [
      {
        name: 'Phase 1: Biomechanical Foundation & Neuromuscular Awakening',
        focus: 'Flawless form, correcting muscular imbalances, tendon conditioning, and habit loops.',
        duration: timeframeMonths === 1 ? 'Weeks 1-4' : 'Weeks 1-4',
        repScheme: '10-15 reps (RPE 6-7)',
        intensity: 'Moderate Controlled',
        tier: EXERCISE_TIERS.BASIC
      },
      {
        name: 'Phase 2: Progressive Overload & Metabolic Hypertrophy',
        focus: 'Increasing resistance, muscle fiber recruitment, and accelerating metabolic burn.',
        duration: timeframeMonths === 3 ? 'Weeks 5-8' : 'Weeks 5-10',
        repScheme: '8-12 reps (RPE 7.5-8.5)',
        intensity: 'High Focus',
        tier: EXERCISE_TIERS.INTERMEDIATE
      },
      {
        name: 'Phase 3: Peak Conditioning & Muscular Sculpting',
        focus: 'Density training, short rest intervals, and athletic sculpting.',
        duration: timeframeMonths === 3 ? 'Weeks 9-12' : 'Weeks 11-18',
        repScheme: '6-10 heavy reps + burnout finishers (RPE 8.5-9.5)',
        intensity: 'Peak Output',
        tier: EXERCISE_TIERS.ADVANCED
      },
      {
        name: 'Phase 4: Autopilot Lifestyle Mastery & Strength Consolidation',
        focus: 'Long-term strength maintenance, deload management, and lifelong sustainability.',
        duration: 'Final Phase',
        repScheme: 'Varied autoregulation',
        intensity: 'Sustainable Mastery',
        tier: EXERCISE_TIERS.ADVANCED
      }
    ];

    for (let i = 0; i < numPhases; i++) {
      phases.push({
        phaseIndex: i + 1,
        ...phaseTitles[i],
        weeklySchedule: this.generateWeeklySchedule({
          daysPerWeek,
          equipment,
          goal,
          problems,
          focusAreas,
          tier: phaseTitles[i].tier,
          phaseIndex: i
        })
      });
    }

    return phases;
  }

  static generateWeeklySchedule({ daysPerWeek, equipment, goal = 'fat_loss', problems = [], focusAreas = [], tier = EXERCISE_TIERS.BASIC, phaseIndex = 0 }) {
    const schedule = [];
    const isFatLoss = goal === 'fat_loss';
    const isMuscle = goal === 'muscle_gain';

    // 1. Synthesize 4 Primary Core Anchor Exercises tailored to user goal, problems, and equipment
    const primaryAnchorTargetMuscles = isFatLoss 
      ? [MUSCLE_GROUPS.FULL_BODY, MUSCLE_GROUPS.LEGS_QUADS, MUSCLE_GROUPS.CHEST, MUSCLE_GROUPS.CORE]
      : (isMuscle 
        ? [MUSCLE_GROUPS.CHEST, MUSCLE_GROUPS.BACK, MUSCLE_GROUPS.LEGS_QUADS, MUSCLE_GROUPS.SHOULDERS]
        : [MUSCLE_GROUPS.BACK, MUSCLE_GROUPS.CORE, MUSCLE_GROUPS.LEGS_POSTERIOR, MUSCLE_GROUPS.MOBILITY]);

    const baseAnchorRoutine = ExercisePrescriptionEngine.synthesizeRoutine({
      routineName: 'Foundation Anchor Matrix',
      goal,
      problems,
      focusAreas,
      equipment,
      tier,
      targetMuscles: primaryAnchorTargetMuscles,
      exerciseCount: 5,
      dayIndex: 0
    });

    const coreAnchorExercises = baseAnchorRoutine.coreAnchorExercises; // Exact 4 anchor exercises

    if (daysPerWeek <= 3) {
      // 3-Day Matrix: Mon (DayIndex 0), Wed (DayIndex 1), Fri (DayIndex 2)
      const workoutA = ExercisePrescriptionEngine.synthesizeRoutine({
        routineName: isFatLoss ? 'Metabolic EPOC Ignition (Day 1 — Core + Burnout Finisher)' : (isMuscle ? 'Chest, Back & Core Power (Day 1 — 4 Core + Finisher)' : 'Spinal Alignment & Full Body Power (Day 1)'),
        goal,
        problems,
        focusAreas,
        equipment,
        tier,
        coreAnchorExercises,
        dayIndex: 0,
        exerciseCount: 5
      });
      workoutA.type = isFatLoss ? 'Metabolic Circuit' : (isMuscle ? 'Upper Hypertrophy' : 'Posture & Strength');
      workoutA.targetMuscles = isFatLoss ? ['Full Body', 'Quads', 'Chest', 'Core', 'Finisher'] : (isMuscle ? ['Chest', 'Back', 'Quads', 'Shoulders', 'Finisher'] : ['Back', 'Core', 'Mobility', 'Hamstrings', 'Accessory']);
      workoutA.estMinutes = 35;

      const workoutB = ExercisePrescriptionEngine.synthesizeRoutine({
        routineName: isFatLoss ? 'Metabolic Posterior EPOC (Day 2 — Core + Glute/Core Rotation)' : (isMuscle ? 'Heavy Hypertrophy Drive (Day 2 — 4 Core + Lat Sculpt)' : 'Joint Armor & Hip Balance (Day 2 — 4 Core + Mobility)'),
        goal,
        problems,
        focusAreas,
        equipment,
        tier,
        coreAnchorExercises,
        dayIndex: 1,
        exerciseCount: 5
      });
      workoutB.type = isFatLoss ? 'Posterior EPOC' : (isMuscle ? 'Strength Volume' : 'Joint Rehab');
      workoutB.targetMuscles = isFatLoss ? ['Full Body', 'Quads', 'Chest', 'Core', 'Posterior Armor'] : (isMuscle ? ['Chest', 'Back', 'Quads', 'Shoulders', 'Arm Sculpt'] : ['Back', 'Core', 'Mobility', 'Hamstrings', 'Anti-Rotation']);
      workoutB.estMinutes = 35;

      const workoutC = ExercisePrescriptionEngine.synthesizeRoutine({
        routineName: isFatLoss ? 'High-Density EPOC Finisher (Day 3 — Core + Dynamic Core)' : (isMuscle ? 'Total Torso Hypertrophy (Day 3 — 4 Core + Shoulder Armor)' : 'Dynamic Stamina & Core Shield (Day 3 — 4 Core + Core Lock)'),
        goal,
        problems,
        focusAreas,
        equipment,
        tier,
        coreAnchorExercises,
        dayIndex: 2,
        exerciseCount: 5
      });
      workoutC.type = isFatLoss ? 'Metabolic Density' : (isMuscle ? 'Torso & Shoulders' : 'Stamina Flow');
      workoutC.targetMuscles = isFatLoss ? ['Full Body', 'Quads', 'Chest', 'Core', 'Dynamic Core'] : (isMuscle ? ['Chest', 'Back', 'Quads', 'Shoulders', 'Shoulder Armor'] : ['Back', 'Core', 'Mobility', 'Hamstrings', 'Glute Lock']);
      workoutC.estMinutes = 35;

      schedule.push({ day: 'Monday', isRest: false, workout: workoutA });
      schedule.push({ day: 'Tuesday', isRest: true, label: 'Active Recovery & Step Target' });
      schedule.push({ day: 'Wednesday', isRest: false, workout: workoutB });
      schedule.push({ day: 'Thursday', isRest: true, label: 'Mobility & Posture Reset' });
      schedule.push({ day: 'Friday', isRest: false, workout: workoutC });
      schedule.push({ day: 'Saturday', isRest: true, label: 'Outdoor Movement / Cardio' });
      schedule.push({ day: 'Sunday', isRest: true, label: 'Weekly Meal Prep & Habit Reset' });
    } else if (daysPerWeek === 4) {
      // 4-Day Matrix: Mon (Day 0), Tue (Day 1), Thu (Day 2), Fri (Day 3)
      const workout1 = ExercisePrescriptionEngine.synthesizeRoutine({
        routineName: isFatLoss ? 'Upper & Core Metabolic Burn (Day 1 — 4 Core + Upper Finisher)' : (isMuscle ? 'Heavy Press & Row Foundation (Day 1 — 4 Core + Arm Sculpt)' : 'Thoracic Posture Alignment (Day 1 — 4 Core + Scapular Lock)'),
        goal,
        problems,
        focusAreas,
        equipment,
        tier,
        coreAnchorExercises,
        dayIndex: 0,
        exerciseCount: 5
      });
      workout1.type = isFatLoss ? 'Upper Metabolic' : (isMuscle ? 'Upper Hypertrophy' : 'Posture Rehab');
      workout1.targetMuscles = ['Chest', 'Back', 'Quads', 'Core', 'Rotating Accessory'];
      workout1.estMinutes = 35;

      const workout2 = ExercisePrescriptionEngine.synthesizeRoutine({
        routineName: isFatLoss ? 'Metabolic Quad & Core Drive (Day 2 — 4 Core + Posterior Finisher)' : (isMuscle ? 'Hypertrophy Power Drive (Day 2 — 4 Core + Deltoid Armor)' : 'Knee-Safe Pelvic Alignment (Day 2 — 4 Core + Hip Mobility)'),
        goal,
        problems,
        focusAreas,
        equipment,
        tier,
        coreAnchorExercises,
        dayIndex: 1,
        exerciseCount: 5
      });
      workout2.type = isFatLoss ? 'Lower Metabolic' : (isMuscle ? 'Lower Strength' : 'Joint Alignment');
      workout2.targetMuscles = ['Chest', 'Back', 'Quads', 'Core', 'Rotating Accessory'];
      workout2.estMinutes = 35;

      const workout3 = ExercisePrescriptionEngine.synthesizeRoutine({
        routineName: isFatLoss ? 'High-Density EPOC Shred (Day 3 — 4 Core + Dynamic Core)' : (isMuscle ? 'Lat Width & Upper Thickness (Day 3 — 4 Core + Bicep Finisher)' : 'Spine Alignment & Rotator Armor (Day 3 — 4 Core + Rotator Cuff)'),
        goal,
        problems,
        focusAreas,
        equipment,
        tier,
        coreAnchorExercises,
        dayIndex: 2,
        exerciseCount: 5
      });
      workout3.type = isFatLoss ? 'Upper Burn' : (isMuscle ? 'Upper Volume' : 'Rotator Cuff & Spine');
      workout3.targetMuscles = ['Chest', 'Back', 'Quads', 'Core', 'Rotating Accessory'];
      workout3.estMinutes = 35;

      const workout4 = ExercisePrescriptionEngine.synthesizeRoutine({
        routineName: isFatLoss ? 'Posterior Chain & Glute Density (Day 4 — 4 Core + Glute Burnout)' : (isMuscle ? 'Total Hypertrophy Lock (Day 4 — 4 Core + Tricep Armor)' : 'Unilateral Balance & Hip Stability (Day 4 — 4 Core + Stability)'),
        goal,
        problems,
        focusAreas,
        equipment,
        tier,
        coreAnchorExercises,
        dayIndex: 3,
        exerciseCount: 5
      });
      workout4.type = isFatLoss ? 'Posterior Density' : (isMuscle ? 'Glute & Hamstring' : 'Hip Mobility');
      workout4.targetMuscles = ['Chest', 'Back', 'Quads', 'Core', 'Rotating Accessory'];
      workout4.estMinutes = 35;

      schedule.push({ day: 'Monday', isRest: false, workout: workout1 });
      schedule.push({ day: 'Tuesday', isRest: false, workout: workout2 });
      schedule.push({ day: 'Wednesday', isRest: true, label: 'Active Walk & Foam Rolling' });
      schedule.push({ day: 'Thursday', isRest: false, workout: workout3 });
      schedule.push({ day: 'Friday', isRest: false, workout: workout4 });
      schedule.push({ day: 'Saturday', isRest: true, label: 'Outdoor Movement & Mobility' });
      schedule.push({ day: 'Sunday', isRest: true, label: 'Rest & Weekly Prep' });
    } else {
      // 5-6 Day Matrix: Mon (0), Tue (1), Wed (2), Fri (3), Sat (4)
      const workout1 = ExercisePrescriptionEngine.synthesizeRoutine({
        routineName: isFatLoss ? 'High-EPOC Push Density (Day 1 — 4 Core + Tricep Burnout)' : (isMuscle ? 'Heavy Push Power Matrix (Day 1 — 4 Core + Deltoid Armor)' : 'Push Posture Protection (Day 1 — 4 Core + Scapular Shield)'),
        goal,
        problems,
        focusAreas,
        equipment,
        tier,
        coreAnchorExercises,
        dayIndex: 0,
        exerciseCount: 5
      });
      workout1.type = isFatLoss ? 'Push EPOC' : (isMuscle ? 'Push Hypertrophy' : 'Posture & Shoulders');
      workout1.targetMuscles = ['Chest', 'Back', 'Quads', 'Core', 'Push Accessory'];
      workout1.estMinutes = 35;

      const workout2 = ExercisePrescriptionEngine.synthesizeRoutine({
        routineName: isFatLoss ? 'Pull Movement Posterior Burn (Day 2 — 4 Core + Bicep Finisher)' : (isMuscle ? 'Heavy Pull Width Matrix (Day 2 — 4 Core + Lat Armor)' : 'Pull Spine Decompression (Day 2 — 4 Core + Lumbar Shield)'),
        goal,
        problems,
        focusAreas,
        equipment,
        tier,
        coreAnchorExercises,
        dayIndex: 1,
        exerciseCount: 5
      });
      workout2.type = isFatLoss ? 'Pull EPOC' : (isMuscle ? 'Pull Hypertrophy' : 'Spinal Pull');
      workout2.targetMuscles = ['Chest', 'Back', 'Quads', 'Core', 'Pull Accessory'];
      workout2.estMinutes = 35;

      const workout3 = ExercisePrescriptionEngine.synthesizeRoutine({
        routineName: isFatLoss ? 'Lower Body Quad Circuit (Day 3 — 4 Core + Calves/Glutes)' : (isMuscle ? 'Heavy Leg Hypertrophy Matrix (Day 3 — 4 Core + Hamstring Lock)' : 'Leg Longevity Alignment (Day 3 — 4 Core + Hip Mobility)'),
        goal,
        problems,
        focusAreas,
        equipment,
        tier,
        coreAnchorExercises,
        dayIndex: 2,
        exerciseCount: 5
      });
      workout3.type = isFatLoss ? 'Legs EPOC' : (isMuscle ? 'Leg Strength' : 'Leg Mobility');
      workout3.targetMuscles = ['Chest', 'Back', 'Quads', 'Core', 'Leg Accessory'];
      workout3.estMinutes = 35;

      const workout4 = ExercisePrescriptionEngine.synthesizeRoutine({
        routineName: isFatLoss ? 'Dynamic Core & Push Density (Day 4 — 4 Core + Anti-Rotation)' : (isMuscle ? 'Shoulder & Arm Volume Matrix (Day 4 — 4 Core + Trap Armor)' : 'Spine Alignment & Rotator Lock (Day 4 — 4 Core + Rotator Shield)'),
        goal,
        problems,
        focusAreas,
        equipment,
        tier,
        coreAnchorExercises,
        dayIndex: 3,
        exerciseCount: 5
      });
      workout4.type = isFatLoss ? 'Density Burn' : (isMuscle ? 'Volume Matrix' : 'Joint Armor');
      workout4.targetMuscles = ['Chest', 'Back', 'Quads', 'Core', 'Density Accessory'];
      workout4.estMinutes = 35;

      const workout5 = ExercisePrescriptionEngine.synthesizeRoutine({
        routineName: isFatLoss ? 'Total Body Metabolic Finisher (Day 5 — 4 Core + EPOC Burnout)' : (isMuscle ? 'Posterior Chain Hypertrophy (Day 5 — 4 Core + Glute Armor)' : 'Full Body Mobility Flow (Day 5 — 4 Core + Thoracic Flow)'),
        goal,
        problems,
        focusAreas,
        equipment,
        tier,
        coreAnchorExercises,
        dayIndex: 4,
        exerciseCount: 5
      });
      workout5.type = isFatLoss ? 'Total Finisher' : (isMuscle ? 'Posterior Hypertrophy' : 'Mobility Flow');
      workout5.targetMuscles = ['Chest', 'Back', 'Quads', 'Core', 'Finisher Accessory'];
      workout5.estMinutes = 35;

      schedule.push({ day: 'Monday', isRest: false, workout: workout1 });
      schedule.push({ day: 'Tuesday', isRest: false, workout: workout2 });
      schedule.push({ day: 'Wednesday', isRest: false, workout: workout3 });
      schedule.push({ day: 'Thursday', isRest: true, label: 'Active Walk & Foam Rolling' });
      schedule.push({ day: 'Friday', isRest: false, workout: workout4 });
      schedule.push({ day: 'Saturday', isRest: false, workout: workout5 });
      schedule.push({ day: 'Sunday', isRest: true, label: 'Deep Recovery' });
    }

    return schedule;
  }
}
