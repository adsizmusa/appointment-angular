import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DxPopupComponent } from 'devextreme-angular';
import { takeUntil } from 'rxjs/operators';
import { SmstemplatesDTO } from 'src/app/core/models/smstemplates.DTO';
import { SmstemplateService } from 'src/app/core/services/smstemplate.service';
import { BaseControl } from '../../base.control';

@Component({
  selector: 'app-smstemplate-create-and-update',
  templateUrl: './smstemplate-create-and-update.component.html',
  styleUrls: ['./smstemplate-create-and-update.component.css'],
})
export class SmstemplateCreateAndUpdateComponent
  extends BaseControl
  implements OnInit {
  smstemplatesDTO: SmstemplatesDTO = new SmstemplatesDTO();

  @ViewChild(DxPopupComponent, { static: true })
  private popup: DxPopupComponent;

  @Output()
  public popupClosed: EventEmitter<string> = new EventEmitter<string>();

  constructor(private smstemplateService: SmstemplateService) {
    super();
  }

  ngOnInit() {}
  show(smstemplatesDTO: SmstemplatesDTO) {
    const me = this;
    me.smstemplatesDTO = smstemplatesDTO;
    me.popup.instance.show();
  }
  _popUpShown() {
    const me = this;
  }
  _onSave() {
    const me = this;
    if (me.smstemplatesDTO.id == 0) {
      me.smstemplateService
        .postSmsTemplates(me.smstemplatesDTO)
        .pipe(takeUntil(me.ngUnSubscribe))
        .subscribe((appointmentsDTO) => {
          me.smstemplateService.loadServices();
          me.popup.instance.hide();
        });
    } else {
      me.smstemplateService
        .putSmsTemplates(me.smstemplatesDTO.id, me.smstemplatesDTO)
        .pipe(takeUntil(me.ngUnSubscribe))
        .subscribe((appointmentsDTO) => {
          me.smstemplateService.loadServices();
          me.popup.instance.hide();
        });
    }
  }
}
