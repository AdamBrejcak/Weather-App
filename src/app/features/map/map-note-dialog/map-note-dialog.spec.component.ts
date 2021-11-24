import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapNoteDialogComponent } from './map-note-dialog.component';

describe('WeatherTableComponent', () => {
  let component: MapNoteDialogComponent;
  let fixture: ComponentFixture<MapNoteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapNoteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
