import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AfficheStatutPage } from './affiche-statut.page';

const routes: Routes = [
  {
    path: '',
    component: AfficheStatutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AfficheStatutPageRoutingModule {}
