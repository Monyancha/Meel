import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UserinfoService } from '../services/userinfo.service';

@Injectable({
  providedIn: 'root'
})
export class YelpRcmdService {

  apiKey = "dWdzPKk5F7O45Zw1WXKXSPfqQNRHBGQzPVeLYTShNmLehA_TbI0UmPXYzOw_xSmK9mHW6LMcXQ8W3tM2rbNEZGI08R_PePt73N1I2UkfuiAR7-y50u6R-TiojU2wXHYx"

  constructor(
    private http: HttpClient,
    private userinfoService : UserinfoService,
  ) { 
  }

  getNearbyRestaurant(lat : number, lng : number) : Promise<Object[]> {
    console.log("yelp-rcmd: Refreshing yelp restaurants: ", lat, lng);
    return new Promise((resolve, reject) => {
      var timer = setTimeout(() => {
        reject("Fecting restaurants failed due to timeout.");
        console.log("yelp-rcmd: Refresh timeout");
      }, 10000);
      this.http.get("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search", {
        headers: {
          "accept": "application/json",
          "x-requested-with": "xmlhttprequest",
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization',
          "Authorization" : "Bearer " + this.apiKey,
        },
        params: {
          'term' : "restaurants",
          'latitude': lat.toString(),
          'longitude': lng.toString(),
          'limit' : "20",
          'radius' : "3000"
        }
      })
      .toPromise()
      .then((res : any) => {
        console.log("yelp-rcmd: Refresh response received: ", res);
        res = res.businesses as Object[];
        resolve(res);
      })
      .catch((err : any) => {
        console.log("yelp-rcmd: Refresh error: ", err);
        reject(err)
      })
      .finally(() => clearTimeout(timer) );
    });
  }


}
