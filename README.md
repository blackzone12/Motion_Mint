# 🌿 MotionMint — Habit-Driven Body & Fitness Transformation OS

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Pure Vanilla JS](https://img.shields.io/badge/Stack-Vanilla%20ES6%20%7C%20HTML5%20%7C%20CSS3-cyan.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Offline First](https://img.shields.io/badge/Privacy-100%25%20Offline%20%28No%20Login%29-violet.svg)](#offline-first-architecture)
[![Test Suite](https://img.shields.io/badge/Tests-45%2F45%20Passing%20%28100%25%29-34d399.svg)](tests/runner.html)

> **MotionMint** is an intelligent, habit-first body transformation operating system. It bridges the critical gap left by traditional 30-day crash fitness apps by integrating behavioral psychology, 1,000+ biomechanically indexed exercises, tailored metabolic nutrition, and offline persistence.

---

## 💡 The Problem & The Solution

| The Traditional Fitness App Trap | The MotionMint Architecture |
| :--- | :--- |
| **Brutal, cookie-cutter 30-day routines** that cause injury, burnout, and rebound. | **Tailored biomechanics:** Different Body Problem == Different Exercises. |
| **Zero behavioral scaffolding:** Miss one day and motivation collapses. | **Atomic Habit Stacks:** Minimum Effective Dose (MED) backups & identity loops. |
| **Forced accounts & subscriptions:** Paywalls and cloud data harvesting. | **100% Offline & Private:** Zero login required; stored locally in your browser. |
| **Fixed rigid workouts:** Monotonous movements with high dropout rates. | **5 Exercises / 3 Sets Daily:** 4 core anchor exercises + 1 rotating exercise every single day. |

---

## ✨ Key Features

### 1. 🎯 Diagnostic Onboarding & Biometric Engine
- Evaluates starting weight, target weight, height, age, gender, timeframe, and activity level.
- Calculates **BMR & TDEE** via the Mifflin-St Jeor equation with strict metabolic safety floors (≥1,200 kcal for females, ≥1,500 kcal for males).
- Performs automated **Feasibility & Crash Risk Reality Checks** to protect users against unsustainable caloric deficits.

### 2. 🏋️ Massive 1,000+ Exercise Database & Prescription Engine
- **Biomechanically Indexed Library**: Covers Joint-Friendly, Posture Correction, Dumbbells, Barbells, Kettlebells, Selectorized Machines, Bands, and Bodyweight movements.
- **Rule of Movement Prescription**:
  - **5 Exercises Per Day**: Every active workout is curated with exactly 5 exercises.
  - **3 Sets Per Exercise**: Strict 3-set periodization across all movements.
  - **4-Anchor + 1-Rotating Progression**: Keeps 4 core anchor exercises identical across consecutive days for progressive overload while dynamically rotating 1 exercise every day (finishers, joint armor, anti-rotation, or accessories).
- **Contraindication Shield**: Automatically filters out contraindicated exercises for users with diagnosed knee pain, lower back disc issues, shoulder impingement, or anterior pelvic tilt.

### 3. ✨ Out-of-the-Box Custom Goal Natural Language Processing
- Natural language text box allowing users to input unconventional physical goals (e.g., *"Huge upper chest and shoulders in 2 months with knee stiffness"*).
- Extracts problem constraints, target muscle focus areas, and timelines on the fly.

### 4. 🥗 Metabolic Nutrition & Whole-Food Swaps
- Structured 4-window daily meal blueprints (Breakfast, Lunch, Afternoon Fuel, Dinner) calibrated to target calories, protein, carbs, and fats.
- Interactive whole-food swap alternatives for flexible dieting.

### 5. 📜 100% Offline Multi-Engine Storage (No Login Required)
- Keeps all workout history, logged weights, completed sets, XP levels, and habit streaks permanently inside your browser's local engine (**Chrome, Brave, Edge, Safari, Firefox**).
- Includes one-click **JSON Backup Export & Import** for seamless data portability across devices.

### 6. 📄 7-Page Transformation Master Blueprint PDF Generator
Generates a complete, print-ready 7-page transformation manual formatted to strict specifications:
- **Page 1**: Introduction, Objective & Behavioral Friction Antidotes
- **Page 2**: Biometric Milestones, Feasibility Timeline & Progress Markers
- **Page 3**: Basic Tier Foundation Exercises
- **Page 4**: Intermediate Tier Hypertrophy Exercises
- **Page 5**: Advanced Tier Conditioning Exercises
- **Page 6**: Daily Whole-Food Meal Schedule & Nutritional Swaps
- **Page 7**: Transformation Contract & Closing Commitment

### 7. 🧪 Built-in Diagnostic Test Suite
- Comprehensive automated test runner with **45 unit, integration, and E2E resilience tests** covering mathematical models, NLP parsing, storage failure recovery, and cross-platform layouts.

---

## 🛠️ Technology Stack

- **Core**: Semantic HTML5, Pure Vanilla JavaScript (ES6 Modules)
- **Styling**: Vanilla CSS3 with CSS Custom Properties, Glassmorphism, and Fluid Responsive Grid
- **Audio Engine**: Web Audio API (Procedural chimes and sound FX without external MP3 files)
- **Document Engine**: Custom CSS `@media print` multi-page PDF engine
- **Zero External Runtime Dependencies**: Instant loading with zero build steps or bundlers required.

---

## 🚀 Quick Start & Local Setup

### Option 1: Python HTTP Server
```bash
# Clone the repository
git clone https://github.com/your-username/MotionMint.git
cd MotionMint

# Start a local web server (Python 3)
python -m http.server 8080
```
Open your browser and navigate to: `http://localhost:8080`

### Option 2: Node.js (npx serve)
```bash
npx serve .
```

### Option 3: VS Code Live Server
Right-click `index.html` inside VS Code and select **"Open with Live Server"**.

---

## 🧪 Running the Test Suite

MotionMint includes an in-browser automated test runner:
1. Open `http://localhost:8080/tests/runner.html` in your browser.
2. The runner will automatically execute all **45 test specifications**:
   - ✅ BMR & TDEE Calculations & Safety Floors
   - ✅ NLP Custom Goal Parsing & Problem Detection
   - ✅ 5-Exercise / 3-Set Daily Routine & Rotation Architecture
   - ✅ 1,000+ Exercise Database Verification & Zero Collision IDs
   - ✅ Offline Multi-Engine Persistence & Corrupt JSON Resilience
   - ✅ 7-Page Blueprint PDF Document Integrity

---

## 📂 Project Structure

```
MotionMint/
├── index.html                   # Master Single-Page Application Entry
├── README.md                    # Project Documentation
├── LICENSE                      # MIT Open Source License
├── css/
│   ├── main.css                 # Design System Tokens, Theme & Scrollbars
│   ├── components.css           # Buttons, Modal Dialogs & Form Inputs
│   ├── onboarding.css           # Diagnostic Wizard Overlay Styles
│   ├── dashboard.css            # Activity Rings & Dashboard Command Center
│   ├── workout.css              # Live Workout Player & Timer Overlay
│   ├── sessions.css             # Workout Sessions & History Styles
│   ├── foods.css                # Meal Plan & Nutrition Styles
│   ├── roadmap.css              # Multi-Phase Periodization Styles
│   ├── analytics.css            # Heatmaps, Progress Charts & Coach Styles
│   └── pdf.css                  # 7-Page PDF Print Preview & Print Styles
├── js/
│   ├── app.js                   # Master Application Controller & Navigation
│   ├── state.js                 # LocalStorage State Store & Event Bus
│   ├── generator.js             # Plan, Schedule & Periodization Generator
│   ├── workout-player.js        # Interactive Live Workout Session Engine
│   ├── habit-manager.js         # Atomic Habit Stacking & Check-off Logic
│   ├── sessions-manager.js      # Session Records & History Controller
│   ├── foods-manager.js         # Daily Nutrition & Food Swap Controller
│   ├── coach.js                 # Behavioral Reset Coach & Emergency Protocol
│   ├── analytics.js             # Heatmap & Activity Trends Canvas
│   ├── pdf-generator.js         # 7-Page Master Blueprint PDF Generator
│   ├── sound.js                 # Web Audio API Sound Synthesizer
│   └── data/
│       ├── exercises.js         # 1,000+ Exercise Database & Prescription Engine
│       ├── habits.js            # Atomic Habit Library & Templates
│       ├── foods.js             # Whole-Food Database & Meal Synthesizer
│       ├── presets.js           # Goals, Obstacle Antidotes & Timeframes
│       └── custom-goal-engine.js# NLP Custom Goal Extraction Engine
└── tests/
    ├── runner.html              # Interactive Automated Test Suite GUI
    └── test-suite.js            # 45 Comprehensive Unit & Integration Tests
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

Copyright (c) 2026 MotionMint Contributors.
