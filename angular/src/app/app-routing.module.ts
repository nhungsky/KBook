import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { UsersComponent } from "./users/users.component";
import { TenantsComponent } from "./tenants/tenants.component";
import { RolesComponent } from "app/roles/roles.component";
import { ChangePasswordComponent } from "./users/change-password/change-password.component";
import { FilesComponent } from "./files/files.component";
import { BaseInformationsComponent } from "./site-config/base-informations/base-informations.component";
import { UpdateProfileComponent } from "./users/update-profile/update-profile.component";
import { PlacesComponent } from "./places/places.component";
import { PostsComponent } from "./posts/posts.component";
import { PostCategoriesComponent } from "./post-categories/post-categories.component";
import { SocialNetworkComponent } from "./social-network/social-network.component";
import { SocialHomeComponent } from "./social-network/social-home/social-home.component";
import { PlaceCategoriesComponent } from "./place-categories/place-categories.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "manager",
        component: AppComponent,
        children: [
          {
            path: "home",
            component: HomeComponent,
            canActivate: [AppRouteGuard],
          },
          {
            path: "users",
            component: UsersComponent,
            data: { permission: "Pages.Users" },
            canActivate: [AppRouteGuard],
          },
          {
            path: "roles",
            component: RolesComponent,
            data: { permission: "Pages.Roles" },
            canActivate: [AppRouteGuard],
          },
          {
            path: "tenants",
            component: TenantsComponent,
            data: { permission: "Pages.Tenants" },
            canActivate: [AppRouteGuard],
          },
          {
            path: "about",
            component: AboutComponent,
            canActivate: [AppRouteGuard],
          },
          {
            path: "update-password",
            component: ChangePasswordComponent,
            canActivate: [AppRouteGuard],
          },
          {
            path: "files",
            component: FilesComponent,
            canActivate: [AppRouteGuard],
          },
          {
            path: "site-config/base-informations",
            component: BaseInformationsComponent,
            canActivate: [AppRouteGuard],
          },
          {
            path: "users/update-profile",
            component: UpdateProfileComponent,
            canActivate: [AppRouteGuard],
          },
          {
            path: "places",
            component: PlacesComponent,
            canActivate: [AppRouteGuard],
          },
          {
            path: "place-categories",
            component: PlaceCategoriesComponent,
            canActivate: [AppRouteGuard],
          },
          {
            path: "posts",
            component: PostsComponent,
            canActivate: [AppRouteGuard],
          },
          {
            path: "post-categories",
            component: PostCategoriesComponent,
            canActivate: [AppRouteGuard],
          },
        ],
      },
      {
        path: "",
        component: SocialNetworkComponent,
        children: [
          {
            path: "",
            component: SocialHomeComponent,
            canActivate: [AppRouteGuard],
          },
        ]
      }
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
