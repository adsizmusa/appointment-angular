import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { BaseControl } from '../../base.control';
import { DxPopupComponent } from 'devextreme-angular';
import { AppointmentsDTO } from 'src/app/core/models/appointments.DTO';
import { AppointmentService } from 'src/app/core/services/appointment.service';
import { takeUntil } from 'rxjs/operators';
import { UsersDTO } from 'src/app/core/models/users.DTO';
import { ServiceLocationsDTO } from 'src/app/core/models/service.locations.DTO';
import { ServicesDTO } from 'src/app/core/models/services.DTO';
import { CustomersDTO } from 'src/app/core/models/customers.DTO';

@Component({
  selector: 'app-appointment-create-and-update',
  templateUrl: './appointment-create-and-update.component.html',
  styleUrls: ['./appointment-create-and-update.component.css'],
})
export class AppointmentCreateAndUpdateComponent
  extends BaseControl
  implements OnInit {
  @ViewChild(DxPopupComponent, { static: true })
  private popup: DxPopupComponent;

  appointmentsDTO: AppointmentsDTO = new AppointmentsDTO();

  @Output()
  public popupClosed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public appointmentService: AppointmentService) {
    super();
  }

  ngOnInit() {}
  show(appointmentsDTO: AppointmentsDTO) {
    const me = this;
    me.appointmentsDTO = appointmentsDTO;

    me.appointmentService
      .getScheduler()
      .pipe(takeUntil(me.ngUnSubscribe))
      .subscribe((data) => {
        me.appointmentService.schedulerDTO = data;
      });
    me.popup.instance.show();
  }

  _popUpShown() {
    const me = this;
  }
  _onSave() {
    const me = this;
    if (me.appointmentsDTO.id == 0) {
      me.appointmentService
        .postAppointments(me.appointmentsDTO)
        .pipe(takeUntil(me.ngUnSubscribe))
        .subscribe((appointmentsDTO) => {
          me.appointmentService.loadServices();
          me.popup.instance.hide();
          me.popupClosed.emit(true);
        });
    } else {
      me.appointmentService
        .putAppointments(me.appointmentsDTO.id, me.appointmentsDTO)
        .pipe(takeUntil(me.ngUnSubscribe))
        .subscribe((appointmentsDTO) => {
          me.appointmentService.loadServices();

          me.popup.instance.hide();
          me.popupClosed.emit(true);
        });
    }
  }
  onCahngeUser(e) {
    const me = this;
    me.appointmentsDTO.userId = e.selectedItem.id;
  }
  onCahngeService(e) {
    const me = this;
    me.appointmentsDTO.serviceId = e.selectedItem.id;
  }
  onChangeServiceLocation(e) {
    const me = this;
    me.appointmentsDTO.serviceLocationId = e.selectedItem.id;
  }
  onChangeCustomer(e) {
    const me = this;
    me.appointmentsDTO.customerId = e.selectedItem.id;
  }
}
