import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CouleursAppService} from "../couleurs-app.service";
import {StatutService} from "../statut.service";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-ecrire-statut',
  templateUrl: './ecrire-statut.component.html',
  styleUrls: ['./ecrire-statut.component.scss'],
})
export class EcrireStatutComponent implements OnInit {

  private contenuDuMessage: string = "";

  constructor(private modalController:ModalController, private router: Router, public couleurApp: CouleursAppService, private status: StatutService) { }

  ngOnInit() {
  }

  envoyerStatut() {
    this.status.addItem({id: Date.now(), value: this.contenuDuMessage, createAt: new Date()});
    this.status.aAjouteStatut = true;
    this.status.dismiss2();
  }

}
