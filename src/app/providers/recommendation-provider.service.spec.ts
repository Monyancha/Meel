import { TestBed } from '@angular/core/testing';

import { RecommendationProviderService } from './recommendation-provider.service';

describe('RecommendationProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecommendationProviderService = TestBed.get(RecommendationProviderService);
    expect(service).toBeTruthy();
  });
});
