import {NgModule} from '@angular/core';
import {CKEditorModule} from 'ckeditor4-angular';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientJsonpModule} from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import {ModalModule} from 'ngx-bootstrap/modal';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {NgxPaginationModule} from 'ngx-pagination';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceProxyModule} from '@shared/service-proxies/service-proxy.module';
import {SharedModule} from '@shared/shared.module';
import {HomeComponent} from '@app/home/home.component';
import {AboutComponent} from '@app/about/about.component';
// tenants
import {TenantsComponent} from '@app/tenants/tenants.component';
import {CreateTenantDialogComponent} from './tenants/create-tenant/create-tenant-dialog.component';
import {EditTenantDialogComponent} from './tenants/edit-tenant/edit-tenant-dialog.component';
// roles
import {RolesComponent} from '@app/roles/roles.component';
import {CreateRoleDialogComponent} from './roles/create-role/create-role-dialog.component';
import {EditRoleDialogComponent} from './roles/edit-role/edit-role-dialog.component';
// users
import {UsersComponent} from '@app/users/users.component';
import {CreateUserDialogComponent} from '@app/users/create-user/create-user-dialog.component';
import {EditUserDialogComponent} from '@app/users/edit-user/edit-user-dialog.component';
import {ChangePasswordComponent} from './users/change-password/change-password.component';
import {ResetPasswordDialogComponent} from './users/reset-password/reset-password.component';
// layout
import {HeaderComponent} from './layout/header.component';
import {HeaderLeftNavbarComponent} from './layout/header-left-navbar.component';
import {HeaderLanguageMenuComponent} from './layout/header-language-menu.component';
import {HeaderUserMenuComponent} from './layout/header-user-menu.component';
import {FooterComponent} from './layout/footer.component';
import {SidebarComponent} from './layout/sidebar.component';
import {SidebarLogoComponent} from './layout/sidebar-logo.component';
import {SidebarUserPanelComponent} from './layout/sidebar-user-panel.component';
import {SidebarMenuComponent} from './layout/sidebar-menu.component';
import {FilesComponent} from './files/files.component';
import {RenameFileComponent} from './files/rename-file/rename-file.component';
import {SiteConfigComponent} from './site-config/site-config.component';
import {BaseInformationsComponent} from './site-config/base-informations/base-informations.component';
import {ChangeValueComponent} from './site-config/base-informations/change-value/change-value.component';
import {UpdateProfileComponent} from './users/update-profile/update-profile.component';
import {PostCategoriesComponent} from './post-categories/post-categories.component';
import {CreatePostCategoryComponent} from './post-categories/create-post-category/create-post-category.component';
import {UpdatePostCategoryComponent} from './post-categories/update-post-category/update-post-category.component';
import {PostsComponent} from './posts/posts.component';
import {CreatePostComponent} from './posts/create-post/create-post.component';
import {UpdatePostComponent} from './posts/update-post/update-post.component';
import {PlacesComponent} from './places/places.component';
import {CreatePlaceComponent} from './places/create-place/create-place.component';
import {UpdatePlaceComponent} from './places/update-place/update-place.component';
import {AgmCoreModule} from '@agm/core';
import {BrowserModule} from '@angular/platform-browser';
import {SocialNetworkComponent} from './social-network/social-network.component';
import {SocialHomeComponent} from './social-network/social-home/social-home.component';
import {SocialHeaderComponent} from './layout/social-header/social-header.component';
import {SocialSidebarComponent} from './layout/social-sidebar/social-sidebar.component';
import {SocialSidebarRightComponent} from './layout/social-sidebar-right/social-sidebar-right.component';
import {PlaceCategoriesComponent} from './place-categories/place-categories.component';
import {CreatePlaceCategoryComponent} from './place-categories/create-place-category/create-place-category.component';
import {UpdatePlaceCategoryComponent} from './place-categories/update-place-category/update-place-category.component';
import {UserCreateNewPostComponent} from './social-network/social-home/user-create-new-post/user-create-new-post.component';
import {UserUpdatePostComponent} from './social-network/social-home/user-update-post/user-update-post.component';
import {FavoritesComponent} from './social-network/favorites/favorites.component';
import {StickyPostsComponent} from './social-network/sticky-posts/sticky-posts.component';
import { RecommendPlacesComponent } from './social-network/recommend-places/recommend-places.component';
import { UpdateMyProfileComponent } from './layout/social-header/update-my-profile/update-my-profile.component';
import { ReadPostComponent } from './social-network/social-home/read-post/read-post.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        // tenants
        TenantsComponent,
        CreateTenantDialogComponent,
        EditTenantDialogComponent,
        // roles
        RolesComponent,
        CreateRoleDialogComponent,
        EditRoleDialogComponent,
        // users
        UsersComponent,
        CreateUserDialogComponent,
        EditUserDialogComponent,
        ChangePasswordComponent,
        ResetPasswordDialogComponent,
        // layout
        HeaderComponent,
        HeaderLeftNavbarComponent,
        HeaderLanguageMenuComponent,
        HeaderUserMenuComponent,
        FooterComponent,
        SidebarComponent,
        SidebarLogoComponent,
        SidebarUserPanelComponent,
        SidebarMenuComponent,
        FilesComponent,
        RenameFileComponent,
        SiteConfigComponent,
        BaseInformationsComponent,
        ChangeValueComponent,
        UpdateProfileComponent,
        PostCategoriesComponent,
        CreatePostCategoryComponent,
        UpdatePostCategoryComponent,
        PostsComponent,
        CreatePostComponent,
        UpdatePostComponent,
        PlacesComponent,
        CreatePlaceComponent,
        UpdatePlaceComponent,
        SocialNetworkComponent,
        SocialHomeComponent,
        SocialHeaderComponent,
        SocialSidebarComponent,
        SocialSidebarRightComponent,
        PlaceCategoriesComponent,
        CreatePlaceCategoryComponent,
        UpdatePlaceCategoryComponent,
        UserCreateNewPostComponent,
        UserUpdatePostComponent,
        FavoritesComponent,
        StickyPostsComponent,
        RecommendPlacesComponent,
        UpdateMyProfileComponent,
        ReadPostComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        ModalModule.forChild(),
        BsDropdownModule,
        CollapseModule,
        TabsModule,
        AppRoutingModule,
        ServiceProxyModule,
        SharedModule,
        NgxPaginationModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDGhuwAn_VTCeI1M5QQ0F30vi1stJgSNM8',
        }),
        CKEditorModule
    ],
    providers: [],
    entryComponents: [
        // tenants
        CreateTenantDialogComponent,
        EditTenantDialogComponent,
        // roles
        CreateRoleDialogComponent,
        EditRoleDialogComponent,
        // users
        CreateUserDialogComponent,
        EditUserDialogComponent,
        ResetPasswordDialogComponent,
    ],
})
export class AppModule {
}
