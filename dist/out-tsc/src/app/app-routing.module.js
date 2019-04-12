import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
var routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    // { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
    {
        path: 'login',
        loadChildren: './login/login.module#LoginPageModule',
    },
    {
        path: 'tabs',
        canActivate: [AuthGuard],
        loadChildren: './tabs/tabs.module#TabsPageModule'
        // loadChildren: './tabs/tabs.router.module#TabsPageRoutingModule'  
    },
    {
        path: 'chatroom',
        canActivate: [AuthGuard],
        loadChildren: './chatroom/chatroom.module#ChatroomPageModule'
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map