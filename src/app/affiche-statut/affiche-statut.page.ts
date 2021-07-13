import {Component, Input, OnInit} from '@angular/core';
import {Statut, StatutService} from "../statut.service";
import {CouleursAppService} from "../couleurs-app.service";
import {IonSlides} from "@ionic/angular";
import {ParamService} from "../param.service";

@Component({
  selector: 'app-affiche-statut',
  templateUrl: './affiche-statut.page.html',
  styleUrls: ['./affiche-statut.page.scss'],
})
export class AfficheStatutPage implements OnInit {
  liste: Statut[];
  selectedSlide: any;

  slideOps = {
    initialSlide: 0,
    slidePrev: 1,
    speed: 400
  };

  nom = "";
  profil= "";
  heure: Date = new Date();

  constructor(public status: StatutService, public couleurApp: CouleursAppService, public param: ParamService) {
    this.status.setListeStatut();
    this.nom = status.unStatut.nom;
    this.profil = status.unStatut.profil;
  }

  ngOnInit() {}

  //pour mettre a jour le content sur lequel on a slidé
  slidesChanged(slides: IonSlides)
  {
    this.selectedSlide = slides;
    slides.getActiveIndex().then(selectedindex =>{
      this.heure = this.status.liste[selectedindex].createAt;
    })
  }

}
