import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MouseEvent } from '@agm/core';
import { formatDate } from '@angular/common';

import { rcmdUserProfile } from '../../model/rcmdUserProfile';
import { ToastMessagingService } from '../../services/toastmessaging.service';
import { AuthenticationService } from '../../services/authentication.service';
import { UserinfoService } from '../../services/userinfo.service';
import { InvitationProviderService } from '../../providers/invitation-provider.service';
import { User } from '../../model/users';

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss'],
})
export class UserprofileComponent implements OnInit {

  targetId : string;
  targetUsr : User = new User;

  constructor(
    public storage: Storage, 
    private toastMessager: ToastMessagingService,
    public authenService: AuthenticationService,
    private navParams : NavParams,
    private userinfoService : UserinfoService,
    private popoverControler : PopoverController,
    private ivtProvider : InvitationProviderService,
  ) { 
  }

  ngOnInit() {
    this.targetId = this.navParams.get('targetId');
    console.log("[Userprofile] target ID = ", this.targetId);
    this.userinfoService.getUserProfile(this.targetId)
    .then((res) => {
      this.targetUsr = res;
      console.log("[Userprofile] target user: ", this.targetUsr);
    })
  }

  closePopover() {
    this.popoverControler.dismiss();
  }


}


