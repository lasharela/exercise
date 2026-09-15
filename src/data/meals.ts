import type { Weekday } from '../lib/program'

export type MealOption = {
  id: string
  name: string
  mains: string[]  // max 3 main ingredients, with rough quantities
  taste: string     // spices / sweetener / flavor additions (free text)
  calories: number
  protein: number
  fat: number
  carbs: number
}

export const BREAKFASTS: Record<string, MealOption> = {
  b1: {
    id: 'b1',
    name: 'Tofu Cocoa Shake',
    mains: ['Silken tofu (1 box)', 'Protein powder (2 scoops)', 'Banana (2)'],
    taste: 'Cocoa powder, peanut butter, maple syrup — blend all',
    calories: 1420, protein: 83, fat: 55, carbs: 160,
  },
  b2: {
    id: 'b2',
    name: 'Overnight Oats',
    mains: ['Oats (1½ cups)', 'Greek yogurt (1½ cups)', 'Protein powder (1 scoop)'],
    taste: 'Peanut butter, maple syrup, cinnamon — mix at night',
    calories: 1450, protein: 84, fat: 55, carbs: 160,
  },
  b3: {
    id: 'b3',
    name: 'Greek Yogurt Bowl',
    mains: ['Greek yogurt (2½ cups)', 'Raw oats (½ cup)', 'Banana (1)'],
    taste: 'Honey, handful of nuts, berries',
    calories: 1450, protein: 80, fat: 55, carbs: 165,
  },
  b4: {
    id: 'b4',
    name: 'Buckwheat & Cottage Cheese',
    mains: ['Buckwheat, cooked (2 cups)', 'Cottage cheese (2 cups)', 'Banana (1)'],
    taste: 'Honey, handful of walnuts',
    calories: 1400, protein: 80, fat: 50, carbs: 165,
  },
}

export const DINNERS: Record<string, MealOption> = {
  d1: {
    id: 'd1',
    name: 'Dal & Rice',
    mains: ['Red lentils, cooked (2½ cups)', 'Rice, cooked (1½ cups)', 'Cottage cheese (½ cup)'],
    taste: 'Ghee, cumin, ginger, turmeric',
    calories: 1390, protein: 75, fat: 38, carbs: 186,
  },
  d2: {
    id: 'd2',
    name: 'Chickpeas & Buckwheat',
    mains: ['Chickpeas, cooked (2½ cups)', 'Buckwheat, cooked (1½ cups)', 'Cottage cheese (¾ cup)'],
    taste: 'Olive oil, cumin, smoked paprika',
    calories: 1430, protein: 76, fat: 50, carbs: 176,
  },
  d3: {
    id: 'd3',
    name: 'Beans & Potato',
    mains: ['Beans, boiled (2½ cups)', 'Potatoes, boiled (2 cups)', 'Cottage cheese (¾ cup)'],
    taste: 'Ghee/oil, cumin, black pepper',
    calories: 1400, protein: 75, fat: 40, carbs: 190,
  },
  d4: {
    id: 'd4',
    name: 'Smart Ground & Carrot',
    mains: ['Lightlife Smart Ground (~350g)', 'Carrot (300g)', 'Rice, cooked (2 cups)'],
    taste: 'Olive oil, cumin, smoked paprika, salt, lemon',
    calories: 1458, protein: 82, fat: 50, carbs: 166,
  },
  d5: {
    id: 'd5',
    name: 'Pasta & Smart Ground',
    mains: ['Whole wheat pasta, cooked (3 cups)', 'Lightlife Smart Ground (~250g)', 'Nutritional yeast (3 tbsp)'],
    taste: 'Olive oil, dried basil/oregano, handful of cashews',
    calories: 1400, protein: 86, fat: 52, carbs: 152,
  },
}

// Fixed, repeating weekly plan (Mon-Sun). Keyed by Weekday (0=Sun..6=Sat, JS getDay()).
export const MEALS_SCHEDULE: Record<Weekday, { breakfast: string; dinner: string }> = {
  1: { breakfast: 'b1', dinner: 'd4' }, // Mon
  2: { breakfast: 'b2', dinner: 'd1' }, // Tue
  3: { breakfast: 'b3', dinner: 'd2' }, // Wed
  4: { breakfast: 'b4', dinner: 'd3' }, // Thu
  5: { breakfast: 'b1', dinner: 'd5' }, // Fri
  6: { breakfast: 'b2', dinner: 'd4' }, // Sat
  0: { breakfast: 'b3', dinner: 'd5' }, // Sun
}

// Daily macro target, split across the 2 meals.
export const DAILY_TARGET = { calories: 2900, protein: 160, fat: 100, carbs: 360 }
