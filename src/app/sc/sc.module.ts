import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ScPageRoutingModule } from './sc-routing.module';
import { ScPage } from './sc.page';
import { SearchComponentsModule } from '../_module/search-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchComponentsModule,
    ScPageRoutingModule
  ],
  declarations: [
    ScPage
  ]
})
export class ScPageModule {}
