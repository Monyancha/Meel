import { TestBed } from '@angular/core/testing';
import { RecommendationProviderService } from './recommendation-provider.service';
describe('RecommendationProviderService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(RecommendationProviderService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=recommendation-provider.service.spec.js.map