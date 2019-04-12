import { TestBed } from '@angular/core/testing';
import { YelpRcmdService } from './yelp-rcmd.service';
describe('YelpRcmdService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(YelpRcmdService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=yelp-rcmd.service.spec.js.map