import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
  Inject,
} from "@angular/core";
import { finalize } from "rxjs/operators";
import { BsModalRef } from "ngx-bootstrap/modal";
import { AppComponentBase } from "@shared/app-component-base";
import {
  API_BASE_URL,
  FileParameter,
  AppFileServiceProxy,
  PlaceCategoryDto,
  PlaceCategoryServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { forEach as _forEach, map as _map } from "lodash-es";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-create-place-category',
  templateUrl: './create-place-category.component.html',
  styleUrls: ['./create-place-category.component.css']
})
export class CreatePlaceCategoryComponent extends AppComponentBase implements OnInit {
  public appBaseUrl = "";

  pickedFile: File = null;
  imgPreview = "";

  saving = false;
  placeCategory = new PlaceCategoryDto();

  @Output() onSave = new EventEmitter<any>();

  handleFileInput(files: FileList) {
    var currentFile = files.item(0);
    this.pickedFile = currentFile;
    this.imgPreview = URL.createObjectURL(currentFile);
  }

  async syncFiles() {
    let fileParameter: FileParameter = {
      fileName: this.pickedFile.name,
      data: this.pickedFile,
    };
    var result = await this.appFileService
      .uploadFile(fileParameter).toPromise();
    try {
      this.placeCategory.featureImage = result.fullName;
    } catch (e) {
    }
  }

  getImagePreview() {
    if (this.imgPreview && this.imgPreview.length > 0) {
      return this.sanitizer.bypassSecurityTrustUrl(this.imgPreview);
    } else {
      return this.appBaseUrl + abp.setting.get("IMAGE_HOLDER");
    }
  }

  isDisabled() {
    return !(
      this.imgPreview &&
      this.imgPreview.length > 0 &&
      this.placeCategory.featureImage &&
      this.placeCategory.featureImage.length > 0
    );
  }

  constructor(
    injector: Injector,
    private sanitizer: DomSanitizer,
    private placeCategoryService: PlaceCategoryServiceProxy,
    public bsModalRef: BsModalRef,
    private appFileService: AppFileServiceProxy,
    @Inject(API_BASE_URL) baseUrl?: string
  ) {
    super(injector);
    this.appBaseUrl = baseUrl;
  }

  ngOnInit(): void {
  }

  removePhoto() {
    this.pickedFile = null;
    this.imgPreview = "";
  }


  async save() {
    this.saving = true;
    await this.syncFiles();
    this.placeCategoryService
      .create(this.placeCategory)
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

