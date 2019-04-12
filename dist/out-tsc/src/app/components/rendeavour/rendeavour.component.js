import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NavParams, PopoverController } from '@ionic/angular';
import { ToastMessagingService } from '../../services/toastmessaging.service';
import { InvitationProviderService } from '../../providers/invitation-provider.service';
import { UserinfoService } from '../../services/userinfo.service';
var RendeavourComponent = /** @class */ (function () {
    function RendeavourComponent(toastMessager, plantform, navParams, popoverControler, ivtProvider, userinfoService) {
        this.toastMessager = toastMessager;
        this.plantform = plantform;
        this.navParams = navParams;
        this.popoverControler = popoverControler;
        this.ivtProvider = ivtProvider;
        this.userinfoService = userinfoService;
        // Map Params
        this.zoom = 15;
        this.lat = 41.3128;
        this.lng = -72.9251;
        // UI Params
        this.showAcceptButton = false;
        this.showDeclineButton = false;
        this.showCancelButton = false;
    }
    RendeavourComponent.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.plantform.ready().then(function () {
                    _this.invitation = _this.navParams.get('invitation');
                    _this.pageStatus = _this.navParams.get('pageStatus');
                    _this.lat = _this.invitation.latitude;
                    _this.lng = _this.invitation.longitude;
                    if (_this.pageStatus == 'accepted') {
                        _this.showCancelButton = true;
                    }
                    else if (_this.pageStatus == 'received') {
                        _this.showDeclineButton = true;
                        _this.showAcceptButton = true;
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    RendeavourComponent.prototype.displayName = function (ivt) {
        if (ivt.senderId == this.userinfoService.user.id) {
            return ivt.rName;
        }
        else {
            return ivt.sName;
        }
    };
    RendeavourComponent.prototype.closePopover = function () {
        this.popoverControler.dismiss();
    };
    RendeavourComponent.prototype.acceptInvitation = function (ivt_id) {
        var _this = this;
        this.ivtProvider.acceptInvitation(ivt_id)
            .then(function (res) {
            _this.toastMessager.presentToast('Accepted!');
            _this.navParams.get('refresh')();
        })
            .catch(function (err) {
            _this.toastMessager.presentToast('Failed to accept invitation');
        })
            .finally(function () {
            _this.closePopover();
        });
    };
    RendeavourComponent.prototype.declineInvitation = function (ivt_id) {
        this.toastMessager.presentToast('Sorry, the decline function is not implemented yet..');
    };
    RendeavourComponent.prototype.cancelInvitation = function (ivt_id) {
        this.toastMessager.presentToast('Sorry, the cancelelation function is not implemented yet..');
        // this.closePopover();
    };
    RendeavourComponent = tslib_1.__decorate([
        Component({
            selector: 'app-rendeavour',
            templateUrl: './rendeavour.component.html',
            styleUrls: ['./rendeavour.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ToastMessagingService,
            Platform,
            NavParams,
            PopoverController,
            InvitationProviderService,
            UserinfoService])
    ], RendeavourComponent);
    return RendeavourComponent;
}());
export { RendeavourComponent };
//# sourceMappingURL=rendeavour.component.js.map