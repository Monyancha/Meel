import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RecommendationPage } from './recommendation.page';
var routes = [
    {
        path: '',
        component: RecommendationPage
    }
];
var RecommendationPageModule = /** @class */ (function () {
    function RecommendationPageModule() {
    }
    RecommendationPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [
                RecommendationPage
            ],
        })
    ], RecommendationPageModule);
    return RecommendationPageModule;
}());
export { RecommendationPageModule };
//# sourceMappingURL=recommendation.module.js.map