import {
    Component,
    Injector,
    OnInit,
    EventEmitter,
    Output,
} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {AppComponentBase} from '@shared/app-component-base';
import {
    Genders,
    UserDto, UserProfileServiceProxy,
} from '@shared/service-proxies/service-proxies';
import {finalize} from 'rxjs/operators';
import * as moment from 'moment';

declare function showLoading(): any;

declare function hideLoading(): any;

@Component({
    selector: 'app-update-my-profile',
    templateUrl: './update-my-profile.component.html',
    styleUrls: ['./update-my-profile.component.css']
})
export class UpdateMyProfileComponent extends AppComponentBase
    implements OnInit {

    genders = Genders;
    saving = false;
    userProfile = new UserDto();
    birthDay: string;

    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector: Injector,
        private _userProfileService: UserProfileServiceProxy,
        public bsModalRef: BsModalRef
    ) {
        super(injector);
    }

    async ngOnInit() {
        showLoading();

        this.userProfile = await this._userProfileService.getProfile().toPromise();
        if (this.userProfile.birthday) {
            this.birthDay = this.userProfile.birthday.format('YYYY-MM-DD');
        } else {
            this.birthDay = '';
        }
        hideLoading();
    }

    save(): void {
        this.saving = true;
        if (this.birthDay && this.birthDay.length > 0) {
            const d = new Date(this.birthDay);
            this.userProfile.birthday = moment(d);
        }
        this._userProfileService
            .updateProfile(this.userProfile)
            .pipe(
                finalize(() => {
                    this.saving = false;
                })
            )
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.bsModalRef.hide();
                this.onSave.emit();
            });
    }
}
