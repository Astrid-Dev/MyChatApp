import { Component, OnInit } from '@angular/core';
import {ParamService} from "../param.service";
import {ChatService} from "../chat.service";

@Component({
  selector: 'app-popover-discussion',
  templateUrl: './popover-discussion.component.html',
  styleUrls: ['./popover-discussion.component.scss'],
})
export class PopoverDiscussionComponent implements OnInit {

  constructor(public param: ParamService, public chatService: ChatService) { }

  ngOnInit() {}

}
