import { HospitalOrdering, Recipe, Meal, MealItem } from '../src';

describe('ordering is intantiated', () => {
  it('is true', () => {
    const ordering = new HospitalOrdering(new Map());
    expect(ordering).toBeTruthy();
    expect(ordering.recipes).toBeTruthy();
    expect(ordering.meals).toBeNull();
  });
});

describe('ordering is intantiated with a recipe', () => {
  it('is true', () => {
    // arrange
    const recipes = new Map();
    const name = "apple pie slice";
    const recipe = new Recipe(name, 10, 250, 150);
    recipes.set(name, recipe);

    // act
    const ordering = new HospitalOrdering(recipes);

    // assert
    expect(ordering).toBeTruthy();
    expect(ordering.recipes).toEqual(recipes);
    expect(ordering.meals).toBeNull();
  });
});

describe('ordering can create a meal', () => {
  it('is true', () => {
    // arrange
    const recipes = new Map();
    const recipeName = 'apple pie slice';
    const recipe = new Recipe(recipeName, 10, 250, 150);
    recipes.set(recipeName, recipe);

    // act
    const ordering = new HospitalOrdering(recipes);
    const availableRecipes = ordering.getRecipes()
    const mealItem = new MealItem(availableRecipes.get(recipeName), 2);
    const meal = new Meal([mealItem]);
    ordering.createMeal(meal);

    // assert
    expect(ordering.meals?.size).toEqual(1);

    const createdMeal = ordering.getMeal(1);
    expect(createdMeal?.id).toEqual(1);
    expect(createdMeal?.items.length).toEqual(1);

    const createdMealItem = createdMeal?.items[0];
    expect(createdMealItem?.recipe).toEqual(meal.items[0].recipe);
    expect(createdMealItem?.quantity).toEqual(meal.items[0].quantity);

    const nutritionContent = createdMeal?.getNutritionContent();
    expect(nutritionContent?.fat).toEqual(recipe.fat * mealItem.quantity);
    expect(nutritionContent?.calories).toEqual(recipe.calories * mealItem.quantity);
    expect(nutritionContent?.sodium).toEqual(recipe.sodium * mealItem.quantity);
  });
});

describe('meal created after recipe change has new nutrition content', () => {
  it('is true', () => {
    // arrange
    const recipes = new Map();
    const recipeName = 'apple pie slice';
    recipes.set(recipeName, new Recipe(recipeName, 10, 250, 150));

    // act
    const ordering = new HospitalOrdering(recipes);
    let availableRecipes = ordering.getRecipes()
    ordering.createMeal(new Meal([new MealItem(availableRecipes.get(recipeName), 2)]));

    recipes.set(recipeName, new Recipe(recipeName, 15, 300, 50));
    availableRecipes = ordering.getRecipes();
    ordering.createMeal(new Meal([new MealItem(availableRecipes.get(recipeName), 2)]));

    // assert
    const oldMeal = ordering.getMeal(1);
    const newMeal = ordering.getMeal(2);
    expect(oldMeal).toBeTruthy();
    expect(newMeal).toBeTruthy();

    const oldMealNutritions = oldMeal!.getNutritionContent();
    const newMealNutritions = newMeal!.getNutritionContent();

    expect(oldMealNutritions?.fat).toBeLessThan(newMealNutritions!.fat);
    expect(oldMealNutritions?.calories).toBeLessThan(newMealNutritions!.calories);
    expect(oldMealNutritions?.sodium).toBeGreaterThan(newMealNutritions!.sodium);
  });
});
