import { Component, OnInit, ViewChild } from '@angular/core';
import { confirm } from 'devextreme/ui/dialog';
import notify from 'devextreme/ui/notify';
import { takeUntil } from 'rxjs/operators';
import { MenuEnum } from 'src/app/core/enums/menu.enum';
import { ServicesDTO } from 'src/app/core/models/services.DTO';
import { SpUserMenus } from 'src/app/core/models/sp.user.menus';
import { ServiceService } from 'src/app/core/services/service.service';
import { SlideService } from 'src/app/core/services/slide.service';
import { BaseControl } from '../base.control';
import { ServiceCreateAndUpdateComponent } from './service-create-and-update/service-create-and-update.component';

@Component({
  selector: 'app-services',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
})
export class ServiceComponent extends BaseControl implements OnInit {
  refreshButtonOptions: any;
  addButtonOptions: any;

  @ViewChild('serviceCreateAndUpdateComponent', { static: false })
  private serviceCreateAndUpdateComponent: ServiceCreateAndUpdateComponent;

  pageRights: SpUserMenus = new SpUserMenus();
  constructor(
    public serviceService: ServiceService,
    private slideService: SlideService
  ) {
    super();
    const me = this;
    me.serviceService.loadServices();
  }

  ngOnInit() {
    const me = this;
    me.toolbaarButtons();
    me.pageRights = me.slideService.getPageRights(MenuEnum.Service);
  }
  _onUpdate(e) {
    const me = this;
    me.serviceCreateAndUpdateComponent.show(e.data);
  }
  _onDeletePage(e) {
    const me = this;
    const text: string = 'Hizmet Yeri';
    const message: string =
      '<p>Hizmet Yeri Silinecek. Bunu yapmak istiyor musnuz?</p>';

    var result = confirm(message, text);
    result.then((dialogResult) => {
      if (dialogResult) {
        me.serviceService
          .deleteServices(e.data.id)
          .pipe(takeUntil(me.ngUnSubscribe))
          .subscribe((sate) => {
            if (sate) {
              me.serviceService.loadServices();
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
        me.serviceService.loadServices();
      },
    };

    me.addButtonOptions = {
      icon: 'plus',
      text: 'Yeni Hizmet Ekle',
      onClick: () => {
        me.serviceCreateAndUpdateComponent.show(new ServicesDTO());
      },
    };
  }
}
