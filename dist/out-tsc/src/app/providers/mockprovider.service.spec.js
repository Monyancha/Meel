import { TestBed } from '@angular/core/testing';
import { MockProviderService } from './mockprovider.service';
describe('MockProviderService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(MockProviderService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=mockprovider.service.spec.js.map