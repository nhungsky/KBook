import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Optional,
  Inject,
} from "@angular/core";
import { API_BASE_URL } from "@shared/service-proxies/service-proxies";

@Component({
  selector: "sidebar-logo",
  templateUrl: "./sidebar-logo.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarLogoComponent implements OnInit {
  logoPath: string = "";
  siteName: string = "";

  public appBaseUrl = "";
  constructor(@Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.appBaseUrl = baseUrl;
  }
  ngOnInit(): void {
    this.logoPath = this.appBaseUrl + abp.setting.get("LOGO_PATH");
    this.siteName = abp.setting.get("SITE_NAME");
  }
}
