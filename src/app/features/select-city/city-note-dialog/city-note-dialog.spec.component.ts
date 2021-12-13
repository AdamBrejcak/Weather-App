import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CityNoteDialogComponent } from './city-note-dialog.component';

describe('WeatherTableComponent', () => {
  let component: CityNoteDialogComponent;
  let fixture: ComponentFixture<CityNoteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CityNoteDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
