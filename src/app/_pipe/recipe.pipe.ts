import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../_model/recipe';

@Pipe({
  name: 'recipe'
})
export class RecipePipe implements PipeTransform {

  transform(recipeList: Recipe[], selectedIngredients: string[], atLeastOneIngredient: boolean, ...args: any[]): Recipe[] {
    let filteredList;

    if (atLeastOneIngredient) {
      filteredList = recipeList.filter(recipe => recipe.availableIngredients.length > 0);
    } else {
      filteredList = recipeList.filter(recipe => recipe.availableIngredients.length === 0);
    }

    filteredList.sort((a, b) => {
      if (a.missingIngredients.length > b.missingIngredients.length) {
        return 1;
      } else if (a.missingIngredients.length < b.missingIngredients.length) {
        return -1;
      }

      return a.name >= b.name ? 1 : -1;

    });

    return filteredList;
  }

}
