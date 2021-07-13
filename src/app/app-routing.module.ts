import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {canActivate, redirectUnauthorizedTo, redirectLoggedInTo} from "@angular/fire/auth-guard";

//On renvoi l'utilisateur non connecté à la page de connexion
const redirectUnauthorizedLogin = () => redirectUnauthorizedTo((["/"]));

//Si l'utilisateur est connecté, on le renvoi à la page de chat
const redirectLoggedInTochat = () => redirectLoggedInTo(["/home"]);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./connexion/connexion.module').then( m => m.ConnexionPageModule),
    ...canActivate(redirectLoggedInTochat)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule),
    ...canActivate(redirectUnauthorizedLogin),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    ...canActivate(redirectUnauthorizedLogin)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'affiche-statut',
    loadChildren: () => import('./affiche-statut/affiche-statut.module').then( m => m.AfficheStatutPageModule)
  },
  {
    path: 'liste-contact',
    loadChildren: () => import('./liste-contact/liste-contact.module').then( m => m.ListeContactPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
