import { Component, OnInit, ViewChild } from '@angular/core';
import { confirm } from 'devextreme/ui/dialog';
import notify from 'devextreme/ui/notify';
import { takeUntil } from 'rxjs/operators';
import { MenuEnum } from 'src/app/core/enums/menu.enum';
import { OrderFormsDTO } from 'src/app/core/models/orderforms.DTO';
import { SpUserMenus } from 'src/app/core/models/sp.user.menus';
import { OrderFormService } from 'src/app/core/services/orderform.service';
import { SlideService } from 'src/app/core/services/slide.service';
import { BaseControl } from '../base.control';
import { OrderformCreateAndUpdateComponent } from './orderform-create-and-update/orderform-create-and-update.component';

@Component({
  selector: 'app-costumer',
  templateUrl: './orderform.component.html',
  styleUrls: ['./orderform.component.css'],
})
export class OrderformComponent extends BaseControl implements OnInit {
  refreshButtonOptions: any;
  addButtonOptions: any;

  @ViewChild('orderformCreateAndUpdateComponent', { static: false })
  private orderformCreateAndUpdateComponent: OrderformCreateAndUpdateComponent;

  pageRights: SpUserMenus = new SpUserMenus();
  constructor(
    public orderformService: OrderFormService,

    private slideService: SlideService
  ) {
    super();
    const me = this;
    me.orderformService.loadServices();
  }

  ngOnInit() {
    const me = this;
    me.toolbaarButtons();
    me.pageRights = me.slideService.getPageRights(MenuEnum.Orderform);
  }
  _onUpdate(e) {
    const me = this;
    me.orderformCreateAndUpdateComponent.show(e.data);
  }
  _onDeletePage(e) {
    const me = this;
    const text: string = 'Sipariş Formu Silinecek';
    const message: string =
      '<p>Sipariş Formu Silinecek. Bunu yapmak istiyor musnuz?</p>';

    var result = confirm(message, text);
    result.then((dialogResult) => {
      if (dialogResult) {
        me.orderformService
          .deleteOrderForms(e.data.id)
          .pipe(takeUntil(me.ngUnSubscribe))
          .subscribe((sate) => {
            if (sate) {
              me.orderformService.loadServices();
              notify('Sipariş formu başarılı bir şekilde silindi', 'success');
            } else {
              notify('Sipariş formu silinirken bir hata oluştu', 'danger');
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
        me.orderformService.loadServices();
      },
    };

    me.addButtonOptions = {
      icon: 'plus',
      text: 'Yeni Sipariş Formu Ekle',
      onClick: () => {
        me.orderformCreateAndUpdateComponent.show(new OrderFormsDTO());
      },
    };
  }
}
