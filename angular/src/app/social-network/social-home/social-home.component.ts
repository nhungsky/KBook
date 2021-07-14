import {Component, HostListener, Inject, Injector, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {appModuleAnimation} from '@shared/animations/routerTransition';
import {AppComponentBase} from '@shared/app-component-base';
import {
    API_BASE_URL,
    FavoriteObjectServiceProxy,
    PostCategoryDto,
    PostCategoryServiceProxy,
    PostDisplayDto, PostDto,
    PostRatingServiceProxy,
    PostServiceProxy
} from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import {finalize} from 'rxjs/operators';
import {UpdateMyProfileComponent} from '../../layout/social-header/update-my-profile/update-my-profile.component';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ReadPostComponent} from './read-post/read-post.component';

declare function showLoading(): any;

declare function hideLoading(): any;

@Component({
    selector: 'app-social-home',
    templateUrl: './social-home.component.html',
    styleUrls: ['./social-home.component.css'],
    animations: [appModuleAnimation()],
})
export class SocialHomeComponent extends AppComponentBase implements OnInit {
    public appBaseUrl = '';
    imageHolder = '';

    currentUserId = abp.session.userId;

    isLoading = false;
    keyword = '';
    currentPostCategoryId: number = null;
    skipCount = 0;
    maxResultCount = 3;

    postLists: PostDisplayDto[] = [];

    favoriteUserIds: number[] = [];
    favoritePostIds: number[] = [];

    currentCatSlug = '';
    postCategory: PostCategoryDto = null;


    constructor(
        injector: Injector,
        public postService: PostServiceProxy,
        public postCategoryService: PostCategoryServiceProxy,
        public favoriteObjectService: FavoriteObjectServiceProxy,
        public postRatingService: PostRatingServiceProxy,
        private _modalService: BsModalService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        @Inject(API_BASE_URL) baseUrl?: string) {
        super(injector);
        this.appBaseUrl = baseUrl;
        this.imageHolder = this.appBaseUrl + abp.setting.get('IMAGE_HOLDER');

        favoriteObjectService.getFavoriteUserIds()
            .pipe()
            .subscribe(ids => {
                this.favoriteUserIds = ids;
            });

        favoriteObjectService.getFavoritePostIds()
            .pipe()
            .subscribe(ids => {
                this.favoritePostIds = ids;
            });

        this.activatedRoute.params.subscribe(params => {
            const catSlug = params['catSlug'];
            this.currentCatSlug = catSlug;
            this.clear();
            if (this.currentCatSlug && this.currentCatSlug.length > 0) {
                this.postCategoryService.getBySlug(this.currentCatSlug)
                    .pipe()
                    .subscribe(pc => {
                        this.postCategory = pc;
                        this.currentPostCategoryId = pc.id;
                        this.loadPosts();
                    });
            } else {
                this.loadPosts();
            }
        });
    }

    async delete(postId: number) {
        const postDto = await this.postService.get(postId).toPromise();
        abp.message.confirm(
            this.l('PostCategoryDeleteWarningMessage', postDto.title),
            undefined,
            (result: boolean) => {
                if (result) {
                    this.postService
                        .delete(postDto.id)
                        .pipe(
                            finalize(() => {
                                abp.notify.success(this.l('SuccessfullyDeleted'));
                                window.location.reload();
                            })
                        )
                        .subscribe(() => {
                        });
                }
            }
        );
    }

    clear() {
        this.keyword = '';
        this.skipCount = 0;
        this.maxResultCount = 3;
        this.postLists = [];
    }

    isPostInFavorite(postId) {
        return this.favoritePostIds.findIndex(x => x === postId) >= 0;
    }

    isUserInFavorite(userId) {
        return this.favoriteUserIds.findIndex(x => x === userId) >= 0;
    }

    standardImg(path: string) {
        if (!path || path.length <= 0) {
            return this.imageHolder;
        }
        if (path.startsWith('http://') || path.startsWith('https://')) {
            return path;
        } else {
            return `${this.appBaseUrl}/${path}`;
        }
    }

    ngOnInit(): void {

    }

