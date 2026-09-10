// Goal Presets, Obstacle Antidotes, and Timeframe Projections for MotionMint

export const GOALS = {
  FAT_LOSS: {
    id: 'fat_loss',
    name: 'Sustainable Fat Loss & Definition',
    icon: '🔥',
    tagline: 'Burn visceral and stubborn fat while preserving metabolic lean muscle.',
    calorieFactor: -0.20, // 20% deficit
    proteinPerKg: 2.0, // grams per kg
    carbRatio: 0.40,
    fatRatio: 0.25,
    workoutFocus: 'Metabolic Resistance + NEAT Steps',
    phaseStrategy: 'Progressive Caloric Adaptation & Habit Resilience',
    color: '#ef4444'
  },
  MUSCLE_GAIN: {
    id: 'muscle_gain',
    name: 'Lean Muscle & Strength Hypertrophy',
    icon: '💪',
    tagline: 'Build dense, functional muscle with progressive overload and nutrient timing.',
    calorieFactor: 0.12, // 12% surplus
    proteinPerKg: 2.2,
    carbRatio: 0.50,
    fatRatio: 0.25,
    workoutFocus: 'Hypertrophy & Progressive Tension',
    phaseStrategy: 'Volume Accumulation & Muscle Protein Synthesis',
    color: '#8b5cf6'
  },
  RECOMPOSITION: {
    id: 'recomposition',
    name: 'Body Recomposition (Lose Fat + Tone Up)',
    icon: '⚡',
    tagline: 'Simultaneously drop body fat and firm up muscle tone at maintenance calories.',
    calorieFactor: -0.05, // 5% slight deficit/maintenance
    proteinPerKg: 2.1,
    carbRatio: 0.45,
    fatRatio: 0.25,
    workoutFocus: 'Strength Circuits + Habit Optimization',
    phaseStrategy: 'Structural Balance & Daily Momentum',
    color: '#06b6d4'
  },
  STAMINA_MOBILITY: {
    id: 'stamina_mobility',
    name: 'Vitality, Mobility & Peak Daily Energy',
    icon: '✨',
    tagline: 'Eradicate brain fog, desk stiffness, and fatigue with vibrant movement.',
    calorieFactor: 0.0, // Maintenance
    proteinPerKg: 1.6,
    carbRatio: 0.50,
    fatRatio: 0.30,
    workoutFocus: 'Full Body Flow + Aerobic Base',
    phaseStrategy: 'Circadian Alignment & Joint Longevity',
    color: '#10b981'
  }
};

