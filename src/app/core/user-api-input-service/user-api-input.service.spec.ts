import { TestBed } from '@angular/core/testing';

import { UserApiInputService } from './user-api-input.service';

describe('EmitServiceService', () => {
  let service: UserApiInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserApiInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
