import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CouleursAppService} from "./couleurs-app.service";
import {ConnexionPageModule} from "./connexion/connexion.module";
import {AngularFireModule} from "@angular/fire";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {environment} from "../environments/environment";
import {Storage} from "@ionic/storage";
import {EcrireStatutComponent} from "./ecrire-statut/ecrire-statut.component";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ConnexionPageModule,
  AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFireAuthModule,
  AngularFirestoreModule],
  providers: [EcrireStatutComponent, Storage, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, CouleursAppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
