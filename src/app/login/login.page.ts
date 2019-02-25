import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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

  constructor(
    public toastController: ToastController,
    private authService: AuthenticationService,
    private router : Router) { 
    this.isUsernameValid = true;
    this.isPasswordValid = true
  }

  ngOnInit() {
  }

  login() {
    this.authService.login();
  }

  register() {
    this.router.navigate(['register']);
  }

  pswReset() {
    this.presentToast("Function Not Implemented!")
  }

  async presentToast(msg : string) {
    const toast = await this.toastController.create({
      color: 'light',
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
