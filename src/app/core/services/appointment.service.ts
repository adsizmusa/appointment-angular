import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { AppointmentsDTO } from '../models/appointments.DTO';
import { takeUntil } from 'rxjs/operators';
import { SchedulerDTO } from '../models/scheduler.DTO';
import { UsersDTO } from '../models/users.DTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService extends BaseService {
  appointmentsDTOs: AppointmentsDTO[] = [];
  schedulerDTO: SchedulerDTO = new SchedulerDTO();
  usersDTOs: UsersDTO[] = [];

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    const me = this;
    me.getUsers()
      .pipe(takeUntil(me.ngUnSubscribe))
      .subscribe((data) => {
        me.usersDTOs = data.map((s) => {
          if (s.color == null || s.color == undefined) {
            s.color = '#fff';
          }
          s.selected = true;
          return new UsersDTO(s);
        });

        me.loadServices();
      });
  }
  setApointment(appointmentsDTO: AppointmentsDTO[]): AppointmentsDTO[] {
    appointmentsDTO.forEach((item) => {
      item.startDate = new Date(item.startDate);
      item.endDate = new Date(item.endDate);
    });

    return appointmentsDTO;
  }
  loadServices() {
    const me = this;
    var userIds = me.usersDTOs
      .filter((s) => s.selected == true)
      .map((s) => {
        return s.id;
      });

    me.getAppointments(userIds)
      .pipe(takeUntil(me.ngUnSubscribe))
      .subscribe((data) => {
        data = this.setApointment(data);
        me.appointmentsDTOs = data.map((s) => {
          s.enable = true;
          return new AppointmentsDTO(s);
        });
        me.getSchedulerModel();
      });
  }

  changeAppointmentUser() {
    const me = this;
    me.loadServices();
  }
  getSchedulerModel() {
    const me = this;
    me.getScheduler()
      .pipe(takeUntil(me.ngUnSubscribe))
      .subscribe((data) => {
        me.schedulerDTO = data;
        me.schedulerDTO.usersDTOs.forEach((s) => {
          var userItem = me.usersDTOs.find((a) => a.id == s.id);

          if (userItem.selected) {
            s.color = userItem.color;
            s.name = userItem.name;
          } else {
            s.color = '#e6e6e6';
            s.name = '';

            me.appointmentsDTOs
              .filter((b) => b.userId == s.id)
              .forEach((b) => {
                b.enable = false;
                b.userName = '';
              });
          }
        });
      });
  }
  getDinnerTime() {
    return { from: 12, to: 13 };
  }

  getHolidays() {
    return [new Date(2017, 4, 25), new Date(2017, 6, 4)];
  }
}
