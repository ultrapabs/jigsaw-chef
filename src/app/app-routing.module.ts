import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'rfcfes',
    loadChildren: () => import('./rfcfes/rfcfes.module').then( m => m.RfcfesPageModule)
  },
  {
    path: 'sc',
    loadChildren: () => import('./sc/sc.module').then( m => m.ScPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
