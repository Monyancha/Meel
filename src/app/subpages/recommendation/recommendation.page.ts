import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { trigger, transition, style, animate, keyframes, query, stagger } from '@angular/animations';
import { NavController } from '@ionic/angular';

import { rcmdUserProfile } from '../../model/rcmdUserProfile';
import { RecommendationProviderService } from '../../providers/recommendation-provider.service';
import { ToastMessagingService } from '../../services/toastmessaging.service';
import { InvitationProviderService } from '../../providers/invitation-provider.service';
import { UserprofileComponent } from '../../components/userprofile/userprofile.component';
import { UserinfoService } from '../../services/userinfo.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.page.html',
  styleUrls: ['./recommendation.page.scss'],
  animations: [
    trigger('cardAnimation', [
      // Transition from any state to any state
      transition('* => *', [
        // Initially the all cards are not visible
        query(':enter', style({ opacity: 0 }), { optional: true }),

        // Each card will appear sequentially with the delay of 300ms
        query(':enter', stagger('50ms', [
          animate('.5s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-50%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(-10px) scale(1.1)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ]))]), { optional: true }),

        // Cards will disappear sequentially with the delay of 300ms
        query(':leave', stagger('100ms', [
          animate('500ms ease-out', keyframes([
            style({ opacity: 1, transform: 'scale(1.1)', offset: 0 }),
            style({ opacity: .5, transform: 'scale(.5)', offset: 0.3 }),
            style({ opacity: 0, transform: 'scale(0)', offset: 1 }),
          ]))]), { optional: true })
      ]),
    ]),
  ]
})
export class RecommendationPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  rcmdList: rcmdUserProfile[];
  showProgressBar = true;
  showNoMoreLabel = false;

  constructor(
    public userinfoService : UserinfoService,
    private storage: Storage, 
    private popoverController: PopoverController,
    // private mockProvider: MockProviderService,
    private rcmdProvider: RecommendationProviderService,
    private toastService: ToastMessagingService,
    private navCtrl: NavController,
  ) {
    // this.recommendedUsers = mockProvider.getRandomUsers(8);
  }
  
  /*
   * Convert distance in mile to a readable distance
   */
  convertDistance(dist : number) : string {
    if(dist >= 1000) {
      return (dist / 1000).toFixed(1) + "k mi";
    } else if(dist >= 10) {
      return Math.trunc(dist).toString() + " mi";
    } else if(dist >= 1 && dist < 10) {
      return dist.toFixed(1) + " mi";
    } else if(dist > 10){
      return Math.trunc(dist * 5280).toString() + " ft";
    } else if(dist >= 0) {
      return "nearby";
    } else {
      return "---";
    }
  }

  /*
   * Initialize recommendation list
   */
  ngOnInit() {
    console.log("[RcmdPage]Initalize recommendation list..");
    this.showProgressBar = true;
    this.storage.get("time_slot")
    .then((res) => {
      if(res) {
        console.log("[RcmdPage]Loading eat-later list, time_slot:", res);
        this.fetchEatLaterRcmdList();
      } else {
        console.log("[RcmdPage]Loading eat-now list");
        this.fetchEatNowRcmdList();
      }
    });
  }

  /*
   * Clear cache when opt out
   */
  async ngOnDestroy() {
    await this.storage.remove("time_slot");
  }

  fetchEatLaterRcmdList() {
    this.storage.get("time_slot")
    .then((res) => {
      if(!res) {
        this.toastService.presentError("[RcmdPage]:Error Loading Recommendation List\n" + 
                                        "Can't read time slot from storage.");
      } else {
        this.rcmdProvider.getEatLaterRcmdList(res.start, res.end)
        .then((res) => {
          this.rcmdList = this.rcmdProvider.getRcmdList(0, 10);
          if(this.rcmdList.length == this.rcmdProvider.rcmmd_usrs.length) {
            this.showNoMoreLabel = true;
          }
        })
        .catch((err) => {
          this.toastService.presentError(err);
        })
        .finally(() => {
          this.showProgressBar = false;
        });
      }
    });
  }

  /*
   * Call API to fetch latest RCMD list
   */
  fetchEatNowRcmdList() {
    this.rcmdProvider.getEatNowRcmdList()
    .then((res) => {
      this.rcmdList = this.rcmdProvider.getRcmdList(0, 10);
      if(this.rcmdList.length == this.rcmdProvider.rcmmd_usrs.length) {
        this.showNoMoreLabel = true;
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      this.showProgressBar = false;
    });
  }

  /*
   * Load more data
   */
  loadData(event : Event) {
    if(this.rcmdList.length != this.rcmdProvider.rcmmd_usrs.length) {
      setTimeout(() => {
        console.log('[RcmdPage]loading more data...');
        this.rcmdList = this.rcmdList.concat(this.rcmdProvider.getRcmdList(this.rcmdList.length,  this.rcmdList.length + 10));
        this.infiniteScroll.complete();
      }, 300);
    } else {
      this.infiniteScroll.complete();
      this.showNoMoreLabel = true;
    }
  }

  /*
   * Navigate to send-invt page if a card is clicked
   */
  async cardSelected(user : rcmdUserProfile, event : Event) {
    this.storage.set('ivt-user', user)
    .then(() => {
      this.navCtrl.navigateForward('tabs/tabs/tab1/send-invt');
    })
    .catch((err) => this.toastService.presentError(err));
  }

  /*
   * If an avatar is clicked, present a popup window of user information
   */
  async avatarClicked(ruser : rcmdUserProfile) {
    const popver = await this.popoverController.create({
      component: UserprofileComponent,
      event: null,
      cssClass: 'userprofile-popover',
      animated: false,
      componentProps: { 
        targetId : ruser.uid,
       }
    });
    popver.present();
  }

}
