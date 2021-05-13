import { Component, Inject, Injector, OnInit, Optional } from "@angular/core";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import { AppComponentBase } from "@shared/app-component-base";
import {
  API_BASE_URL,
  BaseInfoSettingModel,
  BaseInfoSettingServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ChangeValueComponent } from "./change-value/change-value.component";

@Component({
  selector: "app-base-infomations",
  templateUrl: "./base-informations.component.html",
  animations: [appModuleAnimation()],
})
export class BaseInformationsComponent
  extends AppComponentBase
  implements OnInit {
  public isLoading = false;
  public appBaseUrl = "";
  keyword = "";

  bisRaw: BaseInfoSettingModel[] = [];
  baseInfoSettings: BaseInfoSettingModel[] = [];

  constructor(
    injector: Injector,
    private _baseInfoSettingService: BaseInfoSettingServiceProxy,
    private _modalService: BsModalService,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    super(injector);
    this.appBaseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.isLoading = true;
    this._baseInfoSettingService
      .getAllSettingKeys()
      .pipe()
      .subscribe((data) => {
        this.keyword = "";
        this.isLoading = false;
        this.baseInfoSettings = data;
        this.bisRaw = data;
      });
  }

  search() {
    this.baseInfoSettings = this.bisRaw.filter((x) =>
      x.name.toLocaleLowerCase().includes(this.keyword.toLocaleLowerCase())
    );
  }

  refresh() {
    this.load();
  }

  changeValue(name: string, value: string): void {
    this.showChangeValueDialog(name, value);
  }

  private showChangeValueDialog(name: string, value: string): void {
    let changeValueDialog: BsModalRef = this._modalService.show(
      ChangeValueComponent,
      {
        class: "modal-lg",
        initialState: {
          name: name,
          value: value,
        },
      }
    );

    changeValueDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
