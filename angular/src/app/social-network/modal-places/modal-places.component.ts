import {Component, EventEmitter, Inject, Injector, OnInit, Output,} from '@angular/core';
import {finalize} from 'rxjs/operators';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {AppComponentBase} from '@shared/app-component-base';
import {API_BASE_URL, Genders, PlaceDto, UserDto, UserProfileServiceProxy, UserServiceProxy} from '@shared/service-proxies/service-proxies';
import {Router} from '@angular/router';

declare function showLoading(): any;

declare function hideLoading(): any;

@Component({
    selector: 'app-modal-places',
    templateUrl: './modal-places.component.html',
    styleUrls: ['./modal-places.component.css']
})
export class ModalPlacesComponent extends AppComponentBase implements OnInit {

    public appBaseUrl = '';
    imageHolder = '';

    id: number;

    @Output() onSave = new EventEmitter<any>();
    saving = false;

    currentPlace: PlaceDto;

    constructor(
        injector: Injector,
        private userServiceProxy: UserServiceProxy,
        public bsModalRef: BsModalRef,
        private router: Router,
        private userProfileService: UserProfileServiceProxy,
        @Inject(API_BASE_URL) baseUrl?: string
    ) {
        super(injector);
        this.appBaseUrl = baseUrl;
        this.imageHolder = this.appBaseUrl + abp.setting.get('IMAGE_HOLDER');
    }

    ngOnInit() {

    }

    extractImgs() {
        let imgs = [this.currentPlace.placeCategory.featureImage];
        const pjs = this.currentPlace.photos;
        if (pjs && pjs.length > 0) {
            const pjsJ = [...JSON.parse(pjs)];
            if (pjsJ && pjsJ.length > 0) {
                imgs = pjsJ;
            }
        }
        return imgs;
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


}
