import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { NavParams, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import { ToastMessagingService } from '../../services/toastmessaging.service';
import { RecommendationProviderService } from '../../providers/recommendation-provider.service';

@Component({
  selector: 'app-dateselect',
  templateUrl: './dateselect.component.html',
  styleUrls: ['./dateselect.component.scss'],
})
export class DateselectComponent implements OnInit {

  day = "today";
  hour = "13:30";

  pop : PopoverController = undefined;

  constructor(
    private rcmdService : RecommendationProviderService,
    private navParams : NavParams,
    private router : Router,
    private toastMessager: ToastMessagingService,
    private storage: Storage, 
    private popoverControler : PopoverController,
  ) { 
  }

  ngOnInit() {}

  async confirm() {
    // Format date
    let date = new Date();
    if(this.day == "tomorrow") 
    {
      date.setDate(date.getDate() + 1);
    } 
    if(this.day == "today" && formatDate(date, "HH:mm", 'en-US') > this.hour) 
    {
      this.toastMessager.presentToast("Please do not select past time.");
    } 
    else 
    {
      date.setHours(Number(this.hour.substring(0, 2)), Number((this.hour.substring(3))));
      let start = formatDate(date, "yyyy-MM-dd-HH-mm", 'en-US');
  
      date.setHours(date.getHours() + 1);
      let end = formatDate(date, "yyyy-MM-dd-HH-mm", 'en-US');
  
      // Store date
      this.storage.set("time_slot", {"start" : start, "end" : end} )
      .then(() => {
        this.router.navigate(['tabs/tabs/tab1/recommendation']);
        this.popoverControler.dismiss();
      });  
    }
  }

}
