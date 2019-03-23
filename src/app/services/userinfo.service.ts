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
   *  
   */
  setupLocalUser(user_id : string) {
    this.user = new User;
    this.user.id = user_id;

  }

  getUserId() {
    this.ionicDb.get(this.authService.TOKEN_KEY).then(res => {
      if(res){
        return res;
      } else {
        // todo: pull user information
        return null;
      }
    }).catch(error => {
      console.log("Userinfo.service.getUserId(): failed to get ID.")
      return null;
    })
  }

  updateUserProfile() {

  }
  

}
