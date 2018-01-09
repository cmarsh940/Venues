import { TestBed, inject } from '@angular/core/testing';

import { AmmenityService } from './ammenity.service';

describe('AmmenityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AmmenityService]
    });
  });

  it('should be created', inject([AmmenityService], (service: AmmenityService) => {
    expect(service).toBeTruthy();
  }));
});
