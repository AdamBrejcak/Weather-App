import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentWithMenuComponent } from './content-with-menu.component';

describe('ContentWmenuComponent', () => {
  let component: ContentWithMenuComponent;
  let fixture: ComponentFixture<ContentWithMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentWithMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentWithMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
