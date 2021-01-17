import { Component, OnInit, ViewChild } from '@angular/core';
import { CompaniesDTO } from 'src/app/core/models/companies.DTO';
import { CompanyService } from 'src/app/core/services/company.service';
import { BaseControl } from '../base.control';
import { CompanyCreateAndUpdateComponent } from './company-create-and-update/company-create-and-update.component';
import { confirm } from 'devextreme/ui/dialog';
import { takeUntil } from 'rxjs/operators';
import notify from 'devextreme/ui/notify';
import { CompanyMenuComponent } from './company-menu/company-menu.component';
import { SpUserMenus } from 'src/app/core/models/sp.user.menus';
import { SlideService } from 'src/app/core/services/slide.service';
import { MenuEnum } from 'src/app/core/enums/menu.enum';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent extends BaseControl implements OnInit {
  refreshButtonOptions: any;
  addButtonOptions: any;

  @ViewChild('companyCreateAndUpdateComponent', { static: false })
  private companyCreateAndUpdateComponent: CompanyCreateAndUpdateComponent;

  @ViewChild('companyMenuComponent', { static: false })
  private companyMenuComponent: CompanyMenuComponent;
  pageRights: SpUserMenus = new SpUserMenus();
  constructor(
    public companyService: CompanyService,
    private slideService: SlideService
  ) {
    super();
    const me = this;
    me.companyService.loadServices();
  }

  ngOnInit() {
    const me = this;
    me.toolbaarButtons();
    me.pageRights = me.slideService.getPageRights(MenuEnum.Company);
  }
  _onUpdate(e) {
    const me = this;
    me.companyCreateAndUpdateComponent.show(e.data);
  }
  _onMenu(e) {
    const me = this;
    me.companyMenuComponent.show(e.data.id);
  }
  _onDeletePage(e) {
    const me = this;
    const text: string = 'Şirket Silincek';
    const message: string =
      '<p>Şirket bilgisi Silinecek. Bunu yapmak istiyor musnuz?</p>';

    var result = confirm(message, text);
    result.then((dialogResult) => {
      if (dialogResult) {
        me.companyService
          .deleteCompanies(e.data.id)
          .pipe(takeUntil(me.ngUnSubscribe))
          .subscribe((sate) => {
            if (sate) {
              me.companyService.loadServices();
              notify('Şirket Bilgisi başarılı bir şekilde silindi', 'success');
            } else {
              notify('Şirket Bilgisi silinirken bir hata oluştu', 'danger');
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
        me.companyService.loadServices();
      },
    };

    me.addButtonOptions = {
      icon: 'plus',
      text: 'Yeni Şirket Ekle',
      onClick: () => {
        me.companyCreateAndUpdateComponent.show(new CompaniesDTO());
      },
    };
  }
}
