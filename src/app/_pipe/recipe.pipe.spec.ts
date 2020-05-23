import { RecipePipe } from './recipe.pipe';
import { Recipe } from '../_model/recipe';

describe('RecipePipe', () => {
  it('create an instance', () => {
    const pipe = new RecipePipe();
    expect(pipe).toBeTruthy();
  });

  it('filters and sorts the recipe list for those with no ingredients selected without filter text', () => {
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

    let result = testPipe.transform(testRecipeList, testSelectedIngredients, false, null);
    expect(result.length).toBe(1);
    expect(result[0]).toBe(testRecipeFour);
  });

  it('filters and sorts the recipe list for those with ingredients selected without filter text', () => {
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

    let result = testPipe.transform(testRecipeList, testSelectedIngredients, true, null);
    expect(result.length).toBe(3);
    expect(result[0]).toBe(testRecipeOne);
    expect(result[1]).toBe(testRecipeTwo);
    expect(result[2]).toBe(testRecipeThree);
  });

  it('filters and sorts the recipe list for those with no ingredients selected with filter text', () => {
    let testPipe = new RecipePipe();
    let testRecipeOne = new Recipe('abc', 1, ['apple', 'banana'], []);
    let testRecipeTwo = new Recipe('bcd', 2, ['banana', 'orange'], []);
    let testRecipeThree = new Recipe('cde', 3, ['orange', 'pineapple'], []);
    let testRecipeFour = new Recipe('def', 4, ['pineapple', 'coconut'], []);
    let testRecipeList = [testRecipeOne, testRecipeTwo, testRecipeThree, testRecipeFour];
    let testSelectedIngredients = ['apple', 'orange'];
    testRecipeOne.updateAllIngredients(testSelectedIngredients);
    testRecipeTwo.updateAllIngredients(testSelectedIngredients);
    testRecipeThree.updateAllIngredients(testSelectedIngredients);
    testRecipeFour.updateAllIngredients(testSelectedIngredients);

    let resultOne = testPipe.transform(testRecipeList, testSelectedIngredients, false, '');
    expect(resultOne.length).toBe(1);
    expect(resultOne[0]).toBe(testRecipeFour);

    let resultTwo = testPipe.transform(testRecipeList, testSelectedIngredients, false, '  ');
    expect(resultTwo.length).toBe(1);
    expect(resultTwo[0]).toBe(testRecipeFour);

    let resultThree = testPipe.transform(testRecipeList, testSelectedIngredients, false, 'd');
    expect(resultThree.length).toBe(1);
    expect(resultThree[0]).toBe(testRecipeFour);

    let resultFour = testPipe.transform(testRecipeList, testSelectedIngredients, false, 'def');
    expect(resultFour.length).toBe(1);
    expect(resultFour[0]).toBe(testRecipeFour);

    let resultFive = testPipe.transform(testRecipeList, testSelectedIngredients, false, 'defg');
    expect(resultFive.length).toBe(0);
  });

  it('filters and sorts the recipe list for those with ingredients selected with filter text', () => {
    let testPipe = new RecipePipe();
    let testRecipeOne = new Recipe('abc', 1, ['apple', 'banana'], []);
    let testRecipeTwo = new Recipe('bcd', 2, ['banana', 'orange'], []);
    let testRecipeThree = new Recipe('cde', 3, ['orange', 'pineapple'], []);
    let testRecipeFour = new Recipe('def', 4, ['pineapple', 'coconut'], []);
    let testRecipeList = [testRecipeOne, testRecipeTwo, testRecipeThree, testRecipeFour];
    let testSelectedIngredients = ['apple', 'banana', 'orange'];
    testRecipeOne.updateAllIngredients(testSelectedIngredients);
    testRecipeTwo.updateAllIngredients(testSelectedIngredients);
    testRecipeThree.updateAllIngredients(testSelectedIngredients);
    testRecipeFour.updateAllIngredients(testSelectedIngredients);

    let resultOne = testPipe.transform(testRecipeList, testSelectedIngredients, true, '');
    expect(resultOne.length).toBe(3);
    expect(resultOne[0]).toBe(testRecipeOne);
    expect(resultOne[1]).toBe(testRecipeTwo);
    expect(resultOne[2]).toBe(testRecipeThree);

    let resultTwo = testPipe.transform(testRecipeList, testSelectedIngredients, true, '  ');
    expect(resultTwo.length).toBe(3);
    expect(resultTwo[0]).toBe(testRecipeOne);
    expect(resultTwo[1]).toBe(testRecipeTwo);
    expect(resultTwo[2]).toBe(testRecipeThree);

    let resultThree = testPipe.transform(testRecipeList, testSelectedIngredients, true, 'b');
    expect(resultThree.length).toBe(2);
    expect(resultThree[0]).toBe(testRecipeOne);
    expect(resultThree[1]).toBe(testRecipeTwo);

    let resultFour = testPipe.transform(testRecipeList, testSelectedIngredients, true, 'bcd');
    expect(resultFour.length).toBe(1);
    expect(resultFour[0]).toBe(testRecipeTwo);

    let resultFive = testPipe.transform(testRecipeList, testSelectedIngredients, true, 'def');
    expect(resultFive.length).toBe(0);
  });
});
