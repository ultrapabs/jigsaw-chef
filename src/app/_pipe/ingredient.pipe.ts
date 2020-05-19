import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ingredient'
})
export class IngredientPipe implements PipeTransform {

  transform(ingredientList: string[], selectedIngredients: string[], filterText: string, ...args: any[]): string[] {
    let filteredList = ingredientList;

    if (selectedIngredients != null && selectedIngredients.length > 0) {
      filteredList = filteredList.filter(ing => selectedIngredients.indexOf(ing) === -1);
    }

    if (filterText != null && filterText.trim().length > 0) {
      filteredList = filteredList.filter(ing => ing.toLowerCase().indexOf(filterText.trim().toLowerCase()) > -1);
    }

    return filteredList;
  }

}
