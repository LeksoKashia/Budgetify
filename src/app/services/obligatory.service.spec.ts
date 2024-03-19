import { TestBed } from '@angular/core/testing';

import { ObligatoryService } from './obligatory.service';

describe('ObligatoryService', () => {
  let service: ObligatoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObligatoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
