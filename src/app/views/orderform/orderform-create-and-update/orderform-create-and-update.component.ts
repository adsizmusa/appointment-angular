import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DxPopupComponent } from 'devextreme-angular';
import { takeUntil } from 'rxjs/operators';
import { OrderFormsDTO } from 'src/app/core/models/orderforms.DTO';
import { OrderFormService } from 'src/app/core/services/orderform.service';
import { BaseControl } from '../../base.control';

@Component({
  selector: 'app-orderform-create-and-update',
  templateUrl: './orderform-create-and-update.component.html',
  styleUrls: ['./orderform-create-and-update.component.css'],
})
export class OrderformCreateAndUpdateComponent
  extends BaseControl
  implements OnInit {
  orderformsDTO: OrderFormsDTO = new OrderFormsDTO();

  @ViewChild(DxPopupComponent, { static: true })
  private popup: DxPopupComponent;

  @Output()
  public popupClosed: EventEmitter<string> = new EventEmitter<string>();

  constructor(public orderformService: OrderFormService) {
    super();
  }

  ngOnInit() {}
  show(orderformsDTO: OrderFormsDTO) {
    const me = this;
    me.orderformsDTO = orderformsDTO;
    me.popup.instance.show();
  }
  _popUpShown() {
    const me = this;
  }
  _onSave() {
    const me = this;
    if (me.orderformsDTO.id == 0) {
      me.orderformService
        .postOrderForms(me.orderformsDTO)
        .pipe(takeUntil(me.ngUnSubscribe))
        .subscribe((appointmentsDTO) => {
          me.orderformService.loadServices();
          me.popup.instance.hide();
        });
    } else {
      me.orderformService
        .putOrderForms(me.orderformsDTO.id, me.orderformsDTO)
        .pipe(takeUntil(me.ngUnSubscribe))
        .subscribe((appointmentsDTO) => {
          me.orderformService.loadServices();
          me.popup.instance.hide();
        });
    }
  }
}
