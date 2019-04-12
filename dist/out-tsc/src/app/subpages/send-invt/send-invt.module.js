import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SendInvtPage } from './send-invt.page';
import { AgmCoreModule } from '@agm/core';
var routes = [
    {
        path: '',
        component: SendInvtPage
    }
];
var SendInvtPageModule = /** @class */ (function () {
    function SendInvtPageModule() {
    }
    SendInvtPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyCYq0XB4TWCDdKS9gWGaeb2B4q0HeVTS5M',
                    libraries: ["places"]
                })
            ],
            declarations: [SendInvtPage]
        })
    ], SendInvtPageModule);
    return SendInvtPageModule;
}());
export { SendInvtPageModule };
//# sourceMappingURL=send-invt.module.js.map