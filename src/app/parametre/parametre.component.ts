import { Component, OnInit } from '@angular/core';
import {ParamService} from "../param.service";
import {CouleursAppService} from "../couleurs-app.service";
import {AlertController} from "@ionic/angular";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.scss'],
})
export class ParametreComponent implements OnInit {

  couleurApp: any;

  titreParametre = "";

  langue = "Francais";
  theme = "Clair";

  constructor(public authenticationService: AuthenticationService, public param: ParamService, private couleursAppService: CouleursAppService, private alertController: AlertController) {
    this.langue = param.langue;
    this.theme = couleursAppService.theme;
    this.initialise(param, couleursAppService);
  }

  private initialise(param, couleur)
  {
    this.param.setParametre(this.langue);
    this.couleursAppService.setCouleurApp(this.theme);
    this.couleurApp = this.couleursAppService.getCouleurApp();
    this.titreParametre = this.param.getParametre().parametre;
    this.authenticationService.setInfoUtilisateur();
    this.authenticationService.setListeUtilisateurs();
  }

  ngOnInit() {}

  fermerParametre(){
    if(this.titreParametre === this.param.getParametre().compte)
    {
      this.titreParametre = this.param.getParametre().parametre;
    }
    else if(this.titreParametre === this.param.getParametre().parametre)
    {
      this.param.fermerParametre();
    }
    else if(this.titreParametre === this.param.getParametre().profil)
    {
      this.titreParametre = this.param.getParametre().parametre;
    }

    else if(this.titreParametre === this.param.getParametre().discuss)
    {
      this.titreParametre = this.param.getParametre().parametre;
    }
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      cssClass: "secondary",
      header: this.param.getParametre().choisirLangue,
      buttons: [
        {
          text: this.param.getParametre().annuler,
          role: "cancel",
        },
        {
          text: this.param.getParametre().modifier,
          handler: data => {
            this.langue = JSON.stringify(data);
            this.initialise(this.param, this.couleursAppService);
          }
        }
      ],
      inputs: [
        {
          type: "radio",
          name: "Francais",
          label: "Francais",
          value: "Francais",
          checked: this.estFrancais(),
        },
        {
          type: "radio",
          name: "English",
          label: "English",
          value: "English",
          checked: !this.estFrancais()
        }
      ]
    });

    await alert.present();
  }

  async presentAlert2(){
    const alert = await this.alertController.create({
      cssClass: "secondary",
      header: this.param.getParametre().choisirTheme,
      buttons: [
        {
          text: this.param.getParametre().annuler,
          role: "cancel",
        },
        {
          text: this.param.getParametre().modifier,
          handler: data => {
            this.theme = JSON.stringify(data);
            this.initialise(this.param, this.couleursAppService);
            this.titreParametre = this.param.getParametre().discuss;
          }
        }
      ],
      inputs: [
        {
          type: "radio",
          name: this.param.getParametre().clair,
          label: this.param.getParametre().clair,
          value: this.param.getParametre().clair,
          checked: this.estClair(),
        },
        {
          type: "radio",
          name: this.param.getParametre().sombre,
          label: this.param.getParametre().sombre,
          value: this.param.getParametre().sombre,
          checked: !this.estClair()
        }
      ]
    });

    await alert.present();
  }

  estFrancais(): boolean{
    if(this.langue.includes("Francais"))
      return true;
    else
      return false;
  }

  estClair(): boolean{
    if(this.theme.includes("Clair") || this.theme.includes("Light"))
      return true;
    else
      return false;
  }

  getTheme(){
    let temp;
    if(this.theme.includes('"'))
    {
      temp = this.theme.substring(1, this.theme.length-1);
    }
    else{
      temp = this.theme;
    }
    if(temp === "Light" && this.langue.includes("Francais"))
    {
      temp = "Clair"
    }
    else if(temp === "Clair" && this.langue.includes("English"))
    {
      temp = "Light"
    }
    else if(temp === "Sombre" && this.langue.includes("English"))
    {
      temp = "Dark"
    }
    else if(temp === "Dark" && this.langue.includes("Francais"))
    {
      temp = "Sombre";
    }

    return temp;
  }

}
