import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MouseEvent } from '@agm/core';
import { formatDate } from '@angular/common';

import { rcmdUserProfile } from '../../model/rcmdUserProfile'
import { ToastMessagingService } from '../../services/toastmessaging.service';
import { AuthenticationService } from '../../services/authentication.service';
import { UserinfoService } from '../../services/userinfo.service';
import { InvitationProviderService } from '../../providers/invitation-provider.service';

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

  private ivtee : rcmdUserProfile;

  // Map Params
  zoom: number  = 15;
  // lat: number   = 41.3128;
  // lng: number   = -72.9251;
  pin: marker = 
  {
    lat: 41.3128,
    lng: -72.9251,
    label: '',
    draggable: true
  }

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
    this.ivtee = this.navParams.get('user');
    this.pin.lat = this.userinfoService.user.latitude;
    this.pin.lng = this.userinfoService.user.longitude;
  }

  closePopover() {
    this.popoverControler.dismiss();
  }

  mapClicked($event: MouseEvent) {
    this.pin.lat = $event.coords.lat;
    this.pin.lng = $event.coords.lng;
    console.log(this.pin.lat, this.pin.lng);
  }

  yesClicked() {
    this.storage.get("time_slot").then((res) => {
      var start : string, end : string;
      if(!res) {
        let date = new Date();
        date.setMinutes(date.getMinutes() + 30);
        start = formatDate(date, "yyyy-MM-dd-HH-mm", 'en-US');
        date.setHours(date.getHours() + 1);
        end = formatDate(date, "yyyy-MM-dd-HH-mm", 'en-US');
      } else {
        start = res.start;
        end = res.end;
      }
      let ivtBody = {
        "senderId": this.userinfoService.user.id, 
        "receiverId": this.ivtee.uid,
        "start": start,
        "end": end,
        "longitude": this.pin.lng,
        "latitude": this.pin.lat,
        "status": "ACTIVE",
      };
      console.log("Sending invitation body:", ivtBody);
      this.ivtProvider.sentInvitation(ivtBody)
      .then((res) => {
        this.toastMessager.presentToast('Invitation sent!');
      })
      .catch((err) => {
        this.toastMessager.presentError(err);
      });
    })
    .catch(err => this.toastMessager.presentError(err))
    .finally(() => this.closePopover());
  }

  waitClicked() {
    this.closePopover();
  }

}


