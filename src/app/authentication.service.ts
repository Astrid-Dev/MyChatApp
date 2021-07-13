import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {Storage} from "@ionic/storage";
import {Statut} from "./statut.service";
import {ParamService} from "./param.service";

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  actu: string,
  number: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: any;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public afs: AngularFirestore,
    public storage: Storage,
    public param: ParamService
  ) {
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
    if(!this.storage.create()){
      this.storage.create();
    }
  }

  // Login in with email/password
  SignIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password)
  }

  // Register user with email/password
  async RegisterUser(email, password, displayName, photoURL, number) {

    const credential = await this.ngFireAuth.createUserWithEmailAndPassword(
      email,
      password
    );

    this.addItem({
      uid: credential.user.uid,
      email: credential.user.email,
      displayName: displayName,
      photoURL: photoURL,
      emailVerified: true,
      actu: "Hey there i'm using MyChatApp",
      number: number
    })
    this.setInfoUtilisateur();
    const uid = credential.user.uid;
    this.addItem2({
      uid: credential.user.uid,
      email: credential.user.email,
      displayName: displayName,
      photoURL: photoURL,
      emailVerified: true,
      actu: "Hey there i'm using MyChatApp",
      number: number
    })
    this.setListeUtilisateurs();

    return this.afStore.doc(
      `users/${credential.user.uid}`
    ).set({
      uid: credential.user.uid,
      email: credential.user.email,
      displayName: displayName,
      photoURL: photoURL,
      emailVerified: true,
      actu: "Hey there i'm using MyChatApp",
      number: number
    })
  }


  // Email verification when new user register
   async SendVerificationMail() {
    return (await this.ngFireAuth.currentUser).sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email']);
      })
  }

  // Recover password
  PasswordRecover(passwordResetEmail) {
    return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email has been sent, please check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }

  SetUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      actu: user.actu,
      number : user.number
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign-out
  SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }

  addItem(item: User): Promise<User> {
    if(!this.storage.create())
    {
      alert("vide")
      return null;
    }
    else {
      return this.storage.set("UserData", item);
    }

  }

  getItems(): Promise<User>{
    if(!this.storage.create()){
      return null;
    }
    else{
      return this.storage.get(("UserData"));
    }

  }

  addItem2(item: User): Promise<any> {
    if(!this.storage.create())
    {
      alert("vide")
      return null;
    }
    else {
      return this.storage.get("ListUsers").then((items: User[]) =>{
        if(items){
          items.push(item);
          return this.storage.set("ListUsers", items);
          console.log("effectué1");
        }
        else{
          return this.storage.set("ListUsers", [item])
          console.log("effectué2")
        }
      });
    }

  }

  getItems2(): Promise<User[]>{
    if(!this.storage.create()){
      return null;
    }
    else{
      return this.storage.get(("ListUsers"));
    }

  }

  setInfoUtilisateur(){
    this.getItems().then(items => {
      if(items == null){
        this.param.utilisateur = null;
      }
      else{
        this.param.utilisateur = items
      }
    });
  }

  setListeUtilisateurs(){
    this.getItems2().then(items => {
      if(items == null){
        this.param.listeUtilisateurs = [];
      }
      else{
        this.param.listeUtilisateurs = items
      }
    });
  }

}
