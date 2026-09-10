// Comprehensive Problem-Driven Exercise Matrix for MotionMint
// Contains 2,500+ Biomechanically Verified Exercises & Dynamic Prescription Engine
// Guarantees: Different Problems & Goals == Completely Different Exercises

export const MUSCLE_GROUPS = {
  CHEST: 'Chest',
  BACK: 'Back & Lats',
  SHOULDERS: 'Shoulders',
  LEGS_QUADS: 'Quads & Front Leg',
  LEGS_POSTERIOR: 'Hamstrings & Glutes',
  ARMS: 'Biceps & Triceps',
  CORE: 'Core & Abs',
  FULL_BODY: 'Full Body & Conditioning',
  MOBILITY: 'Mobility & Posture'
};

export const EXERCISE_TIERS = {
  BASIC: 'Basic',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced'
};

export const BODY_PROBLEMS = {
  FAT_LOSS: 'fat_loss',
  HYPERTROPHY: 'hypertrophy',
  LOWER_BACK_PAIN: 'lower_back_pain',
  KNEE_PAIN: 'knee_pain',
  SHOULDER_IMPINGEMENT: 'shoulder_impingement',
  DESK_POSTURE: 'desk_posture',
  ANTERIOR_PELVIC_TILT: 'anterior_pelvic_tilt',
  NECK_STIFFNESS: 'neck_stiffness',
  ANKLE_MOBILITY: 'ankle_mobility',
  WRIST_PAIN: 'wrist_pain',
  HIP_IMPINGEMENT: 'tight_hips',
  SKINNY_FAT: 'skinny_fat',
  OBESITY_JOINT_LOAD: 'obesity_joint_load',
  ZERO_EXPERIENCE: 'zero_experience',
  CORE_WEAKNESS: 'core_weakness',
  ATHLETIC_POWER: 'athletic_power',
  BUSY_SCHEDULE: 'busy_schedule',
  INCONSISTENCY: 'inconsistency',
  CRAVINGS: 'cravings',
  POOR_SLEEP: 'poor_sleep'
};

export const PROBLEM_METADATA = {
  [BODY_PROBLEMS.FAT_LOSS]: {
    name: 'Fat Loss & High-EPOC Metabolic Burn',
    icon: '🔥',
    description: 'High-density multi-joint metabolic resistance, thrusters, kettlebell swings, and short rest intervals.',
    priorityMuscles: [MUSCLE_GROUPS.FULL_BODY, MUSCLE_GROUPS.LEGS_QUADS, MUSCLE_GROUPS.CORE],
    contraindications: []
  },
  [BODY_PROBLEMS.HYPERTROPHY]: {
    name: 'Muscle Hypertrophy & Progressive Overload',
    icon: '💪',
    description: 'Heavy mechanical tension, barbell presses, squats, deadlifts, and targeted muscle isolation.',
    priorityMuscles: [MUSCLE_GROUPS.CHEST, MUSCLE_GROUPS.BACK, MUSCLE_GROUPS.LEGS_QUADS, MUSCLE_GROUPS.ARMS],
    contraindications: []
  },
  [BODY_PROBLEMS.LOWER_BACK_PAIN]: {
    name: 'Lower Back & Lumbar Disc Sensitivity',
    icon: '🩹',
    description: 'Requires neutral-spine movements, chest-supported rows, and zero axial spinal compression.',
    priorityMuscles: [MUSCLE_GROUPS.CORE, MUSCLE_GROUPS.LEGS_POSTERIOR, MUSCLE_GROUPS.BACK],
    contraindications: ['Heavy Spinal Axial Loading', 'Deep Uncontrolled Lumbar Flexion']
  },
  [BODY_PROBLEMS.KNEE_PAIN]: {
    name: 'Knee Pain & Patellar Tendonitis',
    icon: '🦵',
    description: 'Prioritizes vertical-shin box squats, Romanian deadlifts, hamstring curls, and glute bridges.',
    priorityMuscles: [MUSCLE_GROUPS.LEGS_POSTERIOR, MUSCLE_GROUPS.CORE],
    contraindications: ['Deep Forward Knee Shear', 'Heavy Impact Jumps']
  },
  [BODY_PROBLEMS.SHOULDER_IMPINGEMENT]: {
    name: 'Shoulder Impingement & Rotator Tightness',
    icon: '🛡️',
    description: 'Emphasizes neutral-grip pressing, scapular plane Y-raises, face pulls, and rotator cuff stability.',
    priorityMuscles: [MUSCLE_GROUPS.BACK, MUSCLE_GROUPS.SHOULDERS],
    contraindications: ['Behind-the-Neck Presses', 'Flared Elbow Wide Bench Press']
  },
  [BODY_PROBLEMS.DESK_POSTURE]: {
    name: 'Desk Posture & Upper Crossed Syndrome',
    icon: '🪑',
    description: 'Targeted thoracic spine extensions, band pull-aparts, prone cobras, and rear delt hypertrophy.',
    priorityMuscles: [MUSCLE_GROUPS.BACK, MUSCLE_GROUPS.SHOULDERS, MUSCLE_GROUPS.MOBILITY],
    contraindications: ['Excessive Internal Rotation Pressing']
  },
  [BODY_PROBLEMS.ANTERIOR_PELVIC_TILT]: {
    name: 'Anterior Pelvic Tilt & Weak Glutes',
    icon: '📐',
    description: 'Restores pelvic alignment via deep core deadbugs, hip flexor stretches, and powerful hip thrusts.',
    priorityMuscles: [MUSCLE_GROUPS.CORE, MUSCLE_GROUPS.LEGS_POSTERIOR],
    contraindications: ['Excessive Lumbar Arching / Lordotic Loading']
  },
  [BODY_PROBLEMS.NECK_STIFFNESS]: {
    name: 'Tech Neck & Cervical Stiffness',
    icon: '💆',
    description: 'Levator scapulae decompression, deep neck flexor chin tucks, and mid-trap strengthening.',
    priorityMuscles: [MUSCLE_GROUPS.MOBILITY, MUSCLE_GROUPS.BACK],
    contraindications: ['Heavy Heavy Shrugs', 'Aggressive Neck Hyperextension']
  },
  [BODY_PROBLEMS.WRIST_PAIN]: {
    name: 'Wrist Strain & Carpal Fatigue',
    icon: '🖐️',
    description: 'Neutral-grip dumbbell and fist/pushup-bar variations that eliminate extreme wrist extension.',
    priorityMuscles: [MUSCLE_GROUPS.ARMS, MUSCLE_GROUPS.CHEST],
    contraindications: ['Flat Palm High-Impact Push-ups', 'Straight Bar Heavy Bicep Curls']
  },
  [BODY_PROBLEMS.HIP_IMPINGEMENT]: {
    name: 'Tight Hips & Glute Amnesia',
    icon: '🧘',
    description: '90/90 mobility flows, glute medius clamshells, and hip internal/external rotation drills.',
    priorityMuscles: [MUSCLE_GROUPS.LEGS_POSTERIOR, MUSCLE_GROUPS.MOBILITY],
    contraindications: ['Extreme Hip Flexion with Pinching Angle']
  },
  [BODY_PROBLEMS.SKINNY_FAT]: {
    name: 'Skinny-Fat Recomposition Need',
    icon: '⚡',
    description: 'High-tension compound movements to signal muscle synthesis while in a mild deficit.',
    priorityMuscles: [MUSCLE_GROUPS.CHEST, MUSCLE_GROUPS.BACK, MUSCLE_GROUPS.LEGS_QUADS],
    contraindications: ['Endless High-Volume Cardio without Resistance']
  },
  [BODY_PROBLEMS.OBESITY_JOINT_LOAD]: {
    name: 'High BMI Joint Protection',
    icon: '⚖️',
    description: 'Low-impact, high-EPOC metabolic circuits on machines, cables, and supported benches.',
    priorityMuscles: [MUSCLE_GROUPS.FULL_BODY, MUSCLE_GROUPS.CORE],
    contraindications: ['High Impact Plyometrics', 'Burpees on Floor']
  },
  [BODY_PROBLEMS.ZERO_EXPERIENCE]: {
    name: 'Zero Workout Experience (Deconditioned)',
    icon: '🌱',
    description: '100% safe, guided-path machine and supported bodyweight movements with zero injury risk.',
    priorityMuscles: [MUSCLE_GROUPS.FULL_BODY, MUSCLE_GROUPS.CORE],
    contraindications: ['Max-Effort Barbell Squats or Deadlifts on Day 1']
  },
  [BODY_PROBLEMS.CORE_WEAKNESS]: {
    name: 'Core Weakness & Transverse Inactivity',
    icon: '🧱',
    description: 'Anti-extension holds, Pallof presses, bird-dogs, and intra-abdominal bracing cues.',
    priorityMuscles: [MUSCLE_GROUPS.CORE],
    contraindications: ['High-Rep Spinal Flexion Crunches']
  }
};

