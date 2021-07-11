import {Component, Injector, OnInit} from '@angular/core';
import {AppComponentBase} from '@shared/app-component-base';
import {
    Router,
    RouterEvent,
    NavigationEnd,
    PRIMARY_OUTLET,
} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {MenuItem} from '@shared/layout/menu-item';

@Component({
    selector: 'sidebar-menu',
    templateUrl: './sidebar-menu.component.html',
})
export class SidebarMenuComponent extends AppComponentBase implements OnInit {
    menuItems: MenuItem[];
    menuItemsMap: { [key: number]: MenuItem } = {};
    activatedMenuItems: MenuItem[] = [];
    routerEvents: BehaviorSubject<RouterEvent> = new BehaviorSubject(undefined);
    homeRoute = '/app/about';

    constructor(injector: Injector, private router: Router) {
        super(injector);
        this.router.events.subscribe(this.routerEvents);
    }

    ngOnInit(): void {
        this.menuItems = this.getMenuItems();
        this.patchMenuItems(this.menuItems);
        this.routerEvents
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event) => {
                const currentUrl = event.url !== '/' ? event.url : this.homeRoute;
                const primaryUrlSegmentGroup = this.router.parseUrl(currentUrl).root
                    .children[PRIMARY_OUTLET];
                if (primaryUrlSegmentGroup) {
                    this.activateMenuItems('/' + primaryUrlSegmentGroup.toString());
                }
            });
    }

    getMenuItems(): MenuItem[] {
        return [
            new MenuItem('Bảng điều khiển', '/manager/home', 'fas fa-home'),
            new MenuItem('Bài viết', '', 'fa fa-database', '', [
                new MenuItem('Danh sách bài viết', '/manager/posts', 'fa fa-clone'),
                new MenuItem(
                    'Chủ đề',
                    '/manager/post-categories',
                    'fa fa-sitemap'
                ),
            ]),
            new MenuItem('Địa điểm', '', 'fa fa-map-marker', '', [
                new MenuItem('Danh sách', '/manager/social-network-user-places', 'fa fa-bars'),
                new MenuItem(
                    'Danh mục',
                    '/manager/place-categories',
                    'fa fa-bookmark'
                ),
            ]),
            new MenuItem(
                'Quản lý vai trò',
                '/manager/roles',
                'fas fa-user-tie',
                'Pages.Roles'
            ),
            new MenuItem(
                this.l('TenantManagement'),
                '/manager/tenants',
                'fas fa-building',
                'Pages.Tenants'
            ),
            new MenuItem(
                'Quản lý người dùng',
                '/manager/users',
                'fas fa-users',
                'Pages.Users'
            ),
            new MenuItem(
                'Tệp tin hệ thống',
                '/manager/files',
                'fas fa-folder-open ',
                'Pages.Users'
            ),
            new MenuItem('Cấu hình trang', '', 'fas fa-cogs', '', [
                new MenuItem(
                    'Thông tin cơ bản',
                    '/manager/site-config/base-informations',
                    'fab fa-affiliatetheme'
                ),
            ]),
        ];
    }

    patchMenuItems(items: MenuItem[], parentId?: number): void {
        items.forEach((item: MenuItem, index: number) => {
            item.id = parentId ? Number(parentId + '' + (index + 1)) : index + 1;
            if (parentId) {
                item.parentId = parentId;
            }
            if (parentId || item.children) {
                this.menuItemsMap[item.id] = item;
            }
            if (item.children) {
                this.patchMenuItems(item.children, item.id);
            }
        });
    }

    activateMenuItems(url: string): void {
        this.deactivateMenuItems(this.menuItems);
        this.activatedMenuItems = [];
        const foundedItems = this.findMenuItemsByUrl(url, this.menuItems);
        foundedItems.forEach((item) => {
            this.activateMenuItem(item);
        });
    }

    deactivateMenuItems(items: MenuItem[]): void {
        items.forEach((item: MenuItem) => {
            item.isActive = false;
            item.isCollapsed = true;
            if (item.children) {
                this.deactivateMenuItems(item.children);
            }
        });
    }

    findMenuItemsByUrl(
        url: string,
        items: MenuItem[],
        foundedItems: MenuItem[] = []
    ): MenuItem[] {
        items.forEach((item: MenuItem) => {
            if (item.route === url) {
                foundedItems.push(item);
            } else if (item.children) {
                this.findMenuItemsByUrl(url, item.children, foundedItems);
            }
        });
        return foundedItems;
    }

    activateMenuItem(item: MenuItem): void {
        item.isActive = true;
        if (item.children) {
            item.isCollapsed = false;
        }
        this.activatedMenuItems.push(item);
        if (item.parentId) {
            this.activateMenuItem(this.menuItemsMap[item.parentId]);
        }
    }

    isMenuItemVisible(item: MenuItem): boolean {
        if (!item.permissionName) {
            return true;
        }
        return this.permission.isGranted(item.permissionName);
    }
}
