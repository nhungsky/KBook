import {
    Component,
    HostListener,
    Inject,
    Injector,
    OnInit,
    Optional,
    Renderer2,
} from '@angular/core';
import {AppComponentBase} from '@shared/app-component-base';
import {SignalRAspNetCoreHelper} from '@shared/helpers/SignalRAspNetCoreHelper';
import {LayoutStoreService} from '@shared/layout/layout-store.service';
import {API_BASE_URL} from '@shared/service-proxies/service-proxies';

@Component({
    selector: 'app-social-network',
    templateUrl: './social-network.component.html',
    styleUrls: ['./social-network.component.css']
})
export class SocialNetworkComponent extends AppComponentBase implements OnInit {
    faviconPath: string = '';
    siteName: string = '';
    imageHolder = '';

    homeBannerLink = '';

    public appBaseUrl = '';

    sidebarExpanded: boolean;

    favIcon: HTMLLinkElement = document.querySelector('#favicon');
    title: HTMLLinkElement = document.querySelector('#title');

    constructor(
        injector: Injector,
        private renderer: Renderer2,
        private _layoutStore: LayoutStoreService,
        @Optional() @Inject(API_BASE_URL) baseUrl?: string
    ) {
        super(injector);
        this.appBaseUrl = baseUrl;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        const sidebar = document.querySelector('#main-aside');
        const sidebarRight = document.querySelector('#main-aside-right');
        const header = document.querySelector('#main-header');
        const content = document.querySelector('#content-wrapper');
        if (sidebar && header && sidebarRight) {
            sidebar.removeAttribute('style');
            sidebar.setAttribute('style', `margin-top: ${header.clientHeight}px; margin-left: -0.5rem;`);

            sidebarRight.removeAttribute('style');
            sidebarRight.setAttribute('style', `margin-top: ${header.clientHeight}px;`);

            content.removeAttribute('style');
            content.setAttribute('style', `margin-top: ${header.clientHeight}px;`);
        }
    }

    ngOnInit(): void {
        this.faviconPath = this.appBaseUrl + abp.setting.get('FAVICON_PATH');
        this.homeBannerLink = this.appBaseUrl + abp.setting.get('HOME_BANNER_LINK');
        this.imageHolder = this.appBaseUrl + abp.setting.get('IMAGE_HOLDER');
        this.favIcon.href = this.faviconPath;
        this.siteName = abp.setting.get('SITE_NAME');
        this.title.innerHTML = this.siteName;

        this.renderer.addClass(document.body, 'sidebar-mini');

        SignalRAspNetCoreHelper.initSignalR();

        abp.event.on('abp.notifications.received', (userNotification) => {
            abp.notifications.showUiNotifyForUserNotification(userNotification);

            // Desktop notification
            Push.create('AbpZeroTemplate', {
                body: userNotification.notification.data.message,
                icon: abp.appPath + 'assets/app-logo-small.png',
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

        this.onResize(null);
    }

    toggleSidebar(): void {
        this._layoutStore.setSidebarExpanded(!this.sidebarExpanded);
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
