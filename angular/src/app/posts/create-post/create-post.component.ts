import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from "@angular/core";
import { finalize } from "rxjs/operators";
import { BsModalRef } from "ngx-bootstrap/modal";
import { AppComponentBase } from "@shared/app-component-base";
import {
  RoleServiceProxy,
  RoleDto,
  PermissionDto,
  CreateRoleDto,
  PermissionDtoListResultDto,
  PostCategoryDto,
  PostCategoryServiceProxy,
  PostDto,
  PostServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { forEach as _forEach, map as _map } from "lodash-es";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent extends AppComponentBase
  implements OnInit {

  saving = false;
  post = new PostDto();

  postCategories: PostCategoryDto[] = [];

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _postService: PostServiceProxy,
    private _postCategoryService: PostCategoryServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  async ngOnInit() {
    var postCategoryRequestResult = await this._postCategoryService.getAll("", 0, 1000).toPromise();
    this.postCategories = postCategoryRequestResult.items;
  }

  save(): void {
    this.saving = true;

    this.post.isActive = true;
    this.post.isDeleted = false;
    
    this._postService
      .create(this.post)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l("SavedSuccessfully"));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
}
