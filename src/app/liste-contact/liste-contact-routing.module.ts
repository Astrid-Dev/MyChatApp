import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeContactPage } from './liste-contact.page';

const routes: Routes = [
  {
    path: '',
    component: ListeContactPage
  },
  {
    path: "home",
    loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeContactPageRoutingModule {}
