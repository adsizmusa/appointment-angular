import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DxPopupComponent } from 'devextreme-angular';
import { takeUntil } from 'rxjs/operators';
import { ServicesDTO } from 'src/app/core/models/services.DTO';
import { ServiceService } from 'src/app/core/services/service.service';
import { BaseControl } from '../../base.control';

@Component({
  selector: 'app-service-create-and-update',
  templateUrl: './service-create-and-update.component.html',
  styleUrls: ['./service-create-and-update.component.css'],
})
export class ServiceCreateAndUpdateComponent
  extends BaseControl
  implements OnInit {
  servicesDTO: ServicesDTO = new ServicesDTO();

  @ViewChild(DxPopupComponent, { static: true })
  private popup: DxPopupComponent;

  @Output()
  public popupClosed: EventEmitter<string> = new EventEmitter<string>();

  constructor(private serviceService: ServiceService) {
    super();
  }

  ngOnInit() {}
  show(servicesDTO: ServicesDTO) {
    const me = this;
    me.servicesDTO = servicesDTO;
    me.popup.instance.show();
  }
  _popUpShown() {
    const me = this;
  }
  _onSave() {
    const me = this;
    if (me.servicesDTO.id == 0) {
      me.serviceService
        .postServices(me.servicesDTO)
        .pipe(takeUntil(me.ngUnSubscribe))
        .subscribe((appointmentsDTO) => {
          me.serviceService.loadServices();
          me.popup.instance.hide();
        });
    } else {
      me.serviceService
        .putServices(me.servicesDTO.id, me.servicesDTO)
        .pipe(takeUntil(me.ngUnSubscribe))
        .subscribe((appointmentsDTO) => {
          me.serviceService.loadServices();
          me.popup.instance.hide();
        });
    }
  }
}
