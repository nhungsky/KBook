import {
  Component,
  Injector,
  ChangeDetectionStrategy,
  Optional,
  Inject,
} from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { API_BASE_URL } from "@shared/service-proxies/service-proxies";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent extends AppComponentBase {
  currentYear: number;
  versionText: string;

  public appBaseUrl = "";

  authorName: string = "";
  authorLink: string = "";

  constructor(
    injector: Injector,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    super(injector);

    this.appBaseUrl = baseUrl;

    this.authorName = abp.setting.get("AUTHOR_NAME");
    this.authorLink = abp.setting.get("AUTHOR_LINK");

    this.currentYear = new Date().getFullYear();
    this.versionText =
      this.appSession.application.version +
      " [" +
      this.appSession.application.releaseDate.format("YYYYDDMM") +
      "]";
  }
}
