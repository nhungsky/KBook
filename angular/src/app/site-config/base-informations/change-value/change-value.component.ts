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
  UserServiceProxy,
  UserDto,
  RoleDto,
  AppFileServiceProxy,
  BaseInfoSettingServiceProxy,
} from "@shared/service-proxies/service-proxies";

@Component({
  selector: "app-change-value",
  templateUrl: "./change-value.component.html",
})
export class ChangeValueComponent extends AppComponentBase implements OnInit {
  saving = false;
  name: string;
  value: string;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _baseInfoSettingService: BaseInfoSettingServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {}

  save(): void {
    this.saving = true;

    this._baseInfoSettingService
      .updateConfig(this.name, this.value)
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
