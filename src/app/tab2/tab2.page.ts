import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

import { MockProviderService } from '../providers/mockprovider.service';
import { Invitation } from '../model/invitation';
import { RendeavourComponent } from '../components/rendeavour/rendeavour.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  selectedValue = 'sent';
  private invitations: Invitation[];

  private sentInvitations: Invitation[];
  private receivedInvitations: Invitation[];
  private acceptedInvitations: Invitation[];

  constructor(
    private mockProvider: MockProviderService,
    private router: Router,
    private popoverController: PopoverController,
  ) {
    this.sentInvitations     = this.mockProvider.getRandomInvitations(4 + Math.floor( Math.random() * 4));
    this.receivedInvitations = this.mockProvider.getRandomInvitations(2 + Math.floor( Math.random() * 4));
    this.acceptedInvitations = this.mockProvider.getRandomInvitations(1 + Math.floor( Math.random() * 4));
    this.invitations         = Object.assign([], this.sentInvitations);
  }

  segmentChanged(ev: Event) {
    console.log('Segment changed to: ', this.selectedValue);

    // Clear Original Data
    this.invitations = [];

    // Load new data
    if (this.selectedValue == 'sent') {
      this.loadSentInvitations();
    } else if (this.selectedValue == 'received') {
      this.loadReceivedInvitations();
    } else if (this.selectedValue == 'accepted'){
      this.loadAcceptedInvitations();
    } else {
      console.log("Error on segment value: ", this.selectedValue);
    }
  }

  loadSentInvitations() {
    this.invitations = Object.assign([], this.sentInvitations);
  }

  loadReceivedInvitations() {
    this.invitations = Object.assign([], this.receivedInvitations);
  }

  loadAcceptedInvitations() {
    this.invitations = Object.assign([], this.acceptedInvitations);
  }

  loadData(event : Event) {
    // todo: load more data if any...
    this.infiniteScroll.complete();
  }

  async cardSelected(ivt : Invitation, event : Event) {
    console.log("Inviation " + ivt.invitationId + " selected");
    // this.router.navigate(['tabs/tabs/tab2/invitation']);
    const popver = await this.popoverController.create({
      component: RendeavourComponent,
      event: null,
      cssClass: 'rendeavour-popover',
      componentProps: { invitation : ivt, pageStatus : this.selectedValue }
    })
    popver.present();
  }
  
}
