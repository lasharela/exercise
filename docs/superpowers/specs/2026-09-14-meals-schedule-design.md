# Meals — Weekly Recipe Schedule

**Date:** 2026-09-14
**Status:** Approved (recipes and weekly calendar finalized in chat with user; execution authorized including push)

## Goal

Add a "Meals" section to the exercise PWA showing a fixed, repeating weekly (Mon–Sun)
2-meal sattvic diet plan (breakfast + dinner) with calories/macros, so the user always
knows what to eat today and what to prep for tomorrow. Diet constraints: no meat, egg,
mushroom, onion, or garlic. Daily targets: ~2900 kcal / 160g protein / 100g fat /
350–370g carbs, split across 2 meals (~1450 kcal / 80g protein each). Purely a static
reference — no logging, no completion tracking, no backend changes.

## Data model

New file `src/data/meals.ts`, following the existing `WEEKLY_SCHEDULE` pattern in
`src/lib/program.ts` (keyed by `Weekday` from `program.ts`, `0=Sun..6=Sat`, JS `getDay()`
convention):

```ts
import type { Weekday } from '../lib/program'

export type MealOption = {
  id: string
  name: string
  mains: string[]   // max 3 main ingredients, with rough quantities
  taste: string      // spices / sweetener / flavor additions (free text)
  calories: number
  protein: number
  fat: number
  carbs: number
}

export const BREAKFASTS: Record<string, MealOption>  // keys: b1..b4
export const DINNERS: Record<string, MealOption>      // keys: d1..d5

export const MEALS_SCHEDULE: Record<Weekday, { breakfast: string; dinner: string }>
```

### Recipes

**Breakfasts**

| id | name | mains | taste | kcal | P | F | C |
|---|---|---|---|---|---|---|---|
| b1 | Tofu Cocoa Shake | Silken tofu (1 box), Protein powder (2 scoops), Banana (2) | Cocoa powder, peanut butter, maple syrup — blend all | 1420 | 83 | 55 | 160 |
| b2 | Overnight Oats | Oats (1½ cups), Greek yogurt (1½ cups), Protein powder (1 scoop) | Peanut butter, maple syrup, cinnamon — mix at night | 1450 | 84 | 55 | 160 |
| b3 | Greek Yogurt Bowl | Greek yogurt (2½ cups), Raw oats (½ cup), Banana (1) | Honey, handful of nuts, berries | 1450 | 80 | 55 | 165 |
| b4 | Buckwheat & Cottage Cheese | Buckwheat, cooked (2 cups), Cottage cheese (2 cups), Banana (1) | Honey, handful of walnuts | 1400 | 80 | 50 | 165 |

**Dinners**

| id | name | mains | taste | kcal | P | F | C |
|---|---|---|---|---|---|---|---|
| d1 | Dal & Rice | Red lentils, cooked (2½ cups), Rice, cooked (1½ cups), Cottage cheese (½ cup) | Ghee, cumin, ginger, turmeric | 1390 | 75 | 38 | 186 |
| d2 | Chickpeas & Buckwheat | Chickpeas, cooked (2½ cups), Buckwheat, cooked (1½ cups), Cottage cheese (¾ cup) | Olive oil, cumin, smoked paprika | 1430 | 76 | 50 | 176 |
| d3 | Beans & Potato | Beans, boiled (2½ cups), Potatoes, boiled (2 cups), Cottage cheese (¾ cup) | Ghee/oil, cumin, black pepper | 1400 | 75 | 40 | 190 |
| d4 | Smart Ground & Carrot | Lightlife Smart Ground (~350g), Carrot (300g), Rice, cooked (2 cups) | Olive oil, cumin, smoked paprika, salt, lemon | 1458 | 82 | 50 | 166 |
| d5 | Pasta & Smart Ground | Whole wheat pasta, cooked (3 cups), Lightlife Smart Ground (~250g), Nutritional yeast (3 tbsp) | Olive oil, dried basil/oregano, handful of cashews | 1400 | 86 | 52 | 152 |

Any vegetable may be added freely to any dinner, unmeasured — not counted in macros.

### Weekly calendar

| Weekday | Breakfast | Dinner |
|---|---|---|
| Mon | b1 | d4 |
| Tue | b2 | d1 |
| Wed | b3 | d2 |
| Thu | b4 | d3 |
| Fri | b1 | d5 |
| Sat | b2 | d4 |
| Sun | b3 | d5 |

## Page: `src/pages/Meals.tsx`

- **TODAY** section: today's breakfast + dinner cards (mains list, taste line, macros),
  plus a totals row (today's combined kcal/P/F/C vs the daily target 2900/160/100/360).
- **TOMORROW** section: tomorrow's `mains` only, as a flat prep/shopping checklist (no
  macros needed here — it's a "what do I need to buy/prep" list).
- **WEEK** section: compact 7-row table (Mon–Sun), showing breakfast + dinner names for
  the full week at a glance.
- Pure display component — no Appwrite calls, no local state beyond deriving
  today/tomorrow from `localDateISO()` (see `src/lib/date.ts`) the same way
  `Dashboard.tsx` derives `today`.
- Visual language matches the rest of the app: `bg-surface` cards, `border-border`,
  `rounded-xl`, existing color tokens (`text-dim`, `text-primary`, etc.) — no new design
  system.

## Route + navigation

- Add `<Route path="/meals" element={<Protected><Meals /></Protected>} />` to
  `src/App.tsx`, same pattern as `/weight`, `/settings`, etc.
- `src/pages/Dashboard.tsx`: add a nav entry below the existing weight/steps
  `grid-cols-2` row — a full-width `bg-surface` button, "🍽️ Meals" label, today's
  breakfast + dinner name as subtitle, `onClick={() => navigate('/meals')}`.

## Out of scope

- No macro logging/tracking, no in-app recipe editing, no UI for changing the calorie
  target (the planned 2900→2500 kcal/day drop later is a manual edit to `meals.ts`).
- No Appwrite schema/collection changes.
- No changes to existing workout scheduling logic.

## Testing

- `npm run build` (`tsc -b && vite build`) must pass.
- `npm run lint` must pass.
- `npm run test` (existing vitest suite) must still pass unchanged — this feature adds
  no new logic worth unit testing (pure static data + display).
