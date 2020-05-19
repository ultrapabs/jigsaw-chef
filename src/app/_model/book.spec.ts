import { Book } from './book';
import { Recipe } from './recipe';

describe('Book', () => {
  it('should create an instance', () => {
    expect(new Book(null, null, null, null)).toBeTruthy();
  });

  it('creates an instance correctly', () => {
    let testTitle = 'some title';
    let testUrl = 'some.url';
    let testDesc = 'some description';
    let testImg = 'some.png';
    let testBook = new Book(testTitle, testUrl, testDesc, testImg);

    expect(testBook.title).toBe(testTitle);
    expect(testBook.url).toBe(testUrl);
    expect(testBook.description).toBe(testDesc);
    expect(testBook.image).toBe(testImg);
    expect(testBook.recipes.length).toBe(0);
  });

  it('adds a recipe', () => {
    let testBook = new Book('some title', 'some.url', 'some description', 'some.png');
    let testRecipeOne = new Recipe('some name', 1, [], []);
    let testRecipeTwo = new Recipe('some other name', 2, [], []);

    testBook.addRecipe(testRecipeOne);
    expect(testBook.recipes.length).toBe(1);
    expect(testBook.recipes[0]).toBe(testRecipeOne);

    testBook.addRecipe(testRecipeTwo);
    expect(testBook.recipes.length).toBe(2);
    expect(testBook.recipes[1]).toBe(testRecipeTwo);
  });
});
