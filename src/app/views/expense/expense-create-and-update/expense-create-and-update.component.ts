import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DxPopupComponent } from 'devextreme-angular';
import { takeUntil } from 'rxjs/operators';
import { ExpensesDTO } from 'src/app/core/models/expenses.DTO';
import { ExpenseService } from 'src/app/core/services/expense.service';
import { BaseControl } from '../../base.control';

@Component({
  selector: 'app-expense-create-and-update',
  templateUrl: './expense-create-and-update.component.html',
  styleUrls: ['./expense-create-and-update.component.css'],
})
export class ExpenseCreateAndUpdateComponent
  extends BaseControl
  implements OnInit {
  expensesDTO: ExpensesDTO = new ExpensesDTO();

  @ViewChild(DxPopupComponent, { static: true })
  private popup: DxPopupComponent;

  @Output()
  public popupClosed: EventEmitter<string> = new EventEmitter<string>();

  constructor(private expenseService: ExpenseService) {
    super();
  }

  ngOnInit() {}
  show(expensesDTO: ExpensesDTO) {
    const me = this;
    me.expensesDTO = expensesDTO;
    me.popup.instance.show();
  }
  _popUpShown() {
    const me = this;
  }
  _onSave() {
    const me = this;
    if (me.expensesDTO.id == 0) {
      me.expenseService
        .postExpenses(me.expensesDTO)
        .pipe(takeUntil(me.ngUnSubscribe))
        .subscribe((appointmentsDTO) => {
          me.expenseService.loadServices();
          me.popup.instance.hide();
        });
    } else {
      me.expenseService
        .putExpenses(me.expensesDTO.id, me.expensesDTO)
        .pipe(takeUntil(me.ngUnSubscribe))
        .subscribe((appointmentsDTO) => {
          me.expenseService.loadServices();
          me.popup.instance.hide();
        });
    }
  }
}
