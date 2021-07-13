import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl, AbstractControl} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertController, IonSlides, LoadingController} from "@ionic/angular";
import {ParamService} from "../param.service";
import {ChatService} from "../chat.service";
import {CameraService} from "../camera.service";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {

  formGroup: FormGroup;
  formGroup2: FormGroup;
  mot: string;
  isMatch = false;
  @Input() cPass: string;

  passwordType: string = "password";
  passwordIcon: string = "eye-off";

  selectedSlide: any;
  segment = 0;

  slideOps = {
    initialSlide: 0,
    slidePrev: 1,
    speed: 400
  };

  photoPath = "maPhoto";

  langue: string = "Francais";

  constructor(private authService: AuthenticationService, private camera: CameraService, private loadingController: LoadingController, private chatService: ChatService, private alertController: AlertController, private param: ParamService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.photoPath = this.param.monProfile;
    this.formGroup = this.formBuilder.group({
      name:["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required,  Validators.pattern("6+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]+[0-9]"),  Validators.max(699999999)]]
    });

    this.formGroup2 = this.formBuilder.group({
      password2: ["", [Validators.required, Validators.minLength(6)]],
      email2: ["", [Validators.required, Validators.email]],
    });

    this.param.setParametre(this.langue);
    this.camera.loadSaved();
  }


  passworsIsMatch(){
    if(this.formGroup.get("password").value.toString() === this.cPass)
      this.isMatch = true;
    else
      this.isMatch = false;
  }

  isValidNumber(fieldControl: FormControl)
  {
    if(this.formGroup){
      return (fieldControl.value.toString().length === 10) ? null:{
        NotEqual: true
      };
    }
  }

  MatchPassword(fieldControl: FormControl)
  {
    if(this.formGroup){
      return (fieldControl.value.toString().length == 10) ? null:{
        NotEqual: true
      };
    }
  }

  peutPasser()
  {
    if(this.formGroup.get("phone").value.length > 0)
    {
      return true;
    }
    else return false;
  }

  hideShowPassword()
  {
    this.passwordType = this.passwordType === "text" ? "password" : "text";
    this.passwordIcon = this.passwordIcon === "eye-off" ? "eye" : "eye-off"
  }

  onSubmit()
  {
    this.router.navigateByUrl("home")
  }

  async segmentChange(ev)
  {
    await this.selectedSlide.slideTo(this.segment);
  }

  //pour mettre a jour le content sur lequel on a slidé
  slidesChanged(slides: IonSlides)
  {
    this.selectedSlide = slides;
    slides.getActiveIndex().then(selectedindex =>{
      this.segment = selectedindex;
    })
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      cssClass: "secondary",
      header: this.param.getParametre().choisirLangue,
      buttons: [
        {
          text: this.param.getParametre().annuler,
          role: "cancel",
        },
        {
          text: this.param.getParametre().modifier,
          handler: data => {
            this.langue = JSON.stringify(data);
            this.param.setParametre(this.langue);
          }
        }
      ],
      inputs: [
        {
          type: "radio",
          name: "Francais",
          label: "Francais",
          value: "Francais",
          checked: this.estFrancais(),
        },
        {
          type: "radio",
          name: "English",
          label: "English",
          value: "English",
          checked: !this.estFrancais()
        }
      ]
    });

    await alert.present();
  }

  estFrancais(): boolean{
    if(this.langue.includes("Francais"))
      return true;
    else
      return false;
  }

  getSignedUpUser(){
    return {
      nom: this.formGroup.get("name").value,
      email: this.formGroup.get("email").value,
      telephone: this.formGroup.get("phone").value,
      motDePasee: this.formGroup.get("password").value
    }
  }

  getSignedInUser(){
    return {
      email: this.formGroup2.get("email2").value,
      motDePasee: this.formGroup2.get("password2").value
    }
  }

  affiche1()
  {
    alert(this.getSignedUpUser().nom + "\n" +
      this.getSignedUpUser().email + "\n" +
      this.getSignedUpUser().telephone + "\n" +
      this.getSignedUpUser().motDePasee);
  }

  affiche2()
  {
    alert(this.getSignedInUser().email + "\n" +
      this.getSignedInUser().motDePasee);
  }

  async signUp()
  {
    const loading = await this.loadingController.create();
    await loading.present();

    this.chatService.signUp(
      this.getEmail(),
    this.getPassword(),
    this.getPhoneNumber(),
    this.getPhoto(),
    this.getUsername()
    ).then(user => {
      loading.dismiss();
      this.router.navigateByUrl("/home", {replaceUrl: true});
      }, async err =>{
      loading.dismiss();
      const alert = await  this.alertController.create({
        header: "Sign up failed",
        message: err.message,
        buttons: ["OK"],
      });

      await alert.present();
      }
    );
  }

  getEmail(){
    return this.formGroup.get("email").value.toString().trim();
  }

  getPassword(){
    return this.formGroup.get("password").value.toString().trim();
  }

  getUsername(){
    return this.formGroup.get("name").value.toString().trim();
  }

  getPhoneNumber(){
    return this.formGroup.get("phone").value.toString().trim();
  }

  getPhoto(){
    return this.photoPath.toString().trim();
  }

  getEmail2(){
    return this.formGroup2.get("email2").value.toString().trim();
  }

  getPassword2(){
    return this.formGroup2.get("password2").value.toString().trim();
  }

  async signIn()
  {
    const loading = await this.loadingController.create();
    await loading.present;

    this.chatService.signIn(this.getEmail2(), this.getPassword2()).then(
      (res) => {
        loading.dismiss();
        this.router.navigateByUrl("/home", {replaceUrl: true});
      },
      async (err) => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: ":(",
          message: err.message,
          buttons: ["OK"],
        });

        await alert.present();
      }
    );
  }

  async signUp2(){
    const loading = await this.loadingController.create();
    await loading.present;
    this.authService.RegisterUser(this.getEmail(), this.getPassword(), this.getUsername(), this.photoPath, this.getPhoneNumber())
      .then((res) => {
        // Do something here
        this.authService.SendVerificationMail()
        this.router.navigate(['verify-email']);
      }).catch(async (error) => {
        loading.dismiss();
        const alert = await  this.alertController.create({
          header: "Sign up failed",
          message: error.message,
          buttons: ["OK"],
        });

        await alert.present();
    })
  }

  async SignIn2() {
    const loading = await this.loadingController.create();
    await loading.present;
    this.authService.SignIn(this.getEmail2(), this.getPassword2())
      .then(async (res) => {
        if(this.authService.isEmailVerified) {
          this.router.navigate(['dashboard']);
        } else {
          loading.dismiss();
          const alert = await this.alertController.create({
            header: "Email is not verified",
            message: "please check your email address",
            buttons: ["OK"],
          });

          await alert.present();
          return false;
        }
      }).catch(async (error) => {
      loading.dismiss();
      const alert = await this.alertController.create({
        header: ":(",
        message: error.message,
        buttons: ["OK"],
      });

      await alert.present();
    })
  }

  async filme() {
    console.log("On commence");
    this.camera.addNewToGallery();
  }
}

