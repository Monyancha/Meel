import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

import { User } from '../model/users';
import { AuthenticationService } from '../services/authentication.service';
import { UserinfoService } from '../services/userinfo.service';
import { ToastMessagingService } from '../services/toastmessaging.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  ipt_usrname           = "Gandalf the Grey";
  ipt_description       = "shortly describe yourself...";
  
  availability_toggle   = false;
  share_gps_toggle      = false;

  ipt_gender            = 'other';
  ipt_college           = "null";
  ipt_major             = 'null';
  ipt_email             = 'null@yale.edu'

  constructor(
    public ionicDb: Storage, 
    private toastMessager: ToastMessagingService,
    private autheService: AuthenticationService,
    private router: Router,
    private http: HttpClient,
    private userinfoService: UserinfoService,
  ) {
  }

  getUserProfile() {

  }

  postUserProfile() {
    // 1, Update local data
    this.userinfoService.user.username      = this.ipt_usrname;
    this.userinfoService.user.description   = this.ipt_description;

    this.userinfoService.user.availability  = this.availability_toggle;
    this.userinfoService.user.shareGPS      = this.share_gps_toggle;

    this.userinfoService.user.gender        = this.ipt_gender;
    this.userinfoService.user.college       = this.ipt_college;
    this.userinfoService.user.major         = this.ipt_major;

    // 2, Update server data
    this.userinfoService.uploadUserProfile()
    .then(res => {
      this.toastMessager.presentToast("User profile updated!");
    })
    .catch(err => this.toastMessager.presentError(err));

  }

  logout() {
    this.autheService.logout();
  }

  
}
