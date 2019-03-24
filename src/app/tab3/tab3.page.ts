import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

import { User } from '../model/users';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  private currentUser = new User;
  private ipt_college = "null";
  private ipt_email = 'null@yale.edu'
  private ipt_major = 'null';
  private ipt_gender = 'other';
  private ipt_usrname = "Gandalf the Grey";
  private ipt_description = "shortly describe yourself...";

  constructor(
    public ionicDb: Storage, 
    private toastControl: ToastController,
    private autheService: AuthenticationService,
    private router: Router,
    private http: HttpClient,
  ) {

  }

  updateUserInfo() {
    console.log('\n Update:')
    console.log('New user name:', this.ipt_usrname);
    console.log('New user email:', this.ipt_email);
    console.log('New user college:', this.ipt_college);
    console.log('New user major:', this.ipt_major);
    console.log('New user description:', this.ipt_description);
    console.log('New user gender:', this.ipt_gender);
  }

  logout() {
    this.autheService.logout();
  }

  
}
