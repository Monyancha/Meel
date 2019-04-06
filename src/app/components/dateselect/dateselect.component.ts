import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { NavParams, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    private popoverControler : PopoverController,
  ) { 
  }

  ngOnInit() {}

  async confirm() {
    let date = new Date();
    if(this.day == "tomorrow") {
      date.setDate(date.getDate() + 1);
    }
    let dateStr = formatDate(date, "yyyy-MM-dd", 'en-US') 
                    + "-" + this.hour.substring(0, 2) 
                    + "-" + this.hour.substring(3);
    console.log("Dateselec component: sending date string(" + dateStr + ") to rcmd service..");
    this.rcmdService.updateRcmdUserList(dateStr);
    this.router.navigate(['tabs/tabs/tab1/recommendation']);
    await this.popoverControler.dismiss();
  }

  

}