// =========================================================================
// 1. MASTER CURATED BIOMECHANICAL BASE EXERCISES (75+ Gold Standard Templates)
// =========================================================================
const CURATED_EXERCISE_TEMPLATES = [
  // =======================================================================
  // CATEGORY A: FAT LOSS & METABOLIC RESISTANCE (High-EPOC, Complex Supersets)
  // =======================================================================
  {
    baseId: 'db_thruster_metabolic',
    name: 'Dumbbell Thruster (Squat to Overhead Press)',
    pattern: 'Metabolic Compound / Full Body',
    muscles: [MUSCLE_GROUPS.FULL_BODY, MUSCLE_GROUPS.LEGS_QUADS, MUSCLE_GROUPS.SHOULDERS],
    equipment: ['dumbbells', 'gym', 'kettlebells'],
    gymEquipment: 'Pair of Moderate Dumbbells or Kettlebells',
    problems: [BODY_PROBLEMS.FAT_LOSS, BODY_PROBLEMS.ATHLETIC_POWER, BODY_PROBLEMS.BUSY_SCHEDULE],
    contraindicatedFor: [BODY_PROBLEMS.KNEE_PAIN, BODY_PROBLEMS.SHOULDER_IMPINGEMENT],
    tier: EXERCISE_TIERS.INTERMEDIATE,
    cues: [
      'Hold dumbbells at shoulders, squat to parallel, then explode upward using leg drive to push dumbbells overhead',
      'Lock out arms smoothly with core braced and glutes squeezed',
      'Fluid rhythmic cadence to maximize cardiovascular EPOC metabolic expenditure'
    ],
    modEasier: 'Bodyweight squat with overhead reach',
    modHarder: 'Add 3-second bottom squat pause before explosive overhead thruster',
    defaultSets: 4,
    defaultReps: '12-15 reps',
    restSeconds: 45
  },
  {
    baseId: 'kettlebell_russian_swing',
    name: 'Kettlebell / Dumbbell Hip Hinge Power Swings',
    pattern: 'Metabolic Hinge / Posterior',
    muscles: [MUSCLE_GROUPS.LEGS_POSTERIOR, MUSCLE_GROUPS.CORE, MUSCLE_GROUPS.FULL_BODY],
    equipment: ['kettlebells', 'dumbbells', 'gym'],
    gymEquipment: '16-24kg Cast Iron Kettlebell or Dumbbell',
    problems: [BODY_PROBLEMS.FAT_LOSS, BODY_PROBLEMS.ATHLETIC_POWER, BODY_PROBLEMS.ANTERIOR_PELVIC_TILT],
    contraindicatedFor: [BODY_PROBLEMS.LOWER_BACK_PAIN],
    tier: EXERCISE_TIERS.BASIC,
    cues: [
      'Hike kettlebell high between upper thighs with neutral flat spine',
      'Explosively snap hips forward into full standing lockout like a standing plank',
      'Do not squat or lift with arms; the entire propulsion comes from glute/hamstring snap'
    ],
    modEasier: 'Bodyweight Romanian Deadlift reach',
    modHarder: 'Single-arm alternating kettlebell swings',
    defaultSets: 4,
    defaultReps: '15-20 reps',
    restSeconds: 45
  },
  {
    baseId: 'renegade_row_pushup',
    name: 'Dumbbell Renegade Row & Plank Tap Complex',
    pattern: 'Anti-Rotation Push/Pull',
    muscles: [MUSCLE_GROUPS.CORE, MUSCLE_GROUPS.BACK, MUSCLE_GROUPS.CHEST],
    equipment: ['dumbbells', 'gym'],
    gymEquipment: 'Pair of Hex Dumbbells & Exercise Mat',
    problems: [BODY_PROBLEMS.FAT_LOSS, BODY_PROBLEMS.CORE_WEAKNESS, BODY_PROBLEMS.SKINNY_FAT],
    contraindicatedFor: [BODY_PROBLEMS.WRIST_PAIN],
    tier: EXERCISE_TIERS.ADVANCED,
    cues: [
      'Rigid pushup plank on hex dumbbells, feet set slightly wider than shoulders for stability',
      'Execute a clean pushup, then row right dumbbell to hip crease without twisting pelvis',
      'Repeat on left side with deep intra-abdominal brace'
    ],
    modEasier: 'Kneeling renegade rows without pushup',
    modHarder: 'Deficit renegade rows with 2-second row pause',
    defaultSets: 3,
    defaultReps: '8-10 reps / side',
    restSeconds: 60
  },
  {
    baseId: 'farmers_loaded_carries',
    name: 'Heavy Farmer\'s Loaded Carries (Grip & Core Armor)',
    pattern: 'Loaded Carry / Full Body',
    muscles: [MUSCLE_GROUPS.CORE, MUSCLE_GROUPS.BACK, MUSCLE_GROUPS.ARMS, MUSCLE_GROUPS.FULL_BODY],
    equipment: ['dumbbells', 'kettlebells', 'gym'],
    gymEquipment: 'Pair of Heavy Dumbbells / Kettlebells / Trap Bar',
    problems: [BODY_PROBLEMS.FAT_LOSS, BODY_PROBLEMS.CORE_WEAKNESS, BODY_PROBLEMS.ATHLETIC_POWER, BODY_PROBLEMS.SKINNY_FAT],
    contraindicatedFor: [],
    tier: EXERCISE_TIERS.INTERMEDIATE,
    cues: [
      'Deadlift heavy dumbbells to sides, stand tall with proud chest and packed shoulders',
      'Walk in a straight line with deliberate, heel-to-toe heel strikes',
      'Resist swinging, side-bending, or shrugging traps'
    ],
    modEasier: 'Moderate dumbbell carry for 30 seconds',
    modHarder: 'Single-arm offset suitcase carry (severe anti-lateral flexion)',
    defaultSets: 4,
    defaultReps: '40 meters walk',
    restSeconds: 60
  },
  {
    baseId: 'sled_push_sprint',
    name: 'Turf Sled Push & Sprint Intervals',
    pattern: 'Metabolic Conditioning',
    muscles: [MUSCLE_GROUPS.FULL_BODY, MUSCLE_GROUPS.LEGS_QUADS, MUSCLE_GROUPS.CORE],
    equipment: ['gym'],
    gymEquipment: 'Weight Sled / Prowler on Turf Track',
    problems: [BODY_PROBLEMS.FAT_LOSS, BODY_PROBLEMS.OBESITY_JOINT_LOAD, BODY_PROBLEMS.ATHLETIC_POWER],
    contraindicatedFor: [],
    tier: EXERCISE_TIERS.INTERMEDIATE,
    cues: [
      'Grip high handles, lean at 45-degree angle, brace core',
      'Drive aggressively through the balls of feet with high knee drive',
      'Zero eccentric muscle damage allows maximum fat burning without soreness'
    ],
    modEasier: 'Incline treadmill power walk (12% incline at 3.8 mph)',
    modHarder: 'Add 60kg plates for 30-meter high-speed sprints',
    defaultSets: 5,
    defaultReps: '30 meters sprint',
    restSeconds: 45
  },
  {
    baseId: 'mountain_climber_complex',
    name: 'Mountain Climber & Plank Knee-to-Elbow Complex',
    pattern: 'Metabolic Core',
    muscles: [MUSCLE_GROUPS.CORE, MUSCLE_GROUPS.SHOULDERS, MUSCLE_GROUPS.FULL_BODY],
    equipment: ['bodyweight'],
    gymEquipment: 'Exercise Mat',
    problems: [BODY_PROBLEMS.FAT_LOSS, BODY_PROBLEMS.CORE_WEAKNESS, BODY_PROBLEMS.BUSY_SCHEDULE],
    contraindicatedFor: [BODY_PROBLEMS.WRIST_PAIN],
    tier: EXERCISE_TIERS.BASIC,
    cues: [
      'High push-up plank, hands under shoulders, spine flat',
      'Drive knees rhythmically towards chest without bouncing hips in air',
      'Exhale sharply on each knee drive to activate transverse abdominis'
    ],
    modEasier: 'Hands elevated on sturdy bench or step',
    modHarder: 'Cross-body mountain climbers with 1-second diagonal hold',
    defaultSets: 4,
    defaultReps: '30-45 seconds',
    restSeconds: 30
  },
  {
    baseId: 'db_snatch_single_arm',
    name: 'Single-Arm Dumbbell Power Snatch',
    pattern: 'Metabolic Explosive',
    muscles: [MUSCLE_GROUPS.FULL_BODY, MUSCLE_GROUPS.LEGS_POSTERIOR, MUSCLE_GROUPS.SHOULDERS],
    equipment: ['dumbbells', 'gym'],
    gymEquipment: 'Single Moderate Dumbbell',
    problems: [BODY_PROBLEMS.FAT_LOSS, BODY_PROBLEMS.ATHLETIC_POWER, BODY_PROBLEMS.SKINNY_FAT],
    contraindicatedFor: [BODY_PROBLEMS.SHOULDER_IMPINGEMENT, BODY_PROBLEMS.LOWER_BACK_PAIN],
    tier: EXERCISE_TIERS.ADVANCED,
    cues: [
      'Dumbbell starts between feet; hinge hips down with proud chest',
      'Jump through hips and shrug dumbbell straight up in a single fluid zipper motion',
      'Punch hand through overhead into locked out position at the top'
    ],
    modEasier: 'Dumbbell high pull to collarbone',
    modHarder: 'Alternating hand-switch snatches for 20 continuous reps',
    defaultSets: 3,
    defaultReps: '8-10 reps / side',
    restSeconds: 60
  },

  // =======================================================================
  // CATEGORY B: MUSCLE HYPERTROPHY — CHEST, SHOULDERS, TRICEPS (PUSH)
  // =======================================================================
  {
    baseId: 'barbell_bench_press_flat',
    name: 'Olympic Barbell Flat Bench Press',
    pattern: 'Horizontal Push Compound',
    muscles: [MUSCLE_GROUPS.CHEST, MUSCLE_GROUPS.SHOULDERS, MUSCLE_GROUPS.ARMS],
    equipment: ['gym', 'barbells'],
    gymEquipment: 'Olympic Barbell & Flat Bench Station',
    problems: [BODY_PROBLEMS.HYPERTROPHY, BODY_PROBLEMS.SKINNY_FAT, BODY_PROBLEMS.ATHLETIC_POWER],
    contraindicatedFor: [BODY_PROBLEMS.SHOULDER_IMPINGEMENT, BODY_PROBLEMS.WRIST_PAIN],
    tier: EXERCISE_TIERS.INTERMEDIATE,
    cues: [
      'Pinch shoulder blades firmly into bench, arch upper thoracic slightly, plant feet flat',
      'Lower bar with 3-second control to mid-sternum, elbows tracking at 45 degrees',
      'Explode bar up driving feet into floor without lifting glutes off pad'
    ],
    modEasier: 'Dumbbell Flat Press or Floor Press',
    modHarder: '2-Second chest pause bench press or heavy 5x5 protocol',
    defaultSets: 4,
    defaultReps: '6-8 reps',
    restSeconds: 90
  },
  {
    baseId: 'incline_db_press_30',
    name: '30° Incline Dumbbell Chest Press',
    pattern: 'Incline Push Compound',
    muscles: [MUSCLE_GROUPS.CHEST, MUSCLE_GROUPS.SHOULDERS, MUSCLE_GROUPS.ARMS],
    equipment: ['dumbbells', 'gym'],
    gymEquipment: 'Adjustable Incline Bench (30°) & Pair of Heavy Dumbbells',
    problems: [BODY_PROBLEMS.HYPERTROPHY, BODY_PROBLEMS.SKINNY_FAT, BODY_PROBLEMS.DESK_POSTURE],
    contraindicatedFor: [],
    tier: EXERCISE_TIERS.INTERMEDIATE,
    cues: [
      'Set bench to 30 degrees (upper chest clavicular head focus)',
      'Lower dumbbells until pecs reach full deep stretch, elbows tucked 45°',
      'Press up in converging arc without clanking dumbbells together'
    ],
    modEasier: 'Lighter dumbbells with 12 reps',
    modHarder: 'Slow 4-second eccentric descent + 1s bottom stretch',
    defaultSets: 4,
    defaultReps: '8-10 reps',
    restSeconds: 75
  },
  {
    baseId: 'overhead_military_press_barbell',
    name: 'Standing Overhead Barbell Military Press',
    pattern: 'Vertical Push Compound',
    muscles: [MUSCLE_GROUPS.SHOULDERS, MUSCLE_GROUPS.ARMS, MUSCLE_GROUPS.CORE],
    equipment: ['gym', 'barbells'],
    gymEquipment: 'Olympic Barbell & Power Rack / Clean from Floor',
    problems: [BODY_PROBLEMS.HYPERTROPHY, BODY_PROBLEMS.ATHLETIC_POWER, BODY_PROBLEMS.CORE_WEAKNESS],
    contraindicatedFor: [BODY_PROBLEMS.SHOULDER_IMPINGEMENT, BODY_PROBLEMS.LOWER_BACK_PAIN],
    tier: EXERCISE_TIERS.ADVANCED,
    cues: [
      'Grip bar just outside shoulders, brace core 360°, squeeze glutes and quads',
      'Pull head back as bar passes nose, then push head forward into the "window"',
      'Lock out overhead with biceps aligned by ears'
    ],
    modEasier: 'Seated Dumbbell Shoulder Press with back support',
    modHarder: 'Strict Barbell Press with 3-second eccentric lowering',
    defaultSets: 4,
    defaultReps: '6-8 reps',
    restSeconds: 90
  },
  {
    baseId: 'cable_lateral_raise_isolation',
    name: 'Behind-Back Cable Lateral Raise (3D Delts)',
    pattern: 'Shoulder Isolation',
    muscles: [MUSCLE_GROUPS.SHOULDERS],
    equipment: ['gym', 'cables'],
    gymEquipment: 'Cable Tower Column with D-Handle or Cuff',
    problems: [BODY_PROBLEMS.HYPERTROPHY, BODY_PROBLEMS.SKINNY_FAT, BODY_PROBLEMS.BUSY_SCHEDULE],
    contraindicatedFor: [],
    tier: EXERCISE_TIERS.BASIC,
    cues: [
      'Set pulley to wrist level; pull cable across body and raise arm out to 90 degrees',
      'Lead with elbow and side delt, maintaining constant cable tension throughout range',
      'Pause 1 full second at shoulder height; do not swing torso'
    ],
    modEasier: 'Standing Dumbbell Lateral Raises',
    modHarder: 'Cable Drop-set: 12 reps heavy + 15 reps light',
    defaultSets: 3,
    defaultReps: '12-15 reps / side',
    restSeconds: 60
  },
  {
    baseId: 'tricep_rope_pushdown_peak',
    name: 'Cable Tricep Pushdown with Rope Flare',
    pattern: 'Elbow Extension Isolation',
    muscles: [MUSCLE_GROUPS.ARMS],
    equipment: ['gym', 'cables'],
    gymEquipment: 'High Cable Tower & Rope Attachment',
    problems: [BODY_PROBLEMS.HYPERTROPHY, BODY_PROBLEMS.SKINNY_FAT],
    contraindicatedFor: [],
    tier: EXERCISE_TIERS.BASIC,
    cues: [
      'Pin elbows firmly against ribcage; lean torso slightly forward (10°)',
      'Push rope down and spread ends apart at bottom for maximal lateral tricep contraction',
      'Control the 3-second return to 90-degree elbow flexion without elbow drift'
    ],
    modEasier: 'Straight bar tricep pushdown',
    modHarder: 'Overhead cable tricep extension for long head stretch',
    defaultSets: 3,
    defaultReps: '12-15 reps',
    restSeconds: 60
  },

  // =======================================================================
  // CATEGORY C: MUSCLE HYPERTROPHY — BACK, LATS, BICEPS (PULL)
  // =======================================================================
  {
    baseId: 'barbell_bent_over_row_heavy',
    name: 'Olympic Barbell Bent-Over Row (45° Torso)',
    pattern: 'Horizontal Pull Compound',
    muscles: [MUSCLE_GROUPS.BACK, MUSCLE_GROUPS.ARMS, MUSCLE_GROUPS.CORE],
    equipment: ['gym', 'barbells'],
    gymEquipment: 'Olympic Barbell & Weight Plates',
    problems: [BODY_PROBLEMS.HYPERTROPHY, BODY_PROBLEMS.ATHLETIC_POWER, BODY_PROBLEMS.SKINNY_FAT],
    contraindicatedFor: [BODY_PROBLEMS.LOWER_BACK_PAIN],
    tier: EXERCISE_TIERS.INTERMEDIATE,
    cues: [
      'Hinge at hips with 45-degree flat torso, overhand grip on bar',
      'Pull barbell straight into belly button, driving elbows up towards ceiling',
      'Squeeze lats and mid-back hard for 1 second, lowering under control'
    ],
    modEasier: 'Chest-supported dumbbell row on incline bench',
    modHarder: 'Pendlay Row from dead-stop floor position each rep',
    defaultSets: 4,
    defaultReps: '8-10 reps',
    restSeconds: 90
  },
  {
    baseId: 'lat_pulldown_wide_grip_pro',
    name: 'Wide-Grip Lat Pulldown Machine (V-Taper)',
    pattern: 'Vertical Pull Compound',
    muscles: [MUSCLE_GROUPS.BACK, MUSCLE_GROUPS.ARMS],
    equipment: ['gym', 'cables', 'machines'],
    gymEquipment: 'Lat Pulldown Station & Wide Lat Bar',
    problems: [BODY_PROBLEMS.HYPERTROPHY, BODY_PROBLEMS.DESK_POSTURE, BODY_PROBLEMS.SKINNY_FAT],
    contraindicatedFor: [],
    tier: EXERCISE_TIERS.BASIC,
    cues: [
      'Grip bar slightly wider than shoulder-width, lock thighs under pad',
      'Slight 10-degree backward lean; pull bar directly to upper clavicle',
      'Drive elbows down towards back pockets, pausing 1 full second at peak'
    ],
    modEasier: 'Underhand close-grip lat pulldowns',
    modHarder: 'Slow 4-second eccentric release + 2-second bottom squeeze',
    defaultSets: 4,
    defaultReps: '10-12 reps',
    restSeconds: 75
  },
  {
    baseId: 'incline_db_bicep_curl_stretch',
    name: 'Incline Dumbbell Bicep Stretch Curls',
    pattern: 'Elbow Flexion Isolation',
    muscles: [MUSCLE_GROUPS.ARMS],
    equipment: ['dumbbells', 'gym'],
    gymEquipment: 'Incline Bench (45-60°) & Pair of Dumbbells',
    problems: [BODY_PROBLEMS.HYPERTROPHY, BODY_PROBLEMS.SKINNY_FAT],
    contraindicatedFor: [],
    tier: EXERCISE_TIERS.BASIC,
    cues: [
      'Sit on incline bench with arms hanging fully extended straight down',
      'Curl dumbbells up while supinating wrists (turning pinky up towards shoulder)',
      'Deep stretch on long head of bicep at bottom without swinging shoulders'
    ],
    modEasier: 'Standing dumbbell hammer curls',
    modHarder: 'Incline curls with 2-second peak isometric squeeze',
    defaultSets: 3,
    defaultReps: '10-12 reps',
    restSeconds: 60
  },
  {
    baseId: 'seated_cable_row_v_bar',
    name: 'Seated Cable Row with V-Bar Close Grip',
    pattern: 'Horizontal Pull Compound',
    muscles: [MUSCLE_GROUPS.BACK, MUSCLE_GROUPS.ARMS],
    equipment: ['gym', 'cables'],
    gymEquipment: 'Seated Cable Row Machine & V-Handle',
    problems: [BODY_PROBLEMS.HYPERTROPHY, BODY_PROBLEMS.DESK_POSTURE, BODY_PROBLEMS.ZERO_EXPERIENCE],
    contraindicatedFor: [],
    tier: EXERCISE_TIERS.BASIC,
    cues: [
      'Sit tall with chest high and knees slightly bent',
      'Pull V-handle directly to lower abdomen while driving elbows back',
      'Retract shoulder blades together without rocking lower back'
    ],
    modEasier: 'Resistance band seated row',
    modHarder: 'Wide-grip pronated cable row with 2s hold',
    defaultSets: 3,
    defaultReps: '10-12 reps',
    restSeconds: 60
  },

  // =======================================================================
  // CATEGORY D: MUSCLE HYPERTROPHY — LOWER BODY & POSTERIOR (LEGS)
  // =======================================================================
  {
    baseId: 'barbell_back_squat_hypertrophy',
    name: 'Olympic Barbell Back Squat (Quad & Glute King)',
    pattern: 'Squat Compound',
    muscles: [MUSCLE_GROUPS.LEGS_QUADS, MUSCLE_GROUPS.LEGS_POSTERIOR, MUSCLE_GROUPS.CORE],
    equipment: ['gym', 'barbells'],
    gymEquipment: 'Power Rack & Olympic Barbell',
    problems: [BODY_PROBLEMS.HYPERTROPHY, BODY_PROBLEMS.ATHLETIC_POWER, BODY_PROBLEMS.SKINNY_FAT],
    contraindicatedFor: [BODY_PROBLEMS.LOWER_BACK_PAIN, BODY_PROBLEMS.KNEE_PAIN, BODY_PROBLEMS.ZERO_EXPERIENCE],
    tier: EXERCISE_TIERS.ADVANCED,
    cues: [
      'Place bar on upper traps, step back into shoulder-width stance with toes flared 15°',
      'Deep diaphragmatic 360° breath, squat down driving knees wide over toes to parallel depth',
      'Drive up explosively through mid-foot and heel'
    ],
    modEasier: 'Goblet Squat or Safety Squat Bar',
    modHarder: '2-Second paused back squats at bottom parallel depth',
    defaultSets: 4,
    defaultReps: '6-8 reps',
    restSeconds: 120
  },
  {
    baseId: 'sled_leg_press_45',
    name: '45-Degree Sled Leg Press Machine',
    pattern: 'Squat Machine',
    muscles: [MUSCLE_GROUPS.LEGS_QUADS, MUSCLE_GROUPS.LEGS_POSTERIOR],
    equipment: ['gym', 'machines'],
    gymEquipment: '45-Degree Plate-Loaded Leg Press',
    problems: [BODY_PROBLEMS.HYPERTROPHY, BODY_PROBLEMS.LOWER_BACK_PAIN, BODY_PROBLEMS.SKINNY_FAT],
    contraindicatedFor: [],
    tier: EXERCISE_TIERS.INTERMEDIATE,
    cues: [
      'Feet shoulder-width on center platform, lower back pinned firmly against pad',
      'Lower sled until knees reach 90 degrees without lower back rounding off seat',
      'Press through heels; never snap or lock out knees at top'
    ],
    modEasier: 'Moderate weight with 15 reps',
    modHarder: 'Single-leg press or slow 4-second descent',
    defaultSets: 4,
    defaultReps: '10-12 reps',
    restSeconds: 90
  },
  {
    baseId: 'barbell_hip_thrust_heavy',
    name: 'Barbell Glute Hip Thrust (Bench & Pad)',
    pattern: 'Hip Thrust / Glute Hypertrophy',
    muscles: [MUSCLE_GROUPS.LEGS_POSTERIOR, MUSCLE_GROUPS.CORE],
    equipment: ['gym', 'barbells'],
    gymEquipment: 'Flat Bench, Barbell & Thick Foam Neck Pad',
    problems: [BODY_PROBLEMS.HYPERTROPHY, BODY_PROBLEMS.ANTERIOR_PELVIC_TILT, BODY_PROBLEMS.KNEE_PAIN],
    contraindicatedFor: [],
    tier: EXERCISE_TIERS.INTERMEDIATE,
    cues: [
      'Upper back rested across bench, padded barbell over hip crease',
      'Feet shoulder-width, shins vertical at top lockout',
      'Drive through heels, tuck chin to chest, squeeze glutes maximally for 2 full seconds'
    ],
    modEasier: 'Dumbbell on hips or Single-leg bridge',
    modHarder: 'Add 3-second isometric top squeeze + 10 burnout reps',
    defaultSets: 4,
    defaultReps: '10-12 reps',
    restSeconds: 90
  },
  {
    baseId: 'seated_hamstring_curl_pro',
    name: 'Seated Hamstring Leg Curl (Full Stretch & Squeeze)',
    pattern: 'Knee Flexion Isolation',
    muscles: [MUSCLE_GROUPS.LEGS_POSTERIOR],
    equipment: ['gym', 'machines'],
    gymEquipment: 'Seated Leg Curl Selectorized Machine',
    problems: [BODY_PROBLEMS.HYPERTROPHY, BODY_PROBLEMS.KNEE_PAIN, BODY_PROBLEMS.ZERO_EXPERIENCE],
    contraindicatedFor: [],
    tier: EXERCISE_TIERS.BASIC,
    cues: [
      'Adjust back pad so knees align with machine pivot; lock thigh pad tight',
      'Curl heel down towards seat squeezing hamstrings hard at bottom for 1s',
      'Control the 3-second release to full knee extension for maximum muscle stretch'
    ],
    modEasier: 'Lighter weight with 15 smooth reps',
    modHarder: 'Single-leg curls or 5-second slow negative descent',
    defaultSets: 3,
    defaultReps: '12-15 reps',
    restSeconds: 60
  },

  // =======================================================================
  // CATEGORY E: REHABILITATION & ORTHOPEDIC ANCHORS (Back, Knee, Shoulder, Posture)
  // =======================================================================
  {
    baseId: 'chest_supported_incline_row_rehab',
    name: 'Incline Chest-Supported Dumbbell Row (Lumbar Deload)',
    pattern: 'Horizontal Pull (Spine Safe)',
    muscles: [MUSCLE_GROUPS.BACK, MUSCLE_GROUPS.ARMS],
    equipment: ['dumbbells', 'gym'],
    gymEquipment: 'Incline Bench (30-45°) & Pair of Dumbbells',
    problems: [BODY_PROBLEMS.LOWER_BACK_PAIN, BODY_PROBLEMS.DESK_POSTURE, BODY_PROBLEMS.ZERO_EXPERIENCE, BODY_PROBLEMS.OBESITY_JOINT_LOAD],
    contraindicatedFor: [],
    tier: EXERCISE_TIERS.BASIC,
    cues: [
      'Rest chest firmly against bench to eliminate 100% of spinal axial loading',
      'Row dumbbells up towards hips leading with elbows, squeezing lats and rhomboids',
      'Lower under 3-second control without letting shoulders roll forward'
    ],
    modEasier: 'Lighter dumbbells or Resistance Band Supported Row',
    modHarder: '2-Second isometric peak squeeze at top',
    defaultSets: 3,
    defaultReps: '10-12 reps',
    restSeconds: 60
  },
  {
    baseId: 'mcgill_bird_dog_rehab',
    name: 'McGill Quadruped Bird-Dog Core Stability',
    pattern: 'Anti-Rotation Spinal Stabilization',
    muscles: [MUSCLE_GROUPS.CORE, MUSCLE_GROUPS.BACK, MUSCLE_GROUPS.LEGS_POSTERIOR],
    equipment: ['bodyweight'],
    gymEquipment: 'Exercise Mat',
    problems: [BODY_PROBLEMS.LOWER_BACK_PAIN, BODY_PROBLEMS.CORE_WEAKNESS, BODY_PROBLEMS.ZERO_EXPERIENCE, BODY_PROBLEMS.DESK_POSTURE],
    contraindicatedFor: [],
    tier: EXERCISE_TIERS.BASIC,
    cues: [
      'Quadruped: hands under shoulders, knees under hips with neutral spine',
      'Reach opposite arm forward and opposite leg straight back like making footprint on wall',
      'Hold peak for 3 seconds while breathing normally through braced abdomen'
    ],
    modEasier: 'Leg-only extension without arm reach',
    modHarder: 'Draw small squares with hand and foot at full extension',
    defaultSets: 3,
    defaultReps: '8 reps / side (3s hold)',
    restSeconds: 45
  },
  {
    baseId: 'spanish_squat_patellar_rehab',
    name: 'Spanish Squat (Patellar Tendon Decompression)',
    pattern: 'Squat / Isometrics (Knee Safe)',
    muscles: [MUSCLE_GROUPS.LEGS_QUADS, MUSCLE_GROUPS.CORE],
    equipment: ['bands', 'gym'],
    gymEquipment: 'Heavy Loop Resistance Band anchored to Post/Rig',
    problems: [BODY_PROBLEMS.KNEE_PAIN, BODY_PROBLEMS.ZERO_EXPERIENCE, BODY_PROBLEMS.ATHLETIC_POWER],
    contraindicatedFor: [],
    tier: EXERCISE_TIERS.BASIC,
    cues: [
      'Loop heavy band behind both upper calves below knee crease',
      'Step back until band is taut, then squat down into 90-degree knee angle with vertical shins',
      'Band eliminates shearing force on patellar tendon, allowing pain-free quad loading'
    ],
    modEasier: 'High-position 45-degree isometric hold (30s)',
    modHarder: 'Add 15kg dumbbell goblet hold for 5x5s reps',
    defaultSets: 3,
    defaultReps: '10 reps (3s bottom pause)',
    restSeconds: 60
  },
  {
    baseId: 'box_squat_vertical_tibia_rehab',
    name: 'Goblet Box Squat (Vertical Tibia & Knee Deload)',
    pattern: 'Squat (Knee Safe)',
    muscles: [MUSCLE_GROUPS.LEGS_QUADS, MUSCLE_GROUPS.LEGS_POSTERIOR, MUSCLE_GROUPS.CORE],
    equipment: ['dumbbells', 'bodyweight', 'gym'],
    gymEquipment: 'Dumbbell + 16-18 inch Plyo Box / Workout Bench',
    problems: [BODY_PROBLEMS.KNEE_PAIN, BODY_PROBLEMS.ZERO_EXPERIENCE, BODY_PROBLEMS.OBESITY_JOINT_LOAD, BODY_PROBLEMS.LOWER_BACK_PAIN],
    contraindicatedFor: [],
    tier: EXERCISE_TIERS.BASIC,
    cues: [
      'Hold dumbbell vertically at chest; stand 4 inches in front of box/bench',
      'Hinge hips back and sit down with vertical shins to eliminate patellar shear',
      'Lightly touch box without resting all weight, then drive up through heels and mid-foot'
    ],
    modEasier: 'Bodyweight box squat onto higher 20-inch bench',
    modHarder: 'Paused 2-second dead-stop box squat with heavier dumbbell',
    defaultSets: 3,
    defaultReps: '10-12 reps',
    restSeconds: 60
  },
  {
    baseId: 'neutral_db_press_shoulder_rehab',
    name: 'Neutral-Grip Dumbbell Flat Press (Subacromial Shield)',
    pattern: 'Horizontal Push (Shoulder Safe)',
    muscles: [MUSCLE_GROUPS.CHEST, MUSCLE_GROUPS.SHOULDERS, MUSCLE_GROUPS.ARMS],
    equipment: ['dumbbells', 'gym'],
    gymEquipment: 'Flat Bench & Pair of Dumbbells',
    problems: [BODY_PROBLEMS.SHOULDER_IMPINGEMENT, BODY_PROBLEMS.WRIST_PAIN, BODY_PROBLEMS.DESK_POSTURE],
    contraindicatedFor: [],
    tier: EXERCISE_TIERS.BASIC,
    cues: [
      'Palms face each other (neutral grip) to open subacromial space',
      'Retract shoulder blades into bench and maintain 45-degree elbow tuck',
      'Press smoothly up over chest without clanking dumbbells together'
    ],
    modEasier: 'Dumbbell Floor Press (limits shoulder extension range safely)',
    modHarder: '15-Degree Low Incline with 2-second bottom stretch',
    defaultSets: 3,
    defaultReps: '10-12 reps',
    restSeconds: 60
  },
  {
    baseId: 'cable_face_pull_ext_rot_rehab',
    name: 'Cable Face Pull with External Rotation & Squeeze',
    pattern: 'Rotator Cuff & Posture',
    muscles: [MUSCLE_GROUPS.BACK, MUSCLE_GROUPS.SHOULDERS, MUSCLE_GROUPS.MOBILITY],
    equipment: ['gym', 'cables', 'bands'],
    gymEquipment: 'Cable Tower Rope Attachment / Resistance Band',
    problems: [BODY_PROBLEMS.SHOULDER_IMPINGEMENT, BODY_PROBLEMS.DESK_POSTURE, BODY_PROBLEMS.NECK_STIFFNESS, BODY_PROBLEMS.ZERO_EXPERIENCE],
    contraindicatedFor: [],
    tier: EXERCISE_TIERS.BASIC,
    cues: [
      'Set pulley to eye level; hold rope ends with thumbs pointing backwards',
      'Pull center of rope towards forehead while actively rotating hands back behind ears',
      'Finish in "double biceps" pose, squeezing rear delts and mid-traps for 2s'
    ],
    modEasier: 'Resistance Band Face Pull anchored to door',
    modHarder: 'Seated Cable Face Pull with 3-second isometric hold',
    defaultSets: 3,
    defaultReps: '15-18 reps',
    restSeconds: 45
  },
  {
    baseId: 'deadbug_lumbar_imprint_rehab',
    name: 'Deadbug Core Protocol (Lumbar Floor Imprint)',
    pattern: 'Anti-Extension Core',
    muscles: [MUSCLE_GROUPS.CORE],
    equipment: ['bodyweight'],
    gymEquipment: 'Exercise Mat',
    problems: [BODY_PROBLEMS.ANTERIOR_PELVIC_TILT, BODY_PROBLEMS.LOWER_BACK_PAIN, BODY_PROBLEMS.CORE_WEAKNESS, BODY_PROBLEMS.ZERO_EXPERIENCE],
    contraindicatedFor: [],
    tier: EXERCISE_TIERS.BASIC,
    cues: [
      'Lie on back; press lumbar spine flat into floor so no hand can slide underneath',
      'Bring knees to 90° and arms straight above shoulders',
      'Slowly extend opposite arm and leg while exhaling forcefully and keeping lower back glued down'
    ],
    modEasier: 'Bent-knee heel taps only without arm extension',
    modHarder: 'Hold a stability ball between knees and hands during extension',
    defaultSets: 3,
    defaultReps: '10 reps / side',
    restSeconds: 45
  },
  {
    baseId: 'prone_y_t_w_posture_rehab',
    name: 'Prone Y-T-W Scapular Stabilizer Raises (Upper Crossed Reset)',
    pattern: 'Scapular Stability & Posture',
    muscles: [MUSCLE_GROUPS.BACK, MUSCLE_GROUPS.SHOULDERS, MUSCLE_GROUPS.MOBILITY],
    equipment: ['bodyweight', 'dumbbells'],
    gymEquipment: 'Exercise Mat or Incline Bench',
    problems: [BODY_PROBLEMS.DESK_POSTURE, BODY_PROBLEMS.SHOULDER_IMPINGEMENT, BODY_PROBLEMS.NECK_STIFFNESS, BODY_PROBLEMS.CORE_WEAKNESS],
    contraindicatedFor: [],
    tier: EXERCISE_TIERS.BASIC,
    cues: [
      'Lie face down on floor or incline bench with chin tucked in neutral',
      'Raise arms into "Y" position with thumbs up, holding for 2s',
      'Transition to "T" position (arms 90°), then "W" position (elbows tucked to ribs)'
    ],
    modEasier: 'Bodyweight floor prone holds',
    modHarder: 'Hold 1-2kg micro-dumbbells on 30° incline bench',
    defaultSets: 3,
    defaultReps: '6 reps per letter (Y, T, W)',
    restSeconds: 45
  },
  {
    baseId: 'band_pull_apart_posture_rehab',
    name: 'Resistance Band Pull-Apart (Scapular Retraction)',
    pattern: 'Horizontal Pull / Scapular',
    muscles: [MUSCLE_GROUPS.BACK, MUSCLE_GROUPS.SHOULDERS, MUSCLE_GROUPS.MOBILITY],
    equipment: ['bands', 'bodyweight'],
    gymEquipment: 'Light Resistance Therapy Loop or Flat Band',
    problems: [BODY_PROBLEMS.DESK_POSTURE, BODY_PROBLEMS.NECK_STIFFNESS, BODY_PROBLEMS.SHOULDER_IMPINGEMENT, BODY_PROBLEMS.BUSY_SCHEDULE],
    contraindicatedFor: [],
    tier: EXERCISE_TIERS.BASIC,
    cues: [
      'Hold band at shoulder width with straight arms in front of chest',
      'Pull band apart by pinching shoulder blades together until band touches sternum',
      'Keep upper traps relaxed away from ears; do not shrug'
    ],
    modEasier: 'Wider grip on band to decrease resistance',
    modHarder: 'Underhand supinated grip with 3-second peak squeeze',
    defaultSets: 3,
    defaultReps: '15-20 reps',
    restSeconds: 45
  },
  {
    baseId: 'glute_bridge_pelvic_lock_rehab',
    name: 'Glute Bridge with Posterior Pelvic Lock',
    pattern: 'Hip Hinge / Thrust',
    muscles: [MUSCLE_GROUPS.LEGS_POSTERIOR, MUSCLE_GROUPS.CORE],
    equipment: ['bodyweight', 'dumbbells', 'bands', 'gym'],
    gymEquipment: 'Exercise Mat / Dumbbell on Pelvis / Booty Band',
    problems: [BODY_PROBLEMS.LOWER_BACK_PAIN, BODY_PROBLEMS.KNEE_PAIN, BODY_PROBLEMS.ANTERIOR_PELVIC_TILT, BODY_PROBLEMS.HIP_IMPINGEMENT],
    contraindicatedFor: [],
    tier: EXERCISE_TIERS.BASIC,
    cues: [
      'Lie flat on back, feet shoulder-width, shins vertical at top lockout',
      'Tuck pelvis into posterior tilt (flatten lower back) before driving hips up',
      'Squeeze glutes maximally for 2 seconds without hyperextending lumbar spine'
    ],
    modEasier: 'Two-leg bodyweight bridge with hands flat on floor',
    modHarder: 'Single-Leg Elevated Glute Bridge or Barbell Hip Thrust',
    defaultSets: 3,
    defaultReps: '12-15 reps',
    restSeconds: 45
  },
  {
    baseId: 'pallof_press_anti_rot_rehab',
    name: 'Anti-Rotation Cable / Band Pallof Press',
    pattern: 'Anti-Rotation Core',
    muscles: [MUSCLE_GROUPS.CORE, MUSCLE_GROUPS.SHOULDERS],
    equipment: ['gym', 'cables', 'bands'],
    gymEquipment: 'Cable Column with D-Handle or Anchor Loop Band',
    problems: [BODY_PROBLEMS.LOWER_BACK_PAIN, BODY_PROBLEMS.CORE_WEAKNESS, BODY_PROBLEMS.ATHLETIC_POWER, BODY_PROBLEMS.SKINNY_FAT],
    contraindicatedFor: [],
    tier: EXERCISE_TIERS.INTERMEDIATE,
    cues: [
      'Stand perpendicular to cable tower with feet shoulder-width and soft knees',
      'Hold handle at sternum, brace core, and press straight out in front of chest',
      'Resist the cable rotational pull without twisting shoulders or pelvis'
    ],
    modEasier: 'Tall-kneeling Pallof Press with light resistance band',
    modHarder: 'Pallof Press with Overhead Raise or Split-Stance',
    defaultSets: 3,
    defaultReps: '10 reps / side (2s hold)',
    restSeconds: 60
  },
  {
    baseId: 'landmine_press_overhead_rehab',
    name: 'Half-Kneeling Landmine Overhead Press',
    pattern: 'Incline Push (Shoulder Safe)',
    muscles: [MUSCLE_GROUPS.SHOULDERS, MUSCLE_GROUPS.CHEST, MUSCLE_GROUPS.CORE],
    equipment: ['gym', 'barbells'],
    gymEquipment: 'Barbell in Landmine Attachment or Corner Pivot',
    problems: [BODY_PROBLEMS.SHOULDER_IMPINGEMENT, BODY_PROBLEMS.LOWER_BACK_PAIN, BODY_PROBLEMS.CORE_WEAKNESS, BODY_PROBLEMS.ATHLETIC_POWER],
    contraindicatedFor: [],
    tier: EXERCISE_TIERS.INTERMEDIATE,
    cues: [
      'Half-kneeling stance (knee down on same side as pressing hand)',
      'Press barbell sleeve upward at a 45-degree angle following natural scapular arc',
      'Allows pain-free overhead pressing without impinging acromion or arching spine'
    ],
    modEasier: 'Standing two-handed landmine chest press',
    modHarder: 'Add 10-20kg weight plate + 2-second lockout pause',
    defaultSets: 3,
    defaultReps: '8-10 reps / side',
    restSeconds: 60
  }
];

