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
import {API_BASE_URL, RoleDto, UserProfileServiceProxy, UserServiceProxy} from '@shared/service-proxies/service-proxies';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {UpdateMyProfileComponent} from './update-my-profile/update-my-profile.component';
import {UpdatePasswordComponent} from './update-password/update-password.component';

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
                private _modalService: BsModalService,
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
                if (user) {
                    this.isAdmin = user.roleNames && user.roleNames.filter(x => x.toLowerCase() === 'admin'.toLowerCase()).length > 0;
                    if (user.photo) {
                        this.currentUserAvatar = this.standardImg(user.photo);
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

    updateProfile(): void {
        const updateProfileDialog = this._modalService.show(
            UpdateMyProfileComponent,
            {
                class: 'modal-lg',
                initialState: {},
            }
        );

        updateProfileDialog.content.onSave.subscribe(() => {
            window.location.reload();
        });
    }

    updatePassword(): void {
        const updatePasswordDialog = this._modalService.show(
            UpdatePasswordComponent,
            {
                class: 'modal-lg',
                initialState: {},
            }
        );

        updatePasswordDialog.content.onSave.subscribe(() => {
            window.location.reload();
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
