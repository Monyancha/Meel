import { Injectable } from '@angular/core';
import { Platform, Config } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

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
    private geolocation: Geolocation,
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

  getUser() : Promise<any> {
    return this.ionicDb.get(this.authService.TOKEN_KEY)
  }

  getCurrentPosition() : Promise<Geoposition> {
    return this.geolocation.getCurrentPosition();
    // this.geolocation.getCurrentPosition().then((resp) => {
    //   console.log("Location: ", resp);
    //   console.log(resp.coords.latitude);
    //   console.log(resp.coords.longitude);
    //  }).catch((error) => {
    //    console.log('Error getting location', error);
    //  });
  }

  updateUserPosition() {
    this.geolocation.getCurrentPosition().then(resp => {
      this.user.longitude = resp.coords.latitude;
      this.user.latitude = resp.coords.longitude;
      this.updateUserProfile();
      console.log("User geolocation updated.");
    }).catch( err => {
      console.log("Error: User geolocation update failed: ", err);
    })
  }

  updateUsername(username : string) {
    this.user.username = username;
    this.updateUserProfile();
  }

  updateUserProfile() {
    this.ionicDb.set(this.authService.TOKEN_KEY, this.user);
  }
  
  test() : Promise<Geoposition> {
    return this.geolocation.getCurrentPosition();
  }


}
