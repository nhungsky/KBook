import {Component, EventEmitter, Inject, Injector, OnInit, Output,} from '@angular/core';
import {finalize} from 'rxjs/operators';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {AppComponentBase} from '@shared/app-component-base';
import {API_BASE_URL, Genders, UserDto, UserProfileServiceProxy, UserServiceProxy} from '@shared/service-proxies/service-proxies';
import {Router} from '@angular/router';

declare function showLoading(): any;

declare function hideLoading(): any;

@Component({
    selector: 'app-modal-user-profile',
    templateUrl: './modal-user-profile.component.html',
    styleUrls: ['./modal-user-profile.component.css']
})
export class ModalUserProfileComponent extends AppComponentBase implements OnInit {

    public appBaseUrl = '';
    imageHolder = '';

    id: number;

    @Output() onSave = new EventEmitter<any>();
    saving = false;

    currentUser: UserDto;

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
        console.log(this.id);
        if (this.id && this.id > 0) {
            showLoading();
            this.userProfileService.getUser(this.id)
                .pipe(finalize(() => {
                    hideLoading();
                }))
                .subscribe(u => {
                    console.log(u);
                    this.currentUser = u;
                });
        } else {
            this.bsModalRef.hide();
        }
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

    calAge() {
        if (this.currentUser.birthday) {
            const year = this.currentUser.birthday.year();
            const crrYear = new Date().getFullYear();
            return `${crrYear - year} tuổi`;
        }
        return 'Không cung cấp tuổi';
    }

    getGender() {
        switch (this.currentUser.gender) {
            case Genders._1:
                return 'Nam';
            case Genders._2:
                return 'Nữ';
            case Genders._3:
                return 'Giới tính không xác định';
            default:
                return 'Ẩn giới tính';
        }
    }

}
