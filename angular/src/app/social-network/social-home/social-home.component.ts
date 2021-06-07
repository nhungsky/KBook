import { Component, OnInit } from '@angular/core';
import { PostListDto, PostServiceProxy } from '@shared/service-proxies/service-proxies';


@Component({
  selector: 'app-social-home',
  templateUrl: './social-home.component.html',
  styleUrls: ['./social-home.component.css']
})
export class SocialHomeComponent implements OnInit {

  postLists: PostListDto[] = [];
  constructor(public postService: PostServiceProxy) {

  }

  ngOnInit(): void {
  }

}
