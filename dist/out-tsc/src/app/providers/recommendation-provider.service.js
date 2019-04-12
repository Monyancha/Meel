import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { UserinfoService } from '../services/userinfo.service';
var RecommendationProviderService = /** @class */ (function () {
    function RecommendationProviderService(authenService, userinfoService, http) {
        this.authenService = authenService;
        this.userinfoService = userinfoService;
        this.http = http;
        this.rcmmd_usrs = [];
    }
    /*
     * Return a sub-list of all recommended users
     */
    RecommendationProviderService.prototype.getRcmdList = function (start, end) {
        if (start >= this.rcmmd_usrs.length) {
            return [];
        }
        if (end > this.rcmmd_usrs.length) {
            end = this.rcmmd_usrs.length;
        }
        return this.rcmmd_usrs.slice(start, end);
    };
    /*
     * API Function, fetch recommendation list from server
     */
    RecommendationProviderService.prototype.getEatLaterRcmdList = function (start, end) {
        var _this = this;
        console.log("RcmdService: Fecting (later)recommendation list..");
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.authenService.apiUrl + "/eatLater/recommendation", { "userId": _this.userinfoService.user.id, "startTime": start, "endTime": end })
                .toPromise()
                .then(function (response) {
                console.log("Response received");
                console.table(response);
                response = response;
                _this.rcmmd_usrs = response;
                resolve(true);
            })
                .catch(function (err) {
                reject(err);
            });
            setTimeout(function () { return reject("Request timeout, please try again"); }, 5000);
        });
    };
    /*
     * API Function, fetch recommendation list from server, this is
     * a bit longer than eat-later because eat now requires location.
     */
    RecommendationProviderService.prototype.getEatNowRcmdList = function () {
        var _this = this;
        console.log("RcmdService: Fecting (now)recommendation list..");
        return new Promise(function (resolve, reject) {
            _this.userinfoService.getCurrentPosition()
                .then(function (res) {
                console.log("Geolocation received: ", res);
                var body = {
                    "uid": _this.userinfoService.user.id,
                    "latitude": res.coords.latitude,
                    "longitude": res.coords.longitude,
                    "lastUpdateTime": res.timestamp.toString()
                };
                console.log("Sending eat-now rcmd list request:", body);
                _this.http.post(_this.authenService.apiUrl + "/eatNow/recommendation", body)
                    .toPromise()
                    .then(function (response) {
                    console.log("Response received");
                    console.table(response);
                    response = response;
                    _this.rcmmd_usrs = response;
                    resolve(true);
                })
                    .catch(function (err) {
                    reject(err);
                });
                setTimeout(function () { return reject("Error Getting Eat-now Recommendation:\nRequest timeout, please try again"); }, 6000);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    /*
     * Clear current list
     */
    RecommendationProviderService.prototype.clearAll = function () {
        this.rcmmd_usrs = [];
    };
    RecommendationProviderService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            UserinfoService,
            HttpClient])
    ], RecommendationProviderService);
    return RecommendationProviderService;
}());
export { RecommendationProviderService };
//# sourceMappingURL=recommendation-provider.service.js.map