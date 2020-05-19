import { Recipe } from './recipe';

describe('Recipe', () => {
  it('should create an instance', () => {
    expect(new Recipe(null, null, [], [])).toBeTruthy();
  });

  it('creates an instance correctly', () => {
    let testName = 'some name';
    let testPage = 123;
    let testIngredients = ['banana', 'orange', 'apple'];
    let testTags = ['some tag', 'another tag'];
    let testRecipe = new Recipe(testName, testPage, testIngredients, testTags);

    expect(testRecipe.name).toBe(testName);
    expect(testRecipe.page).toBe(testPage);
    expect(testRecipe.ingredients.length).toBe(3);
    expect(testRecipe.ingredients.indexOf('banana')).toBe(1);
    expect(testRecipe.ingredients.indexOf('orange')).toBe(2);
    expect(testRecipe.ingredients.indexOf('apple')).toBe(0);
    expect(testRecipe.tags.length).toBe(2);
    expect(testRecipe.tags.indexOf('some tag')).toBe(1);
    expect(testRecipe.tags.indexOf('another tag')).toBe(0);
    expect(testRecipe.availableIngredients.length).toBe(0);
    expect(testRecipe.missingIngredients.length).toBe(3);
    expect(testRecipe.missingIngredients.indexOf('banana')).toBe(1);
    expect(testRecipe.missingIngredients.indexOf('orange')).toBe(2);
    expect(testRecipe.missingIngredients.indexOf('apple')).toBe(0);
    expect(testRecipe.expanded).toBe(false);
  });

  it('toggles the expanded view', () => {
    let testRecipe = new Recipe(null, null, [], []);

    expect(testRecipe.expanded).toBe(false);
    testRecipe.toggleExpand();
    expect(testRecipe.expanded).toBe(true);
    testRecipe.toggleExpand();
    expect(testRecipe.expanded).toBe(false);
  });

  it('updates all ingredients', () => {
    let testRecipe = new Recipe(null, null, ['banana', 'orange', 'apple'], []);

    testRecipe.updateAllIngredients([]);
    expect(testRecipe.ingredients.indexOf('banana')).toBe(1);
    expect(testRecipe.ingredients.indexOf('orange')).toBe(2);
    expect(testRecipe.ingredients.indexOf('apple')).toBe(0);
    expect(testRecipe.availableIngredients.length).toBe(0);
    expect(testRecipe.missingIngredients.length).toBe(3);
    expect(testRecipe.missingIngredients.indexOf('banana')).toBe(1);
    expect(testRecipe.missingIngredients.indexOf('orange')).toBe(2);
    expect(testRecipe.missingIngredients.indexOf('apple')).toBe(0);

    testRecipe.updateAllIngredients(['banana']);
    expect(testRecipe.ingredients.indexOf('banana')).toBe(1);
    expect(testRecipe.ingredients.indexOf('orange')).toBe(2);
    expect(testRecipe.ingredients.indexOf('apple')).toBe(0);
    expect(testRecipe.availableIngredients.length).toBe(1);
    expect(testRecipe.availableIngredients.indexOf('banana')).toBe(0);
    expect(testRecipe.missingIngredients.length).toBe(2);
    expect(testRecipe.missingIngredients.indexOf('orange')).toBe(1);
    expect(testRecipe.missingIngredients.indexOf('apple')).toBe(0);

    testRecipe.updateAllIngredients(['banana', 'apple']);
    expect(testRecipe.ingredients.indexOf('banana')).toBe(1);
    expect(testRecipe.ingredients.indexOf('orange')).toBe(2);
    expect(testRecipe.ingredients.indexOf('apple')).toBe(0);
    expect(testRecipe.availableIngredients.length).toBe(2);
    expect(testRecipe.availableIngredients.indexOf('apple')).toBe(0);
    expect(testRecipe.availableIngredients.indexOf('banana')).toBe(1);
    expect(testRecipe.missingIngredients.length).toBe(1);
    expect(testRecipe.missingIngredients.indexOf('orange')).toBe(0);

    testRecipe.updateAllIngredients(['banana', 'apple', 'orange']);
    expect(testRecipe.ingredients.indexOf('banana')).toBe(1);
    expect(testRecipe.ingredients.indexOf('orange')).toBe(2);
    expect(testRecipe.ingredients.indexOf('apple')).toBe(0);
    expect(testRecipe.availableIngredients.length).toBe(3);
    expect(testRecipe.availableIngredients.indexOf('apple')).toBe(0);
    expect(testRecipe.availableIngredients.indexOf('banana')).toBe(1);
    expect(testRecipe.availableIngredients.indexOf('orange')).toBe(2);
    expect(testRecipe.missingIngredients.length).toBe(0);
  });

  it('knows when an ingredient has options', () => {
    let testRecipe = new Recipe(null, null, [], []);
    let singleIngredient = 'banana';
    let doubleIngredient = 'orange or apple';
    let tripleIngredient = 'pineapple, mango, or coconut';
    let testSelectedIngredientsOne = ['banana'];
    let testSelectedIngredientsTwo = ['banana', 'orange'];
    let testSelectedIngredientsThree = ['banana', 'pineapple', 'mango'];

    expect(testRecipe.optionIngredientSelected(singleIngredient, testSelectedIngredientsOne)).toBe(false);
    expect(testRecipe.optionIngredientSelected(doubleIngredient, testSelectedIngredientsOne)).toBe(false);
    expect(testRecipe.optionIngredientSelected(tripleIngredient, testSelectedIngredientsOne)).toBe(false);

    expect(testRecipe.optionIngredientSelected(singleIngredient, testSelectedIngredientsTwo)).toBe(false);
    expect(testRecipe.optionIngredientSelected(doubleIngredient, testSelectedIngredientsTwo)).toBe(true);
    expect(testRecipe.optionIngredientSelected(tripleIngredient, testSelectedIngredientsTwo)).toBe(false);

    expect(testRecipe.optionIngredientSelected(singleIngredient, testSelectedIngredientsThree)).toBe(false);
    expect(testRecipe.optionIngredientSelected(doubleIngredient, testSelectedIngredientsThree)).toBe(false);
    expect(testRecipe.optionIngredientSelected(tripleIngredient, testSelectedIngredientsThree)).toBe(true);
  });
});
