import { Component } from '@angular/core';
import { DateselectComponent } from '../components/dateselect/dateselect.component';
import { PopoverController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

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
    private navCtrl: NavController,
    private storage: Storage,
    ) {}
  
  /*
   * Upload user location when we init the app
   */
  ngOnInit() {
    console.log("[Tab1]:Uploading user location...");
    this.userinfoService.uploadLocation()
    .then((res) => {
      console.log("[Tab1]:User location updated", res);
    })
    .catch((err) => {
      console.log("[Tab1]:Failed to upload location", err);
    });
  }

  /*
   * Navigate to RCMD page
   */
  eatNowClicked() {
    console.log('[Tab1]:eatNowClicked');
    this.storage.remove('time_slot').finally(() => {
      this.navCtrl.navigateForward(['tabs/tabs/tab1/recommendation']);
    });
  }

  /*
   * Open a data-select popup window
   */
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

  /*
   * 
   */
  async dismissDateselectPopover() {
    this.curPopover.dismiss().then(() => this.curPopover = undefined);
  }

}


