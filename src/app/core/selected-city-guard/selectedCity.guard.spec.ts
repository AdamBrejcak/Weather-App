import { TestBed } from '@angular/core/testing';

import { SelectedCityGuard } from './selectedCity.guard';

describe('AuthGuardGuard', () => {
  let guard: SelectedCityGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SelectedCityGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
