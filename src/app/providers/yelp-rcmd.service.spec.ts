import { TestBed } from '@angular/core/testing';

import { YelpRcmdService } from './yelp-rcmd.service';

describe('YelpRcmdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YelpRcmdService = TestBed.get(YelpRcmdService);
    expect(service).toBeTruthy();
  });
});
