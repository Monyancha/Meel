import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
var AuthGuard = /** @class */ (function () {
    function AuthGuard(auth) {
        this.auth = auth;
    }
    AuthGuard.prototype.canActivate = function () {
        return this.auth.isAuthenticated();
    };
    AuthGuard = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService])
    ], AuthGuard);
    return AuthGuard;
}());
export { AuthGuard };
// export class AuthGuard implements CanActivate {
//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//     return true;
//   }
// }
//# sourceMappingURL=auth.guard.js.map