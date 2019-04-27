import { Component, OnInit } from '@angular/core';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { MouseEvent, LatLngLiteral, AgmMarker } from '@agm/core';
import { Storage } from '@ionic/storage';
import { formatDate } from '@angular/common'; 
import { NavController } from '@ionic/angular';

import { UserinfoService } from '../../services/userinfo.service';
import { YelpRcmdService } from '../../providers/yelp-rcmd.service'
import { ToastMessagingService } from '../../services/toastmessaging.service'
import { InvitationProviderService } from '../../providers/invitation-provider.service';
import { rcmdUserProfile } from '../../model/rcmdUserProfile';

declare var google: any;

@Component({
  selector: 'app-send-invt',
  templateUrl: './send-invt.page.html',
  styleUrls: ['./send-invt.page.scss'],
})
export class SendInvtPage implements OnInit {

  /*
   * Map variables
   */
  lat = 41.3128;
  lng = -72.9251;
  pinLat = 41.3128;
  pinLng = -72.9251;
  zoom = 15;
  cur_info_win : any = undefined;

  /*
   * Ion Search params
   */
  address : string;

  /*
   * indicate whether we are sending request to Yelp
   * if true, then no need to send duplicate request
   */
  isSending = false;

  /*
   * Retaurants returned by Yelp API
   */
  nearbyRest : Object[] = [];

  /*
   * Autocomplet variables
   */
  searchControl: FormControl;
  autocomplete: any;
  @ViewChild('searchbar', {read: ElementRef}) searchbar: ElementRef;


  /*
   * Information required to send a ivt request
   */
  messageForReceiver : string = "";
  selectedAddr : string = "Pin on Map";
  ivtee : rcmdUserProfile;
  

  start : string;
  end   : string;
  display_date : string;
  display_time : string;
  
  
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private userinfoService: UserinfoService,
    private yelpService: YelpRcmdService,
    private toastSerivce: ToastMessagingService,
    private ivtService: InvitationProviderService,
    private storage: Storage,
    private navCtrl: NavController,
  ) { }

  /*
   * Load neccesary information: time, invtee
   */
  ngOnInit() {
    // load time slot
    this.storage.get("time_slot").then((res) => {
      if(!res) {
        let date = new Date();
        date.setMinutes(date.getMinutes() + 30);
        this.start = formatDate(date, "yyyy-MM-dd-HH-mm", 'en-US');
        date.setHours(date.getHours() + 1);
        this.end = formatDate(date, "yyyy-MM-dd-HH-mm", 'en-US');
      } else {
        this.start   = res.start;
        this.end   = res.end;
      }
    })
    .finally(() => {
      this.display_date = this.ivtService.readableDate(this.start);
      this.display_time = this.ivtService.readableHour(this.start, this.end);
    });
    // load invitee
    this.storage.get("ivt-user").then((res) => {
      if(res) {
        this.ivtee = res
      } else {
        this.toastSerivce.presentError("Failed fetching invitation information, please try again.");
      }
    })
  }

  /*
   * Initialize google maps components
   */
  ngAfterViewInit() {
    // Load current location
    this.userinfoService.getCurrentPosition().then((res) => {
      this.lat = res.coords.latitude;
      this.lng = res.coords.longitude;
      this.pinLat = this.lat;
      this.pinLng = this.lng;
      this.refreshYelp(this.lat, this.lng);
    });
    
    // Set Google Autocomplete
    this.mapsAPILoader.load().then(() => {
      setTimeout(() => {
        var searchInput = (this.searchbar.nativeElement.getElementsByTagName('input'))[0];
        console.log("Search input feild = ", searchInput);
        if(!searchInput) {
          this.toastSerivce.presentError("Autocomplete initialization failed, please reload this page.");
        }
        this.autocomplete = new google.maps.places.Autocomplete(searchInput);
        this.autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = this.autocomplete.getPlace();
            if (place.geometry) {
              this.lat = place.geometry.location.lat();
              this.lng = place.geometry.location.lng();
            }
          });
        });
      }, 1000);
    });
  }

  /*
   * Get a new list of recommended restaurants
   */
  refreshYelp(lat : number, lng : number) {
    if(!this.isSending) {
      this.isSending = true;
        this.yelpService.getNearbyRestaurant(lat, lng)
        .then((res) => {
          for(let i = 0; i < res.length; i++) {
            var duplicate = false;
            for(let j = 0; j < this.nearbyRest.length; j++){
              if(this.nearbyRest[j]['id'] == res[i]['id']) {
                duplicate = true;
                console.log("Duplicate");
                break;
              }
            }
            if(!duplicate) {
              setTimeout(() => this.nearbyRest.push(res[i]), 100 * i);
            }
          }
          if(this.nearbyRest.length > 50) {
            this.nearbyRest = this.nearbyRest.slice(this.nearbyRest.length - 50);
          }
        })
        .catch((err) => {
          this.toastSerivce.presentError(err);
        })
        .finally(() => { 
          setTimeout(() => this.isSending = false, 100);
        });
    }
  }

  /*
   * Map Events receiver function
   */
  mapClicked($event: MouseEvent) {
    this.pinLat = $event.coords.lat;
    this.pinLng = $event.coords.lng;
    this.selectedAddr = "Pin on Map";
  }

  /*
   * Map Events receiver function
   */
  mapCenterChanged($event : LatLngLiteral) {
    this.refreshYelp($event.lat, $event.lng);
  }

  /*
   * Map Events receiver function
   */
  agmClicked($event) {
    console.log($event);
  }

  /*
   * Map Events receiver function
   */
  clickedMarker($event : AgmMarker) {
    console.log("InfoWin:", $event);
    if (this.cur_info_win) {
      this.cur_info_win.forEach(infoWindow => infoWindow.close());
    }
    this.cur_info_win = $event.infoWindow;
  }

  /*
   * For display purpose
   */
  openStatus(is_closed : boolean) : string {
    if(is_closed) {
      return "Closed";
    } else {
      return "Open";
    }
  }

  /*
   * For display purpose
   */
  convertRating(rate : number) : string {
    return rate.toFixed(1);
  }

  /*
   * Location selected by clicking an info-window
   */
  infoWinClicked(res){
    console.log("Place selected:", res);
    this.pinLat = res.coordinates.latitude;
    this.pinLng = res.coordinates.longitude;
    this.selectedAddr = res.name;
    this.toastSerivce.presentToast("Location Selected");
  }

  /*
   * Finalize everything and send an invitation to server
   */
  sentIvt() {
    let ivtBody = {
      "senderId": this.userinfoService.user.id, 
      "receiverId": this.ivtee.uid,
      "start": this.start,
      "end": this.end,
      "longitude": this.pinLng,
      "latitude": this.pinLat,
      "status": "ACTIVE",
      "message": this.messageForReceiver,
      "restaurant": this.selectedAddr,
    };
    console.log("Sending invitation body:", ivtBody);
    this.ivtService.sentInvitation(ivtBody)
    .then((res) => {
      this.toastSerivce.presentToast('Invitation sent!');
      this.navCtrl.navigateBack('tabs/tabs/tab1/recommendation');
    })
    .catch((err) => {
      this.toastSerivce.presentError(err);
    });
  }

}
