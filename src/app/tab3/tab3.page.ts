import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import {trigger, transition, style, animate, keyframes, query, stagger} from '@angular/animations';

import { UserinfoService } from '../services/userinfo.service';
import { AuthenticationService } from '../services/authentication.service';
import { ToastMessagingService } from '../services/toastmessaging.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  animations: [
    trigger('cardEnter', [
      transition('* => *', [

      ])
    ])
  ]
})
export class Tab3Page {

  ipt_gender = 'other';
  showProgressBar = false;

  constructor(
    public ionicDb: Storage, 
    private toastMessager: ToastMessagingService,
    private autheService: AuthenticationService,
    private router: Router,
    private http: HttpClient,
    private userinfoService: UserinfoService,
  ) {
  }

  /*
   * Post/Update server data
   */
  postUserProfile() {
    this.showProgressBar = true;
    this.userinfoService.user.gender = this.ipt_gender;
    this.userinfoService.uploadUserProfile()
    .then(() => {
      this.toastMessager.presentToast("User profile updated!");
    })
    .catch((err) => {
      this.toastMessager.presentError(err);
    })
    .finally(() => {
      this.showProgressBar = false;
    });
  }

  emailClicked() {
    this.toastMessager.presentToast("Changing email is not allowed here, please contact our developer.");
  }

  /*
   * Logout
   */
  logout() {
    this.userinfoService.cleanUserProfile();
    this.autheService.logout();
  }

  
}
