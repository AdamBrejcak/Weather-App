import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCityDialogComponent } from './add-city-dialog.component';

describe('WeatherTableComponent', () => {
  let component: AddCityDialogComponent;
  let fixture: ComponentFixture<AddCityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCityDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
