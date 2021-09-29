import { TestBed } from '@angular/core/testing';
import { DateOperationsService } from './date-operations.service';

describe('DateOperationsService', () => {
  let service: DateOperationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateOperationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
