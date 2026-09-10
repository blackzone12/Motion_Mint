// Evidence-based habit library for MotionMint
// Categorized by timing, behavioral domain, and difficulty

export const HABIT_CATEGORIES = {
  HYDRATION: { id: 'hydration', name: 'Hydration & Fuel', color: '#06b6d4', icon: '💧' },
  MOVEMENT: { id: 'movement', name: 'Physical Movement', color: '#10b981', icon: '⚡' },
  NUTRITION: { id: 'nutrition', name: 'Mindful Nutrition', color: '#f59e0b', icon: '🥗' },
  SLEEP: { id: 'sleep', name: 'Sleep & Recovery', color: '#8b5cf6', icon: '🌙' },
  MINDSET: { id: 'mindset', name: 'Behavior & Mindset', color: '#ec4899', icon: '🧠' }
};

export const TIME_SLOTS = {
  MORNING: { id: 'morning', label: 'Morning Anchor', icon: '🌅' },
  AFTERNOON: { id: 'afternoon', label: 'Mid-Day Anchor', icon: '☀️' },
  PRE_POST: { id: 'pre_post', label: 'Workout Stacks', icon: '🏋️' },
  EVENING: { id: 'evening', label: 'Evening Wind-Down', icon: '🌌' },
  ANYTIME: { id: 'anytime', label: 'Daily Baseline', icon: '🔄' }
};

