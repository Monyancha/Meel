import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { InvitationProviderService } from '../providers/invitation-provider.service';
var TabsPage = /** @class */ (function () {
    function TabsPage(ivtService) {
        this.ivtService = ivtService;
    }
    TabsPage = tslib_1.__decorate([
        Component({
            selector: 'app-tabs',
            templateUrl: 'tabs.page.html',
            styleUrls: ['tabs.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [InvitationProviderService])
    ], TabsPage);
    return TabsPage;
}());
export { TabsPage };
//# sourceMappingURL=tabs.page.js.map