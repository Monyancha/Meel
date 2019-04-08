import { TestBed } from '@angular/core/testing';

import { MockProviderService } from './mockprovider.service';

describe('MockProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockProviderService = TestBed.get(MockProviderService);
    expect(service).toBeTruthy();
  });
});
