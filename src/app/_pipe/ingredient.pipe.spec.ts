import { IngredientPipe } from './ingredient.pipe';

describe('IngredientPipe', () => {
  it('create an instance', () => {
    const pipe = new IngredientPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns the full list if no ingredients selected or no filter text used', () => {
    let testPipe = new IngredientPipe();
    let testIngredients = ['apple', 'banana', 'orange', 'pineapple', 'coconut'];
    let testSelectedIngredients = [];
    let testFilterTextUndefined;
    let testFilterTextNull = null;
    let testFilterTextEmpty = '';
    let testFilterTextWhitespace = '  ';

    expect(testPipe.transform(testIngredients, testSelectedIngredients, testFilterTextUndefined).length).toBe(5);
    expect(testPipe.transform(testIngredients, testSelectedIngredients, testFilterTextNull).length).toBe(5);
    expect(testPipe.transform(testIngredients, testSelectedIngredients, testFilterTextEmpty).length).toBe(5);
    expect(testPipe.transform(testIngredients, testSelectedIngredients, testFilterTextWhitespace).length).toBe(5);
  });

  it('filters the ingredients by selected ingredients when no filter text used', () => {
    let testPipe = new IngredientPipe();
    let testIngredients = ['apple', 'banana', 'orange', 'pineapple', 'coconut'];
    let testSelectedIngredients = ['apple', 'banana', 'orange', 'avocado'];

    let result = testPipe.transform(testIngredients, testSelectedIngredients, null);
    expect(result.length).toBe(2);
    expect(result.indexOf('pineapple')).toBe(0);
    expect(result.indexOf('coconut')).toBe(1);
  });

  it('filters the ingredients by filter text and selected ingredients', () => {
    let testPipe = new IngredientPipe();
    let testIngredients = ['apple', 'banana', 'orange', 'pineapple', 'coconut'];
    let testSelectedIngredients = ['pineapple', 'coconut', 'avocado'];

    let resultOne = testPipe.transform(testIngredients, testSelectedIngredients, 'a');
    expect(resultOne.length).toBe(3);
    expect(resultOne.indexOf('apple')).toBe(0);
    expect(resultOne.indexOf('banana')).toBe(1);
    expect(resultOne.indexOf('orange')).toBe(2);

    let resultTwo = testPipe.transform(testIngredients, testSelectedIngredients, 'an');
    expect(resultTwo.length).toBe(2);
    expect(resultTwo.indexOf('banana')).toBe(0);
    expect(resultTwo.indexOf('orange')).toBe(1);

    let resultThree = testPipe.transform(testIngredients, testSelectedIngredients, 'anana');
    expect(resultThree.length).toBe(1);
    expect(resultThree.indexOf('banana')).toBe(0);

    let resultFour = testPipe.transform(testIngredients, testSelectedIngredients, 'ananananan');
    expect(resultFour.length).toBe(0);
  });
});
