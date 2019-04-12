import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// Added Feb 22, 2019: init auth service
import { NavController } from '@ionic/angular';
import { AuthenticationService } from './services/authentication.service';
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, splashScreen, statusBar, 
    // Added Feb 22, 2019: init auth service
    authenticationService, navCtrl) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.authenticationService = authenticationService;
        this.navCtrl = navCtrl;
        this.initializeApp();
    }
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            // Added Feb 22, 2019: init auth service
            // route to tabs page automatically without login if the auth successs
            _this.authenticationService.authenticationState.subscribe(function (state) {
                if (state) {
                    // this.navCtrl.navigateForward(['tabs']);
                    _this.navCtrl.navigateForward(['tabs/tabs/tab1/send-invt']);
                }
                else {
                    _this.navCtrl.navigateBack(['login']);
                    // this.router.navigate(['tabs/tabs/tab1']);
                }
            });
        });
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [Platform,
            SplashScreen,
            StatusBar,
            AuthenticationService,
            NavController])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map