    loadPosts() {
        if (this.isLoading) {
            return;
        }
        this.isLoading = true;
        this.postService
            .getPostsLanding(this.keyword, true, this.currentPostCategoryId, this.skipCount, this.maxResultCount)
            .pipe()
            .subscribe(res => {
                this.postLists.push(...res.items);
                this.isLoading = false;
                this.skipCount += res.items.length;
            });
    }

    calPreviousHours(time: moment.Moment) {
        const now = moment(new Date());
        const res = moment.duration(now.diff(time));
        return res.asHours();
    }

    calTime(time: moment.Moment) {
        const res = this.calPreviousHours(time);
        const hours = Math.round(res);
        if (hours < 1) {
            const minutes = Math.ceil(hours * 60);
            return `${minutes} phút`;
        }
        if (hours < 24) {
            return hours + ' giờ';
        } else {
            const days = Math.round(hours / 24);
            return `${days} ngày`;
        }
    }

    onPutFavoriteUser(userId: number) {
        showLoading();
        this.favoriteObjectService.putFavoriteUser(userId)
            .pipe()
            .subscribe(res => {
                if (this.favoriteUserIds.indexOf(res.id) < 0) {
                    this.favoriteUserIds.push(res.id);
                }
                hideLoading();
            });
    }

    onRemoveFavoriteUser(userId: number) {
        abp.message.confirm(
            'Bạn thực sự muốn hủy theo dõi người dùng này?',
            'HỦY THEO DÕI',
            (result: boolean) => {
                if (result) {
                    showLoading();
                    this.favoriteObjectService.removeFavoriteUser(userId)
                        .pipe()
                        .subscribe(res => {
                            if (this.favoriteUserIds.indexOf(res) >= 0) {
                                this.favoriteUserIds = this.favoriteUserIds.filter(x => x !== res);
                            }
                            hideLoading();
                        });
                }
            },
        );
    }

    onPutFavoritePost(postId: number) {
        showLoading();
        this.favoriteObjectService.putFavoritePost(postId)
            .pipe()
            .subscribe(res => {
                if (this.favoritePostIds.indexOf(res.id) < 0) {
                    this.favoritePostIds.push(res.id);
                }
                hideLoading();
            });
    }

    onRemoveFavoritePost(postId: number) {
        abp.message.confirm(
            'Bạn thực muốn bỏ yêu thích bài viết này?',
            'BỎ YÊU THÍCH',
            (result: boolean) => {
                if (result) {
                    showLoading();
                    this.favoriteObjectService.removeFavoritePost(postId)
                        .pipe()
                        .subscribe(res => {
                            if (this.favoritePostIds.indexOf(res) >= 0) {
                                this.favoritePostIds = this.favoritePostIds.filter(x => x !== res);
                            }
                            hideLoading();
                        });
                }
            },
        );
    }

    onPostRatingChange(value: number, postId: number) {
        if (!postId || postId <= 0) {
            return;
        }

        showLoading();
        this.postRatingService.putRating(postId, value)
            .pipe()
            .subscribe(avrgRating => {
                const index = this.postLists.findIndex(x => x.id === postId);
                this.postLists[index].postRatingAvrg = avrgRating;
                if (this.postLists[index].yourRating <= 0) {
                    this.postLists[index].postRatingCount++;
                }
                hideLoading();
            });
    }


    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
        const max = document.documentElement.scrollHeight;
        if (pos > max - 100) {
            this.loadPosts();
        }
    }

    showReadPost(post: PostDisplayDto) {
        const readPostDialog = this._modalService.show(
            ReadPostComponent,
            {
                class: 'modal-lg post-dialog',
                initialState: {
                    id: post.id,
                    appBaseUrl: this.appBaseUrl,
                    imageHolder: this.imageHolder,
                    currentPostCategoryId: this.currentPostCategoryId,
                    postLists: this.postLists,
                    favoriteUserIds: this.favoriteUserIds,
                    favoritePostIds: this.favoritePostIds,
                    currentCatSlug: this.currentCatSlug,
                    postCategory: this.postCategory,
                    creator: post.creator,
                    creationTime: post.creationTime,
                    postRatingAvrg: post.postRatingAvrg,
                    postRatingCount: post.postRatingCount,
                    postCommentCount: post.postCommentCount,
                    yourRating: post.yourRating,
                },
                backdrop: 'static'
            }
        );

        readPostDialog.content.onSave.subscribe(() => {
            // window.location.reload();
        });
    }
}
