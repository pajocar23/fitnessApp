import { TestBed } from '@angular/core/testing';

import { AdminOptionsGuardGuard } from './admin-options-guard.guard';

describe('AdminOptionsGuardGuard', () => {
  let guard: AdminOptionsGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminOptionsGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
