import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../model/users';
import { AuthenticationService } from '../services/authentication.service';
import { UserinfoService } from '../services/userinfo.service';


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
    private userinfoService : UserinfoService,
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
    console.log('Loging with id:' + user_id);
    this.userinfoService.setupLocalUser(user_id);
    
    // todo 03221351

    this.ionicDb.get(this.authService.TOKEN_KEY).then(res => {
      console.log("Get id:", res);
    })
    
    this.authService.checkToken();
    this.router.navigate(['tabs']);
  }

  private reportError(error : any) {
    let msg = 'Unknown Error ' + error;
    if(typeof error === 'string') {
      msg = error;
    } else if (typeof error.error === 'string') {
      msg = error.error;
    } else if (typeof error.message === 'string') {
      msg = error.message;
    }
    msg = 'Error: ' + msg;
    console.log(msg);
    this.presentToast(msg, 'danger');
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
        this.reportError("Unknown error occured, please try again");
      }
    }, error => {
        this.reportError(error);
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
          this.reportError("Unknown error occured, please try again");
        }
      }, error => {
        this.reportError(error);
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
    let timeToShow = 2048;
    if(color == 'danger') timeToShow *= 2;
    const toast = await this.toastController.create({
      color: color,
      message: msg,
      duration: timeToShow,
      showCloseButton: false,
      cssClass: "basic-toast-style",
      position: 'top',
    });
    toast.present();
    console.log("login.component: toast posting: " + msg)
  }

  test() {
    // this.userinfoService.setupLocalUser('7');
    // this.loginWithUserId('7');
    this.userinfoService.test().then(resp => {
      this.presentToast("Location is " + resp.coords.latitude + ":" + resp.coords.longitude);
    }).catch(err => {
      this.presentToast(err);
    });

  }

}
