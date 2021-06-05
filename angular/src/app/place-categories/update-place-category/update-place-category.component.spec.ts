import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePlaceCategoryComponent } from './update-place-category.component';

describe('UpdatePlaceCategoryComponent', () => {
  let component: UpdatePlaceCategoryComponent;
  let fixture: ComponentFixture<UpdatePlaceCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePlaceCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePlaceCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
