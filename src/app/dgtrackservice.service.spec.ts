import { TestBed, inject } from '@angular/core/testing';

import { DgtrackserviceService } from './dgtrackservice.service';

describe('DgtrackserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DgtrackserviceService]
    });
  });

  it('should be created', inject([DgtrackserviceService], (service: DgtrackserviceService) => {
    expect(service).toBeTruthy();
  }));
});
