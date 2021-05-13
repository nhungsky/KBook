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
} from "@shared/service-proxies/service-proxies";
import { forEach as _forEach, map as _map } from "lodash-es";
@Component({
  selector: "app-create-post-category",
  templateUrl: "./create-post-category.component.html",
  styleUrls: ["./create-post-category.component.css"],
})
export class CreatePostCategoryComponent
  extends AppComponentBase
  implements OnInit {
  saving = false;
  postCategory = new PostCategoryDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _postCategoryService: PostCategoryServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  autoSlug() {
    var slug = this.postCategory.name
      .toLocaleLowerCase()
      .trim()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    this.postCategory.slug = slug;
  }

  ngOnInit(): void {}

  save(): void {
    this.saving = true;

    this._postCategoryService
      .create(this.postCategory)
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
