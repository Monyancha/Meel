import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ],
})
export class LoginPage implements OnInit {
  @Input() events: any;

  public username: string;
  public password: string;
  public isUsernameValid: boolean;
  public isPasswordValid: boolean;

  private mainButtonText = "LOGIN";
  private createAccountText = "Don't have an account?";

  constructor(
    public toastController: ToastController,
    private authService: AuthenticationService,
    private router : Router) { 
    this.isUsernameValid = true;
    this.isPasswordValid = true
  }

  ngOnInit() {
  }

  login(username : string, password : string) {
    if( username.length == 0 || password.length == 0){
      this.presentToast("Please fill in the username and password. \n");
    } else {
      if(this.mainButtonText == "LOGIN"){
        this.authService.login(username, password);
      } else {
        this.authService.login(username, password);
      }
    }
  }

  register() {
    if(this.mainButtonText == "LOGIN") {
      this.mainButtonText = "REGISTER";
      this.createAccountText = "Already have an account?";
      // this.presentToast("Please fill in username and password to create an account.")
    } else {
      this.mainButtonText = "LOGIN";
      this.createAccountText = "Don't have an account?";
      // this.presentToast("Please fill in username and password to create an account.")
    }
  }

  pswReset() {
    this.presentToast("Function not implemented")
  }

  async presentToast(msg : string) {
    const toast = await this.toastController.create({
      color: 'medium',
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
