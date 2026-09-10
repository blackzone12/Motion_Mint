// Foods & Nutrition Meal Planner Component for MotionMint
// Renders daily meals, macro targets, whole foods library, and food swap alternatives

import { FOOD_CATEGORIES, FOOD_SWAPS } from './data/foods.js';
import { store } from './state.js';
import { sound } from './sound.js';

export class FoodsManager {
  constructor(containerEl) {
    this.container = containerEl;
  }

  render() {
    if (!this.container) return;

    const state = store.getState();
    const plan = state.plan;
    const nutrition = plan?.nutrition;
    const meals = plan?.dailyMeals || [];

    this.container.innerHTML = `
      <div class="foods-view-wrap">
        <div class="foods-header glass-panel">
          <div>
            <h2 class="view-title">🥗 Daily Meal Blueprint & Fueling Center</h2>
            <p class="view-subtitle">Precision portion sizes and whole foods calculated for your exact weight and timeline.</p>
          </div>

          <div class="target-macros-strip">
            <div class="macro-badge">
              <span class="m-name">Calories</span>
              <span class="m-val">${nutrition?.targetCalories || 2100} kcal</span>
            </div>
            <div class="macro-badge protein">
              <span class="m-name">Protein</span>
              <span class="m-val">${nutrition?.protein || 160}g</span>
            </div>
            <div class="macro-badge carbs">
              <span class="m-name">Carbs</span>
              <span class="m-val">${nutrition?.carbs || 210}g</span>
            </div>
            <div class="macro-badge fats">
              <span class="m-name">Fats</span>
              <span class="m-val">${nutrition?.fats || 58}g</span>
            </div>
          </div>
        </div>

        <!-- 4 Daily Meals Schedule -->
        <div class="meals-schedule-container">
          <h3 class="section-title">🍽️ Your 4 Daily Meal Windows</h3>
          
          ${meals.map(meal => `
            <div class="meal-card glass-panel">
              <div class="meal-top-row">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                  <span class="meal-time-pill">⏰ ${meal.timeWindow}</span>
                  <h4 class="meal-title">${meal.name}</h4>
                </div>
                <div class="meal-macros-mini">
                  <span>${meal.targetCalories} kcal</span> • 
                  <span style="color: var(--accent-emerald)">${meal.protein}g Protein</span> • 
                  <span style="color: var(--accent-cyan)">${meal.carbs}g Carbs</span> • 
                  <span style="color: var(--accent-amber)">${meal.fats}g Fat</span>
                </div>
              </div>

              <div class="meal-option-box">
                <div class="meal-option-title">${meal.primaryOption.title}</div>
                <ul class="meal-ingredients-list">
                  ${meal.primaryOption.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
                <div class="meal-behavior-habit">
                  ${meal.primaryOption.behavioralHabit}
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- High Impact Food Swaps -->
        <div class="swaps-card glass-panel">
          <h3 class="section-title">🔄 High-Impact Diet Upgrades (Cravings Swaps)</h3>
          <div class="swaps-grid">
            ${FOOD_SWAPS.map(swap => `
              <div class="swap-box">
                <span class="swap-bad">❌ ${swap.original}</span>
                <span class="swap-good">✅ ${swap.swap}</span>
                <span class="swap-benefit">💡 ${swap.benefit}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Whole Foods Library Database -->
        <div class="food-categories-section">
          <h3 class="section-title">🥑 Recommended Wholesome Foods Library</h3>
          <div class="food-categories-grid">
            ${Object.values(FOOD_CATEGORIES).map(cat => `
              <div class="food-cat-card glass-panel">
                <div class="cat-header">
                  <span>${cat.icon}</span>
                  <h4 style="color: ${cat.color}">${cat.name}</h4>
                </div>
                <div class="cat-food-list">
                  ${cat.items.map(item => `
                    <div class="food-item-row">
                      <div class="food-name-portion">
                        <span>${item.name}</span>
                        <span style="color: var(--accent-cyan)">${item.portion}</span>
                      </div>
                      <span class="food-tip-txt">${item.tip}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
}
