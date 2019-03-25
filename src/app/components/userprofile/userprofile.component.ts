import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MouseEvent } from '@agm/core';

import { ToastMessagingService } from '../../services/toastmessaging.service';
import { AuthenticationService } from '../../services/authentication.service';

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

  private passedUser = null;

  // Map Params
  zoom: number  = 15;
  lat: number   = 41.3128;
  lng: number   = -72.9251;
  pin: marker = 
  {
    lat: 41.3128,
    lng: -72.9251,
    label: '',
    draggable: true
  }


  constructor(
    public ionicDb: Storage, 
    private toastMessager: ToastMessagingService,
    public authenService: AuthenticationService,
    private navParams : NavParams,
    private http: HttpClient,
    private popoverControler : PopoverController,
  ) { }

  ngOnInit() {
    this.passedUser = this.navParams.get('user');
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

    // let data = {
    //   id : 1,
    //   sender: 1,
    //   receiver: 2,
    //   start_time: "20190324-"
    // }
    // this.http.post(this.authenService.apiUrl + "/eatLater/sendInvitation", {})

    this.toastMessager.presentToast('Invitation sent!');
    this.closePopover();

  }

  waitClicked() {
    this.closePopover();
  }

}


