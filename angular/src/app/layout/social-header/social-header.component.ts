import {
    Component,
    ChangeDetectionStrategy,
    OnInit,
    Inject,
    Optional,
    Injector,
} from '@angular/core';
import {AppComponentBase} from '@shared/app-component-base';
import {AppAuthService} from '@shared/auth/app-auth.service';
import {API_BASE_URL, UserProfileServiceProxy, UserServiceProxy} from '@shared/service-proxies/service-proxies';
import {MenuItem} from '../../../shared/layout/menu-item';

@Component({
    selector: 'app-social-header',
    templateUrl: './social-header.component.html',
    styleUrls: ['./social-header.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialHeaderComponent extends AppComponentBase
    implements OnInit {
    logoPath = '';
    siteName = '';

    public appBaseUrl = '';

    imageHolder = '';
    currentUserAvatar = '';
    currentUserName = '';

    isAdmin = false;

    constructor(injector: Injector,
                private _profileService: UserProfileServiceProxy,
                private _authService: AppAuthService,
                @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        super(injector);
        this.appBaseUrl = baseUrl;
    }

    logout(): void {
        this._authService.logout();
    }

    ngOnInit() {
        this.logoPath = this.appBaseUrl + abp.setting.get('LOGO_PATH');
        this.siteName = abp.setting.get('SITE_NAME');

        this.currentUserAvatar = this.appBaseUrl + abp.setting.get('IMAGE_HOLDER');
        this.currentUserName = this.appSession.getShownLoginName();
        this._profileService
            .getProfile()
            .pipe()
            .subscribe((user) => {
                console.log(user);
                if (user) {
                    this.isAdmin = user.roleNames && user.roleNames.filter(x => x.toLowerCase() === 'admin'.toLowerCase()).length > 0;
                    if (user.photo) {
                        this.currentUserAvatar = this.appBaseUrl + user.photo;
                        document.querySelector('#user-image').setAttribute('src', this.currentUserAvatar);
                    }
                    if (user.fullName) {
                        this.currentUserName = user.fullName;
                        document.querySelector('#user-fullname').textContent = this.currentUserName;
                    }
                }
            });
    }

    getCurrentUsername() {
        return this.currentUserName;
    }
}
