import {Component, Injector} from '@angular/core';
import {finalize} from 'rxjs/operators';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {appModuleAnimation} from '@shared/animations/routerTransition';
import {
    PagedListingComponentBase,
    PagedRequestDto,
} from '@shared/paged-listing-component-base';
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
    PlaceCategoryDto,
    PlaceCategoryServiceProxy,
    PlaceCategoryDtoPagedResultDto,
} from '@shared/service-proxies/service-proxies';
import {CreatePlaceCategoryComponent} from './create-place-category/create-place-category.component';
import {UpdatePlaceCategoryComponent} from './update-place-category/update-place-category.component';

class PagedPlaceCategoryRequestDto extends PagedRequestDto {
    keyword: string;
    isActive = true;
}

@Component({
    selector: 'app-place-categories',
    templateUrl: './place-categories.component.html',
    styleUrls: ['./place-categories.component.css'],
    animations: [appModuleAnimation()],
})
export class PlaceCategoriesComponent extends PagedListingComponentBase<RoleDto> {
    placeCategories: PlaceCategoryDto[] = [];
    keyword = '';

    constructor(
        injector: Injector,
        private placeCategoryService: PlaceCategoryServiceProxy,
        private _modalService: BsModalService
    ) {
        super(injector);
    }

    list(
        request: PagedPlaceCategoryRequestDto,
        pageNumber: number,
        finishedCallback: Function
    ): void {
        request.keyword = this.keyword;

        this.placeCategoryService
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
            .subscribe((result: PlaceCategoryDtoPagedResultDto) => {
                this.placeCategories = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    delete(role: RoleDto): void {
        abp.message.confirm(
            this.l('PostCategoryDeleteWarningMessage', role.displayName),
            undefined,
            (result: boolean) => {
                if (result) {
                    this.placeCategoryService
                        .delete(role.id)
                        .pipe(
                            finalize(() => {
                                abp.notify.success(this.l('SuccessfullyDeleted'));
                                this.refresh();
                            })
                        )
                        .subscribe(() => {
                        });
                }
            }
        );
    }

    createPlaceCategory(): void {
        this.showCreateOrEditRoleDialog();
    }

    editPlaceCategory(place: PlaceDto): void {
        this.showCreateOrEditRoleDialog(place.id);
    }

    showCreateOrEditRoleDialog(id?: number): void {
        let createOrEditRoleDialog: BsModalRef;
        if (!id) {
            createOrEditRoleDialog = this._modalService.show(CreatePlaceCategoryComponent, {
                class: 'modal-lg',
            });
        } else {
            createOrEditRoleDialog = this._modalService.show(UpdatePlaceCategoryComponent, {
                class: 'modal-lg',
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
