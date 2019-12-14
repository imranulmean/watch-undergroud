import { TestBed } from '@angular/core/testing';

import { AllChannelService } from './all-channel.service';

describe('AllChannelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllChannelService = TestBed.get(AllChannelService);
    expect(service).toBeTruthy();
  });
});
