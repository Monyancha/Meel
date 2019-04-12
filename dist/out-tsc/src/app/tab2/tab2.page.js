import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { trigger, transition, style, animate, keyframes, query, stagger } from '@angular/animations';
// import { MockProviderService } from '../providers/mockprovider.service';
import { ToastMessagingService } from '../services/toastmessaging.service';
import { RendeavourComponent } from '../components/rendeavour/rendeavour.component';
import { InvitationProviderService } from '../providers/invitation-provider.service';
import { UserinfoService } from '../services/userinfo.service';
var Tab2Page = /** @class */ (function () {
    function Tab2Page(ivtService, 
    // private mockProvider: MockProviderService,
    router, toastService, popoverController, userinfoService) {
        this.ivtService = ivtService;
        this.router = router;
        this.toastService = toastService;
        this.popoverController = popoverController;
        this.userinfoService = userinfoService;
        this.selectedValue = 'sent';
        this.showProgressBar = false;
    }
    Tab2Page.prototype.ngOnInit = function () {
        this.segmentChanged();
    };
    /*
     *
     */
    Tab2Page.prototype.segmentChanged = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var api_url;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Segment changed to: ', this.selectedValue);
                        // Clear Original Data
                        this.invitations = [];
                        if (this.selectedValue == 'sent') {
                            api_url = "/invitation/waiting/";
                        }
                        else if (this.selectedValue == 'received') {
                            api_url = "/invitation/pending/";
                        }
                        else if (this.selectedValue == 'accepted') {
                            api_url = "/invitation/upcoming/";
                        }
                        // Load new list
                        return [4 /*yield*/, this.loadNewInvitations(api_url)];
                    case 1:
                        // Load new list
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Tab2Page.prototype.displayName = function (ivt) {
        if (ivt.senderId == this.userinfoService.user.id) {
            return ivt.rName;
        }
        else {
            return ivt.sName;
        }
    };
    /*
     *
     */
    Tab2Page.prototype.loadNewInvitations = function (api_url) {
        var _this = this;
        this.showProgressBar = true;
        return new Promise(function (resolve, reject) {
            _this.ivtService.getNewList(api_url)
                .then(function (res) {
                _this.invitations = Object.assign([], res);
                resolve(true);
            })
                .catch(function (err) {
                console.log("tab2: Error fetching data:", err);
                _this.toastService.presentError("Loading Invitation List Error\nError connecting server");
                reject(err);
            })
                .finally(function () {
                _this.showProgressBar = false;
            });
        });
    };
    /*
     *
     */
    Tab2Page.prototype.loadData = function (event) {
        // todo: load more data if any...
        this.infiniteScroll.complete();
    };
    /*
     *
     */
    Tab2Page.prototype.cardSelected = function (ivt, event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var popver;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Inviation " + ivt.invitationId + " selected");
                        return [4 /*yield*/, this.popoverController.create({
                                component: RendeavourComponent,
                                event: null,
                                cssClass: 'rendeavour-popover',
                                animated: false,
                                componentProps: {
                                    invitation: ivt,
                                    pageStatus: this.selectedValue,
                                    refresh: function () { _this.segmentChanged(); }
                                }
                            })];
                    case 1:
                        popver = _a.sent();
                        popver.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        ViewChild(IonInfiniteScroll),
        tslib_1.__metadata("design:type", IonInfiniteScroll)
    ], Tab2Page.prototype, "infiniteScroll", void 0);
    Tab2Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab2',
            templateUrl: 'tab2.page.html',
            styleUrls: ['tab2.page.scss'],
            animations: [
                trigger('cardAnimation', [
                    // Transition from any state to any state
                    transition('* => *', [
                        // Initially the all cards are not visible
                        query(':enter', style({ opacity: 0 }), { optional: true }),
                        // Each card will appear sequentially with the delay of 300ms
                        query(':enter', stagger('50ms', [
                            animate('.5s ease-in', keyframes([
                                style({ opacity: 0, transform: 'translateY(-50%)', offset: 0 }),
                                style({ opacity: .5, transform: 'translateY(-10px) scale(1.1)', offset: 0.3 }),
                                style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
                            ]))
                        ]), { optional: true }),
                        // Cards will disappear sequentially with the delay of 300ms
                        query(':leave', stagger('100ms', [
                            animate('500ms ease-out', keyframes([
                                style({ opacity: 1, transform: 'scale(1.1)', offset: 0 }),
                                style({ opacity: .5, transform: 'scale(.5)', offset: 0.3 }),
                                style({ opacity: 0, transform: 'scale(0)', offset: 1 }),
                            ]))
                        ]), { optional: true })
                    ]),
                ]),
            ]
        }),
        tslib_1.__metadata("design:paramtypes", [InvitationProviderService,
            Router,
            ToastMessagingService,
            PopoverController,
            UserinfoService])
    ], Tab2Page);
    return Tab2Page;
}());
export { Tab2Page };
//# sourceMappingURL=tab2.page.js.map