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
  RoleServiceProxy,
  RoleDto,
  PermissionDto,
  CreateRoleDto,
  PostCategoryDto,
  PostCategoryServiceProxy,
  PlaceDto,
  PlaceServiceProxy,
  API_BASE_URL,
  FileParameter,
  AppFileServiceProxy,
  PlaceCategoryDto,
  PlaceCategoryServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { forEach as _forEach, map as _map } from "lodash-es";
import { MapsAPILoader } from "@agm/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-create-place",
  templateUrl: "./create-place.component.html",
  styleUrls: ["./create-place.component.css"],
})
export class CreatePlaceComponent extends AppComponentBase implements OnInit {
  public appBaseUrl = "";
  placeCategories: PlaceCategoryDto[] = [];

  latitude = 0.0;
  longitude = 0.0;
  zoom: number = 18;
  type = "roadmap";
  pickedFiles: File[] = [null, null, null];
  imgPreviews = ["", "", ""];

  markerLat = 0.0;
  markerLng = 0.0;

  saving = false;
  place = new PlaceDto();

  @Output() onSave = new EventEmitter<any>();

  handleFileInput(files: FileList, index) {
    var currentFile = files.item(0);
    this.pickedFiles[index] = currentFile;
    this.imgPreviews[index] = URL.createObjectURL(currentFile);
  }

  async syncFiles() {
    var photos = [];
    for (let i = 0; i < this.pickedFiles.length; i++) {
      const file = this.pickedFiles[i];
      if (!file)
        continue;
      let fileParameter: FileParameter = {
        fileName: file.name,
        data: file,
      };
      var result = await this.appFileService
        .uploadFile(fileParameter).toPromise();
      try {
        photos.push(result.fullName);
      } catch (e) {
      }
    }

    this.place.photos = JSON.stringify(photos);
  }

  getImagePreview(index) {
    if (this.imgPreviews[index] && this.imgPreviews[index].length > 0) {
      return this.sanitizer.bypassSecurityTrustUrl(this.imgPreviews[index]);
    } else {
      return this.appBaseUrl + abp.setting.get("IMAGE_HOLDER");
    }
  }

  isDisabled(index) {
    return !(
      this.imgPreviews[index] &&
      this.imgPreviews[index].length > 0 &&
      this.place.photos &&
      this.place.photos.length > 0
    );
  }

  constructor(
    injector: Injector,
    private sanitizer: DomSanitizer,
    private mapsAPILoader: MapsAPILoader,
    private _placeService: PlaceServiceProxy,
    public placeCategoryService: PlaceCategoryServiceProxy,
    public bsModalRef: BsModalRef,
    private appFileService: AppFileServiceProxy,
    @Inject(API_BASE_URL) baseUrl?: string
  ) {
    super(injector);
    this.appBaseUrl = baseUrl;
  }

  onMapChanges(e) {
    this.markerLat = e.lat;
    this.markerLng = e.lng;
    this.place.latitude = e.lat;
    this.place.longitude = e.lng;
  }

  async ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
    });
    var res = await this.placeCategoryService.getAll("", true, 0, 1000).toPromise();
    if (res.totalCount > 0 && res.items && res.items.length > 0) {
      this.placeCategories = res.items;
    }
  }

  removePhoto(index) {
    this.pickedFiles[index] = null;
    this.imgPreviews[index] = "";
  }

  private setCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 18;
      });
    }
  }

  async save() {
    this.saving = true;
    await this.syncFiles();
    this._placeService
      .create(this.place)
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
