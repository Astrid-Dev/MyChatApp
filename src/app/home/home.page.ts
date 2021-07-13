import { Component } from '@angular/core';
import {IonSlide, IonSlides, PopoverController} from "@ionic/angular";
import {CouleursAppService} from "../couleurs-app.service";
import { ParametreAppelComponent} from "../parametre-appel/parametre-appel.component";
import {ParametreStatutComponent} from "../parametre-statut/parametre-statut.component";
import {ParametreDiscussionComponent} from "../parametre-discussion/parametre-discussion.component";
import {CameraService} from "../camera.service";
import {ParamService} from "../param.service";
import {StatutService} from "../statut.service";
import {AuthenticationService} from "../authentication.service";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  selectedSlide: any;

  slideOps = {
    initialSlide: 1,
    slidePrev: 1,
    speed: 400
  };

  composantDuParametre: any;

  peutRechercher = false;



  constructor(public storage: Storage, public authenticationService: AuthenticationService, public statut: StatutService, public camera: CameraService, public couleurApp: CouleursAppService, private popoverController: PopoverController, public param: ParamService) {
    this.initialise();
  }

  initialise(){
    this.authenticationService.setInfoUtilisateur();
    this.authenticationService.setListeUtilisateurs();
  }

  //pour changer de section
  async segmentChange(ev)
  {
    await this.selectedSlide.slideTo(this.statut.segment);
  }

  //pour mettre a jour le content sur lequel on a slidé
  slidesChanged(slides: IonSlides)
  {
    this.selectedSlide = slides;
    slides.getActiveIndex().then(selectedindex =>{
      this.statut.segment = selectedindex;
    })
  }

  //pour faire disparaitre la barre de recherche
  onCancel(){
    this.peutRechercher = false;
  }

  //pour faire apparaitre la barre de recherche
  onRecherche(){
    this.peutRechercher = true;
  }

  //pour presenter le popover

  async presentPopover(ev: any)
  {
    if(this.statut.segment === 1){
      this.composantDuParametre = ParametreDiscussionComponent;
    }
    else if(this.statut.segment === 2){
      this.composantDuParametre = ParametreStatutComponent;
    }
    else if(this.statut.segment === 3)
    {
      this.composantDuParametre = ParametreAppelComponent;
    }
    const popover = await this.popoverController.create({
      component: this.composantDuParametre,
      cssClass: "my-custom-class",
      event: ev,
      translucent: true,
      showBackdrop: true
    });
    await popover.present();

    setTimeout(() =>{
      popover.dismiss();
    }, 4000);
  }

  addPhotoToGallery()
  {
    this.camera.addNewToGallery();
  }
}
