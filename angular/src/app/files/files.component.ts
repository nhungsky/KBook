import { Component, Inject, Injector, OnInit, Optional } from "@angular/core";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import { PagedRequestDto } from "@shared/paged-listing-component-base";
import {
  RoleDto,
  API_BASE_URL,
  FileParameter,
  AppFileServiceProxy,
  AppFileModel,
} from "@shared/service-proxies/service-proxies";
import { AppComponentBase } from "@shared/app-component-base";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { RenameFileComponent } from "./rename-file/rename-file.component";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-files",
  templateUrl: "./files.component.html",
  styleUrls: ["./files.component.css"],
  animations: [appModuleAnimation()],
})
export class FilesComponent extends AppComponentBase implements OnInit {
  public isLoading = false;
  public appBaseUrl = "";

  fileInfosRaw: AppFileModel[] = [];
  fileInfos: AppFileModel[] = [];
  roles: RoleDto[] = [];
  keyword = "";

  constructor(
    injector: Injector,
    private _appFileService: AppFileServiceProxy,
    private _modalService: BsModalService,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    super(injector);
    this.appBaseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.loadFiles();
  }

  handleFileInput(files: FileList) {
    this.isLoading = true;
    var currentFile = files.item(0);
    let fileParameter: FileParameter = {
      fileName: currentFile.name,
      data: currentFile,
    };
    this._appFileService
      .uploadFile(fileParameter)
      .pipe()
      .subscribe(
        (fileInfo) => {
          abp.notify.success(this.l("SuccessfullyUploaded"));
          this.refresh();
        },
        (err) => {
          abp.notify.error(this.l("FileUploadFailed"));
        }
      );
  }

  search() {
    if (!this.keyword) {
      this.fileInfos = this.fileInfosRaw;
    } else {
      this.fileInfos = this.fileInfosRaw.filter((x) =>
        x.name.toLocaleLowerCase().includes(this.keyword.toLocaleLowerCase())
      );
    }
  }

  loadFiles() {
    this._appFileService
      .getAllFile()
      .pipe()
      .subscribe((_fileInfos) => {
        this.keyword = "";
        this.fileInfos = _fileInfos;
        this.fileInfosRaw = _fileInfos;
        this.isLoading = false;
      });
  }

  refresh() {
    this.loadFiles();
  }

  delete(fileName: string): void {
    abp.message.confirm(
      this.l("FileDeleteWarningMessage", fileName),
      undefined,
      (result: boolean) => {
        if (result) {
          this._appFileService
            .delete(fileName)
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

  renameFile(fileInfo: AppFileModel): void {
    this.showFileRenameDialog(fileInfo.name);
  }

  private showFileRenameDialog(oldName: string): void {
    let renameFileDialog: BsModalRef = this._modalService.show(
      RenameFileComponent,
      {
        class: "modal-lg",
        initialState: {
          oldName: oldName,
        },
      }
    );

    renameFileDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
