import {
  Component,
  Inject,
  Injector,
  OnInit,
  Optional,
  Renderer2,
} from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { SignalRAspNetCoreHelper } from "@shared/helpers/SignalRAspNetCoreHelper";
import { LayoutStoreService } from "@shared/layout/layout-store.service";
import { API_BASE_URL } from "@shared/service-proxies/service-proxies";

@Component({
  templateUrl: "./app.component.html",
})
export class AppComponent extends AppComponentBase implements OnInit {
  faviconPath: string = "";
  siteName: string = "";

  public appBaseUrl = "";

  sidebarExpanded: boolean;

  favIcon: HTMLLinkElement = document.querySelector("#favicon");
  title: HTMLLinkElement = document.querySelector("#title");

  constructor(
    injector: Injector,
    private renderer: Renderer2,
    private _layoutStore: LayoutStoreService,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    super(injector);
    this.appBaseUrl = baseUrl;
  }

  ngOnInit(): void {
    this.faviconPath = this.appBaseUrl + abp.setting.get("FAVICON_PATH");
    this.favIcon.href = this.faviconPath;
    this.siteName = abp.setting.get("SITE_NAME");
    this.title.innerHTML = this.siteName;

    this.renderer.addClass(document.body, "sidebar-mini");

    SignalRAspNetCoreHelper.initSignalR();

    abp.event.on("abp.notifications.received", (userNotification) => {
      abp.notifications.showUiNotifyForUserNotification(userNotification);

      // Desktop notification
      Push.create("AbpZeroTemplate", {
        body: userNotification.notification.data.message,
        icon: abp.appPath + "assets/app-logo-small.png",
        timeout: 6000,
        onClick: function () {
          window.focus();
          this.close();
        },
      });
    });

    this._layoutStore.sidebarExpanded.subscribe((value) => {
      this.sidebarExpanded = value;
    });
  }

  toggleSidebar(): void {
    this._layoutStore.setSidebarExpanded(!this.sidebarExpanded);
  }
}
