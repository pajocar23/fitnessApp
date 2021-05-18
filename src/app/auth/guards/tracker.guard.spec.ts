import { TestBed } from '@angular/core/testing';

import { TrackerGuard } from './tracker.guard';

describe('TrackerGuard', () => {
  let guard: TrackerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TrackerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
