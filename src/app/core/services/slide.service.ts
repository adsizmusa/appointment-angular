import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { SlideProperties } from '../models/slide/slide.properties';
import { AuthService } from './auth.service';
import { RightsDTO } from '../models/right.DTO';
import { SpUserMenus } from '../models/sp.user.menus';

@Injectable({
  providedIn: 'root',
})
export class SlideService extends BaseService {
  menuOptions: any;
  customerOptions: any;

  closeButtonOptions: any;
  userButtonOptions: any;
  settingsButtonOptions: any;
  slideProperties: SlideProperties = new SlideProperties();
  rightsDTO: RightsDTO = new RightsDTO();

  constructor(
    protected httpClient: HttpClient,
    private authService: AuthService
  ) {
    super(httpClient);
    const me = this;
    me.getNavigationList();
  }
  getNavigationList() {
    const me = this;

    me.toolbaarButtons();
  }
  onClick(e) {
    const me = this;
    var selectMenu: SpUserMenus = e.itemData;
    me.onClickMenu(selectMenu);
  }
  onClickMenu(selectMenu: SpUserMenus) {
    const me = this;
    me.authService.router.navigate([selectMenu.url]);
    if (!me.slideProperties.isDefaultDrawerOpen)
      me.slideProperties.isDrawerOpen = false;
  }
  toolbaarButtons() {
    const me = this;
    me.menuOptions = {
      icon: 'menu',
      onClick: () => {
        if (me.slideProperties.isDrawerOpen) {
          me.slideProperties.isDrawerOpen = false;
        } else {
          me.slideProperties.isDrawerOpen = true;
        }
      },
    };

    me.customerOptions = {
      location: 'center',
      text: me.authService.storageService.company
        ? me.authService.storageService.company.name
        : '',
    };

    me.userButtonOptions = {
      text: 'Kullanıcı Profili',
      icon: 'user',
      onClick: () => {},
    };

    me.settingsButtonOptions = {
      text: 'Ayarlar',
      icon: 'fas fa-cogs',
      onClick: () => {},
    };
    me.closeButtonOptions = {
      text: 'Çıkış',
      icon: 'fas fa-sign-out-alt',
      onClick: () => {
        me.authService.logout();
        me.rightsDTO.spMenus = [];
      },
    };
  }
  _reloadPage() {
    const me = this;
    const reuse = me.authService.router.routeReuseStrategy.shouldReuseRoute;

    me.authService.router.routeReuseStrategy.shouldReuseRoute = () => false;
    me.authService.router.navigated = false;
    me.authService.router.navigateByUrl(me.authService.router.url).then(() => {
      me.authService.router.routeReuseStrategy.shouldReuseRoute = reuse;
    });
  }

  getPageRights(pageId: number): SpUserMenus {
    const me = this;
    var selectedPage = me.rightsDTO.spMenus.find((s) => s.id == pageId);
    if (selectedPage == null) {
      me.authService.router.navigate(['/home']);
    } else {
    }
    return selectedPage;
  }
}
