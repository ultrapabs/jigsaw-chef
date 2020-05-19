import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { IngredientPipe } from '../_pipe/ingredient.pipe';
import { Platform } from '@ionic/angular';
import { RecipePipe } from '../_pipe/recipe.pipe';
import { SearchComponent } from './search.component';
import { ApiService } from '../_service/api.service';
import { GoogleAnalyticsService } from '../_service/google-analytics.service';
import { IngredientService } from '../_service/ingredient.service';
import { ToastService } from '../_service/toast.service';
import { MockApiService } from '../_service/api.service.spec';
import { MockGoogleAnalyticsService } from '../_service/google-analytics.service.spec';
import { MockIngredientService } from '../_service/ingredient.service.spec';
import { MockToastService } from '../_service/toast.service.spec';
import { Book } from '../_model/book';
import { Recipe } from '../_model/recipe';


describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let platformSpy;
  let apiService: MockApiService;
  let gaService: MockGoogleAnalyticsService;
  let ingredientService: MockIngredientService;
  let toastService: MockToastService;

  beforeEach(async(() => {
    platformSpy = jasmine.createSpyObj('Platform', ['is']);
    apiService = new MockApiService();
    gaService = new MockGoogleAnalyticsService();
    ingredientService = new MockIngredientService();
    toastService = new MockToastService();

    TestBed.configureTestingModule({
      declarations: [SearchComponent, IngredientPipe, RecipePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Platform, useValue: platformSpy },
        { provide: ApiService, useValue: apiService },
        { provide: GoogleAnalyticsService, useValue: gaService },
        { provide: IngredientService, useValue: ingredientService },
        { provide: ToastService, useValue: toastService }
      ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sets up the page correctly on init when the book key is set', () => {
    spyOn(component, 'clearFilterText');
    spyOn(component, 'fetchBook');
    component.bookKey = 'someKey';

    component.ngOnInit();
    expect(component.book.title).toBe('');
    expect(component.allIngredients.length).toBe(0);
    expect(component.selectedIngredients.length).toBe(0);
    expect(component.bookNotFound).toBe(false);
    expect(component.showMoreIngredients).toBe(false);
    expect(component.showMoreSelectedIngredients).toBe(false);
    expect(component.clearFilterText).toHaveBeenCalled();
    expect(platformSpy.is).toHaveBeenCalledWith('mobile');
    expect(component.fetchBook).toHaveBeenCalled();
  });

  it('alerts the user when the bookKey is not set', () => {
    spyOn(component, 'clearFilterText');
    spyOn(component, 'fetchBook');
    spyOn(component, 'alertBookNotFound');

    component.ngOnInit();
    expect(component.book.title).toBe('');
    expect(component.allIngredients.length).toBe(0);
    expect(component.selectedIngredients.length).toBe(0);
    expect(component.bookNotFound).toBe(false);
    expect(component.showMoreIngredients).toBe(false);
    expect(component.showMoreSelectedIngredients).toBe(false);
    expect(component.clearFilterText).toHaveBeenCalled();
    expect(platformSpy.is).toHaveBeenCalledWith('mobile');
    expect(component.alertBookNotFound).toHaveBeenCalled();
  });

  it('calls the api service to fetch the book info and handles a success response', () => {
    let testResponse = {};
    let testIngredients = ['apple', 'banana'];
    let testKey = 'someKey';
    component.bookKey = testKey;
    let testBook = new Book('Some Title', '', '', '');
    spyOn(apiService, 'getBook').and.returnValue(of(testResponse));
    spyOn(ingredientService, 'parseJsonBook').and.returnValue(testBook);
    spyOn(ingredientService, 'getAllIngredientList').and.returnValue(testIngredients);
    spyOn(gaService, 'visitEvent');

    component.fetchBook();
    expect(apiService.getBook).toHaveBeenCalledWith(testKey);
    expect(ingredientService.parseJsonBook).toHaveBeenCalledWith(testResponse);
    expect(ingredientService.getAllIngredientList).toHaveBeenCalledWith(testBook);
    expect(component.allIngredients.length).toBe(2);
    expect(component.allIngredients[0]).toBe('apple');
    expect(component.allIngredients[1]).toBe('banana');
    expect(component.book.title).toBe('Some Title');
    expect(gaService.visitEvent).toHaveBeenCalledWith('someKey');
  });

  it('calls the api service to fetch the book info and handles an error response', () => {
    let testResponse = 'some error';
    let testIngredients = ['apple', 'banana'];
    let testKey = 'someKey';
    component.bookKey = testKey;
    let testBook = new Book('', '', '', '');
    spyOn(apiService, 'getBook').and.returnValue(throwError(testResponse));
    spyOn(ingredientService, 'parseJsonBook');
    spyOn(ingredientService, 'getAllIngredientList');
    spyOn(console, 'error');
    spyOn(component, 'alertBookNotFound');
    spyOn(gaService, 'visitEvent');

    component.fetchBook();
    expect(apiService.getBook).toHaveBeenCalledWith(testKey);
    expect(ingredientService.parseJsonBook).not.toHaveBeenCalled();
    expect(ingredientService.getAllIngredientList).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(testResponse);
    expect(component.alertBookNotFound).toHaveBeenCalled();
    expect(gaService.visitEvent).toHaveBeenCalledWith('notFound');
  });

  it('alerts the user and redirects if a book is not found', () => {
    spyOn(toastService, 'dangerToast');

    component.alertBookNotFound();
    expect(component.bookNotFound).toBe(true);
    expect(toastService.dangerToast).toHaveBeenCalledWith('Something went wrong. Try a different link from the menu?');
  });

  it('selects a single ingredient correctly', () => {
    let testIngredient = 'banana';
    component.selectedIngredients = ['orange'];
    spyOn(component, 'clearFilterText');
    spyOn(component, 'updateRecipeIngredientLists');

    component.selectIngredient(testIngredient);
    expect(component.selectedIngredients.indexOf(testIngredient)).toBe(0);
    expect(component.clearFilterText).toHaveBeenCalled();
    expect(component.updateRecipeIngredientLists).toHaveBeenCalled();
  });

  it('displays a toast if the user tries to select an ingredient with multiple options', () => {
    let testIngredient = 'banana or apple';
    spyOn(toastService, 'dangerToast');

    component.selectIngredient(testIngredient);
    expect(toastService.dangerToast).toHaveBeenCalledWith('For multiple option ingredients, please select one or more in the search above.');
  });

  it('deselects a single ingredient correctly', () => {
    let testIngredient = 'banana';
    component.selectedIngredients = [testIngredient];
    spyOn(component, 'updateRecipeIngredientLists');

    component.deselectIngredient(testIngredient);
    expect(component.selectedIngredients.indexOf(testIngredient)).toBe(-1);
    expect(component.updateRecipeIngredientLists).toHaveBeenCalled();
  });

  it('displays a toast if the user tries to deselect an ingredient with multiple options', () => {
    let testIngredient = 'banana or apple';
    spyOn(toastService, 'infoToast');

    component.deselectIngredient(testIngredient);
    expect(toastService.infoToast).toHaveBeenCalledWith('For multiple option ingredients, please remove all parts from the list above.');
  });

  it('toggles showing more ingredients', () => {
    component.showMoreIngredients = true;

    component.toggleMoreIngredients();
    expect(component.showMoreIngredients).toBe(false);
    component.toggleMoreIngredients();
    expect(component.showMoreIngredients).toBe(true);
  });

  it('toggles showing more selected ingredients', () => {
    component.showMoreSelectedIngredients = true;

    component.toggleMoreSelectedIngredients();
    expect(component.showMoreSelectedIngredients).toBe(false);
    component.toggleMoreSelectedIngredients();
    expect(component.showMoreSelectedIngredients).toBe(true);
  });

  it('updates the recipe ingredient lists', () => {
    component.book = new Book('test', '', '', '');
    component.selectedIngredients = ['banana'];
    let testRecipeOne = new Recipe('one', 1, [], []);
    let testRecipeTwo = new Recipe('two', 2, [], []);
    component.book.addRecipe(testRecipeOne);
    component.book.addRecipe(testRecipeTwo);
    spyOn(testRecipeOne, 'updateAllIngredients');
    spyOn(testRecipeTwo, 'updateAllIngredients');

    component.updateRecipeIngredientLists();
    expect(testRecipeOne.updateAllIngredients).toHaveBeenCalledWith(component.selectedIngredients);
    expect(testRecipeTwo.updateAllIngredients).toHaveBeenCalledWith(component.selectedIngredients);
  });

  it('clears the filter text', () => {
    component.filterText = 'something';

    component.clearFilterText();
    expect(component.filterText).toBe('');
  });

});
