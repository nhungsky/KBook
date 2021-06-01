import { Component, Injector } from "@angular/core";
import { finalize } from "rxjs/operators";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  RoleServiceProxy,
  RoleDto,
  RoleDtoPagedResultDto,
  PostCategoryServiceProxy,
  PostCategoryDtoPagedResultDto,
  PostCategoryDto,
} from "@shared/service-proxies/service-proxies";
import { CreatePostCategoryComponent } from "./create-post-category/create-post-category.component";
import { UpdatePostCategoryComponent } from "./update-post-category/update-post-category.component";

class PagedPostCategoryRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  selector: "app-post-categories",
  templateUrl: "./post-categories.component.html",
  styleUrls: ["./post-categories.component.css"],
  animations: [appModuleAnimation()],
})
export class PostCategoriesComponent extends PagedListingComponentBase<PostCategoryDto> {
  postCategories: PostCategoryDto[] = [];
  keyword = "";

  constructor(
    injector: Injector,
    private _postCategoryService: PostCategoryServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  list(
    request: PagedPostCategoryRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._postCategoryService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: PostCategoryDtoPagedResultDto) => {
        this.postCategories = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  delete(role: PostCategoryDto): void {
    abp.message.confirm(
      this.l("PostCategoryDeleteWarningMessage", role.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._postCategoryService
            .delete(role.id)
            .pipe(
              finalize(() => {
                abp.notify.success(this.l("SuccessfullyDeleted"));
                this.refresh();
              })
            )
            .subscribe(() => { });
        }
      }
    );
  }

  createRole(): void {
    this.showCreateOrEditRoleDialog();
  }

  editRole(role: RoleDto): void {
    this.showCreateOrEditRoleDialog(role.id);
  }

  showCreateOrEditRoleDialog(id?: number): void {
    let createOrEditRoleDialog: BsModalRef;
    if (!id) {
      createOrEditRoleDialog = this._modalService.show(
        CreatePostCategoryComponent,
        {
          class: "modal-lg",
        }
      );
    } else {
      createOrEditRoleDialog = this._modalService.show(
        UpdatePostCategoryComponent,
        {
          class: "modal-lg",
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditRoleDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
