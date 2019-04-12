import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Invitation } from '../model/invitation';
import { rcmdUserProfile } from '../model/rcmdUserProfile';
import { AuthenticationService } from '../services/authentication.service';
import { UserinfoService } from '../services/userinfo.service';

@Injectable({
  providedIn: 'root'
})
export class RecommendationProviderService {

  rcmmd_usrs: rcmdUserProfile[] = [];
  

  constructor(
    private authenService : AuthenticationService,
    private userinfoService : UserinfoService,
    private http: HttpClient,
  ) { 
  }

  /*
   * Return a sub-list of all recommended users
   */
  getRcmdList(start : number, end : number) : rcmdUserProfile[] 
  {
    if(start >= this.rcmmd_usrs.length) {
      return [];
    }
    if(end > this.rcmmd_usrs.length) {
      end = this.rcmmd_usrs.length;
    }
    return this.rcmmd_usrs.slice(start, end);
  }

  /*
   * API Function, fetch recommendation list from server
   */
  getEatLaterRcmdList(start: string, end : string) {
    console.log("RcmdService: Fecting (later)recommendation list..");
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.authenService.apiUrl + "/eatLater/recommendation", 
      {"userId" : this.userinfoService.user.id,  "startTime" : start, "endTime" : end})
      .toPromise()
      .then((response) => {
        console.log("Response received");
        console.table(response);
        response = response as rcmdUserProfile[];
        this.rcmmd_usrs = response;
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
      setTimeout(() => reject("Request timeout, please try again"), 5000);
    });
  }

  /*
   * API Function, fetch recommendation list from server, this is 
   * a bit longer than eat-later because eat now requires location.
   */
  getEatNowRcmdList() {
    console.log("RcmdService: Fecting (now)recommendation list..");
    return new Promise((resolve, reject) => {
      this.userinfoService.getCurrentPosition()
      .then((res) => {
        console.log("Geolocation received: ", res);
        let body = { 
          "uid" : this.userinfoService.user.id, 
          "latitude" : res.coords.latitude,
          "longitude" : res.coords.longitude,
          "lastUpdateTime" : res.timestamp.toString()
        };
        console.log("Sending eat-now rcmd list request:", body);
        this.http.post<any>(this.authenService.apiUrl + "/eatNow/recommendation", body)
        .toPromise()
        .then((response) => {
          console.log("Response received");
          console.table(response);
          response = response as rcmdUserProfile[];
          this.rcmmd_usrs = response;
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
        setTimeout(() => reject("Error Getting Eat-now Recommendation:\nRequest timeout, please try again"), 6000);
      })
      .catch((err) => {
        reject(err);
      })
    })
  }

  /*
   * Clear current list
   */
  clearAll() {
    this.rcmmd_usrs = [];
  }

}
