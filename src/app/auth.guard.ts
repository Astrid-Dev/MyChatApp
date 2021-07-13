import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // Dans le constructeur on déclare notre variable de routage
  constructor(private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let userAuthenticated = true; // Pour le moment nous allons garder cette valeur à false

    if (userAuthenticated) {
      // Déjà connecté : on redirige l'utilisateur vers la page d'accueil
      return true;
    } else {
      // return false;
      // Non connecté : on redirige l'utilisateur vers la page de Login
      this.router.navigate(['/login']);
    }
  }
}
