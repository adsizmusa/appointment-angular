import { Component, OnInit, ViewChild } from '@angular/core';
import { confirm } from 'devextreme/ui/dialog';
import notify from 'devextreme/ui/notify';
import { takeUntil } from 'rxjs/operators';
import { MenuEnum } from 'src/app/core/enums/menu.enum';
import { SmstemplatesDTO } from 'src/app/core/models/smstemplates.DTO';
import { SpUserMenus } from 'src/app/core/models/sp.user.menus';
import { SlideService } from 'src/app/core/services/slide.service';
import { SmstemplateService } from 'src/app/core/services/smstemplate.service';
import { BaseControl } from '../base.control';
import { SmstemplateCreateAndUpdateComponent } from './smstemplate-create-and-update/smstemplate-create-and-update.component';

@Component({
  selector: 'app-costumer',
  templateUrl: './smstemplate.component.html',
  styleUrls: ['./smstemplate.component.css'],
})
export class SmstemplateComponent extends BaseControl implements OnInit {
  refreshButtonOptions: any;
  addButtonOptions: any;

  pageRights: SpUserMenus = new SpUserMenus();

  @ViewChild('smstemplateCreateAndUpdateComponent', { static: false })
  private smstemplateCreateAndUpdateComponent: SmstemplateCreateAndUpdateComponent;

  constructor(
    public smstemplateService: SmstemplateService,
    private slideService: SlideService
  ) {
    super();
    const me = this;
    me.smstemplateService.loadServices();
  }

  ngOnInit() {
    const me = this;
    me.toolbaarButtons();
    me.pageRights = me.slideService.getPageRights(MenuEnum.SmsTemplate);
  }
  _onUpdate(e) {
    const me = this;
    me.smstemplateCreateAndUpdateComponent.show(e.data);
  }
  _onDeletePage(e) {
    const me = this;
    const text: string = 'Şablon Silincek';
    const message: string =
      '<p>Şablon bilgisi Silinecek. Bunu yapmak istiyor musnuz?</p>';

    var result = confirm(message, text);
    result.then((dialogResult) => {
      if (dialogResult) {
        me.smstemplateService
          .deleteSmsTemplates(e.data.id)
          .pipe(takeUntil(me.ngUnSubscribe))
          .subscribe((sate) => {
            if (sate) {
              me.smstemplateService.loadServices();
              notify('Şablon Bilgisi başarılı bir şekilde silindi', 'success');
            } else {
              notify('Şablon Bilgisi silinirken bir hata oluştu', 'danger');
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
        me.smstemplateService.loadServices();
      },
    };

    me.addButtonOptions = {
      icon: 'plus',
      text: 'Yeni Şablon Ekle',
      onClick: () => {
        me.smstemplateCreateAndUpdateComponent.show(new SmstemplatesDTO());
      },
    };
  }
}
