import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { BaseControl } from '../../base.control';
import { DxPopupComponent } from 'devextreme-angular';
import { CompaniesDTO } from 'src/app/core/models/companies.DTO';
import { takeUntil } from 'rxjs/operators';
import { CompanyService } from 'src/app/core/services/company.service';

@Component({
  selector: 'app-company-create-and-update',
  templateUrl: './company-create-and-update.component.html',
  styleUrls: ['./company-create-and-update.component.css'],
})
export class CompanyCreateAndUpdateComponent
  extends BaseControl
  implements OnInit {
  companiesDTO: CompaniesDTO = new CompaniesDTO();

  @ViewChild(DxPopupComponent, { static: true })
  private popup: DxPopupComponent;

  @Output()
  public popupClosed: EventEmitter<string> = new EventEmitter<string>();

  constructor(private companyService: CompanyService) {
    super();
  }

  ngOnInit() {}
  show(companiesDTO: CompaniesDTO) {
    const me = this;
    me.companiesDTO = companiesDTO;
    me.popup.instance.show();
  }
  _popUpShown() {
    const me = this;
  }
  _onSave() {
    const me = this;
    if (me.companiesDTO.id == 0) {
      me.companyService
        .postCompanies(me.companiesDTO)
        .pipe(takeUntil(me.ngUnSubscribe))
        .subscribe((appointmentsDTO) => {
          me.companyService.loadServices();
          me.popup.instance.hide();
        });
    } else {
      me.companyService
        .putCompanies(me.companiesDTO.id, me.companiesDTO)
        .pipe(takeUntil(me.ngUnSubscribe))
        .subscribe((appointmentsDTO) => {
          me.companyService.loadServices();
          me.popup.instance.hide();
        });
    }
  }
}
