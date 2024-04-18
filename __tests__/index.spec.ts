import { HospitalOrdering, Recipe, Meal, MealItem } from '../src';

describe('ordering is intantiated', () => {
  it('is true', () => {
    const ordering = new HospitalOrdering(null);
    expect(ordering).toBeTruthy();
    expect(ordering.recipes).toBeNull();
    expect(ordering.meals).toBeNull();
  });
});

describe('ordering is intantiated', () => {
  it('is true', () => {
    const ordering = new HospitalOrdering(null);
    expect(ordering).toBeTruthy();
    expect(ordering.recipes).toBeNull();
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

describe('ordering is intantiated with a recipe', () => {
  it('is true', () => {
    // arrange
    const name = "apple pie slice";
    const recipe = new Recipe(name, 10, 250, 150);
    const recipes = new Map([[name, recipe]]);

    // act
    const ordering = new HospitalOrdering(recipes);
    const meal = new Meal([new MealItem(recipe, 2)]);
    ordering.createMeal(meal);

    // assert
    expect(ordering.meals?.size).toEqual(1);

    const createdMeal = ordering.meals?.get(1);
    expect(createdMeal?.id).toEqual(1);
    expect(createdMeal?.items.length).toEqual(1);

    const mealItem = createdMeal?.items[0];
    expect(mealItem?.recipe).toEqual(meal.items[0].recipe);
    expect(mealItem?.quantity).toEqual(meal.items[0].quantity);

    expect(createdMeal?.totalFatContent()).toEqual(20);
  });
});
