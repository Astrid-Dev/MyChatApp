import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { DiscussionComponent} from "../discussion/discussion.component";

import { HomePageRoutingModule } from './home-routing.module';
import { StatutComponent} from "../statut/statut.component";
import {AppelsComponent} from "../appels/appels.component";
import {ParametreAppelComponent} from "../parametre-appel/parametre-appel.component";
import {ParametreDiscussionComponent} from "../parametre-discussion/parametre-discussion.component";
import {ParametreStatutComponent} from "../parametre-statut/parametre-statut.component";
import { ParametreComponent} from "../parametre/parametre.component";
import { CameraComponent} from "../camera/camera.component";
import {EcrireStatutComponent} from "../ecrire-statut/ecrire-statut.component";
import {PopoverDiscussionComponent} from "../popover-discussion/popover-discussion.component";
import {InfoModalComponent} from "../info-modal/info-modal.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [InfoModalComponent, PopoverDiscussionComponent, EcrireStatutComponent, HomePage, CameraComponent, ParametreComponent, DiscussionComponent, StatutComponent, AppelsComponent, ParametreDiscussionComponent, ParametreStatutComponent, ParametreAppelComponent]
})
export class HomePageModule {}
