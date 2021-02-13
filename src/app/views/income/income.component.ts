import { Component, OnInit, ViewChild } from '@angular/core';
import { confirm } from 'devextreme/ui/dialog';
import notify from 'devextreme/ui/notify';
import { takeUntil } from 'rxjs/operators';
import { MenuEnum } from 'src/app/core/enums/menu.enum';
import { IncomesDTO } from 'src/app/core/models/incomes.DTO';
import { SpUserMenus } from 'src/app/core/models/sp.user.menus';
import { IncomeService } from 'src/app/core/services/income.service';
import { SlideService } from 'src/app/core/services/slide.service';
import { BaseControl } from '../base.control';
import { IncomeCreateAndUpdateComponent } from './income-create-and-update/income-create-and-update.component';

@Component({
  selector: 'app-costumer',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
})
export class IncomeComponent extends BaseControl implements OnInit {
  refreshButtonOptions: any;
  addButtonOptions: any;

  pageRights: SpUserMenus = new SpUserMenus();

  @ViewChild('incomeCreateAndUpdateComponent', { static: false })
  private incomeCreateAndUpdateComponent: IncomeCreateAndUpdateComponent;

  constructor(
    public incomeService: IncomeService,
    private slideService: SlideService
  ) {
    super();
    const me = this;
    me.incomeService.loadServices();
  }

  ngOnInit() {
    const me = this;
    me.toolbaarButtons();
    me.pageRights = me.slideService.getPageRights(MenuEnum.Income);
  }
  _onUpdate(e) {
    const me = this;
    me.incomeCreateAndUpdateComponent.show(e.data);
  }
  _onDeletePage(e) {
    const me = this;
    const text: string = 'Gelir Silincek';
    const message: string =
      '<p>Gelir bilgisi Silinecek. Bunu yapmak istiyor musnuz?</p>';

    var result = confirm(message, text);
    result.then((dialogResult) => {
      if (dialogResult) {
        me.incomeService
          .deleteIncomes(e.data.id)
          .pipe(takeUntil(me.ngUnSubscribe))
          .subscribe((sate) => {
            if (sate) {
              me.incomeService.loadServices();
              notify('Gelir bilgisi başarılı bir şekilde silindi', 'success');
            } else {
              notify('Gelir bilgisi silinirken bir hata oluştu', 'danger');
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
        me.incomeService.loadServices();
      },
    };

    me.addButtonOptions = {
      icon: 'plus',
      text: 'Yeni Gelir Ekle',
      onClick: () => {
        me.incomeCreateAndUpdateComponent.show(new IncomesDTO());
      },
    };
  }
}
