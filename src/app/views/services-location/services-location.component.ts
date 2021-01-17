import { Component, OnInit, ViewChild } from '@angular/core';
import { confirm } from 'devextreme/ui/dialog';
import notify from 'devextreme/ui/notify';
import { takeUntil } from 'rxjs/operators';
import { MenuEnum } from 'src/app/core/enums/menu.enum';
import { ServiceLocationsDTO } from 'src/app/core/models/service.locations.DTO';
import { SpUserMenus } from 'src/app/core/models/sp.user.menus';
import { ServiceLocationService } from 'src/app/core/services/service-location.service';
import { SlideService } from 'src/app/core/services/slide.service';
import { BaseControl } from '../base.control';
import { ServiceLocationCreateAndUpdateComponent } from './service-location-create-and-update/service-location-create-and-update.component';

@Component({
  selector: 'app-services-location',
  templateUrl: './services-location.component.html',
  styleUrls: ['./services-location.component.css'],
})
export class ServicesLocationComponent extends BaseControl implements OnInit {
  refreshButtonOptions: any;
  addButtonOptions: any;

  @ViewChild('serviceLocationCreateAndUpdateComponent', { static: false })
  private serviceLocationCreateAndUpdateComponent: ServiceLocationCreateAndUpdateComponent;
  pageRights: SpUserMenus = new SpUserMenus();
  constructor(
    public serviceLocationService: ServiceLocationService,
    private slideService: SlideService
  ) {
    super();
    const me = this;
    me.serviceLocationService.loadServices();
  }

  ngOnInit() {
    const me = this;
    me.toolbaarButtons();
    me.pageRights = me.slideService.getPageRights(MenuEnum.ServiceLocation);
  }
  _onUpdate(e) {
    const me = this;
    me.serviceLocationCreateAndUpdateComponent.show(e.data);
  }
  _onDeletePage(e) {
    const me = this;
    const text: string = 'Hizmet Yeri';
    const message: string =
      '<p>Hizmet Yeri Silinecek. Bunu yapmak istiyor musnuz?</p>';

    var result = confirm(message, text);
    result.then((dialogResult) => {
      if (dialogResult) {
        me.serviceLocationService
          .deleteServiceLocations(e.data.id)
          .pipe(takeUntil(me.ngUnSubscribe))
          .subscribe((sate) => {
            if (sate) {
              me.serviceLocationService.loadServices();
              notify('Hizmet Yeri başarılı bir şekilde silindi', 'success');
            } else {
              notify('Hizmet Yeri silinirken bir hata oluştu', 'danger');
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
        me.serviceLocationService.loadServices();
      },
    };

    me.addButtonOptions = {
      icon: 'plus',
      text: 'Yeni Hizmet Yeri Ekle',
      onClick: () => {
        me.serviceLocationCreateAndUpdateComponent.show(
          new ServiceLocationsDTO()
        );
      },
    };
  }
}
