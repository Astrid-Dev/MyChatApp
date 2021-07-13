import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnexionPage } from './connexion.page';
import {HomePage} from "../home/home.page";

const routes: Routes = [
  {
    path: '',
    component: ConnexionPage
  },
  {
    path: "home",
    redirectTo: "home"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnexionPageRoutingModule {}
