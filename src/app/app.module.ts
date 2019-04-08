import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// --- Feb 22, 2019: New Import ---
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { IonicStorageModule } from '@ionic/storage'; // Storage
// --- Feb 22, 2019: New Import ---

// --- Feb 24, 2019: For RESTful API Service ---
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './services/interceptor.service';
// --- Feb 24, 2019: For RESTful API Service ---

// --- March 9, 2019: Animations ---
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// --- March 9, 2019: Animations ---

// --- March 9, 2019: 3rd Auth ---
// import { Facebook } from '@ionic-native/facebook/ngx';
// --- March 9, 2019: 3rd Auth ---

// --- March 21, 2019: Pop-overs ---
import { DateselectComponent } from './components/dateselect/dateselect.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { RendeavourComponent } from './components/rendeavour/rendeavour.component';
// --- March 21, 2019: Pop-overs ---

// --- March 23, 2019: GPS && Maps ---
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AgmCoreModule } from '@agm/core';
// --- March 23, 2019: GPS && Maps ---



@NgModule({
  declarations: [
    AppComponent, 
    DateselectComponent,
    UserprofileComponent,
    RendeavourComponent,
  ],
  
  entryComponents: [
    DateselectComponent,
    UserprofileComponent,
    RendeavourComponent,
  ],

  // --- Feb 22, 2019: New Import ---
  imports: [
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule.forRoot(), 
    AppRoutingModule, 
    BrowserAnimationsModule,
    DragDropModule,
    ScrollingModule, 
    IonicStorageModule.forRoot(),
    // SocialLoginModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCYq0XB4TWCDdKS9gWGaeb2B4q0HeVTS5M'
    })
  ],
  // --- Feb 22, 2019: New Import ---

  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    Geolocation,
    // Facebook,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
