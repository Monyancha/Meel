import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { UserinfoService } from '../../services/userinfo.service';
import { YelpRcmdService } from '../../providers/yelp-rcmd.service';
import { ToastMessagingService } from '../../services/toastmessaging.service';
var SendInvtPage = /** @class */ (function () {
    function SendInvtPage(mapsAPILoader, ngZone, userinfoService, yelpService, toastSerivce) {
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.userinfoService = userinfoService;
        this.yelpService = yelpService;
        this.toastSerivce = toastSerivce;
        this.lat = 41.3128;
        this.lng = -72.9251;
        this.pinLat = 41.3128;
        this.pinLng = -72.9251;
        this.zoom = 15;
        this.isSending = false;
        this.nearbyRest = [];
        this.cur_info_win = undefined;
    }
    SendInvtPage.prototype.ngOnInit = function () {
    };
    SendInvtPage.prototype.ngAfterViewInit = function () {
        var _this = this;
        // Load current location
        this.userinfoService.getCurrentPosition().then(function (res) {
            _this.lat = res.coords.latitude;
            _this.lng = res.coords.longitude;
            _this.pinLat = _this.lat;
            _this.pinLng = _this.lng;
            _this.refreshYelp(_this.lat, _this.lng);
        });
        // Set Google Autocomplete
        this.mapsAPILoader.load().then(function () {
            var searchInput = _this.getSearchInput();
            _this.autocomplete = new google.maps.places.Autocomplete(searchInput);
            _this.autocomplete.addListener("place_changed", function () {
                _this.ngZone.run(function () {
                    var place = _this.autocomplete.getPlace();
                    if (place.geometry && place.geometry) {
                        _this.lat = place.geometry.location.lat();
                        _this.lng = place.geometry.location.lng();
                    }
                });
            });
        });
        //  [animation]="'DROP'"
    };
    SendInvtPage.prototype.refreshYelp = function (lat, lng) {
        var _this = this;
        if (!this.isSending) {
            this.isSending = true;
            this.yelpService.getNearbyRestaurant(lat, lng)
                .then(function (res) {
                for (var i = 0; i < res.length; i++) {
                    var duplicate = false;
                    for (var j = 0; j < _this.nearbyRest.length; j++) {
                        if (_this.nearbyRest[j]['id'] == res[i]['id']) {
                            duplicate = true;
                            console.log("Duplicate");
                            break;
                        }
                    }
                    if (!duplicate) {
                        _this.nearbyRest.push(res[i]);
                    }
                }
                if (_this.nearbyRest.length > 50) {
                    _this.nearbyRest = _this.nearbyRest.slice(_this.nearbyRest.length - 50);
                }
            })
                .catch(function (err) {
                _this.toastSerivce.presentError(err);
            })
                .finally(function () {
                setTimeout(function () { return _this.isSending = false; }, 500);
            });
        }
    };
    SendInvtPage.prototype.getSearchInput = function () {
        console.log("Search for input in ion-search:", this.searchbar.nativeElement.getElementsByTagName('input'));
        return (this.searchbar.nativeElement.getElementsByTagName('input'))[0];
        // return this.searchbar.nativeElement.getElementsByClassName('searchbar-input')[0];
    };
    SendInvtPage.prototype.mapClicked = function ($event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pinLat = $event.coords.lat;
                        this.pinLng = $event.coords.lng;
                        if (!this.cur_info_win) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.cur_info_win.close()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    SendInvtPage.prototype.mapCenterChanged = function ($event) {
        this.refreshYelp($event.lat, $event.lng);
    };
    SendInvtPage.prototype.agmClicked = function ($event) {
        console.log($event);
    };
    SendInvtPage.prototype.clickedMarker = function ($event) {
        console.log("InfoWin:", $event);
        if (this.cur_info_win) {
            this.cur_info_win.forEach(function (infoWindow) { return infoWindow.close(); });
        }
        this.cur_info_win = $event.infoWindow;
    };
    SendInvtPage.prototype.openStatus = function (is_closed) {
        if (is_closed) {
            return "Closed";
        }
        else {
            return "Open";
        }
    };
    SendInvtPage.prototype.convertRating = function (rate) {
        return rate.toFixed(1);
    };
    SendInvtPage.prototype.infoWinClicked = function (res) {
        console.log("Place selected", res.name);
        this.lat = res.latitude;
        this.lng = res.longitude;
        this.zoom = 17;
    };
    tslib_1.__decorate([
        ViewChild('searchbar', { read: ElementRef }),
        tslib_1.__metadata("design:type", ElementRef)
    ], SendInvtPage.prototype, "searchbar", void 0);
    SendInvtPage = tslib_1.__decorate([
        Component({
            selector: 'app-send-invt',
            templateUrl: './send-invt.page.html',
            styleUrls: ['./send-invt.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [MapsAPILoader,
            NgZone,
            UserinfoService,
            YelpRcmdService,
            ToastMessagingService])
    ], SendInvtPage);
    return SendInvtPage;
}());
export { SendInvtPage };
//# sourceMappingURL=send-invt.page.js.map