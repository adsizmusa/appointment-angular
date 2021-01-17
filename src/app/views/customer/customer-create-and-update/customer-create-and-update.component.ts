import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DxPopupComponent } from 'devextreme-angular';
import { takeUntil } from 'rxjs/operators';
import { CustomersDTO } from 'src/app/core/models/customers.DTO';
import { CustomerService } from 'src/app/core/services/customer.service';
import { BaseControl } from '../../base.control';

@Component({
  selector: 'app-customer-create-and-update',
  templateUrl: './customer-create-and-update.component.html',
  styleUrls: ['./customer-create-and-update.component.css'],
})
export class CustomerCreateAndUpdateComponent
  extends BaseControl
  implements OnInit {
  customersDTO: CustomersDTO = new CustomersDTO();

  @ViewChild(DxPopupComponent, { static: true })
  private popup: DxPopupComponent;

  @Output()
  public popupClosed: EventEmitter<string> = new EventEmitter<string>();

  constructor(private customerService: CustomerService) {
    super();
  }

  ngOnInit() {}
  show(customersDTO: CustomersDTO) {
    const me = this;
    me.customersDTO = customersDTO;
    me.popup.instance.show();
  }
  _popUpShown() {
    const me = this;
  }
  _onSave() {
    const me = this;
    if (me.customersDTO.id == 0) {
      me.customerService
        .postCustomers(me.customersDTO)
        .pipe(takeUntil(me.ngUnSubscribe))
        .subscribe((appointmentsDTO) => {
          me.customerService.loadServices();
          me.popup.instance.hide();
        });
    } else {
      me.customerService
        .putCustomers(me.customersDTO.id, me.customersDTO)
        .pipe(takeUntil(me.ngUnSubscribe))
        .subscribe((appointmentsDTO) => {
          me.customerService.loadServices();
          me.popup.instance.hide();
        });
    }
  }
}
