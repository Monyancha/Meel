
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

// --- 3rd Auth Service ---
// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
// --- 3rd Auth Service ---

import { User } from '../model/users'

const TOKEN_KEY = 'auth-token';

localStorage.setItem('token', TOKEN_KEY);

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  authenticationState = new BehaviorSubject(false);
  readonly apiUrl = 'http://localhost:8080';

  constructor(
    private storage: Storage, 
    private plt: Platform,
    // public fb: Facebook,
    private http: HttpClient) 
    {
      this.plt.ready().then(() => {
        this.checkToken();
      });
    }
 
  checkToken() {
    this.authenticationState.next(false);
    // this.storage.get(TOKEN_KEY).then(res => {
    //   if (res) {
    //     this.authenticationState.next(true);
    //   }
    // })
  }

  register(username : string, password : string) {
    console.log("Registeration Sent: ", username, ":", password);
    this.http.post(this.apiUrl + '/register', 
    {}, { params: {'username': username, 'password': password }})
    .subscribe(response => {
      console.log("Registeration Resonse:", response);
      
    })
  }
 
  login(usrname : string, password : string) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(usrname + ":" + password)
      })
    };

    this.http.get(this.apiUrl + '/login/' + usrname, httpOptions)
    .subscribe(response => {
      console.log(response);
      
    })

    // console.log(answer)

      // .pipe(
        // tap(_ => this.log('login')),
        // catchError(this.handleError('login', []))
      // );
    // return this.authenticationState.next(true);
    // return this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => {
    //   this.authenticationState.next(true);
    // });

  }

// Native FB Calls
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
    this.authenticationState.next(false);
    // return this.storage.remove(TOKEN_KEY).then(() => {
    //   this.authenticationState.next(false);
    // });
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

