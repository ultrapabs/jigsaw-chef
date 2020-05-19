import { Injectable } from '@angular/core';
import { Book } from '../_model/book';
import { Recipe } from '../_model/recipe';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor() { }

  parseJsonBook(jsonBook: any) {
    let book = new Book(jsonBook['title'], jsonBook['url'], jsonBook['description'], jsonBook['image_path']);

    for (let recipeJson of jsonBook['recipe_list']) {
      book.addRecipe(new Recipe(
        recipeJson['name'],
        recipeJson['page'],
        recipeJson['ingredient_list'],
        recipeJson['tags']
      ));
    }

    return book;
  }

  getAllIngredientList(book: Book) {
    let ingredientList = [];

    for (let recipe of book.recipes) {
      for (let ing of recipe.ingredients) {
        if (ing.indexOf(' or ') === -1) {
          ingredientList.push(ing);
        } else if (ing.indexOf(' or ') > -1 && ing.indexOf(',') === 0) {
          ingredientList = ingredientList.concat(ing.split(' or '));
        } else {
          let orParts = ing.split(' or ');
          let commaParts = orParts[0].split(',').map(part => part.trim());
          commaParts.splice(-1,1);

          ingredientList.push(orParts[1]);
          ingredientList = ingredientList.concat(commaParts);
        }
      }
    }

    let ingredientSet = new Set(ingredientList);
    let uniqueIngredientList = Array.from(ingredientSet);
    uniqueIngredientList.sort();

    return uniqueIngredientList;
  }

}
