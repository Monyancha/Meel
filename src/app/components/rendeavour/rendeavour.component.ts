import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { MouseEvent } from '@agm/core';
import { NavParams, PopoverController } from '@ionic/angular';

import { Invitation } from '../../model/invitation';
import { ToastMessagingService } from '../../services/toastmessaging.service';


interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}

@Component({
  selector: 'app-rendeavour',
  templateUrl: './rendeavour.component.html',
  styleUrls: ['./rendeavour.component.scss'],
})
export class RendeavourComponent implements OnInit {

  // Invitation Params
  invitation : Invitation;
  pageStatus : string;

  // Map Params
  zoom: number  = 15;
  lat: number   = 41.3128;
  lng: number   = -72.9251;
  pin: marker = 
  {
    lat: 41.3128,
    lng: -72.9251,
    label: '',
    draggable: false
  }

  // UI Params
  showAcceptButton = true;
  showCancelButton = true;

  constructor(
    private toastMessager: ToastMessagingService,
    private plantform : Platform,
    private navParams : NavParams,
    private popoverControler : PopoverController,
  ) { }
  
  async ngOnInit() {
    this.plantform.ready().then(() => {
      this.invitation = this.navParams.get('invitation');
      this.pageStatus = this.navParams.get('pageStatus');
      if(this.pageStatus == 'sent') {
        this.showAcceptButton = false;
        this.showCancelButton = false;
      } else if(this.pageStatus == 'received') {
        this.showCancelButton = false;
      } else {
        this.showAcceptButton = false;
      }
    });
  }

  mapClicked($event: MouseEvent) {
    this.pin.lat = $event.coords.lat;
    this.pin.lng = $event.coords.lng;
    console.log(this.pin.lat, this.pin.lng);
  }

  closePopover() {
    this.popoverControler.dismiss();
  }

  acceptInvitation() {
    this.toastMessager.presentToast('Accepted!');
    this.closePopover();
  }

  cancelInvitation() {
    this.toastMessager.presentToast('Canceled!');
    this.closePopover();
  }

}
