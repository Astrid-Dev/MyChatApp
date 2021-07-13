import { Component, OnInit } from '@angular/core';
import {CouleursAppService} from "../couleurs-app.service";
import {ChatService} from "../chat.service";
import {ParamService} from "../param.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-liste-contact',
  templateUrl: './liste-contact.page.html',
  styleUrls: ['./liste-contact.page.scss'],
})
export class ListeContactPage implements OnInit {

  tab = [1, 2, 3, 4, 5, 6];
  tab2 = [false, false, false, false, false, false];
  contact: string;
  constructor(private authenticationService: AuthenticationService, private route: Router, public param: ParamService, public couleursAppService: CouleursAppService, public chatService: ChatService) {
    this.contact = param.getParametre().contacts.toString().toLowerCase();
  }

  ngOnInit() {
  }

  retour(){
    if(this.param.estNouveauGroupe)
    {
      this.authenticationService.addItem2({
        uid: "",
        email: "",
        displayName: this.chatService.nom,
        photoURL: this.param.monProfile,
        emailVerified: true,
        actu: "Nouveau groupe",
        number: ""})
    }
    this.authenticationService.setListeUtilisateurs();
    this.route.navigateByUrl('home');
  }

}
