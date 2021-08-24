import { TestBed } from '@angular/core/testing';

import { SessionStorageDataService } from './session-storage-data.service';

describe('SessionDataService', () => {
  let service: SessionStorageDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStorageDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
