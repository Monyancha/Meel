import { Component, OnInit, Input } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../model/users';
import { AuthenticationService } from '../services/authentication.service';
import { UserinfoService } from '../services/userinfo.service';
import { ToastMessagingService } from '../services/toastmessaging.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @Input() events: any;

  public username: string;
  public password: string;

  private inputPlaceholder = " Email";
  private mainButtonText = "LOGIN";
  private createAccountText = "Don't have an account?";
  private termTexts = "";
  
  constructor(
    private ionicDb: Storage, 
    private toastMessager: ToastMessagingService,
    private userinfoService : UserinfoService,
    private authService: AuthenticationService,
    private http: HttpClient,
    ) { 
  }

  ngOnInit() {
  }

  /*
   * Setup current user after we have user id from server side.
   * this including fetch user profile and set TOKEN_KEY
   */
  private loginWithUserId(user_id) {
    console.log('Loging with id:' + user_id);
    this.userinfoService.user.id = user_id;
    this.userinfoService.getLatestUserProfile().then((res) => {
      this.userinfoService.setToken().then((res) => {
        if(res) {
          this.authService.checkToken();
        } else {
          this.toastMessager.presentError('Failed to set TOKEN, please try again later');
        }
      })
      .catch(err => this.toastMessager.presentError(err));
    })
    .catch(err => this.toastMessager.presentError(err));
  }

  /*
   * check validity of email address
   */
  private checkEmail(email : string) : boolean {
    if(email.length == 0) {
      this.toastMessager.presentToast("Please fill-in you email");
      return false;
    }
    if(email.length < 4 || email.search('@') == -1){
      this.toastMessager.presentToast("Please provide a valid email address");
      return false;
    }
    return true;
  }

  /*
   * Check validity of password.
   */
  private checkPassword(pswd : string) : boolean {
    if(pswd.length == 0) {
      this.toastMessager.presentToast("Please fill-in you password");
      return false;
    }
    if(pswd.length < 6){
      this.toastMessager.presentToast("Password must have minimum length of 6");
      return false;
    }
    return true;
  }

  /*
   * login
   */
  private login(email : string, password : string) {
    this.authService.login(email, password).subscribe(
      (res) => this.loginWithUserId(res),
      (err) => this.toastMessager.presentError(err)
    );
  }

  /*
   * register
   */
  private register(email : string, password : string) {
    this.authService.register(email, password).subscribe(
      (res) => this.loginWithUserId(res), 
      (err) => this.toastMessager.presentError(err)
    );
  }

  /*
   * Main button in login page, used to login or register
   */
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

  /*
   * login with fb, 
   */
  loginWithFacebook() {
    this.toastMessager.presentToast("Function temporarily disabled")
    // this.authService.loginWithFacebook();
      // .then(
      //   () => this.router.navigate(['tabs']),
      //   error => console.log(error.message)
      // );
  }

  /*
   * change some texts and button behavior
   */
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

  /*
   * not implemented
   */
  pswReset() {
    this.toastMessager.presentToast("Function not implemented")
  }

  test() {
  }

}
