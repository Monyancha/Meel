import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss'],
})
export class UserprofileComponent implements OnInit {

  private passedUserId = null;

  constructor(
    private navParams : NavParams,
    private popoverControler : PopoverController,
  ) { }

  ngOnInit() {
    this.passedUserId = this.navParams.get('user_id')
  }

  closePopover() {
    this.popoverControler.dismiss();
  }

}


