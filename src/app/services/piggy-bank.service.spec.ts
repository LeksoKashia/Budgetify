import { TestBed } from '@angular/core/testing';

import { PiggyBankService } from './piggy-bank.service';

describe('PiggyBankService', () => {
  let service: PiggyBankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PiggyBankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
