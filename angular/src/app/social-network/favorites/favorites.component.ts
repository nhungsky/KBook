import {Component, HostListener, Inject, Injector, OnInit} from '@angular/core';
import {
    API_BASE_URL,
    FavoriteObjectServiceProxy, Genders,
    PostCategoryDto,
    PostCategoryServiceProxy, PostDisplayDto,
    PostRatingServiceProxy,
    PostServiceProxy, UserDto, UserServiceProxy
} from '../../../shared/service-proxies/service-proxies';
import {AppComponentBase} from '../../../shared/app-component-base';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {appModuleAnimation} from '../../../shared/animations/routerTransition';

declare function showLoading(): any;

declare function hideLoading(): any;

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.css'],
    animations: [appModuleAnimation()],
})
export class FavoritesComponent extends AppComponentBase implements OnInit {
    public appBaseUrl = '';
    imageHolder = '';

    isLoading = false;
    keyword = '';
    skipCount = 0;
    maxResultCount = 10;

    favoriteUserList: UserDto[] = [];

    favoriteUserIds: number[] = [];


    constructor(
        injector: Injector,
        public favoriteObjectService: FavoriteObjectServiceProxy,
        public userService: UserServiceProxy,
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
                this.loadPosts();
            });
    }

    clear() {
        this.keyword = '';
        this.skipCount = 0;
        this.maxResultCount = 3;
        this.favoriteUserList = [];
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

    async loadPosts() {
        if (this.isLoading) {
            return;
        }
        this.isLoading = true;
        let limit = this.skipCount + this.maxResultCount;
        if (limit > this.favoriteUserIds.length) {
            limit = this.favoriteUserIds.length;
        }
        for (let i = this.skipCount; i < limit; i++) {
            const u = await this.userService.get(this.favoriteUserIds[i]).toPromise();
            this.favoriteUserList.push(u);
        }
        this.isLoading = false;
        this.skipCount = limit;
    }

    calPreviousHours(time: moment.Moment) {
        const now = moment(new Date());
        const res = moment.duration(now.diff(time));
        return res.asHours();
    }

    getUserGender(gender) {
        if (gender === Genders._1) {
            return 'Nam';
        }
        if (gender === Genders._2) {
            return 'Nữ';
        }
        return 'Không hiển thị giới tính';
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


    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
        const max = document.documentElement.scrollHeight;
        if (pos > max - 100) {
            this.loadPosts();
        }
    }
}
