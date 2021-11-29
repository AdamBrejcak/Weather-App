import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentWithHeadingComponent } from './content-with-heading.component';

describe('ContentWithHeadingComponent', () => {
  let component: ContentWithHeadingComponent;
  let fixture: ComponentFixture<ContentWithHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentWithHeadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentWithHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
