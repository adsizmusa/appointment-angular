import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DxPopupComponent } from 'devextreme-angular';
import { takeUntil } from 'rxjs/operators';
import { spCompanyMenus } from 'src/app/core/models/sp.company.menus';
import { CompanyService } from 'src/app/core/services/company.service';
import { BaseControl } from '../../base.control';

@Component({
  selector: 'app-company-menu',
  templateUrl: './company-menu.component.html',
  styleUrls: ['./company-menu.component.css'],
})
export class CompanyMenuComponent extends BaseControl implements OnInit {
  @ViewChild(DxPopupComponent, { static: true })
  private popup: DxPopupComponent;

  @Output()
  public popupClosed: EventEmitter<string> = new EventEmitter<string>();

  companyMenus: spCompanyMenus[] = [];

  constructor(private companyService: CompanyService) {
    super();
  }

  ngOnInit() {}
  show(id: number) {
    const me = this;

    me.companyMenus = [];
    me.companyService
      .getCompanyMenus(id)
      .pipe(takeUntil(me.ngUnSubscribe))
      .subscribe((menus) => {
        me.companyMenus = menus;

        me.popup.instance.show();
      });
  }
  changeMenuState(e) {
    const me = this;

    e.isUpdate = true;
  }
  _popUpShown() {
    const me = this;
  }
  _onSave() {
    const me = this;
    var updateMenus = me.companyMenus.filter((s) => s.isUpdate == true);
    if (updateMenus.length > 0) {
      me.companyService
        .updateCompanyMenus(updateMenus)
        .pipe(takeUntil(me.ngUnSubscribe))
        .subscribe(() => {
          me.popup.instance.hide();
        });
    } else {
      me.popup.instance.hide();
    }
  }
}
