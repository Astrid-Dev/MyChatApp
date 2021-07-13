import { Component, OnInit } from '@angular/core';
import {ParamService} from "../param.service";
import {ParametreComponent} from "../parametre/parametre.component";

@Component({
  selector: 'app-parametre-statut',
  templateUrl: './parametre-statut.component.html',
  styleUrls: ['./parametre-statut.component.scss'],
})
export class ParametreStatutComponent implements OnInit {

  constructor(private param: ParamService) {
  }

  ngOnInit() {}

  ouvreParametre(){
    this.param.ouvreParametre();
  }

}
