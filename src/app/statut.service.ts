import { Injectable, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {EcrireStatutComponent} from "./ecrire-statut/ecrire-statut.component";
import {Router} from "@angular/router";

export interface Statut {
  id: number,
  value: string,
  createAt: Date,
}
const ITEMS_KEY = "mesStatuts";

@Injectable({
  providedIn: 'root'
})

export class StatutService implements OnInit{

  public liste: Statut[] = [];
  aAjouteStatut = true;
  segment = 1;

  unStatut = {
    nom: "Mon Nom",
    profil: "../chat/bg.png"
  }

  constructor(private modalController2: ModalController, private storage: Storage, private route: Router) {
  }

  addItem(item: Statut): Promise<any> {
    if(!this.storage.create())
    {
      alert("vide")
      return null;
    }
    else {
      return this.storage.get(ITEMS_KEY).then((items: Statut[]) =>{
        if(items){
          items.push(item);
          return this.storage.set(ITEMS_KEY, items);
          console.log("effectué1");
        }
        else{
          return this.storage.set(ITEMS_KEY, [item])
          console.log("effectué2")
        }
      });
    }

  }
  async ngOnInit() {
    await this.storage.create();
  }

  getItems(): Promise<Statut[]>{
    if(!this.storage.create()){
      return null;
    }
    else{
      return this.storage.get((ITEMS_KEY));
    }

  }


  AfficheStatut()
  {
    this.route.navigateByUrl("affiche-statut");
    this.segment = 2;
  }

  fermeStatut()
  {
    this.route.navigateByUrl("home");
    this.segment = 2;
  }

  dismiss2(){
    this.modalController2.dismiss();
  }

  async openModal2() {
    const modal = await this.modalController2.create({
      component: EcrireStatutComponent,
    });

    await modal.present();
  }

  // updateItem(item: Statut) {
  //   return this.storage.get(ITEMS_KEY).then((items: Statut[]) =>{
  //     if(!items || items.length === 0) {
  //       return null;
  //     }
  //
  //     let newItems: Statut[] = [];
  //
  //     for(let i of items){
  //       if(i.matricule === item.matricule)
  //       {
  //         newItems.push(item);
  //       }
  //       else{
  //         newItems.push(i);
  //       }
  //     }
  //
  //     return this.storage.set(ITEMS_KEY, newItems);
  //   });
  // }

  deleteItem(id: number) {
    return this.storage.get(ITEMS_KEY).then((items: Statut[]) =>{
      if(!items || items.length === 0) {
        return null;
      }

      let toKeep: Statut[] = [];

      for(let i of items){
        if(i.id !== id)
        {
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    });
  }

  // async showToast(msg){
  //   const toast = await this.toastController.create({
  //     message: msg,
  //     duration: 2000
  //   });
  //   toast.present();
  // }

  clear(){
    this.storage.clear();
  }

  setListeStatut(){
    this.getItems().then(items => {
      if(items == null){
        this.liste = [];
      }
      else{
        this.liste = items
      }
    });
  }

}
