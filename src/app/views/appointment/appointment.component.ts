import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseControl } from '../base.control';
import { AppointmentService } from 'src/app/core/services/appointment.service';
import { AppointmentCreateAndUpdateComponent } from './appointment-create-and-update/appointment-create-and-update.component';
import { AppointmentsDTO } from 'src/app/core/models/appointments.DTO';
import { DxSchedulerComponent } from 'devextreme-angular';
import { SpUserMenus } from 'src/app/core/models/sp.user.menus';
import { SlideService } from 'src/app/core/services/slide.service';
import { MenuEnum } from 'src/app/core/enums/menu.enum';
import dxScheduler, { dxSchedulerOptions } from 'devextreme/ui/scheduler';
import DevExpress from 'devextreme';
import { StorageService } from 'src/app/core/services/storage.service';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent extends BaseControl implements OnInit {
  refreshButtonOptions: any;
  addButtonOptions: any;
  groupByDate: boolean = false;
  currentDate: Date = new Date();

  daysViewStartDate: Date = new Date();

  @ViewChild(DxSchedulerComponent, { static: false })
  scheduler: DxSchedulerComponent;
  @ViewChild('appointmentCreateAndUpdateComponent', { static: false })
  private appointmentCreateAndUpdateComponent: AppointmentCreateAndUpdateComponent;
  pageRights: SpUserMenus = new SpUserMenus();
  constructor(
    public appointmentService: AppointmentService,
    public storageService: StorageService,
    private slideService: SlideService
  ) {
    super();
    const me = this;
    me.daysViewStartDate.setDate(me.currentDate.getDate() - 1);
  }
  onContentReady(e) {
    var currentHour = new Date().getHours() - 1;

    e.component.scrollToTime(currentHour, 30, new Date());
  }
  ngOnInit(): void {
    const me = this;
    me.appointmentService.loadServices();
    me.toolbaarButtons();
    me.pageRights = me.slideService.getPageRights(MenuEnum.Appointment);
  }
  _onUpdate(e) {}
  _onDeletePage(e) {}
  toolbaarButtons() {
    const me = this;
    me.refreshButtonOptions = {
      icon: 'refresh',
      onClick: () => {
        me.appointmentService.loadServices();
      },
    };

    me.addButtonOptions = {
      icon: 'plus',
      onClick: () => {
        me.appointmentCreateAndUpdateComponent.show(new AppointmentsDTO());
      },
    };
  }

  onAppointmentDblClick(e) {
    const me = this;
    var appointmentsDTO = new AppointmentsDTO();
    if (!e.targetedAppointmentData) {
      appointmentsDTO.startDate = e.cellData.startDate;
      appointmentsDTO.endDate = e.cellData.endDate;
      me.appointmentCreateAndUpdateComponent.show(appointmentsDTO);
    } else {
      appointmentsDTO = e.targetedAppointmentData;
      me.appointmentCreateAndUpdateComponent.show(appointmentsDTO);
    }
    e.cancel = true;
  }

  customerClick() {
    const me = this;
  }

  isHoliday(date: Date) {
    const localeDate = date.toLocaleDateString();
    const holidays = this.appointmentService.getHolidays();
    return (
      holidays.filter((holiday) => {
        return holiday.toLocaleDateString() === localeDate;
      }).length > 0
    );
  }

  isWeekend(date: Date) {
    const day = date.getDay();
    return day === 0 || day === 6;
  }

  isDinner(date: Date) {
    const hours = date.getHours();
    const dinnerTime = this.appointmentService.getDinnerTime();
    return hours >= dinnerTime.from && hours < dinnerTime.to;
  }
  notifyDisableDate() {
    notify('Seçilen tarih kayıt oluşturmak için uygun değil.', 'warning', 1000);
  }
}
