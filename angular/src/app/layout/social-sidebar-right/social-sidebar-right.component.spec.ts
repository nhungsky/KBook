import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialSidebarRightComponent } from './social-sidebar-right.component';

describe('SocialSidebarRightComponent', () => {
  let component: SocialSidebarRightComponent;
  let fixture: ComponentFixture<SocialSidebarRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialSidebarRightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialSidebarRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
