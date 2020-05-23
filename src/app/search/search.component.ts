import { Component, OnInit, Input } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ApiService } from '../_service/api.service';
import { GoogleAnalyticsService } from '../_service/google-analytics.service';
import { IngredientService } from '../_service/ingredient.service';
import { ToastService } from '../_service/toast.service';
import { Book } from '../_model/book';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  @Input() bookKey: string;
  book: Book;
  allIngredients: string[];
  selectedIngredients: string[];
  bookNotFound: boolean;
  ingredientFilterText: string;
  recipeFilterText: string;
  isMobile: boolean;
  showMoreIngredients: boolean;
  showMoreSelectedIngredients: boolean;

  constructor(
    private platform: Platform,
    private apiService: ApiService,
    private gaService: GoogleAnalyticsService,
    private ingredientService: IngredientService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.book = new Book('', '', '', '');
    this.allIngredients = [];
    this.selectedIngredients = [];
    this.bookNotFound = false;
    this.clearFilterText();
    this.isMobile = this.platform.is('mobile');
    this.showMoreIngredients = false;
    this.showMoreSelectedIngredients = false;
    if (this.bookKey != null) {
      this.fetchBook();
    } else {
      this.alertBookNotFound();
    }
  }

  fetchBook() {
    this.apiService.getBook(this.bookKey).subscribe(
      (response) => {
        this.gaService.visitEvent(this.bookKey);
        this.book = this.ingredientService.parseJsonBook(response);
        this.allIngredients = [].concat(this.ingredientService.getAllIngredientList(this.book));
      },
      (error) => {
        this.gaService.visitEvent('notFound');
        console.error(error);
        this.alertBookNotFound();
      }
    );
  }

  alertBookNotFound() {
    this.bookNotFound = true;
    let message = 'Something went wrong. Try a different link from the menu?';
    this.toastService.dangerToast(message);
  }

  selectIngredient(ingredient: string) {
    if (ingredient.indexOf(' or ') > -1) {
      let message = 'For multiple option ingredients, please select one or more in the search above.';
      this.toastService.dangerToast(message);
    } else {
      this.selectedIngredients = this.selectedIngredients.concat([ingredient]);
      this.selectedIngredients.sort();
      this.clearIngredientFilterText();
      this.updateRecipeIngredientLists();
    }
  }

  deselectIngredient(ingredient: string) {
    if (ingredient.indexOf(' or ') > -1) {
      let message = 'For multiple option ingredients, please remove all parts from the list above.';
      this.toastService.infoToast(message);
    } else {
      this.selectedIngredients = this.selectedIngredients.filter(ing => ing !== ingredient);
      this.updateRecipeIngredientLists();
    }
  }

  toggleMoreIngredients() {
    this.showMoreIngredients = !this.showMoreIngredients;
  }

  toggleMoreSelectedIngredients() {
    this.showMoreSelectedIngredients = !this.showMoreSelectedIngredients;
  }

  updateRecipeIngredientLists() {
    for (let recipe of this.book.recipes) {
      recipe.updateAllIngredients(this.selectedIngredients);
    }
  }

  clearFilterText() {
    this.clearIngredientFilterText();
    this.clearRecipeFilterText();
  }

  clearIngredientFilterText() {
    this.ingredientFilterText = '';
  }

  clearRecipeFilterText() {
    this.recipeFilterText = '';
  }
}
