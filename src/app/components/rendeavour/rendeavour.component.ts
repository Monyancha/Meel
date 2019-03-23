import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps/ngx';


@Component({
  selector: 'app-rendeavour',
  templateUrl: './rendeavour.component.html',
  styleUrls: ['./rendeavour.component.scss'],
})
export class RendeavourComponent implements OnInit {

  map : GoogleMap;

  constructor(
    private plantform : Platform,
  ) { }

  
  async ngOnInit() {
    await this.plantform.ready();
    await this.loadMap();
  }

  loadMap() {

    // This code is necessary for browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyCYq0XB4TWCDdKS9gWGaeb2B4q0HeVTS5M',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyCYq0XB4TWCDdKS9gWGaeb2B4q0HeVTS5M'
    });

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 43.0741904,
           lng: -89.3809802
         },
         zoom: 18,
         tilt: 30
       }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: 43.0741904,
        lng: -89.3809802
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
  }

  onButtonClick(event) {
  }

}
