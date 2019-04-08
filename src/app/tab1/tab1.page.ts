import { Component } from '@angular/core';
import { DateselectComponent } from '../components/dateselect/dateselect.component';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

import { UserinfoService } from '../services/userinfo.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  curPopover : HTMLIonPopoverElement = undefined;

  constructor(
    private userinfoService : UserinfoService,
    private popoverController: PopoverController,
    private router: Router,
    ) {}


  // schedule(){
  //   this.presentDateselelectPopover();
  // }

  ngOnInit() {
    // Upload Current Location
    console.log("Tab1: Uploading user location...");
    this.userinfoService.uploadLocation()
    .then((res) => {
      console.log("User location updated", res);
    })
    .catch((err) => {
      console.log("Failed to upload location", err);
    });
  }

  eatNowClicked() {
    this.router.navigate(['tabs/tabs/tab1/recommendation']);
    console.log('eatNowClicked');
  }

  async presentDateselelectPopover(ev: any) {
    if(this.curPopover) {
      await this.curPopover.dismiss()
    }
    this.curPopover = await this.popoverController.create({
      component: DateselectComponent,
      event: ev,
      animated: true,
      cssClass: 'datesel-popover',
      // componentProps: { popoverController : this.popoverController }
    });
    await this.curPopover.present();
  }

  async dismissDateselectPopover() {
    this.curPopover.dismiss().then(() => this.curPopover = undefined);
  }

}


