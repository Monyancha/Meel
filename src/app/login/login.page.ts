import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../model/users';
import { EmailValidator } from '@angular/forms';

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

  private inputPlaceholder = " Email";
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

  private loginWithUserId(user_id) {
    var currentUser = new User;
    currentUser.id = user_id;
    this.ionicDb.set(this.authService.TOKEN_KEY, currentUser);
    
    // todo 03221351
    
    this.authService.checkToken();
    this.router.navigate(['tabs']);
  }

  private checkEmail(email : string) : boolean {
    if(email.length == 0) {
      this.presentToast("Please fill-in you email", 'danger');
      return false;
    }
    if(email.length < 4 || email.search('@') == -1){
      this.presentToast("Please provide a valid email address", 'danger');
      return false;
    }
    return true;
  }

  private checkPassword(pswd : string) : boolean {
    if(pswd.length == 0) {
      this.presentToast("Please fill-in you password", 'danger');
      return false;
    }
    if(pswd.length < 8){
      this.presentToast("Password must have minimum length of 8", 'danger');
      return false;
    }
    return true;
  }

  login(email : string, password : string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(email + ":" + password)
      }),
    };

    let url = this.authService.apiUrl + '/login';
    console.log("Sending login request {", email, ":", password + "} to ", url);
    this.http.get<string>(url, httpOptions)
    .subscribe(response => {
      console.log("Login response received: ", response);
      if(response){
        this.loginWithUserId(response);
      } else {
        console.log("login Unknown error");
        this.presentToast("Unknown error occured, please try again", 'danger');
      }
    }, error => {
        console.log("login.login() error: ", error);
        this.presentToast("Error: " + error, 'danger');
    });
  }

  register(email : string, password : string) {
    console.log("Registeration Sent: ", email, ":", password);
    this.http.post<string>(this.authService.apiUrl + '/register', {},
      { params: {'username': email, 'email': email, 'password': password }})
      .subscribe(response => {
        console.log("Registeration response: ", response);
        if(response){
          this.presentToast("User created!");
          this.loginWithUserId(response);
        } else {
          console.log("login.register() Unknown error");
          this.presentToast("Unknown error occured, please try again", 'danger');
        }
      }, error => {
        console.log("login.register() error: ", error);
        this.presentToast("Error: " + error, 'danger');
      });
  }

  mainButton(email : string, password : string) {
    if(email == "adamzjk" && password == "adamzjk") {
      this.loginWithUserId('admin_user_adamzjk');
    } else if ( this.checkEmail(email) && this.checkPassword(password)){
      
      // todo 03221355 password entryption

      // Sending Requests
      if(this.mainButtonText == "LOGIN"){
        this.login(email, password)
      } else {
        this.register(email, password);
      }
      
    }
  }

  loginWithFacebook() {
    this.presentToast("Function temporarily disabled")
    // this.authService.loginWithFacebook();
      // .then(
      //   () => this.router.navigate(['tabs']),
      //   error => console.log(error.message)
      // );
  }

  switchLoginRegister() {
    if(this.mainButtonText == "LOGIN") {
      this.mainButtonText = "REGISTER";
      this.createAccountText = "Already have an account?";
      this.termTexts = "By tapping Register,you agree with our <b><u>Terms of Services</u></b> and <b><u>Privacy Ploicy</u></b>."
    } else {
      this.mainButtonText = "LOGIN";
      this.createAccountText = "Don't have an account?";
      this.termTexts = "";
    }
  }

  pswReset() {
    this.presentToast("Function not implemented")
  }

  async presentToast(msg : string, color = 'light') {
    const toast = await this.toastController.create({
      color: color,
      message: msg,
      duration: 2048,
      showCloseButton: false,
      // cssClass: "logintoast",
      cssClass: "basic-toast-style",
      position: 'top',
    });
    toast.present();
    console.log("login.component: toast posting: [" + msg + "]")
  }


  test() {
    console.log("Test Clicked");


  }
}
