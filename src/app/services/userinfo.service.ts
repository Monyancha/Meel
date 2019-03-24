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

  public user = new User;

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient,
    private ionicDb: Storage,
    private geolocation: Geolocation,
  ) {}

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
      this.storeUserProfile();
      console.log("User geolocation updated.");
    }).catch( err => {
      console.log("Error: User geolocation update failed: ", err);
    })
  }

  updateUsername(username : string) {
    this.user.username = username;
    this.storeUserProfile();
  }

  // Grab latest user profile from server side
  getLatestUserProfile() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.http.get<any>(this.authService.apiUrl + '/userProfile/' + this.user.id)
        .subscribe(response => {
    
          // todo: add and use more info
          this.user.major   = response.major;
          this.user.gender  = response.gender;
          this.user.age     = response.age;

          resolve(true);
        }, error => {
          console.log("User profile storing error: ", error);
          reject(error);
        });
      }, 1000);
    })
  }

  // Store data in memory to ionic db
  storeUserProfile() {
    return this.ionicDb.set(this.authService.TOKEN_KEY, this.user);
  }

  test() : Promise<Geoposition> {
    return this.geolocation.getCurrentPosition();
  }


}
