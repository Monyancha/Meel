import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { MouseEvent } from '@agm/core';
import { NavParams, PopoverController } from '@ionic/angular';

import { Invitation } from '../../model/invitation';
import { ToastMessagingService } from '../../services/toastmessaging.service';
import { InvitationProviderService} from '../../providers/invitation-provider.service';
import { UserinfoService } from '../../services/userinfo.service';

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

  /*
   * Invitation page that shows details of an invitation
   */


  invitation : Invitation;
  pageStatus : string;

  // Map Params
  zoom: number  = 15;
  lat: number   = 41.3128;
  lng: number   = -72.9251;

  // UI Params
  showAcceptButton  = false;
  showDeclineButton = false;
  showCancelButton  = false;

  constructor(
    private toastMessager: ToastMessagingService,
    private plantform : Platform,
    private navParams : NavParams,
    private popoverControler : PopoverController,
    private ivtProvider : InvitationProviderService,
    private userinfoService: UserinfoService,
  ) { }

  /*
   * Need to show/hide certain buttons for different types of invitation
   */
  async ngOnInit() {
    this.plantform.ready().then(() => {
      this.invitation = this.navParams.get('invitation');
      this.pageStatus = this.navParams.get('pageStatus');
      
      this.lat = this.invitation.latitude;
      this.lng = this.invitation.longitude;

      if(this.pageStatus == 'accepted') {
        this.showCancelButton = true;
      } else if(this.pageStatus == 'received') {
        this.showDeclineButton = true;
        this.showAcceptButton  = true;
      } 
    });
  }

  /*
   * Display other's name
   */
  displayName(ivt : Invitation) : string {
    if(ivt.senderId == this.userinfoService.user.id) {
      return ivt.rName;
    } else {
      return ivt.sName;
    }
  }

  /*
   * 
   */
  closePopover() {
    this.popoverControler.dismiss();
  }

  /*
   * Accept button click function.
   */
  acceptInvitation(ivt_id : string) {
    this.ivtProvider.acceptInvitation(ivt_id)
    .then(() => {
      this.toastMessager.presentToast('Accepted!');
      this.navParams.get('refresh')();
    })
    .catch((err) => {
      console.log("Failed to accept invitation", err);
      this.toastMessager.presentToast('Failed to accept invitation');
    })
    .finally(() => {
      this.closePopover();
    });
  }

  /*
   * Decline button click function
   */
  declineInvitation(ivt_id : string) {
    this.toastMessager.presentToast('Sorry, the decline function is not implemented yet..');
  }

  /*
   * Cancel button click function
   */
  cancelInvitation(ivt_id : string) {
    this.toastMessager.presentToast('Sorry, the cancelelation function is not implemented yet..');
    // this.closePopover();
  }

}

