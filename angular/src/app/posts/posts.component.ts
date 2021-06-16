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
    PostDto,
    PostServiceProxy,
    PostDtoPagedResultDto,
} from '@shared/service-proxies/service-proxies';
import {CreatePostComponent} from './create-post/create-post.component';
import {UpdatePostComponent} from './update-post/update-post.component';

class PagedPostRequestDto extends PagedRequestDto {
    keyword: string;
    postCategoryId: number = null;
}

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css'],
    animations: [appModuleAnimation()],
})
export class PostsComponent extends PagedListingComponentBase<PostDto> {
    postCategories: PostCategoryDto[] = [];
    posts: PostDto[] = [];
    selectedPostCategoryId = -1;
    keyword = '';

    constructor(
        injector: Injector,
        private _postService: PostServiceProxy,
        private _postCategoryService: PostCategoryServiceProxy,
        private _modalService: BsModalService
    ) {
        super(injector);
        _postCategoryService.getAll('', 0, 1000)
            .subscribe(pcs => {
                this.postCategories = pcs.items;
            });
    }

    getPostCategoryName(pcId) {
        return this.postCategories.find(x => x.id === pcId).name;
    }

    onPostCategoryChange() {
        this.pageNumber = 1;
        this.refresh();
    }

    list(
        request: PagedPostRequestDto,
        pageNumber: number,
        finishedCallback: Function
    ): void {
        request.keyword = this.keyword;
        request.postCategoryId = null;
        if (this.selectedPostCategoryId > 0) {
            request.postCategoryId = this.selectedPostCategoryId;
        }
        this._postService
            .getAll(request.keyword, true, request.postCategoryId, request.skipCount, request.maxResultCount)
            .pipe(
                finalize(() => {
                    finishedCallback();
                })
            )
            .subscribe((result: PostDtoPagedResultDto) => {
                this.posts = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    getSummary(crrPost: PostDto) {
        let destGet = crrPost.title.length * 2;
        let endMore = '...';
        if (destGet > crrPost.summary.length) {
            destGet = crrPost.summary.length;
            endMore = '';
        }
        return crrPost.summary.substring(0, destGet) + endMore;
    }

    delete(role: PostDto): void {
        abp.message.confirm(
            this.l('PostCategoryDeleteWarningMessage', role.title),
            undefined,
            (result: boolean) => {
                if (result) {
                    this._postService
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
                CreatePostComponent,
                {
                    class: 'modal-lg',
                }
            );
        } else {
            createOrEditRoleDialog = this._modalService.show(
                UpdatePostComponent,
                {
                    class: 'modal-lg',
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
