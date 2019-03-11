
import { Platform, Config } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

// --- 3rd Auth Service ---
// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
// --- 3rd Auth Service ---

import { User } from '../model/users'

const TOKEN_KEY = 'user_id';

localStorage.setItem('token', TOKEN_KEY);

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  authenticationState = new BehaviorSubject(false);
  readonly apiUrl = 'http://localhost:8080';

  constructor(
    public ionicDb: Storage, 
    private plt: Platform,
    // public fb: Facebook,
    private http: HttpClient) {
      this.plt.ready().then(() => {
        this.checkToken();
      });
    }
 
  checkToken() {
    this.authenticationState.next(false);
    this.ionicDb.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }

// Uncomment to use facebook login service
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

  logout() {
    return this.ionicDb.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}

