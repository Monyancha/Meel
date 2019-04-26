import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// Added Feb 22, 2019: init auth service
import { NavController } from '@ionic/angular';
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
    private navCtrl: NavController,

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
          // this.navCtrl.navigateForward(['tabs']);
          this.navCtrl.navigateRoot(['tabs'], {animated : true, animationDirection : 'forward'});
          // this.navCtrl.navigateForward(['tabs/tabs/tab1']);
        } else {
          // this.navCtrl.navigateBack(['login']);
          this.navCtrl.navigateRoot(['login'], {animated : true, animationDirection : 'back'});
          // this.router.navigate(['tabs/tabs/tab1']);
        }
      });
    });
  }
}
