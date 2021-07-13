import {Component, OnInit, ViewChild} from '@angular/core';
import {ChatService, Message} from "../chat.service";
import {Router} from "@angular/router";
import {IonContent, PopoverController} from "@ionic/angular";
import {Observable} from "rxjs";
import {CouleursAppService} from "../couleurs-app.service";
import {ParamService} from "../param.service";
import {PopoverDiscussionComponent} from "../popover-discussion/popover-discussion.component";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent

  messages: Observable<Message[]>;
  newMsg = "";

  constructor(private popoverController: PopoverController, private chatService: ChatService, private router: Router, public couleurApp: CouleursAppService, public param: ParamService)
  {

  }

  ngOnInit() {
    this.messages = this.chatService.getChatMessages();
  }

  sendMessage()
  {
    this.chatService.addChatMessage(this.newMsg.trim()).then(() => {
      this.newMsg = "";
      this.content.scrollToBottom();
    });
  }

  signOut(){
    this.chatService.signOut().then(() =>{
      this.router.navigateByUrl("/", {replaceUrl: true});
    })
  }

  estThemCLair()
  {
    if(this.couleurApp.theme.includes('Clair') || this.couleurApp.theme.includes('Light'))
    {
      return true;
    }
    else
      return false;
  }

  async presentPopover(ev: any)
  {
    const popover = await this.popoverController.create({
      component: PopoverDiscussionComponent,
      cssClass: "my-custom-class",
      event: ev,
      translucent: true,
      showBackdrop: true
    });
    await popover.present();

    setTimeout(() =>{
      popover.dismiss();
    }, 4000);
  }

}