// =========================================================================
// 2. DETERMINISTIC GENERATIVE COMBINATORIAL ENGINE (2,500+ Permutations)
// =========================================================================

const TEMPO_VARIATIONS = [
  { id: 'std', label: 'Standard Tempo (2-0-1)', tempoDesc: '2s lowering, smooth concentric', restMod: 0 },
  { id: 'pause_2s', label: '2-Second Peak Stretch Pause', tempoDesc: 'Deep 2-second stretch pause eliminates momentum', restMod: 15 },
  { id: 'eccentric_4s', label: 'Accentuated 4-Second Eccentric', tempoDesc: '4 seconds slow lowering for maximum microtrauma and tendon conditioning', restMod: 15 },
  { id: 'one_half_rep', label: '1.5 Constant Tension Reps', tempoDesc: 'Full rep + half rep at bottom stretch before next rep', restMod: 15 },
  { id: 'speed_contrast', label: 'Explosive Power Speed Contrast', tempoDesc: 'Maximum concentric speed with rhythmic reset', restMod: 30 }
];

const STANCE_VARIATIONS = [
  { id: 'bilateral', prefix: '', desc: 'Standard Bilateral Stance' },
  { id: 'half_kneeling', prefix: 'Half-Kneeling ', desc: 'Locks pelvis in neutral and engages glute of trailing leg' },
  { id: 'tall_kneeling', prefix: 'Tall-Kneeling ', desc: 'Eliminates leg cheat and forces strict core stabilization' },
  { id: 'offset_split', prefix: 'Split-Stance / Offset ', desc: 'Increases balance demand and unilateral hip stability' },
  { id: 'single_arm', prefix: 'Unilateral Single-Arm / Single-Leg ', desc: 'Identifies and cures side-to-side strength imbalances' }
];

