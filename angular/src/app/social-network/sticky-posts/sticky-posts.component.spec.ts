import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyPostsComponent } from './sticky-posts.component';

describe('StickyPostsComponent', () => {
  let component: StickyPostsComponent;
  let fixture: ComponentFixture<StickyPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickyPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StickyPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