export const OBSTACLES = [
  // --- Orthopedic & Joint Specific Problems ---
  {
    id: 'lower_back_pain',
    category: 'body_problem',
    label: 'Lower Back & Lumbar Disc Sensitivity',
    icon: '🩹',
    antidoteTitle: 'Neutral Spine & Lumbar Deload Protocol',
    antidoteDesc: 'Replaces axial spinal compression with chest-supported rows, McGill bird-dogs, and glute bridges.',
    recommendedHabitIds: ['m_mobility_5', 'a_posture_reset', 'w_dynamic_warmup']
  },
  {
    id: 'knee_pain',
    category: 'body_problem',
    label: 'Knee Pain / Patellar Tendonitis',
    icon: '🦵',
    antidoteTitle: 'Vertical-Shin & Posterior Chain Protocol',
    antidoteDesc: 'Eliminates forward patellar shear via box squats, Spanish squats, and hamstring curls.',
    recommendedHabitIds: ['w_dynamic_warmup', 'a_walk_10', 'm_mobility_5']
  },
  {
    id: 'shoulder_impingement',
    category: 'body_problem',
    label: 'Shoulder Impingement / Rotator Cuff Pinch',
    icon: '🛡️',
    antidoteTitle: 'Scapular Plane & Rotator Cuff Shield',
    antidoteDesc: 'Deploys neutral-grip dumbbell presses, face pulls, and landmine angles to open subacromial space.',
    recommendedHabitIds: ['m_mobility_5', 'a_posture_reset', 'w_dynamic_warmup']
  },
  {
    id: 'desk_posture',
    category: 'body_problem',
    label: 'Desk Posture / Rounded Shoulders / Forward Head',
    icon: '🪑',
    antidoteTitle: 'Thoracic Extension & Upper-Crossed Reset',
    antidoteDesc: 'Features prone Y-T-W raises, band pull-aparts, and doorway pectoral openers.',
    recommendedHabitIds: ['a_posture_reset', 'm_mobility_5', 'w_clothes_prep']
  },
  {
    id: 'anterior_pelvic_tilt',
    category: 'body_problem',
    label: 'Anterior Pelvic Tilt / Weak Glutes & Core',
    icon: '📐',
    antidoteTitle: 'Pelvic Neutral & Deep Transverse Anchor',
    antidoteDesc: 'Deadbugs with lumbar imprint, half-kneeling psoas stretches, and RKC hardstyle planks.',
    recommendedHabitIds: ['a_posture_reset', 'm_mobility_5', 'e_screen_off']
  },
  {
    id: 'neck_stiffness',
    category: 'body_problem',
    label: 'Tech Neck & Cervical Trap Tightness',
    icon: '💆',
    antidoteTitle: 'Cervical Decompression & Mid-Trap Protocol',
    antidoteDesc: 'Chin tuck isometrics, levator scapulae releases, and thoracic mobility drills.',
    recommendedHabitIds: ['a_posture_reset', 'm_mobility_5']
  },
  {
    id: 'wrist_pain',
    category: 'body_problem',
    label: 'Wrist Pain / Carpal Fatigue',
    icon: '🖐️',
    antidoteTitle: 'Neutral-Wrist & Handle Alignment',
    antidoteDesc: 'Eliminates wrist hyperextension using hex dumbbells, EZ-bars, and neutral-grip cables.',
    recommendedHabitIds: ['w_dynamic_warmup', 'm_mobility_5']
  },
  {
    id: 'tight_hips',
    category: 'body_problem',
    label: 'Tight Hips & Glute Amnesia',
    icon: '🧘',
    antidoteTitle: '90/90 Hip Flow & Glute Awakening',
    antidoteDesc: 'Hip rotational mobility drills paired with isolated glute bridges and step-ups.',
    recommendedHabitIds: ['m_mobility_5', 'a_walk_10']
  },
  {
    id: 'skinny_fat',
    category: 'body_problem',
    label: 'Skinny-Fat / Low Muscle Tone',
    icon: '⚡',
    antidoteTitle: 'High-Tension Recomposition Protocol',
    antidoteDesc: 'Heavy compound hypertrophy stimulation with high protein and maintenance calories.',
    recommendedHabitIds: ['m_protein_breakfast', 'w_clothes_prep', 'e_sleep_7_5']
  },
  {
    id: 'obesity_joint_load',
    category: 'body_problem',
    label: 'High Joint Load / Need Zero-Impact Fat Loss',
    icon: '⚖️',
    antidoteTitle: 'Low-Impact Machine & EPOC Acceleration',
    antidoteDesc: 'Machine-guided presses, seated cables, and sled walking with zero jumping or spinal stress.',
    recommendedHabitIds: ['m_water_500', 'a_walk_10', 'a_smart_snack_swap']
  },
  {
    id: 'zero_experience',
    category: 'body_problem',
    label: 'Complete Beginner / Zero Workout Experience',
    icon: '🌱',
    antidoteTitle: 'Guided Path & Neuromuscular Safety',
    antidoteDesc: 'Gradual progression starting with 100% safe, supported foundation tiers.',
    recommendedHabitIds: ['w_clothes_prep', 'm_water_500', 'a_walk_10']
  },
  // --- Behavioral & Lifestyle Friction Points ---
  {
    id: 'inconsistency',
    category: 'lifestyle',
    label: 'I lose motivation and quit after 2-3 weeks',
    icon: '📉',
    antidoteTitle: 'The "Never Miss Twice" Behavioral Shield',
    antidoteDesc: 'We introduce the 2-Minute Rule and Minimum Effective Dose (MED) safety workouts so you never break the identity loop on low-motivation days.',
    recommendedHabitIds: ['w_clothes_prep', 'e_tomorrow_plan', 'm_water_500']
  },
  {
    id: 'busy_schedule',
    category: 'lifestyle',
    label: 'Too busy / unpredictable work hours',
    icon: '⏰',
    antidoteTitle: 'Habit Stacking & High-Density Micro-Sessions',
    antidoteDesc: 'Workouts are engineered for maximum metabolic density in 20-30 minutes, seamlessly stacked onto existing daily cues.',
    recommendedHabitIds: ['w_clothes_prep', 'a_walk_10', 'm_mobility_5']
  },
  {
    id: 'cravings',
    category: 'lifestyle',
    label: 'Late-night cravings & emotional snacking',
    icon: '🍪',
    antidoteTitle: 'The Ghrelin Stabilizer & Kitchen Curfew',
    antidoteDesc: 'Anchors 30g morning protein to kill afternoon dopamine dips, combined with an evening kitchen closure protocol.',
    recommendedHabitIds: ['m_protein_breakfast', 'a_smart_snack_swap', 'e_kitchen_close']
  },
  {
    id: 'poor_sleep',
    category: 'lifestyle',
    label: 'Low morning energy & restless sleep',
    icon: '💤',
    antidoteTitle: 'Circadian Light & Digital Sunset Lock',
    antidoteDesc: 'Fixes morning cortisol with 10-min sunlight and locks deep sleep with a 45-min pre-bed screen shutdown.',
    recommendedHabitIds: ['m_sunlight_10', 'e_screen_off', 'e_sleep_7_5']
  }
];

