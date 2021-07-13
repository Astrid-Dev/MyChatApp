import { Component, OnInit } from '@angular/core';
import {CouleursAppService} from "../couleurs-app.service";
import {ParamService} from "../param.service";

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss'],
})
export class DiscussionComponent implements OnInit {

  couleurApp: any;
  heure= new Date();

  public tab = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(public param: ParamService, private couleursAppService: CouleursAppService)
  {
    this.couleurApp = this.couleursAppService.getCouleurApp();
  }

  ngOnInit() {}

}
