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
  recipe: Recipe | undefined;
  quantity: number;

  constructor(recipe: Recipe | undefined, quantity: number) {
    this.recipe = recipe;
    this.quantity = quantity;
  }
}

interface NutritionContent {
  fat: number;
  calories: number;
  sodium: number;
}


export class Meal {
  id?: number | null | undefined;
  items: Array<MealItem>;

  constructor(items: Array<MealItem>) {
    this.id = null;
    this.items = items;
  }

  getNutritionContent(): NutritionContent | null {
    if (!this.items) return null;

    let fat = 0, calories = 0, sodium = 0;
    for (const item of this.items) {
      if (!item.recipe) continue;
      fat += item.recipe.fat * item.quantity;
      calories += item.recipe.calories * item.quantity;
      sodium += item.recipe.sodium * item.quantity;
    }

    return {fat: fat, calories: calories, sodium: sodium};
  }
}


type Recipes = Map<string, Recipe>;
type Meals = Map<number, Meal>;


export class HospitalOrdering {
  recipes: Recipes;
  meals: Meals | null | undefined;

  private latestMealId: number | null;

  constructor(recipes: Recipes) {
    this.recipes = recipes;
    this.meals = null;
    this.latestMealId = 0;
  }

  createRecipe(recipe: Recipe) {
    this.recipes?.set(recipe.name, recipe);
  }

  getRecipes(): Recipes {
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

  getMeal(id: number): Meal | undefined {
    return this.meals?.get(id);
  }
}