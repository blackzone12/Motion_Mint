// Central Reactive State Store for MotionMint
// Multi-Engine Persistent Offline Architecture (Chrome, Brave, Edge, Safari, Firefox)
// Operates with 100% data integrity without requiring user login or remote servers

const STORAGE_KEY = 'motionmint_state_v1';
const BACKUP_STORAGE_KEY = 'motionmint_workout_records_backup_v1';
const LAST_WORKOUT_KEY = 'motionmint_last_workout_v1';
const SESSION_KEY = 'motionmint_session_state_v1';

class StateStore {
  constructor() {
    this.listeners = new Set();
    this.state = this.loadInitialState();
    this.initIndexedDbSync();
  }

  getDefaultState() {
    return {
      version: '1.1',
      isOnboarded: false,
      user: {
        name: 'Champion',
        age: 28,
        gender: 'male',
        heightCm: 175,
        weightKg: 78,
        targetWeightKg: 72,
        goal: 'fat_loss',
        timeframeMonths: 3,
        obstacles: ['inconsistency', 'cravings'],
        equipment: 'dumbbells',
        daysPerWeek: 4,
        experienceLevel: 'intermediate',
        activityLevel: 'moderate' // sedentary, light, moderate, active
      },
      plan: null, // Generated plan structure
      dailyLogs: {}, // Keyed by 'YYYY-MM-DD': { habits: { [habitId]: boolean }, workout: { completed: boolean, name: string, exercises: [] }, notes: '', waterMl: 0 }
      lastCompletedWorkout: null, // Dedicated record of the most recent completed workout
      xp: 140,
      level: 1,
      currentStreak: 1,
      longestStreak: 1,
      lastActiveDate: this.getTodayDateString(),
      lastSavedTimestamp: new Date().toISOString(),
      freezeCredits: 1,
      achievements: ['first_step'],
      activeWorkoutSession: null, // If a workout is in progress
      customHabits: [],
      selectedDate: this.getTodayDateString()
    };
  }

