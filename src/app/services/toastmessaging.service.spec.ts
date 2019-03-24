import { TestBed } from '@angular/core/testing';

import { ToastMessagingService } from './toastmessaging.service';

describe('ToastMessagingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToastMessagingService = TestBed.get(ToastMessagingService);
    expect(service).toBeTruthy();
  });
});
