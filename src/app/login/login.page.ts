import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @Input() events: any;

  public username: string;
  public password: string;
  public isUsernameValid: boolean;
  public isPasswordValid: boolean;

  private inputPlaceholder = " Username";
  private mainButtonText = "LOGIN";
  private createAccountText = "Don't have an account?";
  private termTexts = "";
  
  constructor(
    public ionicDb: Storage, 
    public toastController: ToastController,
    private authService: AuthenticationService,
    private router : Router,
    private http: HttpClient,
    ) { 
    this.isUsernameValid = true;
    this.isPasswordValid = true
  }

  ngOnInit() {
  }

  login(username : string, password : string) {
    console.log("Login Sent: ", username, ":", password);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(username + ":" + password)
      }),
    };

    this.http.get<string>(this.authService.apiUrl + '/login/' + username, httpOptions)
    .subscribe(response => {
      console.log("Login response: ", response);
      if(response){
        this.ionicDb.set("user_id", response);
        this.router.navigate(['tabs']);
      } else {
        console.log("login Unknown error");
        this.presentToast("Unknown error occured");
      }
    }, error => {
      console.log("login.login() error: ", error, error.error);
      this.presentToast("Error: " + error + error.error);
    });
  }

  register(email : string, password : string) {
    console.log("Registeration Sent: ", email, ":", password);
    this.http.post<string>(this.authService.apiUrl + '/register', {},
      { params: {'username': email, 'email': email, 'password': password }})
      .subscribe(response => {
        console.log("Registeration response: ", response);
        if(response){
          this.ionicDb.set("user_id", response);
          this.presentToast("User created!");
          this.router.navigate(['tabs']);
        } else {
          console.log("login.register() Unknown error");
          this.presentToast("Unknown error occured");
        }
      }, error => {
        console.log("login.register() error: ", error, error.error);
        this.presentToast("Error: " + error + error.error);
      });
  }

  mainButton(username : string, password : string) {
    if( username.length == 0 || password.length == 0){
      this.presentToast("Please fill in the username/email and password. \n");
    } else {
      // todo Hash Password 

      // Sending Requests
      if(this.mainButtonText == "LOGIN"){
        this.login(username, password)
      } else {
        this.register(username, password);
      }
    }
  }

  loginWithFacebook() {
    this.presentToast("Function temporarily disabled due to test purpose")
    // this.authService.loginWithFacebook();
      // .then(
      //   () => this.router.navigate(['tabs']),
      //   error => console.log(error.message)
      // );
  }

  switchLoginRegister() {
    if(this.mainButtonText == "LOGIN") {
      this.mainButtonText = "REGISTER";
      this.inputPlaceholder = " Email";
      this.createAccountText = "Already have an account?";
      this.termTexts = "By tapping Register,you agree with our <b><u>Terms of Services</u></b> and <b><u>Privacy Ploicy</u></b>."
    } else {
      this.mainButtonText = "LOGIN";
      this.inputPlaceholder = " Username";
      this.createAccountText = "Don't have an account?";
      this.termTexts = "";
    }
  }

  pswReset() {
    this.presentToast("Function not implemented")
  }

  async presentToast(msg : string) {
    const toast = await this.toastController.create({
      color: 'dark',
      message: msg,
      duration: 5000,
      showCloseButton: false,
      cssClass: "logintoast",
      position: 'top',
    });
    toast.present();
    console.log("login.component: toast posting: [" + msg + "]")
  }
}
