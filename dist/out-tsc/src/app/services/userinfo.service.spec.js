import { TestBed } from '@angular/core/testing';
import { UserinfoService } from './userinfo.service';
describe('UserinfoService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(UserinfoService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=userinfo.service.spec.js.map