import { Component, OnInit } from '@angular/core';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { MouseEvent, LatLngLiteral, AgmMarker } from '@agm/core';


import { UserinfoService } from '../../services/userinfo.service';
import { YelpRcmdService } from '../../providers/yelp-rcmd.service'
import { ToastMessagingService } from '../../services/toastmessaging.service'

@Component({
  selector: 'app-send-invt',
  templateUrl: './send-invt.page.html',
  styleUrls: ['./send-invt.page.scss'],
})
export class SendInvtPage implements OnInit {

  lat = 41.3128;
  lng = -72.9251;
  pinLat = 41.3128;
  pinLng = -72.9251;
  zoom = 15;


  address : string;
  isSending = false;

  nearbyRest : Object[] = [];

  searchControl: FormControl;
  autocomplete: any;

  cur_info_win : any = undefined;
  
  @ViewChild('searchbar', {read: ElementRef}) searchbar: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private userinfoService: UserinfoService,
    private yelpService: YelpRcmdService,
    private toastSerivce: ToastMessagingService,
  ) { }

  ngOnInit() {
  }

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
        var searchInput = this.getSearchInput();
        this.autocomplete = new google.maps.places.Autocomplete(searchInput);
        this.autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = this.autocomplete.getPlace();
            if (place.geometry && place.geometry) {
              this.lat = place.geometry.location.lat();
              this.lng = place.geometry.location.lng();
            }
          });
        });
      }, 1000);
    });
    //  [animation]="'DROP'"
  }

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
              this.nearbyRest.push(res[i]);
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
          setTimeout(() => this.isSending = false, 500);
        });
    }
  }

  getSearchInput() : any {
    console.log("Search for input in ion-search:", this.searchbar.nativeElement.getElementsByTagName('input'));
    return (this.searchbar.nativeElement.getElementsByTagName('input'))[0];
    // return this.searchbar.nativeElement.getElementsByClassName('searchbar-input')[0];
  }

  async mapClicked($event: MouseEvent) {
    this.pinLat = $event.coords.lat;
    this.pinLng = $event.coords.lng;
    if(this.cur_info_win) {
      await this.cur_info_win.close();
    }
  }

  mapCenterChanged($event : LatLngLiteral) {
    this.refreshYelp($event.lat, $event.lng);
  }

  agmClicked($event) {
    console.log($event);
  }

  clickedMarker($event : AgmMarker) {
    console.log("InfoWin:", $event);
    if (this.cur_info_win) {
      this.cur_info_win.forEach(infoWindow => infoWindow.close())
    }
    this.cur_info_win = $event.infoWindow;
  }

  openStatus(is_closed : boolean) : string {
    if(is_closed) {
      return "Closed";
    } else {
      return "Open";
    }
  }

  convertRating(rate : number) : string {
    return rate.toFixed(1);
  }

  infoWinClicked(res){
    console.log("Place selected:", res.name);
    this.lat = res.latitude;
    this.lng = res.longitude;
    this.zoom = 17;
    this.pinLat = this.lat;
    this.pinLng = this.lng;
  }

}
