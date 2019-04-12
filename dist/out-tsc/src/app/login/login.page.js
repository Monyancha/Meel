import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { UserinfoService } from '../services/userinfo.service';
import { AuthenticationService } from '../services/authentication.service';
import { ToastMessagingService } from '../services/toastmessaging.service';
var LoginPage = /** @class */ (function () {
    function LoginPage(ionicDb, toastMessager, userinfoService, authService, loadingController, http) {
        this.ionicDb = ionicDb;
        this.toastMessager = toastMessager;
        this.userinfoService = userinfoService;
        this.authService = authService;
        this.loadingController = loadingController;
        this.http = http;
        this.inputPlaceholder = " Email";
        this.mainButtonText = "LOGIN";
        this.createAccountText = "Don't have an account?";
        this.termTexts = "";
    }
    LoginPage.prototype.ngOnInit = function () {
    };
    /*
     * Setup current user after we have user id from server side.
     * this including fetch user profile and set TOKEN_KEY
     */
    LoginPage.prototype.loginWithUserId = function (user_id) {
        var _this = this;
        console.log('Loging with id:' + user_id);
        this.userinfoService.user.id = user_id.toString();
        // Fetch user profile
        console.log('this.userinfoService.user.id = ', this.userinfoService.user.id);
        this.userinfoService.getLatestUserProfile().then(function () {
            _this.userinfoService.setToken().then(function (res) {
                if (res) {
                    _this.authService.checkToken();
                    _this.toastMessager.presentToast("Welcome back!");
                }
                else {
                    _this.toastMessager.presentError('Failed to set TOKEN, please try again later');
                }
            })
                .catch(function (err) { return _this.toastMessager.presentError(err); });
        })
            .catch(function (err) { return _this.toastMessager.presentError(err); })
            .finally(function () { return _this.userinfoService.uploadLocation(); });
    };
    /*
     * check validity of email address
     */
    LoginPage.prototype.checkEmail = function (email) {
        if (email.length == 0) {
            this.toastMessager.presentToast("Please fill-in you email");
            return false;
        }
        if (email.length < 4 || email.search('@') == -1) {
            this.toastMessager.presentToast("Please provide a valid email address");
            return false;
        }
        return true;
    };
    /*
     * Check validity of password.
     */
    LoginPage.prototype.checkPassword = function (pswd) {
        if (pswd.length == 0) {
            this.toastMessager.presentToast("Please fill-in you password");
            return false;
        }
        if (pswd.length < 6) {
            this.toastMessager.presentToast("Password must have minimum length of 6");
            return false;
        }
        return true;
    };
    /*
     * login
     */
    LoginPage.prototype.login = function (email, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoadingPopover()];
                    case 1:
                        _a.sent();
                        this.authService.login(email, password).subscribe(function (res) {
                            _this.loginWithUserId(res);
                        }, function (err) {
                            _this.toastMessager.presentError(err);
                        }).add(function () { return _this.dismissLoadingPopover(); });
                        return [2 /*return*/];
                }
            });
        });
    };
    /*
     * register
     */
    LoginPage.prototype.register = function (email, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.presentLoadingPopover()];
                    case 1:
                        _a.sent();
                        this.authService.register(email, password).subscribe(function (res) {
                            _this.loginWithUserId(res);
                        }, function (err) {
                            _this.toastMessager.presentError(err);
                        }).add(function () { return _this.dismissLoadingPopover(); });
                        return [2 /*return*/];
                }
            });
        });
    };
    /*
     * Main button in login page, used to login or register
     */
    LoginPage.prototype.mainButton = function (email, password) {
        if (email == "adamzjk" && password == "adamzjk") {
            this.loginWithUserId('admin_user_adamzjk');
        }
        else if (this.checkEmail(email) && this.checkPassword(password)) {
            // todo 03221355 password entryption
            // Sending Requests
            if (this.mainButtonText == "LOGIN") {
                this.login(email, password);
            }
            else {
                this.register(email, password);
            }
        }
    };
    /*
     * login with fb,
     */
    LoginPage.prototype.loginWithFacebook = function () {
        this.toastMessager.presentToast("Function temporarily disabled");
        // this.authService.loginWithFacebook();
        // .then(
        //   () => this.router.navigate(['tabs']),
        //   error => console.log(error.message)
        // );
    };
    /*
     * change some texts and button behavior
     */
    LoginPage.prototype.switchLoginRegister = function () {
        if (this.mainButtonText == "LOGIN") {
            this.mainButtonText = "REGISTER";
            this.createAccountText = "Already have an account?";
            this.termTexts = "By tapping Register,you agree with our <b><u>Terms of Services</u></b> and <b><u>Privacy Ploicy</u></b>.";
        }
        else {
            this.mainButtonText = "LOGIN";
            this.createAccountText = "Don't have an account?";
            this.termTexts = "";
        }
    };
    /*
     * not implemented
     */
    LoginPage.prototype.pswReset = function () {
        this.toastMessager.presentToast("Function not implemented");
    };
    LoginPage.prototype.dismissLoadingPopover = function () {
        console.log("Dismissing Popover..");
        return this.currentLoadingCtrl.dismiss();
    };
    LoginPage.prototype.presentLoadingPopover = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                spinner: 'crescent',
                                duration: 16000,
                                message: 'Please wait...',
                                translucent: false,
                                cssClass: 'login-loading'
                            })];
                    case 1:
                        _a.currentLoadingCtrl = _b.sent();
                        return [2 /*return*/, this.currentLoadingCtrl.present()];
                }
            });
        });
    };
    LoginPage.prototype.test = function () {
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], LoginPage.prototype, "events", void 0);
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Storage,
            ToastMessagingService,
            UserinfoService,
            AuthenticationService,
            LoadingController,
            HttpClient])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map