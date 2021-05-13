import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from "@angular/core";
import { finalize } from "rxjs/operators";
import { BsModalRef } from "ngx-bootstrap/modal";
import {
  forEach as _forEach,
  includes as _includes,
  map as _map,
} from "lodash-es";
import { AppComponentBase } from "@shared/app-component-base";
import {
  RoleServiceProxy,
  GetRoleForEditOutput,
  RoleDto,
  PermissionDto,
  RoleEditDto,
  FlatPermissionDto,
  PostCategoryDto,
  PostCategoryServiceProxy,
} from "@shared/service-proxies/service-proxies";

@Component({
  selector: "app-update-post-category",
  templateUrl: "./update-post-category.component.html",
  styleUrls: ["./update-post-category.component.css"],
})
export class UpdatePostCategoryComponent
  extends AppComponentBase
  implements OnInit {
  saving = false;
  id: number;
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

  ngOnInit(): void {
    this._postCategoryService
      .get(this.id)
      .subscribe((result: PostCategoryDto) => {
        this.postCategory = result;
      });
  }
  save(): void {
    this.saving = true;

    this._postCategoryService
      .update(this.postCategory)
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
