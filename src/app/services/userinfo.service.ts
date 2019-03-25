import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpResponse } from '@angular/common/http';
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
    private plt: Platform,
    private geolocation: Geolocation,
  ) {
    this.plt.ready().then(() => {
      this.authService.getTokenKey().then((res) => {
        if(res) {
          this.user.id = res;
          this.getLatestUserProfile();
        }
      });
    });
  }

  /*
   * Store TOEN_KEY(currently is user id) into ionic db
   * TOKEN_KEY is required for authentication service
   */
  setToken() {
    return this.ionicDb.set(this.authService.TOKEN_KEY, this.user.id);
  }
  
  /*
   * Return a promise of latest geoposition
   * Position data in res.coords.latitude and res.coords.longitude
   */
  getCurrentPosition() : Promise<Geoposition> {
    return this.geolocation.getCurrentPosition();
  }

  /*
   * Update user's GPS location
   */
  updateUserPosition() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.user.longitude = resp.coords.latitude;
      this.user.latitude = resp.coords.longitude;
      this.setToken();
      console.log("User geolocation updated.");
    }).catch((err) => {
      console.log("Error: User geolocation update failed: ", err);
    })
  }

  /*
   * Get latest user profile data from server side
   * Timeout at 3000ms
   */
  getLatestUserProfile() {
    return new Promise((resolve, reject) => {
      this.http.get<any>(this.authService.apiUrl + '/userProfile/' + this.user.id)
      .subscribe(response => {
  
        // todo: add and use more info
        this.user.major   = response.major;
        this.user.gender  = response.gender;
        this.user.age     = response.age.toString();

        resolve(true);
      }, error => {
        console.log("User profile storing error: ", error);
        reject(error);
      });
      setTimeout(() => reject("Request timeout, please try again") , 3000);
    });
  }

  /*
   * Post current user profile to server side
   */
  uploadUserProfile() {
    return new Promise((resolve, reject) => {
      console.log("Uploding request sent: ", this.user.toJSON());
      this.http.post(this.authService.apiUrl + '/updateProfile', {}, 
      {params: this.user.toJSON(), responseType: 'text'})
      .subscribe((response) => {
        console.log(response);
        resolve(true);
      }, (error) => {
        console.log("Update profile error: ", error);
        reject(error);
      });
      setTimeout(() => reject("Request timeout, please try again") , 3000);
    });
  }

  /*
   * Test function..
   */
  test() : Promise<Geoposition> {
    return this.geolocation.getCurrentPosition();
  }

}
