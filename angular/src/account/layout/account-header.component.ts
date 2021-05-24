import { Component, ChangeDetectionStrategy, Optional, Inject, OnInit } from '@angular/core';
import { API_BASE_URL } from "@shared/service-proxies/service-proxies";

@Component({
  selector: 'account-header',
  templateUrl: './account-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountHeaderComponent implements OnInit {
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
