import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { formatDate } from '@angular/common';
import { ToastMessagingService } from '../../services/toastmessaging.service';
import { AuthenticationService } from '../../services/authentication.service';
import { UserinfoService } from '../../services/userinfo.service';
import { InvitationProviderService } from '../../providers/invitation-provider.service';
var UserprofileComponent = /** @class */ (function () {
    function UserprofileComponent(storage, toastMessager, authenService, navParams, userinfoService, popoverControler, ivtProvider) {
        this.storage = storage;
        this.toastMessager = toastMessager;
        this.authenService = authenService;
        this.navParams = navParams;
        this.userinfoService = userinfoService;
        this.popoverControler = popoverControler;
        this.ivtProvider = ivtProvider;
        // Map Params
        this.zoom = 15;
        // lat: number   = 41.3128;
        // lng: number   = -72.9251;
        this.pin = {
            lat: 41.3128,
            lng: -72.9251,
            label: '',
            draggable: true
        };
    }
    UserprofileComponent.prototype.ngOnInit = function () {
        this.ivtee = this.navParams.get('user');
        this.pin.lat = this.userinfoService.user.latitude;
        this.pin.lng = this.userinfoService.user.longitude;
    };
    UserprofileComponent.prototype.closePopover = function () {
        this.popoverControler.dismiss();
    };
    UserprofileComponent.prototype.mapClicked = function ($event) {
        this.pin.lat = $event.coords.lat;
        this.pin.lng = $event.coords.lng;
        console.log(this.pin.lat, this.pin.lng);
    };
    UserprofileComponent.prototype.yesClicked = function () {
        var _this = this;
        this.storage.get("time_slot").then(function (res) {
            var start, end;
            if (!res) {
                var date = new Date();
                date.setMinutes(date.getMinutes() + 30);
                start = formatDate(date, "yyyy-MM-dd-HH-mm", 'en-US');
                date.setHours(date.getHours() + 1);
                end = formatDate(date, "yyyy-MM-dd-HH-mm", 'en-US');
            }
            else {
                start = res.start;
                end = res.end;
            }
            var ivtBody = {
                "senderId": _this.userinfoService.user.id,
                "receiverId": _this.ivtee.uid,
                "start": start,
                "end": end,
                "longitude": _this.pin.lng,
                "latitude": _this.pin.lat,
                "status": "ACTIVE",
            };
            console.log("Sending invitation body:", ivtBody);
            _this.ivtProvider.sentInvitation(ivtBody)
                .then(function (res) {
                _this.toastMessager.presentToast('Invitation sent!');
            })
                .catch(function (err) {
                _this.toastMessager.presentError(err);
            });
        })
            .catch(function (err) { return _this.toastMessager.presentError(err); })
            .finally(function () { return _this.closePopover(); });
    };
    UserprofileComponent.prototype.waitClicked = function () {
        this.closePopover();
    };
    UserprofileComponent = tslib_1.__decorate([
        Component({
            selector: 'app-userprofile',
            templateUrl: './userprofile.component.html',
            styleUrls: ['./userprofile.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Storage,
            ToastMessagingService,
            AuthenticationService,
            NavParams,
            UserinfoService,
            PopoverController,
            InvitationProviderService])
    ], UserprofileComponent);
    return UserprofileComponent;
}());
export { UserprofileComponent };
//# sourceMappingURL=userprofile.component.js.map