import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SocialNetworkComponent } from "./social-network.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: SocialNetworkComponent,
        children: [

        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class SocialNetworkRoutingModule {}
