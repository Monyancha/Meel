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

  login(username : string, password : string) {
    if( username.length == 0 || password.length == 0){
      this.presentToast("LOGIN: Please fill in the username and password. \n");
    } else {
      this.authService.login(username, password);
    }
  }

  register() {
    this.router.navigate(['register']);
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
      position: 'bottom',
    });
    toast.present();
    console.log("login.component: toast posting: [" + msg + "]")
  }
}
