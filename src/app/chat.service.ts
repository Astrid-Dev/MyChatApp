import {Injectable, Input} from '@angular/core';
import firebase from "firebase";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {InfoModalComponent} from "./info-modal/info-modal.component";
import {ModalController} from "@ionic/angular";
import {AngularFireStorage} from "@angular/fire/storage";

export interface  User {
  uid: string,
  email: string,
}

export interface Message {
  createdAt: firebase.firestore.FieldValue,
  id: string,
  from: string,
  msg: string,
  fromName: string,
  myMsg: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  currentUser: User = null;

  imagePath: string;
  upload: any;

  @Input() description = "";
   @Input() nom = "";

  constructor(private modalController: ModalController, private afAuth: AngularFireAuth, private afs: AngularFirestore, private afStorage: AngularFireStorage)
  {
    this.afAuth.onAuthStateChanged(user => {
      console.log("changed: ", user);
      this.currentUser = user;
    });
  }

  async signUp(email, password, phone, photo, username)
  {
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );

    console.log("result: ", credential);
    const uid = credential.user.uid;
    await credential.user.sendEmailVerification();

    return this.afs.doc(
      `users/${uid}`
    ).set({
      uid,
      email: credential.user.email,
      phone: phone,
      username: username,
      photo: photo
    })
  }

  signIn(email, password)
  {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signOut()
  {
    return this.afAuth.signOut();
  }

  addChatMessage(msg)
  {
    return this.afs.collection("messages").add({
      msg: msg,
      from: this.currentUser.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  getUsers(){
    return this.afs.collection("users").valueChanges({idField: "uid"}) as Observable<User[]>;
  }

  getUserForMsg(msgFromId, users: User[]): string{
    for(let user of users){
      if(user.uid == msgFromId){
        return user.email;
      }
    }
    return "Deleted";
  }

  getChatMessages()
  {
    let users = [];

    return this.getUsers().pipe(
      switchMap(res => {
        users = res;
        console.log("all users: ", users);
        return this.afs.collection("messages", ref => ref.orderBy("createdAt")).valueChanges({idField: "id"}) as unknown as Observable<Message[]>
      }),
      map(messages => {
        for(let m of messages){
          m.fromName = this.getUserForMsg(m.from, users);
          m.myMsg = this.currentUser.uid === m.from;
        }
        console.log("all messages: ", messages);

        return messages;
      })
    )
  }

  async ouvreInfoChat(){
    const modal = await this.modalController.create({
      component: InfoModalComponent
    });

    await modal.present();
  }

  fermerInfoChat(){
    this.modalController.dismiss();
  }

  uploadFirebase(image: any){
    this.imagePath = 'UsersProfile/' + new Date().getTime() + ".jpg";
    this.afStorage.ref(this.imagePath).putString(image, 'data_url');
  }


}
