import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateNewPostComponent } from './user-create-new-post.component';

describe('UserCreateNewPostComponent', () => {
  let component: UserCreateNewPostComponent;
  let fixture: ComponentFixture<UserCreateNewPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCreateNewPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateNewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
