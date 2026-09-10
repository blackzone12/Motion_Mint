// Custom Out-of-the-Box Goal Synthesis Engine for MotionMint
// Parses user-written natural language goals, extracts behavioral priorities and body problems, and creates tailored plans

import { GOALS } from './presets.js';
import { BODY_PROBLEMS } from './exercises.js';

export class CustomGoalEngine {
  static analyzeCustomGoal(customPrompt = '', currentUserState = {}) {
    const text = (customPrompt || '').toLowerCase();

    // 1. Detect Specific Body Problems & Orthopedic Constraints
    const detectedProblems = [];
    if (text.includes('lower back') || text.includes('back pain') || text.includes('lumbar') || text.includes('disc') || text.includes('sciatica')) {
      detectedProblems.push(BODY_PROBLEMS.LOWER_BACK_PAIN);
    }
    if (text.includes('knee') || text.includes('patellar') || text.includes('meniscus') || text.includes('runners knee')) {
      detectedProblems.push(BODY_PROBLEMS.KNEE_PAIN);
    }
    if (text.includes('shoulder') || text.includes('rotator') || text.includes('impingement') || text.includes('ac joint')) {
      detectedProblems.push(BODY_PROBLEMS.SHOULDER_IMPINGEMENT);
    }
    if (text.includes('desk') || text.includes('posture') || text.includes('rounded shoulder') || text.includes('forward head') || text.includes('kyphosis') || text.includes('sitting all day')) {
      detectedProblems.push(BODY_PROBLEMS.DESK_POSTURE);
    }
    if (text.includes('pelvic tilt') || text.includes('anterior pelvic') || text.includes('apt') || text.includes('arched back') || text.includes('lordosis')) {
      detectedProblems.push(BODY_PROBLEMS.ANTERIOR_PELVIC_TILT);
    }
    if (text.includes('neck') || text.includes('tech neck') || text.includes('cervical') || text.includes('traps stiff')) {
      detectedProblems.push(BODY_PROBLEMS.NECK_STIFFNESS);
    }
    if (text.includes('wrist') || text.includes('carpal') || text.includes('wrist pain')) {
      detectedProblems.push(BODY_PROBLEMS.WRIST_PAIN);
    }
    if (text.includes('tight hip') || text.includes('hip mobility') || text.includes('glute amnesia')) {
      detectedProblems.push(BODY_PROBLEMS.HIP_IMPINGEMENT);
    }
    if (text.includes('skinny fat') || text.includes('skinny-fat') || text.includes('flabby')) {
      detectedProblems.push(BODY_PROBLEMS.SKINNY_FAT);
    }
    if (text.includes('heavy') || text.includes('overweight') || text.includes('joint load') || text.includes('low impact') || text.includes('high bmi')) {
      detectedProblems.push(BODY_PROBLEMS.OBESITY_JOINT_LOAD);
    }
    if (text.includes('beginner') || text.includes('never worked out') || text.includes('zero experience') || text.includes('newbie') || text.includes('start from scratch')) {
      detectedProblems.push(BODY_PROBLEMS.ZERO_EXPERIENCE);
    }

    // 2. Detect Primary Objective (Priority: Endurance/Stamina -> Fat Loss -> Muscle Gain -> Recomp)
    let detectedGoal = 'recomposition';
    let calorieFactor = -0.08;
    let proteinPerKg = 2.1;
    let focusTag = 'Tailored Custom Synthesis';
    let icon = '⚡';

    if (text.includes('endurance') || text.includes('marathon') || text.includes('running') || text.includes('stamina') || text.includes('energy') || text.includes('posture') || text.includes('pain') || text.includes('back')) {
      detectedGoal = 'stamina_mobility';
      calorieFactor = -0.05;
      proteinPerKg = 1.9;
      focusTag = 'Athletic Stamina, Posture & Mobility';
      icon = '🏃';
    } else if (text.includes('lose') || text.includes('fat') || text.includes('cut') || text.includes('lean') || text.includes('shred') || text.includes('slim') || text.includes('belly')) {
      detectedGoal = 'fat_loss';
      calorieFactor = -0.22;
      proteinPerKg = 2.2;
      focusTag = 'Fat Loss & Muscle Preservation';
      icon = '🔥';
    } else if (text.includes('gain') || text.includes('bulk') || text.includes('muscle') || text.includes('mass') || text.includes('hypertrophy') || text.includes('bigger') || text.includes('size')) {
      detectedGoal = 'muscle_gain';
      calorieFactor = 0.12;
      proteinPerKg = 2.2;
      focusTag = 'Lean Muscle Hypertrophy';
      icon = '💪';
    }

    // 3. Detect Timeframe mentions (e.g. "1 month", "2 months", "3 months", "6 months", "8 weeks", "wedding in 2 months")
    let targetMonths = currentUserState.timeframeMonths || 3;
    if (text.includes('1 month') || text.includes('4 weeks') || text.includes('30 days')) {
      targetMonths = 1;
    } else if (text.includes('2 months') || text.includes('8 weeks') || text.includes('60 days')) {
      targetMonths = 2;
    } else if (text.includes('3 months') || text.includes('12 weeks') || text.includes('90 days')) {
      targetMonths = 3;
    } else if (text.includes('6 months') || text.includes('half year')) {
      targetMonths = 6;
    } else if (text.includes('12 months') || text.includes('1 year')) {
      targetMonths = 12;
    }

    // 4. Extract Specific Anatomical / Behavioral Focus Areas
    const focusAreas = [];
    if (text.includes('chest') || text.includes('pecs')) focusAreas.push('Chest Thickness & Pressing Volume');
    if (text.includes('back') || text.includes('posture') || text.includes('pain') || text.includes('desk')) focusAreas.push('Spinal Decompression & Upper Back Density');
    if (text.includes('abs') || text.includes('six pack') || text.includes('core') || text.includes('belly')) focusAreas.push('Core Tightening & Visceral Fat Deficit');
    if (text.includes('glute') || text.includes('booty') || text.includes('legs') || text.includes('quad')) focusAreas.push('Glute/Hamstring Hypertrophy & Unilateral Balance');
    if (text.includes('arm') || text.includes('bicep') || text.includes('tricep') || text.includes('shoulder')) focusAreas.push('3D Boulder Shoulders & Arm Isolation');
    if (text.includes('marathon') || text.includes('cardio') || text.includes('run')) focusAreas.push('Aerobic Base & Low-Impact Glycogen Pacing');

    if (focusAreas.length === 0) {
      focusAreas.push('Full Body Harmonious Sculpting & Metabolic Ignition');
    }

    // 5. Synthesize Dedicated Custom Habits for their unique goal
    const customHabitStacks = [
      {
        id: `custom_h_${Date.now()}_1`,
        title: `Goal Anchor: ${focusAreas[0]} Focus`,
        desc: `Execute dedicated 5-minute activation drill for ${focusAreas[0]} daily.`,
        cue: 'Right before starting daily workout or morning routine',
        category: 'movement',
        timeSlot: 'morning',
        xp: 35
      },
      {
        id: `custom_h_${Date.now()}_2`,
        title: 'Custom Precision Fueling Anchor',
        desc: 'Adhere to your customized calorie window with 1.8-2.2g/kg bioavailable protein.',
        cue: 'When preparing lunch and dinner',
        category: 'nutrition',
        timeSlot: 'afternoon',
        xp: 30
      }
    ];

    const safePrompt = customPrompt.trim() || 'Custom Transformation Objective';

    const customGoalConfig = {
      id: `custom_${Date.now()}`,
      name: `Custom Mission: ${safePrompt.slice(0, 40)}${safePrompt.length > 40 ? '...' : ''}`,
      tagline: `Engineered specifically for: "${safePrompt}"`,
      rawPrompt: safePrompt,
      detectedGoal,
      detectedProblems,
      calorieFactor,
      proteinPerKg,
      carbRatio: detectedGoal === 'fat_loss' ? 0.40 : 0.50,
      fatRatio: 0.25,
      workoutFocus: focusAreas.join(' + '),
      phaseStrategy: `Personalized Phase Progression across ${targetMonths} Month(s)`,
      icon,
      color: '#8b5cf6',
      targetMonths,
      focusAreas,
      customHabitStacks
    };

    return customGoalConfig;
  }
}
