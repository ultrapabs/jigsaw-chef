import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RfcfesPageRoutingModule } from './rfcfes-routing.module';
import { RfcfesPage } from './rfcfes.page';
import { SearchComponentsModule } from '../_module/search-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchComponentsModule,
    RfcfesPageRoutingModule
  ],
  declarations: [
    RfcfesPage
  ]
})
export class RfcfesPageModule {}
