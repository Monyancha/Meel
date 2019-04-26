import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';


import { Invitation } from '../model/invitation';
import { AuthenticationService } from '../services/authentication.service';
import { UserinfoService } from '../services/userinfo.service';

@Injectable({
  providedIn: 'root'
})
export class InvitationProviderService {

  /*
   * Invitation Provider
   *  provide sent/received/accepted and past invitation list ...
   *  provide APIs for sent/accept/decline etc
   */

  public sent_ivts: Invitation[] = [];
  public recv_ivts: Invitation[] = [];
  public acpt_ivts: Invitation[] = [];

  constructor(
    private authenService : AuthenticationService,
    private http : HttpClient,
    private userinfoService : UserinfoService,
  ) {}

  /*
   * API Function, send invitation body to server
   */
  sentInvitation(ivtBody : any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.authenService.apiUrl + "/eatLater/sendInvitation", 
        ivtBody, {responseType : "text"})
      .toPromise()
      .then(res => resolve(res))
      .catch(err => reject(err));
      setTimeout(() => reject("Error Sending Invitation: Timeout"), 5000);
    });
  }

  /*
   * API Function, inform server that an invitation is accepted
   */
  acceptInvitation(ivt_id : string) {
    console.log("Sending accept invitation, id = ", ivt_id);
    return new Promise((resolve, reject) => {
      this.http.post(this.authenService.apiUrl + "/invitation/accept", {},
      {params : {"invitation_id" : ivt_id}, responseType : "text"})
      .toPromise()
      .then((res) => {
        console.log("Accept Invitation: success ", res);
        resolve(true);
      })
      .catch((err) => {
        console.log("Accept Invitation: failed ", err);
        reject(err);
      });
      setTimeout(() => reject("Error accepting invitation: Timeout"), 5000);
    });
  }

  /*
   * API Function, fetch new invitation list (new/old etc..)
   */
  getNewList(sub_api : string) : Promise<Invitation[]> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(this.authenService.apiUrl + sub_api + this.userinfoService.user.id)
      .toPromise()
      .then((res) => {
        console.log("New list ${sub_api} received:");
        res = res as Invitation[];
        console.table(res);
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
      setTimeout(() => reject("Error fetching invitation list: Timeout"), 5000);
    });
  }

  /*
   * Convert a formatted date into readable string to display
   */
  readableDate(dateStr : string) : string {
    let date = new Date();
    let slot = dateStr.split('-');
    date.setFullYear(Number(slot[0]));
    date.setMonth(Number(slot[1]) - 1, Number(slot[2]));
    date.setHours(Number(slot[3]), Number(slot[4]));
    let now = new Date();
    var front : string;
    if(date.getFullYear() != now.getFullYear()) 
    {
      front = formatDate(date, "MMM d, yyyy", 'en-US');
    } 
    else if (date.getMonth() != now.getMonth())
    {
      front = formatDate(date, "MMM d(E)", 'en-US');
    }
    else if (date.getDay() == now.getDay())
    {
      front = "Today";
    } 
    else if (date.getDay() == now.getDay() + 1)
    {
      front = "Tomorrow";
    } 
    else
    {
      front = formatDate(date, "MMM d(E)", 'en-US');
    }
    return front;
  }

  /*
   * Convert formatted date into readable string to display
   */
  readableHour(startStr : string, endStr : string) : string {
    let start = new Date(), end = new Date();
    
    var slot = startStr.split('-');
    start.setMonth(Number(slot[1]) - 1, Number(slot[2]));
    start.setHours(Number(slot[3]), Number(slot[4]));
    
    slot = endStr.split('-');
    end.setMonth(Number(slot[1]) - 1, Number(slot[2]));
    end.setHours(Number(slot[3]), Number(slot[4]));

    var tail = formatDate(start, "hh:mm aa", "en-US");
    tail += " to " + formatDate(end, "hh:mm aa", "en-US");

    if(start.getDay() != end.getDay())
    {
      tail += "(tmw)";
    }
    
    return tail;
  }

}

