export class Recipe {
  name: string;
  fat: number;
  calories: number;
  sodium: number;

  constructor(name: string, fat: number, calories: number, sodium: number) {
    this.name = name;
    this.fat = fat;
    this.calories = calories;
    this.sodium = sodium;
  }
}


export class MealItem {
  recipe: Recipe;
  quantity: number;

  constructor(recipe: Recipe, quantity: number) {
    this.recipe = recipe;
    this.quantity = quantity;
  }
}


export class Meal {
  id?: number | null | undefined;
  items: Array<MealItem>;

  constructor(items: Array<MealItem>) {
    this.id = null;
    this.items = items;
  }

  totalFatContent(): number {
    if (!this.items) return 0;

    let total = 0;
    for (const item of this.items) {
      total += item.recipe.fat * item.quantity;
    }

    return total;
  }
}


type Recipes = Map<string, Recipe>;
type Meals = Map<number, Meal>;


export class HospitalOrdering {
  recipes: Recipes | null;
  meals: Meals | null | undefined;

  private latestMealId: number | null;

  constructor(recipes: Recipes | null) {
    this.recipes = recipes;
    this.meals = null;
    this.latestMealId = 0;
  }

  createRecipe(recipe: Recipe) {
    // TODO: Create a recipe in the system
  }

  getRecipes() {
    // Return the latest recipes in the system (eg. so that diet office can pick recipes for patient meals)
    return this.recipes;
  }

  createMeal(meal: Meal) {
    if (!this.meals) {
      this.meals = new Map();
    }

    const mealId = (this.latestMealId ?? 0) + 1;
    meal.id = mealId;
    this.latestMealId = mealId;
    this.meals.set(mealId, meal);
  }

  getMeal(id: number) {
    // TODO: Return a meal with recipes and total nutrients by meal's id
  }
}