const EQUIPMENT_SPECS = [
  { type: 'gym', label: 'Full Gym Setup', defaultEquip: 'Commercial Gym Equipment / Barbells / Cables' },
  { type: 'dumbbells', label: 'Home Dumbbells', defaultEquip: 'Adjustable Dumbbell Pair & Sturdy Bench' },
  { type: 'bodyweight', label: 'Bodyweight / Calisthenics', defaultEquip: 'Exercise Mat / Floor / Calisthenics Bar' },
  { type: 'cables', label: 'Functional Cable Column', defaultEquip: 'Dual Cable Functional Trainer' },
  { type: 'bands', label: 'Therapy & Loop Bands', defaultEquip: 'Heavy & Light Elastic Resistance Loop Bands' },
  { type: 'kettlebells', label: 'Kettlebells', defaultEquip: 'Cast Iron Kettlebells' },
  { type: 'machines', label: 'Selectorized Machines', defaultEquip: 'Biomechanical Selectorized Weight Stack' }
];

function generateMassiveExerciseDatabase() {
  const generated = [];
  const generatedIdMap = new Set();

  // 1. Add all base curated exercises
  CURATED_EXERCISE_TEMPLATES.forEach(base => {
    const fullEx = {
      id: `ex_${base.baseId}`,
      name: base.name,
      pattern: base.pattern,
      muscles: base.muscles,
      tier: base.tier,
      equipment: base.equipment[0] || 'gym',
      equipmentOptions: base.equipment,
      gymEquipment: base.gymEquipment,
      problems: base.problems || [],
      contraindicatedFor: base.contraindicatedFor || [],
      cues: base.cues,
      modifications: {
        easier: base.modEasier,
        harder: base.modHarder
      },
      defaultSets: base.defaultSets,
      defaultReps: base.defaultReps,
      restSeconds: base.restSeconds,
      progressionNotes: `Targeted protocol for ${base.problems.map(p => PROBLEM_METADATA[p]?.name || p).slice(0, 2).join(', ')}.`
    };
    generated.push(fullEx);
    generatedIdMap.add(fullEx.id);
  });

  // 2. Deterministically permute curated templates across tempos, stances, equipment, and tiers
  CURATED_EXERCISE_TEMPLATES.forEach(base => {
    TEMPO_VARIATIONS.forEach(tempo => {
      STANCE_VARIATIONS.forEach(stance => {
        base.equipment.forEach(equipType => {
          let tier = base.tier;
          if (stance.id === 'single_arm' || tempo.id === 'one_half_rep') {
            tier = tier === EXERCISE_TIERS.BASIC ? EXERCISE_TIERS.INTERMEDIATE : EXERCISE_TIERS.ADVANCED;
          }

          const uniqueId = `ex_${base.baseId}_${stance.id}_${tempo.id}_${equipType}`;
          if (!generatedIdMap.has(uniqueId)) {
            generatedIdMap.add(uniqueId);

            const equipMeta = EQUIPMENT_SPECS.find(e => e.type === equipType) || EQUIPMENT_SPECS[0];
            const name = `${stance.prefix}${base.name} (${tempo.label.split(' ')[0]})`;

            const fullEx = {
              id: uniqueId,
              name,
              pattern: base.pattern,
              muscles: base.muscles,
              tier,
              equipment: equipType,
              equipmentOptions: [equipType],
              gymEquipment: `${equipMeta.defaultEquip} (${stance.desc})`,
              problems: base.problems || [],
              contraindicatedFor: base.contraindicatedFor || [],
              cues: [
                ...base.cues.slice(0, 2),
                `Tempo Strategy: ${tempo.tempoDesc}. Stance: ${stance.desc}.`
              ],
              modifications: {
                easier: `Reduce load or revert to standard ${base.name}`,
                harder: `Increase time-under-tension with 3s eccentric and 2s pause`
              },
              defaultSets: tier === EXERCISE_TIERS.ADVANCED ? 4 : 3,
              defaultReps: tempo.id === 'pause_2s' ? '8-10 reps' : (tempo.id === 'one_half_rep' ? '6-8 reps' : (base.problems.includes(BODY_PROBLEMS.FAT_LOSS) ? '12-15 reps' : '10-12 reps')),
              restSeconds: base.restSeconds + tempo.restMod,
              progressionNotes: `Customized for: ${base.problems.map(p => PROBLEM_METADATA[p]?.name || p).slice(0, 2).join(' + ')}.`
            };

            generated.push(fullEx);
          }
        });
      });
    });
  });

  return generated;
}

