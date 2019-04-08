import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import {trigger, transition, style, animate, keyframes, query, stagger} from '@angular/animations';

// import { MockProviderService } from '../providers/mockprovider.service';
import { ToastMessagingService } from '../services/toastmessaging.service';
import { Invitation } from '../model/invitation';
import { RendeavourComponent } from '../components/rendeavour/rendeavour.component';
import { InvitationProviderService } from '../providers/invitation-provider.service';
import { UserinfoService } from '../services/userinfo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
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
export class Tab2Page {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  selectedValue = 'sent';
  showProgressBar = false;
  private invitations: Invitation[];

  constructor(
    private ivtService : InvitationProviderService,
    // private mockProvider: MockProviderService,
    private router: Router,
    private toastService: ToastMessagingService,
    private popoverController: PopoverController,
    private userinfoService: UserinfoService,
  ) {
  }

  ngOnInit() {
    this.segmentChanged();
  }

  /*
   *
   */ 
  async segmentChanged() {
    console.log('Segment changed to: ', this.selectedValue);

    // Clear Original Data
    this.invitations = [];

    // Load new data
    var api_url : string;
    if (this.selectedValue == 'sent') {
      api_url = "/invitation/waiting/";
    } else if (this.selectedValue == 'received') {
      api_url = "/invitation/pending/";
    } else if (this.selectedValue == 'accepted'){
      api_url = "/invitation/upcoming/";
    } 

    // Load new list
    await this.loadNewInvitations(api_url);
  }

  displayName(ivt : Invitation) : string {
    if(ivt.senderId == this.userinfoService.user.id) {
      return ivt.rName;
    } else {
      return ivt.sName;
    }
  }

  /*
   *
   */ 
  loadNewInvitations(api_url : string) {
    this.showProgressBar = true;
    return new Promise((resolve, reject) => {
      this.ivtService.getNewList(api_url)
      .then((res) => {
        this.invitations = Object.assign([], res);
        resolve(true);
      })
      .catch((err) => {
        console.log("tab2: Error fetching data:", err);
        this.toastService.presentError("Loading Invitation List Error\nError connecting server");
        reject(err);
      })
      .finally(() => {
        this.showProgressBar = false;
      });
    })

  }

  /*
   *
   */ 
  loadData(event : Event) {
    // todo: load more data if any...
    this.infiniteScroll.complete();
  }

  /*
   *
   */ 
  async cardSelected(ivt : Invitation, event : Event) {
    console.log("Inviation " + ivt.invitationId + " selected");
    const popver = await this.popoverController.create({
      component: RendeavourComponent,
      event: null,
      cssClass: 'rendeavour-popover',
      animated: false,
      componentProps: { 
        invitation : ivt, 
        pageStatus : this.selectedValue,
        refresh    : () => {this.segmentChanged()}
       }
    })
    popver.present();
  }

}
