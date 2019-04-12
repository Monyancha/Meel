import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { User } from '../model/users';
import { Invitation } from '../model/invitation';
var MockProviderService = /** @class */ (function () {
    function MockProviderService() {
        this._mock_users = [];
        this._mock_invitations = [];
        for (var i = 0; i < 32; i++) {
            var newuser = new User;
            newuser.randomize();
            this._mock_users.push(newuser);
            var newInvite = new Invitation;
            newInvite.randomize();
            this._mock_invitations.push(newInvite);
        }
    }
    MockProviderService.prototype.getRandomUser = function () {
        var i = Math.floor(Math.random() * this._mock_users.length);
        return this._mock_users[i];
    };
    MockProviderService.prototype.getRandomInvitation = function () {
        var i = Math.floor(Math.random() * this._mock_invitations.length);
        return this._mock_invitations[i];
    };
    MockProviderService.prototype.getRandomUsers = function (number) {
        var res = [];
        for (var i = 0; i < number; i++) {
            res.push(this.getRandomUser());
        }
        return res;
    };
    MockProviderService.prototype.getRandomInvitations = function (number) {
        var res = [];
        for (var i = 0; i < number; i++) {
            res.push(this.getRandomInvitation());
        }
        return res;
    };
    MockProviderService.prototype.getRandomUsersAsync = function (number) {
        var _this = this;
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve(_this.getRandomUsers(number));
            }, 1000);
        });
    };
    MockProviderService.prototype.getRandomInvitationsAsync = function (number) {
        var _this = this;
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve(_this.getRandomInvitations(number));
            }, 1000);
        });
    };
    MockProviderService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], MockProviderService);
    return MockProviderService;
}());
export { MockProviderService };
//# sourceMappingURL=mockprovider.service.js.map