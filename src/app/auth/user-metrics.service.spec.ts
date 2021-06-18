import { TestBed } from '@angular/core/testing';

import { UserMetricsService } from './user-metrics.service';

describe('UserMetricsService', () => {
  let service: UserMetricsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMetricsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
