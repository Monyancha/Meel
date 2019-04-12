import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserinfoService } from '../services/userinfo.service';
var YelpRcmdService = /** @class */ (function () {
    function YelpRcmdService(http, userinfoService) {
        this.http = http;
        this.userinfoService = userinfoService;
        this.apiKey = "dWdzPKk5F7O45Zw1WXKXSPfqQNRHBGQzPVeLYTShNmLehA_TbI0UmPXYzOw_xSmK9mHW6LMcXQ8W3tM2rbNEZGI08R_PePt73N1I2UkfuiAR7-y50u6R-TiojU2wXHYx";
    }
    YelpRcmdService.prototype.getNearbyRestaurant = function (lat, lng) {
        var _this = this;
        console.log("yelp-rcmd: Refreshing yelp restaurants: ", lat, lng);
        return new Promise(function (resolve, reject) {
            var timer = setTimeout(function () {
                reject("Yelp search timeout");
                console.log("yelp-rcmd: Refresh timeout");
            }, 8000);
            _this.http.get("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search", {
                headers: {
                    "accept": "application/json",
                    "x-requested-with": "xmlhttprequest",
                    "Access-Control-Allow-Origin": "*",
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    "Authorization": "Bearer " + _this.apiKey,
                },
                params: {
                    'term': "restaurants",
                    'latitude': lat.toString(),
                    'longitude': lng.toString(),
                    'limit': "20",
                    'radius': "2000"
                }
            })
                .toPromise()
                .then(function (res) {
                console.log("yelp-rcmd: Refresh response received: ", res);
                res = res.businesses;
                resolve(res);
            })
                .catch(function (err) {
                console.log("yelp-rcmd: Refresh error: ", err);
                reject(err);
            })
                .finally(function () { return clearTimeout(timer); });
        });
    };
    YelpRcmdService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            UserinfoService])
    ], YelpRcmdService);
    return YelpRcmdService;
}());
export { YelpRcmdService };
//# sourceMappingURL=yelp-rcmd.service.js.map