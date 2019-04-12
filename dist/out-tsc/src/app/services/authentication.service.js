import * as tslib_1 from "tslib";
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// --- 3rd Auth Service ---
// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
// --- 3rd Auth Service ---
import { ToastMessagingService } from '../services/toastmessaging.service';
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(ionicDb, plt, toastMessager, 
    // public fb: Facebook,
    http) {
        var _this = this;
        this.ionicDb = ionicDb;
        this.plt = plt;
        this.toastMessager = toastMessager;
        this.http = http;
        /*
         * A behavior object representing a boolean state
         * of whether the current user is authenticated.
         */
        this.authenticationState = new BehaviorSubject(false);
        this.apiUrl = 'http://142.93.121.23:8080';
        this.TOKEN_KEY = 'current_user';
        this.plt.ready().then(function () {
            _this.checkToken();
        });
    }
    /*
     * Update authenticatiin state by checking if TOKEN_KEY exists
     */
    AuthenticationService.prototype.checkToken = function () {
        var _this = this;
        this.authenticationState.next(false);
        this.ionicDb.get(this.TOKEN_KEY).then(function (res) {
            if (res) {
                _this.authenticationState.next(true);
            }
        });
    };
    /*
     *
     */
    AuthenticationService.prototype.getTokenKey = function () {
        return this.ionicDb.get(this.TOKEN_KEY);
    };
    /*
     * Return an observable that returns user id upon successfull login
     * or a error message if failed, timeout at 5000ms.
     */
    AuthenticationService.prototype.login = function (email, password) {
        var _this = this;
        var timer = setTimeout(function () {
            _this.toastMessager.presentToast("Still trying to connect...");
        }, 4000);
        return new Observable(function (observer) {
            var url = _this.apiUrl + '/login';
            console.log("Sending login request {", email, ":", password + "} to ", url);
            _this.http.post(url, {}, { params: { 'email': email, 'password': password } })
                .toPromise()
                .then(function (res) {
                console.log("Login response received: ", res);
                observer.next(res);
            })
                .catch(function (err) { return observer.error(err); })
                .finally(function () {
                observer.complete();
                clearTimeout(timer);
            });
            setTimeout(function () {
                observer.error("Request timeout, please try again");
            }, 8000);
        });
    };
    /*
     * Return an observable that returns user id upon successfull register
     * or a error message if failed, timeout at 5000ms.
     */
    AuthenticationService.prototype.register = function (email, password) {
        var _this = this;
        var timer = setTimeout(function () {
            _this.toastMessager.presentToast("Still trying to connect...");
        }, 4000);
        return new Observable(function (observer) {
            console.log("Registeration Sent: ", email, ":", password);
            _this.http.post(_this.apiUrl + '/register', {}, { params: { 'username': email, 'email': email, 'password': password } })
                .toPromise()
                .then(function (res) {
                console.log("Registeration response: ", res);
                _this.toastMessager.presentToast("User created!");
                observer.next(res);
            })
                .catch(function (err) {
                observer.error(err);
            })
                .finally(function () {
                observer.complete();
                clearTimeout(timer);
            });
            setTimeout(function () {
                observer.error("Request timeout, please try again");
            }, 8000);
        });
    };
    /*
     * Remove TOKEN_KEY to logout.
     * WARNING: need to clear other information stored in memory or localstorage.
     */
    AuthenticationService.prototype.logout = function () {
        var _this = this;
        return this.ionicDb.remove(this.TOKEN_KEY).then(function () {
            _this.authenticationState.next(false);
        });
    };
    /*
     * getter function
     */
    AuthenticationService.prototype.isAuthenticated = function () {
        return this.authenticationState.value;
    };
    /*
     * todo
     */
    AuthenticationService.prototype.loginWithFacebook = function () {
        // // Login with permissions
        // this.fb.login(['public_profile', 'user_photos', 'email', 'user_birthday'])
        // .then( (res: FacebookLoginResponse) => {
        //     // The connection was successful
        //     if(res.status == "connected") {
        //         // Get user ID and Token
        //         var fb_id = res.authResponse.userID;
        //         var fb_token = res.authResponse.accessToken;
        //         // Get user infos from the API
        //         this.fb.api("/me?fields=name,gender,birthday,email", []).then((user) => {
        //             // Get the connected user details
        //             var gender    = user.gender;
        //             var birthday  = user.birthday;
        //             var name      = user.name;
        //             var email     = user.email;
        //             console.log("=== USER INFOS ===");
        //             console.log("Gender : " + gender);
        //             console.log("Birthday : " + birthday);
        //             console.log("Name : " + name);
        //             console.log("Email : " + email);
        //             // => Open user session and redirect to the next page
        //         });
        //     } 
        //     // An error occurred while loging-in
        //     else {
        //         console.log("An error occurred...");
        //     }
        // })
        // .catch((e) => {
        //     console.log('Error logging into Facebook', e);
        // });
    };
    /** Log a HeroService message with the MessageService */
    AuthenticationService.prototype.log = function (message) {
        console.log(message);
    };
    AuthenticationService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Storage,
            Platform,
            ToastMessagingService,
            HttpClient])
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map