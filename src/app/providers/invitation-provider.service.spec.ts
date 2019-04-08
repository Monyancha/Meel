import { TestBed } from '@angular/core/testing';

import { InvitationProviderService } from './invitation-provider.service';

describe('InvitationProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvitationProviderService = TestBed.get(InvitationProviderService);
    expect(service).toBeTruthy();
  });
});
