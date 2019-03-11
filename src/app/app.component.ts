import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// Added Feb 22, 2019: init auth service
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,

    // Added Feb 22, 2019: init auth service
    private authenticationService: AuthenticationService,
    private router: Router

  ) {
    this.initializeApp();
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      // Added Feb 22, 2019: init auth service
      // route to tabs page automatically without login if the auth successs
      
      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['tabs']);
        } else {
          // this.router.navigate(['login']);
          this.router.navigate(['tabs/tabs/tab3']);
        }
      });
    });
  }
}
