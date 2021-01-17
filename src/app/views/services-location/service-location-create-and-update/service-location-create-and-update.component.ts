import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DxPopupComponent } from 'devextreme-angular';
import { takeUntil } from 'rxjs/operators';
import { ServiceLocationsDTO } from 'src/app/core/models/service.locations.DTO';
import { ServiceLocationService } from 'src/app/core/services/service-location.service';
import { BaseControl } from '../../base.control';

@Component({
  selector: 'app-service-location-create-and-update',
  templateUrl: './service-location-create-and-update.component.html',
  styleUrls: ['./service-location-create-and-update.component.css'],
})
export class ServiceLocationCreateAndUpdateComponent
  extends BaseControl
  implements OnInit {
  serviceLocationsDTO: ServiceLocationsDTO = new ServiceLocationsDTO();

  @ViewChild(DxPopupComponent, { static: true })
  private popup: DxPopupComponent;

  @Output()
  public popupClosed: EventEmitter<string> = new EventEmitter<string>();

  constructor(private serviceLocationService: ServiceLocationService) {
    super();
  }

  ngOnInit() {}
  show(serviceLocationsDTO: ServiceLocationsDTO) {
    const me = this;
    me.serviceLocationsDTO = serviceLocationsDTO;
    me.popup.instance.show();
  }
  _popUpShown() {
    const me = this;
  }
  _onSave() {
    const me = this;
    if (me.serviceLocationsDTO.id == 0) {
      me.serviceLocationService
        .postServiceLocations(me.serviceLocationsDTO)
        .pipe(takeUntil(me.ngUnSubscribe))
        .subscribe((appointmentsDTO) => {
          me.serviceLocationService.loadServices();
          me.popup.instance.hide();
        });
    } else {
      me.serviceLocationService
        .putServiceLocations(me.serviceLocationsDTO.id, me.serviceLocationsDTO)
        .pipe(takeUntil(me.ngUnSubscribe))
        .subscribe((appointmentsDTO) => {
          me.serviceLocationService.loadServices();
          me.popup.instance.hide();
        });
    }
  }
}
