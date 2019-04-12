import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { User } from '../model/users';
import { AuthenticationService } from './authentication.service';
import { ToastMessagingService } from '../services/toastmessaging.service';
var UserinfoService = /** @class */ (function () {
    function UserinfoService(authService, http, ionicDb, plt, geolocation, toastMessager) {
        var _this = this;
        this.authService = authService;
        this.http = http;
        this.ionicDb = ionicDb;
        this.plt = plt;
        this.geolocation = geolocation;
        this.toastMessager = toastMessager;
        this.user = new User;
        this.plt.ready().then(function () {
            _this.authService.getTokenKey().then(function (res) {
                if (res) {
                    _this.user.id = res;
                    _this.getLatestUserProfile();
                }
            });
        });
    }
    /*
     * Store TOEN_KEY(currently is user id) into ionic db
     * TOKEN_KEY is required for authentication service
     */
    UserinfoService.prototype.setToken = function () {
        return this.ionicDb.set(this.authService.TOKEN_KEY, this.user.id);
    };
    /*
     * Return a promise of latest geoposition
     * Position data in res.coords.latitude and res.coords.longitude
     */
    UserinfoService.prototype.getCurrentPosition = function () {
        return this.geolocation.getCurrentPosition();
    };
    UserinfoService.prototype.uploadLocation = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getCurrentPosition()
                .then(function (res) {
                var body = {
                    "uid": _this.user.id,
                    "latitude": res.coords.latitude,
                    "longitude": res.coords.longitude,
                    "lastUpdateTime": res.timestamp.toString()
                };
                _this.user.latitude = res.coords.latitude;
                _this.user.longitude = res.coords.longitude;
                console.log("Sending GPS location:", body);
                _this.http.post(_this.authService.apiUrl + "/eatNow/uploadLocation", body, { responseType: 'text' })
                    .toPromise()
                    .then(function (res) { return resolve(res); })
                    .catch(function (err) { return reject(err); });
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    /*
     * Update user's GPS location
     */
    // updateUserPosition() {
    //   return new Promise((resolve, reject) => {
    //     this.geolocation.getCurrentPosition()
    //     .then((resp) => {
    //       this.user.longitude = resp.coords.latitude;
    //       this.user.latitude = resp.coords.longitude;
    //       this.setToken();
    //       console.log("User geolocation updated.");
    //       resolve(true);
    //     })
    //     .catch((err) => {
    //       this.toastMessager.presentError("Failed to fetch location");
    //       console.log("Error: User geolocation update failed: ", err);
    //       reject(err);
    //     });
    //     setTimeout(() => reject("Request timeout, please try again") , 3000);
    //   });
    // }
    /*
     * Get latest user profile data from server side
     * Timeout at 3000ms
     */
    UserinfoService.prototype.getLatestUserProfile = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.authService.apiUrl + '/userProfile/' + _this.user.id)
                .subscribe(function (response) {
                console.log("UserinfoService: user response received, ", response);
                // todo: add and use more info
                _this.user.username = response.username;
                _this.user.description = response.description;
                _this.user.email = response.email;
                _this.user.availability = response.availability == "T";
                _this.user.shareGPS = response.shared_gps == "T";
                _this.user.yearOfEntry = response.year.toString();
                _this.user.major = response.major;
                _this.user.gender = response.gender;
                _this.user.age = response.age.toString();
                _this.user.college = response.college;
                resolve(true);
            }, function (error) {
                _this.toastMessager.presentError(error);
                reject(error);
            });
            setTimeout(function () { return reject("Request timeout, please try again"); }, 3000);
        });
    };
    /*
     * Post current user profile to server side
     */
    UserinfoService.prototype.uploadUserProfile = function () {
        var _this = this;
        // Upload current location
        this.uploadLocation().catch(function (err) { return console.log(err); });
        return new Promise(function (resolve, reject) {
            console.log("Sending user profile:", _this.user.toJSON());
            _this.http.post(_this.authService.apiUrl + '/updateProfile', {}, { params: _this.user.toJSON(), responseType: 'text' })
                .subscribe(function (response) {
                console.log(response);
                resolve(true);
            }, function (error) {
                console.log("Update profile error: ", error);
                reject(error);
            });
            setTimeout(function () { return reject("Request timeout, please try again"); }, 3000);
        });
    };
    /*
     * Clean current user when logout
     */
    UserinfoService.prototype.cleanUserProfile = function () {
        this.user = new User;
    };
    /*
     * Test function..
     */
    UserinfoService.prototype.test = function () {
        return this.geolocation.getCurrentPosition();
    };
    UserinfoService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            HttpClient,
            Storage,
            Platform,
            Geolocation,
            ToastMessagingService])
    ], UserinfoService);
    return UserinfoService;
}());
export { UserinfoService };
//# sourceMappingURL=userinfo.service.js.map