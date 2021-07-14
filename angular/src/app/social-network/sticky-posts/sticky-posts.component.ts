import {Component, HostListener, Inject, Injector, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {appModuleAnimation} from '@shared/animations/routerTransition';
import {AppComponentBase} from '@shared/app-component-base';
import {
    API_BASE_URL,
    FavoriteObjectServiceProxy,
    PostCategoryDto,
    PostCategoryServiceProxy,
    PostDisplayDto,
    PostRatingServiceProxy,
    PostServiceProxy
} from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import {ModalUserProfileComponent} from '../modal-user-profile/modal-user-profile.component';
import {BsModalService} from 'ngx-bootstrap/modal';

declare function showLoading(): any;

declare function hideLoading(): any;

@Component({
    selector: 'app-sticky-posts',
    templateUrl: './sticky-posts.component.html',
    styleUrls: ['./sticky-posts.component.css'],
    animations: [appModuleAnimation()],
})
export class StickyPostsComponent extends AppComponentBase implements OnInit {
    public appBaseUrl = '';
    imageHolder = '';

    isLoading = false;
    keyword = '';
    skipCount = 0;
    maxResultCount = 3;

    postLists: PostDisplayDto[] = [];

    favoriteUserIds: number[] = [];
    favoritePostIds: number[] = [];


    constructor(
        injector: Injector,
        public postService: PostServiceProxy,
        private _modalService: BsModalService,
        public postCategoryService: PostCategoryServiceProxy,
        public favoriteObjectService: FavoriteObjectServiceProxy,
        public postRatingService: PostRatingServiceProxy,
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
        this.loadPosts();
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
        this.favoriteObjectService
            .getFavoritePosts(this.skipCount, this.maxResultCount)
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

    showProfile(userId: number): void {
        const showUserProfileDialog = this._modalService.show(
            ModalUserProfileComponent,
            {
                class: 'modal-lg',
                initialState: {
                    id: userId
                },
            }
        );

        showUserProfileDialog.content.onSave.subscribe(() => {
            window.location.reload();
        });
    }
}
