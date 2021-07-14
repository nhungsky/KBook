import {Component, HostListener, Inject, Injector, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {appModuleAnimation} from '@shared/animations/routerTransition';
import {AppComponentBase} from '@shared/app-component-base';
import {
    API_BASE_URL,
    FavoriteObjectServiceProxy, PlaceCategoryDto, PlaceCategoryServiceProxy, PlaceDto, PlaceServiceProxy,
    PostCategoryDto,
    PostCategoryServiceProxy,
    PostDisplayDto,
    PostRatingServiceProxy,
    PostServiceProxy
} from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import {DomSanitizer} from '@angular/platform-browser';
import {MapsAPILoader} from '@agm/core';

declare function showLoading(): any;

declare function hideLoading(): any;


@Component({
    selector: 'app-recommend-places',
    templateUrl: './recommend-places.component.html',
    styleUrls: ['./recommend-places.component.css'],
    animations: [appModuleAnimation()],
})
export class RecommendPlacesComponent extends AppComponentBase implements OnInit {
    places: PlaceDto[] = [];
    placeCategories: PlaceCategoryDto[] = [];

    selectedCategoryId = -1;

    public appBaseUrl = '';
    imageHolder = '';
    logo = '';

    latitude = 0.0;
    longitude = 0.0;
    zoom = 15;
    type = 'roadmap';

    markerLat = 0.0;
    markerLng = 0.0;


    isLoading = false;
    keyword = '';
    skipCount = 0;
    maxResultCount = 3;

    constructor(
        injector: Injector,
        private sanitizer: DomSanitizer,
        private mapsAPILoader: MapsAPILoader,
        public postService: PostServiceProxy,
        public placeService: PlaceServiceProxy,
        public placeCategoryService: PlaceCategoryServiceProxy,
        public postCategoryService: PostCategoryServiceProxy,
        public favoriteObjectService: FavoriteObjectServiceProxy,
        public postRatingService: PostRatingServiceProxy,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        @Inject(API_BASE_URL) baseUrl?: string) {
        super(injector);
        this.appBaseUrl = baseUrl;
        this.imageHolder = this.appBaseUrl + abp.setting.get('IMAGE_HOLDER');
        this.logo = this.appBaseUrl + abp.setting.get('LOGO_PATH');
    }

    clear() {
        this.keyword = '';
        this.skipCount = 0;
        this.maxResultCount = 3;
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
        const placeCategoryResult = await this.placeCategoryService.getAll('', true, 0, 1000).toPromise();
        this.placeCategories = placeCategoryResult.items;

        await this.loadPlaces();

        this.mapsAPILoader.load().then(() => {
            this.setCurrentLocation();
        });
    }

    async loadPlaces() {
        let placeCategoryId = null;
        if (this.selectedCategoryId && this.selectedCategoryId > 0) {
            placeCategoryId = this.selectedCategoryId;
        }
        const places = await this.placeService.getAll(null, true, placeCategoryId, 0, 1000).toPromise();
        this.places = places.items;
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


    onMapChanges(e) {
        this.markerLat = e.lat;
        this.markerLng = e.lng;
    }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
        const max = document.documentElement.scrollHeight;
        if (pos > max - 100) {
        }
    }

    changePlaceCategoryId(id) {
        this.selectedCategoryId = id;
    }

    private setCurrentLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
            });
        }
    }
}
