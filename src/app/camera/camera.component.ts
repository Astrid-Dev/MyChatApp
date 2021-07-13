import { Component, OnInit } from '@angular/core';
import {CameraService, Photo} from "../camera.service";
import {ActionSheetController} from "@ionic/angular";

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {

  constructor(public camera: CameraService, public actionSheetController: ActionSheetController) { }

  async ngOnInit() {
    await this.camera.loadSaved();
  }

  addPhotoToGallery()
  {
    this.camera.addNewToGallery();
  }

  public async showActionSheet(photo: Photo, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.camera.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
        }
      }]
    });
    await actionSheet.present();
  }

}
