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
} from "@shared/service-proxies/service-proxies";

@Component({
  selector: "app-rename-file",
  templateUrl: "./rename-file.component.html",
  styleUrls: ["./rename-file.component.css"],
})
export class RenameFileComponent extends AppComponentBase implements OnInit {
  saving = false;
  oldName: string;
  newName: string;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _appFileService: AppFileServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {}

  save(): void {
    this.saving = true;

    this._appFileService
      .rename(this.oldName, this.newName)
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
