import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { ToastMessagingService } from '../services/toastmessaging.service';
import { AuthenticationService } from '../services/authentication.service';
import { UserinfoService } from '../services/userinfo.service';
var InvitationProviderService = /** @class */ (function () {
    function InvitationProviderService(authenService, http, userinfoService, toastService) {
        this.authenService = authenService;
        this.http = http;
        this.userinfoService = userinfoService;
        this.toastService = toastService;
        this.sent_ivts = [];
        this.recv_ivts = [];
        this.acpt_ivts = [];
    }
    /*
     * API Function, send invitation body to server
     */
    InvitationProviderService.prototype.sentInvitation = function (ivtBody) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.authenService.apiUrl + "/eatLater/sendInvitation", ivtBody, { responseType: "text" })
                .toPromise()
                .then(function (res) { return resolve(res); })
                .catch(function (err) { return reject(err); });
            setTimeout(function () { return reject("Error Sending Invitation: Timeout"); }, 5000);
        });
    };
    /*
     * API Function, inform server that an invitation is accepted
     */
    InvitationProviderService.prototype.acceptInvitation = function (ivt_id) {
        var _this = this;
        console.log("Sending accept invitation, id = ", ivt_id);
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.authenService.apiUrl + "/invitation/accept", {}, { params: { "invitation_id": ivt_id }, responseType: "text" })
                .toPromise()
                .then(function (res) {
                console.log("Accept Invitation: success ", res);
                resolve(true);
            })
                .catch(function (err) {
                console.log("Accept Invitation: failed ", err);
                reject(err);
            });
            setTimeout(function () { return reject("Error accepting invitation: Timeout"); }, 5000);
        });
    };
    /*
     * API Function, fetch new invitation list (new/old etc..)
     */
    InvitationProviderService.prototype.getNewList = function (sub_api) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.authenService.apiUrl + sub_api + _this.userinfoService.user.id)
                .toPromise()
                .then(function (res) {
                console.log("New list ${sub_api} received:");
                res = res;
                console.table(res);
                resolve(res);
            })
                .catch(function (err) {
                console.log(err);
                reject(err);
            });
            setTimeout(function () { return reject("Error fetching invitation list: Timeout"); }, 5000);
        });
    };
    /*
     * Convert formatted date into readable string
     */
    InvitationProviderService.prototype.readableDate = function (dateStr) {
        var date = new Date();
        var slot = dateStr.split('-');
        date.setFullYear(Number(slot[0]));
        date.setMonth(Number(slot[1]) - 1, Number(slot[2]));
        date.setHours(Number(slot[3]), Number(slot[4]));
        var now = new Date();
        var front;
        if (date.getFullYear() != now.getFullYear()) {
            front = formatDate(date, "MMM d, yyyy", 'en-US');
        }
        else if (date.getMonth() != now.getMonth()) {
            front = formatDate(date, "MMM d(E)", 'en-US');
        }
        else if (date.getDay() == now.getDay()) {
            front = "Today";
        }
        else if (date.getDay() == now.getDay() + 1) {
            front = "Tomorrow";
        }
        else {
            front = formatDate(date, "MMM d(E)", 'en-US');
        }
        return front;
    };
    /*
     * Convert formatted date into readable string
     */
    InvitationProviderService.prototype.readableHour = function (startStr, endStr) {
        var start = new Date(), end = new Date();
        var slot = startStr.split('-');
        start.setMonth(Number(slot[1]) - 1, Number(slot[2]));
        start.setHours(Number(slot[3]), Number(slot[4]));
        var slot = endStr.split('-');
        end.setMonth(Number(slot[1]) - 1, Number(slot[2]));
        end.setHours(Number(slot[3]), Number(slot[4]));
        var tail = formatDate(start, "hh:mm aa", 'en-US');
        tail += " to " + formatDate(end, "hh:mm aa", 'en-US');
        if (start.getDay() != end.getDay()) {
            tail += "(tmw)";
        }
        return tail;
    };
    InvitationProviderService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            HttpClient,
            UserinfoService,
            ToastMessagingService])
    ], InvitationProviderService);
    return InvitationProviderService;
}());
export { InvitationProviderService };
//# sourceMappingURL=invitation-provider.service.js.map