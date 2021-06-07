import { Component, HostListener, Inject, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { API_BASE_URL, FavoriteObjectServiceProxy, PostDisplayDto, PostRatingServiceProxy, PostServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';

declare function showLoading(): any;
declare function hideLoading(): any;

@Component({
  selector: 'app-social-home',
  templateUrl: './social-home.component.html',
  styleUrls: ['./social-home.component.css'],
  animations: [appModuleAnimation()],
})
export class SocialHomeComponent extends AppComponentBase implements OnInit {
  public appBaseUrl = "";
  imageHolder = "";

  isLoading: boolean = false;
  keyword: string = "";
  currentPostCategoryId: number = null;
  skipCount = 0;
  maxResultCount = 3;

  postLists: PostDisplayDto[] = [];

  favoriteUserIds: number[] = [];

  constructor(
    injector: Injector,
    public postService: PostServiceProxy,
    public favoriteObjectService: FavoriteObjectServiceProxy,
    public postRatingService: PostRatingServiceProxy,
    @Inject(API_BASE_URL) baseUrl?: string) {
    super(injector);
    this.appBaseUrl = baseUrl;
    this.imageHolder = this.appBaseUrl + abp.setting.get("IMAGE_HOLDER");

    favoriteObjectService.getFavoriteUserIds()
      .pipe()
      .subscribe(ids => {
        this.favoriteUserIds = ids;
      });
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

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    if (this.isLoading)
      return;
    this.isLoading = true;
    this.postService
      .getPostsLanding(this.keyword, true, this.currentPostCategoryId, this.skipCount, this.maxResultCount)
      .pipe()
      .subscribe(res => {
        this.postLists.push(...res.items);
        this.isLoading = false;
        this.skipCount += res.items.length;
      })
  }

  calPreviousHours(time: moment.Moment) {
    const now = moment(new Date());
    const res = moment.duration(now.diff(time));
    return res.asHours();
  }

  calRoundPrevHours(time: moment.Moment) {
    var res = this.calPreviousHours(time);
    return Math.round(res).toString();
  }

  onPutFavoriteUser(userId: number) {
  }

  onPutFavoritePost(postId: number) {

  }

  onPostRatingChange(value: number, postId: number) {
    if (!postId || postId <= 0) {
      return;
    }

    showLoading();
    this.postRatingService.putRating(postId, value)
      .pipe()
      .subscribe(avrgRating => {
        const index = this.postLists.findIndex(x => x.id == postId);
        this.postLists[index].postRatingAvrg = avrgRating;
        if (this.postLists[index].yourRating <= 0) {
          this.postLists[index].postRatingCount++;
        }
        hideLoading();
      });
  }



  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos > max - 100) {
      this.loadPosts();
    }
  }
}
