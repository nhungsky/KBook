import {
    Component,
    Injector,
    OnInit,
    EventEmitter,
    Output,
} from '@angular/core';
import {finalize} from 'rxjs/operators';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {AppComponentBase} from '@shared/app-component-base';
import {
    ChangePasswordDto,
    UserServiceProxy
} from '@shared/service-proxies/service-proxies';
import {AbpValidationError} from '@shared/components/validation/abp-validation.api';
import {Router} from '@angular/router';

declare function showLoading(): any;

declare function hideLoading(): any;

@Component({
    selector: 'app-modal-user-profile',
    templateUrl: './modal-user-profile.component.html',
    styleUrls: ['./modal-user-profile.component.css']
})
export class ModalUserProfileComponent extends AppComponentBase {

    @Output() onSave = new EventEmitter<any>();
    saving = false;
    changePasswordDto = new ChangePasswordDto();
    newPasswordValidationErrors: Partial<AbpValidationError>[] = [
        {
            name: 'pattern',
            localizationKey:
                'PasswordsMustBeAtLeast8CharactersContainLowercaseUppercaseNumber',
        },
    ];
    confirmNewPasswordValidationErrors: Partial<AbpValidationError>[] = [
        {
            name: 'validateEqual',
            localizationKey: 'PasswordsDoNotMatch',
        },
    ];

    constructor(
        injector: Injector,
        private userServiceProxy: UserServiceProxy,
        public bsModalRef: BsModalRef,
        private router: Router
    ) {
        super(injector);
    }

    changePassword() {
        this.saving = true;

        this.userServiceProxy
            .changePassword(this.changePasswordDto)
            .pipe(
                finalize(() => {
                    this.saving = false;
                })
            )
            .subscribe((success) => {
                if (success) {
                    abp.message.success('Password changed successfully', 'Success');
                    this.router.navigate(['/']);
                }
                this.notify.info(this.l('SavedSuccessfully'));
                this.bsModalRef.hide();
                this.onSave.emit();
            });
    }
}
