import { TestBed } from '@angular/core/testing';
import { InterceptorService } from './interceptor.service';
describe('InterceptorService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(InterceptorService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=interceptor.service.spec.js.map