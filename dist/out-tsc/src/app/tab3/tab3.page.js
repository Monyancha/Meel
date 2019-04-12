import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { trigger, transition } from '@angular/animations';
import { UserinfoService } from '../services/userinfo.service';
import { AuthenticationService } from '../services/authentication.service';
import { ToastMessagingService } from '../services/toastmessaging.service';
var Tab3Page = /** @class */ (function () {
    function Tab3Page(ionicDb, toastMessager, autheService, router, http, userinfoService) {
        this.ionicDb = ionicDb;
        this.toastMessager = toastMessager;
        this.autheService = autheService;
        this.router = router;
        this.http = http;
        this.userinfoService = userinfoService;
        // ipt_gender = 'other';
        this.showProgressBar = false;
    }
    /*
     * Post/Update server data
     */
    Tab3Page.prototype.postUserProfile = function () {
        var _this = this;
        this.showProgressBar = true;
        // this.userinfoService.user.gender = this.ipt_gender;
        this.userinfoService.uploadUserProfile()
            .then(function () {
            _this.toastMessager.presentToast("User profile updated!");
        })
            .catch(function (err) {
            _this.toastMessager.presentError(err);
        })
            .finally(function () {
            _this.showProgressBar = false;
        });
    };
    Tab3Page.prototype.emailClicked = function () {
        this.toastMessager.presentToast("Changing email is not allowed here, please contact our developer.");
    };
    /*
     * Logout
     */
    Tab3Page.prototype.logout = function () {
        this.userinfoService.cleanUserProfile();
        this.autheService.logout();
    };
    Tab3Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab3',
            templateUrl: 'tab3.page.html',
            styleUrls: ['tab3.page.scss'],
            animations: [
                trigger('cardEnter', [
                    transition('* => *', [])
                ])
            ]
        }),
        tslib_1.__metadata("design:paramtypes", [Storage,
            ToastMessagingService,
            AuthenticationService,
            Router,
            HttpClient,
            UserinfoService])
    ], Tab3Page);
    return Tab3Page;
}());
export { Tab3Page };
//# sourceMappingURL=tab3.page.js.map