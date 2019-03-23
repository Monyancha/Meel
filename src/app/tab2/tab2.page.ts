import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  selectedValue = 'sent';

  constructor() {}

  // sentClicked() {
  //   console.log('sentClicked');
  // }

  // receivedClicked() {
  //   console.log('receivedClicked');
  // }

  // acceptedClicked() {
  //   console.log('acceptedClicked');
  // }

  segmentChanged(ev: Event) {
    console.log('Segment changed to: ', this.selectedValue);
  }
  

}
