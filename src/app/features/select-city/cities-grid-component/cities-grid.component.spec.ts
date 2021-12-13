import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitiesGridComponent } from './cities-grid.component';

describe('GridComponent', () => {
  let component: CitiesGridComponent;
  let fixture: ComponentFixture<CitiesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CitiesGridComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
