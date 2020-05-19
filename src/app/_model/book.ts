import { Recipe } from './recipe';

export class Book {

  title: string;
  url: string;
  description: string;
  image: string;
  recipes: Recipe[];

  constructor(title: string, url: string, desc: string, img: string) {
    this.title = title;
    this.url = url;
    this.description = desc;
    this.image = img;
    this.recipes = [];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }
}
