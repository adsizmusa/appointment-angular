import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DxPopupComponent } from 'devextreme-angular';
import { takeUntil } from 'rxjs/operators';
import { IncomesDTO } from 'src/app/core/models/incomes.DTO';
import { ServicesDTO } from 'src/app/core/models/services.DTO';
import { AppointmentService } from 'src/app/core/services/appointment.service';
import { IncomeService } from 'src/app/core/services/income.service';
import { ProductService } from 'src/app/core/services/product.service';
import { BaseControl } from '../../base.control';

@Component({
  selector: 'app-income-create-and-update',
  templateUrl: './income-create-and-update.component.html',
  styleUrls: ['./income-create-and-update.component.css'],
})
export class IncomeCreateAndUpdateComponent
  extends BaseControl
  implements OnInit {
  incomesDTO: IncomesDTO = new IncomesDTO();

  @ViewChild(DxPopupComponent, { static: true })
  private popup: DxPopupComponent;

  @Output()
  public popupClosed: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private incomeService: IncomeService,
    public productService: ProductService,
    public appointmentService: AppointmentService
  ) {
    super();
  }

  ngOnInit() {
    const me = this;
    me.appointmentService.getSchedulerModel();
    me.productService.loadServices();
  }
  show(incomesDTO: IncomesDTO) {
    const me = this;
    me.incomesDTO = incomesDTO;

    me.popup.instance.show();
  }
  _popUpShown() {
    const me = this;
  }
  onCahngeService(e) {
    const me = this;
    me.incomesDTO.serviceID = e.selectedItem.id;
  }
  onCahngeProduct(e) {
    const me = this;
    me.incomesDTO.productID = e.selectedItem.id;
  }
  _onSave() {
    const me = this;
    if (me.incomesDTO.id == 0) {
      me.incomeService
        .postIncomes(me.incomesDTO)
        .pipe(takeUntil(me.ngUnSubscribe))
        .subscribe((appointmentsDTO) => {
          me.incomeService.loadServices();
          me.popup.instance.hide();
        });
    } else {
      me.incomeService
        .putIncomes(me.incomesDTO.id, me.incomesDTO)
        .pipe(takeUntil(me.ngUnSubscribe))
        .subscribe((appointmentsDTO) => {
          me.incomeService.loadServices();
          me.popup.instance.hide();
        });
    }
  }
}
