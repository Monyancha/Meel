import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
var ToastMessagingService = /** @class */ (function () {
    function ToastMessagingService(toastController) {
        this.toastController = toastController;
        this.currentToast = null;
    }
    ToastMessagingService.prototype.presentError = function (error) {
        console.log('Toast: Error Received - ', error);
        var msg = 'Unknown Error ' + error;
        if (error.status == 0) {
            msg = "ERROR: Connection Refused\nPlease try again later or check server status.";
        }
        else if (typeof error === 'string') {
            msg = error;
        }
        else if (typeof error.error === 'string') {
            msg = error.error;
        }
        else if (typeof error.error.message === 'string') {
            msg = error.error.message;
        }
        else if (typeof error.message === 'string') {
            msg = error.message;
        }
        console.log("presentError: ", msg);
        this.presentToast(msg, 'danger');
    };
    ToastMessagingService.prototype.presentToast = function (msg, color) {
        if (color === void 0) { color = 'dark'; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var timeToShow, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.currentToast) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.currentToast.dismiss()];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        timeToShow = 2048;
                        if (color == 'danger')
                            timeToShow *= 2;
                        _a = this;
                        return [4 /*yield*/, this.toastController.create({
                                color: color,
                                message: msg,
                                duration: timeToShow,
                                showCloseButton: false,
                                cssClass: "basic-toast-style",
                                position: 'top',
                            })];
                    case 3:
                        _a.currentToast = _b.sent();
                        this.currentToast.present();
                        console.log("ToastmessagingService: " + msg);
                        return [2 /*return*/];
                }
            });
        });
    };
    ToastMessagingService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [ToastController])
    ], ToastMessagingService);
    return ToastMessagingService;
}());
export { ToastMessagingService };
//# sourceMappingURL=toastmessaging.service.js.map