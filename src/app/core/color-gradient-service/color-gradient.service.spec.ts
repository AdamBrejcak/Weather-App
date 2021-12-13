import { TestBed } from '@angular/core/testing';

import { ColorGradientService } from './color-gradient.service';

describe('ColorGradientService', () => {
  let service: ColorGradientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorGradientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
