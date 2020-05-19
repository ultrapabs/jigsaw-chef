import { TestBed } from '@angular/core/testing';
import { IngredientService } from './ingredient.service';
import { Book } from '../_model/book';
import { Recipe } from '../_model/recipe';

describe('IngredientService', () => {
  let ingredientService: IngredientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IngredientService
      ]
    });

    ingredientService = TestBed.get(IngredientService);
  });

  it('should be created', () => {
    const service: IngredientService = TestBed.get(IngredientService);
    expect(service).toBeTruthy();
  });

  it('parses a book from json', () => {
    let testJson = {
        "title": "The Book Title",
        "key": "someUnqiueKey",
        "description": "A brief decscription.",
        "image_path": "some-image.png",
        "url": "https://some.url",
        "recipe_list": [
          {
            "name": "recipe name",
            "page": 0,
            "ingredient_list": [
              "egg",
              "onion",
              "red pepper"
            ],
            "tags": [
              "vegetarian"
            ]
          },
          {
            "name": "other recipe name",
            "page": 1,
            "ingredient_list": [
              "orange",
              "banana",
              "apple"
            ],
            "tags": [
              "vegan"
            ]
          }
        ]
    };

    let result = ingredientService.parseJsonBook(testJson);

    expect(result.title).toBe(testJson['title']);
    expect(result.description).toBe(testJson['description']);
    expect(result.image).toBe(testJson['image_path']);
    expect(result.url).toBe(testJson['url']);
  });

  it('gets a list of all possible ingredients', () => {
    let testBook = new Book('some title', 'some.url', 'some descripton', 'some.img');
    let testRecipeOne = new Recipe('a', 1, ['apple', 'banana'], []);
    let testRecipeTwo = new Recipe('b', 2, ['banana', 'orange'], []);
    let testRecipeThree = new Recipe('c', 3, ['orange', 'pineapple'], []);
    let testRecipeFour = new Recipe('d', 4, ['pineapple', 'coconut'], []);
    testBook.addRecipe(testRecipeOne);
    testBook.addRecipe(testRecipeTwo);
    testBook.addRecipe(testRecipeThree);
    testBook.addRecipe(testRecipeFour);

    let result = ingredientService.getAllIngredientList(testBook);
    expect(result.length).toBe(5);
    expect(result[0]).toBe('apple');
    expect(result[1]).toBe('banana');
    expect(result[2]).toBe('coconut');
    expect(result[3]).toBe('orange');
    expect(result[4]).toBe('pineapple');
  });
});

export class MockIngredientService {

  constructor() { }

  parseJsonBook(jsonBook: any) {
    jsonBook = null;
  }

  getAllIngredientList(book: Book) {
    book = null;
  }

}
