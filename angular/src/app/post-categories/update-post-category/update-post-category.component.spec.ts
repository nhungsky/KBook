import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePostCategoryComponent } from './update-post-category.component';

describe('UpdatePostCategoryComponent', () => {
  let component: UpdatePostCategoryComponent;
  let fixture: ComponentFixture<UpdatePostCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePostCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePostCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
