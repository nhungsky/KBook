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
  PlaceDto,
  PlaceServiceProxy,
  PlaceDtoPagedResultDto,
} from "@shared/service-proxies/service-proxies";
import { CreatePlaceComponent } from "./create-place/create-place.component";
import { UpdatePlaceComponent } from "./update-place/update-place.component";

class PagedPlacesRequestDto extends PagedRequestDto {
  keyword: string;
  isActive = true;
}

@Component({
  selector: "app-places",
  templateUrl: "./places.component.html",
  styleUrls: ["./places.component.css"],
  animations: [appModuleAnimation()],
})
export class PlacesComponent extends PagedListingComponentBase<RoleDto> {
  places: PlaceDto[] = [];
  keyword = "";

  constructor(
    injector: Injector,
    private _placeService: PlaceServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  list(
    request: PagedPlacesRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._placeService
      .getAll(
        request.keyword,
        request.isActive,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: PlaceDtoPagedResultDto) => {
        this.places = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  delete(role: RoleDto): void {
    abp.message.confirm(
      this.l("PostCategoryDeleteWarningMessage", role.displayName),
      undefined,
      (result: boolean) => {
        if (result) {
          this._placeService
            .delete(role.id)
            .pipe(
              finalize(() => {
                abp.notify.success(this.l("SuccessfullyDeleted"));
                this.refresh();
              })
            )
            .subscribe(() => {});
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
      createOrEditRoleDialog = this._modalService.show(CreatePlaceComponent, {
        class: "modal-lg",
      });
    } else {
      createOrEditRoleDialog = this._modalService.show(UpdatePlaceComponent, {
        class: "modal-lg",
        initialState: {
          id: id,
        },
      });
    }

    createOrEditRoleDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
