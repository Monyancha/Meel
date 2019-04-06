
import { Platform, Config } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

// --- 3rd Auth Service ---
// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
// --- 3rd Auth Service ---

import { ToastMessagingService } from '../services/toastmessaging.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  /*
   * A behavior object representing a boolean state
   * of whether the current user is authenticated.
   */
  authenticationState = new BehaviorSubject(false);

  readonly apiUrl = 'http://142.93.121.23:8080';
  readonly TOKEN_KEY = 'current_user';

  constructor(
    public ionicDb: Storage, 
    private plt: Platform,
    private toastMessager: ToastMessagingService,
    // public fb: Facebook,
    private http: HttpClient)
    {
      this.plt.ready().then(() => {
        this.checkToken();
      });
    }
  
  /*
   * Update authenticatiin state by checking if TOKEN_KEY exists
   */
  checkToken() {
    this.authenticationState.next(false);
    this.ionicDb.get(this.TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }

  /*
   * 
   */
  getTokenKey() {
    return this.ionicDb.get(this.TOKEN_KEY);
  }

  /*
   * Return an observable that returns user id upon successfull login
   * or a error message if failed, timeout at 5000ms.
   */
  login(email : string, password : string) {
    return new Observable((observer) => {
      // const httpOptions = {
      //   headers: new HttpHeaders({
      //     'Content-Type':  'application/json',
      //     'Authorization': 'Basic ' + btoa(email + ":" + password)
      //   }),
      // };
      let url = this.apiUrl + '/login';
      console.log("Sending login request {", email, ":", password + "} to ", url);
      this.http.post<string>(url, {}, {params: {'email': email, 'password': password}})
      .subscribe(
        (res) => {
        console.log("Login response received: ", res);
        observer.next(res);
        observer.complete()
      }, (err) => {
        observer.error(err);
        observer.complete()
      });

      setTimeout(() => {
        observer.error("Request timeout, please try again");
      }, 8000);
    });
  }

  /*
   * Return an observable that returns user id upon successfull register
   * or a error message if failed, timeout at 5000ms.
   */
  register(email : string, password : string) {
    return new Observable((observer) => {
      console.log("Registeration Sent: ", email, ":", password);
      this.http.post<string>(this.apiUrl + '/register', {},
      { params: {'username': email, 'email': email, 'password': password }})
      .subscribe((res) => {
        console.log("Registeration response: ", res);
        this.toastMessager.presentToast("User created!");
        observer.next(res);
        observer.complete()
      }, (err) => {
        observer.error(err);
        observer.complete()
      });

      setTimeout(() => {
        observer.error("Request timeout, please try again");
      }, 8000);
    });
  }

  /*
   * Remove TOKEN_KEY to logout.
   * WARNING: need to clear other information stored in memory or localstorage.
   */
  logout() {
    return this.ionicDb.remove(this.TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  /*
   * getter function
   */
  isAuthenticated() {
    return this.authenticationState.value;
  }

  /*
   * todo
   */
  loginWithFacebook(){
    // // Login with permissions
    // this.fb.login(['public_profile', 'user_photos', 'email', 'user_birthday'])
    // .then( (res: FacebookLoginResponse) => {

    //     // The connection was successful
    //     if(res.status == "connected") {

    //         // Get user ID and Token
    //         var fb_id = res.authResponse.userID;
    //         var fb_token = res.authResponse.accessToken;

    //         // Get user infos from the API
    //         this.fb.api("/me?fields=name,gender,birthday,email", []).then((user) => {

    //             // Get the connected user details
    //             var gender    = user.gender;
    //             var birthday  = user.birthday;
    //             var name      = user.name;
    //             var email     = user.email;

    //             console.log("=== USER INFOS ===");
    //             console.log("Gender : " + gender);
    //             console.log("Birthday : " + birthday);
    //             console.log("Name : " + name);
    //             console.log("Email : " + email);

    //             // => Open user session and redirect to the next page
    //         });
    //     } 
    //     // An error occurred while loging-in
    //     else {
    //         console.log("An error occurred...");
    //     }
    // })
    // .catch((e) => {
    //     console.log('Error logging into Facebook', e);
    // });
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }

}

