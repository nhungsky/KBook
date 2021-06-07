import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UserCreateNewPostComponent } from '@app/social-network/social-home/user-create-new-post/user-create-new-post.component';
import { UserUpdatePostComponent } from '@app/social-network/social-home/user-update-post/user-update-post.component';
import { PostServiceProxy, UserServiceProxy, PlaceServiceProxy, PostCategoryServiceProxy, PostCommentServiceProxy, PostRatingServiceProxy, PlaceCategoryServiceProxy, TopCreatorDto, TopRatingUserDto, API_BASE_URL } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-social-sidebar-right',
  templateUrl: './social-sidebar-right.component.html',
  styleUrls: ['./social-sidebar-right.component.css']
})
export class SocialSidebarRightComponent implements OnInit {
  isTopRatingLoading: boolean = true;
  isTopPostLoading: boolean = true;

  topCreators: TopCreatorDto[] = [];
  topRating: TopRatingUserDto[] = [];

  public appBaseUrl = "";
  imageHolder = "";
  homeBannerLink = "";

  constructor(
    private _modalService: BsModalService,
    public postService: PostServiceProxy,
    public userService: UserServiceProxy,
    private _cdr: ChangeDetectorRef,
    public placeService: PlaceServiceProxy,
    public postCategoryService: PostCategoryServiceProxy,
    public postCommentService: PostCommentServiceProxy,
    public postRatingService: PostRatingServiceProxy,
    public placeCategoryService: PlaceCategoryServiceProxy,
    @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.appBaseUrl = baseUrl;
    this.imageHolder = this.appBaseUrl + abp.setting.get("IMAGE_HOLDER");
    this.homeBannerLink = this.standardImg(abp.setting.get("HOME_BANNER_LINK"));
  }

  async ngOnInit() {
    this.topCreators = await this.postService.topCreator(5).toPromise();
    this.isTopPostLoading = false;
    this.topRating = await this.postRatingService.topRatingUser(5).toPromise();
    this.isTopRatingLoading = false;
    this.changeStatus();
  }

  changeStatus(): void {
    setTimeout(() => {
      this._cdr.detectChanges()
    }, 500);
  }

  standardImg(path: string) {
    if (!path || path.length <= 0) {
      return this.imageHolder;
    }
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    } else {
      return `${this.appBaseUrl}/${path}`;
    }
  }

  createNewPost(): void {
    this.showCreateOrEditPostDialog();
  }

  showCreateOrEditPostDialog(id?: number): void {
    let createOrEditRoleDialog: BsModalRef;
    if (!id) {
      createOrEditRoleDialog = this._modalService.show(
        UserCreateNewPostComponent,
        {
          class: "modal-lg",
        }
      );
    } else {
      createOrEditRoleDialog = this._modalService.show(
        UserUpdatePostComponent,
        {
          class: "modal-lg",
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditRoleDialog.content.onSave.subscribe(() => {
      window.location.reload();
    });
  }
}
