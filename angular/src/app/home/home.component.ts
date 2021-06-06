import { Component, Injector, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PlaceCategoryServiceProxy, PlaceServiceProxy, PostCategoryServiceProxy, PostCommentServiceProxy, PostRatingServiceProxy, PostServiceProxy, TopCreatorDto, TopRatingUserDto, UserDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';

declare function showLoading(): any;
declare function hideLoading(): any;

@Component({
  templateUrl: './home.component.html',
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent extends AppComponentBase implements OnInit {
  postCount: number = 0;
  userCount: number = 0;
  placeCount: number = 0;

  commentCount: number = 0;
  ratingCount: number = 0;
  postCategoryCount: number = 0;
  placeCategoryCount: number = 0;

  topCreators: TopCreatorDto[] = [];
  topRating: TopRatingUserDto[] = [];

  constructor(injector: Injector,
    public postService: PostServiceProxy,
    public userService: UserServiceProxy,
    private _cdr: ChangeDetectorRef,
    public placeService: PlaceServiceProxy,
    public postCategoryService: PostCategoryServiceProxy,
    public postCommentService: PostCommentServiceProxy,
    public postRatingService: PostRatingServiceProxy,
    public placeCategoryService: PlaceCategoryServiceProxy
  ) {
    super(injector);
  }
  async ngOnInit() {
    showLoading();
    this.postCount = await this.postService.count().toPromise();
    this.userCount = await this.userService.count().toPromise();
    this.placeCount = await this.placeService.count().toPromise();

    this.commentCount = await this.postCommentService.count().toPromise();
    this.ratingCount = await this.postRatingService.count().toPromise();
    this.postCategoryCount = await this.postCategoryService.count().toPromise();
    this.placeCategoryCount = await this.placeCategoryService.count().toPromise();

    this.topCreators = await this.postService.topCreator(5).toPromise();
    console.log(this.topCreators);
    this.topRating = await this.postRatingService.topRatingUser(5).toPromise();

    console.log(this.topRating);


    this.changeStatus();
    hideLoading();
  }
  changeStatus(): void {
    setTimeout(() => {
      this._cdr.detectChanges()
    }, 500);
  }
}
