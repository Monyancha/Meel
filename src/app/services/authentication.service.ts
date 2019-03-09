
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

import { User } from '../model/users'

const TOKEN_KEY = 'auth-token';

localStorage.setItem('token', TOKEN_KEY);

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  authenticationState = new BehaviorSubject(false);
  static readonly apiUrl = 'http://localhost:8080';
 
  constructor(
    private storage: Storage, 
    private plt: Platform,
    private http: HttpClient) {
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
 
  login(usrname : string, password : string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(usrname + ":" + password)
      })
    };

    this.http.get(this.apiUrl + '/login/' + usrname, httpOptions).subscribe((response) => {
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

