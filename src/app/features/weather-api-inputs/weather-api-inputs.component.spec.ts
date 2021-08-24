import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherApiInputsComponent } from './weather-api-inputs.component';

describe('WeatherApiInputsComponent', () => {
  let component: WeatherApiInputsComponent;
  let fixture: ComponentFixture<WeatherApiInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherApiInputsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherApiInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
