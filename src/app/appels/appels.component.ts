import { Component, OnInit } from '@angular/core';
import {CouleursAppService} from "../couleurs-app.service";

@Component({
  selector: 'app-appels',
  templateUrl: './appels.component.html',
  styleUrls: ['./appels.component.scss'],
})
export class AppelsComponent implements OnInit {

  couleurApp: any;
  constructor(private couleursAppService: CouleursAppService)
  {
    this.couleurApp = this.couleursAppService.getCouleurApp();
  }

  ngOnInit() {}

}
