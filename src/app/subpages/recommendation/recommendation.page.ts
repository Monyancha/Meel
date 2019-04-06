import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';


import { User } from '../../model/users';
import { MockProviderService } from '../../providers/mockprovider.service';
import { UserprofileComponent } from '../../components/userprofile/userprofile.component';

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
    private mockProvider: MockProviderService,
  ) {
    this.recommendedUsers = mockProvider.getRandomUsers(8);
  }

  ngOnInit() {
  }

  loadData(event : Event) {
    if(this.recommendedUsers.length < 50) {
      setTimeout(() => {
        console.log('loading more data...');
        this.doInfinite();
      }, 500);
    } else {
      this.infiniteScroll.complete();
    }
  }

  doInfinite() {
    this.mockProvider.getRandomUsersAsync(8).then((newData) => {
      for (var i = 0; i < newData.length; i++) {
        this.recommendedUsers.push( newData[i] );
      }
      this.infiniteScroll.complete();
    });
  }

  async cardSelected(user : User, event : Event){
    console.log("user_id " + user.id + " clicked");
    const popver = await this.popoverController.create({
      component: UserprofileComponent,
      event: null,
      cssClass: 'userprofile-popover',
      componentProps: { user : user }
    })
    popver.present();
  }

}
