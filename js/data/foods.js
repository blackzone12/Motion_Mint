// Built-in Food & Nutrition Blueprint Database for MotionMint
// Categorized by macronutrients, glycemic index, and meal schedule anchors

export const FOOD_CATEGORIES = {
  PROTEINS: {
    id: 'proteins',
    name: 'Lean & High-Bioavailability Proteins',
    color: '#10b981',
    icon: '🥩',
    items: [
      { name: 'Boneless Skinless Chicken Breast', portion: '150-200g', protein: '31g/100g', cals: 165, tip: 'High leucine for muscle protein synthesis.' },
      { name: 'Whole Eggs & Liquid Egg Whites', portion: '2 Whole + 3 Whites', protein: '24g total', cals: 180, tip: 'Rich in choline and healthy phospholipids.' },
      { name: '0% Plain Greek Yogurt / Skyr', portion: '200g', protein: '20g', cals: 120, tip: 'Slow-digesting casein + gut probiotics.' },
      { name: 'Wild Salmon / Canned Light Tuna', portion: '150g', protein: '30g', cals: 200, tip: 'Anti-inflammatory Omega-3 fatty acids.' },
      { name: 'Extra Firm Tofu / Low-Fat Paneer', portion: '180g', protein: '22g', cals: 160, tip: 'Plant-based complete amino acid profile.' },
      { name: 'Whey / Plant Isolate Protein Powder', portion: '1 Scoop (30g)', protein: '25g', cals: 120, tip: 'Instant post-workout amino acid delivery.' },
      { name: 'Low-Fat Cottage Cheese', portion: '150g', protein: '18g', cals: 110, tip: 'Ideal evening wind-down slow release protein.' }
    ]
  },
  CARBS: {
    id: 'carbs',
    name: 'Complex & High-Fiber Energy Carbs',
    color: '#06b6d4',
    icon: '🍚',
    items: [
      { name: 'Rolled Oats / Steel Cut Oats', portion: '50-80g dry', carbs: '35g', cals: 190, tip: 'Beta-glucan soluble fiber for steady glucose.' },
      { name: 'Sweet Potatoes / Roasted Yams', portion: '180-220g cooked', carbs: '40g', cals: 180, tip: 'Rich in potassium and Vitamin A for muscle pumps.' },
      { name: 'Brown Rice / Steamed Basmati Rice', portion: '150g cooked', carbs: '38g', cals: 180, tip: 'Clean glycemic glycogen replenisher.' },
      { name: 'Quinoa / Whole Grain Sourdough', portion: '150g cooked / 2 slices', carbs: '34g', cals: 170, tip: 'High magnesium and prebiotic gut fuel.' },
      { name: 'Bananas & Wild Blueberries', portion: '1 Medium / 100g berries', carbs: '25g', cals: 100, tip: 'Natural fructose and high anthocyanin antioxidants.' }
    ]
  },
  FATS: {
    id: 'fats',
    name: 'Hormone-Optimizing Healthy Fats',
    color: '#f59e0b',
    icon: '🥑',
    items: [
      { name: 'Fresh Hass Avocado', portion: '1/2 Avocado (75g)', fats: '15g', cals: 160, tip: 'Monounsaturated fats for testosterone & satiety.' },
      { name: 'Raw Almonds & Walnuts', portion: '25-30g (Handful)', fats: '16g', cals: 170, tip: 'Vitamin E and neuroprotective fats.' },
      { name: 'Extra Virgin Cold-Pressed Olive Oil', portion: '1 Tbsp (14ml)', fats: '14g', cals: 120, tip: 'Polyphenol-rich cardiovascular protector.' },
      { name: 'All-Natural Peanut / Almond Butter', portion: '1.5 Tbsp (25g)', fats: '13g', cals: 150, tip: 'Dense sustained energy source.' },
      { name: 'Chia Seeds / Ground Flaxseeds', portion: '1.5 Tbsp (15g)', fats: '6g', cals: 75, tip: 'Plant Omega-3 ALA and soluble fiber bulk.' }
    ]
  },
  VEGGIES: {
    id: 'veggies',
    name: 'Micronutrient & Satiety Veggies (Unlimited)',
    color: '#8b5cf6',
    icon: '🥦',
    items: [
      { name: 'Steamed Broccoli & Cauliflower', portion: '150-200g', fiber: '5g', cals: 50, tip: 'Sulforaphane compounds for cellular health.' },
      { name: 'Baby Spinach & Mixed Salad Greens', portion: '2 Large Handfuls', fiber: '3g', cals: 25, tip: 'Nitrates for enhanced blood flow and endurance.' },
      { name: 'Crisp Cucumbers & Bell Peppers', portion: '1 Cup Sliced', fiber: '3g', cals: 30, tip: 'High water volume to crush hunger signals.' },
      { name: 'Grilled Asparagus & Zucchini', portion: '150g', fiber: '4g', cals: 35, tip: 'Natural mild diuretic for reduced water bloating.' }
    ]
  }
};

