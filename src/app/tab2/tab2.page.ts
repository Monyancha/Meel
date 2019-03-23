import { Component } from '@angular/core';

import { MockProviderService } from '../services/mockprovider.service';
import { Invitation } from '../model/invitation';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  selectedValue = 'sent';
  private sentInvitations: Invitation[];
  private receivedInvitations: Invitation[];
  private acceptedInvitations: Invitation[];

  constructor(
    private mockProvider: MockProviderService,
  ) {}

  segmentChanged(ev: Event) {
    console.log('Segment changed to: ', this.selectedValue);
    if (this.selectedValue == 'sent') {
      this.sentClicked();
    } else if (this.selectedValue == 'received') {
      this.receivedClicked();
    } else if (this.selectedValue == 'accepted'){
      this.acceptedClicked();
    } else {
      console.log(this.selectedValue);
    }
  }

  sentClicked() {
    console.log('sentClicked');
    // get data

    // load data
  }

  receivedClicked() {
    console.log('receivedClicked');
  }

  acceptedClicked() {
    console.log('acceptedClicked');
  }

  loadData(event : Event) {
    
  }
  

}
