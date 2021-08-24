import { TestBed } from '@angular/core/testing';

import { FilterDataService } from './filter-data.service';

describe('FormatDataServiceService', () => {
  let service: FilterDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
