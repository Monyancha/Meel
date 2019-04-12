import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { DateselectComponent } from '../components/dateselect/dateselect.component';
import { PopoverController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserinfoService } from '../services/userinfo.service';
var Tab1Page = /** @class */ (function () {
    function Tab1Page(userinfoService, popoverController, navCtrl, storage) {
        this.userinfoService = userinfoService;
        this.popoverController = popoverController;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.curPopover = undefined;
    }
    // schedule(){
    //   this.presentDateselelectPopover();
    // }
    Tab1Page.prototype.ngOnInit = function () {
        // Upload Current Location
        console.log("[Tab1]:Uploading user location...");
        this.userinfoService.uploadLocation()
            .then(function (res) {
            console.log("[Tab1]:User location updated", res);
        })
            .catch(function (err) {
            console.log("[Tab1]:Failed to upload location", err);
        });
    };
    Tab1Page.prototype.eatNowClicked = function () {
        var _this = this;
        console.log('[Tab1]:eatNowClicked');
        this.storage.remove('time_slot').finally(function () {
            _this.navCtrl.navigateForward(['tabs/tabs/tab1/recommendation']);
        });
    };
    Tab1Page.prototype.presentDateselelectPopover = function (ev) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.curPopover) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.curPopover.dismiss()];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        _a = this;
                        return [4 /*yield*/, this.popoverController.create({
                                component: DateselectComponent,
                                event: ev,
                                animated: true,
                                cssClass: 'datesel-popover',
                            })];
                    case 3:
                        _a.curPopover = _b.sent();
                        return [4 /*yield*/, this.curPopover.present()];
                    case 4:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Tab1Page.prototype.dismissDateselectPopover = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.curPopover.dismiss().then(function () { return _this.curPopover = undefined; });
                return [2 /*return*/];
            });
        });
    };
    Tab1Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab1',
            templateUrl: 'tab1.page.html',
            styleUrls: ['tab1.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [UserinfoService,
            PopoverController,
            NavController,
            Storage])
    ], Tab1Page);
    return Tab1Page;
}());
export { Tab1Page };
//# sourceMappingURL=tab1.page.js.map