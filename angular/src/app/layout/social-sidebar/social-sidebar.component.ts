import {
  Component,
  ChangeDetectionStrategy,
  Renderer2,
  OnInit,
  Injector,
  ChangeDetectorRef
} from '@angular/core';
import { NavigationEnd, PRIMARY_OUTLET, Router, RouterEvent } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { LayoutStoreService } from '@shared/layout/layout-store.service';
import { MenuItem } from '@shared/layout/menu-item';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { PostCategoryDto, PostCategoryDtoPagedResultDto, PostCategoryServiceProxy, PostDto } from '@shared/service-proxies/service-proxies';
import { BehaviorSubject } from 'rxjs';
import { filter, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-social-sidebar',
  templateUrl: './social-sidebar.component.html',
  styleUrls: ['./social-sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialSidebarComponent extends PagedListingComponentBase<PostDto> {
  protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
  }
  protected delete(entity: PostDto): void {
    throw new Error('Method not implemented.');
  }
  menuItems: MenuItem[];
  menuItemsMap: { [key: number]: MenuItem } = {};
  activatedMenuItems: MenuItem[] = [];
  routerEvents: BehaviorSubject<RouterEvent> = new BehaviorSubject(undefined);
  homeRoute = "/";

  public postCategories: PostCategoryDto[] = [];
  keyword = "";

  selectedName = "Trang chủ";
  selectedIcon = "fas fa-home";

  changeMenuSelected(name, icon) {
    this.selectedName = name;
    this.selectedIcon = icon;
  }

  constructor(injector: Injector, private router: Router, private renderer: Renderer2,
    private _postCategoryService: PostCategoryServiceProxy,
    private _cdr: ChangeDetectorRef,
    private _layoutStore: LayoutStoreService) {
    super(injector);
    this.router.events.subscribe(this.routerEvents);
  }

  async ngOnInit() {
    this.menuItems = this.getMenuItems();
    this.patchMenuItems(this.menuItems);
    this.routerEvents
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const currentUrl = event.url !== "/" ? event.url : this.homeRoute;
        const primaryUrlSegmentGroup = this.router.parseUrl(currentUrl).root
          .children[PRIMARY_OUTLET];
        if (primaryUrlSegmentGroup) {
          this.activateMenuItems("/" + primaryUrlSegmentGroup.toString());
        }
      });

    var postAz = await this._postCategoryService
      .getAll("", 0, 1000).toPromise();
    this.postCategories = postAz.items;
    this.changeStatus();
  }

  changeStatus(): void {
    setTimeout(() => {
      this._cdr.detectChanges()
    }, 500);
  }


  getMenuItems(): MenuItem[] {
    return [

    ];
  }

  patchMenuItems(items: MenuItem[], parentId?: number): void {
    items.forEach((item: MenuItem, index: number) => {
      item.id = parentId ? Number(parentId + "" + (index + 1)) : index + 1;
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
