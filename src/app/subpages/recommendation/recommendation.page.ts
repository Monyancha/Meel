import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { MockProvider } from './provider';
import { User } from '../../model/users';

import { UserprofileComponent } from '../../components/userprofile/userprofile.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.page.html',
  styleUrls: ['./recommendation.page.scss'],
})
export class RecommendationPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  
  private recommendedUsers: User[];

  constructor(
    private popoverController: PopoverController,
    private mockProvider: MockProvider,
  ) { 
    this.recommendedUsers = mockProvider.getData();
  }

  ngOnInit() {
  }

  loadData(event) {
    setTimeout(() => {
      console.log('loading more data...');
      this.doInfinite();
    }, 500);
  }

  doInfinite() {
    this.mockProvider.getAsyncData().then((newData) => {
      for (var i = 0; i < newData.length; i++) {
        this.recommendedUsers.push( newData[i] );
      }
      this.infiniteScroll.complete();
    });
  }

  async cardSelected(userId : string, event : Event){
    console.log("user_id " + userId + " clicked");
    const popver = await this.popoverController.create({
      component: UserprofileComponent,
      event: null,
      cssClass: 'cardsel-popover',
      componentProps: { user_id : userId }
    })
    popver.present();
  }

}
