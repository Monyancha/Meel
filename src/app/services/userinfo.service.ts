import { Injectable } from '@angular/core';
import { Platform, Config } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import {AuthenticationService} from './authentication.service';
import {User} from '../model/users';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  private user : User;

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient,
    private ionicDb: Storage,
  ) {}
  
  /*
   *  Set up the owner of current app,
   */
  setupLocalUser(user_id : string) {
    this.user = new User;
    this.user.id = user_id;
    this.http.get<any>(this.authService.apiUrl + '/userProfile/' + user_id)
    .subscribe(response => {

      // add more info to database
      this.user.major   = response.major;
      this.user.gender  = response.gender;
      this.user.age     = response.age;

      this.ionicDb.set(this.authService.TOKEN_KEY, this.user).then(res => {
        console.log('User profile stored:', res);
      });

    }, error => {
      console.log("User profile storing error: ", error);
    })
  }

  getUsername() : Promise<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.ionicDb.get(this.authService.TOKEN_KEY).then)
      })
    })
  }


  getUserId() {
    this.ionicDb.get(this.authService.TOKEN_KEY).then(res => {
      if(res){
        return res.id;
      } else {
        // todo: pull user information
        console.log("Userinfo.service.getUserId(): failed to get ID.");
        return -1;
      }
    }).catch(error => {
      console.log(error);
      return -1;
    })
  }

  updateUserProfile() {
    this.ionicDb.set(this.authService.TOKEN_KEY, this.user);
  }
  

}
