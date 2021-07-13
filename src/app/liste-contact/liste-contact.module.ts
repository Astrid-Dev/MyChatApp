import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeContactPageRoutingModule } from './liste-contact-routing.module';

import { ListeContactPage } from './liste-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeContactPageRoutingModule
  ],
  declarations: [ListeContactPage]
})
export class ListeContactPageModule {}
