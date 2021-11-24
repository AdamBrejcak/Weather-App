import { TestBed } from '@angular/core/testing';

import { CitiesNotesService } from './cities-notes.service';

describe('EmitServiceService', () => {
  let service: CitiesNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitiesNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
