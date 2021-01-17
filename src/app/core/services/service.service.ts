import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ServicesDTO } from '../models/services.DTO';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceService extends BaseService {
  servicesDTOs: ServicesDTO[] = [];
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    const me = this;
  }
  loadServices() {
    const me = this;
    me.getServices()
      .pipe(takeUntil(me.ngUnSubscribe))
      .subscribe((data) => {
        me.servicesDTOs = data.map((s) => {
          return new ServicesDTO(s);
        });

        // me.appointmentsDTOs = data;
      });
  }
}
