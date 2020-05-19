import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScPage } from './sc.page';

const routes: Routes = [
  {
    path: '',
    component: ScPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScPageRoutingModule {}