export const TIMEFRAMES = [
  {
    months: 1,
    label: '1 Month Kickstart (Sprint)',
    badge: 'Momentum Builder',
    description: 'Establish the core habit baseline, eliminate brain fog, and drop the initial 2-4kg of water and bloat.',
    feasibilityFactor: 0.85,
    crashRisk: 'Medium (Requires focus to avoid rebound)',
    habitSlots: 3,
    phaseCount: 1,
    phaseNames: ['Phase 1: Habit Foundation & Neuromuscular Awakening']
  },
  {
    months: 3,
    label: '3 Months Transformation (Sweet Spot)',
    badge: '⭐ Most Recommended',
    description: 'The scientifically proven timeframe for permanent neural rewiring and noticeable visual body transformation.',
    feasibilityFactor: 0.98,
    crashRisk: 'Very Low (Sustainable pace)',
    habitSlots: 4,
    phaseCount: 3,
    phaseNames: [
      'Phase 1 (W1-4): Habit Anchoring & Form Mastery',
      'Phase 2 (W5-8): Progressive Overload & Metabolic Acceleration',
      'Phase 3 (W9-12): Body Sculpting & Peak Habit Identity'
    ]
  },
  {
    months: 6,
    label: '6 Months Lifestyle Mastery',
    badge: 'Complete Reinvention',
    description: 'Total hormonal reset, serious muscle/fat ratio shift, and converting fitness into an effortless daily reflex.',
    feasibilityFactor: 0.99,
    crashRisk: 'Zero (Mastery level)',
    habitSlots: 5,
    phaseCount: 4,
    phaseNames: [
      'Phase 1 (M1): Habit Ignition & Biomechanical Alignment',
      'Phase 2 (M2-3): Hypertrophy & Calorie Optimization',
      'Phase 3 (M4-5): Metabolic Consolidation & Strength Peaks',
      'Phase 4 (M6): Autopilot Maintenance & Peak Lifestyle'
    ]
  },
  {
    months: 12,
    label: '12 Months Complete Odyssey',
    badge: 'Elite Transformation',
    description: 'A life-defining physical and behavioral transformation with periodized seasonal training and full metabolic rewiring.',
    feasibilityFactor: 0.99,
    crashRisk: 'Zero (Ultimate permanence)',
    habitSlots: 6,
    phaseCount: 4,
    phaseNames: [
      'Phase 1 (Q1): Foundation & Neural Rewiring',
      'Phase 2 (Q2): Core Hypertrophy & Fat Strip',
      'Phase 3 (Q3): Athletic Power & Conditioning',
      'Phase 4 (Q4): Elite Lifestyle Autopilot'
    ]
  }
];
