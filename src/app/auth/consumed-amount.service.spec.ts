import { TestBed } from '@angular/core/testing';

import { ConsumedAmountService } from './consumed-amount.service';

describe('ConsumedAmountService', () => {
  let service: ConsumedAmountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumedAmountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
