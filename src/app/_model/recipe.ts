export class Recipe {

  name: string;
  page: number;
  ingredients: string[];
  missingIngredients: string[];
  availableIngredients: string[];
  tags: string[];
  expanded: boolean;

  constructor(name: string, page: number, ingredients: string[], tags: string[]) {
    this.name = name;
    this.page = page;
    this.ingredients = [].concat(ingredients);
    this.ingredients.sort();
    this.tags = [].concat(tags);
    this.tags.sort();
    this.updateAllIngredients([]);
    this.expanded = false;
  }

  toggleExpand() {
    this.expanded = !this.expanded;
  }

  updateAllIngredients(selectedIngredients: string[]) {
    this.availableIngredients = [];
    this.missingIngredients = [];

    for (let ing of this.ingredients) {
      if (this.optionIngredientSelected(ing, selectedIngredients)) {
        this.availableIngredients.push(ing);
      } else if (selectedIngredients.indexOf(ing) > -1) {
        this.availableIngredients.push(ing);
      } else {
        this.missingIngredients.push(ing);
      }
    }
  }

  optionIngredientSelected(ingredient: string, selectedIngredients: string[]) {
    if (ingredient.indexOf(' or ') === -1) {
      return false;
    }

    let ingredientParts = [ingredient.split(' or ')[1]];

    if (ingredient.indexOf(',') > -1) {
      ingredientParts = ingredientParts.concat(ingredient.split(' or ')[0].split(',').map(part => part.trim()));
      ingredientParts.pop();
    } else {
      ingredientParts.push(ingredient.split(' or ')[0]);
    }

    return selectedIngredients.filter(ing => ingredientParts.indexOf(ing) > -1).length > 0;
  }
}
