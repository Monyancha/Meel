import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
var TokenInterceptor = /** @class */ (function () {
    function TokenInterceptor(router, authService, toastController) {
        this.router = router;
        this.authService = authService;
        this.toastController = toastController;
    }
    TokenInterceptor.prototype.intercept = function (request, next) {
        // const token = localStorage.getItem('token');
        var _this = this;
        // if (token) {
        //   request = request.clone({
        //     setHeaders: {
        //       'Authorization': token
        //     }
        //   });
        // }
        if (!request.headers.has('Content-Type')) {
            request = request.clone({
                setHeaders: {
                    'content-type': 'application/json'
                }
            });
        }
        request = request.clone({
            headers: request.headers.set('Accept', 'application/json')
        });
        return next.handle(request).pipe(map(function (event) {
            if (event instanceof HttpResponse) {
                console.log('event--->>>', event);
            }
            return event;
        }), catchError(function (error) {
            if (error.status === 401) {
                if (error.error.success === false) {
                    _this.presentToast('Login failed');
                }
                else {
                    _this.authService.logout();
                    _this.router.navigate(['login']);
                }
            }
            return throwError(error);
        }));
    };
    TokenInterceptor.prototype.presentToast = function (msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: msg,
                            duration: 2000,
                            position: 'top'
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    TokenInterceptor = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Router,
            AuthenticationService,
            ToastController])
    ], TokenInterceptor);
    return TokenInterceptor;
}());
export { TokenInterceptor };
//# sourceMappingURL=interceptor.service.js.map