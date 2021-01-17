import { Component, OnInit, ViewChild } from '@angular/core';
import { confirm } from 'devextreme/ui/dialog';
import notify from 'devextreme/ui/notify';
import { takeUntil } from 'rxjs/operators';
import { CustomerAPI } from 'src/app/core/api-requests/customer.api';
import { MenuEnum } from 'src/app/core/enums/menu.enum';
import { CustomersDTO } from 'src/app/core/models/customers.DTO';
import { SpUserMenus } from 'src/app/core/models/sp.user.menus';
import { CustomerService } from 'src/app/core/services/customer.service';
import { SlideService } from 'src/app/core/services/slide.service';
import { BaseControl } from '../base.control';
import { CustomerCreateAndUpdateComponent } from './customer-create-and-update/customer-create-and-update.component';

@Component({
  selector: 'app-costumer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent extends BaseControl implements OnInit {
  refreshButtonOptions: any;
  addButtonOptions: any;

  pageRights: SpUserMenus = new SpUserMenus();

  @ViewChild('customerCreateAndUpdateComponent', { static: false })
  private customerCreateAndUpdateComponent: CustomerCreateAndUpdateComponent;

  constructor(
    public customerService: CustomerService,
    private slideService: SlideService
  ) {
    super();
    const me = this;
    me.customerService.loadServices();
  }

  ngOnInit() {
    const me = this;
    me.toolbaarButtons();
    me.pageRights = me.slideService.getPageRights(MenuEnum.Customer);
  }
  _onUpdate(e) {
    const me = this;
    me.customerCreateAndUpdateComponent.show(e.data);
  }
  _onDeletePage(e) {
    const me = this;
    const text: string = 'Müşteri Silincek';
    const message: string =
      '<p>Müşteri bilgisi Silinecek. Bunu yapmak istiyor musnuz?</p>';

    var result = confirm(message, text);
    result.then((dialogResult) => {
      if (dialogResult) {
        me.customerService
          .deleteCustomers(e.data.id)
          .pipe(takeUntil(me.ngUnSubscribe))
          .subscribe((sate) => {
            if (sate) {
              me.customerService.loadServices();
              notify('Müşteri Bilgisi başarılı bir şekilde silindi', 'success');
            } else {
              notify('Müşteri Bilgisi silinirken bir hata oluştu', 'danger');
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
        me.customerService.loadServices();
      },
    };

    me.addButtonOptions = {
      icon: 'plus',
      text: 'Yeni Müşteri Ekle',
      onClick: () => {
        me.customerCreateAndUpdateComponent.show(new CustomersDTO());
      },
    };
  }
}
