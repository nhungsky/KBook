import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPlacesComponent } from './modal-places.component';

describe('ModalPlacesComponent', () => {
  let component: ModalPlacesComponent;
  let fixture: ComponentFixture<ModalPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPlacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
