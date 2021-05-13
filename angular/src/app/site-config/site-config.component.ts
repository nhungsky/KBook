import { Component, OnInit } from "@angular/core";
import { appModuleAnimation } from "@shared/animations/routerTransition";

@Component({
  selector: "app-site-config",
  templateUrl: "./site-config.component.html",
  animations: [appModuleAnimation()],
})
export class SiteConfigComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
