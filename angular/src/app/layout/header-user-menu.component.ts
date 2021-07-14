import {
    Component,
    ChangeDetectionStrategy,
    OnInit,
    Inject,
    Optional,
    Injector,
    ChangeDetectorRef,
} from '@angular/core';
import {AppComponentBase} from '@shared/app-component-base';
import {AppAuthService} from '@shared/auth/app-auth.service';
import {
    API_BASE_URL,
    UserServiceProxy,
} from '@shared/service-proxies/service-proxies';

@Component({
    selector: 'header-user-menu',
    templateUrl: './header-user-menu.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderUserMenuComponent
    extends AppComponentBase
    implements OnInit {
    imageHolder = '';
    currentUserAvatar = '';
    currentUserName = '';

    public appBaseUrl = '';

    constructor(
        injector: Injector,
        private _userService: UserServiceProxy,
        private _cdr: ChangeDetectorRef,
        private _authService: AppAuthService,
        @Optional() @Inject(API_BASE_URL) baseUrl?: string
    ) {
        super(injector);
        this.appBaseUrl = baseUrl;
    }

    logout(): void {
        this._authService.logout();
    }

    changeStatus(): void {
        setTimeout(() => {
            this._cdr.detectChanges();
        }, 500);
    }

    ngOnInit() {
        this.currentUserAvatar = this.appBaseUrl + abp.setting.get('IMAGE_HOLDER');
        this.currentUserName = this.appSession.getShownLoginName();
        this._userService
            .get(this.appSession.userId)
            .pipe()
            .subscribe((user) => {
                if (user.photo) {
                    this.currentUserAvatar = user.photo;
                }
                this.currentUserName = user.fullName;
                this.changeStatus();
            });
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
