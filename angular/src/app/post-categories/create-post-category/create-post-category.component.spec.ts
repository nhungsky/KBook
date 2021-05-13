import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostCategoryComponent } from './create-post-category.component';

describe('CreatePostCategoryComponent', () => {
  let component: CreatePostCategoryComponent;
  let fixture: ComponentFixture<CreatePostCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePostCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
