import { RecipePipe } from './recipe.pipe';
import { Recipe } from '../_model/recipe';

describe('RecipePipe', () => {
  it('create an instance', () => {
    const pipe = new RecipePipe();
    expect(pipe).toBeTruthy();
  });

  it('filters and sorts the recipe list for those with no ingredients selected', () => {
    let testPipe = new RecipePipe();
    let testRecipeOne = new Recipe('a', 1, ['apple', 'banana'], []);
    let testRecipeTwo = new Recipe('b', 2, ['banana', 'orange'], []);
    let testRecipeThree = new Recipe('c', 3, ['orange', 'pineapple'], []);
    let testRecipeFour = new Recipe('d', 4, ['pineapple', 'coconut'], []);
    let testRecipeList = [testRecipeOne, testRecipeTwo, testRecipeThree, testRecipeFour];
    let testSelectedIngredients = ['apple', 'orange'];
    testRecipeOne.updateAllIngredients(testSelectedIngredients);
    testRecipeTwo.updateAllIngredients(testSelectedIngredients);
    testRecipeThree.updateAllIngredients(testSelectedIngredients);
    testRecipeFour.updateAllIngredients(testSelectedIngredients);

    let result = testPipe.transform(testRecipeList, testSelectedIngredients, false);
    expect(result.length).toBe(1);
    expect(result[0]).toBe(testRecipeFour);
  });

  it('filters and sorts the recipe list for those with ingredients selected', () => {
    let testPipe = new RecipePipe();
    let testRecipeOne = new Recipe('a', 1, ['apple', 'banana'], []);
    let testRecipeTwo = new Recipe('b', 2, ['banana', 'orange'], []);
    let testRecipeThree = new Recipe('c', 3, ['orange', 'pineapple'], []);
    let testRecipeFour = new Recipe('d', 4, ['pineapple', 'coconut'], []);
    let testRecipeList = [testRecipeOne, testRecipeTwo, testRecipeThree, testRecipeFour];
    let testSelectedIngredients = ['apple', 'banana', 'orange'];
    testRecipeOne.updateAllIngredients(testSelectedIngredients);
    testRecipeTwo.updateAllIngredients(testSelectedIngredients);
    testRecipeThree.updateAllIngredients(testSelectedIngredients);
    testRecipeFour.updateAllIngredients(testSelectedIngredients);

    let result = testPipe.transform(testRecipeList, testSelectedIngredients, true);
    expect(result.length).toBe(3);
    expect(result[0]).toBe(testRecipeOne);
    expect(result[1]).toBe(testRecipeTwo);
    expect(result[2]).toBe(testRecipeThree);
  });
});
