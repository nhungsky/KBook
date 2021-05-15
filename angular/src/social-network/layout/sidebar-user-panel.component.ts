import {
  Component,
  ChangeDetectionStrategy,
  Injector,
  OnInit,
  Optional,
  Inject,
} from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  API_BASE_URL,
  UserServiceProxy,
} from "@shared/service-proxies/service-proxies";

@Component({
  selector: "sidebar-user-panel",
  templateUrl: "./sidebar-user-panel.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarUserPanelComponent
  extends AppComponentBase
  implements OnInit {
  shownLoginName = "";
  imageHolder = "";
  currentUserAvatar = "";

  public appBaseUrl = "";
  constructor(
    injector: Injector,
    private _userService: UserServiceProxy,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    super(injector);
    this.appBaseUrl = baseUrl;
  }

  ngOnInit() {
    this.imageHolder = this.appBaseUrl + abp.setting.get("IMAGE_HOLDER");
    this.shownLoginName = this.appSession.getShownLoginName();
    this._userService
      .get(this.appSession.userId)
      .pipe()
      .subscribe((user) => {
        console.log(user);
        if (user.photo) {
          this.currentUserAvatar = this.appBaseUrl + user.photo;
        } else {
          this.currentUserAvatar = this.imageHolder;
        }
        this.shownLoginName = user.fullName;
      });
  }
}
