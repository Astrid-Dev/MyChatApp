import { Component, OnInit } from '@angular/core';
import {ParamService} from "../param.service";

@Component({
  selector: 'app-parametre-appel',
  templateUrl: './parametre-appel.component.html',
  styleUrls: ['./parametre-appel.component.scss'],
})
export class ParametreAppelComponent implements OnInit {


  constructor(public param: ParamService) {

  }

  ngOnInit() {}
  ouvreParametre(){
    this.param.ouvreParametre();
  }

}
