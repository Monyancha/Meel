import { Component } from '@angular/core';
import { DateselectComponent } from '../components/dateselect/dateselect.component';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private popoverController: PopoverController,
    private router: Router,
    ) {}

  // schedule(){
  //   this.presentDateselelectPopover();
  // }

  eatNowClicked() {
    this.router.navigate(['tabs/tabs/tab1/recommendation']);
    console.log('eatNowClicked');
  }

  async presentDateselelectPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: DateselectComponent,
      event: ev,
      cssClass: 'datesel-popover',
    });
    return await popover.present();
  }

}