export const FOOD_SWAPS = [
  { original: 'Sugary morning cereal & sweet latte', swap: 'Rolled Oats + Scoop of Protein + Black Coffee / Unsweetened Almond Milk', benefit: '-250 kcal, +25g protein, zero 11 AM energy crash' },
  { original: 'White bread sandwich with mayo & crisps', swap: 'Whole grain sourdough with turkey/chicken, avocado, and crunchy cucumber slices', benefit: '-300 kcal, sustained 4-hour focus' },
  { original: 'Late-night cookies or ice cream', swap: 'Thick Greek yogurt blended with frozen berries, pinch of cinnamon & herbal tea', benefit: '-400 kcal, +20g slow casein protein for muscle repair' },
  { original: 'Commercial fizzy soda / fruit juices', swap: 'Sparkling mineral water with squeezed fresh lemon/lime & mint leaves', benefit: '-180 kcal of empty liquid sugar eliminated' }
];

export class MealPlanSynthesizer {
  static generateDailyMealSchedule({ targetCalories, proteinGrams, carbsGrams, fatGrams, goalId }) {
    // Break calories across 4 daily meals
    const isFatLoss = goalId === 'fat_loss';

    const meals = [
      {
        id: 'meal_1',
        name: 'Meal 1: The High-Protein Ignition Breakfast',
        timeWindow: '7:30 AM - 9:00 AM',
        targetCalories: Math.round(targetCalories * 0.28),
        protein: Math.round(proteinGrams * 0.30),
        carbs: Math.round(carbsGrams * 0.25),
        fats: Math.round(fatGrams * 0.30),
        primaryOption: {
          title: isFatLoss ? '3-Egg Power Omelette & Oatmeal Bowl' : 'Muscle Fuel Oats & Whole Eggs Feast',
          ingredients: [
            '2 Whole Eggs + 3 Liquid Egg Whites (scrambled with baby spinach)',
            '50g Rolled Oats cooked with water + 1/2 scoop Whey Protein',
            'Handful of Fresh Blueberries or sliced Strawberries',
            '500ml Cold Water + Black Coffee / Green Tea'
          ],
          behavioralHabit: '⚓ Consume 30g protein before your first cup of coffee to stabilize morning ghrelin.'
        }
      },
      {
        id: 'meal_2',
        name: 'Meal 2: The Metabolic Clean Energy Lunch',
        timeWindow: '12:30 PM - 1:30 PM',
        targetCalories: Math.round(targetCalories * 0.32),
        protein: Math.round(proteinGrams * 0.35),
        carbs: Math.round(carbsGrams * 0.35),
        fats: Math.round(fatGrams * 0.25),
        primaryOption: {
          title: 'Flame-Grilled Chicken / Tofu & Sweet Potato Bowl',
          ingredients: [
            '180g Grilled Chicken Breast or 200g Seared Extra-Firm Tofu',
            '150g Baked Sweet Potato or 1 Cup Steamed Brown Rice',
            '2 Cups Steamed Broccoli, Green Beans & Bell Peppers',
            '1 Teaspoon Extra Virgin Olive Oil drizzle or 1/4 Avocado'
          ],
          behavioralHabit: '⚓ Drink 400ml water 15 minutes before eating. Take a 10-minute walk immediately after.'
        }
      },
      {
        id: 'meal_3',
        name: 'Meal 3: Mid-Day Energy & Pre-Workout Refuel',
        timeWindow: '4:00 PM - 5:00 PM',
        targetCalories: Math.round(targetCalories * 0.15),
        protein: Math.round(proteinGrams * 0.15),
        carbs: Math.round(carbsGrams * 0.20),
        fats: Math.round(fatGrams * 0.15),
        primaryOption: {
          title: 'Greek Yogurt & Almond Crunch Parfait',
          ingredients: [
            '170g 0% Plain Greek Yogurt / Skyr',
            '1 Small Banana or Apple sliced',
            '15g Raw Almonds or 1 Tbsp All-Natural Peanut Butter',
            'Pinch of ground cinnamon (blunts blood sugar spike)'
          ],
          behavioralHabit: '⚓ Replaces the afternoon sugary snack vending machine habit.'
        }
      },
      {
        id: 'meal_4',
        name: 'Meal 4: The Recovery & Sleep-Optimizing Dinner',
        timeWindow: '7:00 PM - 8:30 PM',
        targetCalories: Math.round(targetCalories * 0.25),
        protein: Math.round(proteinGrams * 0.20),
        carbs: Math.round(carbsGrams * 0.20),
        fats: Math.round(fatGrams * 0.30),
        primaryOption: {
          title: 'Wild Salmon / Lean Beef & Roasted Veggie Medley',
          ingredients: [
            '160g Baked Salmon Fillet or 150g Lean Turkey/Beef Mince',
            '1 Cup Roasted Zucchini, Asparagus & Mushrooms',
            '100g Steamed Quinoa or Roasted Butternut Squash',
            'Large Mixed Green Salad with lemon juice & sea salt'
          ],
          behavioralHabit: '⚓ Kitchen Curfew: Finish eating 2.5 hours before bedtime for optimal deep sleep GH release.'
        }
      }
    ];

    return meals;
  }
}
