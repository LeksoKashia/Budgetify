import { TestBed } from '@angular/core/testing';

import { TransactionCategoriesService } from './transaction-categories.service';

describe('TransactionCategoriesService', () => {
  let service: TransactionCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
