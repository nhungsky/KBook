import {Component, HostListener, Inject, Injector, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppComponentBase} from '@shared/app-component-base';
import {
    API_BASE_URL,
    FavoriteObjectServiceProxy,
    PostCategoryDto,
    PostCategoryServiceProxy, PostCommentDto, PostCommentServiceProxy,
    PostDisplayDto, PostDto,
    PostRatingServiceProxy,
    PostServiceProxy, UserDto, UserProfileServiceProxy
} from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import {finalize} from 'rxjs/operators';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ModalUserProfileComponent} from '../../modal-user-profile/modal-user-profile.component';

declare function showLoading(): any;

declare function hideLoading(): any;

@Component({
    selector: 'app-read-post',
    templateUrl: './read-post.component.html',
    styleUrls: ['./read-post.component.css']
})
export class ReadPostComponent extends AppComponentBase implements OnInit {
    appBaseUrl: string;
    imageHolder: string;

    currentUserId = abp.session.userId;

    isLoading = false;
    currentPostCategoryId: number;

    postLists: PostDisplayDto[];
    favoriteUserIds: number[];
    favoritePostIds: number[];

    currentCatSlug: string;
    postCategory: PostCategoryDto;

    post: PostDto = new PostDto();
    creator: UserDto = new UserDto();
    id: number;
    creationTime: moment.Moment;
    postRatingAvrg: number;
    postRatingCount: number;
    postCommentCount: number;
    yourRating: number;

    postComment: PostCommentDto = new PostCommentDto();
    saving = false;

    postComments: PostCommentDto[] = [];

    constructor(
        injector: Injector,
        public postService: PostServiceProxy,
        public favoriteObjectService: FavoriteObjectServiceProxy,
        public postRatingService: PostRatingServiceProxy,
        private _modalService: BsModalService,
        public bsModalRef: BsModalRef,
        private activatedRoute: ActivatedRoute,
        private userProfileService: UserProfileServiceProxy,
        private router: Router,
        private postCommentService: PostCommentServiceProxy,
        @Inject(API_BASE_URL) baseUrl?: string) {
        super(injector);
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

    async ngOnInit() {
        this.post = await this.postService.get(this.id).toPromise();
        await this.loadComments();
    }

    async loadComments() {
        const cmts = await this.postCommentService.getAll(null, this.post.id, 0, 1000).toPromise();
        this.postComments = cmts.items;
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

    saveComment() {
        this.saving = true;
        this.postComment.postId = this.post.id;
        this.postCommentService.create(this.postComment)
            .pipe(finalize(() => {
                this.saving = false;
            }))
            .subscribe(async () => {
                this.notify.info(this.l('SavedSuccessfully'));
                // this.bsModalRef.hide();
                this.postComment = new PostCommentDto();
                await this.loadComments();
            });
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