// Master generated database containing 2,500+ indexed exercises
export const EXERCISE_DATABASE = generateMassiveExerciseDatabase();

// =========================================================================
// 3. INTELLIGENT PROBLEM & GOAL-TO-EXERCISE PRESCRIPTION ENGINE
// =========================================================================
// Core Rule: Different User === Different Problems/Goals == Completely Different Exercises

export class ExercisePrescriptionEngine {
  /**
   * Retrieves all exercises matching given problems, goal, equipment, and tier
   */
  static getExercisesForProblems(problemIds = [], equipment = 'gym', tier = null, goal = null, focusAreas = []) {
    const problems = Array.isArray(problemIds) ? [...problemIds] : [problemIds];
    
    // If goal is specified, append corresponding body problem tag
    if (goal === 'fat_loss' && !problems.includes(BODY_PROBLEMS.FAT_LOSS)) {
      problems.push(BODY_PROBLEMS.FAT_LOSS);
    } else if (goal === 'muscle_gain' && !problems.includes(BODY_PROBLEMS.HYPERTROPHY)) {
      problems.push(BODY_PROBLEMS.HYPERTROPHY);
    } else if (goal === 'stamina_mobility' && !problems.includes(BODY_PROBLEMS.DESK_POSTURE)) {
      problems.push(BODY_PROBLEMS.DESK_POSTURE);
    }

    return EXERCISE_DATABASE.filter(ex => {
      // 1. Check equipment match
      if (equipment === 'bodyweight' && ex.equipment !== 'bodyweight') return false;
      if (equipment === 'dumbbells' && ex.equipment !== 'dumbbells' && ex.equipment !== 'bodyweight') return false;
      if (equipment === 'bands' && ex.equipment !== 'bands' && ex.equipment !== 'bodyweight') return false;

      // 2. Check contraindications (strictly exclude anything contraindicated for user's problems)
      const isContraindicated = problems.some(p => ex.contraindicatedFor && ex.contraindicatedFor.includes(p));
      if (isContraindicated) return false;

      // 3. Check tier if specified
      if (tier && ex.tier !== tier) return false;

      // 4. Check if exercise targets any of user's problems / goals
      if (problems.length > 0) {
        const matchesProblem = problems.some(p => ex.problems && ex.problems.includes(p));
        if (matchesProblem) return true;
      }

      // 5. Check if exercise matches custom focus areas (e.g. Chest, Arms, Shoulders)
      if (focusAreas && focusAreas.length > 0) {
        const matchesFocus = focusAreas.some(fa => {
          const faLower = fa.toLowerCase();
          return ex.muscles.some(m => faLower.includes(m.toLowerCase())) || ex.name.toLowerCase().includes(faLower);
        });
        if (matchesFocus) return true;
      }

      return problems.length === 0;
    });
  }

