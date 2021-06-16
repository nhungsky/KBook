import {Component, Injector} from '@angular/core';
import {finalize} from 'rxjs/operators';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {appModuleAnimation} from '@shared/animations/routerTransition';
import {
    PagedListingComponentBase,
    PagedRequestDto,
} from '@shared/paged-listing-component-base';
import {
    RoleDto,
    PlaceDto,
    PlaceServiceProxy,
    PlaceDtoPagedResultDto, PlaceCategoryDto, PlaceCategoryServiceProxy,
} from '@shared/service-proxies/service-proxies';
import {CreatePlaceComponent} from './create-place/create-place.component';
import {UpdatePlaceComponent} from './update-place/update-place.component';

class PagedPlacesRequestDto extends PagedRequestDto {
    keyword: string;
    isActive = true;
    placeCategoryId = null;
}

@Component({
    selector: 'app-places',
    templateUrl: './places.component.html',
    styleUrls: ['./places.component.css'],
    animations: [appModuleAnimation()],
})
export class PlacesComponent extends PagedListingComponentBase<RoleDto> {
    placeCategories: PlaceCategoryDto[] = [];
    selectedPlaceCategoryId = -1;
    places: PlaceDto[] = [];
    keyword = '';

    constructor(
        injector: Injector,
        private _placeService: PlaceServiceProxy,
        private _placeCategoryService: PlaceCategoryServiceProxy,
        private _modalService: BsModalService
    ) {
        super(injector);
        _placeCategoryService.getAll('', true, 0, 1000)
            .subscribe(pcs => {
                this.placeCategories = pcs.items;
            });
    }

    onPlaceCategoryChanged() {
        this.pageNumber = 1;
        this.refresh();
    }

    getPlaceCategoryName(placeCategoryId: number) {
        return this.placeCategories.find(x => x.id == placeCategoryId).name;
    }

    list(
        request: PagedPlacesRequestDto,
        pageNumber: number,
        finishedCallback: Function
    ): void {
        request.keyword = this.keyword;
        request.placeCategoryId = null;
        if (this.selectedPlaceCategoryId > 0) {
            request.placeCategoryId = this.selectedPlaceCategoryId;
        }

        this._placeService
            .getAll(
                request.keyword,
                request.isActive,
                request.placeCategoryId,
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
            this.l('PostCategoryDeleteWarningMessage', role.displayName),
            undefined,
            (result: boolean) => {
                if (result) {
                    this._placeService
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

    createPlace(): void {
        this.showCreateOrEditRoleDialog();
    }

    editPlace(place: PlaceDto): void {
        this.showCreateOrEditRoleDialog(place.id);
    }

    showCreateOrEditRoleDialog(id?: number): void {
        let createOrEditRoleDialog: BsModalRef;
        if (!id) {
            createOrEditRoleDialog = this._modalService.show(CreatePlaceComponent, {
                class: 'modal-lg',
            });
        } else {
            createOrEditRoleDialog = this._modalService.show(UpdatePlaceComponent, {
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
