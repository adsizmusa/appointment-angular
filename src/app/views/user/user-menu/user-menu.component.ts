import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DxPopupComponent } from 'devextreme-angular';
import { takeUntil } from 'rxjs/operators';
import { SpUserMenus } from 'src/app/core/models/sp.user.menus';
import { UserService } from 'src/app/core/services/user.service';
import { BaseControl } from '../../base.control';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css'],
})
export class UserMenuComponent extends BaseControl implements OnInit {
  @ViewChild(DxPopupComponent, { static: true })
  private popup: DxPopupComponent;

  @Output()
  public popupClosed: EventEmitter<string> = new EventEmitter<string>();
  userMenus: SpUserMenus[] = [];
  constructor(private userService: UserService) {
    super();
  }

  ngOnInit() {}

  show(id: number) {
    const me = this;

    me.userMenus = [];
    me.userService
      .getUserMenus(id)
      .pipe(takeUntil(me.ngUnSubscribe))
      .subscribe((menus) => {
        me.userMenus = menus;

        me.popup.instance.show();
      });
  }
  changeMenuState(e) {
    const me = this;

    if (!e.isVisible) {
      var item = me.userMenus.find((s) => s.id == e.id);
      item.canAdd = false;
      item.canUpdate = false;
      item.canDelete = false;
    }
    e.isUpdate = true;
  }
  _popUpShown() {
    const me = this;
  }
  _onSave() {
    const me = this;
    var updateMenus = me.userMenus.filter((s) => s.isUpdate == true);
    if (updateMenus.length > 0) {
      me.userService
        .updateUserMenus(updateMenus)
        .pipe(takeUntil(me.ngUnSubscribe))
        .subscribe(() => {
          me.popup.instance.hide();
        });
    } else {
      me.popup.instance.hide();
    }
  }
}
