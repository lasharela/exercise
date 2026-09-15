import { localDateISO } from '../lib/date'
import type { Weekday } from '../lib/program'
import { BREAKFASTS, DINNERS, MEALS_SCHEDULE, DAILY_TARGET } from '../data/meals'
import type { MealOption } from '../data/meals'

const DAY_LABELS: Record<Weekday, string> = {
  1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat', 0: 'Sun',
}
// Display order Mon..Sun (Weekday values, 0=Sun last).
const WEEK_ORDER: Weekday[] = [1, 2, 3, 4, 5, 6, 0]

function weekdayOf(dateISO: string): Weekday {
  return new Date(dateISO + 'T00:00:00').getDay() as Weekday
}

function mealsFor(weekday: Weekday): { breakfast: MealOption; dinner: MealOption } {
  const { breakfast, dinner } = MEALS_SCHEDULE[weekday]
  return { breakfast: BREAKFASTS[breakfast], dinner: DINNERS[dinner] }
}

function MealCard({ meal, kind }: { meal: MealOption; kind: 'Breakfast' | 'Dinner' }) {
  return (
    <div className="bg-surface rounded-xl border border-border p-4 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-text-dim">{kind === 'Breakfast' ? '🌅' : '🌙'} {kind}</span>
        <span className="text-xs text-text-dim">{meal.calories} kcal</span>
      </div>
      <p className="font-semibold text-text">{meal.name}</p>
      <ul className="text-sm text-text-dim space-y-0.5">
        {meal.mains.map((m) => (
          <li key={m}>• {m}</li>
        ))}
      </ul>
      <p className="text-sm text-text-dim italic">{meal.taste}</p>
      <div className="flex gap-3 text-xs text-text-dim pt-1">
        <span>P {meal.protein}g</span>
        <span>F {meal.fat}g</span>
        <span>C {meal.carbs}g</span>
      </div>
    </div>
  )
}

export default function Meals() {
  const today = localDateISO()
  const tomorrowDate = new Date(today + 'T00:00:00')
  tomorrowDate.setDate(tomorrowDate.getDate() + 1)
  const tomorrow = localDateISO(tomorrowDate)

  const todayMeals = mealsFor(weekdayOf(today))
  const tomorrowMeals = mealsFor(weekdayOf(tomorrow))

  const totals = {
    calories: todayMeals.breakfast.calories + todayMeals.dinner.calories,
    protein: todayMeals.breakfast.protein + todayMeals.dinner.protein,
    fat: todayMeals.breakfast.fat + todayMeals.dinner.fat,
    carbs: todayMeals.breakfast.carbs + todayMeals.dinner.carbs,
  }

  const prepList = [...tomorrowMeals.breakfast.mains, ...tomorrowMeals.dinner.mains]

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      <h1 className="text-text font-bold text-2xl">Meals</h1>

      {/* TODAY */}
      <div>
        <h2 className="font-semibold text-text mb-3">TODAY</h2>
        <div className="space-y-3">
          <MealCard meal={todayMeals.breakfast} kind="Breakfast" />
          <MealCard meal={todayMeals.dinner} kind="Dinner" />

          <div className="bg-surface rounded-xl border border-border p-4">
            <p className="text-sm font-semibold text-text mb-2">Totals vs target</p>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div>
                <p className="text-text font-semibold">{totals.calories}</p>
                <p className="text-xs text-text-dim">/ {DAILY_TARGET.calories} kcal</p>
              </div>
              <div>
                <p className="text-text font-semibold">{totals.protein}g</p>
                <p className="text-xs text-text-dim">/ {DAILY_TARGET.protein}g P</p>
              </div>
              <div>
                <p className="text-text font-semibold">{totals.fat}g</p>
                <p className="text-xs text-text-dim">/ {DAILY_TARGET.fat}g F</p>
              </div>
              <div>
                <p className="text-text font-semibold">{totals.carbs}g</p>
                <p className="text-xs text-text-dim">/ {DAILY_TARGET.carbs}g C</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TOMORROW */}
      <div>
        <h2 className="font-semibold text-text mb-3">TOMORROW — prep</h2>
        <div className="bg-surface rounded-xl border border-border p-4">
          <p className="text-sm text-text-dim mb-2">
            {tomorrowMeals.breakfast.name} + {tomorrowMeals.dinner.name}
          </p>
          <ul className="space-y-1.5">
            {prepList.map((item, i) => (
              <li key={`${item}-${i}`} className="text-sm text-text flex items-start gap-2">
                <span className="text-text-dim">☐</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* WEEK */}
      <div>
        <h2 className="font-semibold text-text mb-3">WEEK</h2>
        <div className="bg-surface rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-text-dim text-xs">
                <th className="text-left font-medium px-3 py-2">Day</th>
                <th className="text-left font-medium px-3 py-2">Breakfast</th>
                <th className="text-left font-medium px-3 py-2">Dinner</th>
              </tr>
            </thead>
            <tbody>
              {WEEK_ORDER.map((weekday) => {
                const { breakfast, dinner } = mealsFor(weekday)
                const isToday = weekday === weekdayOf(today)
                return (
                  <tr
                    key={weekday}
                    className={`border-b border-border last:border-0 ${isToday ? 'bg-primary/10' : ''}`}
                  >
                    <td className={`px-3 py-2 font-semibold ${isToday ? 'text-primary' : 'text-text'}`}>{DAY_LABELS[weekday]}</td>
                    <td className="px-3 py-2 text-text-dim">{breakfast.name}</td>
                    <td className="px-3 py-2 text-text-dim">{dinner.name}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
