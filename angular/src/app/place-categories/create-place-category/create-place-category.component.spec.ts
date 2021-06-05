import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlaceCategoryComponent } from './create-place-category.component';

describe('CreatePlaceCategoryComponent', () => {
  let component: CreatePlaceCategoryComponent;
  let fixture: ComponentFixture<CreatePlaceCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePlaceCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePlaceCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
