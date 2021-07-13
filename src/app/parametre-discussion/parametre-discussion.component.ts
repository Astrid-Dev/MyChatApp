import { Component, OnInit } from '@angular/core';
import {ParamService} from "../param.service";
import {CouleursAppService} from "../couleurs-app.service";

@Component({
  selector: 'app-parametre-discussion',
  templateUrl: './parametre-discussion.component.html',
  styleUrls: ['./parametre-discussion.component.scss'],
})
export class ParametreDiscussionComponent implements OnInit {

  couleurApp: any;

  constructor(private param: ParamService, private couleursAppService: CouleursAppService) {
    this.couleurApp = this.couleursAppService.getCouleurApp();
  }

  ngOnInit() {}

  ouvreParametre(){
    this.param.ouvreParametre();
  }

}
