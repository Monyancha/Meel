import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastMessagingService {

  /*
   * This is a global service for handling toast request
   * we need a global service because we want to make sure only
   * one toast is present on screen
   */

  private currentToast = null;
  constructor(public toastController: ToastController,) { }

  /*
   * Parse an error body and present it
   */
  presentError(error : any) {
    console.log('Toast: Error Received - ', error);
    let msg = 'Unknown Error ' + error;
    if(error.status == 0) {
      msg = "ERROR: Connection Refused\nPlease try again later or check server status.";
    } else if(typeof error === 'string') {
      msg = error;
    } else if (typeof error.error === 'string') {
      msg = error.error;
    } else if (typeof error.error.message === 'string') {
      msg = error.error.message;
    } else if (typeof error.message === 'string') {
      msg = error.message;
    }
    console.log("presentError: ", msg);
    this.presentToast(msg, 'danger');
  }

  /*
   * Present a normal toast
   */
  async presentToast(msg : string, color = 'dark') {
    if (this.currentToast) {
      await this.currentToast.dismiss();
    }
    let timeToShow = 4000;
    if(color == 'danger') timeToShow = 6000;
    this.currentToast = await this.toastController.create({
      color: color,
      message: msg,
      duration: timeToShow,
      showCloseButton: (color == 'danger'),
      cssClass: "basic-toast-style",
      position: 'top',
    });
    await this.currentToast.present();
    console.log("ToastmessagingService: " + msg);
  }

}

