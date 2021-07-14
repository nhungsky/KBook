import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUserProfileComponent } from './modal-user-profile.component';

describe('ModalUserProfileComponent', () => {
  let component: ModalUserProfileComponent;
  let fixture: ComponentFixture<ModalUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUserProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
