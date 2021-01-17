import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersDTO } from 'src/app/core/models/users.DTO';
import { UserService } from 'src/app/core/services/user.service';
import { BaseControl } from '../base.control';
import { UserCreateAndUpdateComponent } from './user-create-and-update/user-create-and-update.component';
import { confirm } from 'devextreme/ui/dialog';
import { takeUntil } from 'rxjs/operators';
import notify from 'devextreme/ui/notify';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { SpUserMenus } from 'src/app/core/models/sp.user.menus';
import { SlideService } from 'src/app/core/services/slide.service';
import { MenuEnum } from 'src/app/core/enums/menu.enum';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent extends BaseControl implements OnInit {
  refreshButtonOptions: any;
  addButtonOptions: any;

  @ViewChild('userCreateAndUpdateComponent', { static: false })
  private userCreateAndUpdateComponent: UserCreateAndUpdateComponent;

  @ViewChild('userMenuComponent', { static: false })
  private userMenuComponent: UserMenuComponent;
  pageRights: SpUserMenus = new SpUserMenus();
  constructor(
    public userService: UserService,
    public slideService: SlideService
  ) {
    super();
    const me = this;
    me.userService.loadServices();
    me.pageRights = me.slideService.getPageRights(MenuEnum.User);
  }

  ngOnInit() {
    const me = this;
    me.toolbaarButtons();
  }
  _onUpdate(e) {
    const me = this;
    me.userCreateAndUpdateComponent.show(e.data);
  }
  _onUserMenu(e) {
    const me = this;
    me.userMenuComponent.show(e.data.id);
  }
  _onDeletePage(e) {
    const me = this;
    const text: string = 'Kullanıcı Silinecek';
    const message: string =
      '<p>Kullanıcı bilgisi Silinecek. Bunu yapmak istiyor musnuz?</p>';

    var result = confirm(message, text);
    result.then((dialogResult) => {
      if (dialogResult) {
        me.userService
          .deleteUsers(e.data.id)
          .pipe(takeUntil(me.ngUnSubscribe))
          .subscribe((sate) => {
            if (sate) {
              me.userService.loadServices();
              notify(
                'Kullanıcı Bilgisi başarılı bir şekilde silindi',
                'success'
              );
            } else {
              notify('Kullanıcı Bilgisi silinirken bir hata oluştu', 'danger');
            }
          });
      }
    });
  }
  toolbaarButtons() {
    const me = this;
    me.refreshButtonOptions = {
      icon: 'refresh',
      text: 'Yenile',
      onClick: () => {
        me.userService.loadServices();
      },
    };

    me.addButtonOptions = {
      icon: 'plus',
      text: 'Yeni Kullanıcı Ekle',
      onClick: () => {
        me.userCreateAndUpdateComponent.show(new UsersDTO());
      },
    };
  }
}
