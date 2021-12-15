import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCityDialogComponent } from './edit-city-dialog.component';

describe('WeatherTableComponent', () => {
  let component: EditCityDialogComponent;
  let fixture: ComponentFixture<EditCityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCityDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
