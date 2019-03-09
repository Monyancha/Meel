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

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],

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
    BrowserAnimationsModule,
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
