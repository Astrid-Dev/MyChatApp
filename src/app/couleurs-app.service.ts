import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CouleursAppService {

  private couleurAppCLair = {
    fond: "#f1b004",
    texteSimple: "rgb(50,50,50)",
    texteFocus: "rgba(0, 0, 0, 0.7)",
    iconSimple: "texte",
    iconFocus: "texte",
    iconApp: "ducknote",
    segment: "primary",
    milieu: "",
    texteInu: "",
    fond2: "",
    toolbar: "ducknote",
    fonstatut: "rgba(200, 230, 201, 0.6)",
    couleurStatut: "rgba(0, 0, 0, 0.8)",
    list: "rgba(255, 255, 255, 0.6)",
    item: "light"
  }

  private couleurApp: any;

  private couleurAppSombre =
    {
      fond: "#222428",
      texteFocus: "rgba(255,255,255,0.8)",
      texteSimple: "rgba(255,255,255,0.5)",
      iconSimple: "dark",
      iconFocus: "texte2",
      iconApp: "texte2",
      segment: "light",
      milieu: "dark",
      texteInu: "rgba(255,255,255,0.2)",
      fond2: "#222428",
      toolbar: "dark",
      fonstatut: "rgba(50, 50, 50, 1)",
      couleurStatut: "white",
      list: "#222428",
      item: "dark"
    }

    public theme = "Light";

  constructor() {
    this.setCouleurApp(this.theme);
  }

  setCouleurApp(theme: string)
  {
    this.theme = theme;
    if(theme.includes("Clair") || theme.includes("Light"))
      this.couleurApp = this.couleurAppCLair;
    else if(theme.includes("Sombre") || theme.includes("Dark"))
      this.couleurApp = this.couleurAppSombre;
  }

  getCouleurApp(){
    return this.couleurApp;
  }
}
