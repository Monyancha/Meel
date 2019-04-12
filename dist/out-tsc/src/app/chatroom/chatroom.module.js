import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ChatroomPage } from './chatroom.page';
var routes = [
    {
        path: '',
        component: ChatroomPage
    }
];
var ChatroomPageModule = /** @class */ (function () {
    function ChatroomPageModule() {
    }
    ChatroomPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ChatroomPage]
        })
    ], ChatroomPageModule);
    return ChatroomPageModule;
}());
export { ChatroomPageModule };
//# sourceMappingURL=chatroom.module.js.map