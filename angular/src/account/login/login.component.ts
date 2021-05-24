import { Component, Inject, Injector, Optional } from '@angular/core';
import { AbpSessionService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/app-component-base';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { API_BASE_URL } from "@shared/service-proxies/service-proxies";

@Component({
  templateUrl: './login.component.html',
  animations: [accountModuleAnimation()]
})
export class LoginComponent extends AppComponentBase {
  submitting = false;
  logoPath: string = "";
  siteName: string = "";
  public appBaseUrl = "";

  constructor(
    injector: Injector,
    public authService: AppAuthService,
    private _sessionService: AbpSessionService,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    super(injector);
    this.appBaseUrl = baseUrl;
    this.logoPath = this.appBaseUrl + abp.setting.get("LOGO_PATH");
    this.siteName = abp.setting.get("SITE_NAME");
  }

  get multiTenancySideIsTeanant(): boolean {
    return this._sessionService.tenantId > 0;
  }

  get isSelfRegistrationAllowed(): boolean {
    if (!this._sessionService.tenantId) {
      return false;
    }

    return true;
  }

  login(): void {
    this.submitting = true;
    this.authService.authenticate(() => (this.submitting = false));
  }
}
