import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AfficheStatutPageRoutingModule } from './affiche-statut-routing.module';

import { AfficheStatutPage } from './affiche-statut.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AfficheStatutPageRoutingModule
  ],
  declarations: [AfficheStatutPage]
})
export class AfficheStatutPageModule {}