export const HABIT_DATABASE = [
  // MORNING HABITS
  {
    id: 'm_water_500',
    title: 'Morning Hydro-Boost',
    desc: 'Drink 500ml of water with a pinch of mineral salt or lemon immediately upon waking.',
    category: 'hydration',
    timeSlot: 'morning',
    cue: 'Right after getting out of bed and turning off the alarm',
    impact: 'High',
    difficulty: 'Easy',
    xp: 20,
    tags: ['fat_loss', 'energy', 'muscle_gain', 'all'],
    targetObstacles: ['low_energy', 'cravings', 'inconsistency']
  },
  {
    id: 'm_sunlight_10',
    title: 'Morning Sunlight & Circadian Lock',
    desc: 'Get 5-10 minutes of direct outdoor natural sunlight in your eyes to set your circadian clock and cortisol peak.',
    category: 'sleep',
    timeSlot: 'morning',
    cue: 'Right after drinking morning water',
    impact: 'High',
    difficulty: 'Easy',
    xp: 25,
    tags: ['sleep', 'energy', 'all'],
    targetObstacles: ['poor_sleep', 'low_energy']
  },
  {
    id: 'm_protein_breakfast',
    title: '30g Protein Anchor Breakfast',
    desc: 'Consume at least 25-35g of bioavailable protein at your first meal to stabilize ghrelin and prevent afternoon crashes.',
    category: 'nutrition',
    timeSlot: 'morning',
    cue: 'When preparing breakfast',
    impact: 'Critical',
    difficulty: 'Medium',
    xp: 35,
    tags: ['fat_loss', 'muscle_gain', 'cravings'],
    targetObstacles: ['cravings', 'busy_schedule', 'inconsistency']
  },
  {
    id: 'm_mobility_5',
    title: '5-Minute Spine & Hip Opener',
    desc: 'Do Cat-Cow, World\'s Greatest Stretch, and 10 deep bodyweight squats to counteract sedentary stiffness.',
    category: 'movement',
    timeSlot: 'morning',
    cue: 'Before taking morning shower or sitting at desk',
    impact: 'Medium',
    difficulty: 'Easy',
    xp: 20,
    tags: ['mobility', 'posture', 'injury_prevention'],
    targetObstacles: ['joint_pain', 'busy_schedule']
  },

  // MID-DAY / AFTERNOON HABITS
  {
    id: 'a_walk_10',
    title: 'Post-Lunch Metabolic Walk',
    desc: 'Walk for 10-15 minutes after your biggest meal to blunt glucose spikes and aid digestion.',
    category: 'movement',
    timeSlot: 'afternoon',
    cue: 'Immediately after swallowing last bite of lunch',
    impact: 'High',
    difficulty: 'Easy',
    xp: 25,
    tags: ['fat_loss', 'digestion', 'energy'],
    targetObstacles: ['busy_schedule', 'low_energy', 'joint_pain']
  },
  {
    id: 'a_water_bottle_refill',
    title: 'Afternoon Hydration Checkpoint',
    desc: 'Finish your second 1-liter water bottle before 3:00 PM.',
    category: 'hydration',
    timeSlot: 'afternoon',
    cue: 'When clock hits 2:00 PM',
    impact: 'Medium',
    difficulty: 'Easy',
    xp: 15,
    tags: ['fat_loss', 'energy'],
    targetObstacles: ['cravings', 'low_energy']
  },
  {
    id: 'a_smart_snack_swap',
    title: 'Smart Protein/Fiber Snack Swap',
    desc: 'Swap processed afternoon biscuits/chips with Greek yogurt, fruit, or a handful of almonds.',
    category: 'nutrition',
    timeSlot: 'afternoon',
    cue: 'When the 3-4 PM craving strikes',
    impact: 'High',
    difficulty: 'Medium',
    xp: 30,
    tags: ['fat_loss', 'cravings'],
    targetObstacles: ['cravings', 'inconsistency']
  },
  {
    id: 'a_posture_reset',
    title: 'Hourly Ergonomic Posture Reset',
    desc: 'Stand up, do 5 shoulder dislocates / door-frame chest stretches, and take 3 deep diaphragmatic breaths.',
    category: 'movement',
    timeSlot: 'afternoon',
    cue: 'When switching work tasks or hourly timer rings',
    impact: 'Medium',
    difficulty: 'Easy',
    xp: 15,
    tags: ['posture', 'mobility'],
    targetObstacles: ['joint_pain', 'busy_schedule']
  },

  // PRE/POST WORKOUT HABITS
  {
    id: 'w_clothes_prep',
    title: 'The 2-Minute Friction Killer',
    desc: 'Lay out workout clothes and fill shaker bottle beforehand so workout initiation has zero cognitive friction.',
    category: 'mindset',
    timeSlot: 'pre_post',
    cue: 'The night before or 30 mins before scheduled workout',
    impact: 'Critical',
    difficulty: 'Easy',
    xp: 20,
    tags: ['consistency', 'all'],
    targetObstacles: ['inconsistency', 'busy_schedule']
  },
  {
    id: 'w_dynamic_warmup',
    title: 'Pre-Session Activation Protocol',
    desc: 'Complete 3 minutes of dynamic joint activation (arm circles, leg swings, glute bridges) before loading weights.',
    category: 'movement',
    timeSlot: 'pre_post',
    cue: 'Right when stepping onto workout mat/gym floor',
    impact: 'High',
    difficulty: 'Easy',
    xp: 25,
    tags: ['injury_prevention', 'muscle_gain'],
    targetObstacles: ['joint_pain', 'inconsistency']
  },
  {
    id: 'w_post_protein',
    title: 'Post-Workout Anabolic Re-fuel',
    desc: 'Consume 20-40g protein within 90 minutes post-training to accelerate muscle protein synthesis and recovery.',
    category: 'nutrition',
    timeSlot: 'pre_post',
    cue: 'Within 30-60 mins after logging final workout set',
    impact: 'High',
    difficulty: 'Easy',
    xp: 30,
    tags: ['muscle_gain', 'recovery', 'fat_loss'],
    targetObstacles: ['low_energy', 'inconsistency']
  },

  // EVENING WIND-DOWN HABITS
  {
    id: 'e_kitchen_close',
    title: 'The 8:30 PM Kitchen Curfew',
    desc: 'Close the kitchen 2.5 hours before sleep. If hungry, drink peppermint/chamomile tea or warm water.',
    category: 'nutrition',
    timeSlot: 'evening',
    cue: 'After finishing dinner dishes',
    impact: 'Critical',
    difficulty: 'Hard',
    xp: 40,
    tags: ['fat_loss', 'sleep', 'cravings'],
    targetObstacles: ['cravings', 'poor_sleep']
  },
  {
    id: 'e_screen_off',
    title: 'Digital Sunset (Screens Off 45m Prior)',
    desc: 'Switch phone to Do Not Disturb and replace doom-scrolling with reading or relaxing music.',
    category: 'sleep',
    timeSlot: 'evening',
    cue: '45 minutes before targeted sleep time',
    impact: 'High',
    difficulty: 'Medium',
    xp: 30,
    tags: ['sleep', 'recovery', 'mindset'],
    targetObstacles: ['poor_sleep', 'low_energy']
  },
  {
    id: 'e_tomorrow_plan',
    title: 'Tomorrow\'s 60-Second Win Preview',
    desc: 'Open MotionMint, check tomorrow\'s workout & top 3 habits, and mentally lock in your victory.',
    category: 'mindset',
    timeSlot: 'evening',
    cue: 'Right before brushing teeth at night',
    impact: 'High',
    difficulty: 'Easy',
    xp: 20,
    tags: ['consistency', 'mindset'],
    targetObstacles: ['inconsistency', 'busy_schedule']
  },
  {
    id: 'e_sleep_7_5',
    title: '7.5+ Hours Sleep Opportunity Window',
    desc: 'Ensure lights are out with at least 8 hours between bed and your morning alarm.',
    category: 'sleep',
    timeSlot: 'evening',
    cue: 'When reaching targeted bedtime',
    impact: 'Critical',
    difficulty: 'Medium',
    xp: 40,
    tags: ['sleep', 'fat_loss', 'muscle_gain', 'recovery'],
    targetObstacles: ['poor_sleep', 'low_energy', 'cravings']
  },

  // DAILY BASELINE HABITS
  {
    id: 'd_step_goal',
    title: 'NEAT Step Target (8,000+ Steps)',
    desc: 'Accumulate non-exercise physical activity steps through small choices (stairs, pacing on phone calls).',
    category: 'movement',
    timeSlot: 'anytime',
    cue: 'Throughout the day',
    impact: 'High',
    difficulty: 'Medium',
    xp: 35,
    tags: ['fat_loss', 'general_health'],
    targetObstacles: ['busy_schedule', 'low_energy']
  },
  {
    id: 'd_mindful_eating',
    title: 'No-Distraction Eating (20 Min Meal)',
    desc: 'Eat meals without watching screens/TV. Chew slowly to allow fullness satiety hormones to register.',
    category: 'nutrition',
    timeSlot: 'anytime',
    cue: 'Before taking first bite of any meal',
    impact: 'High',
    difficulty: 'Medium',
    xp: 25,
    tags: ['fat_loss', 'cravings'],
    targetObstacles: ['cravings', 'inconsistency']
  }
];

export const HABIT_STACK_TEMPLATES = [
  {
    id: 'stack_morning_fire',
    name: 'The Morning Metabo-Charge',
    description: 'Anchor hydration, sunlight, and a spine opener right after wake-up.',
    habits: ['m_water_500', 'm_sunlight_10', 'm_mobility_5']
  },
  {
    id: 'stack_fatloss_shield',
    name: 'The Craving Shield Stack',
    description: 'Specifically engineered to stop evening and afternoon diet collapses.',
    habits: ['m_protein_breakfast', 'a_walk_10', 'e_kitchen_close']
  },
  {
    id: 'stack_busy_hero',
    name: 'The 15-Minute Busy Professional Stack',
    description: 'Ultra-low friction anchors that deliver 80% of health results with minimal time.',
    habits: ['w_clothes_prep', 'a_walk_10', 'e_tomorrow_plan']
  },
  {
    id: 'stack_recovery_master',
    name: 'The Deep Sleep & Muscle Repair Stack',
    description: 'Optimizes growth hormone, deep REM sleep, and muscular regeneration.',
    habits: ['w_post_protein', 'e_screen_off', 'e_sleep_7_5']
  }
];
