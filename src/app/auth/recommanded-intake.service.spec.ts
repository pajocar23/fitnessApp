import { TestBed } from '@angular/core/testing';

import { RecommandedIntakeService } from './recommanded-intake.service';

describe('RecommandedIntakeService', () => {
  let service: RecommandedIntakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecommandedIntakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
