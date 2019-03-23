import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss'],
})
export class UserprofileComponent implements OnInit {

  private passedUser = null;

  constructor(
    public ionicDb: Storage, 
    public toastController: ToastController,
    private navParams : NavParams,
    private popoverControler : PopoverController,
  ) { }

  ngOnInit() {
    this.passedUser = this.navParams.get('user')
  }

  closePopover() {
    this.popoverControler.dismiss();
  }

  yesClicked() {
    // todo: sent invitation to server
    this.presentToast('Invitation sent!');
    this.closePopover();
  }

  waitClicked() {
    this.closePopover();
  }

  async presentToast(msg : string) {
    const toast = await this.toastController.create({
      color: 'light',
      message: msg,
      duration: 5000,
      showCloseButton: false,
      cssClass: "basic-toast-style",
      position: 'top',
    });
    toast.present();
    console.log("userprofile.component: toast posting: [" + msg + "]")
  }

}


