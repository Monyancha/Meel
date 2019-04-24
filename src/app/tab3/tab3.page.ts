import { Component, SecurityContext, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { trigger, transition, style, animate, keyframes, query, stagger} from '@angular/animations';

import { UserinfoService } from '../services/userinfo.service';
import { AuthenticationService } from '../services/authentication.service';
import { ToastMessagingService } from '../services/toastmessaging.service';
import { DomSanitizer } from '@angular/platform-browser';


import { Crop } from '@ionic-native/crop/ngx';
// import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  animations: [
    trigger('cardEnter', [
      transition('* => *', [
      ])
    ])
  ]
})
export class Tab3Page {

  // ipt_gender = 'other';
  showProgressBar = false;
 
  fileUrl: any = null;
  imageUrl : any = "../../assets/img/avatar.png";

  constructor(
    public ionicDb: Storage, 
    private toastMessager: ToastMessagingService,
    private autheService: AuthenticationService,
    private router: Router,
    private http: HttpClient,
    private userinfoService: UserinfoService,
    private sanitizer: DomSanitizer,
    // private imagePicker: ImagePicker,
    private crop: Crop,
    private transfer: FileTransfer,
  ) {
    this.imageUrl = this.userinfoService.getUserAvatar();
  }

  photoClicked() {
    // document.getElementById("imageUploader").click();
    const camera: any = navigator['camera'];
    camera.getPicture(
    (imageData) => {
      console.log("imageData received:", imageData);
      this.preprocessImage(imageData)
      .then((newImg) => {
        this.imageUrl = this.convertFileSrc(newImg); 
        this.uploadImageFile(newImg);
      })
      .catch(err => this.toastMessager.presentError(err))
    }, 
    (err) => {
      console.log("Error open camera: ", err);
      this.toastMessager.presentError("Failed to open camera/photo libarary.");
    }, 
    {
      sourceType: camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: camera.DestinationType.FILE_URI,
      quality: 64,
      encodingType: camera.EncodingType.JPEG,
      targetHeight: 1024,
      targetWidth: 1024,
    });
  }

  /*
   * 
   */
  preprocessImage(imageUrl : string) : Promise<string> {
    return new Promise((resolve, reject) => {
      this.crop.crop(imageUrl, {quality: 32, targetWidth : 512, targetHeight: 512})
      .then(newImg => {
        console.log("Image crop successful");
          resolve(newImg);
      })
      .catch(err => {
        console.log("Cropping error: ", err);
        reject(err);
      });
    })
  }

  /*
   * Sent preprocessed image to server
   */
  uploadImageFile(imageUrl : string) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'imagefile',
      fileName: 'imagefile',
      chunkedMode: false,
      mimeType: "image/*",
      headers: {}
    }
    let uploadUrl = this.autheService.apiUrl + "/userProfile/" + this.userinfoService.user.id + "/imageUpload";
    fileTransfer.upload(imageUrl, uploadUrl, options)
    .then((res) => {
      console.log("Uploaded Successfully", res);
      this.toastMessager.presentToast("Uploading... please wait for a few seconds for image to show up.");
    }, (err) => {
      console.log("File transfer error:", err);
      this.toastMessager.presentError("Failed to upload. please try reducing your image size.");
    });
  }

  /*
   * Convert file url to iOS readable format.
   */
  private convertFileSrc(url: string): string {
    if (!url) {
      return url;
    }
    if (url.startsWith('/')) {
      return window['WEBVIEW_SERVER_URL'] + '/_app_file_' + url;
    }
    if (url.startsWith('file://')) {
      return window['WEBVIEW_SERVER_URL'] + url.replace('file://', '/_app_file_');
    }
    if (url.startsWith('content://')) {
      return window['WEBVIEW_SERVER_URL'] + url.replace('content:/', '/_app_content_');
    }
    return url;
  }

  /*
   * Post/Update server data
   */
  postUserProfile() {
    this.showProgressBar = true;
    // this.userinfoService.user.gender = this.ipt_gender;
    this.userinfoService.uploadUserProfile()
    .then(() => {
      this.toastMessager.presentToast("User profile updated!");
    })
    .catch((err) => {
      this.toastMessager.presentError(err);
    })
    .finally(() => {
      this.showProgressBar = false;
    });
  }

  emailClicked() {
    this.toastMessager.presentToast("Changing email is not allowed here, please contact our developer.");
  }

  /*
   * Logout
   */
  logout() {
    this.userinfoService.cleanUserProfile();
    this.autheService.logout();
  }



  
}
