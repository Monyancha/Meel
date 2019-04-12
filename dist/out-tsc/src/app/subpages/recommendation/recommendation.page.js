import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
// import { PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { trigger, transition, style, animate, keyframes, query, stagger } from '@angular/animations';
import { NavController } from '@ionic/angular';
import { rcmdUserProfile } from '../../model/rcmdUserProfile';
// import { MockProviderService } from '../../providers/mockprovider.service';
// import { UserprofileComponent } from '../../components/userprofile/userprofile.component';
import { RecommendationProviderService } from '../../providers/recommendation-provider.service';
import { ToastMessagingService } from '../../services/toastmessaging.service';
import { InvitationProviderService } from '../../providers/invitation-provider.service';
var RecommendationPage = /** @class */ (function () {
    function RecommendationPage(storage, 
    // private popoverController: PopoverController,
    // private mockProvider: MockProviderService,
    rcmdProvider, toastService, ivtProvider, navCtrl) {
        this.storage = storage;
        this.rcmdProvider = rcmdProvider;
        this.toastService = toastService;
        this.ivtProvider = ivtProvider;
        this.navCtrl = navCtrl;
        this.showProgressBar = true;
        // this.recommendedUsers = mockProvider.getRandomUsers(8);
    }
    RecommendationPage.prototype.convertDistance = function (dist) {
        if (dist >= 1000) {
            return (dist / 1000).toFixed(1) + "k mi";
        }
        else if (dist >= 10) {
            return Math.trunc(dist).toString() + " mi";
        }
        else if (dist >= 1 && dist < 10) {
            return dist.toFixed(1) + " mi";
        }
        else if (dist > 10) {
            return Math.trunc(dist * 5280).toString() + " ft";
        }
        else if (dist >= 0) {
            return "nearby";
        }
        else {
            return "---";
        }
    };
    /*
     * Initialize recommendation list
     */
    RecommendationPage.prototype.ngOnInit = function () {
        var _this = this;
        console.log("[RcmdPage]Initalize recommendation list..");
        this.showProgressBar = true;
        this.storage.get("time_slot")
            .then(function (res) {
            if (res) {
                console.log("[RcmdPage]Loading eat-later list, time_slot:", res);
                _this.fetchEatLaterRcmdList();
            }
            else {
                console.log("[RcmdPage]Loading eat-now list");
                _this.fetchEatNowRcmdList();
            }
        });
    };
    /*
     * Clear cache when opt out
     */
    RecommendationPage.prototype.ngOnDestroy = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.remove("time_slot")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RecommendationPage.prototype.fetchEatLaterRcmdList = function () {
        var _this = this;
        this.storage.get("time_slot")
            .then(function (res) {
            if (!res) {
                _this.toastService.presentError("[RcmdPage]:Error Loading Recommendation List\n" +
                    "Can't read time slot from storage.");
            }
            else {
                _this.rcmdProvider.getEatLaterRcmdList(res.start, res.end)
                    .then(function (res) {
                    _this.rcmdList = _this.rcmdProvider.getRcmdList(0, 10);
                })
                    .catch(function (err) {
                    _this.toastService.presentError(err);
                })
                    .finally(function () {
                    _this.showProgressBar = false;
                    if (_this.rcmdList.length == 0) {
                        _this.toastService.presentToast("No available user found");
                    }
                });
            }
        });
    };
    RecommendationPage.prototype.fetchEatNowRcmdList = function () {
        var _this = this;
        this.rcmdProvider.getEatNowRcmdList()
            .then(function (res) {
            _this.rcmdList = _this.rcmdProvider.getRcmdList(0, 10);
        })
            .catch(function (err) {
            console.log(err);
        })
            .finally(function () {
            _this.showProgressBar = false;
            if (_this.rcmdList.length == 0) {
                _this.toastService.presentToast("No available user found");
            }
        });
    };
    RecommendationPage.prototype.loadData = function (event) {
        var _this = this;
        if (this.rcmdList.length != this.rcmdProvider.rcmmd_usrs.length) {
            setTimeout(function () {
                console.log('[RcmdPage]loading more data...');
                _this.rcmdList.concat(_this.rcmdProvider.getRcmdList(_this.rcmdList.length, _this.rcmdList.length + 10));
                _this.infiniteScroll.complete();
            }, 300);
        }
        else {
            this.infiniteScroll.complete();
        }
    };
    RecommendationPage.prototype.cardSelected = function (user, event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                // console.log("user" + user + " clicked");
                // const popver = await this.popoverController.create({
                //   component: UserprofileComponent,
                //   event: null,
                //   cssClass: 'userprofile-popover',
                //   componentProps: { user : user }
                // })
                // popver.present();
                this.storage.set('ivt-user', rcmdUserProfile)
                    .then(function (res) {
                    _this.navCtrl.navigateForward('tabs/tabs/tab1/send-invt');
                })
                    .catch(function (err) { return _this.toastService.presentError(err); });
                return [2 /*return*/];
            });
        });
    };
    tslib_1.__decorate([
        ViewChild(IonInfiniteScroll),
        tslib_1.__metadata("design:type", IonInfiniteScroll)
    ], RecommendationPage.prototype, "infiniteScroll", void 0);
    RecommendationPage = tslib_1.__decorate([
        Component({
            selector: 'app-recommendation',
            templateUrl: './recommendation.page.html',
            styleUrls: ['./recommendation.page.scss'],
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
        tslib_1.__metadata("design:paramtypes", [Storage,
            RecommendationProviderService,
            ToastMessagingService,
            InvitationProviderService,
            NavController])
    ], RecommendationPage);
    return RecommendationPage;
}());
export { RecommendationPage };
//# sourceMappingURL=recommendation.page.js.map