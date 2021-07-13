import { Component, OnInit } from '@angular/core';
import {ParamService} from "../param.service";
import {ChatService} from "../chat.service";
import {CouleursAppService} from "../couleurs-app.service";

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
})
export class InfoModalComponent implements OnInit {

  public peutLister = false;
  constructor(public param: ParamService, public chatService: ChatService, public couleursAppService: CouleursAppService) { }

  ngOnInit() {}

}
