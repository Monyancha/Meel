import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import { NavParams, PopoverController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ToastMessagingService } from '../../services/toastmessaging.service';
import { RecommendationProviderService } from '../../providers/recommendation-provider.service';
var DateselectComponent = /** @class */ (function () {
    function DateselectComponent(rcmdService, navParams, navCtrl, toastMessager, storage, popoverControler) {
        this.rcmdService = rcmdService;
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.toastMessager = toastMessager;
        this.storage = storage;
        this.popoverControler = popoverControler;
        this.day = "tomorrow";
        this.hour = "13:30";
        this.pop = undefined;
    }
    DateselectComponent.prototype.ngOnInit = function () { };
    DateselectComponent.prototype.confirm = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var date, start, end;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                date = new Date();
                if (this.day == "tomorrow") {
                    date.setDate(date.getDate() + 1);
                }
                if (this.day == "today" && formatDate(date, "HH:mm", 'en-US') > this.hour) {
                    this.toastMessager.presentToast("Please do not select past time.");
                }
                else {
                    date.setHours(Number(this.hour.substring(0, 2)), Number((this.hour.substring(3))));
                    start = formatDate(date, "yyyy-MM-dd-HH-mm", 'en-US');
                    date.setHours(date.getHours() + 1);
                    end = formatDate(date, "yyyy-MM-dd-HH-mm", 'en-US');
                    // Store date
                    this.storage.set("time_slot", { "start": start, "end": end })
                        .then(function () {
                        _this.navCtrl.navigateForward(['tabs/tabs/tab1/recommendation']);
                        _this.popoverControler.dismiss();
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    DateselectComponent = tslib_1.__decorate([
        Component({
            selector: 'app-dateselect',
            templateUrl: './dateselect.component.html',
            styleUrls: ['./dateselect.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [RecommendationProviderService,
            NavParams,
            NavController,
            ToastMessagingService,
            Storage,
            PopoverController])
    ], DateselectComponent);
    return DateselectComponent;
}());
export { DateselectComponent };
//# sourceMappingURL=dateselect.component.js.map