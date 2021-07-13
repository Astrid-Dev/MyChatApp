import { Injectable } from '@angular/core';
import {ModalController, PopoverController} from "@ionic/angular";
import {ParametreComponent} from "./parametre/parametre.component";
import {InfoModalComponent} from "./info-modal/info-modal.component";
import {User} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class ParamService {

  public parametre: any;
  public utilisateur: User;
  estNouveauGroupe = false;
  public monProfile = 'data:image/png;base64,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'
  public listeUtilisateurs:User[] = [];
  public peutAfficher = false;
  dernierMessage = "";
  peutCompter = true;

  public parametreFrancais = {
    parametre: "Paramètres",
    nouvGroupe: "Nouveau groupe",
    nouvDiffusion: "Nouvelle diffusion",
    appWeb: "MyChatApp Web",
    msgImportant: "Messages importants",
    confiStatut: "Confidentialité du statut",
    effaceJournal: "Effacer le journal d'appels",
    compte: "Compte",
    descripCompte: "Confidentialité, sécurité, changer num.",
    notif: "Notifications",
    descripNotif: "Sonneries des messages, groupes et appels",
    discuss: "Discussions",
    descripDiscuss: "Thèmes, fonds d'écran, historique des discussions",
    langue: "Langue",
    descripLangue: "Francais, English",
    aide: "Aide",
    descripAide: "Centre d'aide, contactez-nous, politique, confidentialité",
    invite: "Inviter un(e) ami(e)",
    confident: "Confidentialité",
    securite: "Sécurité",
    verif: "Vérification en deux étapes",
    changeNum: "Changer de numéro",
    demandeInfoCompte: "Demander infos compte",
    suppCompte: "Supprimer mon compte",
    profil: "Profil",
    infoNomUtilisateur: "Ce n'est pas votre nom d'utilisateur ou code d'accès. Ce nom sera visible par vos contacts MyChatApp",
    nom: "Nom",
    actu: "Actu",
    telephone: "Téléphone",
    theme: "Thème",
    fondDEcran: "Fond d'écran",
    choisirLangue: "Choisissez une langue",
    annuler: "Annuler",
    modifier: "Modifier",
    disc: "DISC.",
    statut: "STATUT",
    appel: "APPELS",
    clair: "Clair",
    sombre: "Sombre",
    choisirTheme: "Choisir un thème",
    inscription: "INSCRIPTION",
    connectioon: "CONNEXION",
    nomUser: "Nom d'utilisateur:",
    email: "E-mail:",
    fauxNomUser: "Veuillez renseigner votre nom d'utilisateur",
    pasDeMail: "Veuillez renseigner votre adresse mail",
    fauxMail: "Cette adresse est invalide",
    telephone2: "Téléphone:",
    pasDeTelephone: "Veuillez renseigner votre numéro de téléphone",
    fauxTelephone: "Ce numéro de téléphone est invalide",
    motDePasse: "Mot de passe:",
    pasDeMotDePasse: "Veuillez renseigner votre mot de passe",
    fauxMotDePasse: "Le mot de passe doit avoir au moins 6 caractères",
    sinscrire: "S'inscrire",
    fauxMotDePasse2: "Votre mot de passe comporte au moins 6 caractères, rappelez-vous!",
    seconnecter: "Se connecter",
    motDePasseOublie: "Mot de passe oublié ?",
    a: "EEEE dd MMMM yyyy 'à' HH:mm",
    infos: "Infos",
    listeMedia: "Lister les médias",
    bloquer: "Bloquer",
    entrerMessage: "Entrez votre message",
    monStatut: "Mon statut",
    ajouteStatut: "Cliquez pour ajouter un statut",
    ecrireStatut: "Ecrivez un statut",
    contacts: "Contacts",
    ajouterParticipant: "Ajouter des participants",
    nouvContact: "Nouveau contact",
    nouvGroup: "Nouveau groupe"

  };

  public parametreAnglais = {
    parametre: "Settings",
    nouvGroupe: "New group",
    nouvDiffusion: "New diffusion",
    appWeb: "MyChatApp Web",
    msgImportant: "Important messages",
    confiStatut: "Conf. of the status",
    effaceJournal: "Delete call log",
    compte: "Account",
    descripCompte: "Privacy, Security, Change num.",
    notif: "Notifications",
    descripNotif: "Message tones, groups and calls",
    discuss: "Discussions",
    descripDiscuss: "Theme, wallpaper, discussions history",
    langue: "Language",
    descripLangue: "English, Francais",
    aide: "Help",
    descripAide: "Help center, contact us, politics, confidentiality",
    invite: "Invite a friend",
    confident: "Confidentiality",
    securite: "Security",
    verif: "Verification in two steps",
    changeNum: "Change number",
    demandeInfoCompte: "Request info Account",
    suppCompte: "Delete my account",
    profil: "Profile",
    infoNomUtilisateur: "This is not your username or access code. This name will be visible to your MyChatApp contacts",
    nom: "Name",
    actu: "News",
    telephone: "Phone",
    theme: "Theme",
    fondDEcran: "Wallpaper",
    choisirLangue: "Choose a language",
    annuler: "Cancel",
    modifier: "Modify",
    disc: "CHATS",
    statut: "STATUS",
    appel: "CALLS",
    clair: "Light",
    sombre: "Dark",
    choisirTheme: "Choose a theme",
    inscription: "REGISTRATION",
    connectioon: "LOG IN",
    nomUser: "Username",
    email: "E-mail:",
    fauxNomUser: "Please fill in your username",
    pasDeMail: "Please fill in your email address",
    fauxMail: "This address is invalid",
    telephone2: "Phone number:",
    pasDeTelephone: "Please fill in your phone number",
    fauxTelephone: "This phone number is invalid",
    motDePasse: "Password:",
    pasDeMotDePasse: "Please fill in your password",
    fauxMotDePasse: "The password must have at least 6 characters",
    sinscrire: "Sign up",
    fauxMotDePasse2: "Your password has at least 6 characters, remember!",
    seconnecter: "Sign in",
    motDePasseOublie: "forgotten password ?",
    a: "EEEE dd MMMM yyyy 'at' HH:mm",
    infos: "Informations",
    listeMedia: "List the media",
    bloquer: "Block",
    entrerMessage: "Type a message",
    monStatut: "My status",
    ajouteStatut: "Click to add a status",
    ecrireStatut: "Write a status",
    contacts: "Contacts",
    ajouterParticipant: "Add participants",
    nouvContact: "New contact",
    nouvGroup: "New group"
  };
  public langue: string;
  constructor(private modalController: ModalController) {
    this.langue = "English";
    this.setParametre(this.langue);
  }

  getParametre(){
    return this.parametre;
  }

  setParametre(langue: string)
  {
    this.langue = langue;
    if(langue.includes("Francais")){
      this.parametre = this.parametreFrancais;
    }
    else if(langue.includes("English")) {
      this.parametre = this.parametreAnglais;
    }
  }

  async ouvreParametre(){
    const modal = await this.modalController.create({
      component: ParametreComponent
    });

    await modal.present();
  }

  fermerParametre(){
    this.modalController.dismiss();
  }

}
