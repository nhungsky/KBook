import { Component, OnInit } from "@angular/core";
import { appModuleAnimation } from "@shared/animations/routerTransition";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"],
  animations: [appModuleAnimation()],
})
export class PostsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