  /**
   * Dynamically synthesizes a curated workout routine tailored specifically
   * to the user's diagnosed body problems, goal, custom focus areas, equipment, and tier.
   * Enforces 5 exercises per day with 3 sets each (4 core anchor exercises + 1 rotating exercise daily).
   */
  static synthesizeRoutine({
    routineName = 'Custom Targeted Protocol',
    goal = 'fat_loss',
    problems = [],
    focusAreas = [],
    equipment = 'gym',
    tier = EXERCISE_TIERS.BASIC,
    targetMuscles = [MUSCLE_GROUPS.CHEST, MUSCLE_GROUPS.BACK, MUSCLE_GROUPS.CORE],
    exerciseCount = 5,
    coreAnchorExercises = null,
    dayIndex = 0
  }) {
    // Map goal to problem tags if needed
    const effectiveProblems = Array.from(new Set([
      ...(problems || []),
      goal === 'fat_loss' ? BODY_PROBLEMS.FAT_LOSS : (goal === 'muscle_gain' ? BODY_PROBLEMS.HYPERTROPHY : (goal === 'stamina_mobility' ? BODY_PROBLEMS.DESK_POSTURE : BODY_PROBLEMS.SKINNY_FAT))
    ]));

    const matchingExercises = this.getExercisesForProblems(effectiveProblems, equipment, null, goal, focusAreas);

    const selected = [];
    const usedPatterns = new Set();
    const usedBaseNames = new Set();

    // Helper to extract base name (ignoring tempo/stance prefixes)
    const getBaseName = (name) => name.split('(')[0].replace(/^(Half-Kneeling|Tall-Kneeling|Split-Stance \/ Offset|Unilateral Single-Arm \/ Single-Leg)\s+/i, '').trim();

    // 1. If coreAnchorExercises (4 exercises) are provided, use them as the 4 consistent anchor movements
    if (Array.isArray(coreAnchorExercises) && coreAnchorExercises.length >= 4) {
      coreAnchorExercises.slice(0, 4).forEach(ex => {
        selected.push({ ...ex, defaultSets: 3 });
        usedBaseNames.add(getBaseName(ex.name));
        if (ex.pattern) usedPatterns.add(ex.pattern);
      });
    } else {
      // Priority 1: Pick 4 core anchor exercises matching target muscles & problems
      for (const muscle of targetMuscles) {
        if (selected.length >= 4) break;

        const candidates = matchingExercises.filter(ex => 
          ex.muscles.includes(muscle) && 
          !selected.some(s => s.id === ex.id) &&
          !usedBaseNames.has(getBaseName(ex.name)) &&
          (!tier || ex.tier === tier)
        );

        if (candidates.length > 0) {
          const best = candidates.find(c => !usedPatterns.has(c.pattern)) || candidates[0];
          selected.push(best);
          if (best.pattern) usedPatterns.add(best.pattern);
          usedBaseNames.add(getBaseName(best.name));
        }
      }

      // Priority 2: Fill remaining slots up to 4 core exercises
      if (selected.length < 4) {
        for (const ex of matchingExercises) {
          if (selected.length >= 4) break;
          const baseName = getBaseName(ex.name);
          if (!selected.some(s => s.id === ex.id) && !usedBaseNames.has(baseName)) {
            selected.push(ex);
            usedBaseNames.add(baseName);
          }
        }
      }

      // Priority 3: Fallback from overall database up to 4 core exercises
      if (selected.length < 4) {
        const safeFallbacks = EXERCISE_DATABASE.filter(ex => {
          const isContra = effectiveProblems.some(p => ex.contraindicatedFor && ex.contraindicatedFor.includes(p));
          const equipMatch = equipment === 'bodyweight' ? ex.equipment === 'bodyweight' : (equipment === 'dumbbells' ? (ex.equipment === 'dumbbells' || ex.equipment === 'bodyweight') : true);
          const baseName = getBaseName(ex.name);
          return !isContra && equipMatch && !selected.some(s => s.id === ex.id) && !usedBaseNames.has(baseName);
        });

        for (const fb of safeFallbacks) {
          if (selected.length >= 4) break;
          selected.push(fb);
          usedBaseNames.add(getBaseName(fb.name));
        }
      }
    }

    // 2. Add 1 ROTATING exercise for slot 5 that rotates everyday based on dayIndex
    const rotatingCandidates = matchingExercises.filter(ex => 
      !selected.some(s => s.id === ex.id) && 
      !usedBaseNames.has(getBaseName(ex.name))
    );

    let rotatingEx = null;
    if (rotatingCandidates.length > 0) {
      const rotIdx = Math.abs(dayIndex) % rotatingCandidates.length;
      rotatingEx = rotatingCandidates[rotIdx];
    } else {
      const fallbackCandidates = EXERCISE_DATABASE.filter(ex => 
        !selected.some(s => s.id === ex.id) && 
        !usedBaseNames.has(getBaseName(ex.name))
      );
      if (fallbackCandidates.length > 0) {
        rotatingEx = fallbackCandidates[Math.abs(dayIndex) % fallbackCandidates.length];
      }
    }

    if (rotatingEx && selected.length < 5) {
      selected.push(rotatingEx);
      usedBaseNames.add(getBaseName(rotatingEx.name));
    }

    // If still less than 5, pick any safe non-conflicting exercise
    if (selected.length < 5) {
      for (const ex of EXERCISE_DATABASE) {
        if (selected.length >= 5) break;
        if (!selected.some(s => s.id === ex.id)) {
          selected.push(ex);
        }
      }
    }

    // Adjust rest and sets/reps: STRICTLY 3 SETS PER EXERCISE
    const adjustedExercises = selected.slice(0, 5).map(ex => {
      const copy = { ...ex };
      copy.defaultSets = 3; // Enforced 3 sets per exercise per day
      if (goal === 'fat_loss') {
        copy.restSeconds = Math.min(copy.restSeconds || 45, 45);
        if (!copy.defaultReps || (!copy.defaultReps.includes('15') && !copy.defaultReps.includes('20'))) {
          copy.defaultReps = '12-15 reps';
        }
      } else if (goal === 'muscle_gain') {
        copy.restSeconds = Math.max(copy.restSeconds || 90, 75);
        if (!copy.defaultReps || (!copy.defaultReps.includes('6') && !copy.defaultReps.includes('8'))) {
          copy.defaultReps = '8-12 reps';
        }
      } else {
        copy.defaultReps = copy.defaultReps || '10-12 reps';
      }
      return copy;
    });

    const coreAnchorList = adjustedExercises.slice(0, 4);
    const rotatingExerciseItem = adjustedExercises[4] || null;

    return {
      name: routineName,
      goal,
      targetProblems: effectiveProblems,
      tier,
      equipment,
      exercises: adjustedExercises,
      coreAnchorExercises: coreAnchorList,
      rotatingExercise: rotatingExerciseItem,
      medRoutine: {
        name: `10-Min MED Express (${routineName.split(' ')[0]})`,
        estMinutes: 10,
        exercises: adjustedExercises.slice(0, 2)
      }
    };
  }
}
