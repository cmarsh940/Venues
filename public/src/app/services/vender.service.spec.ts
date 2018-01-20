import { TestBed, inject } from '@angular/core/testing';

import { VenderService } from './vender.service';

describe('VenderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VenderService]
    });
  });

  it('should be created', inject([VenderService], (service: VenderService) => {
    expect(service).toBeTruthy();
  }));
});
