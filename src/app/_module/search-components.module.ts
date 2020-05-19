import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SearchComponent } from '../search/search.component';
import { IngredientPipe } from '../_pipe/ingredient.pipe';
import { RecipePipe } from '../_pipe/recipe.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [
    SearchComponent,
    IngredientPipe,
    RecipePipe
  ],
  exports: [
    SearchComponent,
    IngredientPipe,
    RecipePipe
  ]
})
export class SearchComponentsModule {}
