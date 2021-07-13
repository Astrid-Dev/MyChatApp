import { Component, OnInit } from '@angular/core';
import {CouleursAppService} from "../couleurs-app.service";
import {Router} from "@angular/router";
import {StatutService} from "../statut.service";
import {ParamService} from "../param.service";

@Component({
  selector: 'app-statut',
  templateUrl: './statut.component.html',
  styleUrls: ['./statut.component.scss'],
})
export class StatutComponent implements OnInit {

  couleurApp: any;
  plusStatut = false;


  constructor(public param: ParamService, private couleursAppService: CouleursAppService, private route: Router, public status: StatutService)
  {
    this.couleurApp = this.couleursAppService.getCouleurApp();
  }

  ngOnInit() {}

  afficheStatut(){
    if(this.status.aAjouteStatut = true)
    {
      this.status.AfficheStatut()
    }
  }


}
