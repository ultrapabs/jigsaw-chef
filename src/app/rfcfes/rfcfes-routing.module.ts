import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RfcfesPage } from './rfcfes.page';

const routes: Routes = [
  {
    path: '',
    component: RfcfesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RfcfesPageRoutingModule {}
