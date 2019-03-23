import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

import { MockProviderService } from '../services/mockprovider.service';
import { Invitation } from '../model/invitation';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  selectedValue = 'sent';
  private invitations: Invitation[];

  constructor(
    private mockProvider: MockProviderService,
  ) {
    this.invitations = this.mockProvider.getRandomInvitations(Math.floor( Math.random() * 10));
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
    this.invitations = this.mockProvider.getRandomInvitations(Math.floor( Math.random() * 10));
  }

  loadReceivedInvitations() {
    this.invitations = this.mockProvider.getRandomInvitations(Math.floor( Math.random() * 10));
  }

  loadAcceptedInvitations() {
    this.invitations = this.mockProvider.getRandomInvitations(Math.floor( Math.random() * 10));
  }

  loadData(event : Event) {
    // todo: load more data if any...
    this.infiniteScroll.complete();
  }

  cardSelected(ivt : Invitation, event : Event) {
    console.log("Inviation " + ivt.invitationId + " selected");
  }
  

}
