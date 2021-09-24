import { TestBed } from '@angular/core/testing';

import { FilterLineChartDataService } from './filter-data.service';

describe('FormatDataServiceService', () => {
  let service: FilterLineChartDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterLineChartDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
