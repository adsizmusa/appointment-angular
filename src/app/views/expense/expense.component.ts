import { Component, OnInit, ViewChild } from '@angular/core';
import { confirm } from 'devextreme/ui/dialog';
import notify from 'devextreme/ui/notify';
import { takeUntil } from 'rxjs/operators';
import { MenuEnum } from 'src/app/core/enums/menu.enum';
import { ExpensesDTO } from 'src/app/core/models/expenses.DTO';
import { SpUserMenus } from 'src/app/core/models/sp.user.menus';
import { ExpenseService } from 'src/app/core/services/expense.service';
import { SlideService } from 'src/app/core/services/slide.service';
import { BaseControl } from '../base.control';
import { ExpenseCreateAndUpdateComponent } from './expense-create-and-update/expense-create-and-update.component';

@Component({
  selector: 'app-costumer',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
})
export class ExpenseComponent extends BaseControl implements OnInit {
  refreshButtonOptions: any;
  addButtonOptions: any;

  pageRights: SpUserMenus = new SpUserMenus();

  @ViewChild('expenseCreateAndUpdateComponent', { static: false })
  private expenseCreateAndUpdateComponent: ExpenseCreateAndUpdateComponent;

  constructor(
    public expenseService: ExpenseService,
    private slideService: SlideService
  ) {
    super();
    const me = this;
    me.expenseService.loadServices();
  }

  ngOnInit() {
    const me = this;
    me.toolbaarButtons();
    me.pageRights = me.slideService.getPageRights(MenuEnum.Expense);
  }
  _onUpdate(e) {
    const me = this;
    me.expenseCreateAndUpdateComponent.show(e.data);
  }
  _onDeletePage(e) {
    const me = this;
    const text: string = 'Gider Silincek';
    const message: string =
      '<p>Gider bilgisi Silinecek. Bunu yapmak istiyor musnuz?</p>';

    var result = confirm(message, text);
    result.then((dialogResult) => {
      if (dialogResult) {
        me.expenseService
          .deleteExpenses(e.data.id)
          .pipe(takeUntil(me.ngUnSubscribe))
          .subscribe((sate) => {
            if (sate) {
              me.expenseService.loadServices();
              notify('Gider bilgisi başarılı bir şekilde silindi', 'success');
            } else {
              notify('Gider bilgisi silinirken bir hata oluştu', 'danger');
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
        me.expenseService.loadServices();
      },
    };

    me.addButtonOptions = {
      icon: 'plus',
      text: 'Yeni Gider Ekle',
      onClick: () => {
        me.expenseCreateAndUpdateComponent.show(new ExpensesDTO());
      },
    };
  }
}