  loadInitialState() {
    let raw = null;
    let source = 'none';

    // 1. Primary Attempt: LocalStorage
    try {
      raw = localStorage.getItem(STORAGE_KEY);
      if (raw) source = 'localStorage_primary';
    } catch (e) {
      console.warn('LocalStorage primary access error (e.g. Brave shields / private browsing):', e);
    }

    // 2. Secondary Attempt: Backup Key in LocalStorage
    if (!raw) {
      try {
        raw = localStorage.getItem(BACKUP_STORAGE_KEY);
        if (raw) source = 'localStorage_backup';
      } catch (e) {}
    }

    // 3. Tertiary Attempt: SessionStorage
    if (!raw) {
      try {
        raw = sessionStorage.getItem(SESSION_KEY);
        if (raw) source = 'sessionStorage';
      } catch (e) {}
    }

    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        const merged = {
          ...this.getDefaultState(),
          ...parsed,
          user: { ...this.getDefaultState().user, ...(parsed.user || {}) },
          dailyLogs: parsed.dailyLogs || {}
        };

        // If lastCompletedWorkout is not explicitly set, extract the newest completed one
        if (!merged.lastCompletedWorkout && merged.dailyLogs) {
          const completed = [];
          Object.entries(merged.dailyLogs).forEach(([dateStr, log]) => {
            if (log.workout && log.workout.completed) {
              completed.push({ date: dateStr, ...log.workout });
            }
          });
          completed.sort((a, b) => new Date(b.completedAt || b.date) - new Date(a.completedAt || a.date));
          if (completed.length > 0) {
            merged.lastCompletedWorkout = completed[0];
          }
        }

        return merged;
      } catch (err) {
        console.warn('Failed to parse saved state from ' + source, err);
      }
    }

    return this.getDefaultState();
  }

  saveState() {
    const serialized = JSON.stringify(this.state);
    const nowIso = new Date().toISOString();
    this.state.lastSavedTimestamp = nowIso;

    // 1. Save Primary Key
    try {
      localStorage.setItem(STORAGE_KEY, serialized);
    } catch (e) {
      console.warn('Failed to save to primary localStorage:', e);
    }

    // 2. Save Secondary Backup Key
    try {
      const backupData = {
        version: this.state.version,
        lastSavedTimestamp: nowIso,
        user: this.state.user,
        plan: this.state.plan,
        dailyLogs: this.state.dailyLogs,
        lastCompletedWorkout: this.state.lastCompletedWorkout,
        xp: this.state.xp,
        level: this.state.level,
        currentStreak: this.state.currentStreak,
        longestStreak: this.state.longestStreak
      };
      localStorage.setItem(BACKUP_STORAGE_KEY, JSON.stringify(backupData));
    } catch (e) {}

    // 3. Save Session Storage
    try {
      sessionStorage.setItem(SESSION_KEY, serialized);
    } catch (e) {}

    // 4. Save Dedicated Last Workout Key if available
    if (this.state.lastCompletedWorkout) {
      try {
        localStorage.setItem(LAST_WORKOUT_KEY, JSON.stringify(this.state.lastCompletedWorkout));
      } catch (e) {}
    }

    // 5. Asynchronously Save to IndexedDB
    this.syncToIndexedDb(this.state);
  }

  initIndexedDbSync() {
    if (!window.indexedDB) return;
    try {
      const request = indexedDB.open('motionmint_offline_db', 1);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('app_state')) {
          db.createObjectStore('app_state', { keyPath: 'id' });
        }
      };
    } catch (e) {
      console.warn('IndexedDB initialization skipped:', e);
    }
  }

  syncToIndexedDb(stateData) {
    if (!window.indexedDB) return;
    try {
      const req = indexedDB.open('motionmint_offline_db', 1);
      req.onsuccess = (e) => {
        const db = e.target.result;
        if (db.objectStoreNames.contains('app_state')) {
          const tx = db.transaction('app_state', 'readwrite');
          const store = tx.objectStore('app_state');
          store.put({ id: 'current_state', ...stateData, lastSaved: Date.now() });
        }
      };
    } catch (e) {}
  }

  getTodayDateString() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(changeType = 'state_change') {
    this.saveState();
    this.listeners.forEach(fn => {
      try {
        fn(this.state, changeType);
      } catch (err) {
        console.error('Listener error in StateStore:', err);
      }
    });
  }

  getState() {
    return this.state;
  }

  updateState(updater, changeType = 'update') {
    if (typeof updater === 'function') {
      this.state = updater(this.state);
    } else {
      this.state = { ...this.state, ...updater };
    }
    this.notify(changeType);
  }

  // --- Convenience Action Helpers ---

  setSelectedDate(dateStr) {
    this.updateState(state => ({ ...state, selectedDate: dateStr }), 'date_change');
  }

  getDailyLog(dateStr = this.state.selectedDate) {
    if (!this.state.dailyLogs[dateStr]) {
      return {
        habits: {},
        workout: null,
        notes: '',
        waterMl: 0
      };
    }
    return this.state.dailyLogs[dateStr];
  }

  toggleHabit(habitId, dateStr = this.state.selectedDate) {
    const currentLog = this.getDailyLog(dateStr);
    const isCompleted = !currentLog.habits[habitId];

    const updatedHabits = {
      ...currentLog.habits,
      [habitId]: isCompleted
    };

    let xpDelta = isCompleted ? 25 : -25;

    this.updateState(state => {
      const logs = {
        ...state.dailyLogs,
        [dateStr]: {
          ...currentLog,
          habits: updatedHabits
        }
      };

      // Recalculate XP & Level
      const newXp = Math.max(0, state.xp + xpDelta);
      const newLevel = Math.floor(newXp / 250) + 1;

      // Update streaks
      const streakInfo = this.calculateStreaks(logs);

      return {
        ...state,
        dailyLogs: logs,
        xp: newXp,
        level: newLevel,
        currentStreak: streakInfo.current,
        longestStreak: Math.max(state.longestStreak, streakInfo.longest)
      };
    }, 'habit_toggle');

    return isCompleted;
  }

  calculateStreaks(logs) {
    const today = new Date();
    let current = 0;
    let longest = 0;
    let checkDate = new Date(today);

    // Check today or yesterday as start
    for (let i = 0; i < 365; i++) {
      const yyyy = checkDate.getFullYear();
      const mm = String(checkDate.getMonth() + 1).padStart(2, '0');
      const dd = String(checkDate.getDate()).padStart(2, '0');
      const key = `${yyyy}-${mm}-${dd}`;

      const log = logs[key];
      const hasCompletedHabits = log && log.habits && Object.values(log.habits).some(v => v === true);
      const hasWorkout = log && log.workout && log.workout.completed;

      if (hasCompletedHabits || hasWorkout) {
        current++;
      } else if (i === 0) {
        // Today might not be finished yet, so check yesterday
      } else {
        break;
      }
      checkDate.setDate(checkDate.getDate() - 1);
    }

    return { current: Math.max(1, current), longest: Math.max(1, current, this.state.longestStreak) };
  }

  logWorkoutCompletion(workoutData, dateStr = this.state.selectedDate) {
    const currentLog = this.getDailyLog(dateStr);
    const xpBonus = workoutData.isMed ? 60 : 100;
    const completedAt = new Date().toISOString();

    const fullWorkoutRecord = {
      ...workoutData,
      id: `workout_${Date.now()}`,
      date: dateStr,
      completed: true,
      completedAt
    };

    this.updateState(state => {
      const logs = {
        ...state.dailyLogs,
        [dateStr]: {
          ...currentLog,
          workout: fullWorkoutRecord
        }
      };

      const newXp = state.xp + xpBonus;
      const newLevel = Math.floor(newXp / 250) + 1;
      const streakInfo = this.calculateStreaks(logs);

      return {
        ...state,
        dailyLogs: logs,
        lastCompletedWorkout: fullWorkoutRecord,
        xp: newXp,
        level: newLevel,
        currentStreak: streakInfo.current,
        longestStreak: Math.max(state.longestStreak, streakInfo.longest),
        activeWorkoutSession: null
      };
    }, 'workout_completed');
  }

  addCustomHabit(habit) {
    const habitId = `custom_${Date.now()}`;
    const newHabit = {
      ...habit,
      id: habitId,
      xp: 30,
      isCustom: true
    };

    this.updateState(state => {
      const plan = state.plan ? {
        ...state.plan,
        habits: [...state.plan.habits, newHabit]
      } : null;

      return {
        ...state,
        customHabits: [...state.customHabits, newHabit],
        plan
      };
    }, 'habit_added');

    return newHabit;
  }

  resetAllData() {
    this.state = this.getDefaultState();
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(BACKUP_STORAGE_KEY);
      localStorage.removeItem(LAST_WORKOUT_KEY);
      sessionStorage.removeItem(SESSION_KEY);
    } catch (e) {}
    this.notify('reset');
  }

  exportBackupJson() {
    return JSON.stringify(this.state, null, 2);
  }

  importBackupJson(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.version) {
        this.state = parsed;
        this.notify('imported');
        return true;
      }
    } catch (e) {
      console.error('Failed to import JSON data:', e);
    }
    return false;
  }
}

export const store = new StateStore();
