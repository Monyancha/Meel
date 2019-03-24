import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastMessagingService {

  toastInScreen = null;

  constructor(public toastController: ToastController,) { }

  presentError(error : any) {
    let msg = 'Unknown Error ' + error;
    if(typeof error === 'string') {
      msg = error;
    } else if (typeof error.error === 'string') {
      msg = error.error;
    } else if (typeof error.error.message === 'string') {
      msg = error.error.message;
    } else if (typeof error.message === 'string') {
      msg = error.message;
    }
    msg = 'Error: ' + msg;
    console.log(msg);
    this.presentToast(msg, 'danger');
  }

  async presentToast(msg : string, color = 'light') {
    let timeToShow = 2048;
    if(color == 'danger') timeToShow *= 2;
    const toast = await this.toastController.create({
      color: color,
      message: msg,
      duration: timeToShow,
      showCloseButton: false,
      cssClass: "basic-toast-style",
      position: 'top',
    });
    toast.present();
    console.log("ToastmessagingService: " + msg)
  }


}

